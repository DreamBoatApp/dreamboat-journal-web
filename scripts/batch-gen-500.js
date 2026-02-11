const fs = require('fs');
const path = require('path');
const https = require('https');

// ═══ CONFIG ═══
const BATCH_SIZE = 5;          // Generate 5 at a time
const DELAY_BETWEEN_CALLS = 500; // ms between API calls
const MAX_RETRIES = 3;

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

// Load symbol list
const symbols = require('./new_symbols_fresh.js');
console.log(`Loaded ${symbols.length} symbols from new_symbols_fresh.js`);

// Load reference files
const REF_TR = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_TR, 'dog.json'), 'utf8'));
const REF_EN = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_EN, 'dog.json'), 'utf8'));
const REF_DEATH_TR = JSON.parse(fs.readFileSync(path.join(TARGET_DIR_TR, 'death.json'), 'utf8'));

// ═══ API CALL ═══
function callOpenAI(prompt, retries = MAX_RETRIES) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.75,
            max_tokens: 4000,
            response_format: { type: "json_object" }
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
                if (res.statusCode === 429 && retries > 0) {
                    const wait = Math.min(30000, 5000 * (MAX_RETRIES - retries + 1));
                    console.log(`    ⏳ Rate limited, waiting ${wait / 1000}s...`);
                    setTimeout(() => callOpenAI(prompt, retries - 1).then(resolve).catch(reject), wait);
                    return;
                }
                if (res.statusCode !== 200) return reject(new Error(`API ${res.statusCode}: ${body.substring(0, 200)}`));
                try {
                    resolve(JSON.parse(body).choices[0].message.content);
                } catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
            });
        });
        req.on('error', e => {
            if (retries > 0) {
                setTimeout(() => callOpenAI(prompt, retries - 1).then(resolve).catch(reject), 3000);
            } else { reject(e); }
        });
        req.write(data);
        req.end();
    });
}

function cleanJSON(text) {
    // Remove markdown code fences
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    // Remove control characters that break JSON.parse (except \n, \r, \t which are valid)
    text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
    // Fix unescaped newlines inside JSON strings: between quotes, replace actual newlines with \n
    // This is a common GPT output issue
    text = text.replace(/\r\n/g, '\n');
    return text;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══ PROMPTS (v3 — approved) ═══
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
4. seoDescription: Bu metin Google arama sonuçlarında gözükecek. Tıklama oranını MAKSIMIZE et. Merak uyandır, soru sor veya şaşırtıcı bir bilgi ver. HER SEMBOL İÇİN FARKLI ve ÖZGÜN bir seoDescription yaz. Kalıpları tekrarlama.
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
4. seoDescription: This text appears in Google search results. MAXIMIZE click-through rate. Create curiosity, ask a question, or reveal surprising insight. Write a UNIQUE seoDescription. Never repeat patterns.
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

// ═══ VALIDATION ═══
function validateContent(json, lang) {
    const errors = [];
    if (!json.localizedName) errors.push('missing localizedName');
    if (!json.title) errors.push('missing title');
    if (!json.seoDescription) errors.push('missing seoDescription');
    if (!json.introduction || json.introduction.length < 100) errors.push('intro too short');
    if (!json.symbolism || json.symbolism.length < 400) errors.push('symbolism too short');
    if (!json.cosmicAnalysis || json.cosmicAnalysis.length < 200) errors.push('cosmic too short');
    if (!json.commonScenarios || json.commonScenarios.length < 6) errors.push(`only ${(json.commonScenarios || []).length} scenarios`);
    return errors;
}

// ═══ PROGRESS TRACKING ═══
const progressFile = path.join(__dirname, 'batch8_progress.json');

function loadProgress() {
    if (fs.existsSync(progressFile)) {
        return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    }
    return { completed: [], errors: [], startTime: Date.now() };
}

function saveProgress(progress) {
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf8');
}

// ═══ MAIN ═══
async function main() {
    const progress = loadProgress();
    const completedSet = new Set(progress.completed);

    // Find remaining work
    const remaining = symbols.filter(s => !completedSet.has(s.key));

    // Check which already have content files
    const todo = remaining.filter(s => {
        const trExists = fs.existsSync(path.join(TARGET_DIR_TR, `${s.slug}.json`));
        const enExists = fs.existsSync(path.join(TARGET_DIR_EN, `${s.slug}.json`));
        return !trExists || !enExists;
    });

    console.log(`\n═══ BATCH 8 PRODUCTION ═══`);
    console.log(`Total symbols: ${symbols.length}`);
    console.log(`Already completed: ${completedSet.size}`);
    console.log(`Have content files: ${remaining.length - todo.length}`);
    console.log(`To generate: ${todo.length}`);
    console.log(`═══════════════════════════\n`);

    if (todo.length === 0) {
        console.log('✅ All symbols generated!');
        return;
    }

    let generated = 0;
    let failed = 0;

    for (let i = 0; i < todo.length; i++) {
        const item = todo[i];
        const fileTR = path.join(TARGET_DIR_TR, `${item.slug}.json`);
        const fileEN = path.join(TARGET_DIR_EN, `${item.slug}.json`);

        const pct = ((completedSet.size + generated) / symbols.length * 100).toFixed(1);
        console.log(`[${pct}%] ${i + 1}/${todo.length} — ${item.key} (${item.tr})`);

        try {
            // ── TR ──
            if (!fs.existsSync(fileTR)) {
                const trRaw = await callOpenAI(PROMPT_TR(item.tr));
                const jsonTR = JSON.parse(cleanJSON(trRaw));
                const trErrors = validateContent(jsonTR, 'tr');
                if (trErrors.length > 0) {
                    console.log(`  ⚠️ TR quality: ${trErrors.join(', ')}`);
                }
                fs.writeFileSync(fileTR, JSON.stringify(jsonTR, null, 2), 'utf8');
                console.log(`  ✅ TR (${JSON.stringify(jsonTR).length}b)`);
                await sleep(DELAY_BETWEEN_CALLS);
            }

            // ── EN ──
            if (!fs.existsSync(fileEN)) {
                const enRaw = await callOpenAI(PROMPT_EN(item.en));
                const jsonEN = JSON.parse(cleanJSON(enRaw));
                const enErrors = validateContent(jsonEN, 'en');
                if (enErrors.length > 0) {
                    console.log(`  ⚠️ EN quality: ${enErrors.join(', ')}`);
                }
                fs.writeFileSync(fileEN, JSON.stringify(jsonEN, null, 2), 'utf8');
                console.log(`  ✅ EN (${JSON.stringify(jsonEN).length}b)`);
                await sleep(DELAY_BETWEEN_CALLS);
            }

            generated++;
            progress.completed.push(item.key);
            if (generated % 5 === 0) saveProgress(progress);

        } catch (e) {
            failed++;
            console.error(`  ❌ ${e.message}`);
            progress.errors.push({ key: item.key, error: e.message, time: new Date().toISOString() });
            saveProgress(progress);
        }
    }

    saveProgress(progress);

    const elapsed = ((Date.now() - progress.startTime) / 1000 / 60).toFixed(1);
    console.log(`\n═══ COMPLETE ═══`);
    console.log(`Generated: ${generated}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total completed: ${progress.completed.length}/${symbols.length}`);
    console.log(`Time: ${elapsed} min`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
