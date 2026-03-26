import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import keywordIndex from '@/scripts/data/keyword_index';
// @ts-ignore
import localizedNames from '@/scripts/data/localized_names';
// @ts-ignore
import localizedKeywords from '@/scripts/data/keyword_index_localized';
import { logFailedSearch } from '@/lib/logger';

// noindex search results - thin/duplicate content
export const metadata: Metadata = {
    robots: { index: false, follow: true },
};

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

    const words = normalized.split(' ').filter(word => word.length >= 2);

    // If multiple words, add the full phrase as the highest priority keyword
    if (words.length > 1) {
        return [normalized, ...words];
    }

    return words;
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
        let foundAny = false;

        // 1. Direct Match (Fast & Exact)
        const exactSlug = index[keyword];
        if (exactSlug) {
            if (!seenSlugs.has(exactSlug)) {
                matches.push({ keyword, slug: exactSlug, distance: 0 });
                seenSlugs.add(exactSlug);
            }
            foundAny = true;
        }

        // 2. Containing Match — find ALL index keys that contain this keyword
        // e.g. "gelinlik" also matches "gelinlik giymek", "rüyada gelinlik görmek"
        // Only for keywords >= 3 chars to avoid noise from short words
        if (keyword.length >= 3) {
            for (const key of indexKeys) {
                if (key === keyword) continue; // already handled above
                // Check if keyword appears as a whole word/segment in the key
                if (key.includes(keyword)) {
                    const slug = index[key];
                    if (!seenSlugs.has(slug)) {
                        matches.push({ keyword: key, slug, distance: 0 });
                        seenSlugs.add(slug);
                        foundAny = true;
                    }
                }
            }
        }

        // 3. Prefix Match (Agglutinative Support - e.g. "okulda" -> matches "okul")
        // Only if we haven't found any matches yet
        if (!foundAny) {
            const prefixMatches = indexKeys
                .filter(k => k.length >= 3 && keyword.startsWith(k))
                .sort((a, b) => b.length - a.length);

            for (const pm of prefixMatches) {
                const slug = index[pm];
                if (!seenSlugs.has(slug)) {
                    matches.push({ keyword: pm, slug, distance: 0 });
                    seenSlugs.add(slug);
                    foundAny = true;
                }
                if (matches.length >= 10) break; // Limit prefix matches
            }
        }

        // 4. Fuzzy Match (Typo Tolerance) — only if nothing found
        if (!foundAny && keyword.length >= 4) {
            let bestMatchKey = '';
            let minDistance = Infinity;

            for (const key of indexKeys) {
                if (Math.abs(key.length - keyword.length) > 2) continue;

                const dist = levenshtein(keyword, key);
                const maxDist = keyword.length < 6 ? 1 : 2;

                if (dist <= maxDist && dist < minDistance) {
                    minDistance = dist;
                    bestMatchKey = key;
                }
            }

            if (bestMatchKey) {
                const slug = index[bestMatchKey];
                if (!seenSlugs.has(slug)) {
                    matches.push({ keyword: bestMatchKey, slug, distance: minDistance });
                    seenSlugs.add(slug);
                }
            }
        }
    }

    // Limit total results to avoid overwhelming the user
    return matches.slice(0, 15);
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

    // Merge indexes: Localized keywords take precedence over general associations
    const combinedIndex = {
        ...keywordIndex,
        ...localizedKeywords
    };

    const matches = findMatches(keywords, combinedIndex as Record<string, string>);

    // Sort matches: exact keyword matches first, then containing matches
    // "Direct" matches are those where the keyword equals the search term itself
    const normalizedQuery = query.toLowerCase()
        .replace(/[.,!?;:'"()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    matches.sort((a, b) => {
        const aExact = a.keyword === normalizedQuery ? 0 : 1;
        const bExact = b.keyword === normalizedQuery ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        // Then by keyword length (shorter = more relevant)
        return a.keyword.length - b.keyword.length;
    });

    // 1. Exact Phrase Match Priority
    // If the user's FULL query matches an index key exactly, redirect immediately.
    const exactMatch = matches.find(m => m.keyword === normalizedQuery && (m.distance === 0 || m.distance === undefined));
    if (exactMatch) {
        redirect(`/${locale}/meaning/${exactMatch.slug}`);
    }

    // 2. Single Result — redirect directly
    if (matches.length === 1) {
        redirect(`/${locale}/meaning/${matches[0].slug}`);
    }

    // Log failed search if no matches found
    if (matches.length === 0 && query.length > 2) {
        await logFailedSearch(query, locale, 'web');
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
                    <div className="flex flex-wrap gap-3 justify-center">
                        <a href="https://apps.apple.com/app/id6756622594" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-bold transition-colors">
                            🍎 App Store
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.dreamboat.mobile" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold transition-colors">
                            ▶️ Google Play
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
}

