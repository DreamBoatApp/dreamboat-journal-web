const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

function getEnv(key) {
    // Prioritize .env.local file content over process.env
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) {
            const val = match[1].trim();
            if (val) return val; // Basic value
        }
    }
    if (process.env[key]) return process.env[key];
    return null;
}

const apiKey = getEnv('OPENAI_API_KEY');

// Verify key (masked)
if (!apiKey) {
    console.error("ERROR: OPENAI_API_KEY not found in .env.local or process.env");
    process.exit(1);
} else {
    console.log(`API Key loaded: ${apiKey.substring(0, 5)}...`);
}

const MISSING_LIST_PATH = path.join(__dirname, 'data', 'missing_en_list.json');
const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

const openai = new OpenAI({ apiKey });

async function generateEnglish(slug) {
    const trPath = path.join(TR_DIR, `${slug}.json`);
    const enPath = path.join(EN_DIR, `${slug}.json`);

    if (!fs.existsSync(trPath)) {
        console.error(`TR source not found: ${slug}`);
        return;
    }

    const trContent = JSON.parse(fs.readFileSync(trPath, 'utf8'));

    const prompt = `
    You are an expert dream interpreter and translator.
    Translate and adapt the following Turkish dream meaning JSON to English.
    
    Rules:
    1. Maintain the JSON structure exactly.
    2. "localizedName": Translate the symbol name.
    3. "title": "Dreaming of [Symbol]: [Short Meaning]"
    4. "seoDescription": English SEO description (< 160 chars).
    5. "introduction": 2-3 sentences.
    6. "symbolism": 2 paragraphs (Jungian/Psychological).
    7. "cosmicAnalysis": Translate the 4 moon phases.
    8. "commonScenarios": Translate the list.
    9. "cta": "Explore your inner world with Dream Boat." (Standard)

    Turkish Source:
    ${JSON.stringify(trContent, null, 2)}
    
    Response MUST be valid JSON only.
    `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o",
            response_format: { type: "json_object" },
        });

        const enContent = JSON.parse(completion.choices[0].message.content);
        // Ensure slug matches
        enContent.slug = slug; // explicit? usually not in file but ok.

        fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
        console.log(`Generated EN for: ${slug}`);

    } catch (error) {
        console.error(`Error generating ${slug}:`, error.message);
    }
}

async function run() {
    const missingSlugs = JSON.parse(fs.readFileSync(MISSING_LIST_PATH, 'utf8'));
    console.log(`Generating ${missingSlugs.length} missing files...`);

    for (const slug of missingSlugs) {
        await generateEnglish(slug);
    }
    console.log("Done.");
}

run();
