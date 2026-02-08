const fs = require('fs');
const path = require('path');
// Manual env parsing
function getEnv(key) {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
        if (match) {
            return match[1].trim();
        }
    }
    return process.env[key];
}

const OpenAI = require('openai');
const existingDict = require('./data/source_dictionary');

const openai = new OpenAI({
    apiKey: getEnv('OPENAI_API_KEY')
});

const OUTPUT_FILE = path.join(__dirname, 'data', 'batch_scenarios_list.json');

const rawList = [
    "Boş bir oda",
    "Yüzü olmayan insan",
    "Aynada kendini farklı görmek",
    "Aynanın kırılması",
    "Kapının aralık kalması",
    "Kapıyı açamamak",
    "Anahtarın çalışmaması",
    "Kilitli çekmece",
    "Çatı katı",
    "Bodrum",
    "Tünelin sonunu görememek",
    "Labirent",
    "Dar koridor",
    "Karanlık merdiven",
    "Sürekli aynı yere dönmek",
    "Saatin durması",
    "Telefonun çalışmaması",
    "Mesaj yazıp gönderememek",
    "İnternetin çekmemesi",
    "Kamera açılmaması",
    "Kaybolan ayakkabı (tek)",
    "Ayağında farklı ayakkabı olması",
    "Üzerine büyük gelen kıyafet",
    "Kıyafet bulamamak",
    "Çıplak yakalanmak ama kimsenin umursamaması",
    "Çıplak yakalanmak ve herkesin bakması",
    "Dişlerin dökülmesi",
    "Dişlerin ufalanması",
    "Saçın dökülmesi",
    "Yüzünün bozulması",
    "Kendi sesini duyamamak",
    "Konuşmak isteyip konuşamamak",
    "Bir şey söyleyince kimsenin duymaması",
    "Bağırdıkça sesin kısılması",
    "Birinin seni tanımaması",
    "Birinin seni görmezden gelmesi",
    "Kalabalığın içinde yalnız hissetmek",
    "Herkesin sana bakması",
    "Herkesin fısıldaşması",
    "Birinin adını hatırlayamamak",
    "Sürekli kaçmak ama yavaşlamak",
    "Koşmak isteyip koşamayacak kadar ağırlaşmak",
    "Takip edilmek ama kimin takip ettiğini görememek",
    "Saklanmak ama saklandığın yerin açıkta kalması",
    "Düşmek ama yere çarpmamak",
    "Uçmak ama kontrol edememek",
    "Suya girmek ama suyun sıcak/soğuk olmaması",
    "Bir şeyin “tanıdık” gelmesi ama hatırlayamamak",
    "Çok parlak bir ışık görmek",
    "Bir yerde “olman gerektiğini” bilmek ama nereye olduğunu bilmemek"
];

async function prepareList() {
    console.log("Translating list to English for Keys...");

    // We break into chunks if needed, but 50 is fine for one prompt
    const prompt = `
    I have a list of specific Turkish dream scenarios. 
    1. Translate each one to a SHORT, STANDARD ENGLISH KEY (2-5 words, Title Case).
    2. Example: "Boş bir oda" -> "Empty Room"
    3. Return a JSON array of objects: { "tr": "original turkish", "en": "English Translation" }
    
    List:
    ${JSON.stringify(rawList)}
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(completion.choices[0].message.content);
        const pairs = result.pairs || result.list || result.scenarios || Object.values(result)[0];

        // Filter duplicates against existing dict
        const existingKeys = new Set(Object.keys(existingDict));
        const finalList = [];

        pairs.forEach(p => {
            const key = p.en.toUpperCase().replace(/[^A-Z0-9]/g, ' ').trim().replace(/\s+/g, '_');
            if (existingKeys.has(key)) {
                console.log(`Skipping existing: ${key} (${p.tr})`);
            } else {
                finalList.push({ ...p, key });
            }
        });

        console.log(`Prepared ${finalList.length} new scenarios.`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalList, null, 2));
        console.log(`Saved to ${OUTPUT_FILE}`);

    } catch (e) {
        console.error(e);
    }
}

prepareList();
