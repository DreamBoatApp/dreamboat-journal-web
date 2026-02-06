const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content/tr/meanings');
const KEYWORD_INDEX_PATH = path.join(__dirname, 'data/keyword_index.js');
const LOCALIZED_NAMES_PATH = path.join(__dirname, 'data/localized_names.js');

try {
    // 1. Read existing files
    let keywordIndexContent = fs.readFileSync(KEYWORD_INDEX_PATH, 'utf8');
    let localizedNamesContent = fs.readFileSync(LOCALIZED_NAMES_PATH, 'utf8');

    // 2. Scan content directory
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
    console.log(`Found ${files.length} content files.`);

    let newKeywordEntries = [];
    let newLocalizedEntries = [];

    files.forEach(file => {
        const slug = path.basename(file, '.json');
        let content;
        try {
            content = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));
        } catch (err) {
            console.error(`ERROR PARSING FILE: ${file}`, err.message);
            return;
        }
        const localizedName = content.localizedName;

        if (!localizedName) return;

        // Check Localized Names (Slug -> Name)
        // Simple regex check to see if slug is already keys
        // "slug": "Name"
        const localizedPattern = new RegExp(`"${slug}":\\s*"`);
        if (!localizedPattern.test(localizedNamesContent)) {
            newLocalizedEntries.push(`    "${slug}": "${localizedName}"`);
        }

        // Check Keyword Index (Name -> Slug)
        // We want to update keyword_index.js
        // We want to add LOWERCASE version
        const lowerName = localizedName.toLowerCase();

        // Check if lowerName exists as a key
        // 'lowerName': 'slug'
        // Need to be careful with Regex escaping
        const lowerKeyPattern = new RegExp(`'${lowerName}':`);
        if (!lowerKeyPattern.test(keywordIndexContent)) {
            newKeywordEntries.push(`    '${lowerName}': '${slug}'`);
        }

        // CASE SENSITIVITY FIX:
        // Also add the Capitalized Version if it's different
        if (localizedName !== lowerName) {
            const capKeyPattern = new RegExp(`'${localizedName}':`);
            if (!capKeyPattern.test(keywordIndexContent)) {
                newKeywordEntries.push(`    '${localizedName}': '${slug}' // Case fix`);
            }
        }

        // SPECIAL FIX FOR "Ayı" (Uppercase I issues)
        if (localizedName.includes('ı') || localizedName.includes('i')) {
            // Add UPPERCASE version for Turkish chars
            const upperName = localizedName.toUpperCase(); // using default locale, might be issue 
            // node default might not be TR.
            // But let's try to add the exact LocalizedName if different.
            if (upperName !== localizedName && upperName !== lowerName) {
                const upperKeyPattern = new RegExp(`'${upperName}':`);
                if (!upperKeyPattern.test(keywordIndexContent)) {
                    newKeywordEntries.push(`    '${upperName}': '${slug}' // Case fix`);
                }
            }
        }
    });

    // 3. Update files
    if (newLocalizedEntries.length > 0) {
        const lastBrace = localizedNamesContent.lastIndexOf('};');
        const prefix = localizedNamesContent.substring(0, lastBrace).trimEnd();
        const suffix = localizedNamesContent.substring(lastBrace);
        const separator = prefix.endsWith(',') ? '' : ',';

        const newContent = prefix + separator + '\n' + newLocalizedEntries.join(',\n') + '\n' + suffix;
        fs.writeFileSync(LOCALIZED_NAMES_PATH, newContent, 'utf8');
        console.log(`Updated localized_names.js with ${newLocalizedEntries.length} new entries.`);
    }

    if (newKeywordEntries.length > 0) {
        const lastBrace = keywordIndexContent.lastIndexOf('};');
        const prefix = keywordIndexContent.substring(0, lastBrace).trimEnd();
        const suffix = keywordIndexContent.substring(lastBrace);
        const separator = prefix.endsWith(',') ? '' : ',';

        const newContent = prefix + separator + '\n\n    // Auto-generated Fixes\n' + newKeywordEntries.join(',\n') + '\n' + suffix;
        fs.writeFileSync(KEYWORD_INDEX_PATH, newContent, 'utf8');
        console.log(`Updated keyword_index.js with ${newKeywordEntries.length} new entries.`);
    }

} catch (e) {
    console.error(e);
}
