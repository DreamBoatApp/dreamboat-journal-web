/**
 * Find SEO Duplicates
 * 
 * Detects near-duplicate dream symbol pages that should be consolidated:
 * - Plural/singular pairs (apple/apples, bicycle/bicycles)
 * - Underscore vs no-underscore (mother_in_law/motherinlaw)
 * - Compound word variants (birth_day/birthday)
 * 
 * Outputs a report + generates alias_map entries for 301 redirects.
 */

const fs = require('fs');
const path = require('path');
const dictionary = require('./data/source_dictionary');

const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const allSlugs = Object.keys(dictionary).map(k => slugify(k));
const slugSet = new Set(allSlugs);

const duplicates = [];
const aliasEntries = {};

// --- Strategy 1: Plural/Singular ---
// If "slugs" exists and "slug" also exists, mark "slugs" as duplicate
allSlugs.forEach(slug => {
    // slugs -> slug (simple -s plural)
    if (slug.endsWith('s') && slug.length > 3) {
        const singular = slug.slice(0, -1);
        if (slugSet.has(singular) && singular !== slug) {
            duplicates.push({ canonical: singular, duplicate: slug, reason: 'plural-s' });
            aliasEntries[slug] = singular;
        }
    }
    // sluges -> slug (e.g. "witches" -> "witch")  
    if (slug.endsWith('es') && slug.length > 4) {
        const singular = slug.slice(0, -2);
        if (slugSet.has(singular) && singular !== slug) {
            duplicates.push({ canonical: singular, duplicate: slug, reason: 'plural-es' });
            aliasEntries[slug] = singular;
        }
    }
    // slugies -> slugy (e.g. "butterflies" -> "butterfly")
    if (slug.endsWith('ies') && slug.length > 5) {
        const singular = slug.slice(0, -3) + 'y';
        if (slugSet.has(singular) && singular !== slug) {
            duplicates.push({ canonical: singular, duplicate: slug, reason: 'plural-ies' });
            aliasEntries[slug] = singular;
        }
    }
});

// --- Strategy 2: Underscore variants ---
// If "mother-in-law" and "motherinlaw" both exist
allSlugs.forEach(slug => {
    if (slug.includes('-')) {
        const noHyphen = slug.replace(/-/g, '');
        if (slugSet.has(noHyphen) && noHyphen !== slug) {
            // Keep the hyphenated version as canonical (more readable)
            duplicates.push({ canonical: slug, duplicate: noHyphen, reason: 'hyphen-variant' });
            aliasEntries[noHyphen] = slug;
        }
    }
});

// --- Report ---
console.log(`\n=== Duplicate Detection Report ===`);
console.log(`Total slugs scanned: ${allSlugs.length}`);
console.log(`Duplicates found: ${duplicates.length}\n`);

// Group by reason
const byReason = {};
duplicates.forEach(d => {
    if (!byReason[d.reason]) byReason[d.reason] = [];
    byReason[d.reason].push(d);
});

for (const [reason, items] of Object.entries(byReason)) {
    console.log(`--- ${reason} (${items.length}) ---`);
    items.forEach(d => console.log(`  ${d.duplicate} → ${d.canonical}`));
}

// Write alias entries
if (Object.keys(aliasEntries).length > 0) {
    const outputPath = path.join(__dirname, 'data', 'seo_aliases.json');
    fs.writeFileSync(outputPath, JSON.stringify(aliasEntries, null, 2));
    console.log(`\nWritten ${Object.keys(aliasEntries).length} alias entries to ${outputPath}`);
    console.log(`\nTo apply: merge seo_aliases.json into alias_map.js`);
}
