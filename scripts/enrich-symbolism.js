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

async function enrichSymbolism(filename) {
    const trPath = path.join(TR_DIR, filename);
    const enPath = path.join(EN_DIR, filename);

    try {
        // 1. Read Turkish Content
        const trRaw = await fs.readFile(trPath, 'utf-8');
        const trContent = JSON.parse(trRaw);

        console.log(`\n📝 Processing: ${trContent.localizedName} (${filename})`);

        // 2. Generate Improved Symbolism (TR)
        const symbolismPrompt = `
        You are a dream psychology expert and skilled writer. 
        
        TASK:
        Rewrite the "symbolism" section for the dream symbol: "${trContent.localizedName}".
        
        CURRENT CONTENT (problematic - too many parentheticals, robotic):
        "${trContent.symbolism}"
        
        RULES:
        1. REMOVE all parenthetical explanations like "(kendini görme)", "(kim olduğun)" etc.
        2. Write in flowing, natural Turkish prose - like a wise dream interpreter speaking
        3. Keep the same concepts but express them as complete sentences
        4. Use metaphors and poetic language where appropriate
        5. Keep it 2-3 paragraphs, similar length to original
        6. DO NOT use bullet points or numbered lists
        7. Make it engaging and readable, not academic or clinical
        
        OUTPUT:
        Return ONLY the new Turkish text for the "symbolism" field. No quotes, no JSON wrapping.
        `;

        const symbolismCompletion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: symbolismPrompt }],
            temperature: 0.7,
        });

        const newSymbolism = symbolismCompletion.choices[0].message.content.trim();

        // Also improve introduction if it has parentheticals
        let newIntroduction = trContent.introduction;
        if (trContent.introduction && trContent.introduction.includes('(')) {
            const introPrompt = `
            Rewrite this dream interpretation introduction in natural flowing Turkish. 
            REMOVE all parenthetical explanations. Keep the same meaning but make it poetic and engaging.
            
            Original: "${trContent.introduction}"
            
            Return ONLY the improved Turkish text.
            `;

            const introCompletion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: introPrompt }],
                temperature: 0.7,
            });
            newIntroduction = introCompletion.choices[0].message.content.trim();
        }

        // Also improve commonScenarios
        let newScenarios = trContent.commonScenarios;
        if (trContent.commonScenarios && JSON.stringify(trContent.commonScenarios).includes('(')) {
            const scenariosPrompt = `
            Rewrite these dream scenarios in natural flowing Turkish.
            REMOVE all parenthetical explanations like "(kontrol kaybı)" or "(yeni başlangıç)".
            Keep each scenario as a complete, engaging sentence.
            
            Original scenarios:
            ${JSON.stringify(trContent.commonScenarios, null, 2)}
            
            Return as a JSON array of strings. Each string should be the improved scenario.
            `;

            const scenariosCompletion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a translator. Output valid JSON array only." },
                    { role: "user", content: scenariosPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.5,
            });

            try {
                const parsed = JSON.parse(scenariosCompletion.choices[0].message.content);
                newScenarios = parsed.scenarios || parsed.commonScenarios || Object.values(parsed)[0] || trContent.commonScenarios;
            } catch {
                // Keep original if parsing fails
            }
        }

        trContent.symbolism = newSymbolism;
        trContent.introduction = newIntroduction;
        trContent.commonScenarios = newScenarios;

        // 3. Save Updated TR File
        await fs.writeFile(trPath, JSON.stringify(trContent, null, 2));
        console.log(`   ✅ Updated TR: ${filename}`);

        // 4. Translate to English (Full File)
        const translationPrompt = `
        Translate this JSON to English. 
        Keep the structure IDENTICAL.
        "localizedName" must be the English equivalent of the dream symbol.
        Maintain the poetic, flowing style in the translation.
        
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
        await enrichSymbolism(filename);
    }
    // Batch Mode
    else {
        const files = await fs.readdir(TR_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));
        console.log(`🚀 Starting Symbolism Enrichment for ${jsonFiles.length} files...`);

        // Process in chunks
        const CHUNK_SIZE = 5;
        for (let i = 0; i < jsonFiles.length; i += CHUNK_SIZE) {
            const chunk = jsonFiles.slice(i, i + CHUNK_SIZE);
            await Promise.all(chunk.map(f => enrichSymbolism(f)));
            console.log(`   --- Batch ${i + 1} to ${Math.min(i + CHUNK_SIZE, jsonFiles.length)} completed ---`);
        }
    }
}

main();
