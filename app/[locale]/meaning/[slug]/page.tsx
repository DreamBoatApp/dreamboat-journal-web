import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import MoonPhaseWidget from '@/components/MoonPhaseWidget';
import InlineCTA from '@/components/InlineCTA';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedSymbols from '@/components/RelatedSymbols';
import dictionary from '@/scripts/data/source_dictionary';
import relatedSymbolsIndex from '@/scripts/data/related_symbols.json';
import publishDates from '@/scripts/data/publish_dates.json';
import seoIndex from '@/scripts/data/seo_index.json';
import aliasMap from '@/scripts/data/alias_map';
import SearchBar from '@/components/SearchBar';

// --- Types ---
type Props = {
    params: {
        locale: string;
        slug: string;
    };
};

type ArticleContent = {
    title: string;
    seoDescription: string;
    introduction: string;
    symbolism: string;
    cosmicAnalysis: string;
    commonScenarios: string[];
    cta: string;
    localizedName?: string;
    faqs?: { question: string; answer: string }[];
};

// --- DATA FETCHING ---
const getContent = (locale: string, slug: string): ArticleContent | null => {
    try {
        const filePath = path.join(
            process.cwd(),
            'content',
            locale,
            'meanings',
            `${slug}.json`
        );

        if (!fs.existsSync(filePath)) return null;

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        return null;
    }
};

// Get publish dates from build-time index (serverless-safe)
const getPublishDate = (slug: string): { published: string; modified: string } => {
    const dates = (publishDates as Record<string, { published: string; modified: string }>)[slug];
    return dates || { published: '2026-01-15T00:00:00Z', modified: '2026-02-11T00:00:00Z' };
};

// Force dynamic rendering — this page uses getTranslations (dynamic API)
export const revalidate = 3600; // ISR: revalidate every 1 hour

// --- SSG PARAM GENERATION ---
// This enables static generation for ALL valid paths at build time
// DISABLE SSG to avoid Vercel limits (16k+ pages)
export async function generateStaticParams() {
    return []; // Generate on demand
}

// --- METADATA ---
export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const content = getContent(locale, slug);

    if (!content) return { title: 'Not Found' };

    const canonicalUrl = `https://dreamboatjournal.com/${locale}/meaning/${slug}`;

    // Check SEO index — noindex thin content to prevent index bloat
    const seoKey = `${locale}/${slug}`;
    const shouldIndex = (seoIndex as Record<string, boolean>)[seoKey] !== false;

    return {
        title: content.title,
        description: content.seoDescription,
        ...(shouldIndex ? {} : { robots: { index: false, follow: true } }),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'x-default': `/en/meaning/${slug}`,
                'en': `/en/meaning/${slug}`,
                'tr': `/tr/meaning/${slug}`,
                'de': `/de/meaning/${slug}`,
                'es': `/es/meaning/${slug}`,
                'pt': `/pt/meaning/${slug}`,
            }
        },
        openGraph: {
            title: content.title,
            description: content.seoDescription,
            url: canonicalUrl,
            type: 'article',
            locale: locale,
        },
        twitter: {
            card: 'summary_large_image',
            title: content.title,
            description: content.seoDescription,
        },
    };
}

