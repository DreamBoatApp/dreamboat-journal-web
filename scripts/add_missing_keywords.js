const fs = require('fs');
const path = require('path');

const keywordIndexPath = path.join(__dirname, 'data/keyword_index.js');
const backupPath = path.join(__dirname, 'data/keyword_index.js.bak');

// Create backup
fs.copyFileSync(keywordIndexPath, backupPath);

const newKeywords = {
    // Foods
    'pizza': 'pizza',
    'doktor': 'doctor', 'hekim': 'doctor',
    'çikolata': 'chocolate',
    'hamburger': 'burger', 'burger': 'burger',
    'dondurma': 'ice-cream',
    'süt': 'milk',
    'karpuz': 'watermelon',
    'çilek': 'strawberry',
    'üzüm': 'grapes',
    'limon': 'lemon',
    'soğan': 'onion',
    'sarımsak': 'garlic',
    'patates': 'potato',
    'domates': 'tomato',
    'patlıcan': 'eggplant',
    'peynir': 'cheese',
    'tereyağı': 'butter', 'tereyağ': 'butter',
    'yoğurt': 'yogurt',
    'çorba': 'soup',
    'sandviç': 'sandwich',
    'erişte': 'noodles', 'makarna': 'noodles',

    // Body Parts
    'kulak': 'ear',
    'burun': 'nose',
    'ağız': 'mouth',
    'dil': 'tongue',
    'dudak': 'lips', 'dudaklar': 'lips',
    'boyun': 'neck',
    'omuz': 'shoulder',
    'kol': 'arm',
    'dirsek': 'elbow',
    'bilek': 'wrist',
    'parmak': 'finger',
    'başparmak': 'thumb',
    'diz': 'knee',
    'ayak bileği': 'ankle',
    'beyin': 'brain',

    // Animals
    'sincap': 'squirrel',
    'geyik': 'deer', 'ceylan': 'deer',
    'deve': 'camel',
    'zürafa': 'giraffe',
    'zebra': 'zebra',
    'penguen': 'penguin',
    'güvercin': 'pigeon',
    'martı': 'seagull',
    'leylek': 'stork',
    'yengeç': 'crab',
    'ahtapot': 'octopus',
    'denizanası': 'jellyfish',
    'kalamar': 'squid', 'mürekkep balığı': 'squid',
    'fok': 'seal',
    'mors': 'walrus',

    // Objects
    'sandalye': 'chair',
    'masa': 'table',
    'yatak': 'bed',
    'yastık': 'pillow',
    'battaniye': 'blanket', 'yorgan': 'blanket',
    'perde': 'curtain',
    'halı': 'carpet',
    'ayna': 'mirror',
    'saat': 'clock',
    'lamba': 'lamp', 'ışık': 'lamp',
    'mum': 'candle',
    'vazo': 'vase',
    'kase': 'bowl', 'çanak': 'bowl',
    'kaşık': 'spoon',
    'çatal': 'fork',
    'bıçak': 'knife',

    // Professions
    'öğretmen': 'teacher', 'hoca': 'teacher',
    'polis': 'police', 'memur': 'police',
    'asker': 'soldier',
    'hemşire': 'nurse',
    'dişçi': 'dentist', 'diş hekimi': 'dentist',
    'hakim': 'judge', 'yargıç': 'judge',
    'avukat': 'lawyer',
    'mühendis': 'engineer',
    'mimar': 'architect',
    'ressam': 'artist', 'sanatçı': 'artist',
    'müzisyen': 'musician', 'çalgıcı': 'musician',
    'oyuncu': 'actor', 'aktör': 'actor', 'aktris': 'actor',

    // Nature & Places
    'dağ': 'mountain',
    'vadi': 'valley',
    'mağara': 'cave',
    'orman': 'forest',
    'çöl': 'desert',
    'ada': 'island',
    'plaj': 'beach', 'sahil': 'beach', 'kumsal': 'beach',
    'nehir': 'river', 'ırmak': 'river',
    'göl': 'lake',
    'şelale': 'waterfall',
    'yanardağ': 'volcano', 'volkan': 'volcano',
    'bahçe': 'garden',
    'park': 'park',
    'köprü': 'bridge',
    'kale': 'castle', 'şato': 'castle', 'hisar': 'castle',
    'kule': 'tower',
    'harabe': 'ruins', 'yıkıntı': 'ruins',
    'köy': 'village',
    'şehir': 'city', 'kent': 'city',
    'sokak': 'street', 'cadde': 'street',
    'yol': 'road',
    'koridor': 'corridor'
};

let content = fs.readFileSync(keywordIndexPath, 'utf-8');
const lastBraceIndex = content.lastIndexOf('};');

if (lastBraceIndex === -1) {
    console.error("Could not find closing brace in keyword_index.js");
    process.exit(1);
}

let newEntries = "\n    // Batch 26 - Manual Updates\n";
for (const [key, slug] of Object.entries(newKeywords)) {
    // Basic check to see if key already exists to avoid duplicates (naive check)
    // We quote the key to be safe
    if (!content.includes(`'${key}':`)) {
        newEntries += `    '${key}': '${slug}',\n`;
    }
}

const newContent = content.slice(0, lastBraceIndex) + newEntries + content.slice(lastBraceIndex);

fs.writeFileSync(keywordIndexPath, newContent, 'utf-8');
console.log("Successfully added new keywords to index.");
