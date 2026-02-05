import { redirect } from 'next/navigation';
import Link from 'next/link';
import keywordIndex from '@/scripts/data/keyword_index';
import { logFailedSearch } from '@/lib/logger';

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
};

// ... (extractKeywords and findMatches remain unchanged)
// We skip re-writing them to save tokens/complexity, targeting only the import and component start

function extractKeywords(query: string): string[] {
    const normalized = query.toLowerCase()
        .replace(/[.,!?;:'"()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return normalized.split(' ').filter(word => word.length >= 2);
}

function findMatches(keywords: string[], index: Record<string, string>): { keyword: string; slug: string }[] {
    const matches: { keyword: string; slug: string }[] = [];
    const seenSlugs = new Set<string>();

    for (const keyword of keywords) {
        const slug = index[keyword];
        if (slug && !seenSlugs.has(slug)) {
            matches.push({ keyword, slug });
            seenSlugs.add(slug);
        }
    }
    return matches;
}

export default async function SearchPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { q: query = '' } = await searchParams;

    if (!query) {
        redirect(`/${locale}`);
    }

    const keywords = extractKeywords(query);
    const matches = findMatches(keywords, keywordIndex as Record<string, string>);

    // If exactly one match, redirect directly to that symbol page
    if (matches.length === 1) {
        redirect(`/${locale}/meaning/${matches[0].slug}`);
    }

    // Log failed search if no matches found
    if (matches.length === 0 && query.length > 2) {
        logFailedSearch(query, locale, 'web');
    }

    // Multiple matches or no matches - show results page
    return (
        <div className="min-h-screen bg-[#030014] text-white">
            {/* Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/20 blur-[120px]"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">

                {/* Search Again */}
                <form action={`/${locale}/search`} className="mb-12">
                    <div className="relative">
                        <input
                            name="q"
                            type="text"
                            defaultValue={query}
                            placeholder="Rüyanızı yazın..."
                            className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-lg"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 rounded-full text-white font-medium hover:bg-indigo-500 transition-colors"
                        >
                            Ara
                        </button>
                    </div>
                </form>

                {/* Results */}
                {matches.length > 0 ? (
                    <>
                        <h1 className="text-2xl font-bold mb-6">
                            Rüyanızda bulunan semboller:
                        </h1>

                        <div className="grid gap-4">
                            {matches.map(({ keyword, slug }) => (
                                <Link
                                    key={slug}
                                    href={`/${locale}/meaning/${slug}`}
                                    className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-indigo-400 text-sm">"{keyword}" →</span>
                                            <h2 className="text-xl font-semibold text-white capitalize mt-1">
                                                {slug.replace(/-/g, ' ')}
                                            </h2>
                                        </div>
                                        <span className="text-indigo-400">→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <p className="mt-8 text-slate-400 text-center">
                            Detaylı yorum için bir sembole tıklayın
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-6 text-center">
                            Sembol bulunamadı
                        </h1>

                        <p className="text-slate-400 text-center mb-8">
                            "{query}" için eşleşen bir rüya sembolü bulamadık.
                        </p>

                        <div className="text-center">
                            <p className="text-slate-300 mb-4">Popüler sembolleri deneyin:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['yılan', 'diş', 'uçmak', 'su', 'köpek'].map(symbol => (
                                    <Link
                                        key={symbol}
                                        href={`/${locale}/search?q=${symbol}`}
                                        className="px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 transition-colors"
                                    >
                                        {symbol}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* App CTA */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 text-center">
                    <h3 className="text-xl font-bold mb-2">Rüyanızın tam yorumunu ister misiniz?</h3>
                    <p className="text-slate-300 mb-4">
                        Dream Boat uygulamasında rüyanızın kişisel analizini alın.
                    </p>
                    <a
                        href="https://onelink.to/dreamboat"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white font-bold hover:from-amber-400 hover:to-orange-400 transition-all"
                    >
                        Uygulamayı İndir
                    </a>
                </div>

            </main>
        </div>
    );
}

