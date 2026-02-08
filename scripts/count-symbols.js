const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

try {
    // Count Dictionary Entries
    const dictContent = require(DICT_FILE);
    const dictKeys = Object.keys(dictContent);
    const dictCount = dictKeys.length;

    // Count TR Files
    const trFiles = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));
    const trCount = trFiles.length;

    // Count EN Files
    const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json'));
    const enCount = enFiles.length;

    console.log(`Dictionary Entries: ${dictCount}`);
    console.log(`Turkish Files:      ${trCount}`);
    console.log(`English Files:      ${enCount}`);

    // Check for parity
    if (trCount === enCount && trCount === dictCount) {
        console.log("✅ PERFECT MATCH: All counts are equal.");
    } else {
        console.log("⚠️ DISCREPANCY DETECTED.");
        console.log(`Diff (Dict vs TR):  ${dictCount - trCount}`);
        console.log(`Diff (TR vs EN):    ${trCount - enCount}`);
    }

} catch (e) {
    console.error("Error counting:", e);
}
