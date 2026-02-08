const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');

try {
    const content = fs.readFileSync(DICT_FILE, 'utf8');
    fs.writeFileSync(DICT_FILE, content);
    console.log("File touched successfully.");
} catch (e) {
    console.error("Error touching file:", e);
}
