const fs = require('fs').promises;
const path = require('path');

const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const OUTPUT_FILE = path.join(__dirname, 'data/keyword_index_localized.js');

async function buildLocalizedIndex() {
    console.log('🔍 Building localized keyword index...\n');

    const files = await fs.readdir(TR_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const localizedKeywords = {};

    for (const file of jsonFiles) {
        const slug = file.replace('.json', '');
        const filePath = path.join(TR_DIR, file);

        try {
            const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
            const localizedName = content.localizedName;

            if (localizedName) {
                // Add full name
                const normalizedName = localizedName.toLowerCase().trim();
                if (!localizedKeywords[normalizedName]) {
                    localizedKeywords[normalizedName] = slug;
                    console.log(`✅ ${normalizedName} → ${slug}`);
                }

                // Add individual words for compound names
                const words = normalizedName.split(/\s+/);
                if (words.length > 1) {
                    for (const word of words) {
                        if (word.length >= 3 && !localizedKeywords[word]) {
                            // Only add if meaningful (not common words)
                            const commonWords = ['ve', 'ile', 'bir', 'bu', 'şu', 'da', 'de', 'ki'];
                            if (!commonWords.includes(word)) {
                                localizedKeywords[word] = slug;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.error(`❌ Error reading ${file}: ${err.message}`);
        }
    }

    // Generate output
    const output = `// Auto-generated: localizedName keywords from content files
// Add this to keyword_index.js to enable Turkish name search

const localizedKeywords = ${JSON.stringify(localizedKeywords, null, 4)};

module.exports = localizedKeywords;
`;

    await fs.writeFile(OUTPUT_FILE, output);
    console.log(`\n📝 Written to ${OUTPUT_FILE}`);
    console.log(`📊 Total: ${Object.keys(localizedKeywords).length} keywords`);
}

buildLocalizedIndex();
