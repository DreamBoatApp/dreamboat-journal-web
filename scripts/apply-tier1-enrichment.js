/**
 * Apply Tier 1 Enrichment
 * 
 * Merges tier1_enrichment.json data into existing EN content files:
 * - Replaces introduction with definition snippet format
 * - Adds scenario paragraph to symbolism
 * - Adds common mistake paragraph
 * - Adds symbol-specific FAQs
 */

const fs = require('fs');
const path = require('path');

const enrichment = require('./data/tier1_enrichment.json');
const contentDir = path.join(__dirname, '..', 'content', 'en', 'meanings');

let applied = 0;

for (const [slug, data] of Object.entries(enrichment)) {
    const filePath = path.join(contentDir, `${slug}.json`);

    if (!fs.existsSync(filePath)) {
        console.log(`SKIP: ${slug}.json not found`);
        continue;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 1) Replace introduction with definition snippet
    content.introduction = data.definitionSnippet;

    // 2) Append scenario + common mistake to symbolism
    const scenarioBlock = `\n\n**Common Scenario:** ${data.scenario}`;
    const mistakeBlock = `\n\n**Common Misconception:** ${data.commonMistake}`;

    // Only append if not already there
    if (!content.symbolism.includes('Common Scenario:')) {
        content.symbolism += scenarioBlock;
    }
    if (!content.symbolism.includes('Common Misconception:')) {
        content.symbolism += mistakeBlock;
    }

    // 3) Add symbol-specific FAQs
    content.faqs = data.faqs;

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    applied++;
    console.log(`✓ ${slug} — intro: ${data.definitionSnippet.length}ch, ${data.faqs.length} FAQs`);
}

console.log(`\nDone: ${applied}/${Object.keys(enrichment).length} symbols enriched`);
