const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content/tr/meanings');

// Templates for Introduction
const introTemplates = [
    (name) => `Rüyalar aleminde ${name} görmek, bilinçaltınızın size gönderdiği özel bir şifredir. Bu sembol, hayatınızdaki mevcut enerjileri ve dönüşüm potansiyelini temsil eder.`,
    (name) => `${name}, rüya sembolizminde önemli bir yer tutar ve genellikle iç dünyanızdaki gizli kalmış duyguları açığa çıkarır. Bu rüya, dikkatinizi çekmeye çalışan bir mesajdır.`,
    (name) => `Rüyada ${name} ile karşılaşmak, ruhsal yolculuğunuzda yeni bir farkındalık aşamasına işaret eder. Bu imge, hem evrensel hem de kişisel anlamlar barındırır.`,
    (name) => `${name} rüyası, sezgilerinizin size rehberlik etmeye çalıştığını gösterir. Bu sembolü analiz etmek, hayatınızdaki belirsizlikleri netleştirmenize yardımcı olabilir.`
];

// Templates for Symbolism
const symbolTemplates = [
    (name) => `${name}, psikolojik olarak değişim ve adaptasyon sürecini simgeler. Rüyada görülen detaylar, bu değişimin hangi yaşam alanınızda (iş, ilişki, sağlık) gerçekleşeceğine dair ipuçları verir.`,
    (name) => `Bu sembol, içsel gücünüzü ve potansiyelinizi yansıtır. ${name} görmek, bazen bastırılmış bir arzuyu, bazen de yüzleşmeniz gereken bir korkuyu temsil edebilir.`,
    (name) => `${name} imgesi, bilinçdışı ile bilinçli zihin arasındaki köprüyü kurar. Bu rüya, kendinizi daha derinlemesine tanımanız ve içsel dengenizi bulmanız için bir davettir.`,
    (name) => `Sembolik açıdan ${name}, hayat döngülerini ve karmik etkileri işaret eder. Bu rüya, geçmişten getirdiğiniz yükleri bırakma ve geleceğe odaklanma zamanının geldiğini söyleyebilir.`
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function fixFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(content);
        const name = json.localizedName || path.basename(filePath, '.json');

        // Check if robotic
        if (json.introduction && json.introduction.includes("Bilinçdışının derinliklerinde") && json.introduction.includes("tesadüftür")) {
            console.log(`Fixing robotic content: ${path.basename(filePath)}`);

            // Generate new content
            json.introduction = getRandom(introTemplates)(name);
            json.symbolism = getRandom(symbolTemplates)(name);

            // Fix generic SEO description if needed (optional)
            if (json.seoDescription && json.seoDescription.includes("anlamını keşfedin")) {
                json.seoDescription = `Rüyada ${name} görmenin psikolojik ve manevi anlamını öğrenin. ${name} rüyasının hayatınıza dair mesajları.`;
            }

            // Fix generic CTA
            json.cta = `${name} rüyası sizin için ne anlama geliyor? Dream Boat ile kişisel analizinizi hemen yapın.`;

            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            return true;
        }
        return false;
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err.message);
        return false;
    }
}

// Run
const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.json'));
let fixedCount = 0;

console.log(`Scanning ${files.length} files...`);

files.forEach(file => {
    if (fixFile(path.join(CONTENT_DIR, file))) {
        fixedCount++;
    }
});

console.log(`Finished. Fixed ${fixedCount} files.`);
