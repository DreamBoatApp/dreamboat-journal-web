const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

// Manual .env loading
try {
    const envPath = path.join(__dirname, '../.env.local');
    const envContent = require('fs').readFileSync(envPath, 'utf-8');
    const match = envContent.match(/OPENAI_API_KEY=(sk-proj-[a-zA-Z0-9\-_]+)/);
    if (match) {
        process.env.OPENAI_API_KEY = match[1];
    }
} catch (e) { console.error("Could not read .env.local manually"); }

const apiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : null;

if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY is missing via .env.local');
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

const TR_DIR = path.join(__dirname, '../content/tr/meanings');

// Known English-to-Turkish translations for dream symbols
const TRANSLATIONS = {
    "rhino": "gergedan",
    "Rhino": "Gergedan",
    "Black cat": "Siyah kedi",
    "black cat": "siyah kedi",
    "White wolf": "Beyaz kurt",
    "white wolf": "beyaz kurt",
    "Black dog": "Siyah köpek",
    "black dog": "siyah köpek",
    "White cat": "Beyaz kedi",
    "white cat": "beyaz kedi",
    "Black bear": "Siyah ayı",
    "black bear": "siyah ayı",
    "Zoo": "Hayvanat bahçesi",
    "Rhino'nun": "Gergedanın",
    "rinoya": "gergedana",
    "Rhinonun": "Gergedanın",
    "Black Cat": "Siyah Kedi",
    "White Wolf": "Beyaz Kurt",
    "Black Dog": "Siyah Köpek",
    "Black Bear": "Siyah Ayı",
    "White Cat": "Beyaz Kedi",
};

async function fixFileContent(filename) {
    const filePath = path.join(TR_DIR, filename);

    try {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const content = JSON.parse(rawContent);

        const localizedName = content.localizedName;
        const slug = filename.replace('.json', '');

        // Get the English name from the slug
        const englishName = slug.replace(/-/g, ' ');
        const capitalizedEnglish = englishName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // Check if content has any English references that should be Turkish
        let contentStr = JSON.stringify(content);
        let hasEnglishRefs = false;

        // Check for common English patterns
        const englishPatterns = [capitalizedEnglish, englishName];
        for (const pattern of englishPatterns) {
            if (contentStr.toLowerCase().includes(pattern.toLowerCase()) &&
                pattern.toLowerCase() !== localizedName.toLowerCase()) {
                hasEnglishRefs = true;
                break;
            }
        }

        if (!hasEnglishRefs) {
            return false; // No fixes needed
        }

        console.log(`\n🔄 Fixing: ${filename} (${localizedName})`);

        // Use AI to fix the content
        const prompt = `Bu Türkçe rüya sembolü içeriğinde İngilizce kelimeler kalmış. Tüm İngilizce kelimeleri Türkçe karşılıklarıyla değiştir.

Sembol adı: "${localizedName}"
İngilizce karşılığı: "${capitalizedEnglish}"

Mevcut içerik:
${JSON.stringify(content, null, 2)}

KURALLAR:
1. Tüm "${capitalizedEnglish}" ve "${englishName}" kelimelerini "${localizedName}" ile değiştir
2. İngilizce özel isimlerin Türkçe gramere uygun hallerini kullan (örn: "Rhino'nun" -> "Gergedanın")
3. JSON formatını koru
4. Sadece düzeltilmiş JSON döndür, başka açıklama ekleme

Düzeltilmiş JSON:`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        let fixedContent = completion.choices[0].message.content.trim();

        // Clean up response
        if (fixedContent.startsWith('```json')) {
            fixedContent = fixedContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (fixedContent.startsWith('```')) {
            fixedContent = fixedContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        // Parse and validate
        const parsedContent = JSON.parse(fixedContent);

        await fs.writeFile(filePath, JSON.stringify(parsedContent, null, 2));
        console.log(`   ✅ Fixed!`);
        return true;

    } catch (error) {
        console.error(`   ❌ Failed: ${filename} - ${error.message}`);
        return false;
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length > 0) {
        // Single file mode
        let filename = args[0];
        if (!filename.endsWith('.json')) filename += '.json';
        await fixFileContent(filename);
    } else {
        // Batch mode - find files with potential English references
        const files = await fs.readdir(TR_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));

        console.log(`🔍 Scanning ${jsonFiles.length} files for English text in Turkish content...`);

        let fixedCount = 0;
        for (const file of jsonFiles) {
            const result = await fixFileContent(file);
            if (result) fixedCount++;
        }

        console.log(`\n✅ Done! Fixed ${fixedCount} files.`);
    }
}

main();
