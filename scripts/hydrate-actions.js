const fs = require('fs');
const path = require('path');

const DICT_FILE = path.join(__dirname, 'data', 'source_dictionary.js');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

function hydrateActions() {
    console.log("Starting dictionary hydration for ACTIONS...");

    let dictContent = fs.readFileSync(DICT_FILE, 'utf8');

    // Regex to find "KEY": { meaning: "ACTION/SITUATION", ... }
    // We capture the KEY group
    const placeholderRegex = /"([^"]+)":\s*{\s*meaning:\s*"ACTION\/SITUATION",\s*associations:\s*\[\s*\]\s*}/g;

    let match;
    let replacements = [];
    let count = 0;

    // We can't use replace directly with a callback easily because we need async file reading (or sync is fine too)
    // But we need to construct the REPLACEMENT string.

    // Let's iterate over matches first to build a map of replacements
    while ((match = placeholderRegex.exec(dictContent)) !== null) {
        const fullMatch = match[0];
        const key = match[1];

        // Derive slug
        const slug = key.toLowerCase().replace(/_/g, '-');
        const jsonPath = path.join(EN_DIR, `${slug}.json`);

        if (fs.existsSync(jsonPath)) {
            try {
                const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

                // 1. Extract Meaning
                // Title usually is "Dreaming of Walking: Progress and Personal Growth"
                // We want "Progress and Personal Growth"
                let meaning = "Personal Growth";
                if (content.title && content.title.includes(':')) {
                    meaning = content.title.split(':')[1].trim().toUpperCase();
                } else if (content.seoDescription) {
                    // Fallback to SEO desc if title is simple
                    meaning = content.seoDescription.split('.')[0].toUpperCase();
                    // Truncate if too long
                    if (meaning.length > 50) meaning = meaning.substring(0, 47) + "...";
                }

                // 2. Extract Associations
                // Use commonScenarios or keywords if available
                let associations = [];

                if (content.commonScenarios) {
                    // Scenarios are long sentences: "Walking on a busy street...". 
                    // We need to extract keywords. This is hard strictly programmatically without NLP.
                    // Let's try to grab the first few words or use the Key itself split up? 
                    // Actually, let's look for `keywords` prop if it exists (Batch 6 had it, Batch 5 might not).
                    // Checking walking.json... it has commonScenarios but NOT keywords.

                    // Fallback: Use the localized name and maybe specific words from scenarios?
                    // "Walking on a busy street" -> "Busy Street"
                    // "Walking on a solitary path" -> "Solitary Path"

                    content.commonScenarios.forEach(scenario => {
                        const words = scenario.split(' ');
                        // Grab first 2-3 words maybe? 
                        // Or just use generic ones related to the action.
                        if (scenario.includes(' symbolize ')) {
                            // "Walking on a busy street may symbolize..."
                            const subject = scenario.split(' may symbolize ')[0];
                            associations.push(subject);
                        } else {
                            // First 3 words
                            associations.push(words.slice(0, 3).join(' '));
                        }
                    });
                }

                // Clean associations
                associations = associations.map(a => a.replace(/[^\w\s]/gi, '').trim()); // Remove punctuation
                associations = [...new Set(associations)].slice(0, 5); // Unique and max 5

                // If associations are empty, use localized name split
                if (associations.length === 0 && content.localizedName) {
                    associations.push(content.localizedName);
                }

                const newEntry = `"${key}": { meaning: "${meaning}", associations: ${JSON.stringify(associations)} }`;
                replacements.push({ fullMatch, newEntry, key });
                count++;

            } catch (e) {
                console.error(`Error parsing ${slug}: ${e.message}`);
            }
        } else {
            console.warn(`File not found for ${key}: ${slug}.json`);
        }
    }

    if (count === 0) {
        console.log("No ACTION/SITUATION placeholders found or no matching files.");
        return;
    }

    // Apply replacements
    let newDictContent = dictContent;
    replacements.forEach(rep => {
        newDictContent = newDictContent.replace(rep.fullMatch, rep.newEntry);
    });

    fs.writeFileSync(DICT_FILE, newDictContent);
    console.log(`Hydrated ${count} entries in source_dictionary.js`);
}

hydrateActions();
