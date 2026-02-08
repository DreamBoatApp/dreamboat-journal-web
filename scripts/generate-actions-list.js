const fs = require('fs');
const path = require('path');
// Manual env parsing
function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) {
            return match[1].trim();
        }
    }
    return process.env[key];
}

const OpenAI = require('openai');
const existingDict = require('./data/source_dictionary');

const openai = new OpenAI({
    apiKey: getEnv('OPENAI_API_KEY')
});

const OUTPUT_FILE = path.join(__dirname, 'data', 'batch_actions_list.txt');

async function generateActionsList() {
    const fsp = require('fs').promises;
    const existingKeys = new Set(Object.keys(existingDict));
    console.log(`Loaded ${existingKeys.size} existing symbols.`);

    const prompt = `
    I need a list of 100 DISTINCT, frequently searched DREAM SYMBOLS from English, Turkish, Spanish, German, and Portuguese cultures.
    
    **CRITICAL FOCUS:**
    1. Focus on **VERBS, ACTIONS, and HUMAN SITUATIONS** (e.g., Arguing, Clapping, Snoring, Crying, Running, Flying, Falling, Being Chased, Missing a Flight, Being Naked, Losing Teeth, Taking a Test, Vomiting, Kissing, Hugging, Fighting, Dying, Giving Birth, Getting Married).
    2. Also include very common, universal objects that might be missing (e.g., Money, Gold, Water, Fire, Baby, Dog, Cat, Snake - *only if not already commonly covered, but prefer actions*).
    
    **Rules:**
    1. Translate everything to **English Noun or Gerund form** (e.g. "Arguing", "Argument", "Clapping").
    2. **NO DUPLICATES** from this approximate list of existing keys (I will filter digitally, but try to avoid obvious ones you know are standard like "FLYING" if it's already there - wait, actually just generate the most popular ones, I will filter them out myself).
    3. Return ONLY a JSON array of strings.
    
    **Sources to Simulate:**
    - "Rüyada ... görmek" (TR)
    - "Dream about ..." (EN)
    - "Sonar con ..." (ES)
    - "Traum von ..." (DE)
    - "Sonhar com ..." (PT)
    
    Generate 150 items to ensure we have enough unique ones after filtering against my existing database.
    Format: JSON array of strings ["ITEM1", "ITEM2", ...]
    `;

    console.log("Generating list...");
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(completion.choices[0].message.content);
        let newSymbols = result.symbols || result.items || result.list;

        if (!newSymbols) {
            newSymbols = Object.values(result)[0];
        }

        // Filter duplicates locally
        const filtered = newSymbols.filter(s => {
            const key = s.toUpperCase().replace(/[^A-Z0-9-]/g, ' ').replace(/\s+/g, '_').trim();
            // Also check standard variations
            const keySingular = key.endsWith('S') ? key.slice(0, -1) : key;
            return !existingKeys.has(key) && !existingKeys.has(keySingular);
        });

        console.log(`Generated ${filtered.length} new unique action/situation symbols.`);

        await fsp.writeFile(OUTPUT_FILE, JSON.stringify(filtered, null, 2));
        console.log(`Saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error("Error:", error);
    }
}

generateActionsList();
