/**
 * Apply Tier 1 FAQ Enrichment — ES/DE/PT
 * Lighter treatment: FAQs only (no definition snippets, scenarios, or common mistakes)
 */
const fs = require('fs');
const path = require('path');

const locales = [
    { code: 'es', file: './data/tier1_enrichment_es.json' },
    { code: 'de', file: './data/tier1_enrichment_de.json' },
    { code: 'pt', file: './data/tier1_enrichment_pt.json' },
];

let totalApplied = 0;

for (const { code, file } of locales) {
    const enrichment = require(file);
    const contentDir = path.join(__dirname, '..', 'content', code, 'meanings');
    let applied = 0;

    for (const [slug, data] of Object.entries(enrichment)) {
        const filePath = path.join(contentDir, `${slug}.json`);
        if (!fs.existsSync(filePath)) {
            continue;
        }
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        content.faqs = data.faqs;
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        applied++;
    }

    console.log(`${code.toUpperCase()}: ${applied}/${Object.keys(enrichment).length} symbols enriched with FAQs`);
    totalApplied += applied;
}

console.log(`\nTotal: ${totalApplied} symbols enriched across ES/DE/PT`);
