const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');
const OUTPUT_MISSING_EN = path.join(__dirname, 'data', 'missing_en_list.json');
const OUTPUT_ORPHANS = path.join(__dirname, 'data', 'orphaned_files_list.json');

try {
    // 1. Load Dictionary Keys (Normalized)
    const dictContent = require(DICT_FILE);
    // Dictionary keys are UPPERCASE usually, or CamelCase. Let's normalize to slug-like for comparison if possible, 
    // OR BETTER: The source_dictionary keys ARE the mapping keys. 
    // The filenames usually match the key but in kebab-case. 
    // WE NEED TO KNOW HOW KEYS MAP TO FILENAMES.
    // Usually: Key "FLYING_WOLF" -> filename "flying-wolf.json"
    // So we convert Dict Keys to Kebab-Case.

    const dictSlugs = new Set(Object.keys(dictContent).map(k => k.toLowerCase().replace(/_/g, '-').replace(/ /g, '-')));

    // 2. Scan content directories
    const trFiles = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));
    const enFiles = new Set(fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json')));

    const missingEn = [];
    const orphans = [];

    trFiles.forEach(file => {
        const slug = file.replace('.json', '');

        // Check for missing EN
        if (!enFiles.has(file)) {
            missingEn.push(slug);
        }

        // Check for Orphan (File exists, but slug NOT in Dict)
        // We compare slug to dictSlugs.
        if (!dictSlugs.has(slug)) {
            orphans.push(slug);
        }
    });

    console.log(`Found ${missingEn.length} missing English files.`);
    console.log(`Found ${orphans.length} orphaned files (in TR content but not in Dictionary).`);

    fs.writeFileSync(OUTPUT_MISSING_EN, JSON.stringify(missingEn, null, 2));
    fs.writeFileSync(OUTPUT_ORPHANS, JSON.stringify(orphans, null, 2));
    console.log(`Lists saved to 'scripts/data/'`);

} catch (e) {
    console.error("Error identifying files:", e);
}
