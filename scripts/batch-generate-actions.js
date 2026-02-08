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

const openai = new OpenAI({
    apiKey: getEnv('OPENAI_API_KEY')
});

const LIST_FILE = path.join(__dirname, 'data', 'batch_actions_list.txt');
const LOG_FILE = path.join(__dirname, 'data', 'actions_symbols_log.txt');

async function generateContent() {
    const fsp = require('fs').promises;
    const symbols = JSON.parse(await fsp.readFile(LIST_FILE, 'utf-8'));
    console.log(`Loaded ${symbols.length} symbols to process.`);

    for (const symbol of symbols) {
        const slug = symbol.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const trPath = path.join(__dirname, '../content/tr/meanings', `${slug}.json`);

        // Skip if exists
        try {
            await fsp.access(trPath);
            console.log(`Skipping ${symbol} (already exists)`);
            continue;
        } catch { }

        console.log(`Generating: ${symbol}...`);

        const prompt = `
        Create a Dream Dictionary entry for the symbol: "${symbol}" (Action, Event, or Human Situation).
        
        Output JSON with this structure:
        {
          "tr": {
            "localizedName": "Turkish Name (e.g. Tartışmak, Kovalanmak, Uçmak - use Verb or Gerund)",
            "title": "Rüyada [Turkish Name] Görmek: [Short Psychological/Action Theme]",
            "seoDescription": "Rüyada [Turkish Name] görmek ne anlama gelir? [Keywords] ve detaylı rüya tabiri.",
            "introduction": "Deep Jungian and psychological introduction about what this ACTION or SITUATION represents in the psyche (e.g. escaping = avoiding confrontation).",
            "symbolism": "Detailed symbolism (2 paragraphs). Contrast the action with the dreamer's waking life state.",
            "cosmicAnalysis": "Moon phase analysis (Valid Markdown):\n\n**🌑 Yeni Ay:** ...\n\n**🌓 Büyüyen Ay:** ...\n\n**🌕 Dolunay:** ...\n\n**🌗 Küçülen Ay:** ...",
            "commonScenarios": [
              "Scenario 1 interpretation...",
              "Scenario 2 interpretation...",
              "Scenario 3 interpretation..."
            ]
          },
          "en": {
            "localizedName": "${symbol}",
            "title": "Dreaming of [Symbol]: [Theme]",
            "seoDescription": "Meaning of dreaming about [Symbol]...",
            "introduction": "...",
            "symbolism": "...",
            "cosmicAnalysis": "...",
            "commonScenarios": ["..."]
          }
        }
        `;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            });

            const data = JSON.parse(completion.choices[0].message.content);

            // Write TR
            await fsp.writeFile(trPath, JSON.stringify(data.tr, null, 2));

            // Write EN
            const enPath = path.join(__dirname, '../content/en/meanings', `${slug}.json`);
            await fsp.writeFile(enPath, JSON.stringify(data.en, null, 2));

            // Log
            await fsp.appendFile(LOG_FILE, `${symbol}|${data.tr.localizedName}|${JSON.stringify({ meaning: "ACTION/SITUATION", associations: [] })}\n`);

        } catch (e) {
            console.error(`Error generating ${symbol}:`, e);
        }
    }
}

generateContent();
