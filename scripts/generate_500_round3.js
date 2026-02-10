/**
 * Quick round 3: fill remaining ~40 symbols to reach 500.
 * Very specific niche categories to avoid existing overlap.
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

const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
const batchFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), 'utf-8'));
batchFile.forEach(s => existingKeys.add(s.toUpperCase()));
console.log('Existing + R1+R2:', existingKeys.size);

const categories = [
    { name: "Böcek & Zararlı", examples: "Sinek, karasinek, sivrisinek, güve, karınca, örümcek, kene, pire, bit", count: 20 },
    { name: "Tatlı & Şekerleme", examples: "Çikolata, dondurma, lokum, baklava, helva, şeker, karamel, puding", count: 20 },
    { name: "Eğitim & Okul", examples: "Sınav, diploma, ödev, tahta, tebeşir, defter, silgi, cetvel, okul", count: 20 }
];

async function generateCategorySymbols(category) {
    const prompt = `Generate EXACTLY ${category.count} dream symbols for "${category.name}".
Examples: ${category.examples}
RULES: Each symbol SINGLE ENGLISH WORD (uppercase). Turkish translation also ONE WORD. No duplicates.
OUTPUT: { "symbols": [{ "en": "FLY", "tr": "Sinek" }] }
Return ONLY valid JSON.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        response_format: { type: 'json_object' }
    });
    return (JSON.parse(completion.choices[0].message.content)).symbols || [];
}

async function main() {
    const allNew = [];
    for (const cat of categories) {
        console.log(`Generating: ${cat.name}...`);
        const symbols = await generateCategorySymbols(cat);
        const filtered = symbols.filter(s => {
            const en = s.en.toUpperCase().trim();
            if (existingKeys.has(en) || en.includes(' ') || en.includes('-') || s.tr.includes(' ')) return false;
            existingKeys.add(en);
            return true;
        });
        allNew.push({ category: cat.name, symbols: filtered });
        console.log(`  ✅ Kept ${filtered.length}/${symbols.length}`);
    }

    const r3Total = allNew.reduce((s, c) => s + c.symbols.length, 0);

    // Merge with existing
    const existingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_500.json'), 'utf-8'));
    const merged = [...existingData, ...allNew];
    const grandTotal = merged.reduce((s, c) => s + c.symbols.length, 0);

    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_500.json'), JSON.stringify(merged, null, 2));

    const flatList = merged.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), JSON.stringify(flatList, null, 2));

    console.log(`\nRound 3: +${r3Total} | GRAND TOTAL: ${grandTotal} new symbols`);
}

main().catch(console.error);
