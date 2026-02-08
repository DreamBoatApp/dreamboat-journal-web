const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');

// Load dictionary raw content for appending
// We also need the parsed keys to check existence
const dict = require('./data/source_dictionary.js');

function mergeOrphans() {
    console.log("Scanning for orphaned files...");
    const files = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));

    let newEntries = [];

    files.forEach(file => {
        const slug = file.replace('.json', '');
        // Standard Key generation: SLUG -> UPPER_SNAKE_CASE
        // But wait, existing dictionary keys are SOMETIMES space separated?
        // Let's stick to underscore for new keys.
        // Also check if key exists in dictionary (normalized).

        // Check if this file is already covered by ANY key in the dictionary
        // We need a way to map Key -> Slug or vice versa.
        // debug-counts.js does this by brute-force normalization matching.

        // Let's do simple check: does slug-derived key exist?
        const keyUnderscore = slug.toUpperCase().replace(/-/g, '_');
        const keySpace = slug.toUpperCase().replace(/-/g, ' ');
        const keyRaw = slug.toUpperCase();

        if (dict[keyUnderscore] || dict[keySpace] || dict[keyRaw]) {
            // Exists
            return;
        }

        // Double check associations? 
        // No, if key is missing, we add it.

        console.log(`Found orphan: ${slug} -> Key: ${keyUnderscore}`);

        try {
            const filePath = path.join(TR_DIR, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            let meaning = "Dream Symbol";
            if (content.meaning) {
                meaning = content.meaning.split('.')[0].toUpperCase();
                if (meaning.length > 50) meaning = meaning.substring(0, 47) + "...";
            } else if (content.title && content.title.includes(':')) {
                meaning = content.title.split(':')[1].trim().toUpperCase();
            } else if (content.seoDescription) {
                meaning = content.seoDescription.split('.')[0].toUpperCase();
            }
            if (meaning.length > 50) meaning = meaning.substring(0, 47) + "...";

            let associations = [];
            if (content.keywords) {
                associations = content.keywords;
            } else if (content.localizedName) {
                associations.push(content.localizedName);
            }

            // Clean associations
            associations = associations.map(a => a.replace(/[^\w\s\u00C0-\u017F]/gi, '').trim()); // Allow unicode
            associations = [...new Set(associations)].slice(0, 5);

            const entry = `    "${keyUnderscore}": { meaning: "${meaning}", associations: ${JSON.stringify(associations)} }`;
            newEntries.push(entry);

        } catch (e) {
            console.error(`Error reading ${slug}: ${e.message}`);
        }
    });

    if (newEntries.length > 0) {
        let dictContent = fs.readFileSync(DICT_FILE, 'utf8');
        constlastBrace = dictContent.lastIndexOf('};');

        // Find place to insert. 
        // We can just append to the end of the object, before `};`
        // But `source_dictionary.js` ends with `module.exports = dictionary;` ?
        // Let's read the file structure.
        // It's `const dictionary = { ... }; module.exports = dictionary;`

        const lastClosingBrace = dictContent.lastIndexOf('};');
        if (lastClosingBrace === -1) {
            console.error("Could not find closing brace of dictionary object.");
            return;
        }

        const prefix = dictContent.substring(0, lastClosingBrace).trimEnd();
        const suffix = dictContent.substring(lastClosingBrace);
        const separator = prefix.endsWith(',') ? '' : ',';

        const newContent = prefix + separator + '\n    // -- MERGED BATCH 7 --\n' + newEntries.join(',\n') + '\n' + suffix;

        fs.writeFileSync(DICT_FILE, newContent);
        console.log(`Successfully merged ${newEntries.length} entries.`);
    } else {
        console.log("No orphans found to merge.");
    }
}

mergeOrphans();
