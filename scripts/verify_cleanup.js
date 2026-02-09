const fs = require('fs');
const path = require('path');

const locales = ['en', 'tr', 'de', 'es', 'pt'];
for (const locale of locales) {
    const dir = path.join(process.cwd(), 'content', locale, 'meanings');
    const files = fs.readdirSync(dir);
    const multiWord = files.filter(f => f.includes('-'));
    const singleWord = files.filter(f => !f.includes('-'));
    console.log(locale.toUpperCase() + ': ' + files.length + ' total | ' + singleWord.length + ' single-word | ' + multiWord.length + ' multi-word remaining');
    if (multiWord.length > 0) {
        console.log('  Remaining multi-word: ' + multiWord.join(', '));
    }
}

const dict = require('./scripts/data/source_dictionary');
const keys = Object.keys(dict);
const multiKeys = keys.filter(k => k.includes('_') || k.includes(' '));
console.log('\nDictionary: ' + keys.length + ' total, ' + multiKeys.length + ' multi-word remaining');
if (multiKeys.length > 0) console.log('  Remaining: ' + multiKeys.join(', '));
