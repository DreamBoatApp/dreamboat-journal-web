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

const BATCH_FILE = path.join(__dirname, 'data', 'scenarios_batch.json');
const PROGRESS_FILE = path.join(__dirname, 'data', 'scenarios_progress.json');
const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const EN_DIR = path.join(__dirname, '..', 'content', 'en', 'meanings');
const LOG_FILE = path.join(__dirname, 'data', 'new_scenarios_log.txt');

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('UNHANDLED REJECTION:', reason);
});

async function main() {
    if (!fs.existsSync(BATCH_FILE)) {
        console.error("Batch file not found:", BATCH_FILE);
        return;
    }

    const allSymbols = JSON.parse(fs.readFileSync(BATCH_FILE, 'utf8'));
    let progress = [];
    if (fs.existsSync(PROGRESS_FILE)) {
        progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }

    const processedSet = new Set(progress);
    const symbolsToProcess = allSymbols.filter(s => !processedSet.has(s));

    console.log(`Found ${allSymbols.length} total scenarios.`);
    console.log(`${progress.length} already processed.`);
    console.log(`${symbolsToProcess.length} remaining.`);

    // Process in small batches
    const BATCH_SIZE = 5;
    for (let i = 0; i < symbolsToProcess.length; i += BATCH_SIZE) {
        const chunk = symbolsToProcess.slice(i, i + BATCH_SIZE);
        await Promise.all(chunk.map(s => processScenario(s)));

        // Save progress
        progress = [...progress, ...chunk];
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
        console.log(`Saved progress. ${progress.length}/${allSymbols.length} complete.`);
    }
}

async function processScenario(englishScenario) {
    const slug = englishScenario.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
        .replace(/^-+|-+$/g, '');   // Trim hyphens

    const trPath = path.join(TR_DIR, `${slug}.json`);
    const enPath = path.join(EN_DIR, `${slug}.json`);

    try {
        console.log(`\n🔮 Processing: ${englishScenario}...`);

        // 1. Translate Concept to Turkish (Phrase translation)
        const trName = await translateToTurkish(englishScenario);
        console.log(`   🇹🇷 TR Concept: ${trName}`);

        // 2. Generate Turkish Content (Adapted for Scenarios)
        const trContent = await generateTurkishContent(englishScenario, trName);
        fs.mkdirSync(TR_DIR, { recursive: true });
        fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));

        // 3. Translate to English Content
        const enContent = await translateToEnglish(trContent);
        fs.mkdirSync(EN_DIR, { recursive: true });
        fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));

        // 4. Log for Dictionary
        appendToDictionaryLog(englishScenario, trContent);

        console.log(`   ✅ Completed: ${englishScenario}`);

    } catch (error) {
        console.error(`   ❌ Failed: ${englishScenario} - ${error.message}`);
    }
}

async function translateToTurkish(phrase) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Translate this Dream Scenario/Sensation to Turkish. Keep it natural. Example: 'Falling endlessly' -> 'Sürekli Düşmek'. Return ONLY the Turkish phrase." },
            { role: "user", content: phrase }
        ],
        temperature: 0.3
    });
    return completion.choices[0].message.content.trim().replace(/\.$/, '');
}

async function generateTurkishContent(englishName, turkishName) {
    const prompt = `Create a DETAILED dream interpretation JSON for the scenario: "${turkishName}" (English: ${englishName}) in Turkish.
    
    This is a SITUATION or FEELING, not an object. Adjust the title accordingly.
    
    MATCH THIS SCHEMA EXACTLY:
    {
      "localizedName": "${turkishName}",
      "title": "Generate a natural title here. Ex: 'Rüyada [Scenario] Görmek' or 'Rüyada [Scenario] Hissetmek'",
      "seoDescription": "...",
      "introduction": "...",
      "symbolism": "...",
      "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
      "commonScenarios": [
        "Scenario 1: Interpretation",
        "Scenario 2: Interpretation"
      ]
    }
    Rules:
    - Jungian depth. Focus on the PSYCHOLOGICAL STATE and EMOTION.
    - cosmicAnalysis MUST have bold headers for moon phases.
    - commonScenarios MUST be an array of strings.
    - Return JSON only.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
}

async function translateToEnglish(trContent) {
    const prompt = `Translate this JSON to English. Keep structure identical.
    localizedName = English name.
    cosmicAnalysis keys = New Moon, Waxing Moon, Full Moon, Waning Moon.
    JSON: ${JSON.stringify(trContent)}`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
}

function appendToDictionaryLog(englishName, trContent) {
    const entry = `    "${englishName.toUpperCase()}": { meaning: "${trContent.introduction.substring(0, 50)}...", associations: [] },\n`;
    fs.appendFileSync(LOG_FILE, entry);
}

main();
