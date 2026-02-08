const fs = require('fs');
const dict = require('./data/source_dictionary.js');

const keys = Object.keys(dict);
let output = `Total Keys: ${keys.length}\n`;
keys.forEach((k, i) => {
    // Stringify to see hidden chars
    const s = JSON.stringify(k);
    if (s.length > 50 || s.includes(' ') || s.includes('CAN') || s.includes('REVISIT') || s.includes('SUDDENLY')) {
        output += `${i}: ${s}\n`;
    }
});

fs.writeFileSync('scripts/data/dump.txt', output);
