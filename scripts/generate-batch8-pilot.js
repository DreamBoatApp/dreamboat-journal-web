const fs = require('fs');
const path = require('path');
const https = require('https');

function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) return match[1].trim();
    }
    return process.env[key];
}

const OPENAI_API_KEY = getEnv('OPENAI_API_KEY');
if (!OPENAI_API_KEY) { console.error("OPENAI_API_KEY not found."); process.exit(1); }

const TARGET_DIR_TR = path.join(__dirname, '../content/tr/meanings');
const TARGET_DIR_EN = path.join(__dirname, '../content/en/meanings');

// ALL single-word symbols with single-word translations
const pilotSymbols = [
    { key: "QUILL", slug: "quill", tr: "Tüy", en: "Quill" },
    { key: "PEGASUS", slug: "pegasus", tr: "Pegasus", en: "Pegasus" },
    { key: "EMBER", slug: "ember", tr: "Kor", en: "Ember" },
    { key: "LOCKET", slug: "locket", tr: "Madalyon", en: "Locket" },
    { key: "CENTAUR", slug: "centaur", tr: "Kentaur", en: "Centaur" },
];

const REF_TR = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_TR, 'dog.json'), 'utf8'));
const REF_EN = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_EN, 'dog.json'), 'utf8'));
const REF_DEATH_TR = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_TR, 'death.json'), 'utf8'));

