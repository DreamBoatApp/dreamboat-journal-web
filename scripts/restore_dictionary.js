const fs = require('fs');
const path = require('path');

const DICT_PATH = path.join(__dirname, 'data/source_dictionary.js');
const CONTENT_DIR = path.join(__dirname, '../content/en/meanings');

// 1. Load current dictionary keys
const currentDict = require('./data/source_dictionary');
const currentKeys = new Set(Object.keys(currentDict).map(k => k.toUpperCase()));

console.log(`Current Dictionary Size: ${currentKeys.size}`);

// 2. Scan content directory
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} content files.`);

let newEntries = [];

files.forEach(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Normalize Title to Key
    // Use filename as the source of truth for the key, as titles are "The Spiritual Meaning of..."
    const key = path.basename(file, '.json').toUpperCase().replace(/-/g, ' ').trim();

    // Check if key exists (handle standard and slugified variations just in case)
    if (!currentKeys.has(key)) {
        // Double check slug match matches key
        // e.g. "Trash Can" -> "TRASH CAN"

        const meaning = content.meaning || "Meaning not found";
        const associations = content.keywords || [];

        newEntries.push(`    "${key}": { meaning: "${meaning}", associations: ${JSON.stringify(associations)} }`);
    }
});

console.log(`Found ${newEntries.length} missing entries to restore.`);

if (newEntries.length > 0) {
    // 3. Read the actual source file as text to append
    let sourceContent = fs.readFileSync(DICT_PATH, 'utf8');

    // Find the last closing brace
    const lastBraceIndex = sourceContent.lastIndexOf('};');

    if (lastBraceIndex !== -1) {
        const prefix = sourceContent.substring(0, lastBraceIndex);
        const suffix = sourceContent.substring(lastBraceIndex); // starts with };

        // Prepare the injection
        const injection = `\n    // -- RESTORED ENTRIES (Recovered from JSONs) --\n` +
            newEntries.join(',\n') +
            `\n`;

        // Logic: We need to ensure there is a comma after the last existing entry if it doesn't have one
        // But since we appended correctly before, let's just make sure we insert before the closing brace.
        // We'll trust that the previous last line has a comma? 
        // Actually, let's fix the "last line comma" issue by adding one just in case 
        // or relying on the file usually ending without a comma on the absolute last item.
        // Safer: add a comma to the previous last item if it's missing.

        // Actually, let's just insert it. JavaScript objects allow trailing commas.
        // But if the previous check didn't have a comma, it might be a syntax error if we just append.

        // Let's rely on my previous edits which usually left the file in a good state.
        // I will add a comma to the start of my injection just to be safe? 
        // No, that puts a comma after the previous last item. That IS what we want.

        // Logic: Ensure exactly one comma separator
        const cleanPrefix = prefix.trimEnd();
        const separator = cleanPrefix.endsWith(',') ? '' : ',';
        const newContent = cleanPrefix + separator + injection + suffix;

        // Write back
        fs.writeFileSync(DICT_PATH, newContent, 'utf8');
        console.log("✅ Successfully restored entries to source_dictionary.js");
    } else {
        console.error("❌ Could not find closing '};' in source_dictionary.js");
    }
} else {
    console.log("No new entries to restore.");
}
