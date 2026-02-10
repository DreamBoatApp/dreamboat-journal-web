/**
 * Batch generate content for 498 new symbols using GPT-4o-mini.
 * 
 * Key prompt improvement: Jungian PHILOSOPHY without direct name-dropping.
 * - Embody concepts: shadow, anima/animus, archetypes, collective unconscious, individuation
 * - DO NOT say "Carl Jung says..." or "According to Jung..."
 * - Instead: weave Jungian depth naturally into the interpretation
 * 
 * Process: For each symbol → Generate TR → Translate to EN → Save both
 * Progress tracked to allow resuming on interruption.
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
const PROGRESS_FILE = path.join(__dirname, 'data', 'batch_progress.json');
const SYMBOLS_FILE = path.join(__dirname, 'data', 'new_symbols_500.json');

// Load symbols (categorized)
const symbolData = JSON.parse(fs.readFileSync(SYMBOLS_FILE, 'utf-8'));
const allSymbols = symbolData.flatMap(cat => cat.symbols);
console.log(`Total symbols to process: ${allSymbols.length}`);

// Load progress
let progress = new Set();
if (fs.existsSync(PROGRESS_FILE)) {
    const saved = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    progress = new Set(saved);
}
console.log(`Already completed: ${progress.size}`);

async function translateToTurkish(noun) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a translator. Return ONLY the Turkish translation of the given English noun. Single word preferred. No punctuation, no explanation.' },
            { role: 'user', content: noun }
        ],
        temperature: 0.3
    });
    return completion.choices[0].message.content.trim().replace(/\.$/, '');
}

async function generateTurkishContent(englishName, turkishName) {
    const prompt = `"${turkishName}" (İngilizce: ${englishName}) sembolü için derinlikli bir rüya yorumu JSON'ı oluştur.

YAZIM TARZI:
- Derinlik psikolojisi felsefesini DOĞAL olarak yansıt: gölge, anima/animus, arketipler, kolektif bilinçdışı, bireyselleşme (individuasyon) kavramlarını kullan.
- "Carl Jung'a göre..." veya "Jung şöyle der..." gibi doğrudan alıntı YAPMA. Bunun yerine bu kavramları organik olarak metnin içine ör.
- Ton: Mistik, felsefi, derin ama modern ve anlaşılır. Yargılayıcı olmayan.
- Sembolün kültürel, mitolojik ve arketipsel katmanlarını keşfet.
- Her sembolü bilinçdışının bir mesajı olarak ele al.

JSON ŞEMASI (TAM OLARAK BUNA UY):
{
  "localizedName": "${turkishName}",
  "title": "Rüyada ${turkishName} Görmek: Anlamı ve Yorumu",
  "seoDescription": "Rüyada ${turkishName.toLowerCase()} görmenin derin anlamını keşfedin. Arketipsel analiz ve kozmik perspektiften ${turkishName.toLowerCase()} rüyalarının yorumu.",
  "introduction": "2-3 paragraf. Sembolün rüyalardaki önemini açıkla. Kültürel/mitolojik bağlamı ver. Gölge ve arketip kavramlarını doğal şekilde işle. 150-250 kelime.",
  "symbolism": "2-3 paragraf. Sembolün derinlik psikolojisindeki anlamını, gölge/anima yönlerini, kolektif bilinçdışındaki yerini analiz et. Bireyselleşme süreciyle ilişkilendir. 150-250 kelime.",
  "cosmicAnalysis": "**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
  "commonScenarios": [
    "Senaryo açıklaması: Derinlik psikolojisi perspektifinden yorum",
    "Başka bir senaryo: Arketipsel yorum"
  ]
}

KURALLAR:
- cosmicAnalysis: 4 ay evresi için bold başlıklar ve emoji ZORUNLU.
- commonScenarios: 4-5 string dizisi, her biri senaryo + yorum.
- SADECE geçerli JSON döndür, başka bir şey yazma.`;

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
    localizedName = English name of the symbol.
    title format = "Seeing [Symbol] in a Dream: Meaning and Interpretation"
    seoDescription should be naturally rewritten in English.
    cosmicAnalysis moon phase headers = **🌑 New Moon:** / **🌓 Waxing Moon:** / **🌕 Full Moon:** / **🌗 Waning Moon:**
    Maintain the depth psychology tone without directly naming psychologists.
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
        // Use provided TR name if available, otherwise translate
        let trName = symbol.tr || await translateToTurkish(en);
        console.log(`🔮 [${progress.size + 1}/${allSymbols.length}] ${en} → ${trName}`);

        // Generate TR content
        const trContent = await generateTurkishContent(en, trName);
        fs.mkdirSync(TR_DIR, { recursive: true });
        fs.writeFileSync(trPath, JSON.stringify(trContent, null, 2));

        // Translate to EN
        const enContent = await translateToEnglish(trContent);
        fs.mkdirSync(EN_DIR, { recursive: true });
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

    const BATCH_SIZE = 3; // Process 3 at a time to manage rate limits
    let completed = 0;
    let errors = 0;

    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        const chunk = remaining.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(chunk.map(s => processSymbol(s)));

        completed += results.filter(r => r === 'ok').length;
        errors += results.filter(r => r === 'error').length;

        // Save progress after each batch
        saveProgress();

        if ((i + BATCH_SIZE) % 30 === 0) {
            console.log(`\n📊 Progress: ${progress.size}/${allSymbols.length} (${errors} errors)\n`);
        }
    }

    console.log(`\n=== COMPLETE ===`);
    console.log(`Total processed: ${progress.size}/${allSymbols.length}`);
    console.log(`This run: ${completed} ok, ${errors} errors`);
}

main().catch(err => {
    console.error('Fatal:', err);
    saveProgress();
});
