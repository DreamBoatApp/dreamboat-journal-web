const fs = require('fs');
const path = require('path');

const contentDir = 'c:\\Users\\guney\\.gemini\\antigravity\\scratch\\dreamboat_journal_web\\content\\tr\\meanings';
const indexFile = 'c:\\Users\\guney\\.gemini\\antigravity\\scratch\\dreamboat_journal_web\\scripts\\data\\keyword_index.js';

try {
    const allFiles = fs.readdirSync(contentDir)
        .filter(f => f.endsWith('.json'));

    const indexContent = fs.readFileSync(indexFile, 'utf-8');

    // Find files whose slug is NOT in the index AND are recent (last 24h)
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    const now = Date.now();

    const newFiles = allFiles.filter(file => {
        const filePath = path.join(contentDir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtimeMs > ONE_DAY_MS) return false;

        const slug = file.replace('.json', '');
        return !indexContent.includes(`'${slug}'`);
    });

    const entries = [];
    const slugs = [];

    newFiles.forEach(file => {
        try {
            console.log("Processing:", file);
            const filePath = path.join(contentDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            if (!fileContent.trim()) {
                console.warn(`Skipping empty file: ${file}`);
                return;
            }
            const content = JSON.parse(fileContent);
            if (!content) {
                console.warn(`Skipping null content: ${file}`);
                return;
            }
            const slug = file.replace('.json', '');
            const localizedName = (content.localizedName || slug).toLowerCase();

            entries.push(`    '${localizedName}': '${slug}',`);
            slugs.push(`'${slug}'`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    });

    const output = `--- KEYWORD INDEX ENTRIES ---
${entries.join('\n')}

--- VERIFY INDEX SLUGS ---
${slugs.join(', ')}

Total new items: ${newFiles.length}
Errors encountered: ${allFiles.length - newFiles.length} (filtered) or read errors.
`;

    fs.writeFileSync('new_slugs.txt', output, 'utf-8');
    console.log("Output written to new_slugs.txt");

} catch (error) {
    console.error("Error:", error);
}
