const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

// Legacy scripts to remove
const LEGACY_SCRIPTS = [
    'write_batch_26_body_animals.js',
    'write_batch_26_foods.js',
    'write_batch_26_nature.js',
    'write_batch_26_objects_professions.js'
];

function cleanup() {
    console.log("Starting dictionary cleanup...");

    let dictContent = fs.readFileSync(DICT_FILE, 'utf8');

    // Parse the object specifically (it's a module.exports)
    // We'll use a regex to find lines with "Meaning not found"
    // This is safer than eval() and simpler than a full parser for this specific task

    // Regex to match lines like: "KEY": { meaning: "Meaning not found", ... },
    const dirtyLineRegex = /^\s*"[^"]+":\s*{\s*meaning:\s*"Meaning not found".*$/gm;

    const matches = dictContent.match(dirtyLineRegex);

    if (!matches) {
        console.log("No 'Meaning not found' entries found.");
        return;
    }

    console.log(`Found ${matches.length} dirty entries to remove.`);

    let deletedCount = 0;
    let deletedFilesTr = 0;
    let deletedFilesEn = 0;

    matches.forEach(match => {
        // Extract Key
        const keyMatch = match.match(/"([^"]+)"/);
        if (keyMatch) {
            const key = keyMatch[1];
            const slug = key.toLowerCase().replace(/ /g, '-').replace(/_/g, '-'); // Handle both space and underscore just in case

            // Delete TR File
            const trPath = path.join(TR_DIR, `${slug}.json`);
            if (fs.existsSync(trPath)) {
                fs.unlinkSync(trPath);
                deletedFilesTr++;
            }

            // Delete EN File
            const enPath = path.join(EN_DIR, `${slug}.json`);
            if (fs.existsSync(enPath)) {
                fs.unlinkSync(enPath);
                deletedFilesEn++;
            }

            // console.log(`Processed: ${key} -> ${slug}`);
        }
    });

    // Remove lines from content
    const cleanContent = dictContent.replace(dirtyLineRegex, '');

    // Clean up empty lines left behind (optional but nice)
    // The regex above removes the line content but might leave a newline if not handled
    // Actually replace with empty string removes the line content. 
    // Let's filter out empty lines to be sure.

    const finalContent = cleanContent.split('\n').filter(line => line.trim() !== '').join('\n');

    fs.writeFileSync(DICT_FILE, finalContent);
    console.log(`Updated source_dictionary.js. Removed ${matches.length} entries.`);
    console.log(`Deleted ${deletedFilesTr} Turkish files.`);
    console.log(`Deleted ${deletedFilesEn} English files.`);

    // Remove legacy scripts
    LEGACY_SCRIPTS.forEach(script => {
        const scriptPath = path.join(__dirname, script);
        if (fs.existsSync(scriptPath)) {
            fs.unlinkSync(scriptPath);
            console.log(`Deleted legacy script: ${script}`);
        }
    });
}

cleanup();
