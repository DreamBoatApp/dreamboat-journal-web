import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import MoonPhaseWidget from '@/components/MoonPhaseWidget';
import InlineCTA from '@/components/InlineCTA';
import dictionary from '@/scripts/data/source_dictionary';

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

    // DEBUG: Limit to 10 pages to unblock Vercel build
    const limitedKeys = keys.slice(0, 10);

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
    const content = getContent(params.locale, params.slug);

    if (!content) return { title: 'Not Found' };

    return {
        title: content.title,
        description: content.seoDescription,
        alternates: {
            languages: {
                'en': `/en/meaning/${params.slug}`,
                'tr': `/tr/meaning/${params.slug}`,
                'de': `/de/meaning/${params.slug}`,
                'es': `/es/meaning/${params.slug}`,
                'pt': `/pt/meaning/${params.slug}`,
            }
        }
    };
}

// --- PAGE COMPONENT ---
export default function MeaningPage({ params }: Props) {
    const content = getContent(params.locale, params.slug);

    if (!content) notFound();

    // Helper to fix capitalization title (e.g. SNAKE -> Snake)
    // This is a purely visual fix.
    const fixCaps = (text: string) => {
        return text.replace(/\b([A-Z]{2,})\b/g, (match) => {
            return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
        });
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/10 blur-[100px] mix-blend-screen"></div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: content.title,
                        description: content.seoDescription,
                        image: 'https://dreamboatjournal.com/og-image.jpg', // Placeholder
                        author: {
                            '@type': 'Organization',
                            name: 'Dream Boat Team',
                            url: 'https://dreamboatjournal.com'
                        },
                        publisher: {
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

                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-indigo-300/60 font-mono tracking-wide">
                    <Link href={`/${params.locale}`} className="hover:text-white transition-colors">HOME</Link>
                    <span>/</span>
                    <Link href={`/${params.locale}/dictionary`} className="hover:text-white transition-colors">DICTIONARY</Link>
                    <span>/</span>
                    <span className="text-indigo-400">{params.slug.toUpperCase()}</span>
                </nav>

                {/* Hero Section */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200 leading-tight mb-6">
                        {fixCaps(content.title)}
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed border-l-4 border-indigo-500 pl-6 italic">
                        {fixCaps(content.introduction)}
                    </p>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Article Area */}
                    <article className="lg:col-span-2 space-y-12">

                        {/* Symbolism */}
                        <section className="prose prose-invert prose-indigo max-w-none">
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                Symbolism & Archetypes
                            </h2>
                            <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                                {fixCaps(content.symbolism)}
                            </div>
                        </section>

                        {/* Cosmic Analysis */}
                        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/10 border border-indigo-500/20 p-8">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                            </div>
                            <h2 className="text-xl font-semibold text-indigo-200 mb-4">✨ Cosmic Connection</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {fixCaps(content.cosmicAnalysis)}
                            </p>
                        </section>

                        {/* Inline CTA */}
                        <InlineCTA symbol={content.title.split(' ').pop() || params.slug} />

                        {/* Common Scenarios */}
                        <section>
                            <h2 className="text-2xl font-semibold text-white flex items-center gap-3 mb-6">
                                <span className="w-8 h-[1px] bg-indigo-500"></span>
                                Common Dreams
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
