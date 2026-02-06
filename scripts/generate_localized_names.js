const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/tr/meanings');
const outputFile = path.join(__dirname, 'data/localized_names.js');

try {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
    const map = {};

    files.forEach(file => {
        try {
            const slug = file.replace('.json', '');
            const filePath = path.join(contentDir, file);
            let raw = fs.readFileSync(filePath, 'utf-8');
            // Remove BOM if present
            if (raw.charCodeAt(0) === 0xFEFF) {
                raw = raw.slice(1);
            }
            const content = JSON.parse(raw);
            // Use localizedName if available, else sanitize slug
            map[slug] = content.localizedName || slug.replace(/-/g, ' ');
        } catch (err) {
            console.error(`Skipping ${file}: ${err.message}`);
        }
    });

    const fileContent = `// Auto-generated map of slug -> localized name
// Used for search results to avoid FS access
const localizedNames = ${JSON.stringify(map, null, 4)};

export default localizedNames;
`;

    fs.writeFileSync(outputFile, fileContent, 'utf-8');
    console.log(`✅ Generated localized_names.js with ${Object.keys(map).length} entries.`);

} catch (error) {
    console.error('Error generating localized names map:', error);
}
