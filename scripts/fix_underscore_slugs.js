const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'data', 'keyword_index.js'),
    path.join(__dirname, 'data', 'keyword_index_localized.js')
];

files.forEach(filePath => {
    const mod = require(filePath);
    let fixCount = 0;
    const fixed = {};

    for (const [key, slug] of Object.entries(mod)) {
        if (typeof slug === 'string' && slug.includes('_')) {
            const newSlug = slug.replace(/_/g, '-');
            fixed[key] = newSlug;
            fixCount++;
        } else {
            fixed[key] = slug;
        }
    }

    // Determine export variable name
    const basename = path.basename(filePath, '.js');
    let exportName = 'keywordIndex';
    if (basename.includes('localized')) exportName = 'localizedKeywords';

    const lines = Object.entries(fixed).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`);
    const output = `// Auto-generated keyword index\n// Underscore slugs normalized to hyphens\n\nconst ${exportName} = {\n${lines.join(',\n')}\n};\n\nmodule.exports = ${exportName};\n`;

    fs.writeFileSync(filePath, output);
    console.log(`${path.basename(filePath)}: Fixed ${fixCount} underscore slugs`);
});
