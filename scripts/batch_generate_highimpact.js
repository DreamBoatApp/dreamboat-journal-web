/**
 * Batch generate content for 402 high-impact dream symbols.
 * 
 * PROMPT STYLE (per user):
 * - Jung'cu felsefe her zaman mevcut olacak (gölge, anima, arketip, kolektif bilinçdışı)
 * - Bazen doğrudan "Carl Jung..." diye anılacak, bazen sadece kavramlar kullanılacak
 * - "Karışık" stil: ~%30-40 oranında doğrudan Jung referansı
 * 
 * MODEL: wolf.json (Kurt) — en iyi örnek
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
const PROGRESS_FILE = path.join(__dirname, 'data', 'batch_progress_highimpact.json');
const SYMBOLS_FILE = path.join(__dirname, 'data', 'new_symbols_highimpact.json');

const symbolData = JSON.parse(fs.readFileSync(SYMBOLS_FILE, 'utf-8'));
const allSymbols = symbolData.flatMap(cat => cat.symbols);
console.log(`Total symbols to process: ${allSymbols.length}`);

let progress = new Set();
if (fs.existsSync(PROGRESS_FILE)) {
    progress = new Set(JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8')));
}
console.log(`Already completed: ${progress.size}`);

// Alternate between direct Jung reference and implicit style
let symbolCounter = 0;

function getJungStyleNote() {
    symbolCounter++;
    if (symbolCounter % 3 === 0) {
        // ~33%: Doğrudan Jung referansı
        return `- Bu sembolde Carl Jung'a doğrudan atıfta bulunabilirsin. Örn: "Carl Jung, bu sembolü ... olarak tanımlar" veya "Jung'un ... kavramına göre". Derinlik psikolojisi terminolojisini kullan.`;
    } else {
        // ~67%: Sadece felsefe, isim yok
        return `- Bu sembolde "Carl Jung" ismini kullanma. Bunun yerine kavramları doğal olarak iç içe kullan: gölge, anima/animus, arketipler, kolektif bilinçdışı, bireyselleşme gibi terimleri metin içinde organik olarak ör.`;
    }
}

async function generateTurkishContent(englishName, turkishName) {
    const jungNote = getJungStyleNote();

    const prompt = `"${turkishName}" (İngilizce: ${englishName}) sembolü için KALİTELİ ve DERİNLİKLİ bir rüya yorumu JSON'ı oluştur.

MODEL: Aşağıdaki "Kurt" (Wolf) yorumunun kalitesini ve tonunu referans al:
- Giriş: Kültürel, mitolojik ve tarihsel bağlam zengin. (Roma'nın kurucuları, Fenrir gibi referanslar)
- Sembolizm: Psikolojik derinlik, çift yönlü analiz (koruyucu vs tehditkar, sürü vs yalnız)
- Kozmik: Her ay evresi 2-3 cümle, spesifik ve sembolle doğrudan ilişkili
- Yaygın Rüyalar: Spesifik senaryolar, iki nokta sonrası kısa ama vurucu yorum

YAZIM TARZI:
${jungNote}
- Ton: Mistik, felsefi, derin ama modern ve anlaşılır. Yargılayıcı olmayan.
- Sembolün kültürel, mitolojik ve arketipsel katmanlarını keşfet.
- Her sembolü bilinçdışının bir mesajı olarak ele al.
- Giriş ve sembolizm bölümleri en az 150-250 kelime olmalı, KISA TUTMA.

JSON ŞEMASI (TAM OLARAK BUNA UY):
{
  "localizedName": "${turkishName}",
  "title": "Rüyada ${turkishName} Görmek: Anlamı ve Yorumu",
  "seoDescription": "Rüyada ${turkishName.toLowerCase()} görmenin derin anlamını keşfedin. Arketipsel analiz ve kozmik perspektiften ${turkishName.toLowerCase()} rüyalarının yorumu.",
  "introduction": "2-3 paragraf. Sembolün tarihsel, kültürel, mitolojik bağlamı. Rüyalardaki önemi. 150-250 kelime. ZENGİN ve DERİN olsun.",
  "symbolism": "2-3 paragraf. Psikolojik analiz, gölge/anima boyutu, çift yönlü yorumlar. Bireyselleşme süreciyle ilişki. 150-250 kelime.",
  "cosmicAnalysis": "*Bu rüya, Ay'ın evrelerine göre 4 farklı kozmik mesaj taşır:\\n\\n**🌑 Yeni Ay:** 2-3 cümle spesifik yorum...\\n\\n**🌓 Büyüyen Ay:** 2-3 cümle...\\n\\n**🌕 Dolunay:** 2-3 cümle...\\n\\n**🌗 Küçülen Ay:** 2-3 cümle...",
  "commonScenarios": [
    "Senaryo görmek: İki nokta sonrası vurucu, kısa yorum.",
    "Başka senaryo: Psikolojik perspektiften yorum.",
    "Üçüncü senaryo: Arketipsel yorum.",
    "Dördüncü senaryo: Pratik hayata yansıma.",
    "Beşinci senaryo: Derin bilinçdışı mesaj.",
    "Altıncı senaryo: Kültürel/mitolojik bağlam."
  ]
}

KURALLAR:
- cosmicAnalysis: Yıldız işareti ile başla, 4 ay evresi, bold başlıklar + emoji ZORUNLU. Her evre 2-3 cümle.
- commonScenarios: 5-6 string dizisi, her biri "Senaryo: Yorum" formatında. KURT ÖRNEĞİ GİBİ.
- introduction ve symbolism: EN AZ 150 kelime, tercihen 200+.
- SADECE geçerli JSON döndür, başka hiçbir şey yazma.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: 'json_object' }
    });

    return JSON.parse(completion.choices[0].message.content);
}

async function translateToEnglish(trContent) {
    const prompt = `Translate this Turkish dream interpretation JSON to English. Keep the exact same structure and depth.
    localizedName = English name of the symbol.
    title format = "Seeing [Symbol] in a Dream: Meaning and Interpretation"
    seoDescription = naturally rewritten in English.
    cosmicAnalysis moon phase headers = **🌑 New Moon:** / **🌓 Waxing Moon:** / **🌕 Full Moon:** / **🌗 Waning Moon:**
    Maintain the depth psychology tone. If Jung is mentioned by name, keep it in translation.
    Return ONLY valid JSON.
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
