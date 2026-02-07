const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
// Manual .env loading
try {
    const envPath = path.join(__dirname, '../.env.local');
    const envContent = require('fs').readFileSync(envPath, 'utf-8');
    const match = envContent.match(/OPENAI_API_KEY=(sk-proj-[a-zA-Z0-9\-_]+)/);
    if (match) {
        process.env.OPENAI_API_KEY = match[1];
    }
} catch (e) { console.error("Could not read .env.local manually"); }

const apiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : null;

if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY is missing via .env.local');
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

const TR_DIR = path.join(__dirname, '../content/tr/meanings');
const EN_DIR = path.join(__dirname, '../content/en/meanings');

async function enrichSymbol(filename) {
    const trPath = path.join(TR_DIR, filename);
    const enPath = path.join(EN_DIR, filename);

    try {
        // 1. Read Turkish Content
        const trRaw = await fs.readFile(trPath, 'utf-8');
        const trContent = JSON.parse(trRaw);

        console.log(`\n🔮 Processing: ${trContent.localizedName} (${filename})`);

        // 2. Generate 4-Phase Cosmic Analysis (TR)
        const analysisPrompt = `
        You are an expert dream interpreter specializing in Jungian psychology and astrology.
        
        TASK:
        Write a "cosmicAnalysis" for the dream symbol: "${trContent.localizedName}".
        The analysis MUST cover 4 specific Moon Phases.
        
        CONTEXT:
        Symbol Meaning: "${trContent.introduction}"
        Symbolism: "${trContent.symbolism}"
        
        FORMAT:
        Return ONLY the text for the "cosmicAnalysis" field. 
        Structure it exactly like this (in Turkish):
        
        "Bu rüya, Ay'ın evrelerine göre 4 farklı kozmik mesaj taşır:
        
        **🌑 Yeni Ay:** [Analysis for New Moon - Focus on new beginnings related to the symbol]
        
        **🌓 Büyüyen Ay:** [Analysis for Waxing Moon - Focus on growth/action related to the symbol]
        
        **🌕 Dolunay:** [Analysis for Full Moon - Focus on culmination/illumination related to the symbol]
        
        **🌗 Küçülen Ay:** [Analysis for Waning Moon - Focus on release/letting go related to the symbol]"
        
        Keep it mystical but grounded in psychology. Max 2-3 sentences per phase.
        `;

        const analysisCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: analysisPrompt }],
            temperature: 0.7,
        });

        const newCosmicAnalysis = analysisCompletion.choices[0].message.content.trim();
        trContent.cosmicAnalysis = newCosmicAnalysis;

        // 3. Save Updated TR File
        await fs.writeFile(trPath, JSON.stringify(trContent, null, 2));
        console.log(`   ✅ Updated TR: ${filename}`);

        // 4. Translate to English (Full File)
        const translationPrompt = `
        Translate this JSON to English. 
        Keep the structure IDENTICAL.
        "localizedName" must be the English equivalent.
        "cosmicAnalysis" keys (Yeni Ay, etc.) should be translated to "New Moon", "Waxing Moon", "Full Moon", "Waning Moon".
        
        JSON:
        ${JSON.stringify(trContent)}
        `;

        const transCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a translator. Output valid JSON only." },
                { role: "user", content: translationPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
        });

        const enContent = JSON.parse(transCompletion.choices[0].message.content);

        // 5. Save EN File
        await fs.mkdir(EN_DIR, { recursive: true });
        await fs.writeFile(enPath, JSON.stringify(enContent, null, 2));
        console.log(`   ✨ Created EN: ${filename}`);

    } catch (error) {
        console.error(`   ❌ Failed: ${filename} - ${error.message}`);
    }
}

async function main() {
    const args = process.argv.slice(2);

    // Single File Mode
    if (args.length > 0) {
        let filename = args[0];
        if (!filename.endsWith('.json')) filename += '.json';
        await enrichSymbol(filename);
    }
    // Batch Mode
    else {
        const files = await fs.readdir(TR_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));
        console.log(`🚀 Starting Bulk Enrichment for ${jsonFiles.length} files...`);

        // Process in chunks to be safe (e.g., 5 at a time)
        const CHUNK_SIZE = 5;
        for (let i = 0; i < jsonFiles.length; i += CHUNK_SIZE) {
            const chunk = jsonFiles.slice(i, i + CHUNK_SIZE);
            await Promise.all(chunk.map(f => enrichSymbol(f)));
            console.log(`   --- Batch ${i + 1} to ${Math.min(i + CHUNK_SIZE, jsonFiles.length)} completed ---`);
        }
    }
}

main();
