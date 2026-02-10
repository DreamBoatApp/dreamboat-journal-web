const fs = require('fs');
const path = require('path');
function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) { const c = fs.readFileSync(envPath, 'utf8'); const m = c.match(new RegExp(`^${key}=(.*)$`, 'm')); if (m) return m[1].trim(); }
    return process.env[key] || null;
}
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: getEnv('OPENAI_API_KEY') });

const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
try { JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_batch.json'), 'utf-8')).forEach(s => existingKeys.add(s.toUpperCase())); } catch (e) { }
try { JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), 'utf-8')).forEach(s => existingKeys.add(s.toUpperCase())); } catch (e) { }
try { JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_highimpact_batch.json'), 'utf-8')).forEach(s => existingKeys.add(s.toUpperCase())); } catch (e) { }
console.log('Existing:', existingKeys.size);

const cats = [
    {
        name: "Çocukluk & Nostalji", count: 40,
        prompt: "Dream symbols related to CHILDHOOD and NOSTALGIA: toys, childhood places, school memories, cartoons, old friends, playground, kindergarten, games children play, elementary school items, etc."
    },
    {
        name: "Suç & Yasak", count: 35,
        prompt: "Dream symbols about CRIME, PROHIBITION, TABOO: stealing, cheating, lying, hiding something, police (already have), court, jail, gun (already have), evidence, smuggling, etc. What illegal or forbidden things do people dream about?"
    },
    {
        name: "Su & Deniz", count: 35,
        prompt: "WATER and OCEAN-related dream symbols: waves, shore, diving, drowning (already have), pool, lake, river (already have), waterfall (already have), tsunami, whirlpool, seashell, anchor, submarine, pier, dock, etc."
    },
    {
        name: "Yolculuk & Macera", count: 35,
        prompt: "JOURNEY and ADVENTURE dream symbols: luggage, passport (already have), tourist, explorer, backpacker, destination, map (already have), compass (already have), trail, expedition, camping, safari, pilgrimage, etc."
    },
    {
        name: "Müzik & Ses", count: 30,
        prompt: "MUSIC and SOUND dream symbols: singing, guitar, piano (already have some instruments), melody, rhythm, silence, echo, noise, concert, microphone, speakers, song, humming, whistle, etc."
    },
    {
        name: "Zaman & Değişim", count: 30,
        prompt: "TIME and CHANGE concepts in dreams: past, future, today, yesterday, tomorrow, clock (already have), hour, midnight, noon, anniversary, decade, countdown, eternal, temporary, etc."
    },
    {
        name: "Spor & Oyun", count: 35,
        prompt: "SPORT and GAME dream symbols: football, basketball (already have), tennis, swimming, running, scoring, winning, losing, trophy, stadium, referee, team, match, ball (already have), competition, etc."
    },
    {
        name: "Doğaüstü & Paranormal", count: 35,
        prompt: "SUPERNATURAL and PARANORMAL dream symbols: ghost (already have), haunted, curse, witch (already have), psychic, UFO, alien (already have), portal, dimension, shapeshifter, werewolf, zombie (already have), resurrection, levitation, etc."
    },
    {
        name: "Para & Alışveriş Detayları", count: 30,
        prompt: "MONEY and SHOPPING specific dream symbols: receipt, wallet (already have), ATM (already have), bargain, discount, checkout, cashier, marketplace, auction, barter, coupon, refund, shopping cart, etc."
    },
    {
        name: "İletişim & Teknoloji Detay", count: 30,
        prompt: "COMMUNICATION and TECHNOLOGY dream symbols: phone call, text message, email (already have some), video call, voicemail, signal, static, broken screen, charging, update, notification, screenshot, etc."
    },
    {
        name: "Tıbbi & Hastane", count: 30,
        prompt: "MEDICAL and HOSPITAL dream symbols: nurse, doctor (already have), surgery (already have), dentist (already have), hospital, operating room, diagnosis, prescription, injection, wheelchair, ambulance (already have), stethoscope, x-ray, etc."
    },
    {
        name: "Mutfak & Pişirme", count: 25,
        prompt: "KITCHEN and COOKING dream symbols: oven, stove, pot, pan, recipe, ingredient, mixing, baking (already have), frying, boiling, serving, plate, spoon (already have), fork, knife (already have), etc."
    },
    {
        name: "Savunma & Silah", count: 25,
        prompt: "DEFENSE and WEAPON dream symbols: gun, sword (already have some), shield (already have), armor (already have), bullet, grenade, bomb (already have), missile, arrow (already have), dagger, sling, etc."
    },
    {
        name: "Hata & Başarısızlık", count: 25,
        prompt: "FAILURE and MISTAKE dream symbols that cause anxiety: exam failure, wrong turn, missed opportunity, rejection, embarrassment, losing something, forgetting something, broken promise, late arrival, etc."
    },
];

async function gen(cat) {
    const prompt = `${cat.prompt}

Generate EXACTLY ${cat.count} symbols. SINGLE ENGLISH WORD, UPPERCASE. Turkish = SINGLE WORD, Title Case.
Do NOT include any symbols already in our database.
Focus on what REAL DREAM APP USERS commonly search for.

Return ONLY valid JSON output: { "symbols": [{"en":"SYMBOL","tr":"Sembol"}] }`;

    const c = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.85,
        response_format: { type: 'json_object' }
    });
    return (JSON.parse(c.choices[0].message.content)).symbols || [];
}

async function main() {
    const allNew = [];
    for (const cat of cats) {
        console.log(`Generating: ${cat.name}...`);
        const syms = await gen(cat);
        const filtered = syms.filter(s => {
            const en = s.en.toUpperCase().trim();
            if (existingKeys.has(en) || en.includes(' ') || en.includes('-') || s.tr.includes(' ')) return false;
            existingKeys.add(en);
            return true;
        });
        allNew.push({ category: cat.name, symbols: filtered });
        console.log(`  ✅ Kept ${filtered.length}/${syms.length}`);
    }

    // Merge with round 1
    const r1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_highimpact.json'), 'utf-8'));
    const merged = [...r1, ...allNew];
    const total = merged.reduce((s, c) => s + c.symbols.length, 0);

    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_highimpact.json'), JSON.stringify(merged, null, 2));
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_highimpact_batch.json'),
        JSON.stringify(merged.flatMap(c => c.symbols.map(s => s.en)), null, 2));

    console.log(`\nR2 total: ${allNew.reduce((s, c) => s + c.symbols.length, 0)} | GRAND: ${total}`);
    for (const cat of merged) console.log(`| ${cat.category} | ${cat.symbols.length} |`);
}

main().catch(console.error);
