import localizedNames from '@/scripts/data/localized_names';

// A curated list of typically "popular" dreams to simulate dynamic trends
// These are chosen because they are universally common dream themes.
const POPULAR_POOL = [
    'snake', 'teeth-falling-out', 'flying', 'falling', 'chased',
    'water', 'fire', 'death', 'money', 'house',
    'baby', 'dog', 'cat', 'spider', 'ocean',
    'earthquake', 'storm', 'naked', 'ghost', 'zombie',
    'pregnancy', 'wedding', 'exam', 'car-accident', 'late',
    'lion', 'wolf', 'bear', 'horse', 'fish',
    'door', 'key', 'mirror', 'forest', 'mountain',
    'sea', 'river', 'flood', 'tornado', 'vampire',
    'alien', 'ufo', 'angel', 'demon', 'god',
    'kissing', 'cheating', 'divorce', 'crying', 'laughing'
];

export interface PopularSymbol {
    slug: string;
    name: string;
}

/**
 * Returns a randomized list of "popular" symbols.
 * Since we don't have a real database of user views yet, 
 * we act like we do by shuffling a list of very common dreams.
 */
export function getPopularSymbols(count: number = 5): PopularSymbol[] {
    // Cast to Record<string, string> to avoid implicit 'any' error
    const names = localizedNames as unknown as Record<string, string>;

    if (!names) return [];

    // 1. Filter pool to only include ones we actually have names for (safety)
    const available = POPULAR_POOL.filter(slug => names[slug]);

    // 2. Shuffle array (Fisher-Yates)
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Take top N
    return shuffled.slice(0, count).map(slug => ({
        slug,
        name: names[slug]
    }));
}
