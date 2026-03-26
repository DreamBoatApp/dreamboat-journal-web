import { getTranslations, setRequestLocale } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FAQSection from '@/components/FAQSection';
import RelatedSymbols from '@/components/RelatedSymbols';

// SSG: only params from generateStaticParams are valid
export const dynamicParams = false;

// SSG: pre-render all guide pages at build time
export async function generateStaticParams() {
    const locales = ['en', 'tr'];
    const guidesDir = path.join(process.cwd(), 'content', 'en', 'guides');
    const slugs = fs.readdirSync(guidesDir)
        .filter((f: string) => f.endsWith('.json'))
        .map((f: string) => f.replace('.json', ''));
    const params: { locale: string; slug: string }[] = [];
    for (const locale of locales) {
        for (const slug of slugs) {
            params.push({ locale, slug });
        }
    }
    return params;
}

type GuideSection = {
    id: string;
    heading: string;
    content: string;
};

type GuideFAQ = {
    question: string;
    answer: string;
};

type GuideContent = {
    slug: string;
    title: string;
    seoDescription: string;
    heroSubtitle: string;
    sections: GuideSection[];
    relatedSymbols: string[];
    faqs: GuideFAQ[];
};

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

function getGuideContent(locale: string, slug: string): GuideContent | null {
    try {
        // Try locale-specific first, then fallback to English
        const localePath = path.join(process.cwd(), 'content', locale, 'guides', `${slug}.json`);
        const enPath = path.join(process.cwd(), 'content', 'en', 'guides', `${slug}.json`);

        const filePath = fs.existsSync(localePath) ? localePath : (fs.existsSync(enPath) ? enPath : null);
        if (!filePath) return null;

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return null;
    }
}

function getLocalizedSymbolName(locale: string, slug: string): string {
    try {
        const filePath = path.join(process.cwd(), 'content', locale, 'meanings', `${slug}.json`);
        if (!fs.existsSync(filePath)) return slug.charAt(0).toUpperCase() + slug.slice(1);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return content.localizedName || slug.charAt(0).toUpperCase() + slug.slice(1);
    } catch {
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const guide = getGuideContent(locale, slug);

    if (!guide) return { title: 'Not Found' };

    const canonicalUrl = `https://dreamboatjournal.com/${locale}/guide/${slug}`;

    return {
        title: guide.title,
        description: guide.seoDescription,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: guide.title,
            description: guide.seoDescription,
            url: canonicalUrl,
            type: 'article',
            locale,
        },
        twitter: {
            card: 'summary_large_image' as const,
            title: guide.title,
            description: guide.seoDescription,
        },
    };
}

function renderMarkdown(text: string) {
    return text.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} className="text-indigo-200 italic">{part.slice(1, -1)}</em>;
        }
        return part;
    });
}

export default async function GuidePage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const guide = getGuideContent(locale, slug);
    if (!guide) return <div>Guide not found</div>;

    const t_nav = await getTranslations('Navigation');

    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: locale === 'tr' ? 'Rehberler' : 'Guides', href: `/${locale}/guide` },
        { label: guide.title, href: `/${locale}/guide/${slug}` },
    ];

    // Build related symbols with localized names
    const relatedSymbolsData = guide.relatedSymbols.map(s => ({
        slug: s,
        name: getLocalizedSymbolName(locale, s),
    }));

    return (
        <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30">
            {/* Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px]"></div>
            </div>

            {/* JSON-LD: Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: guide.title,
                        description: guide.seoDescription,
                        image: 'https://dreamboatjournal.com/og-image.jpg',
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://dreamboatjournal.com/${locale}/guide/${slug}`,
                        },
                        author: { '@type': 'Organization', name: 'Dream Boat Journal', url: 'https://dreamboatjournal.com' },
                        publisher: { '@type': 'Organization', name: 'Dream Boat Journal', logo: { '@type': 'ImageObject', url: 'https://dreamboatjournal.com/images/logo.png' } },
                        datePublished: '2026-02-11T00:00:00Z',
                        dateModified: new Date().toISOString(),
                    }),
                }}
            />

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-3xl">
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wider text-purple-300 uppercase">
                        {locale === 'tr' ? '📖 Rehber' : '📖 Guide'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-4">
                        {guide.title}
                    </h1>
                    <p className="text-lg text-slate-400">{guide.heroSubtitle}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full mt-6"></div>
                </header>

                {/* Table of Contents */}
                <nav className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-white mb-4">{locale === 'tr' ? '📋 İçindekiler' : '📋 Table of Contents'}</h2>
                    <ol className="space-y-2">
                        {guide.sections.map((section, i) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-slate-400 hover:text-indigo-300 transition-colors text-sm flex items-center gap-2"
                                >
                                    <span className="text-indigo-500 font-mono text-xs">{i + 1}.</span>
                                    {section.heading}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* Content Sections */}
                <article className="prose prose-invert prose-lg max-w-none space-y-12">
                    {guide.sections.map((section) => (
                        <section key={section.id} id={section.id}>
                            <h2 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                {section.heading}
                            </h2>
                            <div className="text-lg leading-relaxed text-slate-200 whitespace-pre-line">
                                {renderMarkdown(section.content)}
                            </div>
                        </section>
                    ))}

                    {/* Related Dream Symbols from this guide */}
                    {relatedSymbolsData.length > 0 && (
                        <RelatedSymbols
                            symbols={relatedSymbolsData}
                            locale={locale}
                            title={locale === 'tr' ? 'Rüya Sembollerini Keşfet' : 'Explore Dream Symbols'}
                        />
                    )}

                    {/* FAQ */}
                    {guide.faqs.length > 0 && (
                        <FAQSection
                            title={locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
                            faqs={guide.faqs}
                        />
                    )}

                    {/* App CTA */}
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 text-center">
                        <h2 className="text-2xl font-bold text-white mb-3">{locale === 'tr' ? '📱 Rüyalarınızı Yorumlamaya Başlayın' : '📱 Start Interpreting Your Dreams'}</h2>
                        <p className="text-slate-300 mb-6">{locale === 'tr' ? 'DreamBoat ile rüyalarınızı kaydedin, yapay zeka destekli analizlerle yorumlayın ve görselleştirin.' : 'Download Dream Boat to record, analyze and visualize your dreams with AI-powered insights.'}</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a href="https://apps.apple.com/app/id6756622594" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold transition-colors">
                                🍎 App Store
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.dreamboat.mobile" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-colors">
                                ▶️ Google Play
                            </a>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}
