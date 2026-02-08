const fs = require('fs');
const path = require('path');

// 1. Read the list of new symbols
const LIST_FILE = path.join(__dirname, 'data', 'batch_home_symbols.txt');
const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');

const newSymbols = JSON.parse(fs.readFileSync(LIST_FILE, 'utf8'));
let dictContent = fs.readFileSync(DICT_FILE, 'utf8');

// 2. Prepare entries
let addedCount = 0;
const entriesToAdd = [];

newSymbols.forEach(symbol => {
    // Basic normalization for key (e.g. "Armchair" -> "ARMCHAIR")
    const key = symbol.toUpperCase().replace(/[^A-Z0-9]/g, ' ').trim().replace(/\s+/g, '_');

    // Check if already in dictContent
    if (dictContent.includes(`"${key}":`)) {
        console.log(`Skipping ${key} (already in dict)`);
        return;
    }

    // Default generic entry - content files handle the real depth
    const entry = `    "${key}": { meaning: "DOMESTIC SYMBOL", associations: [] },`;
    entriesToAdd.push(entry);
    addedCount++;
});

// 3. Inject into file
if (addedCount > 0) {
    // Find the end of the module.exports object
    const lastBraceIndex = dictContent.lastIndexOf('};');

    if (lastBraceIndex !== -1) {
        const insertionPoint = lastBraceIndex;
        const newBlock = "\n    // --- BATCH 4: HOME & FURNITURE ---\n" + entriesToAdd.join('\n') + "\n";

        const updatedContent = dictContent.slice(0, insertionPoint) + newBlock + dictContent.slice(insertionPoint);
        fs.writeFileSync(DICT_FILE, updatedContent);
        console.log(`Successfully added ${addedCount} new home symbols to dictionary.`);
    } else {
        console.error("Could not find insertion point in source_dictionary.js");
    }
} else {
    console.log("No new symbols to add.");
}
