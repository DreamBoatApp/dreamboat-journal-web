const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'data', 'new_scenarios_log.txt');
const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');

try {
    if (!fs.existsSync(LOG_FILE)) {
        console.error(`Log file not found: ${LOG_FILE}`);
        process.exit(1);
    }

    const newEntries = fs.readFileSync(LOG_FILE, 'utf8');
    let dictContent = fs.readFileSync(DICT_FILE, 'utf8');

    // Remove the last closing brace and export statement if present to append cleanly
    // Assuming the file ends with "};" or "}\nmodule.exports = ..." 
    // Actually, looking at previous view_file, it ends with "};"

    // Find the last closing brace
    const lastBraceIndex = dictContent.lastIndexOf('}');

    if (lastBraceIndex === -1) {
        console.error("Could not find closing brace in dictionary file.");
        process.exit(1);
    }

    const beforeBrace = dictContent.substring(0, lastBraceIndex);
    const afterBrace = dictContent.substring(lastBraceIndex);

    const updatedContent = beforeBrace + '\n' + newEntries + afterBrace;

    fs.writeFileSync(DICT_FILE, updatedContent);
    console.log(`Successfully merged ${newEntries.split('\n').filter(l => l.includes(': {')).length} new scenarios into dictionary.`);

} catch (error) {
    console.error("Merge failed:", error);
    process.exit(1);
}
