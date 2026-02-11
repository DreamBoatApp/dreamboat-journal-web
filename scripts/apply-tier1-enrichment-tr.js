/**
 * Apply Tier 1 Enrichment — Turkish (TR)
 * Merges tier1_enrichment_tr.json + tier1_enrichment_tr_part2.json into TR content files
 */
const fs = require('fs');
const path = require('path');

const part1 = require('./data/tier1_enrichment_tr.json');
const part2 = require('./data/tier1_enrichment_tr_part2.json');
const enrichment = { ...part1, ...part2 };
const contentDir = path.join(__dirname, '..', 'content', 'tr', 'meanings');

let applied = 0;

for (const [slug, data] of Object.entries(enrichment)) {
    const filePath = path.join(contentDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
        console.log(`SKIP: ${slug}.json not found in TR`);
        continue;
    }
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    content.introduction = data.definitionSnippet;
    if (!content.symbolism.includes('Yaygın Senaryo:')) {
        content.symbolism += `\n\n**Yaygın Senaryo:** ${data.scenario}`;
    }
    if (!content.symbolism.includes('Yaygın Yanılgı:')) {
        content.symbolism += `\n\n**Yaygın Yanılgı:** ${data.commonMistake}`;
    }
    content.faqs = data.faqs;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    applied++;
    console.log(`✓ ${slug} — intro: ${data.definitionSnippet.length}ch, ${data.faqs.length} FAQs`);
}

console.log(`\nDone: ${applied}/${Object.keys(enrichment).length} TR symbols enriched`);
