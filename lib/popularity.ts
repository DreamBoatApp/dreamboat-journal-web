import fs from 'fs';
import path from 'path';

// A curated list of typically "popular" dreams to simulate dynamic trends
// These are chosen because they are universally common dream themes.
const POPULAR_POOL = [
    'snake', 'teeth', 'flying', 'falling', 'chased',
    'water', 'fire', 'death', 'money', 'house',
    'baby', 'dog', 'cat', 'spider', 'ocean',
    'earthquake', 'storm', 'naked', 'ghost', 'zombie',
    'pregnancy', 'wedding', 'exam', 'accident', 'late',
    'lion', 'wolf', 'bear', 'horse', 'fish',
    'door', 'key', 'mirror', 'forest', 'mountain',
    'sea', 'river', 'flood', 'tornado', 'vampire',
    'alien', 'gold', 'angel', 'demon', 'god',
    'kissing', 'cheating', 'divorce', 'crying', 'laughing'
];

export interface PopularSymbol {
    slug: string;
    name: string;
}

/**
 * Returns a randomized list of "popular" symbols with locale-aware names.
 * Reads localizedName from the content JSON files for the given locale.
 */
export function getPopularSymbols(count: number = 5, locale: string = 'en'): PopularSymbol[] {
    const contentDir = path.join(process.cwd(), 'content', locale, 'meanings');
    const enDir = path.join(process.cwd(), 'content', 'en', 'meanings');

    // Build name map for the pool
    const available: PopularSymbol[] = [];
    for (const slug of POPULAR_POOL) {
        try {
            const localePath = path.join(contentDir, `${slug}.json`);
            const enPath = path.join(enDir, `${slug}.json`);
            const filePath = fs.existsSync(localePath) ? localePath : (fs.existsSync(enPath) ? enPath : null);
            if (!filePath) continue;

            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const name = data.localizedName || slug.charAt(0).toUpperCase() + slug.slice(1);
            available.push({ slug, name });
        } catch {
            // skip
        }
    }

    // Shuffle (Fisher-Yates)
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}
