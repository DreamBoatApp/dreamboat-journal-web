/**
 * Generate 500 human-concept dream symbols focused on:
 * İş, aile, ilişki, din, toplum, şehir, duygular, yaşam döngüsü vb.
 * All single-word in both TR and EN.
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

// Load ALL existing symbols (dictionary + previous batch)
const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
console.log('Existing symbols:', existingKeys.size);

const OUTPUT_FILE = path.join(__dirname, 'data', 'new_symbols_human.json');
const BATCH_FILE = path.join(__dirname, 'data', 'new_symbols_human_batch.json');

const categories = [
    {
        name: "Aile & Akrabalık",
        examples: "Anne, baba, kardeş, dede, nine, yeğen, kuzen, kayınvalide, gelin, damat, üvey, evlat, torun",
        count: 35
    },
    {
        name: "İlişki & Romantizm",
        examples: "Sevgili, nişanlı, flört, öpücük, sarılma, ayrılık, kavga, kıskançlık, sadakat, ihanet, tutku",
        count: 35
    },
    {
        name: "İş & Kariyer",
        examples: "Maaş, terfi, işten çıkarılma, mülakat, staj, emeklilik, toplantı, sunum, proje, müdür",
        count: 40
    },
    {
        name: "Eğitim & Bilgi",
        examples: "Sınav, öğretmen, ders, karne, okul, üniversite, mezuniyet, burs, tez, not",
        count: 30
    },
    {
        name: "Din & İnanç",
        examples: "Namaz, oruç, hac, zekat, cennet, cehennem, günah, sevap, melek, şeytan, peygamber",
        count: 35
    },
    {
        name: "Toplum & Sosyal Yapı",
        examples: "Mahkeme, ceza, hapis, kanun, seçim, devlet, vatandaş, göç, sınıf, eşitsizlik",
        count: 35
    },
    {
        name: "Şehir & Kent Yaşamı",
        examples: "Apartman, sokak, cadde, meydan, park, metro, köprü, trafik, gökdelen, mahalle",
        count: 30
    },
    {
        name: "Duygusal Durumlar",
        examples: "Umut, çaresizlik, minnettarlık, pişmanlık, nostalji, heyecan, endişe, hayal kırıklığı, huzur",
        count: 35
    },
    {
        name: "Yaşam Döngüsü & Geçiş",
        examples: "Doğum, ölüm, yaşlanma, ergenlik, reşit olma, evlilik, boşanma, taşınma, göç",
        count: 30
    },
    {
        name: "Sağlık & Psikoloji",
        examples: "Terapi, ilaç, bağımlılık, panik, fobia, travma, iyileşme, rehabilitasyon, anksiyete",
        count: 30
    },
    {
        name: "Ekonomi & Para",
        examples: "Zenginlik, yoksulluk, miras, vergi, kira, ipotek, iflas, tasarruf, yatırım",
        count: 30
    },
    {
        name: "Hukuk & Adalet",
        examples: "Hakim, avukat, tanık, jüri, ceza, beraat, suç, mahkumiyet, dava, dilekçe",
        count: 25
    },
    {
        name: "Savaş & Çatışma",
        examples: "Barış, ateşkes, isyan, devrim, direniş, işgal, kaçış, sığınak, mülteci",
        count: 25
    },
    {
        name: "İletişim & İlişki Durumları",
        examples: "Yalan, itiraf, sır, dedikodu, söz, yemin, vaat, özür, af, barışma",
        count: 30
    },
    {
        name: "Statü & Kimlik",
        examples: "Lider, köle, kral, dilenci, kahraman, kurban, yabancı, sürgün, mülteci, göçmen",
        count: 25
    },
    {
        name: "Gelenek & Kültür",
        examples: "Bayram, düğün, cenaze, sünnet, nişan, kına, lokma, sadaka, kurban, adet",
        count: 30
    }
];

const totalRequested = categories.reduce((s, c) => s + c.count, 0);
console.log('Total requested:', totalRequested);

async function generateCategorySymbols(category) {
    const prompt = `Generate EXACTLY ${category.count} dream symbols for "${category.name}" — focused on HUMAN experiences, social concepts, and abstract states that commonly appear in dreams.

EXAMPLES: ${category.examples}

CRITICAL RULES:
1. Each symbol must be a SINGLE ENGLISH WORD (no spaces, no hyphens). Maximum one word.
2. The Turkish translation must ALSO be a single word. If the natural translation is multi-word, find a single-word synonym or skip it entirely.
3. Focus on ABSTRACT CONCEPTS, SOCIAL ROLES, EMOTIONAL STATES, and LIFE EVENTS that humans commonly dream about.
4. These should be things that reflect inner psychological conflicts, social dynamics, and life transitions.
5. Do NOT include physical objects (those are already covered). Focus on human experiences and concepts.
6. AVOID these already-existing symbols: ${Array.from(existingKeys).filter(k => k.length <= 10).slice(0, 150).join(', ')}

OUTPUT FORMAT (JSON only):
{
  "symbols": [
    { "en": "DIVORCE", "tr": "Boşanma" },
    { "en": "PROMOTION", "tr": "Terfi" }
  ]
}

Return ONLY valid JSON. All English names UPPERCASE. All Turkish names Title Case.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.85,
        response_format: { type: 'json_object' }
    });

    return (JSON.parse(completion.choices[0].message.content)).symbols || [];
}

async function main() {
    const allSymbols = [];
    let grandTotal = 0;

    for (const cat of categories) {
        console.log(`\nGenerating: ${cat.name} (${cat.count})...`);
        try {
            const symbols = await generateCategorySymbols(cat);
            const filtered = symbols.filter(s => {
                const en = s.en.toUpperCase().trim();
                if (existingKeys.has(en)) return false;
                if (en.includes(' ') || en.includes('-')) return false;
                if (s.tr.includes(' ')) return false;
                existingKeys.add(en); // prevent inter-category dupes
                return true;
            });

            allSymbols.push({ category: cat.name, symbols: filtered });
            grandTotal += filtered.length;
            console.log(`  ✅ Got ${symbols.length}, kept ${filtered.length} (filtered ${symbols.length - filtered.length})`);
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    console.log(`\n=== ROUND 1 TOTAL: ${grandTotal} ===`);

    // If we need more, run supplement rounds
    if (grandTotal < 480) {
        const deficit = 500 - grandTotal;
        console.log(`\nNeed ${deficit} more. Running supplement...`);

        const suppCategories = [
            { name: "Ruhsal & Mistik Deneyimler", examples: "Meditasyon, kehanet, büyü, lanet, tılsım, muska, fal, cin, peri, ruh", count: Math.min(40, deficit / 3) },
            { name: "Akademi & Entelektüel", examples: "Felsefe, bilim, sanat, edebiyat, şiir, roman, müzik, sinema, tiyatro", count: Math.min(40, deficit / 3) },
            { name: "Günlük Rutinler & Alışkanlıklar", examples: "Uyku, kahvaltı, duş, egzersiz, diyet, alışveriş, temizlik, yürüyüş", count: Math.min(40, deficit / 3) },
        ];

        for (const cat of suppCategories) {
            cat.count = Math.ceil(cat.count);
            console.log(`\nSupplement: ${cat.name} (${cat.count})...`);
            try {
                const symbols = await generateCategorySymbols(cat);
                const filtered = symbols.filter(s => {
                    const en = s.en.toUpperCase().trim();
                    if (existingKeys.has(en)) return false;
                    if (en.includes(' ') || en.includes('-')) return false;
                    if (s.tr.includes(' ')) return false;
                    existingKeys.add(en);
                    return true;
                });
                allSymbols.push({ category: cat.name, symbols: filtered });
                grandTotal += filtered.length;
                console.log(`  ✅ Kept ${filtered.length}`);
            } catch (err) {
                console.error(`  ❌ ${err.message}`);
            }
        }
    }

    // Fix casing
    for (const cat of allSymbols) {
        cat.symbols = cat.symbols.map(s => ({ en: s.en.toUpperCase().trim(), tr: s.tr }));
    }

    console.log(`\n=== GRAND TOTAL: ${grandTotal} ===`);

    // Save
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allSymbols, null, 2));
    const flatList = allSymbols.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(BATCH_FILE, JSON.stringify(flatList, null, 2));

    console.log('Saved to:', OUTPUT_FILE);

    // Print summary
    console.log('\n| Category | Count |');
    console.log('|----------|-------|');
    for (const cat of allSymbols) {
        console.log(`| ${cat.category} | ${cat.symbols.length} |`);
    }
}

main().catch(err => console.error('Fatal:', err));
