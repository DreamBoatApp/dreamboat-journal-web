
const fs = require('fs');
const path = require('path');

// Load Data
const dictionary = require('./scripts/data/source_dictionary');
const keywordIndex = require('./scripts/data/keyword_index');

const LOCALES = ['en', 'tr', 'de', 'es', 'pt'];
const CONTENT_DIR = path.join(__dirname, 'content');

const missingContent = [];
const brokenLinks = [];

// Helper to slugify
const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

console.log('--- STARTING AUDIT ---');

// 1. Check Source Dictionary -> Content Files
console.log(`Checking ${Object.keys(dictionary).length} source dictionary entries...`);
for (const key of Object.keys(dictionary)) {
    const slug = slugify(key);

    // Check if at least English exists (primary source)
    const enPath = path.join(CONTENT_DIR, 'en', 'meanings', `${slug}.json`);

    if (!fs.existsSync(enPath)) {
        // Double check if TR exists maybe?
        const trPath = path.join(CONTENT_DIR, 'tr', 'meanings', `${slug}.json`);
        if (!fs.existsSync(trPath)) {
            missingContent.push({ key, slug });
        }
    }
}

// 2. Check Keyword Index -> Content Files
console.log(`Checking ${Object.keys(keywordIndex).length} keyword index entries...`);
const uniqueSlugsInIndex = new Set(Object.values(keywordIndex));

for (const slug of uniqueSlugsInIndex) {
    // Check if this slug exists in our "known valid slugs" from dictionary
    // OR if it exists as a file directly (some keywords might point to valid custom files not in dict?)

    const enPath = path.join(CONTENT_DIR, 'en', 'meanings', `${slug}.json`);
    const trPath = path.join(CONTENT_DIR, 'tr', 'meanings', `${slug}.json`);

    if (!fs.existsSync(enPath) && !fs.existsSync(trPath)) {
        brokenLinks.push(slug);
    }
}

console.log('--- AUDIT RESULTS ---');
console.log(`Missing Content Files (Dictionary Keys with no JSON): ${missingContent.length}`);
if (missingContent.length > 0) {
    console.log('Samples:', missingContent.slice(0, 10).map(m => m.slug).join(', '));
}

console.log(`Broken Links (Keywords pointing to non-existent JSON): ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
    console.log('Samples:', brokenLinks.slice(0, 10).join(', '));
}

// Save detailed report
const report = JSON.stringify({ missingContent, brokenLinks }, null, 2);
fs.writeFileSync('audit_report.json', report);
console.log('Full report saved to audit_report.json');
