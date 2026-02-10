/**
 * Round 2: Fill remaining human concept symbols to approach 500.
 * More concrete human-related categories.
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

// Load all existing
const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
// Also load round 1
const r1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), 'utf-8'));
r1.forEach(s => existingKeys.add(s.toUpperCase()));
console.log('Existing + R1:', existingKeys.size);

const categories = [
    { name: "Aile Rolleri & Aile İçi Dinamikler", examples: "Üvey anne, kayınpeder, baldız, elti, enişte, kayınbirader, yenge, amca, dayı, hala, teyze", count: 50 },
    { name: "Meslek Unvanları", examples: "Müfettiş, savcı, noter, muhasebeci, cerrah, ebe, veteriner, eczacı, mühendis, garson", count: 50 },
    { name: "Sosyal Mekanlar", examples: "Hastane, okul, hapishane, mahkeme, kışla, yurt, pansiyon, otel, hamam, lokanta", count: 40 },
    { name: "Duygusal Eylemler", examples: "Ağlamak, gülmek, bağırmak, fısıldamak, kucaklamak, tokatlama, öpmek, sövmek", count: 40 },
    { name: "Sosyal Olaylar & Durumlar", examples: "Taşınma, kovulma, terfi, iflas, miras, nikah, söz, nişan, kına, askerlik", count: 40 },
    { name: "İnsan Vücudu & Organlar (ek)", examples: "Karaciğer, pankreas, safra, damar, sinir, tendon, kıkırdak, bademcik, parmak, tırnak", count: 40 },
    { name: "Psikolojik Kavramlar", examples: "Bilinçaltı, ego, süperego, libido, arketip, kompleks, projeksiyon, sublimasyom, bastırma", count: 30 },
    { name: "Yaşam Evreleri & Halleri", examples: "Bebeklik, çocukluk, gençlik, olgunluk, yaşlılık, hamilelik, lohusalık, menopoz", count: 30 },
];

async function gen(cat) {
    const prompt = `Generate EXACTLY ${cat.count} dream symbols for "${cat.name}".
Examples: ${cat.examples}
RULES:
1. SINGLE ENGLISH WORD (no spaces/hyphens). UPPERCASE.
2. Turkish translation also SINGLE WORD. Title Case.
3. Focus on human experiences commonly dreamed about.
OUTPUT: { "symbols": [{"en":"NURSE","tr":"Hemşire"}] }
Return ONLY valid JSON.`;

    const c = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        response_format: { type: 'json_object' }
    });
    return (JSON.parse(c.choices[0].message.content)).symbols || [];
}

async function main() {
    const allNew = [];
    for (const cat of categories) {
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

    const r2Total = allNew.reduce((s, c) => s + c.symbols.length, 0);

    // Merge
    const r1Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human.json'), 'utf-8'));
    const merged = [...r1Data, ...allNew];
    const grandTotal = merged.reduce((s, c) => s + c.symbols.length, 0);

    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_human.json'), JSON.stringify(merged, null, 2));
    const flat = merged.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), JSON.stringify(flat, null, 2));

    console.log(`\nR2: +${r2Total} | GRAND TOTAL: ${grandTotal}`);

    console.log('\n| Category | Count |');
    console.log('|----------|-------|');
    for (const cat of merged) {
        console.log(`| ${cat.category} | ${cat.symbols.length} |`);
    }
}

main().catch(console.error);
