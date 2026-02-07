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

const TARGET_SYMBOLS = [
    { name: 'avocado', localizedName: 'Avokado' },
    { name: 'bamboo', localizedName: 'Bambu' },
    { name: 'hammock', localizedName: 'Hamak' },
    { name: 'fig', localizedName: 'İncir' },
    { name: 'juggler', localizedName: 'Jonglör' },
    { name: 'lavender', localizedName: 'Lavanta' },
    { name: 'mushroom', localizedName: 'Mantar' },
    { name: 'pomegranate', localizedName: 'Nar' },
    { name: 'orchid', localizedName: 'Orkide' },
    { name: 'lipstick', localizedName: 'Ruj' }
];

async function generateSymbol(symbol) {
    const filePath = path.join(TR_DIR, `${symbol.name}.json`);

    console.log(`\n✨ Generating: ${symbol.localizedName} (${symbol.name})...`);

    const prompt = `Create a DETAILED, DEEP, and HIGH-QUALITY dream interpretation JSON for the symbol "${symbol.localizedName}" (English: ${symbol.name}) in Turkish.
    
    Reference Style: The content must be as rich and psychological (Jungian) as the "Dog" symbol interpretation.
    
    Structure MUST match this EXACT schema:
    {
      "localizedName": "${symbol.localizedName}",
      "title": "Rüyada [Sembol] Görmek: Anlamı ve Yorumu",
      "seoDescription": "...",
      "introduction": "... (Deep philosophical intro, mentioning history/archetypes, ~60-80 words)",
      "symbolism": "... (3-4 paragraphs. Incorporate Jungian archetypes, psychological depth, and specific emotional resonances. Use '\\n\\n' for paragraph breaks. Total ~200 words)",
      "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
      "commonScenarios": [
        "Scenario 1... (Format: 'Scenario Name: Interpretation')",
        "Scenario 2...",
        "Scenario 3...",
        "Scenario 4...",
        "Scenario 5...",
        "Scenario 6..."
      ],
      "cta": "..."
    }

    CRITICAL INSTRUCTIONS:
    1. **Cosmic Analysis Format:** You MUST use the exact bold headers and emojis shown above for the 4 moon phases. The content for each phase should be a substantial paragraph connecting the moon phase energy to the symbol.
       - **🌑 Yeni Ay:** (New Beginnings)
       - **🌓 Büyüyen Ay:** (Growth/Action)
       - **🌕 Dolunay:** (Illumination/Climax)
       - **🌗 Küçülen Ay:** (Release/Reflection)
    
    2. **Content Depth:** 
       - Do NOT be generic. Use words like "arketip", "bilinçdışı", "tezahür", "içsel rezonans".
       - The 'introduction' should hook the reader with a profound statement about dreams.
       - 'symbolism' must explore dualities (e.g., Avocado: hard shell vs soft inside = protection vs vulnerability).

    3. **Common Scenarios:**
       - return an Array of STRINGS.
       - Each string must follow the format: "Scenario Name: detailed interpretation...".
       - Example: "Rüyada çürük avokado görmek: Bu rüya, kaçırılmış fırsatları..."
    
    Return ONLY the valid JSON.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        let content = completion.choices[0].message.content.trim();

        // Clean up markdown code blocks if present
        if (content.startsWith('```json')) {
            content = content.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (content.startsWith('```')) {
            content = content.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        const parsedContent = JSON.parse(content);

        // Verify structure roughly
        if (!parsedContent.symbolism || !parsedContent.cosmicAnalysis) {
            throw new Error("Invalid structure returned");
        }

        await fs.writeFile(filePath, JSON.stringify(parsedContent, null, 2));
        console.log(`   ✅ Created: ${filePath}`);
        return true;

    } catch (error) {
        console.error(`   ❌ Failed: ${symbol.name} - ${error.message}`);
        return false;
    }
}

async function main() {
    console.log(`🚀 Starting generation of 10 new symbols...`);

    for (const symbol of TARGET_SYMBOLS) {
        await generateSymbol(symbol);
    }

    console.log(`\n🎉 All done!`);
}

main();
