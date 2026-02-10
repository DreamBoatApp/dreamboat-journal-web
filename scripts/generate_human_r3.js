const fs = require('fs');
const path = require('path');
function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) { const content = fs.readFileSync(envPath, 'utf8'); const match = content.match(new RegExp(`^${key}=(.*)$`, 'm')); if (match) return match[1].trim(); }
    return process.env[key] || null;
}
const apiKey = getEnv('OPENAI_API_KEY');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

const dict = require('./data/source_dictionary');
const existingKeys = new Set(Object.keys(dict).map(k => k.toUpperCase()));
const prev = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), 'utf-8'));
prev.forEach(s => existingKeys.add(s.toUpperCase()));
console.log('Total existing:', existingKeys.size);

const categories = [
    { name: "Karakter Özellikleri & Erdemler", examples: "Cesaret, cömertlik, kibir, alçakgönüllülük, sabır, merhamet, zalimlik, dürüstlük", count: 50 },
    { name: "Mitolojik & Fantastik Varlıklar", examples: "Sfenks, grifon, minotaur, feniks, seraphim, golem, titan, nympha, satir, harpiya", count: 40 },
    { name: "Tarihsel & Politik Kavramlar", examples: "İmparatorluk, cumhuriyet, monarşi, demokrasi, diktatörlük, koloni, feodalizm", count: 30 },
];

async function gen(cat) {
    const prompt = `Generate EXACTLY ${cat.count} dream symbols for "${cat.name}".
Examples: ${cat.examples}
RULES: SINGLE ENGLISH WORD (uppercase), Turkish also SINGLE WORD (Title Case). No spaces/hyphens.
Focus on concepts humans commonly dream about.
OUTPUT: { "symbols": [{"en":"COURAGE","tr":"Cesaret"}] }
Return ONLY valid JSON.`;
    const c = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: prompt }], temperature: 0.9, response_format: { type: 'json_object' } });
    return (JSON.parse(c.choices[0].message.content)).symbols || [];
}

async function main() {
    const allNew = [];
    for (const cat of categories) {
        console.log(`Generating: ${cat.name}...`);
        const syms = await gen(cat);
        const filtered = syms.filter(s => { const en = s.en.toUpperCase().trim(); if (existingKeys.has(en) || en.includes(' ') || en.includes('-') || s.tr.includes(' ')) return false; existingKeys.add(en); return true; });
        allNew.push({ category: cat.name, symbols: filtered });
        console.log(`  ✅ Kept ${filtered.length}/${syms.length}`);
    }
    const r3 = allNew.reduce((s, c) => s + c.symbols.length, 0);
    const r1Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new_symbols_human.json'), 'utf-8'));
    const merged = [...r1Data, ...allNew];
    const total = merged.reduce((s, c) => s + c.symbols.length, 0);
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_human.json'), JSON.stringify(merged, null, 2));
    const flat = merged.flatMap(c => c.symbols.map(s => s.en));
    fs.writeFileSync(path.join(__dirname, 'data', 'new_symbols_human_batch.json'), JSON.stringify(flat, null, 2));
    console.log(`\nR3: +${r3} | GRAND TOTAL: ${total}`);
}
main().catch(console.error);
