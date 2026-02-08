const fs = require('fs');
const fsp = require('fs').promises; // Use fs.promises for async file ops
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
const openai = new OpenAI({
    apiKey: getEnv('OPENAI_API_KEY')
});

const INPUT_FILE = path.join(__dirname, 'data', 'batch_scenarios_list.json');
const CONTENT_DIR_TR = path.join(__dirname, '../content/tr/meanings');
const CONTENT_DIR_EN = path.join(__dirname, '../content/en/meanings');

// Helper to ensure directory exists
async function ensureDir(dir) {
    try {
        await fsp.access(dir);
    } catch {
        await fsp.mkdir(dir, { recursive: true });
    }
}

async function generateContentForScenario(item, maxRetries = 3) {
    const { tr, en, key } = item;
    const slug = en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check if files exist to avoid cost
    const fileTr = path.join(CONTENT_DIR_TR, `${slug}.json`);
    const fileEn = path.join(CONTENT_DIR_EN, `${slug}.json`);

    try {
        await fsp.access(fileTr);
        await fsp.access(fileEn);
        console.log(`Skipping existing: ${slug}`);
        return;
    } catch (e) {
        // Proceed if either missing
    }

    console.log(`Generating content for: ${en} (${tr}) -> ${slug}`);

    const prompt = `
    Create a bilingual Dream Dictionary entry for a SPECIFIC DREAM SCENARIO.
    
    Scenario (English): "${en}"
    Scenario (Turkish): "${tr}"
    Slug: "${slug}"
    
    This is NOT just a generic symbol. It is a specific SITUATION. 
    The interpretation must focus on the *action* or *feeling* described.

    Return a JSON object with this EXACT schema:
    {
      "tr": {
        "slug": "${slug}",
        "localizedName": "${tr}",
        "title": "Rüyada ${tr}",
        "description": "Short summary (1-2 sentences) of what this specific scenario means psychologically.",
        "meanings": [
          { "title": "Main Interpretation", "description": "Detailed psychological meaning (Freud/Jung)." },
          { "title": "Subconscious Warning", "description": "What is the subconscious trying to say?" },
          { "title": "Life Context", "description": "How this relates to daily life stress or anxiety." }
        ],
        "symbolism": {
          "concepts": ["Tag1", "Tag2"],
          "elements": ["Element1", "Element2"]
        },
        "interpretation": "A direct, personal interpretation paragraph.",
        "context": {
            "positive": "Positive aspect",
            "negative": "Negative aspect"
        },
        "keywords": ["${tr}", "${en}", "variation1", "variation2"]
      },
      "en": {
        "slug": "${slug}",
        "localizedName": "${en}",
        "title": "Dreaming of ${en}",
        "description": "Short summary (1-2 sentences) of what this specific scenario means psychologically.",
        "meanings": [
          { "title": "Main Interpretation", "description": "Detailed psychological meaning (Freud/Jung)." },
          { "title": "Subconscious Warning", "description": "What is the subconscious trying to say?" },
          { "title": "Life Context", "description": "How this relates to daily life stress or anxiety." }
        ],
        "symbolism": {
          "concepts": ["Tag1", "Tag2"],
          "elements": ["Element1", "Element2"]
        },
        "interpretation": "A direct, personal interpretation paragraph.",
        "context": {
            "positive": "Positive aspect",
            "negative": "Negative aspect"
        },
        "keywords": ["${en}", "${tr}", "variation1", "variation2"]
      }
    }
    `;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            });

            const content = JSON.parse(completion.choices[0].message.content);

            // Write files
            await fsp.writeFile(fileTr, JSON.stringify(content.tr, null, 2));
            await fsp.writeFile(fileEn, JSON.stringify(content.en, null, 2));

            console.log(`✅ Generated: ${slug}`);
            return; // Success
        } catch (err) {
            console.error(`❌ Error generating ${slug} (Attempt ${i + 1}/${maxRetries}):`, err.message);
            if (i === maxRetries - 1) throw err;
            await new Promise(res => setTimeout(res, 2000));
        }
    }
}

async function runBatch() {
    await ensureDir(CONTENT_DIR_TR);
    await ensureDir(CONTENT_DIR_EN);

    const list = require(INPUT_FILE);
    console.log(`Found ${list.length} scenarios to process.`);

    // Process in chunks to avoid rate limits, but sequential is safer for now
    for (const item of list) {
        await generateContentForScenario(item);
    }

    console.log("Batch generation complete!");
}

runBatch();
