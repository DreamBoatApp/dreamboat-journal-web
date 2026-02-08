const fs = require('fs');
const path = require('path');

const LIST_FILE = path.join(__dirname, 'data', 'batch_scenarios_list.json');
const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const CONTENT_DIR = path.join(__dirname, '../content/en/meanings');

function mergeBatch6() {
    console.log("Starting merge for Batch 6...");

    const scenarios = JSON.parse(fs.readFileSync(LIST_FILE, 'utf8'));
    let dictContent = fs.readFileSync(DICT_FILE, 'utf8');

    // Find the insertion point (before the last closing brace)
    const lastBraceIndex = dictContent.lastIndexOf('}');
    if (lastBraceIndex === -1) {
        console.error("Error: Could not find closing brace in source_dictionary.js");
        process.exit(1);
    }

    const newEntries = [];

    scenarios.forEach(scenario => {
        const { key } = scenario;
        const slug = key.toLowerCase().replace(/_/g, '-');
        const contentPath = path.join(CONTENT_DIR, `${slug}.json`);

        if (!fs.existsSync(contentPath)) {
            console.warn(`Warning: Content file not found for ${key} (${slug})`);
            return;
        }

        try {
            const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

            // Extract meaning and associations
            // Meaning: Join concepts or use description
            let meaning = "Specific Scenario";
            if (content.symbolism && content.symbolism.concepts) {
                meaning = content.symbolism.concepts.join(' / ').toUpperCase();
            }

            // Associations: specific elements + keywords
            let associations = [];
            if (content.symbolism && content.symbolism.elements) {
                associations.push(...content.symbolism.elements);
            }
            // Add some keywords if we have space (limit to 5 total associations)
            if (content.keywords) {
                const uniqueKeywords = content.keywords.filter(k =>
                    !associations.includes(k) &&
                    k.toLowerCase() !== content.title.toLowerCase() &&
                    !k.includes('Rüyada') // Filter out Turkish keywords if mixed
                );
                associations.push(...uniqueKeywords);
            }

            // Take top 5 unique, capitalized
            associations = [...new Set(associations)].slice(0, 5).map(a => a.charAt(0).toUpperCase() + a.slice(1));

            // Format entry
            // "KEY": { meaning: "MEANING", associations: ["A", "B"] },
            const entry = `    "${key}": { meaning: "${meaning}", associations: ${JSON.stringify(associations)} }`;

            // Check if key already exists in file to strictly avoid duplicates
            if (dictContent.includes(`"${key}":`)) {
                console.log(`Skipping existing key: ${key}`);
            } else {
                newEntries.push(entry);
            }

        } catch (e) {
            console.error(`Error processing ${slug}: ${e.message}`);
        }
    });

    if (newEntries.length > 0) {
        const beforeBrace = dictContent.substring(0, lastBraceIndex).trimEnd();
        const afterBrace = dictContent.substring(lastBraceIndex);

        // Ensure comma if needed
        const separator = beforeBrace.trim().endsWith(',') ? '' : ',';

        const updatedContent = beforeBrace + separator + '\n' + newEntries.join(',\n') + '\n' + afterBrace;

        fs.writeFileSync(DICT_FILE, updatedContent);
        console.log(`Successfully appended ${newEntries.length} new entries to source_dictionary.js`);
    } else {
        console.log("No new entries to append.");
    }
}

mergeBatch6();
