/**
 * Fix all audit issues:
 * 1. Regenerate disorientation.json with correct schema (via GPT-4o-mini)
 * 2. Remove stale extra fields from all content files
 * 3. Remove inconsistent 'cta' field from all files (web-only, not needed)
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['tr', 'en'];
const CONTENT_BASE = path.join(__dirname, '..', 'content');

// Standard fields that should be in every file
const STANDARD_FIELDS = new Set([
    'localizedName',
    'title',
    'seoDescription',
    'introduction',
    'symbolism',
    'cosmicAnalysis',
    'commonScenarios'
]);

// Fields to remove
const REMOVE_FIELDS = new Set([
    'cta',        // inconsistent, web-only, not critical
    'slug',       // stale/unnecessary (slug is the filename)
    'keywords',   // stale from legacy schema
    'meaning',    // legacy schema
    'interpretations', // legacy schema
    'scenarios',  // legacy schema
]);

let totalCleaned = 0;
let totalFieldsRemoved = 0;
const problems = [];

for (const locale of LOCALES) {
    const dir = path.join(CONTENT_BASE, locale, 'meanings');
    const files = fs.readdirSync(dir);
    let cleaned = 0;

    for (const file of files) {
        const filePath = path.join(dir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let modified = false;

        // Remove stale/extra fields
        for (const key of Object.keys(data)) {
            if (REMOVE_FIELDS.has(key)) {
                delete data[key];
                modified = true;
                totalFieldsRemoved++;
            }
        }

        // Check for missing standard fields
        for (const field of STANDARD_FIELDS) {
            if (!data[field]) {
                problems.push(`${locale}/${file}: missing '${field}'`);
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            cleaned++;
        }
    }

    console.log(`${locale.toUpperCase()}: cleaned ${cleaned}/${files.length} files`);
    totalCleaned += cleaned;
}

console.log(`\nTotal files cleaned: ${totalCleaned}`);
console.log(`Total fields removed: ${totalFieldsRemoved}`);

if (problems.length > 0) {
    console.log(`\nProblems (need regeneration):`);
    problems.forEach(p => console.log(`  ⚠️ ${p}`));
}
