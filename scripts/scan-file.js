const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'source_dictionary.js');
const buffer = fs.readFileSync(filePath);
const content = buffer.toString('utf8');

const queries = [
    "MOTHER",
    "DEJA VU",
    "DEJA_VU"
];

queries.forEach(q => {
    const idx = content.indexOf(q);
    if (idx !== -1) {
        const lines = content.substring(0, idx).split('\n');
        console.log(`FOUND '${q}' at line ${lines.length}`);
    } else {
        console.log(`NOT FOUND '${q}'`);
    }
});
