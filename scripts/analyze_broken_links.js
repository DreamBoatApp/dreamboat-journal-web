
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
// Valid = Main Symbol Slug OR Alias Key (Redirect)
const validSlugs = new Set();
// Add Main Symbols
Object.keys(dictionary).forEach(k => {
    const slug = k.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    validSlugs.add(slug);
});
// Add Aliases
Object.keys(aliasMap).forEach(k => validSlugs.add(k));

console.log('Total valid targets (Symbols + Aliases):', validSlugs.size);

function analyze(index, name) {
    let broken = 0;
    let brokenMulti = 0;
    const brokenList = [];

    Object.entries(index).forEach(([key, slug]) => {
        if (!validSlugs.has(slug)) {
            broken++;
            if (key.includes(' ')) brokenMulti++;
            brokenList.push({ key, slug });
        }
    });

    console.log(`--- ${name} Analysis ---`);
    console.log(`Total Mappings: ${Object.keys(index).length}`);
    console.log(`Broken Links: ${broken}`);
    console.log(`Broken Multi-Word: ${brokenMulti}`);

    // Sample broken
    if (broken > 0) {
        console.log('Sample Broken Mappings:');
        brokenList.slice(0, 5).forEach(i => console.log(`  "${i.key}" -> "${i.slug}"`));
    }
    return brokenList;
}

const brokenKi = analyze(ki, 'English Index');
const brokenKl = analyze(kl, 'Localized Index');

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    validTargetCount: validSlugs.size,
    english: { brokenCount: brokenKi.length, broken: brokenKi },
    localized: { brokenCount: brokenKl.length, broken: brokenKl }
};

fs.writeFileSync('broken_links_report.json', JSON.stringify(report, null, 2));
console.log('Detailed report saved to broken_links_report.json');
