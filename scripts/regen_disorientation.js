/**
 * Regenerate disorientation.json with correct schema using GPT-4o-mini
 */
const fs = require('fs');
const path = require('path');

function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) return match[1].trim();
    }
    return process.env[key] || null;
}

const apiKey = getEnv('OPENAI_API_KEY');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

async function generateContent(englishName, turkishName, model) {
    const prompt = `Create a DETAILED dream interpretation JSON for "${turkishName}" (English: ${englishName}) in Turkish.
    MATCH THIS SCHEMA EXACTLY:
    {
      "localizedName": "${turkishName}",
      "title": "Rüyada ${turkishName} Görmek: Anlamı ve Yorumu",
      "seoDescription": "One-line SEO description about seeing ${turkishName} in a dream, in Turkish",
      "introduction": "2-3 paragraph introduction about this symbol's significance in dreams, referencing Jung and cultural symbolism",
      "symbolism": "2-3 paragraph deep analysis of the symbol's Jungian meaning, shadow/anima aspects, and psychological depth",
      "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
      "commonScenarios": [
        "Scenario description: Detailed Jungian interpretation",
        "Another scenario: Detailed interpretation"
      ]
    }
    Rules:
    - Write in rich, literary Turkish with Jungian depth.
    - cosmicAnalysis MUST have bold headers for all 4 moon phases with emoji.
    - commonScenarios MUST be an array of 4-5 strings.
    - introduction and symbolism should each be 150-250 words.
    - Return ONLY valid JSON.`;

    const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
}

async function translateToEnglish(trContent, model) {
    const prompt = `Translate this Turkish dream interpretation JSON to English. Keep structure identical.
    localizedName = English name of the symbol.
    title format = "Seeing [Symbol] in a Dream: Meaning and Interpretation"
    cosmicAnalysis moon phase headers = **🌑 New Moon:** / **🌓 Waxing Moon:** / **🌕 Full Moon:** / **🌗 Waning Moon:**
    JSON: ${JSON.stringify(trContent)}`;

    const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
}

async function main() {
    const model = 'gpt-4o-mini';

    console.log('Regenerating disorientation.json...');

    // Generate TR
    const trContent = await generateContent('DISORIENTATION', 'Yön Kaybı', model);
    console.log('TR generated:', Object.keys(trContent).join(', '));

    const trPath = path.join(__dirname, '..', 'content', 'tr', 'meanings', 'disorientation.json');
    fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));
    console.log('✓ TR saved');

    // Generate EN
    const enContent = await translateToEnglish(trContent, model);
    console.log('EN generated:', Object.keys(enContent).join(', '));

    const enPath = path.join(__dirname, '..', 'content', 'en', 'meanings', 'disorientation.json');
    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));
    console.log('✓ EN saved');

    console.log('\n✅ disorientation.json regenerated successfully');
}

main().catch(err => console.error('Error:', err));
