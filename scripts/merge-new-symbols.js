const fs = require('fs');
const path = require('path');

const SOURCE_PATH = path.join(__dirname, 'data', 'source_dictionary.js');
const LOG_PATH = path.join(__dirname, 'data', 'new_entries_log.txt');

function merge() {
    if (!fs.existsSync(SOURCE_PATH) || !fs.existsSync(LOG_PATH)) {
        console.error("Missing files.");
        return;
    }

    const sourceContent = fs.readFileSync(SOURCE_PATH, 'utf8').trim();
    const newEntries = fs.readFileSync(LOG_PATH, 'utf8').trim();

    // Remove the last closing brace
    let newContent = sourceContent.replace(/};\s*$/, '');

    // Add comma if not present
    if (!newContent.trim().endsWith(',')) {
        newContent += ',\n';
    } else {
        newContent += '\n';
    }

    // Append new entries
    newContent += newEntries;

    // Add closing brace
    newContent += '\n};\n';

    fs.writeFileSync(SOURCE_PATH, newContent);
    console.log(`Merged ${newEntries.split('\n').length} lines into source_dictionary.js`);
}

merge();
