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

const OUTPUT_FILE = path.join(__dirname, 'data', 'batch_home_symbols.txt');

async function generateHomeList() {
    // Re-import fs as promises for async operations
    const fsp = require('fs').promises;

    const existingKeys = new Set(Object.keys(existingDict));
    console.log(`Loaded ${existingKeys.size} existing symbols.`);

    const prompt = `
    I need a list of 150 distinct, common HOUSEHOLD ITEMS, FURNITURE, and DECOR objects that are commonly found in a home.
    
    Rules:
    1. NO "Adjective + Noun" formats unless necessary (e.g., "Rocking Chair" is okay, "Big Chair" is NOT).
    2. Return ONLY the JSON list of strings.
    3. Focus on missing common items like: Sofa, Armchair, Nightstand, Wardrobe, Drawer, Curtain, Rug, Vase, Lamp, Shelf, Hanger, Blanket, Pillow, Sheet, Towel, Soap, Shampoo, Detergent, Broom, Mop, Bucket, Iron, Vacuum Cleaner, Washing Machine, Dishwasher, Oven, Stove, Fridge, Blender, Kettle, Toaster, Plate, Bowl, Fork, Spoon, Knife, Glass, Mug, Cup, Napkin, Tablecloth, Candlestick, Picture Frame, Mirror, Clock, Vase, Flowerpot, Door, Window, Roof, Chimney, Balcony, Garden, Fence, Gate, Garage, Basement, Attic, Stairs, Wall, Floor, Ceiling.
    4. Translate any concepts to their most common, simple English noun form (e.g. "Nightstand", not "Bedside Table" if possible, or both if distinct).
    5. Examples of what I want: "Armchair", "Chandelier", "Doormat", "Bookshelf", "Remote Control", "Radiator", "Air Conditioner".
    
    Generate 150 items to ensure we have enough unique ones after filtering.
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

        // Fallback if key name varies
        if (!newSymbols) {
            newSymbols = Object.values(result)[0];
        }

        // Filter duplicates locally just in case
        const filtered = newSymbols.filter(s => {
            const key = s.toUpperCase().replace(/[^A-Z0-9-]/g, ' ').trim();
            return !existingKeys.has(key);
        });

        console.log(`Generated ${filtered.length} new unique home symbols.`);

        await fsp.writeFile(OUTPUT_FILE, JSON.stringify(filtered, null, 2));
        console.log(`Saved to ${OUTPUT_FILE}`);
    } catch (error) {
        console.error("CRITICAL OPENAI ERROR:", JSON.stringify(error, null, 2));
        if (error.response) {
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
        }
    }
}

generateHomeList();
