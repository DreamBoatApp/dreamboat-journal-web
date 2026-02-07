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

// Common Turkish translations for dream symbols
const KNOWN_TRANSLATIONS = {
    "Rhino": "Gergedan",
    "Blue": "Mavi Renk",
    "Black": "Siyah Renk",
    "White": "Beyaz Renk",
    "Pink": "Pembe Renk",
    "Orange": "Turuncu Renk",
    "Cleaning": "Temizlik",
    "Cooking": "Yemek Pişirmek",
    "Dancing": "Dans Etmek",
    "Driving": "Araba Kullanmak",
    "Eating": "Yemek Yemek",
    "Praying": "Dua Etmek",
    "Repairing": "Tamir Etmek",
    "Traveling": "Seyahat Etmek",
    "Spaceship": "Uzay Gemisi",
    "Vacuum Cleaner": "Elektrik Süpürgesi",
    "Wheelchair": "Tekerlekli Sandalye",
    "Wheelbarrow": "El Arabası",
    "Calculator": "Hesap Makinesi",
    "Console": "Oyun Konsolu",
    "Ex-Partner": "Eski Sevgili",
    "Goal Post": "Kale Direği",
    "Bedroom": "Yatak Odası",
    "Band-Aid": "Yara Bandı",
    "Lunar Eclipse": "Ay Tutulması",
    "Northern Lights": "Kuzey Işıkları",
    "Paint Brush": "Boya Fırçası",
    "Carbon Paper": "Karbon Kağıdı",
    "Crutch": "Koltuk Değneği",
    "Ankle": "Ayak Bileği",
    "Zoo": "Hayvanat Bahçesi"
};

async function translateName(englishName) {
    // Check known translations first
    if (KNOWN_TRANSLATIONS[englishName]) {
        return KNOWN_TRANSLATIONS[englishName];
    }

    // Use AI for unknown translations
    const prompt = `Translate this English dream symbol name to Turkish. Return ONLY the Turkish translation, nothing else.
    
    English: "${englishName}"
    Turkish:`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 50
    });

    return completion.choices[0].message.content.trim().replace(/"/g, '');
}

function isEnglishName(name) {
    // Check if the name looks like English (contains only ASCII letters and common patterns)
    const turkishChars = /[çğıöşüÇĞİÖŞÜ]/;
    const commonEnglishPatterns = /^(The |A |An )|( the | a | an | of | in | on | at | to | for | with | by )/i;

    // If it has Turkish characters, it's probably already Turkish
    if (turkishChars.test(name)) {
        return false;
    }

    // Known English words that should be translated
    const englishWords = ['Rhino', 'Blue', 'Black', 'White', 'Pink', 'Orange', 'Cleaning', 'Cooking',
        'Dancing', 'Driving', 'Eating', 'Praying', 'Repairing', 'Traveling', 'Spaceship',
        'Vacuum', 'Wheelchair', 'Wheelbarrow', 'Calculator', 'Console', 'Partner', 'Goal',
        'Bedroom', 'Band-Aid', 'Lunar', 'Northern', 'Paint', 'Carbon', 'Crutch', 'Ankle', 'Zoo'];

    for (const word of englishWords) {
        if (name.includes(word)) {
            return true;
        }
    }

    return false;
}

async function fixLocalizedName(filename) {
    const trPath = path.join(TR_DIR, filename);

    try {
        const trRaw = await fs.readFile(trPath, 'utf-8');
        const trContent = JSON.parse(trRaw);

        const currentName = trContent.localizedName;

        if (!isEnglishName(currentName)) {
            // console.log(`   ⏭️ Skip: ${filename} - already Turkish`);
            return;
        }

        console.log(`\n🔄 Fixing: ${currentName} (${filename})`);

        const turkishName = await translateName(currentName);

        trContent.localizedName = turkishName;

        // Also fix title if it contains the English name
        if (trContent.title && trContent.title.includes(currentName)) {
            trContent.title = trContent.title.replace(currentName, turkishName);
        }

        // Fix seoDescription if needed
        if (trContent.seoDescription && trContent.seoDescription.includes(currentName)) {
            trContent.seoDescription = trContent.seoDescription.replace(new RegExp(currentName, 'g'), turkishName);
        }

        // Fix introduction if needed
        if (trContent.introduction && trContent.introduction.includes(currentName)) {
            trContent.introduction = trContent.introduction.replace(new RegExp(currentName, 'g'), turkishName);
        }

        // Fix cta if needed  
        if (trContent.cta && trContent.cta.includes(currentName)) {
            trContent.cta = trContent.cta.replace(new RegExp(currentName, 'g'), turkishName);
        }

        await fs.writeFile(trPath, JSON.stringify(trContent, null, 2));
        console.log(`   ✅ ${currentName} → ${turkishName}`);

    } catch (error) {
        console.error(`   ❌ Failed: ${filename} - ${error.message}`);
    }
}

async function main() {
    const args = process.argv.slice(2);

    if (args.length > 0) {
        let filename = args[0];
        if (!filename.endsWith('.json')) filename += '.json';
        await fixLocalizedName(filename);
    } else {
        const files = await fs.readdir(TR_DIR);
        const jsonFiles = files.filter(f => f.endsWith('.json'));
        console.log(`🔍 Scanning ${jsonFiles.length} files for English names...`);

        let fixedCount = 0;
        for (const file of jsonFiles) {
            const result = await fixLocalizedName(file);
            if (result !== undefined) fixedCount++;
        }

        console.log(`\n✅ Done! Fixed ${fixedCount} files.`);
    }
}

main();
