/**
 * Batch generate content for ~496 new HUMAN CONCEPT symbols using GPT-4o-mini.
 * Copy of batch_generate_new.js but using new_symbols_human.json + separate progress file.
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
if (!apiKey) { console.error('❌ No API key'); process.exit(1); }

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey });

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');
const EN_DIR = path.join(__dirname, '..', 'content', 'en', 'meanings');
const PROGRESS_FILE = path.join(__dirname, 'data', 'batch_progress_human.json');
const SYMBOLS_FILE = path.join(__dirname, 'data', 'new_symbols_human.json');

const symbolData = JSON.parse(fs.readFileSync(SYMBOLS_FILE, 'utf-8'));
const allSymbols = symbolData.flatMap(cat => cat.symbols);
console.log(`Total symbols to process: ${allSymbols.length}`);

let progress = new Set();
if (fs.existsSync(PROGRESS_FILE)) {
    progress = new Set(JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8')));
}
console.log(`Already completed: ${progress.size}`);

async function generateTurkishContent(englishName, turkishName) {
    const prompt = `"${turkishName}" (İngilizce: ${englishName}) sembolü için derinlikli bir rüya yorumu JSON'ı oluştur.

YAZIM TARZI:
- Derinlik psikolojisi felsefesini DOĞAL olarak yansıt: gölge, anima/animus, arketipler, kolektif bilinçdışı, bireyselleşme (individuasyon) kavramlarını kullan.
- "Carl Jung'a göre..." veya "Jung şöyle der..." gibi doğrudan alıntı YAPMA. Bunun yerine bu kavramları organik olarak metnin içine ör.
- Ton: Mistik, felsefi, derin ama modern ve anlaşılır. Yargılayıcı olmayan.
- Bu sembol İNSANA AİT bir kavram (iş, aile, toplum, ilişki, din, psikoloji vb.). Yorumu bu insani boyuta odakla.
- Her sembolü bilinçdışının bir mesajı olarak ele al.

JSON ŞEMASI:
{
  "localizedName": "${turkishName}",
  "title": "Rüyada ${turkishName} Görmek: Anlamı ve Yorumu",
  "seoDescription": "Rüyada ${turkishName.toLowerCase()} görmenin derin anlamını keşfedin. Arketipsel analiz ve kozmik perspektiften ${turkishName.toLowerCase()} rüyalarının yorumu.",
  "introduction": "2-3 paragraf. 150-250 kelime.",
  "symbolism": "2-3 paragraf. 150-250 kelime.",
  "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
  "commonScenarios": [
    "Senaryo: Yorum",
    "Senaryo: Yorum"
  ]
}

KURALLAR:
- cosmicAnalysis: 4 ay evresi, bold başlıklar + emoji ZORUNLU.
- commonScenarios: 4-5 string, her biri senaryo + yorum.
- SADECE geçerli JSON döndür.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
    });
    return JSON.parse(completion.choices[0].message.content);
}

async function translateToEnglish(trContent) {
    const prompt = `Translate this Turkish dream interpretation JSON to English. Keep structure identical.
    localizedName = English name.
    title format = "Seeing [Symbol] in a Dream: Meaning and Interpretation"
    cosmicAnalysis headers = **🌑 New Moon:** / **🌓 Waxing Moon:** / **🌕 Full Moon:** / **🌗 Waning Moon:**
    Maintain depth psychology tone without naming psychologists.
    JSON: ${JSON.stringify(trContent)}`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' }
    });
    return JSON.parse(completion.choices[0].message.content);
}

function saveProgress() {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify([...progress], null, 2));
}

async function processSymbol(symbol) {
    const en = symbol.en.toUpperCase();
    const slug = en.toLowerCase().trim();
    if (progress.has(en)) return 'skip';

    const trPath = path.join(TR_DIR, `${slug}.json`);
    const enPath = path.join(EN_DIR, `${slug}.json`);

    try {
        const trName = symbol.tr;
        console.log(`🔮 [${progress.size + 1}/${allSymbols.length}] ${en} → ${trName}`);

        const trContent = await generateTurkishContent(en, trName);
        fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));

        const enContent = await translateToEnglish(trContent);
        fs.writeFileSync(enPath, JSON.stringify(enContent, null, 2));

        progress.add(en);
        return 'ok';
    } catch (err) {
        console.error(`   ❌ ${en}: ${err.message}`);
        return 'error';
    }
}

async function main() {
    const remaining = allSymbols.filter(s => !progress.has(s.en.toUpperCase()));
    console.log(`Remaining: ${remaining.length}`);

    const BATCH_SIZE = 3;
    let completed = 0, errors = 0;

    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        const chunk = remaining.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(chunk.map(s => processSymbol(s)));
        completed += results.filter(r => r === 'ok').length;
        errors += results.filter(r => r === 'error').length;
        saveProgress();

        if ((i + BATCH_SIZE) % 30 === 0) {
            console.log(`\n📊 Progress: ${progress.size}/${allSymbols.length} (${errors} errors)\n`);
        }
    }

    console.log(`\n=== COMPLETE ===`);
    console.log(`Total processed: ${progress.size}/${allSymbols.length}`);
    console.log(`This run: ${completed} ok, ${errors} errors`);
}

main().catch(err => { console.error('Fatal:', err); saveProgress(); });
