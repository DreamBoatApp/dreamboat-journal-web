
const fs = require('fs');
const path = require('path');

// Resolve paths relative to this script
const kiPath = path.join(__dirname, 'data/keyword_index');
const klPath = path.join(__dirname, 'data/keyword_index_localized');
const dictPath = path.join(__dirname, 'data/source_dictionary');
const aliasPath = path.join(__dirname, 'data/alias_map');

const ki = require(kiPath);
const kl = require(klPath);
const dictionary = require(dictPath);
const aliasMap = require(aliasPath);

// 1. Build Set of Valid Slugs
const validSlugs = new Set();
// Add Main Symbols
Object.keys(dictionary).forEach(k => {
    const slug = k.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    validSlugs.add(slug);
});
// Add Aliases (also valid targets)
Object.keys(aliasMap).forEach(k => validSlugs.add(k));

console.log('Total valid targets (Symbols + Aliases):', validSlugs.size);

function fixIndex(index, name, filePath) {
    let fixed = 0;
    let deleted = 0;
    const newIndex = {};

    Object.entries(index).forEach(([key, slug]) => {
        if (validSlugs.has(slug)) {
            newIndex[key] = slug; // Keep valid mapping
        } else {
            // Attempt to heal
            let bestMatch = null;
            let bestMatchLen = 0;

            // Check if any valid slug is a substring of the broken slug
            // e.g. broken="chasing-angel", valid="angel" -> match!
            // Prefer longest match (most specific)
            for (const valid of validSlugs) {
                if (slug.includes(valid) && valid.length > bestMatchLen) {
                    // Avoid tiny matches like "a", "is", etc if they exist as slugs
                    if (valid.length < 3) continue;
                    bestMatch = valid;
                    bestMatchLen = valid.length;
                }
            }

            if (bestMatch) {
                newIndex[key] = bestMatch;
                fixed++;
                // console.log(`Fixed: "${key}" -> "${slug}" => "${bestMatch}"`);
            } else {
                // No obvious fix found, delete mapping
                deleted++;
                // console.log(`Deleted: "${key}" -> "${slug}"`);
            }
        }
    });

    console.log(`--- ${name} Fix Report ---`);
    console.log(`Original Size: ${Object.keys(index).length}`);
    console.log(`New Size: ${Object.keys(newIndex).length}`);
    console.log(`Fixed (Remapped): ${fixed}`);
    console.log(`Deleted (Unknown): ${deleted}`);

    // Determine export name based on file content heuristics or filename
    let exportName = 'keywordIndex';
    if (name.includes('Localized')) exportName = 'localizedKeywords';

    // Write back to file
    // Format clearly
    const lines = Object.entries(newIndex).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
    const output = `// Auto-generated keyword index (${name})\n` +
        `// Cleaned up broken links\n\n` +
        `const ${exportName} = {\n${lines.join(',\n')}\n};\n\n` +
        `module.exports = ${exportName};\n`;

    // We need to write to the original .js file path (adding .js if missing in require)
    // The paths above (kiPath) are absolute paths without extension sometimes?
    // path.join adds separators. require resolves extensions.
    // Let's force .js extension for writing.
    const writePath = filePath.endsWith('.js') ? filePath : filePath + '.js';
    fs.writeFileSync(writePath, output);
}

fixIndex(ki, 'English Index', kiPath);
fixIndex(kl, 'Localized Index', klPath);

console.log('Done fixing indexes.');
