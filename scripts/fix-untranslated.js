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

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');

async function fixUntranslated() {
    const files = fs.readdirSync(TR_DIR);
    const suspicious = [];

    // 1. Identify Suspicious Files
    files.forEach(file => {
        if (!file.endsWith('.json')) return;
        try {
            const content = fs.readFileSync(path.join(TR_DIR, file), 'utf8');
            const json = JSON.parse(content);
            const name = json.localizedName;

            // Heuristic: If name matches slug (roughly), check if it's English
            const slug = file.replace('.json', '').replace(/-/g, ' ');

            // Explicit override for known issues
            if (['sewing.json', 'alarm-clock.json', 'toilet-paper.json', 'windmill.json'].includes(file)) {
                suspicious.push({ file, name, slug });
                return;
            }

            if (name.toLowerCase() === slug.toLowerCase()) {
                suspicious.push({ file, name, slug });
            }
        } catch (e) { }
    });

    console.log(`Found ${suspicious.length} potentially untranslated files.`);

    // 2. Process them
    for (const item of suspicious) {
        await processItem(item);
    }
}

async function processItem(item) {
    console.log(`Checking: ${item.name} (${item.file})...`);

    // Check if it is valid Turkish or needs translation
    // Check if it's already Turkish or needs translation
    const checkPrompt = `Task: specific analysis of the word/phrase "${item.name}".
    1. Is this phrase ALREADY in Turkish? (e.g. "Araba", "Koşmak", "Rüya").
    2. Or is it in English? (e.g. "Car", "Running", "Dream").

    OUTPUT RULES:
    - If it is ALREADY Turkish: return "VALID"
    - If it is English: return the Turkish translation (e.g. "Car" -> "Araba")
    - Return ONLY the string. Do not add explanations.`;

    try {
        const check = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: checkPrompt }],
            temperature: 0,
        });

        let result = check.choices[0].message.content.trim().replace(/['"]+/g, '');

        if (result === "VALID" || result.toUpperCase() === "VALID") {
            console.log(`  ✅ Valid Turkish. Skipping.`);
            return;
        }

        // Safety check for weird LLM responses
        if (result.toUpperCase() === "INVALID" || result.length > 50 || result.includes("I cannot")) {
            console.log(`  ⚠️ Ambiguous result for ${item.name}: "${result}". Skipping.`);
            return;
        }

        const turkishName = result;
        console.log(`  ❌ Detected English. Translating to: "${turkishName}"`);

        // Regenerate Content
        const newContent = await generateTurkishContent(item.name, turkishName);

        // Write back
        const filePath = path.join(TR_DIR, item.file);
        fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
        console.log(`  ✨ Fixed and Saved.`);

    } catch (e) {
        console.error(`  Error processing ${item.name}: ${e.message}`);
    }
}

async function generateTurkishContent(englishName, turkishName) {
    // Reuse the robust generation logic
    const prompt = `Create a DETAILED dream interpretation JSON for the symbol: "${turkishName}" (English: ${englishName}) in Turkish.
    
    MATCH THIS SCHEMA EXACTLY:
    {
      "localizedName": "${turkishName}",
      "title": "Rüyada ${turkishName} Görmek",
      "seoDescription": "Rüyada ${turkishName} görmek ne anlama gelir? ${turkishName} rüyasının psikolojik ve manevi yorumu.",
      "introduction": "...",
      "symbolism": "...",
      "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
      "commonScenarios": [
        "Scenario 1",
        "Scenario 2"
      ]
    }
    Rules:
    - Jungian depth. 
    - cosmicAnalysis MUST have bold headers for moon phases.
    - commonScenarios must be an array of strings.
    - IMPORTANT: Ensure the content is specifically about "${turkishName}". Do NOT use generic templates.
    - Return JSON only.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
}

fixUntranslated();
