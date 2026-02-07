const fs = require('fs');
const path = require('path');

const SOURCE_PATH = path.join(__dirname, 'data', 'source_dictionary.js');
const LOG_PATH = path.join(__dirname, 'data', 'new_modern_log.txt');

function merge() {
    if (!fs.existsSync(SOURCE_PATH) || !fs.existsSync(LOG_PATH)) {
        console.error("Missing files.");
        console.error(`Source: ${SOURCE_PATH} (${fs.existsSync(SOURCE_PATH)})`);
        console.error(`Log: ${LOG_PATH} (${fs.existsSync(LOG_PATH)})`);
        return;
    }

    const sourceContent = fs.readFileSync(SOURCE_PATH, 'utf8').trim();
    const newEntries = fs.readFileSync(LOG_PATH, 'utf8').trim();

    // Backup source
    fs.copyFileSync(SOURCE_PATH, SOURCE_PATH + '.bak');

    // Remove the last closing brace / object end
    // It usually ends with `};` or `  };` or `}`
    let newContent = sourceContent.replace(/\};?\s*$/, '');

    // Check if the last character is a comma, if not add one
    newContent = newContent.trimEnd();
    if (!newContent.endsWith(',')) {
        newContent += ',';
    }

    newContent += '\n' + newEntries;
    newContent += '\n};\n';

    fs.writeFileSync(SOURCE_PATH, newContent);
    console.log(`Merged content from ${LOG_PATH} into source_dictionary.js`);
}

merge();
