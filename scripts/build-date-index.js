/**
 * Build Date Index
 * 
 * Reads all content JSON files and creates a publish_dates.json
 * mapping each slug to its file creation/modification date.
 * This replaces runtime fs.statSync() calls which don't work in serverless.
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const LOCALES = ['en', 'tr', 'de', 'es', 'pt'];
const OUTPUT = path.join(__dirname, 'data', 'publish_dates.json');

const dates = {};

LOCALES.forEach(locale => {
    const meaningsDir = path.join(CONTENT_DIR, locale, 'meanings');
    if (!fs.existsSync(meaningsDir)) return;

    const files = fs.readdirSync(meaningsDir).filter(f => f.endsWith('.json'));
    files.forEach(f => {
        const slug = f.replace('.json', '');
        // Only record once per slug (use earliest locale as canonical date)
        if (dates[slug]) return;

        const filePath = path.join(meaningsDir, f);
        const stats = fs.statSync(filePath);
        dates[slug] = {
            published: stats.birthtime.toISOString(),
            modified: stats.mtime.toISOString(),
        };
    });
});

fs.writeFileSync(OUTPUT, JSON.stringify(dates, null, 2));
console.log(`Written ${Object.keys(dates).length} date entries to ${OUTPUT}`);
