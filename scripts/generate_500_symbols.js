/**
 * Generate 500 new dream symbols using GPT-4o-mini.
 * - Categorized by the user's example categories
 * - Single-word only in both EN and TR
 * - No duplicates with existing dictionary
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

// Load existing symbols
const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
console.log('Existing symbols:', existingKeys.size);

const categories = [
    {
        name: "Mutfak & Yiyecek-İçecek",
        examples: "Tencere, tabak, bıçak, yemek, çay, kahve, tuz, biber, baharat, hamburger, pizza, kupa, ekmek",
        count: 45
    },
    {
        name: "Sağlık & Vücut",
        examples: "Ateşlenmek(fever), grip, covid, ameliyat(surgery), kalp, dalak, böbrek, kan, hastalık",
        count: 40
    },
    {
        name: "Giyim & Aksesuar",
        examples: "Terlik, gömlek, şort, pantolon, bluz, elbise, parfüm, damatlık(tuxedo)",
        count: 35
    },
    {
        name: "Silah & Savaş",
        examples: "Ok, yay, kılıç, katana, mancınık(catapult), kalkan(shield)",
        count: 30
    },
    {
        name: "Mobilya & Ev Eşyası",
        examples: "Masa, sehpa(table), koltuk, çadır(tent), saat, televizyon, halı, kilim, yorgan, kalorifer(radiator)",
        count: 40
    },
    {
        name: "Müzik Aletleri",
        examples: "Keman, gitar, bateri, davul, tokmak(mallet)",
        count: 25
    },
    {
        name: "Alet & Donanım",
        examples: "Çivi, vida, çekiç, iğne, süpürge, ütü, elektrik, kablo, şarj, pil",
        count: 35
    },
    {
        name: "Duygu & Durum",
        examples: "Ses, koku, korku, sevinç, öfke, hüzün, utanç, kaygı",
        count: 30
    },
    {
        name: "Doğa & Hava Durumu",
        examples: "Dolu(hail), buz, çığ(avalanche), volkan, deprem, kasırga, sel, kuraklık",
        count: 35
    },
    {
        name: "Taşıtlar & Ulaşım",
        examples: "Otobüs(bus), kamyon(truck), tramvay(tram), feribot(ferry), helikopter",
        count: 30
    },
    {
        name: "Meslekler & Kişiler",
        examples: "Doktor, hemşire, asker, polis, öğretmen, aşçı(chef), kasap(butcher)",
        count: 30
    },
    {
        name: "Spor & Oyun",
        examples: "Futbol(soccer), basketbol(basketball), tenis, boks(boxing), satranç(chess), dama(checkers)",
        count: 25
    },
    {
        name: "Din & Maneviyat",
        examples: "Cami(mosque), kilise(church), minare(minaret), haç(cross), tespih(rosary), dua(prayer)",
        count: 25
    },
    {
        name: "Teknoloji & Modern Yaşam",
        examples: "Bilgisayar(computer), tablet, drone, robot, algoritma, wifi, şifre(password)",
        count: 30
    },
    {
        name: "Tören & Kutlama",
        examples: "Düğün(wedding), sünnet(circumcision), cenaze(funeral), mezuniyet(graduation)",
        count: 20
    },
    {
        name: "Kimyasal & Madde",
        examples: "Deterjan, buhar(steam), boya(paint/dye), kazan(boiler/cauldron), asit(acid), zehir(poison)",
        count: 25
    }
];

const totalRequested = categories.reduce((s, c) => s + c.count, 0);
console.log('Total requested:', totalRequested);

async function generateCategorySymbols(category) {
    const prompt = `Generate EXACTLY ${category.count} dream symbols for the category "${category.name}".

EXAMPLES from this category: ${category.examples}

RULES:
1. Each symbol must be a SINGLE ENGLISH WORD (no spaces, no hyphens)
2. The Turkish translation must ALSO be a single word. If the natural translation is multi-word, find a single-word synonym.
3. Symbols should be CONCRETE objects, beings, places, or experiences commonly seen in dreams.
4. Do NOT include any of these existing symbols: They are already in the database.
5. Focus on everyday, culturally universal items that appear in dreams.

EXISTING SYMBOLS TO AVOID (sample): ${Array.from(existingKeys).slice(0, 200).join(', ')}

OUTPUT FORMAT (JSON):
{
  "symbols": [
    { "en": "SAUCEPAN", "tr": "Tencere" },
    { "en": "PLATE", "tr": "Tabak" }
  ]
}

Return ONLY valid JSON. All English names UPPERCASE. All Turkish names Title Case.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
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

            // Filter out duplicates and multi-word entries
            const filtered = symbols.filter(s => {
                const enClean = s.en.toUpperCase().trim();
                if (existingKeys.has(enClean)) return false; // duplicate
                if (enClean.includes(' ') || enClean.includes('-')) return false; // multi-word EN
                if (s.tr.includes(' ')) return false; // multi-word TR
                return true;
            });

            // Add to existing set to prevent inter-category duplicates
            filtered.forEach(s => existingKeys.add(s.en.toUpperCase()));

            allSymbols.push({ category: cat.name, symbols: filtered });
            console.log(`  ✅ Got ${symbols.length}, kept ${filtered.length} (filtered ${symbols.length - filtered.length} dupes/multi-word)`);
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    // Summary
    const total = allSymbols.reduce((s, c) => s + c.symbols.length, 0);
    console.log(`\n=== TOTAL: ${total} new symbols ===\n`);

    // Save as JSON
    const outputPath = path.join(__dirname, 'data', 'new_symbols_500.json');
    fs.writeFileSync(outputPath, JSON.stringify(allSymbols, null, 2));
    console.log('Saved to:', outputPath);

    // Also save flat list for content generation
    const flatList = allSymbols.flatMap(c => c.symbols.map(s => s.en));
    const flatPath = path.join(__dirname, 'data', 'new_symbols_batch.json');
    fs.writeFileSync(flatPath, JSON.stringify(flatList, null, 2));
    console.log('Flat list saved to:', flatPath);

    // Print summary table
    console.log('\n| Category | Count |');
    console.log('|----------|-------|');
    for (const cat of allSymbols) {
        console.log(`| ${cat.category} | ${cat.symbols.length} |`);
    }
}

main().catch(err => console.error('Fatal:', err));
