const fs = require('fs');
const path = require('path');
// Manual env parsing
function getEnv(key) {
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
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

// Paths
const SOURCE_DICT_PATH = path.join(__dirname, 'data', 'source_dictionary.js');
const OUTPUT_FILE = path.join(__dirname, 'data', 'modern_symbols_batch.json');

// Helper to get existing symbols
function getExclusionList() {
    const exclusions = new Set();
    if (fs.existsSync(SOURCE_DICT_PATH)) {
        const dict = require(SOURCE_DICT_PATH);
        Object.keys(dict).forEach(key => exclusions.add(key.toUpperCase().trim()));
    }
    return Array.from(exclusions);
}

async function generateModernSymbols() {
    console.log('Gathering existing symbols for exclusion...');
    const exclusionList = getExclusionList();

    const targetCount = 500;
    let generatedSymbols = [];
    const batchSize = 50;

    console.log(`Starting generation of ${targetCount} MODERN & COMMON symbols...`);

    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            generatedSymbols = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
            console.log(`Resuming from ${generatedSymbols.length} symbols.`);
        } catch (e) { }
    }

    const categories = [
        "Modern Technology (e.g., Drone, Smartphone, VR Headset)",
        "Office & Work Life (e.g., PowerPoint, Meeting Room, Stapler)",
        "Urban Infrastructure (e.g., Subway, Traffic Light, Skyscraper)",
        "Modern Clothing & Accessories (e.g., Hoodie, Sneakers, Smartwatch)",
        "Household Items (Modern) (e.g., Air Fryer, Robot Vacuum, Blender)",
        "Modern Transport (e.g., Electric Scooter, Uber, High-speed Train)",
        "Social Situations (e.g., Selfie, Text Message, Ghosting)",
        "Modern Food & Drink (e.g., Latte, Sushi, Avocado Toast)"
    ];

    let categoryIndex = 0;

    while (generatedSymbols.length < targetCount) {
        const remaining = targetCount - generatedSymbols.length;
        const currentBatchSize = Math.min(batchSize, remaining);
        const currentCategory = categories[categoryIndex % categories.length];

        console.log(`Generating batch of ${currentBatchSize} for category: ${currentCategory}...`);

        const prompt = `
        I need a list of ${currentBatchSize} COMMON, MODERN, and RELEVANT dream symbols for a dictionary.
        focus CATEGORY: ${currentCategory}
        
        CRITICAL RULES:
        1. NO Adjectives + Noun duplicates (e.g., "fast car" -> use "Sportscar").
        2. NO Abstract concepts (e.g., "Networking"). Use CONCRETE NOUNS or SPECIFIC ACTIONS.
        3. NO Plurals.
        4. MUST BE UNIQUE. Do NOT use: ${JSON.stringify(exclusionList.slice(0, 20))}...
        5. **IMPORTANT**: Focus on items common in the 21st century or daily city life.
           - Instead of "Chariot", give "SUV".
           - Instead of "Quill", give "Stylus".
        6. Return ONLY a JSON array of strings.
        
        Give me strictly the JSON array.
        `;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a dream dictionary generator. Return JSON array of strings." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9,
            });

            const content = completion.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const batch = JSON.parse(content);

            const uniqueBatch = batch.filter(s => {
                const cleanS = s.toUpperCase().trim();
                return !exclusionList.includes(cleanS) && !generatedSymbols.includes(s);
            });

            if (uniqueBatch.length > 0) {
                generatedSymbols = [...generatedSymbols, ...uniqueBatch];
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedSymbols, null, 2));
                console.log(`Saved ${generatedSymbols.length} symbols.`);
            }

            categoryIndex++;

        } catch (error) {
            console.error("Error:", error);
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    // Trim
    generatedSymbols = generatedSymbols.slice(0, targetCount);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedSymbols, null, 2));
    console.log("Done.");
}

generateModernSymbols();
