/**
 * Second round: generate ~250 more symbols to reach 500 total.
 * Uses different/more specific categories to avoid overlap with round 1.
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

// Load existing + round 1 symbols
const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));

// Also load round 1 results
const round1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), 'utf-8'));
round1.forEach(s => existingKeys.add(s.toUpperCase()));
console.log('Existing + Round 1 total:', existingKeys.size);

const categories = [
    {
        name: "Sebze & Meyve",
        examples: "Domates, biber, soğan, patlıcan, kabak, portakal, elma, armut, üzüm, çilek",
        count: 40
    },
    {
        name: "Deniz & Su Yaşamı",
        examples: "Mercan, istakoz, karides, midye, istiridye, ahtapot, yengeç, yunus",
        count: 30
    },
    {
        name: "Takı & Süs",
        examples: "Yüzük, kolye, bilezik, küpe, broş, taç, madalya, rozet",
        count: 25
    },
    {
        name: "Bina & Yapı",
        examples: "Köşk, villa, kule, kubbe, sığınak, depo, ambar, hangar, bodrum",
        count: 30
    },
    {
        name: "Yiyecek & Hamur İşi",
        examples: "Börek, simit, pide, lahmacun, pasta, kurabiye, krep, waffle, makarna",
        count: 30
    },
    {
        name: "Bitki & Ağaç",
        examples: "Meşe, çınar, selvi, söğüt, kavak, çam, dut, incir, bambu",
        count: 30
    },
    {
        name: "Kumaş & Tekstil",
        examples: "İpek, kadife, denim, keten, yün, pamuk, saten, dantel",
        count: 20
    },
    {
        name: "Oyuncak & Çocukluk",
        examples: "Bebek, top, uçurtma, kaydırak, salıncak, lunapark, balon, legolar",
        count: 25
    },
    {
        name: "Antik & Tarihi",
        examples: "Gladyatör, şövalye, mızrak, kale, hendek, burç, ferman, papirüs",
        count: 25
    },
    {
        name: "İletişim & Medya",
        examples: "Gazete, dergi, mektup, zarf, telgraf, mikrofon, megafon, anten",
        count: 25
    },
    {
        name: "Finans & Ticaret",
        examples: "Borsa, fatura, çek, senet, kasa, para, altın, kredi, banka",
        count: 25
    },
    {
        name: "Coğrafya & Arazi",
        examples: "Vadi, yayla, bozkır, savan, bataklık, okyanus, kanyon, uçurum",
        count: 25
    }
];

const totalRequested = categories.reduce((s, c) => s + c.count, 0);
console.log('Round 2 requested:', totalRequested);

async function generateCategorySymbols(category) {
    const prompt = `Generate EXACTLY ${category.count} dream symbols for the category "${category.name}".

EXAMPLES from this category: ${category.examples}

RULES:
1. Each symbol must be a SINGLE ENGLISH WORD (no spaces, no hyphens). Max one word.
2. The Turkish translation must ALSO be a single word. If the natural translation is multi-word, find a single-word synonym or skip it.
3. Symbols should be CONCRETE objects, beings, places, or experiences commonly seen in dreams.
4. Focus on everyday items that people actually encounter in real life and might dream about.
5. Be creative! Think of items within the category that GPT wouldn't typically suggest.

OUTPUT FORMAT (JSON):
{
  "symbols": [
    { "en": "TOMATO", "tr": "Domates" },
    { "en": "ONION", "tr": "Soğan" }
  ]
}

Return ONLY valid JSON. All English names UPPERCASE. All Turkish names Title Case.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        response_format: { type: 'json_object' }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result.symbols || [];
}

async function main() {
    const allSymbols = [];

    for (const cat of categories) {
        console.log(`\nGenerating: ${cat.name} (${cat.count})...`);
        try {
            const symbols = await generateCategorySymbols(cat);

            const filtered = symbols.filter(s => {
                const enClean = s.en.toUpperCase().trim();
                if (existingKeys.has(enClean)) return false;
                if (enClean.includes(' ') || enClean.includes('-')) return false;
                if (s.tr.includes(' ')) return false;
                return true;
            });

            filtered.forEach(s => existingKeys.add(s.en.toUpperCase()));
            allSymbols.push({ category: cat.name, symbols: filtered });
            console.log(`  ✅ Got ${symbols.length}, kept ${filtered.length}`);
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    const r2Total = allSymbols.reduce((s, c) => s + c.symbols.length, 0);
    console.log(`\n=== ROUND 2 TOTAL: ${r2Total} new symbols ===`);

    // Merge with round 1
    const r1Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_500.json'), 'utf-8'));
    const mergedData = [...r1Data, ...allSymbols];
    const mergedTotal = mergedData.reduce((s, c) => s + c.symbols.length, 0);

    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_500.json'), JSON.stringify(mergedData, null, 2));

    // Update flat list
    const flatList = mergedData.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), JSON.stringify(flatList, null, 2));

    console.log(`\n=== GRAND TOTAL: ${mergedTotal} new symbols (Round1 + Round2) ===`);

    console.log('\n| Category | Count |');
    console.log('|----------|-------|');
    for (const cat of mergedData) {
        console.log(`| ${cat.category} | ${cat.symbols.length} |`);
    }
}

main().catch(err => console.error('Fatal:', err));
