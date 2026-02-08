const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');

try {
    const content = fs.readFileSync(DICT_FILE, 'utf8');

    // Split by newlines
    const lines = content.split(/\r?\n/);

    // Filter out lines that are purely whitespace
    const cleanLines = lines.filter(line => line.trim().length > 0);

    console.log(`Original lines: ${lines.length}`);
    console.log(`Clean lines: ${cleanLines.length}`);

    if (lines.length === cleanLines.length) {
        console.log("No empty lines found.");
    } else {
        fs.writeFileSync(DICT_FILE, cleanLines.join('\n'));
        console.log("File compacted successfully.");
    }

} catch (e) {
    console.error("Error compacting file:", e);
}
