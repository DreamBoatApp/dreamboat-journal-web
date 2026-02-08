const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

try {
    const dictContent = require(DICT_FILE);
    const dictKeys = Object.keys(dictContent); // Keys are usually UPPERCASE_SNAKE or similiar

    // Normalize keys to compare with filenames
    // Filenames are kebab-case.
    // Key "FLYING_WOLF" -> "flying-wolf"
    // Key "Walking" -> "walking"

    // We need a robust normalization.
    // Let's create a Set of existing TR filenames (without extension)
    const trFiles = new Set(fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json')).map(f => f.replace('.json', '')));
    const enFiles = new Set(fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json')).map(f => f.replace('.json', '')));

    // 1. Find Dict Entries with no TR File
    const extraKeys = [];
    dictKeys.forEach(key => {
        // Try various normalizations to find the file
        const kutils = [
            key.toLowerCase().replace(/_/g, '-'), // FLYING_WOLF -> flying-wolf
            key.toLowerCase().replace(/ /g, '-'), // FLYING WOLF -> flying-wolf
            key.toLowerCase() // Walking -> walking
        ];

        const found = kutils.some(k => trFiles.has(k));
        if (!found) {
            extraKeys.push(key);
        }
    });

    console.log(`\nKeys in Dictionary with NO TR file: ${extraKeys.length}`);
    extraKeys.forEach(k => console.log(` - ${k}`));

    // 2. Find EN files with no TR file
    const extraEn = [];
    enFiles.forEach(f => {
        if (!trFiles.has(f)) {
            extraEn.push(f);
        }
    });

    console.log(`\nEN Files with NO TR file: ${extraEn.length}`);
    extraEn.forEach(f => console.log(` - ${f}.json`));

} catch (e) {
    console.error(e);
}
