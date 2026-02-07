const fs = require('fs');
const path = require('path');
// Manual env parsing
function getEnv(key) {
    // Prioritize .env.local file content over process.env
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) {
            const val = match[1].trim();
            if (val) return val;
        }
    }
    if (process.env[key]) return process.env[key];
    return null;
}

const apiKey = getEnv('OPENAI_API_KEY');
console.log(`API Key status: ${apiKey ? 'Present' : 'Missing'}`);
if (apiKey) {
    console.log(`Key start: ${apiKey.substring(0, 10)}`);
    console.log(`Key end: ${apiKey.substring(apiKey.length - 10)}`);
}

const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: apiKey,
});

// Paths
const SOURCE_DICT_PATH = path.join(__dirname, 'data', 'source_dictionary.js');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const OUTPUT_FILE = path.join(__dirname, 'data', 'new_symbols_batch.json');

// Helper to get existing symbols
function getExclusionList() {
    const exclusions = new Set();

    // 1. From source_dictionary.js
    if (fs.existsSync(SOURCE_DICT_PATH)) {
        const dict = require(SOURCE_DICT_PATH);
        Object.keys(dict).forEach(key => exclusions.add(key.toUpperCase().trim()));
    }

    // 2. From content directory filenames
    if (fs.existsSync(CONTENT_DIR)) {
        const files = fs.readdirSync(CONTENT_DIR);
        files.forEach(file => {
            if (file.endsWith('.json')) {
                const slug = file.replace('.json', '').replace(/-/g, ' ').toUpperCase();
                exclusions.add(slug);
            }
        });
    }

    return Array.from(exclusions);
}

async function generateSymbols() {
    console.log('Gathering existing symbols for exclusion...');
    const exclusionList = getExclusionList();
    console.log(`Found ${exclusionList.length} existing symbols.`);

    const targetCount = 500;
    let generatedSymbols = [];
    const batchSize = 50; // Generate in chunks to avoid token limits

    console.log(`Starting generation of ${targetCount} new symbols...`);

    // Resume capability
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
            generatedSymbols = existing;
            console.log(`Resuming from ${generatedSymbols.length} symbols.`);
            // Add to exclusion list
            generatedSymbols.forEach(s => exclusionList.push(s.toUpperCase()));
        } catch (e) {
            console.error("Error reading existing batch file, starting fresh.");
        }
    }

    while (generatedSymbols.length < targetCount) {
        const remaining = targetCount - generatedSymbols.length;
        const currentBatchSize = Math.min(batchSize, remaining);

        console.log(`Generating batch of ${currentBatchSize} symbols... (Total so far: ${generatedSymbols.length})`);

        const prompt = `
        I need a list of ${currentBatchSize} UNIQUE, CONCRETE NOUNS for a dream dictionary.
        
        CRITICAL RULES:
        1. NO Adjectives + Noun combinations (e.g., NO "White Horse"). Use ONLY the noun.
        2. NO Abstract concepts (e.g., NO "Harmony"). Use concrete objects, animals, places, foods, tools.
        3. NO Plurals (use singular form).
        4. MUST BE UNIQUE. Do NOT use any of these words: ${JSON.stringify(exclusionList.slice(0, 20))}...
        5. **IMPORTANT**: The common symbols are already taken. Give me **RARE, SPECIFIC, and OBSCURE** symbols. 
           - Instead of "Dog", give "Greyhound". 
           - Instead of "Bird", give "Kingfisher".
           - Instead of "Fruit", give "Persimmon".
           - Think of: Specific musical instruments, specific tools, exotic animals, specific flowers, mythological creatures, architectural features, household items.
        6. Return ONLY a JSON array of strings. Example: ["Oboe", "Trowel", "Narwhal", "Pagoda"]
        
        Give me strictly the JSON array.
        `;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a dream symbol generator. You output strict JSON arrays of unique nouns." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9,
            });

            const content = completion.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const batch = JSON.parse(content);

            // Filter duplicates against existing and newly generated
            const uniqueBatch = batch.filter(sym => {
                const cleanSym = sym.toUpperCase().trim();
                return !exclusionList.includes(cleanSym) && !generatedSymbols.includes(cleanSym);
            });

            console.log(`Generated ${batch.length} items, ${uniqueBatch.length} were unique/new.`);

            if (uniqueBatch.length > 0) {
                generatedSymbols = [...generatedSymbols, ...uniqueBatch];
                // Add new ones to exclusion list for next pass
                uniqueBatch.forEach(s => exclusionList.push(s.toUpperCase()));

                // Incremental Save
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedSymbols, null, 2));
                console.log(`Saved ${generatedSymbols.length} symbols to ${OUTPUT_FILE}`);
            } else {
                console.log("No new symbols generated in this batch. Retrying...");
                // Maybe wait longer or increase temp if getting stuck?
            }

        } catch (error) {
            console.error("Error generating batch:", error);
            // Wait a bit before retrying if it's a rate limit, or just continue
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Trim to exact count if we went over
    generatedSymbols = generatedSymbols.slice(0, targetCount);

    // Final Save
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedSymbols, null, 2));
    console.log(`Successfully saved ${generatedSymbols.length} new symbols to ${OUTPUT_FILE}`);
}

generateSymbols();
