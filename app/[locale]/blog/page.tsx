import { getTranslations, setRequestLocale } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const revalidate = 86400; // ISR: revalidate daily

type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
};

type Props = {
    params: Promise<{ locale: string }>;
};

function getBlogPosts(locale: string): BlogPost[] {
    try {
        const dir = path.join(process.cwd(), 'content', locale, 'blog');
        const enDir = path.join(process.cwd(), 'content', 'en', 'blog');
        const targetDir = fs.existsSync(dir) ? dir : (fs.existsSync(enDir) ? enDir : null);
        if (!targetDir) return [];

        const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.json'));
        return files.map(f => {
            const content = JSON.parse(fs.readFileSync(path.join(targetDir, f), 'utf-8'));
            return {
                slug: f.replace('.json', ''),
                title: content.title,
                excerpt: content.excerpt || content.seoDescription,
                date: content.date || '2026-02-11',
                readTime: content.readTime || '5 min',
                category: content.category || 'Dream Psychology',
            };
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const titles: Record<string, string> = {
        en: 'Dream Journal Blog — Insights & Guides',
        tr: 'Rüya Günlüğü Blog — İçgörüler ve Rehberler',
    };

    const descriptions: Record<string, string> = {
        en: 'Explore articles on dream psychology, common dream meanings, and tips for better dream recall.',
        tr: 'Rüya psikolojisi, yaygın rüya anlamları ve daha iyi rüya hatırlama ipuçları hakkında makaleler.',
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        alternates: {
            canonical: `https://dreamboatjournal.com/${locale}/blog`,
            languages: {
                'x-default': `https://dreamboatjournal.com/en/blog`,
                'en': `https://dreamboatjournal.com/en/blog`,
                'tr': `https://dreamboatjournal.com/tr/blog`,
            },
        },
    };
}

export default async function BlogListPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t_nav = await getTranslations('Navigation');
    const allPosts = getBlogPosts(locale);

    const breadcrumbItems = [
        { label: t_nav('home'), href: `/${locale}` },
        { label: t_nav('blog'), href: `/${locale}/blog` },
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-4xl">
                <Breadcrumb items={breadcrumbItems} locale={locale} />

                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-4">
                        {locale === 'tr' ? 'Rüya Günlüğü Blog' : 'Dream Journal Blog'}
                    </h1>
                    <p className="text-lg text-slate-400">{locale === 'tr' ? 'Rüya psikolojisi, anlamları ve kozmik bağlantılar üzerine yazılar' : 'Articles on dream psychology, meanings, and cosmic connections'}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto rounded-full mt-6"></div>
                </header>

                {allPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-400 mb-4">Coming soon...</p>
                        <p className="text-slate-500">We&apos;re working on insightful articles about dream interpretation.</p>
                        <Link
                            href={`/${locale}`}
                            className="inline-block mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-medium transition-colors"
                        >
                            {locale === 'tr' ? 'Rüya Sembollerini Keşfet →' : 'Explore Dream Symbols →'}
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {allPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/${locale}/blog/${post.slug}`}
                                className="group block p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-300">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-slate-500">{post.date}</span>
                                    <span className="text-xs text-slate-500">· {post.readTime} {locale === 'tr' ? 'okuma' : 'read'}</span>
                                </div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Cross-link: Popular Dream Symbols → Dictionary (SEO internal linking) */}
                <section className="mt-16 pt-10 border-t border-white/10">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        {locale === 'tr' ? 'Popüler Rüya Sembolleri' : 'Popular Dream Symbols'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {[
                            { slug: 'snake', en: 'Snake', tr: 'Yılan' },
                            { slug: 'water', en: 'Water', tr: 'Su' },
                            { slug: 'falling', en: 'Falling', tr: 'Düşmek' },
                            { slug: 'teeth', en: 'Teeth', tr: 'Diş' },
                            { slug: 'death', en: 'Death', tr: 'Ölüm' },
                            { slug: 'flying', en: 'Flying', tr: 'Uçmak' },
                            { slug: 'baby', en: 'Baby', tr: 'Bebek' },
                            { slug: 'spider', en: 'Spider', tr: 'Örümcek' },
                            { slug: 'fire', en: 'Fire', tr: 'Ateş' },
                            { slug: 'dog', en: 'Dog', tr: 'Köpek' },
                        ].map(symbol => (
                            <Link
                                key={symbol.slug}
                                href={`/${locale}/meaning/${symbol.slug}`}
                                className="group block p-3 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 text-center"
                            >
                                <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                                    {locale === 'tr' ? symbol.tr : symbol.en}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Link
                            href={`/${locale}/dictionary/a`}
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {locale === 'tr' ? 'Tüm Sembolleri Keşfet →' : 'Explore All Symbols →'}
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
