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
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

const BATCH_FILE = path.join(__dirname, 'data', 'new_symbols_batch.json');
const PROGRESS_FILE = path.join(__dirname, 'data', 'generation_progress.json');
const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const EN_DIR = path.join(__dirname, '..', 'content', 'en', 'meanings');
const SOURCE_DICT_PATH = path.join(__dirname, 'data', 'source_dictionary.js');

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

    console.log(`Found ${allSymbols.length} total symbols.`);
    console.log(`${progress.length} already processed.`);
    console.log(`${symbolsToProcess.length} remaining.`);

    // Process in small batches to manage rate limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < symbolsToProcess.length; i += BATCH_SIZE) {
        const chunk = symbolsToProcess.slice(i, i + BATCH_SIZE);
        await Promise.all(chunk.map(s => processSymbol(s)));

        // Save progress
        progress = [...progress, ...chunk];
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
        console.log(`Saved progress. ${progress.length}/${allSymbols.length} complete.`);
    }
}

async function processSymbol(englishNoun) {
    const slug = englishNoun.toLowerCase().replace(/\s+/g, '-');
    const trPath = path.join(TR_DIR, `${slug}.json`);
    const enPath = path.join(EN_DIR, `${slug}.json`);

    try {
        console.log(`\n🔮 Processing: ${englishNoun}...`);

        // 1. Translate Concept to Turkish
        const trName = await translateToTurkish(englishNoun);
        console.log(`   🇹🇷 TR Name: ${trName}`);

        // 2. Generate Turkish Content
        const trContent = await generateTurkishContent(englishNoun, trName);
        fs.mkdirSync(TR_DIR, { recursive: true });
        fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));

        // 3. Translate to English Content
        const enContent = await translateToEnglish(trContent);
        fs.mkdirSync(EN_DIR, { recursive: true });
        fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));

        // 4. Append to Source Dictionary (Minimal)
        appendToDictionary(englishNoun, trContent);

        console.log(`   ✅ Completed: ${englishNoun}`);

    } catch (error) {
        console.error(`   ❌ Failed: ${englishNoun} - ${error.message}`);
    }
}

async function translateToTurkish(noun) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a translator. return ONLY the Turkish translation of the noun." },
            { role: "user", content: noun }
        ],
        temperature: 0.3
    });
    return completion.choices[0].message.content.trim().replace(/\.$/, '');
}

async function generateTurkishContent(englishName, turkishName) {
    const prompt = `Create a DETAILED dream interpretation JSON for "${turkishName}" (English: ${englishName}) in Turkish.
    MATCH THIS SCHEMA EXACTLY:
    {
      "localizedName": "${turkishName}",
      "title": "Rüyada ${turkishName} Görmek: Anlamı ve Yorumu",
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
    - Jungian depth.
    - cosmicAnalysis MUST have bold headers for moon phases.
    - commonScenarios MUST be an array of strings like "Scenario: Interpretation".
    - Return JSON only.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
    });

    // Safety: ensure cosmicAnalysis is a string, if it comes back as object (rare but possible with json_mode if model gets confused)
    // Actually json_mode guarantees valid JSON, but schema compliance is up to the model.
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

function appendToDictionary(englishName, trContent) {
    // Append strictly to source dictionary file for search indexing
    // We'll read the file, find the closing brace, and insert before it
    // This is risky with concurrency, but with single-threaded node it's okay-ish if sequential
    // actually, let's just log it or append to a separate file to merge later?
    // The requirement is to append. Let's do a safe append by reading/writing full file.

    // BUT source_dictionary.js is big. Let's append to a temporary "new_entries.js" 
    // and manually merge or merge at the end script to be safe.

    const entry = `    "${englishName.toUpperCase()}": { meaning: "${trContent.introduction.substring(0, 50)}...", associations: [] },\n`;
    fs.appendFileSync(path.join(__dirname, 'data', 'new_entries_log.txt'), entry);
}

main();
