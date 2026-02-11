// A curated list of "popular" dream symbols with pre-baked names per locale.
// No filesystem reads at runtime — instant, cacheable.

export interface PopularSymbol {
    slug: string;
    name: string;
}

// Top popular symbols with localized names (pre-baked, no fs reads)
const POPULAR_SYMBOLS: Record<string, Record<string, string>> = {
    snake: { en: 'Snake', tr: 'Yılan' },
    teeth: { en: 'Teeth', tr: 'Diş' },
    flying: { en: 'Flying', tr: 'Uçmak' },
    falling: { en: 'Falling', tr: 'Düşmek' },
    water: { en: 'Water', tr: 'Su' },
    fire: { en: 'Fire', tr: 'Ateş' },
    death: { en: 'Death', tr: 'Ölüm' },
    money: { en: 'Money', tr: 'Para' },
    baby: { en: 'Baby', tr: 'Bebek' },
    dog: { en: 'Dog', tr: 'Köpek' },
    cat: { en: 'Cat', tr: 'Kedi' },
    spider: { en: 'Spider', tr: 'Örümcek' },
    ocean: { en: 'Ocean', tr: 'Okyanus' },
    earthquake: { en: 'Earthquake', tr: 'Deprem' },
    wedding: { en: 'Wedding', tr: 'Düğün' },
    lion: { en: 'Lion', tr: 'Aslan' },
    wolf: { en: 'Wolf', tr: 'Kurt' },
    horse: { en: 'Horse', tr: 'At' },
    gold: { en: 'Gold', tr: 'Altın' },
    angel: { en: 'Angel', tr: 'Melek' },
};

const SYMBOL_SLUGS = Object.keys(POPULAR_SYMBOLS);

/**
 * Returns a fixed list of popular symbols — no filesystem reads,
 * no randomization on server. The order rotates daily for variety.
 */
export function getPopularSymbols(count: number = 5, locale: string = 'en'): PopularSymbol[] {
    // Rotate based on day-of-year so users see different symbols each day
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const startIndex = dayOfYear % SYMBOL_SLUGS.length;

    const result: PopularSymbol[] = [];
    for (let i = 0; i < count; i++) {
        const idx = (startIndex + i) % SYMBOL_SLUGS.length;
        const slug = SYMBOL_SLUGS[idx];
        const names = POPULAR_SYMBOLS[slug];
        result.push({
            slug,
            name: names[locale] || names['en'],
        });
    }

    return result;
}
