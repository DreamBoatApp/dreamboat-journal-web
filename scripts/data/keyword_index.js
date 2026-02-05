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
    'bulut': 'flying',
    'güneş': 'sun',
    'ay': 'moon',
    'yıldız': 'star',
    'gökkuşağı': 'rainbow',
    'deprem': 'earthquake',
    'sel': 'flood',
    'kasırga': 'tornado',
    'volkan': 'volcano',
    'mağara': 'cave',
    'labirent': 'labyrinth',
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