// --- PAGE COMPONENT ---
export default async function MeaningPage({ params }: Props) {
    const { locale, slug } = await params;
    const content = getContent(locale, slug);

    // If no direct content, check if slug is an alias (e.g., "viper" -> "snake")
    if (!content) {
        const mainSlug = (aliasMap as Record<string, string>)[slug];
        if (mainSlug) {
            // Redirect to the main symbol page
            redirect(`/${locale}/meaning/${mainSlug}`);
        }
        notFound();
    }

    const t = content!; // Content is guaranteed here
    const t_page = await getTranslations('MeaningPage');
    const t_home = await getTranslations('HomePage');
    const t_nav = await getTranslations('Navigation');
    const CosmicConnectionSection = (await import('@/components/CosmicConnectionSection')).default;

    // Breadcrumb items
    const symbolName = t.localizedName || slug.charAt(0).toUpperCase() + slug.slice(1);
    const firstLetter = symbolName.charAt(0).toUpperCase();
    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: t_nav('dictionary'), href: `/${locale}/dictionary` },
        { label: firstLetter, href: `/${locale}/dictionary/${firstLetter.toLowerCase()}` },
        { label: symbolName, href: `/${locale}/meaning/${slug}` },
    ];

    // Related symbols
    const relatedSlugs: string[] = (relatedSymbolsIndex as Record<string, string[]>)[slug] || [];
    const relatedSymbols = relatedSlugs.map(rs => {
        const rsContent = getContent(locale, rs);
        return {
            slug: rs,
            name: rsContent?.localizedName || rs.charAt(0).toUpperCase() + rs.slice(1),
        };
    }).filter(rs => rs.name);

    // Build 'See also' contextual links (top 4 related symbols with content)
    const seeAlsoSymbols = relatedSymbols.slice(0, 4);

    // Dates from build-time index
    const pubDates = getPublishDate(slug);

    // Helper to fix capitalization title (e.g. SNAKE -> Snake)
    const fixCaps = (text: string) => {
        return text.replace(/\b([A-Z]{2,})\b/g, (match) => {
            return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
        });
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse"></div>
            </div>

            {/* JSON-LD Article Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: t.title,
                        description: t.seoDescription,
                        image: 'https://dreamboatjournal.com/og-image.jpg',
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://dreamboatjournal.com/${locale}/meaning/${slug}`,
                        },
                        author: {
                            '@type': 'Organization',
                            name: 'Dream Boat Journal',
                            url: 'https://dreamboatjournal.com',
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'Dream Boat Journal',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://dreamboatjournal.com/images/logo.png',
                            },
                        },
                        datePublished: pubDates.published,
                        dateModified: pubDates.modified,
                    })
                }}
            />

            <main className="relative z-10 container mx-auto px-4 pt-4 pb-12 md:pt-6 md:pb-24 max-w-3xl">

                {/* Search Bar (Top) */}
                <div className="mb-8 max-w-xl mx-auto">
                    <SearchBar locale={locale} placeholder={t_home('searchPlaceholder')} />
                </div>

                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                {/* Header */}
                <header className="mb-12 text-center relative">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wider text-purple-300 uppercase">
                        {t_page('dictionaryTag')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-6 drop-shadow-lg">
                        {t.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full"></div>
                </header>

                {/* Main Content (Centered, No Sidebar) */}
                <article className="prose prose-invert prose-lg max-w-none">

                    {/* Introduction */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-xl">
                        <p className="text-lg leading-relaxed text-slate-200">
                            {t.introduction.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g).map((part, i) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                                }
                                if (part.startsWith('*') && part.endsWith('*')) {
                                    return <em key={i} className="text-indigo-200 italic">{part.slice(1, -1)}</em>;
                                }
                                return part;
                            })}
                        </p>
                    </div>

                    {/* Symbolism Deep Dive */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-indigo-300">
                            {t_page('symbolismTitle')}
                        </h2>
                        <div className="text-lg leading-relaxed font-light text-slate-200">
                            <p className="whitespace-pre-line">
                                {t.symbolism.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g).map((part, i) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                                    }
                                    if (part.startsWith('*') && part.endsWith('*')) {
                                        return <em key={i} className="text-indigo-200 italic">{part.slice(1, -1)}</em>;
                                    }
                                    return part;
                                })}
                            </p>
                        </div>
                    </section>

                    {/* Contextual Internal Links (SEO: inline text links) */}
                    {seeAlsoSymbols.length > 0 && (
                        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                            {t_page('seeAlsoPrefix')}{' '}
                            {seeAlsoSymbols.map((sym, i) => (
                                <span key={sym.slug}>
                                    <Link
                                        href={`/${locale}/meaning/${sym.slug}`}
                                        className="text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/30 hover:decoration-indigo-400/60 transition-colors"
                                    >
                                        {sym.name}
                                    </Link>
                                    {i < seeAlsoSymbols.length - 1 ? ', ' : '.'}
                                </span>
                            ))}
                        </p>
                    )}

                    {/* Cosmic Connection (New Gated Component) */}
                    <CosmicConnectionSection
                        title={t_page('cosmicConnectionTitle')}
                        analysisText={t.cosmicAnalysis}
                    />

                    {/* Common Scenarios */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-indigo-500"></span>
                            {t_page('commonDreamsTitle')}
                        </h2>
                        <ul className="grid gap-4">
                            {content.commonScenarios.map((scenario, i) => (
                                <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
                                    <span className="text-indigo-400 font-bold text-lg">–</span>
                                    <p className="text-gray-300">{fixCaps(scenario)}</p>
                                </li>
                            ))}
                        </ul>
                    </section>




                    {/* FAQ Section — symbol-specific if available, boilerplate fallback */}
                    <FAQSection
                        title={t_page('faqTitle')}
                        faqs={content.faqs && content.faqs.length > 0
                            ? content.faqs
                            : [
                                {
                                    question: t_page('faq1Question', { symbol: symbolName }),
                                    answer: t.introduction.slice(0, 300) + (t.introduction.length > 300 ? '...' : ''),
                                },
                                {
                                    question: t_page('faq2Question', { symbol: symbolName }),
                                    answer: t_page('faq2Answer', { symbol: symbolName }),
                                },
                                {
                                    question: t_page('faq3Question', { symbol: symbolName }),
                                    answer: t_page('faq3Answer', { symbol: symbolName }),
                                },
                            ]
                        }
                    />

                    {/* Related Symbols */}
                    <RelatedSymbols
                        symbols={relatedSymbols}
                        locale={locale}
                        title={t_page('relatedTitle')}
                    />
                </article>
            </main>
        </div>
    );
}
