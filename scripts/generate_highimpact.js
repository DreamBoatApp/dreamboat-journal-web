/**
 * Generate 500 HIGH-IMPACT dream symbols.
 * Focus: What real users commonly dream about and search for.
 * These are symbols that, if missing, would cause frustration → low ratings.
 * 
 * Strategy: Think about what actual people type into dream interpretation apps.
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

// Load ALL existing symbols
const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
// Also load previous batches
try {
    const b1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), 'utf-8'));
    b1.forEach(s => existingKeys.add(s.toUpperCase()));
} catch (e) { }
try {
    const b2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), 'utf-8'));
    b2.forEach(s => existingKeys.add(s.toUpperCase()));
} catch (e) { }

console.log('Total existing symbols:', existingKeys.size);

const OUTPUT_FILE = path.join(__dirname, 'data', 'new_symbols_highimpact.json');
const BATCH_FILE = path.join(__dirname, 'data', 'new_symbols_highimpact_batch.json');

const categories = [
    {
        name: "En Sık Rüya Görülen Hayvanlar (eksikler)",
        prompt: `You are a dream interpretation app expert. Generate 40 ANIMAL symbols that real users commonly dream about and would search for in a dream app. Think about what ACTUAL USERS type: common animals, scary animals, pets, farm animals, exotic animals. These should be animals NOT yet in our database.`,
        count: 40
    },
    {
        name: "Korku & Kabus Temaları",
        prompt: `Generate 35 dream symbols related to NIGHTMARES and FEARS that real users commonly experience. Think: falling, drowning, being chased, monsters, darkness, trapped, paralysis, attack, scream, etc. Focus on SINGLE-WORD concepts that users would type into a dream app after a nightmare.`,
        count: 35
    },
    {
        name: "Ev İçi Eşyalar & Günlük Objeler",
        prompt: `Generate 40 HOUSEHOLD items and EVERYDAY objects that commonly appear in dreams. Think: what objects are in a typical house that people dream about? Furniture, kitchen items, bathroom items, bedroom items, electronics. These should be very common, mundane objects people dream about.`,
        count: 40
    },
    {
        name: "Yiyecek & İçecek (eksikler)",
        prompt: `Generate 35 FOOD and DRINK items that commonly appear in dreams. Think: what do people eat in their dreams? Common meals, fruits, vegetables, drinks, snacks that appear in dreams. Focus on culturally universal foods + Turkish foods.`,
        count: 35
    },
    {
        name: "Aile & Yakınlar (spesifik roller)",
        prompt: `Generate 30 FAMILY and CLOSE RELATIONSHIP roles/people that commonly appear in dreams. Think: who do people dream about most? Mother, father (already have), but also: ex-boyfriend, neighbor, colleague, childhood friend, deceased relative, stranger, crush, etc.`,
        count: 30
    },
    {
        name: "Doğa & Hava Durumu",
        prompt: `Generate 35 NATURE and WEATHER phenomena that commonly appear in dreams. Think: natural landscapes, weather events, celestial phenomena, seasons, natural disasters, water bodies, geological features that people commonly dream about.`,
        count: 35
    },
    {
        name: "Beden & Fiziksel Deneyimler",
        prompt: `Generate 35 BODY-RELATED experiences and physical sensations commonly dreamed about. Think: losing teeth (already have), hair loss, bleeding, pregnancy, illness, injury, running, flying (already have), swimming, etc. What physical experiences do people dream about?`,
        count: 35
    },
    {
        name: "Ulaşım & Araçlar",
        prompt: `Generate 30 VEHICLES and TRANSPORTATION-related symbols that commonly appear in dreams. Think: cars, trains, planes (already have some), but also: taxi, ambulance, motorcycle, scooter, subway, ferry, spaceship, etc.`,
        count: 30
    },
    {
        name: "Mekan & Yapılar",
        prompt: `Generate 40 PLACES and BUILDINGS that commonly appear in dreams. Think: school, hospital, mall, office, church, cemetery, prison, hotel, beach, forest (already have some). What locations do people most often dream about?`,
        count: 40
    },
    {
        name: "Giyim & Aksesuar",
        prompt: `Generate 30 CLOTHING and ACCESSORIES that commonly appear in dreams. Think: what do people wear or lose in dreams? Wedding dress, underwear, shoes (already have), hat, uniform, mask, glasses, jewelry, etc.`,
        count: 30
    },
    {
        name: "İş & Okul Durumları",
        prompt: `Generate 30 WORK and SCHOOL situations/concepts that commonly appear in dreams. Think: exam, interview, presentation, deadline, boss, colleague, homework, graduation, late for work/school, fired, etc.`,
        count: 30
    },
    {
        name: "Soyut Kavramlar & Durumlar",
        prompt: `Generate 35 ABSTRACT concepts and SITUATIONS that real users dream about and would search for. Think: getting lost, being late, being naked, flying, falling (already have), but also: time travel, invisibility, superpowers, parallel universe, teleportation, etc.`,
        count: 35
    },
    {
        name: "Bitkiler & Çiçekler (yaygın)",
        prompt: `Generate 25 PLANTS and FLOWERS that commonly appear in dreams. Focus on the most recognizable, commonly dreamed-about plants, not exotic ones. Rose, tulip, sunflower, cactus (already have some), etc.`,
        count: 25
    },
    {
        name: "Renkler & Işık Durumları",
        prompt: `Generate 20 COLOR and LIGHT-related dream symbols. Think: specific colors, light conditions, visual phenomena that appear in dreams. Golden light, darkness, rainbow (already have), etc.`,
        count: 20
    },
    {
        name: "Dini & Spiritüel Semboller",
        prompt: `Generate 25 RELIGIOUS and SPIRITUAL symbols that Turkish and global users commonly dream about. Think: mosque, church (already have some), prayer, Quran, cross, rosary, heaven, hell, angel (already have), prophet, saint, etc.`,
        count: 25
    },
    {
        name: "Teknoloji & Modern Yaşam",
        prompt: `Generate 25 TECHNOLOGY and MODERN LIFE symbols that appear in contemporary dreams. Think: phone, social media, password, selfie, notification, battery, wifi, algorithm, etc.`,
        count: 25
    },
];

async function generateCategory(cat) {
    const existingList = Array.from(existingKeys).filter(k => k.length <= 12).slice(0, 200).join(', ');

    const prompt = `${cat.prompt}

Generate EXACTLY ${cat.count} symbols.

ALREADY IN DATABASE (DO NOT DUPLICATE): ${existingList}

CRITICAL RULES:
1. Each symbol = SINGLE ENGLISH WORD (no spaces, no hyphens). UPPERCASE.
2. Turkish translation = SINGLE WORD. If natural translation is multi-word, find single-word synonym or skip.
3. Focus on what REAL USERS actually dream about and would search for.
4. Prioritize COMMON, UNIVERSAL dream experiences over obscure ones.
5. These are symbols that if MISSING from a dream app, users would be frustrated.

OUTPUT FORMAT (JSON only):
{
  "symbols": [
    { "en": "SYMBOL", "tr": "Sembol" }
  ]
}`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
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
            const symbols = await generateCategory(cat);
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
            console.log(`  ✅ Got ${symbols.length}, kept ${filtered.length}`);
        } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
        }
    }

    console.log(`\n=== TOTAL: ${grandTotal} ===`);

    // Save
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allSymbols, null, 2));
    const flatList = allSymbols.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(BATCH_FILE, JSON.stringify(flatList, null, 2));

    // Print for review
    console.log('\n\n========== SYMBOL LIST FOR REVIEW ==========\n');
    for (const cat of allSymbols) {
        console.log(`\n### ${cat.category} (${cat.symbols.length})`);
        console.log(cat.symbols.map(s => `${s.en} → ${s.tr}`).join(' | '));
    }
    console.log(`\n\nTOTAL: ${grandTotal} symbols`);
}

main().catch(err => console.error('Fatal:', err));
