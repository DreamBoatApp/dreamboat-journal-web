const fs = require('fs');
const dir = 'content/tr/meanings';

const FIXES = {
    // ALL CAPS -> Proper case
    'accompany': 'Eşlik',
    'apartment': 'Daire (Ev)',
    'apples': 'Elmalar',
    'atm': 'ATM',
    'balloon': 'Balon',
    'buddy': 'Dost',
    'bungalow': 'Bungalov',
    'cavern': 'Kovuk',
    'cemetery': 'Mezarlık',
    'chili': 'Acı Biber',
    'cookies': 'Kurabiyeler',
    'dungeon': 'Zindan',
    'ecg': 'EKG',
    'exboyfriend': 'Eski Erkek Arkadaş',
    'exgirlfriend': 'Eski Kız Arkadaş',
    'expartner': 'Eski Ortak',
    'fair': 'Panayır',
    'façade': 'Cephe',
    'futuristic': 'Gelecekçi',
    'garbage': 'Çöp (Atık)',
    'harbor': 'Liman',
    'headphone': 'Kulaklık (Tek)',
    'juice': 'Meyve Suyu',
    'lab': 'Laboratuvar',
    'monastery': 'Manastır',
    'number': 'Numara',
    'nuts': 'Kuruyemiş',
    'oldfriend': 'Eski Arkadaş',
    'olives': 'Zeytinler',
    'pan': 'Tava',
    'pickles': 'Turşular',
    'pregnant': 'Hamile',
    'ranch': 'Çiftlik Arazisi',
    'salad': 'Salata',
    'sitter': 'Bakıcı',
    'storage': 'Depo',
    'trainstation': 'Tren Garı',
    'turkishdelight': 'Türk Lokumu',
    'tv': 'Televizyon (TV)',
    'twin': 'İkiz',
    'vacuum': 'Elektrikli Süpürge',
    'venue': 'Mekân',

    // CamelCase -> Proper spacing
    'birthday': 'Doğum Günü',
    'bokchoy': 'Pak Çoy',
    'brother': 'Erkek Kardeş',
    'casserole': 'Güveç',
    'coconut': 'Hindistan Cevizi',
    'cookbook': 'Yemek Tarifleri',
    'cutlery': 'Çatal Bıçak',
    'cuttingboard': 'Kesme Tahtası',
    'deadline': 'Son Tarih',
    'disappointment': 'Hayal Kırıklığı',
    'dreaming': 'Hayal Kurma',
    'feedback': 'Geri Bildirim',
    'fired': 'İşten Çıkarma',
    'heartbeat': 'Kalp Atışı',
    'kitchenaid': 'Mutfak Aleti',
    'locust': 'Çekirge',
    'measuringcup': 'Ölçü Kabı',
    'retreat': 'Geri Çekilme',
    'schoolmate': 'Sınıf Arkadaşı',
    'sister': 'Kız Kardeş',
    'steamer': 'Buharda Pişirici',
    'stepmother': 'Üvey Anne',
    'stepmotherinlaw': 'Üvey Kayınvalide',
    'stepson': 'Üvey Oğul',
    'survivor': 'Hayatta Kalan',
    'vitals': 'Hayati Belirtiler',
    'wifi': 'WiFi',

    // Case-only dupes
    'diadem': 'Taç Diadem',
    'epee': 'Meç',
    'maelstrom': 'Anafor',
    'marionette': 'Kukla İpli',
    'notepad': 'Bloknot',
    'pinnacle': 'Doruk Nokta',
    'nut': 'Fındık',
    'mandible': 'Alt Çene',
};

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let fixed = 0;
for (const [slug, newName] of Object.entries(FIXES)) {
    const p = dir + '/' + slug + '.json';
    if (!fs.existsSync(p)) { console.log('Not found:', slug); continue; }
    const c = JSON.parse(fs.readFileSync(p));
    const oldName = c.localizedName;
    c.localizedName = newName;
    c.title = 'Rüyada ' + newName + ' Görmek: Anlamı ve Yorumu';

    // Fix body text
    const fields = ['introduction', 'symbolism', 'cosmicAnalysis', 'seoDescription'];
    for (const f of fields) {
        if (!c[f]) continue;
        if (c[f].includes(oldName)) {
            c[f] = c[f].split(oldName).join(newName);
        }
        // Also handle lowercase old
        const oldLow = oldName.toLocaleLowerCase('tr');
        if (oldLow !== oldName && c[f].includes(oldLow)) {
            c[f] = c[f].split(oldLow).join(newName.toLocaleLowerCase('tr'));
        }
    }
    if (c.commonScenarios) {
        c.commonScenarios = c.commonScenarios.map(s => {
            if (s.includes(oldName)) s = s.split(oldName).join(newName);
            const oldLow = oldName.toLocaleLowerCase('tr');
            if (oldLow !== oldName && s.includes(oldLow)) s = s.split(oldLow).join(newName.toLocaleLowerCase('tr'));
            return s;
        });
    }

    fs.writeFileSync(p, JSON.stringify(c, null, 2));
    fixed++;
    console.log(slug + ': ' + oldName + ' -> ' + newName);
}
console.log('Fixed:', fixed);

// Verify
let allCaps = 0, camel = 0;
const nameMap = {};
fs.readdirSync(dir).filter(f => f.endsWith('.json')).forEach(f => {
    const c = JSON.parse(fs.readFileSync(dir + '/' + f));
    const n = c.localizedName || '';
    if (n.length >= 3 && n === n.toLocaleUpperCase('tr') && n !== n.toLocaleLowerCase('tr') && !['ATM', 'EKG', 'WiFi'].includes(n)) allCaps++;
    if (/[a-zçğıöşü][A-ZÇĞİÖŞÜ]/.test(n) && n !== 'WiFi') camel++;
    const lower = n.toLocaleLowerCase('tr');
    if (!nameMap[lower]) nameMap[lower] = [];
    nameMap[lower].push({ slug: f.replace('.json', ''), name: n });
});
const cd = Object.values(nameMap).filter(v => v.length > 1 && new Set(v.map(x => x.name)).size > 1);
console.log('Remaining ALL CAPS:', allCaps);
console.log('Remaining CamelCase:', camel);
console.log('Remaining case dupes:', cd.length);
if (cd.length > 0) cd.forEach(g => console.log('  ' + g.map(x => x.slug + '=' + x.name).join(' | ')));