function callOpenAI(prompt) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.75,
            max_tokens: 4000
        });
        const req = https.request({
            hostname: 'api.openai.com', port: 443,
            path: '/v1/chat/completions', method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                if (res.statusCode !== 200) return reject(`API ${res.statusCode}: ${body}`);
                resolve(JSON.parse(body).choices[0].message.content);
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function cleanJSON(text) {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

// ═══ TR PROMPT v3 ═══
const PROMPT_TR = (title) => `
Sen mistik, Jungian ve spiritüel bir rüya tabircisisin.

ALTIN STANDART referanslar:

═══ REFERANS 1: Köpek ═══
${JSON.stringify(REF_TR, null, 2)}
═══ REFERANS 2: Ölüm ═══
${JSON.stringify(REF_DEATH_TR, null, 2)}
═══ REFERANS SONU ═══

ŞİMDİ bu sembolü yaz: "${title}"

KRİTİK KURALLAR:
1. SADECE JSON döndür.
2. Türkçe yaz. Doğal, akıcı, edebi Türkçe.
3. Mistik ve bilge ton — ASLA yapay zeka dili kullanma ("Özetle", "Sonuç olarak" YOK).
4. seoDescription: Bu metin Google arama sonuçlarında gözükecek. Tıklama oranını MAKSIMIZE et. Merak uyandır, soru sor veya şaşırtıcı bir bilgi ver. Örnek tonlar:
   - "Bu rüya sandığınızdan çok daha derin bir mesaj taşıyor. İşte bilinçaltınızın size söylemeye çalıştığı şey."
   - "Rüyanızda ${title.toLowerCase()} gördüyseniz dikkat! Bu sembolün 6 farklı gizli anlamı var."
   - "${title} rüyası, hayatınızdaki büyük bir değişimin habercisi olabilir."
   HER SEMBOL İÇİN FARKLI ve ÖZGÜN bir seoDescription yaz. Kalıpları tekrarlama.
5. introduction: EN AZ 4 cümle. Tarihsel/kültürel bağlam + Jung arketip referansı.
6. symbolism: EN AZ 2 uzun paragraf (\\n\\n ile ayrılsın). Jung VE Freud referansları. ~1500-2000 karakter.
7. cosmicAnalysis: 4 Ay evresi (🌑🌓🌕🌗). Her biri 3-4 cümle, sembolle doğrudan bağlantılı.
8. commonScenarios: TAM 6 adet. "Senaryo 1:" gibi prefix KOYMA — direkt içerikle başla. Her biri 2-3 cümle, somut rüya durumu + derin Jungian yorum.

JSON yapısı:
{
  "localizedName": "...",
  "title": "Rüyada ... Görmek: Anlamı ve Yorumu",
  "seoDescription": "...",
  "introduction": "...",
  "symbolism": "...\\n\\n...",
  "cosmicAnalysis": "Bu rüya, Ay'ın evrelerine göre 4 farklı kozmik mesaj taşır:\\n\\n**🌑 Yeni Ay:** ...\\n\\n**🌓 Büyüyen Ay:** ...\\n\\n**🌕 Dolunay:** ...\\n\\n**🌗 Küçülen Ay:** ...",
  "commonScenarios": ["...", "...", "...", "...", "...", "..."]
}
`;

// ═══ EN PROMPT v3 ═══
const PROMPT_EN = (title) => `
You are a mystical, Jungian dream interpreter.

GOLD STANDARD reference:

═══ REFERENCE: Dog ═══
${JSON.stringify(REF_EN, null, 2)}
═══ END ═══

NOW write this symbol: "${title}"

CRITICAL RULES:
1. Return ONLY JSON.
2. English. Natural, flowing, literary.
3. Mystical, wise — NEVER AI language ("In summary" = BANNED).
4. seoDescription: This text appears in Google search results. MAXIMIZE click-through rate. Create curiosity, ask a question, or reveal surprising insight. Example tones:
   - "This dream carries a far deeper message than you think. Here's what your subconscious is trying to tell you."
   - "If you saw ${title.toLowerCase()} in your dream, pay attention! This symbol has 6 hidden meanings."
   - "A ${title.toLowerCase()} dream could be the harbinger of a major change in your life."
   Write a UNIQUE and ORIGINAL seoDescription for each symbol. Never repeat patterns.
5. introduction: AT LEAST 4 sentences. Historical/cultural context + Jung archetype reference.
6. symbolism: AT LEAST 2 long paragraphs (\\n\\n). Jung AND Freud references. ~1500-2000 chars.
7. cosmicAnalysis: 4 Moon phases (🌑🌓🌕🌗). Each 3-4 sentences, tied to symbol.
8. commonScenarios: EXACTLY 6 items. NO "Scenario 1:" prefix — start directly. Each 2-3 sentences, concrete dream + deep interpretation.

JSON structure:
{
  "localizedName": "...",
  "title": "Seeing ... in a Dream: Meaning and Interpretation",
  "seoDescription": "...",
  "introduction": "...",
  "symbolism": "...\\n\\n...",
  "cosmicAnalysis": "This dream carries 4 different cosmic messages according to the phases of the Moon:\\n\\n**🌑 New Moon:** ...\\n\\n**🌓 Waxing Moon:** ...\\n\\n**🌕 Full Moon:** ...\\n\\n**🌗 Waning Moon:** ...",
  "commonScenarios": ["...", "...", "...", "...", "...", "..."]
}
`;

async function main() {
    const todo = pilotSymbols.filter(s => {
        const trExists = fs.existsSync(path.join(TARGET_DIR_TR, `${s.slug}.json`));
        const enExists = fs.existsSync(path.join(TARGET_DIR_EN, `${s.slug}.json`));
        return !trExists || !enExists;
    });

    if (todo.length === 0) {
        console.log("All pilot symbols already exist. Showing quality...");
        for (const item of pilotSymbols) {
            const c = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_TR, `${item.slug}.json`), 'utf8'));
            console.log(`${item.key}: seoDesc="${c.seoDescription}"`);
        }
        process.exit(0);
    }

    console.log(`Generating ${todo.length} symbols: ${todo.map(s => s.key).join(', ')}\n`);

    for (const item of todo) {
        const fileTR = path.join(TARGET_DIR_TR, `${item.slug}.json`);
        const fileEN = path.join(TARGET_DIR_EN, `${item.slug}.json`);
        console.log(`=== ${item.key} ===`);

        try {
            if (!fs.existsSync(fileTR)) {
                console.log(`  TR...`);
                const trRaw = await callOpenAI(PROMPT_TR(item.tr));
                const jsonTR = JSON.parse(cleanJSON(trRaw));
                fs.writeFileSync(fileTR, JSON.stringify(jsonTR, null, 2), 'utf8');
                console.log(`  ✅ TR (${JSON.stringify(jsonTR).length}b) seoDesc: "${jsonTR.seoDescription}"`);
            }
            if (!fs.existsSync(fileEN)) {
                console.log(`  EN...`);
                const enRaw = await callOpenAI(PROMPT_EN(item.en));
                const jsonEN = JSON.parse(cleanJSON(enRaw));
                fs.writeFileSync(fileEN, JSON.stringify(jsonEN, null, 2), 'utf8');
                console.log(`  ✅ EN (${JSON.stringify(jsonEN).length}b) seoDesc: "${jsonEN.seoDescription}"`);
            }
        } catch (e) {
            console.error(`  ❌ ${e.message || e}`);
        }
    }
    console.log(`\n🎉 Done!`);
}

main();
