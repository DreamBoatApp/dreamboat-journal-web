const fs = require('fs');
const path = require('path');

// Valid single-word slugs: use EN as the reference (already clean)
const enDir = path.join(process.cwd(), 'content', 'en', 'meanings');
const validFiles = new Set(fs.readdirSync(enDir));

const locales = ['de', 'es', 'pt'];
let totalDeleted = 0;

for (const locale of locales) {
    const dir = path.join(process.cwd(), 'content', locale, 'meanings');
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    let deleted = 0;

    for (const file of files) {
        if (!validFiles.has(file)) {
            fs.unlinkSync(path.join(dir, file));
            deleted++;
        }
    }

    const remaining = fs.readdirSync(dir).length;
    console.log(locale.toUpperCase() + ': deleted ' + deleted + ', remaining: ' + remaining);
    totalDeleted += deleted;
}

console.log('\nTotal deleted: ' + totalDeleted);
