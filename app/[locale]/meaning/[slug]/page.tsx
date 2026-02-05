import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import MoonPhaseWidget from '@/components/MoonPhaseWidget';
import InlineCTA from '@/components/InlineCTA';
import dictionary from '@/scripts/data/source_dictionary';
import aliasMap from '@/scripts/data/alias_map';

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

// --- SSG PARAM GENERATION ---
// This enables static generation for ALL valid paths at build time
export async function generateStaticParams() {
    const keys = Object.keys(dictionary); // Get all 423 keys (e.g., "SNAKE")
    const locales = ['en', 'tr', 'de', 'es', 'pt'];
    const paths = [];

    // We need to slugify keys here to match file names
    // Simple helper matching the script's logic
    const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    // DEBUG: Limit removed - Generate ALL pages
    const limitedKeys = keys; // keys.slice(0, 10);

    for (const locale of locales) {
        for (const key of limitedKeys) {
            paths.push({
                locale,
                slug: slugify(key)
            });
        }
    }

    return paths;
}

// --- METADATA ---
export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const content = getContent(locale, slug);

    if (!content) return { title: 'Not Found' };

    return {
        title: content.title,
        description: content.seoDescription,
        alternates: {
            languages: {
                'en': `/en/meaning/${slug}`,
                'tr': `/tr/meaning/${slug}`,
                'de': `/de/meaning/${slug}`,
                'es': `/es/meaning/${slug}`,
                'pt': `/pt/meaning/${slug}`,
            }
        }
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

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: t.title,
                        description: t.seoDescription,
                        image: 'https://dreamboatjournal.com/og-image.jpg',
                        author: {
                            '@type': 'Organization',
                            name: 'Dream Boat Journal',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://dreamboatjournal.com/logo.png'
                            }
                        },
                        datePublished: new Date().toISOString(), // In a real app this would be build time
                    })
                }}
            />

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-4xl">

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

                <div className="grid md:grid-cols-[1fr_300px] gap-12">

                    {/* Main Content */}
                    <article className="prose prose-invert prose-lg max-w-none">

                        {/* Introduction */}
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-xl">
                            <p className="text-lg leading-relaxed text-slate-200">
                                {t.introduction}
                            </p>
                        </div>

                        {/* Symbolism Deep Dive */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-indigo-300">
                                {t_page('symbolismTitle')}
                            </h2>
                            <div className="prose-p:text-slate-300">
                                <p className="whitespace-pre-line">{t.symbolism}</p>
                            </div>
                        </section>

                        {/* Cosmic Connection */}
                        <section className="mb-12 p-6 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-amber-300">
                                {t_page('cosmicConnectionTitle')}
                            </h2>
                            <p className="text-slate-300 italic">
                                "{t.cosmicAnalysis}"
                            </p>
                        </section>

                        {/* Inline CTA */}
                        <InlineCTA symbol={t.title.split(' ').pop() || slug} />

                        {/* Common Scenarios */}
                        <section>
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                {t_page('commonDreamsTitle')}
                            </h2>
                            <ul className="grid gap-4">
                                {content.commonScenarios.map((scenario, i) => (
                                    <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all">
                                        <span className="text-indigo-400 font-mono text-lg">0{i + 1}</span>
                                        <p className="text-gray-300">{fixCaps(scenario)}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Moon Phase Widget */}
                        <MoonPhaseWidget />

                        {/* CTA Box */}
                        <div className="rounded-2xl bg-indigo-600 p-6 text-center shadow-lg shadow-indigo-900/50">
                            <h3 className="text-xl font-bold text-white mb-2">Dive Deeper</h3>
                            <p className="text-indigo-100 text-sm mb-4">
                                Get a personalized interpretation of your dream using our AI engine.
                            </p>
                            <a href="https://onelink.to/dreamboat" className="block w-full py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                                Launch Dream Boat
                            </a>
                        </div>
                    </aside>

                </div>

            </main>
        </div>
    );
}
