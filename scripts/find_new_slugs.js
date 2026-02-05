const fs = require('fs');
const path = require('path');

const contentDir = 'c:\\Users\\guney\\.gemini\\antigravity\\scratch\\dreamboat_journal_web\\content\\tr\\meanings';
const indexFile = 'c:\\Users\\guney\\.gemini\\antigravity\\scratch\\dreamboat_journal_web\\scripts\\data\\keyword_index.js';

try {
    const allFiles = fs.readdirSync(contentDir)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));

    const indexContent = fs.readFileSync(indexFile, 'utf-8');

    // Naively check if the slug appears in the file
    // Note: exact match with quotes to avoid partial matches
    const newSlugs = allFiles.filter(slug => !indexContent.includes(`'${slug}'`));

    console.log("NEW_SLUGS_START");
    console.log(JSON.stringify(newSlugs, null, 2));
    console.log("NEW_SLUGS_END");
    console.log(`Total new slugs found: ${newSlugs.length}`);
} catch (error) {
    console.error("Error:", error);
}
