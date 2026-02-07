const fs = require('fs');
const path = require('path');

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const INDEX_PATH = path.join(__dirname, 'data', 'keyword_index_localized.js');

function verify() {
    console.log("🔍 Verifying Search Index Coverage...");

    // 1. Get all content files
    const files = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));
    const allSlugs = new Set(files.map(f => f.replace('.json', '')));

    // 2. Read the index file
    // The file format is: const localizedKeywords = { ... }; module.exports = ...;
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');

    // Extract the JSON object part
    const start = indexContent.indexOf('{');
    const end = indexContent.lastIndexOf('}');

    if (start === -1 || end === -1) {
        console.error("❌ Could not parse index file structure.");
        return;
    }

    const jsonStr = indexContent.substring(start, end + 1);
    let index;
    try {
        index = JSON.parse(jsonStr);
    } catch (e) {
        console.error("❌ JSON Parse Error:", e.message);
        return;
    }

    // The index maps "keyword" -> "slug". We want the set of unique slugs.
    const indexSlugs = new Set(Object.values(index));

    // 3. Check for missing slugs
    let missingcount = 0;
    allSlugs.forEach(slug => {
        if (!indexSlugs.has(slug)) {
            console.log(`❌ NOT INDEXED: ${slug}`);
            missingcount++;
        }
    });

    console.log(`\nStats:`);
    console.log(`- Total Files: ${allSlugs.size}`);
    console.log(`- Total Indexed Targets: ${indexSlugs.size}`);

    if (missingcount === 0) {
        console.log("✅ All content files are reachable via the search index.");
    } else {
        console.log(`⚠️ ${missingcount} files are NOT in the search index.`);
    }
}

verify();
