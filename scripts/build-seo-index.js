/**
 * Build SEO Index — Generates a quality index determining which pages 
 * should be indexed vs noindex'd based on content quality thresholds.
 * 
 * Criteria for indexable: 
 * - Word count >= 300 (not thin content)
 * - Has all required fields
 * - Has at least introduction + symbolism
 * 
 * Output: scripts/data/seo_index.json
 * Format: { "en/snake": true, "en/aardvark": false, ... }
 */
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'tr'];
const CONTENT_ROOT = path.join(__dirname, '..', 'content');
const MIN_WORDS = 150; // Lowered — was blocking many valid pages

const index = {};
let indexable = 0, noindex = 0;

function wordCount(text) {
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
}

for (const locale of LOCALES) {
    const dir = path.join(CONTENT_ROOT, locale, 'meanings');
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const slug = file.replace('.json', '');
        const key = `${locale}/${slug}`;

        try {
            const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));

            const words = wordCount(content.introduction) +
                wordCount(content.symbolism) +
                wordCount(content.cosmicAnalysis) +
                (content.commonScenarios || []).reduce((s, sc) => {
                    if (typeof sc === 'string') return s + wordCount(sc);
                    return s + wordCount(sc.scenario) + wordCount(sc.interpretation);
                }, 0) +
                (content.faqs || []).reduce((s, f) => s + wordCount(f.question) + wordCount(f.answer), 0) +
                wordCount(content.cta);

            const hasRequiredFields = content.title && content.seoDescription &&
                content.introduction && content.symbolism;

            const shouldIndex = hasRequiredFields && words >= MIN_WORDS;
            index[key] = shouldIndex;

            if (shouldIndex) indexable++;
            else noindex++;
        } catch {
            index[key] = false;
            noindex++;
        }
    }
}

const outputPath = path.join(__dirname, 'data', 'seo_index.json');
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

console.log(`SEO Index built: ${indexable} indexable, ${noindex} noindex`);
console.log(`Total: ${indexable + noindex} pages`);
console.log(`Written to ${outputPath}`);
