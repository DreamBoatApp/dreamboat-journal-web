/**
 * Remove all multi-word symbols from:
 * 1. source_dictionary.js
 * 2. keyword_index.js
 * 3. keyword_index_localized.js
 * 4. Content JSON files (all locales)
 */

const fs = require('fs');
const path = require('path');

// --- 1. Clean source_dictionary.js ---
const dictPath = path.join(__dirname, 'data', 'source_dictionary.js');
const dict = require(dictPath);
const allKeys = Object.keys(dict);
const multiWordKeys = allKeys.filter(k => k.includes('_') || k.includes(' '));
const singleWordKeys = allKeys.filter(k => !k.includes('_') && !k.includes(' '));

console.log(`Dictionary: ${allKeys.length} total, removing ${multiWordKeys.length} multi-word, keeping ${singleWordKeys.length}`);

// Build new dictionary
const newDict = {};
for (const key of singleWordKeys) {
    newDict[key] = dict[key];
}

// Write new dictionary
const dictLines = Object.entries(newDict).map(([key, val]) => {
    return `    ${JSON.stringify(key)}: ${JSON.stringify(val)}`;
});
const dictContent = `const dictionary = {\n${dictLines.join(',\n')}\n};\n\nmodule.exports = dictionary;\n`;
fs.writeFileSync(dictPath, dictContent);
console.log('✓ source_dictionary.js updated');

// --- 2. Build set of valid slugs (single-word only) ---
const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-').replace(/[^\w\-]+/g, '');
const validSlugs = new Set(singleWordKeys.map(slugify));
// Also add aliases that point to valid slugs
// (alias_map will regenerate from the new dict, but for keyword cleanup we need current valid targets)

// --- 3. Clean keyword_index.js ---
const kiPath = path.join(__dirname, 'data', 'keyword_index.js');
const ki = require(kiPath);
const newKi = {};
let kiRemoved = 0;
for (const [key, slug] of Object.entries(ki)) {
    if (validSlugs.has(slug)) {
        newKi[key] = slug;
    } else {
        kiRemoved++;
    }
}
const kiLines = Object.entries(newKi).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
const kiContent = `// Auto-generated keyword index (single-word symbols only)\n\nconst keywordIndex = {\n${kiLines.join(',\n')}\n};\n\nmodule.exports = keywordIndex;\n`;
fs.writeFileSync(kiPath, kiContent);
console.log(`✓ keyword_index.js: removed ${kiRemoved} mappings, kept ${Object.keys(newKi).length}`);

// --- 4. Clean keyword_index_localized.js ---
const klPath = path.join(__dirname, 'data', 'keyword_index_localized.js');
const kl = require(klPath);
const newKl = {};
let klRemoved = 0;
for (const [key, slug] of Object.entries(kl)) {
    if (validSlugs.has(slug)) {
        newKl[key] = slug;
    } else {
        klRemoved++;
    }
}
const klLines = Object.entries(newKl).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
const klContent = `// Auto-generated localized keyword index (single-word symbols only)\n\nconst localizedKeywords = {\n${klLines.join(',\n')}\n};\n\nmodule.exports = localizedKeywords;\n`;
fs.writeFileSync(klPath, klContent);
console.log(`✓ keyword_index_localized.js: removed ${klRemoved} mappings, kept ${Object.keys(newKl).length}`);

// --- 5. Delete content JSON files for removed symbols ---
const removedSlugs = new Set(multiWordKeys.map(slugify));
const locales = ['en', 'tr', 'de', 'es', 'pt'];
let filesDeleted = 0;

for (const locale of locales) {
    const dir = path.join(__dirname, '..', 'content', locale, 'meanings');
    if (!fs.existsSync(dir)) continue;

    for (const slug of removedSlugs) {
        const filePath = path.join(dir, `${slug}.json`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            filesDeleted++;
        }
    }
}
console.log(`✓ Deleted ${filesDeleted} content files across ${locales.length} locales`);

// --- Summary ---
console.log('\n=== SUMMARY ===');
console.log(`Dictionary: ${singleWordKeys.length} symbols remaining`);
console.log(`Keyword index: ${Object.keys(newKi).length} mappings remaining`);
console.log(`Localized index: ${Object.keys(newKl).length} mappings remaining`);
console.log(`Content files deleted: ${filesDeleted}`);
