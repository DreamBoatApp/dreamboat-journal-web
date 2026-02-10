/**
 * Generate 5 symbols with GPT-4o and 5 with GPT-4o-mini for quality comparison.
 * Outputs to content/tr/meanings/ and content/en/meanings/ 
 * Also saves a side-by-side comparison report.
 */

const fs = require('fs');
const path = require('path');

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
if (!apiKey) {
    console.error('❌ OPENAI_API_KEY not found in .env.local');
    process.exit(1);
}

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

// 5 symbols for GPT-4o, 5 for GPT-4o-mini
// Using well-known dream symbols for fair comparison
const GPT4O_SYMBOLS = ['POMEGRANATE', 'BASILISK', 'CRUCIBLE', 'LAVENDER', 'LADYBUG'];
const GPT4O_MINI_SYMBOLS = ['BALLOON', 'BRAIN', 'FORK', 'PAN', 'CABRIOLET'];

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const EN_DIR = path.join(__dirname, '..', 'content', 'en', 'meanings');
const REPORT_PATH = path.join(__dirname, 'model_comparison_report.md');

async function translateToTurkish(noun, model) {
    const completion = await openai.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: "You are a translator. Return ONLY the Turkish translation of the given English noun. No punctuation, no explanation." },
            { role: "user", content: noun }
        ],
        temperature: 0.3
    });
    return completion.choices[0].message.content.trim().replace(/\.$/, '');
}

async function generateTurkishContent(englishName, turkishName, model) {
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
    - commonScenarios MUST be an array of 4-5 strings, each starting with the scenario followed by interpretation.
    - introduction and symbolism should each be 150-250 words.
    - Return ONLY valid JSON.`;

    const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
    });

    const usage = completion.usage;
    const content = JSON.parse(completion.choices[0].message.content);
    return { content, usage };
}

async function translateToEnglish(trContent, model) {
    const prompt = `Translate this Turkish dream interpretation JSON to English. Keep structure identical.
    localizedName = English name of the symbol.
    title format = "Seeing [Symbol] in a Dream: Meaning and Interpretation"
    cosmicAnalysis moon phase headers = **🌑 New Moon:** / **🌓 Waxing Moon:** / **🌕 Full Moon:** / **🌗 Waning Moon:**
    JSON: ${JSON.stringify(trContent)}`;

    const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
}

async function processSymbol(englishNoun, model) {
    const slug = englishNoun.toLowerCase().replace(/\s+/g, '-');
    const trPath = path.join(TR_DIR, `${slug}.json`);
    const enPath = path.join(EN_DIR, `${slug}.json`);

    console.log(`\n🔮 [${model}] Processing: ${englishNoun}...`);

    // 1. Translate to Turkish
    const trName = await translateToTurkish(englishNoun, model);
    console.log(`   🇹🇷 TR Name: ${trName}`);

    // 2. Generate Turkish content
    const startTime = Date.now();
    const { content: trContent, usage } = await generateTurkishContent(englishNoun, trName, model);
    const genTime = Date.now() - startTime;
    console.log(`   ⏱️ Generation: ${genTime}ms | Tokens: ${usage.prompt_tokens}→${usage.completion_tokens} (total: ${usage.total_tokens})`);

    // 3. Save TR content
    fs.mkdirSync(TR_DIR, { recursive: true });
    fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));

    // 4. Translate to English (use same model for fair comparison)
    const enContent = await translateToEnglish(trContent, model);
    fs.mkdirSync(EN_DIR, { recursive: true });
    fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));

    console.log(`   ✅ Completed: ${englishNoun}`);

    return {
        symbol: englishNoun,
        model,
        trName,
        genTimeMs: genTime,
        tokens: usage,
        introLength: (trContent.introduction || '').length,
        symbolismLength: (trContent.symbolism || '').length,
        scenarioCount: (trContent.commonScenarios || []).length,
        trContent,
    };
}

async function main() {
    console.log('=== GPT-4o vs GPT-4o-mini Content Generation Comparison ===\n');

    const results = [];

    // Process GPT-4o symbols
    console.log('\n--- GPT-4o (5 symbols) ---');
    for (const sym of GPT4O_SYMBOLS) {
        try {
            const result = await processSymbol(sym, 'gpt-4o');
            results.push(result);
        } catch (err) {
            console.error(`   ❌ Failed: ${sym} - ${err.message}`);
        }
    }

    // Process GPT-4o-mini symbols
    console.log('\n--- GPT-4o-mini (5 symbols) ---');
    for (const sym of GPT4O_MINI_SYMBOLS) {
        try {
            const result = await processSymbol(sym, 'gpt-4o-mini');
            results.push(result);
        } catch (err) {
            console.error(`   ❌ Failed: ${sym} - ${err.message}`);
        }
    }

    // Generate comparison report
    let report = '# GPT-4o vs GPT-4o-mini Content Comparison\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    // Stats table
    report += '## Stats\n\n';
    report += '| Symbol | Model | Time (ms) | Tokens | Intro Length | Symbolism Length | Scenarios |\n';
    report += '|--------|-------|-----------|--------|-------------|-----------------|----------|\n';
    for (const r of results) {
        report += `| ${r.symbol} | ${r.model} | ${r.genTimeMs} | ${r.tokens.total_tokens} | ${r.introLength} | ${r.symbolismLength} | ${r.scenarioCount} |\n`;
    }

    // Average stats per model
    const gpt4oResults = results.filter(r => r.model === 'gpt-4o');
    const miniResults = results.filter(r => r.model === 'gpt-4o-mini');

    const avg = (arr, key) => arr.length ? Math.round(arr.reduce((s, r) => s + r[key], 0) / arr.length) : 0;

    report += '\n## Averages\n\n';
    report += '| Model | Avg Time (ms) | Avg Tokens | Avg Intro Length | Avg Symbolism Length | Avg Scenarios |\n';
    report += '|-------|---------------|------------|-----------------|---------------------|---------------|\n';
    report += `| gpt-4o | ${avg(gpt4oResults, 'genTimeMs')} | ${avg(gpt4oResults, 'tokens')} | ${avg(gpt4oResults, 'introLength')} | ${avg(gpt4oResults, 'symbolismLength')} | ${avg(gpt4oResults, 'scenarioCount')} |\n`;
    report += `| gpt-4o-mini | ${avg(miniResults, 'genTimeMs')} | ${avg(miniResults, 'tokens')} | ${avg(miniResults, 'introLength')} | ${avg(miniResults, 'symbolismLength')} | ${avg(miniResults, 'scenarioCount')} |\n`;

    // Sample content comparison
    report += '\n## Sample Content (Introduction)\n\n';
    for (const r of results) {
        report += `### ${r.symbol} (${r.model})\n`;
        report += `> ${(r.trContent.introduction || '').substring(0, 300)}...\n\n`;
    }

    fs.writeFileSync(REPORT_PATH, report);
    console.log(`\n📊 Report saved to: ${REPORT_PATH}`);
}

main().catch(err => console.error('Fatal:', err));
