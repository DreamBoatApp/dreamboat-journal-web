import { redirect } from 'next/navigation';
import Link from 'next/link';
import keywordIndex from '@/scripts/data/keyword_index';
// @ts-ignore
import localizedNames from '@/scripts/data/localized_names';
import { logFailedSearch } from '@/lib/logger';


type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
};



// ... (extractKeywords and findMatches remain unchanged)
// We skip re-writing them to save tokens/complexity, targeting only the import and component start

// Helper to clean query
function extractKeywords(query: string): string[] {
    const normalized = query.toLowerCase()
        .replace(/[.,!?;:'"()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return normalized.split(' ').filter(word => word.length >= 2);
}

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,    // deletion
                    matrix[i][j - 1] + 1,    // insertion
                    matrix[i - 1][j - 1] + 1 // substitution
                );
            }
        }
    }
    return matrix[a.length][b.length];
}

function findMatches(keywords: string[], index: Record<string, string>): { keyword: string; slug: string; distance?: number }[] {
    const matches: { keyword: string; slug: string; distance?: number }[] = [];
    const seenSlugs = new Set<string>();

    const indexKeys = Object.keys(index);

    for (const keyword of keywords) {
        // 1. Direct Match (Fast & Exact)
        const exactSlug = index[keyword];
        if (exactSlug) {
            if (!seenSlugs.has(exactSlug)) {
                matches.push({ keyword, slug: exactSlug, distance: 0 });
                seenSlugs.add(exactSlug);
            }
            continue;
        }

        // 2. Prefix Match (Agglutinative Support - e.g. "okulda" -> matches "okul")
        const prefixMatch = indexKeys
            .filter(k => k.length >= 3 && keyword.startsWith(k))
            .sort((a, b) => b.length - a.length)[0];

        if (prefixMatch) {
            const slug = index[prefixMatch];
            if (!seenSlugs.has(slug)) {
                matches.push({ keyword: prefixMatch, slug, distance: 0 });
                seenSlugs.add(slug);
            }
            continue;
        }

        // 3. Fuzzy Match (Typo Tolerance)
        // Check for words with small edit distance (e.g. "öğrrtmen" -> "öğretmen")
        if (keyword.length >= 4) { // Only fuzzy search if word is long enough
            let bestMatchKey = '';
            let minDistance = Infinity;

            for (const key of indexKeys) {
                // Optimization: Skip keys with large length difference
                if (Math.abs(key.length - keyword.length) > 2) continue;

                const dist = levenshtein(keyword, key);

                // Allow distance of 1 for words < 6 chars, 2 for longer words
                const maxDist = keyword.length < 6 ? 1 : 2;

                if (dist <= maxDist && dist < minDistance) {
                    minDistance = dist;
                    bestMatchKey = key;
                }
            }

            if (bestMatchKey) {
                const slug = index[bestMatchKey];
                if (!seenSlugs.has(slug)) {
                    // Add a small penalty or indicator for fuzzy matches if needed, 
                    // but for now we treat them as valid find.
                    matches.push({ keyword: bestMatchKey, slug, distance: minDistance });
                    seenSlugs.add(slug);
                }
            }
        }
    }
    return matches;
}

import { getPopularSymbols } from '@/lib/popularity';

// ... (existing helper functions)

export default async function SearchPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { q: query = '' } = await searchParams;

    // Get dynamic popular symbols for "no results" state
    const popularSymbols = getPopularSymbols(5);

    if (!query) {
        redirect(`/${locale}`);
    }

    const keywords = extractKeywords(query);
    const matches = findMatches(keywords, keywordIndex as Record<string, string>);

    // If exactly one match (even if fuzzy), redirect directly to that symbol page
    if (matches.length === 1) {
        redirect(`/${locale}/meaning/${matches[0].slug}`);
    }

    // Log failed search if no matches found
    if (matches.length === 0 && query.length > 2) {
        logFailedSearch(query, locale, 'web');
    }

    // ... (Rest of the component remains largely the same, maybe update the UI to show "Did you mean?" if needed)
    // For now, we just show the results as if they were direct matches to keep it simple as requested.
    // The user said "bunu mu demek istediniz gibi bir şey yapılabilir DOĞRU SEMBOLE YÖNLENDİRECEK"
    // Since we redirect on single match, this logic covers the "redirect to correct symbol" part.
    // If multiple fuzzy matches found, they will be listed.

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
                            {/* If we have matches, checking if they were exact or fuzzy isn't strictly necessary for the title, 
                                but nice to have. For now, general title. */}
                            Bulunan semboller:
                        </h1>

                        <div className="grid gap-4">
                            {matches.map(({ keyword, slug, distance }) => {
                                // @ts-ignore
                                const displayName = localizedNames[slug] || slug.replace(/-/g, ' ');
                                return (
                                    <Link
                                        key={slug}
                                        href={`/${locale}/meaning/${slug}`}
                                        className="block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h2 className="text-2xl font-semibold text-white capitalize mb-1 group-hover:text-indigo-300 transition-colors">
                                                    {displayName}
                                                </h2>
                                                {!!distance && distance > 0 && (
                                                    <span className="text-xs text-amber-500 block mb-1">
                                                        "{keyword}" olarak düzelttik
                                                    </span>
                                                )}
                                                <span className="text-sm text-slate-400">
                                                    Sembol anlamını okumak için dokunun
                                                </span>
                                            </div>
                                            <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                                                →
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
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
                                {popularSymbols.map(symbol => (
                                    <Link
                                        key={symbol.slug}
                                        href={`/${locale}/search?q=${symbol.name}`}
                                        className="px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 transition-colors"
                                    >
                                        {symbol.name}
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

