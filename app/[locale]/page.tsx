import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPopularSymbols } from '@/lib/popularity';
import SearchBar from '@/components/SearchBar';
import fs from 'fs';
import path from 'path';

type Props = {
    params: Promise<{ locale: string }>;
};

type BlogPostMeta = {
    slug: string;
    title: string;
    date: string;
    category: string;
};

function getRecentBlogPosts(locale: string, count: number = 4): BlogPostMeta[] {
    try {
        const dir = path.join(process.cwd(), 'content', locale, 'blog');
        const enDir = path.join(process.cwd(), 'content', 'en', 'blog');
        const targetDir = fs.existsSync(dir) ? dir : (fs.existsSync(enDir) ? enDir : null);
        if (!targetDir) return [];

        return fs.readdirSync(targetDir)
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const content = JSON.parse(fs.readFileSync(path.join(targetDir, f), 'utf-8'));
                return {
                    slug: f.replace('.json', ''),
                    title: content.title,
                    date: content.date || '2026-02-11',
                    category: content.category || 'Dream Psychology',
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, count);
    } catch {
        return [];
    }
}

const ALPHABET_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const ALPHABET_TR = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    const alphabet = locale === 'tr' ? ALPHABET_TR : ALPHABET_EN;
    setRequestLocale(locale);
    const t = await getTranslations('HomePage');

    // Get dynamic popular symbols (daily rotation, 12 items)
    const popularSymbols = getPopularSymbols(12, locale);

    // Get recent blog posts for internal linking
    const recentPosts = getRecentBlogPosts(locale, 4);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center relative overflow-hidden">

            {/* Central Nebula Glow - The "Soul" of the page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-4xl w-full flex flex-col items-center z-10 space-y-8">

                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light tracking-wide leading-relaxed">
                    {t('subtitle')}
                </p>

                {/* Premium Search Bar */}
                <div className="w-full max-w-lg mt-8 relative">
                    <SearchBar locale={locale} placeholder={t('searchPlaceholder')} />
                </div>

                {/* Popular Symbols (12 items, daily rotation) */}
                <div className="flex flex-wrap justify-center gap-3 text-sm text-indigo-200/70">
                    <span>{t('popular')}:</span>
                    {popularSymbols.map(symbol => (
                        <Link key={symbol.slug} href={`/meaning/${symbol.slug}`} className="hover:text-white underline decoration-indigo-500/30 hover:decoration-indigo-400 transition-all">
                            {symbol.name}
                        </Link>
                    ))}
                </div>

                {/* A-Z Dictionary Strip */}
                <div className="w-full max-w-2xl mt-4">
                    <h2 className="text-sm font-medium text-slate-400 mb-3">{t('browseDictionary')}</h2>
                    <nav className="flex flex-wrap justify-center gap-1.5">
                        {alphabet.map((letter: string) => (
                            <Link
                                key={letter}
                                href={`/dictionary/${letter.toLowerCase()}`}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-xs text-slate-400 hover:bg-indigo-600/30 hover:text-white transition-colors font-mono"
                            >
                                {letter}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Latest Blog Posts */}
                {recentPosts.length > 0 && (
                    <div className="w-full max-w-2xl mt-6">
                        <h2 className="text-sm font-medium text-slate-400 mb-3">{t('latestBlog')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {recentPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group block p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300 text-left"
                                >
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-300">
                                        {post.category}
                                    </span>
                                    <h3 className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors mt-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={`/blog`}
                            className="inline-block mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {t('exploreAll')}
                        </Link>
                    </div>
                )}

            </div>

            {/* Floating Elements (Subtle Stars/Fireflies could go here) */}
        </main>
    );
}
