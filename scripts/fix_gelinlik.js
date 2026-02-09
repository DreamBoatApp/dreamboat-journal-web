const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '..', 'scripts', 'data', 'keyword_index.js'),
    path.join(__dirname, '..', 'scripts', 'data', 'keyword_index_localized.js')
];

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf-8');
    const before = content;
    content = content.split('"gelinlik": "wedding"').join('"gelinlik": "wedding-dress"');
    if (content !== before) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed gelinlik in', path.basename(filePath));
    } else {
        console.log('No change needed in', path.basename(filePath));
    }
});
