const fs = require('fs');
const path = require('path');

// Load Data
const progress = require('./batch8_progress.json');
const allNewSymbols = require('./new_symbols_fresh.js');
const sourceDictPath = path.join(__dirname, 'data/source_dictionary.js');
let sourceDict = require(sourceDictPath);

// Filter completed symbols
const completedKeys = new Set(progress.completed);
const symbolsToAdd = allNewSymbols.filter(s => completedKeys.has(s.key));

console.log(`Found ${symbolsToAdd.length} completed symbols to integrate.`);

// Convert to dictionary format
// { "KEY": { "tr": "...", "en": "..." } }
const newEntries = {};
symbolsToAdd.forEach(s => {
    newEntries[s.key] = { tr: s.tr, en: s.en };
});

// Load existing dictionary text to append cleanly
let dictContent = fs.readFileSync(sourceDictPath, 'utf8');

// Remove closing brace/semicolon
dictContent = dictContent.trim().replace(/};?\s*$/, '');
if (dictContent.endsWith(',')) dictContent = dictContent.slice(0, -1);

// Append new entries
let appendStr = '\n\n    // ═══ BATCH 8 (Fresh Single-Word) ═══\n';
for (const [key, val] of Object.entries(newEntries)) {
    // Check if key already exists to prevent duplicates (safety)
    if (sourceDict[key]) {
        console.log(`Skipping duplicate key: ${key}`);
        continue;
    }
    appendStr += `    "${key}": { tr: "${val.tr}", en: "${val.en}" },\n`;
}

appendStr += '};\n';

fs.writeFileSync(sourceDictPath, dictContent + appendStr, 'utf8');
console.log('✅ source_dictionary.js updated.');

// Update Indexes (run existing scripts)
const { execSync } = require('child_process');
try {
    console.log('Running enrich:content...');
    execSync('npm run enrich:content', { stdio: 'inherit' });
    console.log('✅ enrich:content done.');
} catch (e) {
    console.error('❌ enrich:content failed:', e.message);
}
