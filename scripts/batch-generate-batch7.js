const fs = require('fs');
const path = require('path');
const https = require('https');

// Robust Env Loading
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

if (!OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY not found.");
    process.exit(1);
}

const BATCH_LIST_PATH = path.join(__dirname, 'data', 'batch7_list.json');
const TARGET_DIR_TR = path.join(__dirname, '../content/tr/meanings');
const TARGET_DIR_EN = path.join(__dirname, '../content/en/meanings');

// Load List
const list = JSON.parse(fs.readFileSync(BATCH_LIST_PATH, 'utf8'));

// Helper: Call OpenAI
function generateContent(prompt) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        });

        const req = https.request({
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject(`API Error ${res.statusCode}: ${body}`);
                }
                const json = JSON.parse(body);
                resolve(json.choices[0].message.content);
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// Helper: Clean JSON
function cleanJSON(text) {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

// Prompts
const PROMPT_TR = (title) => `
Sen mistik, Jungian ve spiritüel bir rüya tabircisisin.
Aşağıdaki rüya sembolü için zengin, derinlikli ve SEO uyumlu bir JSON içeriği oluştur.

Sembol: "${title}"

JSON Şeması:
{
  "slug": "sembol-slug", (kebab-case, Türkçe)
  "title": "${title}",
  "meaning": "Bu sembolün genel, mistik ve psikolojik anlamı (en az 3 cümle).",
  "interpretations": {
    "psychological": "Psikolojik açıdan ne ifade eder?",
    "spiritual": "Spiritüel ve kozmik açıdan ne ifade eder?",
    "messengers": "Bu rüya size ne mesaj veriyor?"
  },
  "scenarios": [
    { "title": "Senaryo Başlığı", "description": "Detaylı açıklama" },
    { "title": "Senaryo Başlığı 2", "description": "Detaylı açıklama" }
  ],
  "keywords": ["anahtar", "kelime", "listesi"]
}

Kurallar:
1. Türkçe yaz.
2. Mistik ve bilge bir ton kullan.
3. Asla "Yapay zeka dili" kullanma (ör: "Özetle", "Sonuç olarak" deme).
4. Slug, başlığın Türkçe karakterlerden arındırılmış, tire ile ayrılmış halidir (ör: "Donan Kamera" -> "donan-kamera").
`;

const PROMPT_EN = (title) => `
You are a mystical, Jungian dream interpreter.
Create a rich, deep, and SEO-friendly JSON content for the following dream symbol.

Symbol: "${title}"

JSON Schema:
{
  "slug": "symbol-slug", (kebab-case, English)
  "title": "${title}",
  "meaning": "General mystical and psychological meaning (at least 3 sentences).",
  "interpretations": {
    "psychological": "Psychological significance",
    "spiritual": "Spiritual significance",
    "messengers": "What message is this dream sending?"
  },
  "scenarios": [
    { "title": "Scenario Title", "description": "Detailed description" },
    { "title": "Scenario 2", "description": "Detailed description" }
  ],
  "keywords": ["keyword", "list"]
}

Rules:
1. Write in English.
2. Use a mystical, wise tone.
3. Slug must be kebab-case version of title (e.g. "Frozen Camera" -> "frozen-camera").
`;

async function main() {
    console.log(`Starting Batch 7 Generation for ${list.length} items...`);

    for (const item of list) {
        const slugTR = item.tr.toLowerCase()
            .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

        const slugEN = item.en.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

        const fileTR = path.join(TARGET_DIR_TR, `${slugEN}.json`);
        const fileEN = path.join(TARGET_DIR_EN, `${slugEN}.json`);

        if (fs.existsSync(fileTR) && fs.existsSync(fileEN)) {
            console.log(`Skipping ${item.key} (Files exist)`);
            continue;
        }

        console.log(`Generating ${item.key}...`);

        try {
            // Generate TR
            if (!fs.existsSync(fileTR)) {
                const trContent = await generateContent(PROMPT_TR(item.tr));
                let jsonTR = JSON.parse(cleanJSON(trContent));
                // Ensure slug matches filename (English slug even for TR file)
                jsonTR.slug = slugEN;
                fs.writeFileSync(fileTR, JSON.stringify(jsonTR, null, 2));
                console.log(`  TR Done: ${slugEN}`);
            }

            // Generate EN
            if (!fs.existsSync(fileEN)) {
                const enContent = await generateContent(PROMPT_EN(item.en));
                let jsonEN = JSON.parse(cleanJSON(enContent));
                jsonEN.slug = slugEN;
                fs.writeFileSync(fileEN, JSON.stringify(jsonEN, null, 2));
                console.log(`  EN Done: ${slugEN}`);
            }

        } catch (e) {
            console.error(`  Error generating ${item.key}:`, e.message || e);
        }
    }
    console.log("Batch 7 Complete.");
}

main();
