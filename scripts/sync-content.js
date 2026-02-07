const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config({ path: '.env.local' });

// Initialize OpenAI
// Requires OPENAI_API_KEY in .env.local or environment
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY is missing.');
    console.error('Please create a .env.local file in the root directory with:');
    console.error('OPENAI_API_KEY=your_api_key_here');
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

async function translateContent(trContent) {
    const prompt = `
    You are a professional dream interpreter and translator.
    Translate the following content from Turkish to English.
    
    RULES:
    1. Keep the JSON structure IDENTICAL. Do not add or remove keys.
    2. Translate "localizedName", "title", "seoDescription", "introduction", "symbolism", "cosmicAnalysis", "commonScenarios" (array), and "cta".
    3. The translation should be culturally adapted for an English-speaking audience interested in Jungian psychology and spirituality.
    4. "localizedName" should be the English equivalent (e.g., "Araba" -> "Car").
    5. Output ONLY valid JSON.
    
    INPUT JSON:
    ${JSON.stringify(trContent)}
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that translates JSON content." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("Translation error:", error);
        return null;
    }
}

async function syncContent() {
    try {
        // Ensure directories exist
        await fs.mkdir(EN_DIR, { recursive: true });

        // Read TR directory
        const files = await fs.readdir(TR_DIR);

        console.log(`📂 Found ${files.length} files in Turkish content.`);

        // Loop through files
        for (const file of files) {
            if (!file.endsWith('.json')) continue;

            const trPath = path.join(TR_DIR, file);
            const enPath = path.join(EN_DIR, file);

            // Check if EN file exists
            try {
                await fs.access(enPath);
                // Exists - skip (or optional: check modified time to update)
                // console.log(`✅ [SKIP] ${file} already exists.`);
                continue;
            } catch {
                // Not found - Translate
                console.log(`Example: Translating ${file}...`);

                const trContentRaw = await fs.readFile(trPath, 'utf-8');
                const trContent = JSON.parse(trContentRaw);

                const enContent = await translateContent(trContent);

                if (enContent) {
                    await fs.writeFile(enPath, JSON.stringify(enContent, null, 2));
                    console.log(`✨ [CREATED] ${file} (English)`);
                } else {
                    console.error(`❌ [FAILED] Could not translate ${file}`);
                }
            }
        }

        console.log("🎉 Synchronization complete!");

    } catch (error) {
        console.error("Sync error:", error);
    }
}

const args = process.argv.slice(2);
if (args.length > 0) {
    const filename = args[0].endsWith('.json') ? args[0] : `${args[0]}.json`;
    console.log(`Running sync for specific file: ${filename}`);

    // Specific file sync
    (async () => {
        const trPath = path.join(TR_DIR, filename);
        const enPath = path.join(EN_DIR, filename);

        try {
            await fs.access(trPath);
            // TR exists, proceed
            const trContentRaw = await fs.readFile(trPath, 'utf-8');
            const trContent = JSON.parse(trContentRaw);

            console.log(`Translating ${filename}...`);
            const enContent = await translateContent(trContent);

            if (enContent) {
                await fs.writeFile(enPath, JSON.stringify(enContent, null, 2));
                console.log(`✨ [CREATED] ${filename} (English)`);
                console.log("Preview:", JSON.stringify(enContent, null, 2));
            } else {
                console.error(`❌ [FAILED] Could not translate ${filename}`);
            }

        } catch (err) {
            console.error(`❌ Error: Source file ${filename} not found in Turkish content.`);
        }
    })();
} else {
    syncContent();
}
