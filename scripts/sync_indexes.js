/**
 * Sync all search indexes from content files.
 * 
 * Reads every content/{locale}/meanings/*.json and updates:
 * 1. source_dictionary.js — slug → {meaning, associations}
 * 2. keyword_index_localized.js — Turkish keyword → slug
 * 3. localized_names.js — slug → Turkish display name
 * 
 * This script PRESERVES existing entries and ADDS new ones.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const EN_DIR = path.join(__dirname, '..', 'content', 'en', 'meanings');

// Load existing indexes
const dictPath = path.join(DATA_DIR, 'source_dictionary.js');
const localizedPath = path.join(DATA_DIR, 'keyword_index_localized.js');
const namesPath = path.join(DATA_DIR, 'localized_names.js');

// Parse existing JS module files
function parseJsObject(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Extract the object between first { and last }
    const match = content.match(/= \{([\s\S]*)\};/);
    if (!match) return {};
    try {
        return eval('({' + match[1] + '})');
    } catch (e) {
        console.error('Parse error for', filePath, e.message);
        return {};
    }
}

// Load existing data
console.log('Loading existing indexes...');
const existingDict = parseJsObject(dictPath);
const existingLocalized = parseJsObject(localizedPath);
const existingNames = parseJsObject(namesPath);

console.log('Existing dictionary entries:', Object.keys(existingDict).length);
console.log('Existing localized keywords:', Object.keys(existingLocalized).length);
console.log('Existing localized names:', Object.keys(existingNames).length);

// Get all content files
const trFiles = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));
const enFiles = new Set(fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json')));

let newDict = 0, newLocalized = 0, newNames = 0;

for (const file of trFiles) {
    const slug = file.replace('.json', '');

    // Read TR content
    const trData = JSON.parse(fs.readFileSync(path.join(TR_DIR, file), 'utf-8'));
    const trName = trData.localizedName || slug;

    // Read EN content if available
    let enData = null;
    if (enFiles.has(file)) {
        enData = JSON.parse(fs.readFileSync(path.join(EN_DIR, file), 'utf-8'));
    }

    // 1. Update source_dictionary.js (uses UPPERCASE key)
    const dictKey = slug.toUpperCase();
    if (!existingDict[dictKey]) {
        // Extract a short meaning from introduction
        const enIntro = enData?.introduction || trData.introduction || '';
        const meaning = enIntro.split('.')[0].substring(0, 80) || 'DREAM SYMBOL';

        // Extract some association words from symbolism
        const enSymbolism = enData?.symbolism || trData.symbolism || '';
        const words = enSymbolism.split(/\s+/).filter(w => w.length >= 4 && w.length <= 12 && /^[a-zA-Z]+$/.test(w));
        const associations = [...new Set(words.slice(0, 5))].map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

        existingDict[dictKey] = {
            meaning: meaning.toUpperCase(),
            associations: associations.length > 0 ? associations : ['Dream', 'Symbol', 'Vision']
        };
        newDict++;
    }

    // 2. Update localized_names.js
    if (!existingNames[slug]) {
        existingNames[slug] = trName;
        newNames++;
    }

    // 3. Update keyword_index_localized.js
    // Add TR name as keyword → slug
    const trNameLower = trName.toLowerCase();
    if (!existingLocalized[trNameLower]) {
        existingLocalized[trNameLower] = slug;
        newLocalized++;
    }
    // Also add slug itself and EN name
    if (!existingLocalized[slug]) {
        existingLocalized[slug] = slug;
        newLocalized++;
    }
    if (enData?.localizedName) {
        const enNameLower = enData.localizedName.toLowerCase();
        if (!existingLocalized[enNameLower]) {
            existingLocalized[enNameLower] = slug;
            newLocalized++;
        }
    }
}

console.log('\n--- New entries ---');
console.log('Dictionary:', newDict);
console.log('Localized keywords:', newLocalized);
console.log('Localized names:', newNames);

// Write back
function writeJsModule(filePath, varName, obj, comment) {
    const entries = Object.entries(obj)
        .map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
        .join(',\n');

    const content = `${comment}\n\nconst ${varName} = {\n${entries}\n};\n\nmodule.exports = ${varName};\n`;
    fs.writeFileSync(filePath, content);
}

console.log('\nWriting updated indexes...');

writeJsModule(dictPath, 'dictionary', existingDict,
    '// Auto-generated dream symbol dictionary');

writeJsModule(localizedPath, 'localizedKeywords', existingLocalized,
    '// Auto-generated localized keyword index (single-word symbols only)');

writeJsModule(namesPath, 'localizedNames', existingNames,
    '// Auto-generated map of slug -> localized name\n// Used for search results to avoid FS access');

console.log('✅ All indexes updated!');
console.log(`Total dictionary: ${Object.keys(existingDict).length}`);
console.log(`Total localized keywords: ${Object.keys(existingLocalized).length}`);
console.log(`Total localized names: ${Object.keys(existingNames).length}`);
