/**
 * Keyword Index for Dream Search
 * Maps Turkish/English keywords to symbol slugs
 * 
 * When user searches "rüyamda yılan gördüm", we extract "yılan" and match to "snake"
 */

const dictionary = require('./source_dictionary');

// Build keyword index with translations
const keywordIndex = {
    // Turkish keywords -> slug
    'yılan': 'snake',
    'engerek': 'snake',
    'kobra': 'snake',
    'diş': 'teeth-falling-out',
    'dişler': 'teeth-falling-out',
    'dişler': 'teeth-falling-out',
    'düşmek': 'falling', // Fixed from teeth-falling-out
    'uçmak': 'flying',
    'uçma': 'flying',
    'ölüm': 'death',
    'ölü': 'death',
    'su': 'water',
    'deniz': 'ocean',
    'okyanus': 'ocean',
    'örümcek': 'spider',
    'köpek': 'dog',
    'köpeğ': 'dog', // Handle "köpeğim" (consonant softening)
    'kedi': 'cat',
    'bebek': 'baby',
    'ev': 'house',
    'araba': 'car',
    'balık': 'fish',
    'kuş': 'bird',
    'at': 'horse',
    'kurt': 'wolf',
    'ateş': 'fire',
    'yangın': 'fire',
    'kan': 'blood',
    'para': 'money',
    'düğün': 'wedding',
    'hamile': 'pregnancy',
    'aslan': 'lion',
    'ayı': 'bear',
    'köpekbalığı': 'shark',
    'fil': 'elephant',
    'ejderha': 'dragon',
    'hayalet': 'ghost',
    'zombi': 'zombie',
    'vampir': 'vampire',
    'şeytan': 'demon',
    'melek': 'angel',
    'anahtar': 'key',
    'kapı': 'door',
    'merdiven': 'stairs',
    'köprü': 'bridge',
    'dağ': 'mountain',
    'nehir': 'water',
    'yağmur': 'rain',
    'fırtına': 'storm',
    'fırtına': 'storm',
    'simsek': 'lightning',
    'kar': 'snow',
    'mezar': 'grave', // Custom file
    'mezarlık': 'grave',
    'tabut': 'coffin', // Custom file
    'cenaze': 'funeral', // Custom file
    'ölüm': 'dead-person', // Custom file
    'ölü': 'dead-person',
    'ceset': 'dead-person',
    'hayalet': 'ghost',
    'öldürmek': 'killing', // Custom file
    'cinayet': 'killing',
    'katil': 'killing',
    'gelinlik': 'wedding-dress', // Custom file
    'gelin': 'wedding-dress',
    'düğün': 'wedding',
    'evlilik': 'wedding',
    'hamile': 'pregnancy',
    'gebe': 'pregnancy',
    'bebek': 'baby',
    'doğum': 'baby',
    'wc': 'toilet', // Requested alias
    'tuvalet': 'toilet',
    'klozet': 'toilet',
    'ayakkabı': 'shoes',
    'pabuç': 'shoes',
    'saç': 'hair',
    'kıl': 'hair',
    'göz': 'eye',
    'gözler': 'eye',
    'gölge': 'shadow',
    'bıçak': 'knife',
    'silah': 'killing',
    'yara': 'wound',
    'ağlamak': 'crying',
    'eski sevgili': 'ex-partner', // Custom file
    'ex': 'ex-partner',
    'sevgili': 'ex-partner', // Weak match but useful
    'uzay': 'space', // Custom file
    'uzaylı': 'space',
    'alien': 'space',
    'koşmak': 'running',
    'yüzmek': 'swimming',
    'dans': 'dancing',
    'kavga': 'fighting',
    'savaş': 'fighting',
    'okul': 'school',
    'sınav': 'exam',
    'telefon': 'phone',
    'tren': 'train',
    'uçak': 'airplane',
    'gemi': 'boat',
    'hastane': 'hospital',
    'hapishane': 'prison',
    'mezarlık': 'graveyard',
    'cadı': 'witch',
    'büyücü': 'wizard',
    'kral': 'king',
    'kraliçe': 'queen',
    'çocuk': 'child',
    'anne': 'woman',
    'baba': 'man',
    'öpücük': 'kiss',
    'seks': 'sex',
    'çıplak': 'naked',
    'ayna': 'mirror',
    'saat': 'clock',
    'kitap': 'book',
    'yüzük': 'ring',
    'taç': 'crown',
    'altın': 'gold',
    'gümüş': 'silver',
    'elmas': 'diamond',
    'çiçek': 'flower',
    'ağaç': 'tree',
    'orman': 'forest',
    'bahçe': 'garden',
    'gökyüzü': 'flying',
    'bulut': 'cloud', // Remapped from flying to custom cloud.json
    'güneş': 'sun',
    'ay': 'moon',
    'yıldız': 'star',
    'gökkuşağı': 'rainbow',
    'deprem': 'earthquake',
    'sel': 'flood',
    'kasırga': 'tornado',
    'şimşek': 'lightning', // Added explicit mapping
    'yıldırım': 'lightning',
    'bıçak': 'knife',
    'silah': 'weapon', // Custom file
    'tabanca': 'weapon',
    'tüfek': 'weapon',
    'yara': 'wound',
    'kanat': 'wings', // Custom file
    'melek': 'angel',
    'şeytan': 'demon',
    'vampir': 'vampire',
    'zombi': 'zombie',
    'cadı': 'witch',
    'büyücü': 'wizard',
    'koşmak': 'running',
    'dans': 'dancing', // Custom file
    'tren': 'train', // Custom file
    'uçak': 'airplane', // Custom file
    'uçuş': 'airplane',
    'hastane': 'hospital', // Custom file
    'mağara': 'cave', // Custom file (Replaced Grave/Mezarlık which was done in Batch 9)
    'kral': 'king', // Custom file
    'kraliçe': 'queen', // Custom file
    'saat': 'clock', // Custom file
    'zaman': 'clock',
    'çiçek': 'flower', // Custom file
    'gül': 'flower',
    'papatya': 'flower',
    'bahçe': 'garden', // Custom file
};

// Add English keywords (symbol names and associations from dictionary)
for (const [symbol, data] of Object.entries(dictionary)) {
    const slug = symbol.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    // Add the symbol name itself
    keywordIndex[symbol.toLowerCase()] = slug;

    // Add associations
    for (const assoc of data.associations) {
        const assocLower = assoc.toLowerCase();
        if (!keywordIndex[assocLower]) {
            keywordIndex[assocLower] = slug;
        }
    }
}

module.exports = keywordIndex;

// Debug
if (require.main === module) {
    console.log('Sample keywords:');
    console.log('yılan ->', keywordIndex['yılan']);
    console.log('snake ->', keywordIndex['snake']);
    console.log('viper ->', keywordIndex['viper']);
    console.log('Total keywords:', Object.keys(keywordIndex).length);
}
