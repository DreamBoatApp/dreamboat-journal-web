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
const OUTPUT_FILE = path.join(__dirname, 'data', 'scenarios_batch.json');

// Helper to get existing symbols
function getExclusionList() {
    const exclusions = new Set();
    if (fs.existsSync(SOURCE_DICT_PATH)) {
        const dict = require(SOURCE_DICT_PATH);
        Object.keys(dict).forEach(key => exclusions.add(key.toUpperCase().trim()));
    }
    return Array.from(exclusions);
}

async function generateScenarios() {
    console.log('Gathering existing symbols for exclusion...');
    const exclusionList = getExclusionList();

    const targetCount = 100;
    let generatedScenarios = [];
    const batchSize = 25;

    console.log(`Starting generation of ${targetCount} dream scenarios...`);

    // Resume capability
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            generatedScenarios = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
            console.log(`Resuming from ${generatedScenarios.length} scenarios.`);
        } catch (e) { }
    }

    while (generatedScenarios.length < targetCount) {
        const remaining = targetCount - generatedScenarios.length;
        const currentBatchSize = Math.min(batchSize, remaining);

        console.log(`Generating batch of ${currentBatchSize}...`);

        const prompt = `
        I need a list of ${currentBatchSize} COMMON DREAM SCENARIOS, SENSATIONS, or FEELINGS.
        
        CRITICAL RULES:
        1. NO OBJECTS (e.g., NO "Snake", NO "Car", NO "House"). I have objects.
        2. Focus on ACTIONS, FEELINGS, and SITUATIONS.
           - "Trying to scream but no sound"
           - "Can't move / Sleep Paralysis"
           - "Running in slow motion"
           - "Being chased"
           - "Falling endlessly"
           - "Teeth crumbling"
           - "Naked in public"
           - "Late for an exam"
           - "Driving a car with no brakes"
           - "Finding a new room in house"
           - "Meeting a deceased relative"
           - "Flying without wings"
           - "Breathing underwater"
        3. MUST BE UNIQUE. Do NOT use: ${JSON.stringify(exclusionList.slice(0, 20))}...
        4. Return ONLY a JSON array of strings (English).
        
        Give me strictly the JSON array.
        `;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a dream scenario generator. Return JSON array of strings." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9,
            });

            const content = completion.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const batch = JSON.parse(content);

            const uniqueBatch = batch.filter(s => {
                const cleanS = s.toUpperCase().trim();
                return !exclusionList.includes(cleanS) && !generatedScenarios.includes(s);
            });

            if (uniqueBatch.length > 0) {
                generatedScenarios = [...generatedScenarios, ...uniqueBatch];
                // Incremental Save
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedScenarios, null, 2));
                console.log(`Saved ${generatedScenarios.length} scenarios.`);
            }

        } catch (error) {
            console.error("Error:", error);
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    // Trim
    generatedScenarios = generatedScenarios.slice(0, targetCount);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generatedScenarios, null, 2));
    console.log("Done.");
}

generateScenarios();
