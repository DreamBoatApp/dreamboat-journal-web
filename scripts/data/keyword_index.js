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
    // Batch 11
    'fil': 'elephant',
    'kaplan': 'tiger', // Custom file (mapped to 'tiger')
    'yunus': 'dolphin',
    'balina': 'whale',
    'tavşan': 'rabbit',
    'arı': 'bee',
    'kelebek': 'butterfly',
    'karınca': 'ant',
    'yarasa': 'bat',
    'baykuş': 'owl',
    // Batch 12 (Home & Daily Life - 20 items)
    'yol': 'road',
    'yemek': 'food',
    'ekmek': 'bread',
    'süt': 'milk',
    'kıyafet': 'clothes',
    'giysi': 'clothes',
    'elbise': 'clothes',
    'yatak': 'bed',
    'banyo': 'bathroom',
    'mutfak': 'kitchen',
    'pencere': 'window',
    'cam': 'window',
    'duvar': 'wall',
    'sandalye': 'chair',
    'koltuk': 'chair',
    'masa': 'table',
    'oda': 'room',
    'bodrum': 'basement',
    'çatı': 'roof',
    'halı': 'carpet',
    'lamba': 'lamp',
    'ışık': 'lamp',
    'mum': 'candle',
    'çanta': 'bag',
    'şapka': 'hat',

    // Batch 13: Colors, Numbers, People, Body, Nature, Animals (50 items)
    'beyaz': 'white', 'ak': 'white',
    'siyah': 'black', 'kara': 'black',
    'kırmızı': 'red', 'al': 'red',
    'mavi': 'blue',
    'yeşil': 'green',
    'sarı': 'yellow',
    'mor': 'purple',
    'bir': 'one', '1': 'one',
    'iki': 'two', '2': 'two',
    'üç': 'three', '3': 'three',
    'polis': 'police',
    'asker': 'soldier', 'komutan': 'soldier',
    'doktor': 'doctor', 'hekim': 'doctor',
    'öğretmen': 'teacher', 'hoca': 'teacher',
    'öğrenci': 'student', 'talebe': 'student',
    'hırsız': 'thief',
    'düşman': 'enemy',
    'arkadaş': 'friend', 'dost': 'friend',
    'yaşlı': 'elder', 'ihtiyar': 'elder',
    'yabancı': 'stranger',
    'göz': 'eye',
    'el': 'hand',
    'ayak': 'foot',
    'baş': 'head', 'kafa': 'head',
    'kalp': 'heart', 'yürek': 'heart',
    'yüz': 'face', 'surat': 'face',
    'kulak': 'ear',
    'burun': 'nose',
    'parmak': 'finger',
    'kan': 'blood',
    'ağaç': 'tree',
    'orman': 'forest',
    'nehir': 'river', 'ırmak': 'river',
    'göl': 'lake',
    'dağ': 'mountain',
    'taş': 'stone',
    'çamur': 'mud',
    'kum': 'sand',
    'rüzgar': 'wind', 'yel': 'wind',
    'gökyüzü': 'sky', 'gök': 'sky',
    'ayı': 'bear',
    'aslan': 'lion',
    'kurt': 'wolf',
    'tilki': 'fox',
    'domuz': 'pig',
    'inek': 'cow',
    'koyun': 'sheep',
    'tavuk': 'chicken', 'horoz': 'chicken',
    'maymun': 'monkey',
    'örümcek': 'spider',

    // Batch 15: Animals, Nature, Places, Body II, Valuables (50 items)
    'köpek': 'dog',
    'kedi': 'cat',
    'at': 'horse',
    'yılan': 'snake',
    'fare': 'mouse',
    'kuş': 'bird',
    'kartal': 'eagle',
    'güvercin': 'pigeon',
    'akrep': 'scorpion',
    'sinek': 'fly',

    'yağmur': 'rain',
    'kar': 'snow',
    'güneş': 'sun',
    'şimşek': 'lightning',
    'fırtına': 'storm',
    'sis': 'fog',
    'gökkuşağı': 'rainbow',
    'sel': 'flood',
    'deprem': 'earthquake',
    'yangın': 'fire',

    'okul': 'school',
    'cami': 'mosque',
    'mezarlık': 'graveyard',
    'hapishane': 'prison',
    'saray': 'palace',
    'çöl': 'desert',
    'deniz': 'ocean',
    'tuvalet': 'toilet',
    'hastane': 'hospital',
    'pazar': 'market',

    'diş': 'teeth', // Updated from teeth-falling-out
    'diş dökülmesi': 'teeth-falling-out',
    'saç': 'hair',
    'tırnak': 'nail-body',
    'sakal': 'beard',
    'dil': 'tongue',
    'çıplaklık': 'naked', 'çıplak': 'naked',
    'ağız': 'mouth',
    'mide': 'stomach',
    'sırt': 'back-body',
    'kemik': 'skeleton',

    'altın': 'gold',
    'para': 'money',
    'gümüş': 'silver',
    'elmas': 'diamond',
    'yüzük': 'ring',
    'bilezik': 'bracelet',
    'kolye': 'necklace',
    'cüzdan': 'wallet',
    'hediye': 'gift',
    'define': 'treasure',

    // Batch 14: Objects, Transport, Food, Family, Actions (50 items)
    'anahtar': 'key',
    'kapı': 'door',
    'ayna': 'mirror',
    'makas': 'scissors',
    'yastık': 'pillow',
    'şemsiye': 'umbrella',
    'telefon': 'phone',
    'kitap': 'book',
    'kalem': 'pen',
    'kutu': 'box',
    'araba': 'car', 'otomobil': 'car',
    'otobüs': 'bus',
    'kamyon': 'truck', 'tır': 'truck',
    'bisiklet': 'bicycle',
    'tekne': 'boat', 'kayık': 'boat',
    'gemi': 'ship', 'vapur': 'ship',
    'köprü': 'bridge',
    'asansör': 'elevator',
    'merdiven': 'stairs', 'basamak': 'stairs',
    'bavul': 'suitcase', 'valiz': 'suitcase',
    'su': 'water',
    'et': 'meat',
    'balık': 'fish',
    'elma': 'apple',
    'üzüm': 'grapes',
    'yumurta': 'egg',
    'bal': 'honey',
    'kahve': 'coffee',
    'çay': 'tea',
    'tuz': 'salt',
    'anne': 'mother', 'ana': 'mother',
    'baba': 'father',
    'çocuk': 'child', 'evlat': 'child',
    'kardeş': 'sibling', 'abi': 'sibling', 'abla': 'sibling',
    'sevgili': 'partner', 'aşk': 'partner',
    'gelin': 'bride',
    'damat': 'groom',
    'kaynana': 'mother_in_law',
    'komşu': 'neighbor',
    'patron': 'boss',
    'koşmak': 'running',
    'uçmak': 'flying',
    'düşmek': 'falling',
    'yüzmek': 'swimming',
    'ağlamak': 'crying',
    'gülmek': 'laughing',
    'öpmek': 'kissing',
    'sarılmak': 'hugging',
    'yıkanmak': 'washing',
    'temizlik': 'cleaning',

    // Batch 17
    'Zürafa': 'giraffe',
    'Zebra': 'zebra',
    'Timsah': 'crocodile',
    'Kaplumbağa': 'turtle',
    'Kurbağa': 'frog',
    'Salyangoz': 'snail',
    'Kirpi': 'hedgehog',
    'Köpekbalığı': 'shark',
    'Ahtapot': 'octopus',
    'Yengeç': 'crab',
    'Deniz Anası': 'jellyfish',
    'Penguen': 'penguin',
    'Fok': 'seal',
    'Martı': 'seagull',
    'Leylek': 'stork',
    'Geyik': 'deer',
    'Deve': 'camel',
    'Eşek': 'donkey',
    'Keçi': 'goat',
    'Sincap': 'squirrel',
    'Ekmek': 'bread',
    'Süt': 'milk',
    'Şarap': 'wine',
    'Çikolata': 'chocolate',
    'Pasta': 'cake',
    'Dondurma': 'ice-cream',
    'Çorba': 'soup',
    'Pirinç': 'rice',
    'Makarna': 'pasta',
    'Pizza': 'pizza',
    'Hamburger': 'hamburger',
    'Bira': 'beer',
    'Şeker': 'sugar',
    'Un': 'flour',
    'Peynir': 'cheese',
    'Zeytin': 'olive',
    'Domates': 'tomato',
    'Patates': 'potato',
    'Soğan': 'onion',
    'Sarımsak': 'garlic',
    'Ay Tutulması': 'lunar-eclipse',
    'Güneş Tutulması': 'solar-eclipse',
    'Kuyruklu Yıldız': 'comet',
    'Kara Delik': 'black-hole',
    'Uzay Gemisi': 'spaceship',
    'Kuzey Işıkları': 'northern-lights',
    'Kasırga': 'hurricane',
    'Hortum': 'tornado',
    'Çığ': 'avalanche',
    'Tsunami': 'tsunami',
    'Krater': 'crater',
    'Kumsal': 'beach',
    'Meteor': 'meteor',
    'Çiçek Bahçesi': 'flower-garden',
    'Gül': 'rose',
    'Lale': 'tulip',
    'Papatya': 'daisy',
    'Kaktüs': 'cactus',
    'Ağaç Kökü': 'tree-roots',
    'Yaprak': 'leaf',
    'Dalmak': 'diving',
    'Boğulmak': 'drowning',
    'Kaçmak': 'escaping',
    'Kovalanmak': 'chased',
    'Saklanmak': 'hiding',
    'Aramak': 'searching',
    'Bulmak': 'finding',
    'Kaybetmek': 'losing',
    'Çalmak': 'stealing',
    'Vermek': 'giving',
    'Almak': 'receiving',
    'Satmak': 'selling',
    'Satın Almak': 'buying',
    'Yazmak': 'writing',
    'Okumak': 'reading',
    'Boyamak': 'painting',
    'Tamir Etmek': 'repairing',
    'Beklemek': 'waiting',
    'Uyanmak': 'waking-up',
    'Dua Etmek': 'praying',
    'Korku': 'fear',
    'Sevinç': 'joy',
    'Öfke': 'anger',
    'Kıskançlık': 'jealousy',
    'Utanç': 'shame',
    'Gurur': 'pride',
    'Aşk': 'love',
    'Nefret': 'hate',
    'Özlem': 'longing',
    'Yalnızlık': 'loneliness',
    'Başarı': 'success',
    'Başarısızlık': 'failure',
    'Zenginlik': 'wealth',
    'Fakirlik': 'poverty',
    'Hastalık': 'sickness',
    'Şifa': 'healing',
    'Kaza': 'accident',
    'Şans': 'luck',
    'Cennet': 'heaven',
    'Cehennem': 'hell',

    // Batch 18 (100 items - Professions II, Transport, Medical, Kitchen, Mixed)
    // Group 1: Professions
    'Avukat': 'lawyer',
    'Hakim': 'judge',
    'Hemşire': 'nurse',
    'Dişçi': 'dentist',
    'Mühendis': 'engineer',
    'Mimar': 'architect',
    'Berber': 'barber',
    'Terzi': 'tailor',
    'Kasap': 'butcher',
    'Marangoz': 'carpenter',
    'Bahçıvan': 'gardener',
    'İtfaiyeci': 'firefighter',
    'Postacı': 'postman',
    'Garson': 'waiter',
    'Sekreter': 'secretary',
    'Sanatçı': 'artist',
    'Sporcu': 'athlete',
    'Şoför': 'driver',
    'Hizmetçi': 'maid',
    'Dilenci': 'beggar',

    // Group 2: Transport
    'Uçak': 'airplane',
    'Tren': 'train',
    'Metro': 'subway',
    'Tramvay': 'tram',
    'Taksi': 'taxi',
    'Motosiklet': 'motorcycle',
    'Ambulans': 'ambulance',
    'İtfaiye Aracı': 'fire-truck',
    'Traktör': 'tractor',
    'Balon': 'balloon',
    'Paraşüt': 'parachute',
    'Liman': 'port',
    'Havalimanı': 'airport',
    'İstasyon': 'station',
    'Trafik': 'traffic',
    'Yol Ayrımı': 'crossroads',
    'Otogar': 'bus-terminal',
    'Benzinlik': 'gas-station',
    'Direksiyon': 'steering-wheel',
    'Vagon': 'wagon',

    // Group 3: Medical
    'Ameliyat': 'surgery',
    'İlaç': 'medicine',
    'Şırınga': 'syringe',
    'Kanama': 'bleeding',
    'Sargı Bezi': 'bandage',
    'Eczane': 'pharmacy',
    'Tekerlekli Sandalye': 'wheelchair',
    'Koltuk Değneği': 'crutch',
    'Akciğer': 'lungs',
    'Beyin': 'brain',
    'Bağırsak': 'intestines',
    'Böbrek': 'kidney',
    'Deri': 'skin',
    'Ter': 'sweat',
    'Zayıflık': 'thinness',
    'Şişmanlık': 'obesity',
    'Ateş': 'fever',
    'Öksürük': 'cough',
    'Bayılmak': 'fainting',
    'Yara Bandı': 'band-aid',

    // Group 4: Kitchen & Household
    'Bardak': 'cup',
    'Tabak': 'plate',
    'Çatal': 'fork',
    'Bıçak': 'knife',
    'Kaşık': 'spoon',
    'Tencere': 'pot',
    'Tava': 'pan',
    'Tepsi': 'tray',
    'Sürahi': 'pitcher',
    'Şişe': 'bottle',
    'Buzdolabı': 'fridge',
    'Çamaşır Makinesi': 'washing-machine',
    'Bulaşık Makinesi': 'dishwasher',
    'Fırın': 'oven',
    'Ütü': 'iron-appliance',
    'Süpürge': 'vacuum-cleaner',
    'Klima': 'air-conditioner',
    'Avize': 'chandelier',
    'Perde': 'curtain',
    'Yorgan': 'quilt',

    // Group 5: Mixed
    'Ahır': 'barn',
    'Kuyu': 'well',
    'Mahzen': 'cellar',
    'Labirent': 'labyrinth',
    'Harabe': 'ruins',
    'Kale': 'castle',
    'Kule': 'tower',
    'Kasaba': 'town',
    'Şehir': 'city',
    'Çukur': 'pit',
    'Kaybolmak': 'getting-lost',
    'Bayram': 'festival',
    'Kilit': 'lock',
    'Harita': 'map',
    'Pusula': 'compass',
    'Pasaport': 'passport',
    'Bilet': 'ticket',
    'Sırt Çantası': 'backpack',
    'Oyuncak': 'toy',
    'Mektup': 'letter',
    // Group 1: Professions & Myth
    'çiftçi': 'farmer',
    'aşçı': 'chef',
    'pilot': 'pilot',
    'oyuncu': 'actor',
    'mahkum': 'prisoner',
    'genç': 'teenager',
    'ikizler': 'twins',
    'yetim': 'orphan',
    'deniz kızı': 'mermaid',
    'tek boynuzlu at': 'unicorn',
    'peri': 'fairy',
    'ejderha': 'dragon',
    'anka kuşu': 'phoenix',
    'kurt adam': 'werewolf',
    'uzaylı': 'alien',
    'dev': 'giant',
    'kukla': 'puppet',
    'robot': 'robot',
    'ruh': 'spirit',
    'piyano': 'piano',
    // Group 2: Music & Household
    'gitar': 'guitar',
    'keman': 'violin',
    'flüt': 'flute',
    'trompet': 'trumpet',
    'davul': 'drum',
    'şarkı söylemek': 'singing',
    'nota': 'musical-note',
    'müzik': 'music',
    'koro': 'choir',
    'süpürge': 'broom',
    'kürek': 'shovel',
    'balta': 'axe',
    'çekiç': 'hammer',
    'iğne': 'needle',
    'ip': 'rope',
    'ağ': 'net',
    'zincir': 'chain',
    'vazo': 'vase',
    'musluk': 'faucet',
    'mont': 'coat',
    // Group 3: Clothing & Tech
    'eldiven': 'gloves',
    'gözlük': 'glasses',
    'kemer': 'belt',
    'kravat': 'tie',
    'atkı': 'scarf',
    'çorap': 'socks',
    'iç çamaşırı': 'underwear',
    'pijama': 'pyjamas',
    'üniforma': 'uniform',
    'bilgisayar': 'computer',
    'klavye': 'keyboard',
    'televizyon': 'television',
    'kamera': 'camera',
    'radyo': 'radio',
    'internet': 'internet',
    'şifre': 'password',
    'pil': 'battery',
    'alarm': 'alarm',
    'helikopter': 'helicopter',
    'yanardağ': 'volcano',
    // Group 4: Nature & Places
    'şelale': 'waterfall',
    'bataklık': 'swamp',
    'uçurum': 'cliff',
    'vadi': 'valley',
    'ada': 'island',
    'çiftlik': 'farm',
    'park': 'park',
    'tünel': 'tunnel',
    'otel': 'hotel',
    'restoran': 'restaurant',
    'kütüphane': 'library',
    'tiyatro': 'theater',
    'dükkan': 'shop',
    'kilise': 'church',
    'fabrika': 'factory',
    'müze': 'museum',
    'stadyum': 'stadium',
    'köy': 'village',
    'pembe': 'pink',
    'turuncu': 'orange-color',
    // Group 5: Colors, Materials & Others
    'kahverengi': 'brown',
    'gri': 'grey',
    'demir': 'iron',
    'bakır': 'copper',
    'bronz': 'bronze',
    'cam': 'glass',
    'tahta': 'wood',
    'plastik': 'plastic',
    'tırmanmak': 'climbing',
    'kusmak': 'vomiting',
    'doğum': 'birth',
    'yara izi': 'scar',
    'dövme': 'tattoo',
    'kör': 'blind',
    'sağır': 'deaf',
    'fermuar': 'zipper',
    'cep': 'pocket',
    'çöp': 'trash',
    'şemsiye': 'umbrella',
    'merdiven': 'stairs',

    // Batch 19 & New Discoveries
    'alley': 'alley',
    'altar': 'altar',
    'anchor': 'anchor',
    'ancient': 'ancient',
    'anten': 'antenna',
    'okçuluk': 'archery',
    'attacking-angel': 'attacking-angel',
    'attacking-baby': 'attacking-baby',
    'attacking-bear': 'attacking-bear',
    'attacking-bird': 'attacking-bird',
    'attacking-blood': 'attacking-blood',
    'attacking-bridge': 'attacking-bridge',
    'attacking-car': 'attacking-car',
    'attacking-cat': 'attacking-cat',
    'attacking-crying': 'attacking-crying',
    'attacking-dancing': 'attacking-dancing',
    'attacking-death': 'attacking-death',
    'attacking-demon': 'attacking-demon',
    'attacking-dog': 'attacking-dog',
    'attacking-door': 'attacking-door',
    'attacking-dragon': 'attacking-dragon',
    'attacking-elephant': 'attacking-elephant',
    'attacking-fighting': 'attacking-fighting',
    'attacking-fire': 'attacking-fire',
    'attacking-fish': 'attacking-fish',
    'attacking-flying': 'attacking-flying',
    'attacking-ghost': 'attacking-ghost',
    'attacking-horse': 'attacking-horse',
    'attacking-house': 'attacking-house',
    'attacking-key': 'attacking-key',
    'attacking-knife': 'attacking-knife',
    'attacking-lion': 'attacking-lion',
    'attacking-money': 'attacking-money',
    'attacking-mountain': 'attacking-mountain',
    'attacking-ocean': 'attacking-ocean',
    'attacking-rain': 'attacking-rain',
    'attacking-running': 'attacking-running',
    'attacking-shark': 'attacking-shark',
    'attacking-snake': 'attacking-snake',
    'attacking-snow': 'attacking-snow',
    'attacking-spider': 'attacking-spider',
    'attacking-stairs': 'attacking-stairs',
    'attacking-storm': 'attacking-storm',
    'attacking-swimming': 'attacking-swimming',
    'attacking-teeth-falling-out': 'attacking-teeth-falling-out',
    'attacking-vampire': 'attacking-vampire',
    'attacking-water': 'attacking-water',
    'attacking-wedding': 'attacking-wedding',
    'attacking-wolf': 'attacking-wolf',
    'attacking-wound': 'attacking-wound',
    'attacking-zombie': 'attacking-zombie',
    'attic': 'attic',
    'balcony': 'balcony',
    'top': 'ball',
    'banana': 'banana',
    'basketbol': 'basketball',
    'küvet': 'bathtub',
    'beautiful': 'beautiful',
    'çarşaf': 'bed-sheet',
    'beige': 'beige',
    'zil': 'bell',
    'bill': 'bill',
    'black and white': 'black-and-white',
    'black-angel': 'black-angel',
    'black-baby': 'black-baby',
    'black-bear': 'black-bear',
    'black-bird': 'black-bird',
    'black-blood': 'black-blood',
    'black-bridge': 'black-bridge',
    'black-car': 'black-car',
    'black-cat': 'black-cat',
    'black-crying': 'black-crying',
    'black-dancing': 'black-dancing',
    'black-death': 'black-death',
    'black-demon': 'black-demon',
    'black-dog': 'black-dog',
    'black-door': 'black-door',
    'black-dragon': 'black-dragon',
    'black-elephant': 'black-elephant',
    'black-fighting': 'black-fighting',
    'black-fire': 'black-fire',
    'black-fish': 'black-fish',
    'black-flying': 'black-flying',
    'black-ghost': 'black-ghost',
    'black-horse': 'black-horse',
    'black-house': 'black-house',
    'black-key': 'black-key',
    'black-knife': 'black-knife',
    'black-lion': 'black-lion',
    'black-money': 'black-money',
    'black-mountain': 'black-mountain',
    'black-ocean': 'black-ocean',
    'black-rain': 'black-rain',
    'black-running': 'black-running',
    'black-shark': 'black-shark',
    'black-snake': 'black-snake',
    'black-snow': 'black-snow',
    'black-spider': 'black-spider',
    'black-stairs': 'black-stairs',
    'black-storm': 'black-storm',
    'black-swimming': 'black-swimming',
    'black-teeth-falling-out': 'black-teeth-falling-out',
    'black-vampire': 'black-vampire',
    'black-water': 'black-water',
    'black-wedding': 'black-wedding',
    'black-wolf': 'black-wolf',
    'black-wound': 'black-wound',
    'black-zombie': 'black-zombie',
    'battaniye': 'blanket',
    'blurry': 'blurry',
    'kitaplık': 'bookshelf',
    'boks': 'boxing',
    'broken': 'broken',
    'brush': 'brush',
    'kova': 'bucket',
    'bull': 'bull',
    'button': 'button',
    'kablo': 'cable',
    'cage': 'cage',
    'hesap makinesi': 'calculator',
    'takvim': 'calendar',
    'camouflage': 'camouflage',
    'campfire': 'campfire',
    'karbon kağıdı': 'carbon-paper',
    'ceiling': 'ceiling',
    'şarj aleti': 'charger',
    'chasing-angel': 'chasing-angel',
    'chasing-baby': 'chasing-baby',
    'chasing-bear': 'chasing-bear',
    'chasing-bird': 'chasing-bird',
    'chasing-blood': 'chasing-blood',
    'chasing-bridge': 'chasing-bridge',
    'chasing-car': 'chasing-car',
    'chasing-cat': 'chasing-cat',
    'chasing-crying': 'chasing-crying',
    'chasing-dancing': 'chasing-dancing',
    'chasing-death': 'chasing-death',
    'chasing-demon': 'chasing-demon',
    'chasing-dog': 'chasing-dog',
    'chasing-door': 'chasing-door',
    'chasing-dragon': 'chasing-dragon',
    'chasing-elephant': 'chasing-elephant',
    'chasing-fighting': 'chasing-fighting',
    'chasing-fire': 'chasing-fire',
    'chasing-fish': 'chasing-fish',
    'chasing-flying': 'chasing-flying',
    'chasing-ghost': 'chasing-ghost',
    'chasing-horse': 'chasing-horse',
    'chasing-house': 'chasing-house',
    'chasing-key': 'chasing-key',
    'chasing-knife': 'chasing-knife',
    'chasing-lion': 'chasing-lion',
    'chasing-money': 'chasing-money',
    'chasing-mountain': 'chasing-mountain',
    'chasing-ocean': 'chasing-ocean',
    'chasing-rain': 'chasing-rain',
    'chasing-running': 'chasing-running',
    'chasing-shark': 'chasing-shark',
    'chasing-snake': 'chasing-snake',
    'chasing-snow': 'chasing-snow',
    'chasing-spider': 'chasing-spider',
    'chasing-stairs': 'chasing-stairs',
    'chasing-storm': 'chasing-storm',
    'chasing-swimming': 'chasing-swimming',
    'chasing-teeth-falling-out': 'chasing-teeth-falling-out',
    'chasing-vampire': 'chasing-vampire',
    'chasing-water': 'chasing-water',
    'chasing-wedding': 'chasing-wedding',
    'chasing-wolf': 'chasing-wolf',
    'chasing-wound': 'chasing-wound',
    'chasing-zombie': 'chasing-zombie',
    'check': 'check',
    'checkered': 'checkered',
    'chimney': 'chimney',
    'clean': 'clean',
    'closet': 'closet',
    'clown': 'clown',
    'cold': 'cold',
    'pergel': 'compass-drawing',
    'oyun konsolu': 'console',
    'contract': 'contract',
    'kanepe': 'couch',
    'credit card': 'credit-card',
    'crowded': 'crowded',
    'minder': 'cushion',
    'darkness': 'darkness',
    'dead-angel': 'dead-angel',
    'dead-baby': 'dead-baby',
    'dead-bear': 'dead-bear',
    'dead-bird': 'dead-bird',
    'dead-blood': 'dead-blood',
    'dead-bridge': 'dead-bridge',
    'dead-car': 'dead-car',
    'dead-cat': 'dead-cat',
    'dead-crying': 'dead-crying',
    'dead-dancing': 'dead-dancing',
    'dead-death': 'dead-death',
    'dead-demon': 'dead-demon',
    'dead-dog': 'dead-dog',
    'dead-door': 'dead-door',
    'dead-dragon': 'dead-dragon',
    'dead-elephant': 'dead-elephant',
    'dead-fighting': 'dead-fighting',
    'dead-fire': 'dead-fire',
    'dead-fish': 'dead-fish',
    'dead-flying': 'dead-flying',
    'dead-ghost': 'dead-ghost',
    'dead-horse': 'dead-horse',
    'dead-house': 'dead-house',
    'dead-key': 'dead-key',
    'dead-knife': 'dead-knife',
    'dead-lion': 'dead-lion',
    'dead-money': 'dead-money',
    'dead-mountain': 'dead-mountain',
    'dead-ocean': 'dead-ocean',
    'dead-rain': 'dead-rain',
    'dead-running': 'dead-running',
    'dead-shark': 'dead-shark',
    'dead-snake': 'dead-snake',
    'dead-snow': 'dead-snow',
    'dead-spider': 'dead-spider',
    'dead-stairs': 'dead-stairs',
    'dead-storm': 'dead-storm',
    'dead-swimming': 'dead-swimming',
    'dead-teeth-falling-out': 'dead-teeth-falling-out',
    'dead-vampire': 'dead-vampire',
    'dead-water': 'dead-water',
    'dead-wedding': 'dead-wedding',
    'dead-wolf': 'dead-wolf',
    'dead-wound': 'dead-wound',
    'dead-zombie': 'dead-zombie',
    'günlük': 'diary-book',
    'diploma': 'diploma',
    'dirty': 'dirty',
    'paspas': 'doormat',
    'download': 'download',
    'çekmece': 'drawer',
    'matkap': 'drill',
    'drone': 'drone',
    'dry': 'dry',
    'dust': 'dust',
    'dwarf': 'dwarf',
    'dying': 'dying',
    'zarf': 'envelope',
    'silgi': 'eraser',
    'pervane': 'fan',
    'dışkı': 'feces',
    'fence': 'fence',
    'dosya': 'file-folder',
    'şömine': 'fireplace',
    'flag': 'flag',
    'el feneri': 'flashlight',
    'floor': 'floor',
    'flying-angel': 'flying-angel',
    'flying-baby': 'flying-baby',
    'flying-bear': 'flying-bear',
    'flying-bird': 'flying-bird',
    'flying-blood': 'flying-blood',
    'flying-bridge': 'flying-bridge',
    'flying-car': 'flying-car',
    'flying-cat': 'flying-cat',
    'flying-crying': 'flying-crying',
    'flying-dancing': 'flying-dancing',
    'flying-death': 'flying-death',
    'flying-demon': 'flying-demon',
    'flying-dog': 'flying-dog',
    'flying-door': 'flying-door',
    'flying-dragon': 'flying-dragon',
    'flying-elephant': 'flying-elephant',
    'flying-fighting': 'flying-fighting',
    'flying-fire': 'flying-fire',
    'flying-fish': 'flying-fish',
    'flying-flying': 'flying-flying',
    'flying-ghost': 'flying-ghost',
    'flying-horse': 'flying-horse',
    'flying-house': 'flying-house',
    'flying-key': 'flying-key',
    'flying-knife': 'flying-knife',
    'flying-lion': 'flying-lion',
    'flying-money': 'flying-money',
    'flying-mountain': 'flying-mountain',
    'flying-ocean': 'flying-ocean',
    'flying-rain': 'flying-rain',
    'flying-running': 'flying-running',
    'flying-shark': 'flying-shark',
    'flying-snake': 'flying-snake',
    'flying-snow': 'flying-snow',
    'flying-spider': 'flying-spider',
    'flying-stairs': 'flying-stairs',
    'flying-storm': 'flying-storm',
    'flying-swimming': 'flying-swimming',
    'flying-teeth-falling-out': 'flying-teeth-falling-out',
    'flying-vampire': 'flying-vampire',
    'flying-water': 'flying-water',
    'flying-wedding': 'flying-wedding',
    'flying-wolf': 'flying-wolf',
    'flying-wound': 'flying-wound',
    'flying-zombie': 'flying-zombie',
    'futbol': 'football',
    'four': 'four',
    'çerçeve': 'frame',
    'fresh': 'fresh',
    'fruit': 'fruit',
    'futuristic': 'futuristic',
    'gate': 'gate',
    'giant-angel': 'giant-angel',
    'giant-baby': 'giant-baby',
    'giant-bear': 'giant-bear',
    'giant-bird': 'giant-bird',
    'giant-blood': 'giant-blood',
    'giant-bridge': 'giant-bridge',
    'giant-car': 'giant-car',
    'giant-cat': 'giant-cat',
    'giant-crying': 'giant-crying',
    'giant-dancing': 'giant-dancing',
    'giant-death': 'giant-death',
    'giant-demon': 'giant-demon',
    'giant-dog': 'giant-dog',
    'giant-door': 'giant-door',
    'giant-dragon': 'giant-dragon',
    'giant-elephant': 'giant-elephant',
    'giant-fighting': 'giant-fighting',
    'giant-fire': 'giant-fire',
    'giant-fish': 'giant-fish',
    'giant-flying': 'giant-flying',
    'giant-ghost': 'giant-ghost',
    'giant-horse': 'giant-horse',
    'giant-house': 'giant-house',
    'giant-key': 'giant-key',
    'giant-knife': 'giant-knife',
    'giant-lion': 'giant-lion',
    'giant-money': 'giant-money',
    'giant-mountain': 'giant-mountain',
    'giant-ocean': 'giant-ocean',
    'giant-rain': 'giant-rain',
    'giant-running': 'giant-running',
    'giant-shark': 'giant-shark',
    'giant-snake': 'giant-snake',
    'giant-snow': 'giant-snow',
    'giant-spider': 'giant-spider',
    'giant-stairs': 'giant-stairs',
    'giant-storm': 'giant-storm',
    'giant-swimming': 'giant-swimming',
    'giant-teeth-falling-out': 'giant-teeth-falling-out',
    'giant-vampire': 'giant-vampire',
    'giant-water': 'giant-water',
    'giant-wedding': 'giant-wedding',
    'giant-wolf': 'giant-wolf',
    'giant-wound': 'giant-wound',
    'giant-zombie': 'giant-zombie',
    'küre': 'globe',
    'glowing': 'glowing',
    'yapıştırıcı': 'glue',
    'golf': 'golf',
    'grail': 'grail',
    'rende': 'grater',
    'gray': 'gray',
    'hallway': 'hallway',
    'kulaklık': 'headphones',
    'heavy': 'heavy',
    'hollow': 'hollow',
    'hortum': 'hose',
    'hot': 'hot',
    'ice': 'ice',
    'indigo': 'indigo',
    'mürekkep': 'ink',
    'böcek': 'insect',
    'invisible': 'invisible',
    'jar': 'jar',
    'jewelry': 'jewelry',
    'anahtarlık': 'keychain',
    'keyhole': 'keyhole',
    'knob': 'knob',
    'ladder': 'ladder',
    'dizüstü bilgisayar': 'laptop',
    'lazer': 'laser',
    'lead': 'lead',
    'lightweight': 'lightweight',
    'luggage': 'luggage',
    'magnet': 'magnet',
    'makeup': 'makeup',
    'mandala': 'mandala',
    'maroon': 'maroon',
    'mask': 'mask',
    'matte': 'matte',
    'mattress': 'mattress',
    'madalya': 'medal',
    'mikrofon': 'microphone',
    'microscope': 'microscope',
    'monster': 'monster',
    'fare': 'mouse-computer',
    'çivi': 'nail-hardware',
    'nail': 'nail',
    'neon': 'neon',
    'newspaper': 'newspaper',
    'defter': 'notebook',
    'çıplaklık': 'nudity',
    'oil': 'oil',
    'orange': 'orange',
    'package': 'package',
    'boya fırçası': 'paint-brush',
    'paint': 'paint',
    'kağıt': 'paper',
    'ataç': 'paperclip',
    'pastel': 'pastel',
    'pearl': 'pearl',
    'kalemtıraş': 'pencil-sharpener',
    'perfume': 'perfume',
    'picture': 'picture',
    'pense': 'pliers',
    'fiş': 'plug',
    'polka dot': 'polka-dot',
    'havuz': 'pool',
    'kartpostal': 'postcard',
    'purse': 'purse',
    'raket': 'racket',
    'tırmık': 'rake',
    'rat': 'rat',
    'razor': 'razor',
    'receipt': 'receipt',
    'red-angel': 'red-angel',
    'red-baby': 'red-baby',
    'red-bear': 'red-bear',
    'red-bird': 'red-bird',
    'red-blood': 'red-blood',
    'red-bridge': 'red-bridge',
    'red-car': 'red-car',
    'red-cat': 'red-cat',
    'red-crying': 'red-crying',
    'red-dancing': 'red-dancing',
    'red-death': 'red-death',
    'red-demon': 'red-demon',
    'red-dog': 'red-dog',
    'red-door': 'red-door',
    'red-dragon': 'red-dragon',
    'red-elephant': 'red-elephant',
    'red-fighting': 'red-fighting',
    'red-fire': 'red-fire',
    'red-fish': 'red-fish',
    'red-flying': 'red-flying',
    'red-ghost': 'red-ghost',
    'red-horse': 'red-horse',
    'red-house': 'red-house',
    'red-key': 'red-key',
    'red-knife': 'red-knife',
    'red-lion': 'red-lion',
    'red-money': 'red-money',
    'red-mountain': 'red-mountain',
    'red-ocean': 'red-ocean',
    'red-rain': 'red-rain',
    'red-running': 'red-running',
    'red-shark': 'red-shark',
    'red-snake': 'red-snake',
    'red-snow': 'red-snow',
    'red-spider': 'red-spider',
    'red-stairs': 'red-stairs',
    'red-storm': 'red-storm',
    'red-swimming': 'red-swimming',
    'red-teeth-falling-out': 'red-teeth-falling-out',
    'red-vampire': 'red-vampire',
    'red-water': 'red-water',
    'red-wedding': 'red-wedding',
    'red-wolf': 'red-wolf',
    'red-wound': 'red-wound',
    'red-zombie': 'red-zombie',
    'hakem': 'referee',
    'kumanda': 'remote-control',
    'rocket': 'rocket',
    'rotten': 'rotten',
    'kilim': 'rug',
    'ruin': 'ruin',
    'cetvel': 'ruler',
    'rust': 'rust',
    'çelik kasa': 'safe-box',
    'uydu': 'satellite',
    'testere': 'saw',
    'scepter': 'scepter',
    'vida': 'screw',
    'tornavida': 'screwdriver',
    'heykel': 'sculpture',
    'seven': 'seven',
    'shadowy': 'shadowy',
    'shiny': 'shiny',
    'shoelace': 'shoelace',
    'duş': 'shower',
    'i̇mza': 'signature',
    'kaykay': 'skateboard',
    'paten': 'skates',
    'kayak': 'skiing',
    'skyscraper': 'skyscraper',
    'small-angel': 'small-angel',
    'small-baby': 'small-baby',
    'small-bear': 'small-bear',
    'small-bird': 'small-bird',
    'small-blood': 'small-blood',
    'small-bridge': 'small-bridge',
    'small-car': 'small-car',
    'small-cat': 'small-cat',
    'small-crying': 'small-crying',
    'small-dancing': 'small-dancing',
    'small-death': 'small-death',
    'small-demon': 'small-demon',
    'small-dog': 'small-dog',
    'small-door': 'small-door',
    'small-dragon': 'small-dragon',
    'small-elephant': 'small-elephant',
    'small-fighting': 'small-fighting',
    'small-fire': 'small-fire',
    'small-fish': 'small-fish',
    'small-flying': 'small-flying',
    'small-ghost': 'small-ghost',
    'small-horse': 'small-horse',
    'small-house': 'small-house',
    'small-key': 'small-key',
    'small-knife': 'small-knife',
    'small-lion': 'small-lion',
    'small-money': 'small-money',
    'small-mountain': 'small-mountain',
    'small-ocean': 'small-ocean',
    'small-rain': 'small-rain',
    'small-running': 'small-running',
    'small-shark': 'small-shark',
    'small-snake': 'small-snake',
    'small-snow': 'small-snow',
    'small-spider': 'small-spider',
    'small-stairs': 'small-stairs',
    'small-storm': 'small-storm',
    'small-swimming': 'small-swimming',
    'small-teeth-falling-out': 'small-teeth-falling-out',
    'small-vampire': 'small-vampire',
    'small-water': 'small-water',
    'small-wedding': 'small-wedding',
    'small-wolf': 'small-wolf',
    'small-wound': 'small-wound',
    'small-zombie': 'small-zombie',
    'akıllı saat': 'smart-watch',
    'sabun': 'soap',
    'priz': 'socket',
    'koltuk': 'sofa',
    'sparkle': 'sparkle',
    'hoparlör': 'speaker',
    'sünger': 'sponge',
    'pul': 'stamp-postage',
    'stamp': 'stamp',
    'zımba': 'stapler',
    'striped': 'striped',
    'sörf': 'surfing',
    'swimming pool': 'swimming-pool',
    'sword': 'sword',
    'masa': 'table-furniture',
    'tablet': 'tablet',
    'talking-angel': 'talking-angel',
    'talking-baby': 'talking-baby',
    'talking-bear': 'talking-bear',
    'talking-bird': 'talking-bird',
    'talking-blood': 'talking-blood',
    'talking-bridge': 'talking-bridge',
    'talking-car': 'talking-car',
    'talking-cat': 'talking-cat',
    'talking-crying': 'talking-crying',
    'talking-dancing': 'talking-dancing',
    'talking-death': 'talking-death',
    'talking-demon': 'talking-demon',
    'talking-dog': 'talking-dog',
    'talking-door': 'talking-door',
    'talking-dragon': 'talking-dragon',
    'talking-elephant': 'talking-elephant',
    'talking-fighting': 'talking-fighting',
    'talking-fire': 'talking-fire',
    'talking-fish': 'talking-fish',
    'talking-flying': 'talking-flying',
    'talking-ghost': 'talking-ghost',
    'talking-horse': 'talking-horse',
    'talking-house': 'talking-house',
    'talking-key': 'talking-key',
    'talking-knife': 'talking-knife',
    'talking-lion': 'talking-lion',
    'talking-money': 'talking-money',
    'talking-mountain': 'talking-mountain',
    'talking-ocean': 'talking-ocean',
    'talking-rain': 'talking-rain',
    'talking-running': 'talking-running',
    'talking-shark': 'talking-shark',
    'talking-snake': 'talking-snake',
    'talking-snow': 'talking-snow',
    'talking-spider': 'talking-spider',
    'talking-stairs': 'talking-stairs',
    'talking-storm': 'talking-storm',
    'talking-swimming': 'talking-swimming',
    'talking-teeth-falling-out': 'talking-teeth-falling-out',
    'talking-vampire': 'talking-vampire',
    'talking-water': 'talking-water',
    'talking-wedding': 'talking-wedding',
    'talking-wolf': 'talking-wolf',
    'talking-wound': 'talking-wound',
    'talking-zombie': 'talking-zombie',
    'mezura': 'tape-measure',
    'bant': 'tape',
    'telescope': 'telescope',
    'tenis': 'tennis',
    'tent': 'tent',
    'thread': 'thread',
    'throat': 'throat',
    'throne': 'throne',
    'tiny': 'tiny',
    'toothbrush': 'toothbrush',
    'havlu': 'towel',
    'transparent': 'transparent',
    'trash can': 'trash-can',
    'kupa': 'trophy',
    'turquoise': 'turquoise',
    'twelve': 'twelve',
    'ugly': 'ugly',
    'usb bellek': 'usb',
    'veil': 'veil',
    'violet': 'violet',
    'voleybol': 'volleyball',
    'gardırop': 'wardrobe',
    'watch': 'watch',
    'wet': 'wet',
    'wheel': 'wheel',
    'el arabası': 'wheelbarrow',
    'düdük': 'whistle',
    'white-angel': 'white-angel',
    'white-baby': 'white-baby',
    'white-bear': 'white-bear',
    'white-bird': 'white-bird',
    'white-blood': 'white-blood',
    'white-bridge': 'white-bridge',
    'white-car': 'white-car',
    'white-cat': 'white-cat',
    'white-crying': 'white-crying',
    'white-dancing': 'white-dancing',
    'white-death': 'white-death',
    'white-demon': 'white-demon',
    'white-dog': 'white-dog',
    'white-door': 'white-door',
    'white-dragon': 'white-dragon',
    'white-elephant': 'white-elephant',
    'white-fighting': 'white-fighting',
    'white-fire': 'white-fire',
    'white-fish': 'white-fish',
    'white-flying': 'white-flying',
    'white-ghost': 'white-ghost',
    'white-horse': 'white-horse',
    'white-house': 'white-house',
    'white-key': 'white-key',
    'white-knife': 'white-knife',
    'white-lion': 'white-lion',
    'white-money': 'white-money',
    'white-mountain': 'white-mountain',
    'white-ocean': 'white-ocean',
    'white-rain': 'white-rain',
    'white-running': 'white-running',
    'white-shark': 'white-shark',
    'white-snake': 'white-snake',
    'white-snow': 'white-snow',
    'white-spider': 'white-spider',
    'white-stairs': 'white-stairs',
    'white-storm': 'white-storm',
    'white-swimming': 'white-swimming',
    'white-teeth-falling-out': 'white-teeth-falling-out',
    'white-vampire': 'white-vampire',
    'white-water': 'white-water',
    'white-wedding': 'white-wedding',
    'white-wolf': 'white-wolf',
    'white-wound': 'white-wound',
    'white-zombie': 'white-zombie',
    'wire': 'wire',
    'i̇ngiliz anahtarı': 'wrench',
    'güreş': 'wrestling',

    // Batch 19 & New Discoveries
    'aquarium': 'aquarium',
    'backyard': 'backyard',
    'bar': 'bar',
    'canyon': 'canyon',
    'casino': 'casino',
    'cinema': 'cinema',
    'circus': 'circus',
    'dam': 'dam',
    'diary': 'diary',
    'disco': 'disco',
    'driveway': 'driveway',
    'escalator': 'escalator',
    'field': 'field',
    'fortress': 'fortress',
    'fountain': 'fountain',
    'garage': 'garage',
    'greenhouse': 'greenhouse',
    'gym': 'gym',
    'hut': 'hut',
    'igloo': 'igloo',
    'jungle': 'jungle',
    'lighthouse': 'lighthouse',
    'mall': 'mall',
    'meadow': 'meadow',
    'playground': 'playground',
    'porch': 'porch',
    'shed': 'shed',
    'spa': 'spa',
    'staircase': 'staircase',
    'windmill': 'windmill',
    'zoo': 'zoo',

    // Batch 19 & New Discoveries
    'beaver': 'beaver',
    'buffalo': 'buffalo',
    'cheetah': 'cheetah',
    'chimpanzee': 'chimpanzee',
    'clam': 'clam',
    'cricket': 'cricket',
    'crow': 'crow',
    'dragonfly': 'dragonfly',
    'duck': 'duck',
    'eel': 'eel',
    'elk': 'elk',
    'falcon': 'falcon',
    'flamingo': 'flamingo',
    'flea': 'flea',
    'goose': 'goose',
    'gorilla': 'gorilla',
    'grasshopper': 'grasshopper',
    'hawk': 'hawk',
    'hippo': 'hippo',
    'hummingbird': 'hummingbird',
    'hyena': 'hyena',
    'jaguar': 'jaguar',
    'kangaroo': 'kangaroo',
    'koala': 'koala',
    'ladybug': 'ladybug',
    'leopard': 'leopard',
    'lobster': 'lobster',
    'moose': 'moose',
    'mosquito': 'mosquito',
    'moth': 'moth',
    'ostrich': 'ostrich',
    'otter': 'otter',
    'oyster': 'oyster',
    'panda': 'panda',
    'panther': 'panther',
    'parrot': 'parrot',
    'peacock': 'peacock',
    'raccoon': 'raccoon',
    'raven': 'raven',
    'rhino': 'rhino',
    'seahorse': 'seahorse',
    'shrimp': 'shrimp',
    'skunk': 'skunk',
    'starfish': 'starfish',
    'swan': 'swan',
    'turkey': 'turkey',
    'vulture': 'vulture',
    'woodpecker': 'woodpecker',
    'worm': 'worm',

    // Batch 19 & New Discoveries
    'alarm clock': 'alarm-clock',
    'ashtray': 'ashtray',
    'baking': 'baking',
    'biting': 'biting',
    'blender': 'blender',
    'bowl': 'bowl',
    'breathing': 'breathing',
    'burning': 'burning',
    'burying': 'burying',
    'chewing': 'chewing',
    'choking': 'choking',
    'comb': 'comb',
    'cooking': 'cooking',
    'coughing': 'coughing',
    'crashing': 'crashing',
    'crawling': 'crawling',
    'digging': 'digging',
    'drawing': 'drawing',
    'driving': 'driving',
    'floating': 'floating',
    'freezer': 'freezer',
    'freezing': 'freezing',
    'harvesting': 'harvesting',
    'ironing': 'ironing',
    'jumping': 'jumping',
    'kneeling': 'kneeling',
    'knitting': 'knitting',
    'learning': 'learning',
    'lighter': 'lighter',
    'limping': 'limping',
    'match': 'match',
    'melting': 'melting',
    'microwave': 'microwave',
    'mop': 'mop',
    'mug': 'mug',
    'napkin': 'napkin',
    'packing': 'packing',
    'parking': 'parking',
    'paying': 'paying',
    'picture frame': 'picture-frame',
    'planting': 'planting',
    'plunger': 'plunger',
    'remote': 'remote',
    'rowing': 'rowing',
    'sailing': 'sailing',
    'scale': 'scale',
    'sewing': 'sewing',
    'shampoo': 'shampoo',
    'shopping': 'shopping',
    'shouting': 'shouting',
    'sink': 'sink',
    'sinking': 'sinking',
    'stove': 'stove',
    'tablecloth': 'tablecloth',
    'teaching': 'teaching',
    'toaster': 'toaster',
    'toilet paper': 'toilet-paper',
    'toothpaste': 'toothpaste',
    'unpacking': 'unpacking',
    'vaase': 'vaase',
    'whispering': 'whispering',

    // Batch 19 & New Discoveries
    'asteroid': 'asteroid',
    'chaos': 'chaos',
    'circle': 'circle',
    'color': 'color',
    'cross': 'cross',
    'dew': 'dew',
    'dream': 'dream',
    'dunes': 'dunes',
    'echo': 'echo',
    'eclipse': 'eclipse',
    'fate': 'fate',
    'frost': 'frost',
    'future': 'future',
    'galaxy': 'galaxy',
    'geyser': 'geyser',
    'glacier': 'glacier',
    'hail': 'hail',
    'iceberg': 'iceberg',
    'infinity': 'infinity',
    'knot': 'knot',
    'landslide': 'landslide',
    'lava': 'lava',
    'life': 'life',
    'light': 'light',
    'magma': 'magma',
    'maze': 'maze',
    'memory': 'memory',
    'mist': 'mist',
    'nightmare': 'nightmare',
    'noise': 'noise',
    'number': 'number',
    'oasis': 'oasis',
    'order': 'order',
    'past': 'past',
    'pattern': 'pattern',
    'planet': 'planet',
    'rebirth': 'rebirth',
    'shape': 'shape',
    'silence': 'silence',
    'spiral': 'spiral',
    'square': 'square',
    'thunder': 'thunder',
    'time': 'time',
    'triangle': 'triangle',
    'universe': 'universe',
    'void': 'void',
    'whirlpool': 'whirlpool',
    'zero': 'zero',

    // Batch 19 & New Discoveries
    'asteroid': 'asteroid',
    'chaos': 'chaos',
    'circle': 'circle',
    'color': 'color',
    'cross': 'cross',
    'dew': 'dew',
    'dream': 'dream',
    'dunes': 'dunes',
    'echo': 'echo',
    'eclipse': 'eclipse',
    'fate': 'fate',
    'frost': 'frost',
    'future': 'future',
    'galaxy': 'galaxy',
    'geyser': 'geyser',
    'glacier': 'glacier',
    'hail': 'hail',
    'iceberg': 'iceberg',
    'infinity': 'infinity',
    'knot': 'knot',
    'landslide': 'landslide',
    'lava': 'lava',
    'life': 'life',
    'light': 'light',
    'magma': 'magma',
    'maze': 'maze',
    'memory': 'memory',
    'mist': 'mist',
    'nightmare': 'nightmare',
    'noise': 'noise',
    'number': 'number',
    'oasis': 'oasis',
    'order': 'order',
    'past': 'past',
    'pattern': 'pattern',
    'planet': 'planet',
    'rebirth': 'rebirth',
    'shape': 'shape',
    'silence': 'silence',
    'spiral': 'spiral',
    'square': 'square',
    'thunder': 'thunder',
    'time': 'time',
    'triangle': 'triangle',
    'universe': 'universe',
    'void': 'void',
    'whirlpool': 'whirlpool',
    'zero': 'zero',

    // Batch 26 - Manual Updates
    'pizza': 'pizza',
    'çikolata': 'chocolate',
    'hamburger': 'burger',
    'burger': 'burger',
    'dondurma': 'ice-cream',
    'karpuz': 'watermelon',
    'çilek': 'strawberry',
    'limon': 'lemon',
    'soğan': 'onion',
    'sarımsak': 'garlic',
    'patates': 'potato',
    'domates': 'tomato',
    'patlıcan': 'eggplant',
    'peynir': 'cheese',
    'tereyağı': 'butter',
    'tereyağ': 'butter',
    'yoğurt': 'yogurt',
    'çorba': 'soup',
    'sandviç': 'sandwich',
    'erişte': 'noodles',
    'makarna': 'noodles',
    'dudak': 'lips',
    'dudaklar': 'lips',
    'boyun': 'neck',
    'omuz': 'shoulder',
    'kol': 'arm',
    'dirsek': 'elbow',
    'bilek': 'wrist',
    'başparmak': 'thumb',
    'diz': 'knee',
    'ayak bileği': 'ankle',
    'beyin': 'brain',
    'sincap': 'squirrel',
    'geyik': 'deer',
    'ceylan': 'deer',
    'deve': 'camel',
    'zürafa': 'giraffe',
    'zebra': 'zebra',
    'penguen': 'penguin',
    'martı': 'seagull',
    'leylek': 'stork',
    'yengeç': 'crab',
    'ahtapot': 'octopus',
    'denizanası': 'jellyfish',
    'kalamar': 'squid',
    'mürekkep balığı': 'squid',
    'fok': 'seal',
    'mors': 'walrus',
    'yorgan': 'blanket',
    'perde': 'curtain',
    'kase': 'bowl',
    'çanak': 'bowl',
    'kaşık': 'spoon',
    'çatal': 'fork',
    'memur': 'police',
    'hemşire': 'nurse',
    'dişçi': 'dentist',
    'diş hekimi': 'dentist',
    'hakim': 'judge',
    'yargıç': 'judge',
    'avukat': 'lawyer',
    'mühendis': 'engineer',
    'mimar': 'architect',
    'ressam': 'artist',
    'sanatçı': 'artist',
    'müzisyen': 'musician',
    'çalgıcı': 'musician',
    'aktör': 'actor',
    'aktris': 'actor',
    'plaj': 'beach',
    'sahil': 'beach',
    'kumsal': 'beach',
    'volkan': 'volcano',
    'kale': 'castle',
    'şato': 'castle',
    'hisar': 'castle',
    'kule': 'tower',
    'harabe': 'ruins',
    'yıkıntı': 'ruins',
    'şehir': 'city',
    'kent': 'city',
    'sokak': 'street',
    'cadde': 'street',
    'koridor': 'corridor',

    // Auto-generated Fixes
    'kaza': 'accident',
    'oyuncu (aktör/aktris)': 'actor',
    'Oyuncu (Aktör/Aktris)': 'actor', // Case fix
    'OYUNCU (AKTÖR/AKTRIS)': 'actor', // Case fix
    'klima': 'air-conditioner',
    'KLIMA': 'air-conditioner', // Case fix
    'havaalanı': 'airport',
    'Havaalanı': 'airport', // Case fix
    'HAVAALANI': 'airport', // Case fix
    'Alarm clock': 'alarm-clock', // Case fix
    'Alarm': 'alarm', // Case fix
    'alkol/i̇çki': 'alcohol',
    'Alkol/İçki': 'alcohol', // Case fix
    'ALKOL/İÇKI': 'alcohol', // Case fix
    'Uzaylı': 'alien', // Case fix
    'UZAYLI': 'alien', // Case fix
    'Alley': 'alley', // Case fix
    'Altar': 'altar', // Case fix
    'ambulans': 'ambulance',
    'Anchor': 'anchor', // Case fix
    'Ancient': 'ancient', // Case fix
    'ANCIENT': 'ancient', // Case fix
    'Melek': 'angel', // Case fix
    'öfke': 'anger',
    'Ayak Bileği': 'ankle', // Case fix
    'AYAK BILEĞI': 'ankle', // Case fix
    'Karınca': 'ant', // Case fix
    'KARINCA': 'ant', // Case fix
    'Anten': 'antenna', // Case fix
    'Elma': 'apple', // Case fix
    'Aquarium': 'aquarium', // Case fix
    'AQUARIUM': 'aquarium', // Case fix
    'Okçuluk': 'archery', // Case fix
    'MIMAR': 'architect', // Case fix
    'Kol': 'arm', // Case fix
    'armor': 'armor',
    'Armor': 'armor', // Case fix
    'ressam / sanatçı': 'artist',
    'Ressam / Sanatçı': 'artist', // Case fix
    'RESSAM / SANATÇI': 'artist', // Case fix
    'Ashtray': 'ashtray', // Case fix
    'Asteroid': 'asteroid', // Case fix
    'ASTEROID': 'asteroid', // Case fix
    'astronaut': 'astronaut',
    'Astronaut': 'astronaut', // Case fix
    'sporcu': 'athlete',
    'attacking angel': 'attacking-angel',
    'Attacking angel': 'attacking-angel', // Case fix
    'ATTACKING ANGEL': 'attacking-angel', // Case fix
    'attacking baby': 'attacking-baby',
    'Attacking baby': 'attacking-baby', // Case fix
    'ATTACKING BABY': 'attacking-baby', // Case fix
    'attacking bear': 'attacking-bear',
    'Attacking bear': 'attacking-bear', // Case fix
    'ATTACKING BEAR': 'attacking-bear', // Case fix
    'attacking bird': 'attacking-bird',
    'Attacking bird': 'attacking-bird', // Case fix
    'ATTACKING BIRD': 'attacking-bird', // Case fix
    'attacking blood': 'attacking-blood',
    'Attacking blood': 'attacking-blood', // Case fix
    'ATTACKING BLOOD': 'attacking-blood', // Case fix
    'attacking bridge': 'attacking-bridge',
    'Attacking bridge': 'attacking-bridge', // Case fix
    'ATTACKING BRIDGE': 'attacking-bridge', // Case fix
    'attacking car': 'attacking-car',
    'Attacking car': 'attacking-car', // Case fix
    'ATTACKING CAR': 'attacking-car', // Case fix
    'attacking cat': 'attacking-cat',
    'Attacking cat': 'attacking-cat', // Case fix
    'ATTACKING CAT': 'attacking-cat', // Case fix
    'attacking crying': 'attacking-crying',
    'Attacking crying': 'attacking-crying', // Case fix
    'ATTACKING CRYING': 'attacking-crying', // Case fix
    'attacking dancing': 'attacking-dancing',
    'Attacking dancing': 'attacking-dancing', // Case fix
    'ATTACKING DANCING': 'attacking-dancing', // Case fix
    'attacking death': 'attacking-death',
    'Attacking death': 'attacking-death', // Case fix
    'ATTACKING DEATH': 'attacking-death', // Case fix
    'attacking demon': 'attacking-demon',
    'Attacking demon': 'attacking-demon', // Case fix
    'ATTACKING DEMON': 'attacking-demon', // Case fix
    'attacking dog': 'attacking-dog',
    'Attacking dog': 'attacking-dog', // Case fix
    'ATTACKING DOG': 'attacking-dog', // Case fix
    'attacking door': 'attacking-door',
    'Attacking door': 'attacking-door', // Case fix
    'ATTACKING DOOR': 'attacking-door', // Case fix
    'attacking dragon': 'attacking-dragon',
    'Attacking dragon': 'attacking-dragon', // Case fix
    'ATTACKING DRAGON': 'attacking-dragon', // Case fix
    'attacking elephant': 'attacking-elephant',
    'Attacking elephant': 'attacking-elephant', // Case fix
    'ATTACKING ELEPHANT': 'attacking-elephant', // Case fix
    'attacking fighting': 'attacking-fighting',
    'Attacking fighting': 'attacking-fighting', // Case fix
    'ATTACKING FIGHTING': 'attacking-fighting', // Case fix
    'attacking fire': 'attacking-fire',
    'Attacking fire': 'attacking-fire', // Case fix
    'ATTACKING FIRE': 'attacking-fire', // Case fix
    'attacking fish': 'attacking-fish',
    'Attacking fish': 'attacking-fish', // Case fix
    'ATTACKING FISH': 'attacking-fish', // Case fix
    'attacking flying': 'attacking-flying',
    'Attacking flying': 'attacking-flying', // Case fix
    'ATTACKING FLYING': 'attacking-flying', // Case fix
    'attacking ghost': 'attacking-ghost',
    'Attacking ghost': 'attacking-ghost', // Case fix
    'ATTACKING GHOST': 'attacking-ghost', // Case fix
    'attacking horse': 'attacking-horse',
    'Attacking horse': 'attacking-horse', // Case fix
    'ATTACKING HORSE': 'attacking-horse', // Case fix
    'attacking house': 'attacking-house',
    'Attacking house': 'attacking-house', // Case fix
    'ATTACKING HOUSE': 'attacking-house', // Case fix
    'attacking key': 'attacking-key',
    'Attacking key': 'attacking-key', // Case fix
    'ATTACKING KEY': 'attacking-key', // Case fix
    'attacking knife': 'attacking-knife',
    'Attacking knife': 'attacking-knife', // Case fix
    'ATTACKING KNIFE': 'attacking-knife', // Case fix
    'attacking lion': 'attacking-lion',
    'Attacking lion': 'attacking-lion', // Case fix
    'ATTACKING LION': 'attacking-lion', // Case fix
    'attacking money': 'attacking-money',
    'Attacking money': 'attacking-money', // Case fix
    'ATTACKING MONEY': 'attacking-money', // Case fix
    'attacking mountain': 'attacking-mountain',
    'Attacking mountain': 'attacking-mountain', // Case fix
    'ATTACKING MOUNTAIN': 'attacking-mountain', // Case fix
    'attacking ocean': 'attacking-ocean',
    'Attacking ocean': 'attacking-ocean', // Case fix
    'ATTACKING OCEAN': 'attacking-ocean', // Case fix
    'attacking rain': 'attacking-rain',
    'Attacking rain': 'attacking-rain', // Case fix
    'ATTACKING RAIN': 'attacking-rain', // Case fix
    'attacking running': 'attacking-running',
    'Attacking running': 'attacking-running', // Case fix
    'ATTACKING RUNNING': 'attacking-running', // Case fix
    'attacking shark': 'attacking-shark',
    'Attacking shark': 'attacking-shark', // Case fix
    'ATTACKING SHARK': 'attacking-shark', // Case fix
    'attacking snake': 'attacking-snake',
    'Attacking snake': 'attacking-snake', // Case fix
    'ATTACKING SNAKE': 'attacking-snake', // Case fix
    'attacking snow': 'attacking-snow',
    'Attacking snow': 'attacking-snow', // Case fix
    'ATTACKING SNOW': 'attacking-snow', // Case fix
    'attacking spider': 'attacking-spider',
    'Attacking spider': 'attacking-spider', // Case fix
    'ATTACKING SPIDER': 'attacking-spider', // Case fix
    'attacking stairs': 'attacking-stairs',
    'Attacking stairs': 'attacking-stairs', // Case fix
    'ATTACKING STAIRS': 'attacking-stairs', // Case fix
    'attacking storm': 'attacking-storm',
    'Attacking storm': 'attacking-storm', // Case fix
    'ATTACKING STORM': 'attacking-storm', // Case fix
    'attacking swimming': 'attacking-swimming',
    'Attacking swimming': 'attacking-swimming', // Case fix
    'ATTACKING SWIMMING': 'attacking-swimming', // Case fix
    'attacking teeth falling out': 'attacking-teeth-falling-out',
    'Attacking teeth falling out': 'attacking-teeth-falling-out', // Case fix
    'ATTACKING TEETH FALLING OUT': 'attacking-teeth-falling-out', // Case fix
    'attacking vampire': 'attacking-vampire',
    'Attacking vampire': 'attacking-vampire', // Case fix
    'ATTACKING VAMPIRE': 'attacking-vampire', // Case fix
    'attacking water': 'attacking-water',
    'Attacking water': 'attacking-water', // Case fix
    'ATTACKING WATER': 'attacking-water', // Case fix
    'attacking wedding': 'attacking-wedding',
    'Attacking wedding': 'attacking-wedding', // Case fix
    'ATTACKING WEDDING': 'attacking-wedding', // Case fix
    'attacking wolf': 'attacking-wolf',
    'Attacking wolf': 'attacking-wolf', // Case fix
    'ATTACKING WOLF': 'attacking-wolf', // Case fix
    'attacking wound': 'attacking-wound',
    'Attacking wound': 'attacking-wound', // Case fix
    'ATTACKING WOUND': 'attacking-wound', // Case fix
    'attacking zombie': 'attacking-zombie',
    'Attacking zombie': 'attacking-zombie', // Case fix
    'ATTACKING ZOMBIE': 'attacking-zombie', // Case fix
    'çatı katı': 'attic',
    'Çatı Katı': 'attic', // Case fix
    'ÇATI KATI': 'attic', // Case fix
    'çığ': 'avalanche',
    'ÇIĞ': 'avalanche', // Case fix
    'award': 'award',
    'Award': 'award', // Case fix
    'Balta': 'axe', // Case fix
    'Bebek': 'baby', // Case fix
    'Sırt': 'back-body', // Case fix
    'SIRT': 'back-body', // Case fix
    'sırt çantası': 'backpack',
    'Sırt çantası': 'backpack', // Case fix
    'SIRT ÇANTASI': 'backpack', // Case fix
    'Backyard': 'backyard', // Case fix
    'Çanta': 'bag', // Case fix
    'baker': 'baker',
    'Baker': 'baker', // Case fix
    'Baking': 'baking', // Case fix
    'BAKING': 'baking', // Case fix
    'Balcony': 'balcony', // Case fix
    'Top': 'ball', // Case fix
    'balon': 'balloon',
    'Banana': 'banana', // Case fix
    'yara bandı': 'band-aid',
    'YARA BANDI': 'band-aid', // Case fix
    'sargı bezi': 'bandage',
    'SARGI BEZI': 'bandage', // Case fix
    'banner': 'banner',
    'Banner': 'banner', // Case fix
    'Bar': 'bar', // Case fix
    'berber': 'barber',
    'ahır': 'barn',
    'AHIR': 'barn', // Case fix
    'Bodrum': 'basement', // Case fix
    'Basketbol': 'basketball', // Case fix
    'Yarasa': 'bat', // Case fix
    'Banyo': 'bathroom', // Case fix
    'Küvet': 'bathtub', // Case fix
    'Pil': 'battery', // Case fix
    'PIL': 'battery', // Case fix
    'plaj/sahil': 'beach',
    'Plaj/Sahil': 'beach', // Case fix
    'PLAJ/SAHIL': 'beach', // Case fix
    'Ayı': 'bear', // Case fix
    'AYI': 'bear', // Case fix
    'Sakal': 'beard', // Case fix
    'Beautiful': 'beautiful', // Case fix
    'BEAUTIFUL': 'beautiful', // Case fix
    'Beaver': 'beaver', // Case fix
    'Çarşaf': 'bed-sheet', // Case fix
    'Yatak': 'bed', // Case fix
    'yatak odası': 'bedroom',
    'Yatak Odası': 'bedroom', // Case fix
    'YATAK ODASI': 'bedroom', // Case fix
    'Arı': 'bee', // Case fix
    'ARI': 'bee', // Case fix
    'bira': 'beer',
    'BIRA': 'beer', // Case fix
    'dilenci': 'beggar',
    'DILENCI': 'beggar', // Case fix
    'Beige': 'beige', // Case fix
    'BEIGE': 'beige', // Case fix
    'Zil': 'bell', // Case fix
    'ZIL': 'bell', // Case fix
    'Kemer': 'belt', // Case fix
    'Bisiklet': 'bicycle', // Case fix
    'BISIKLET': 'bicycle', // Case fix
    'Bill': 'bill', // Case fix
    'BILL': 'bill', // Case fix
    'Kuş': 'bird', // Case fix
    'Doğum': 'birth', // Case fix
    'Biting': 'biting', // Case fix
    'BITING': 'biting', // Case fix
    'Black and white': 'black-and-white', // Case fix
    'BLACK AND WHITE': 'black-and-white', // Case fix
    'black angel': 'black-angel',
    'Black angel': 'black-angel', // Case fix
    'black baby': 'black-baby',
    'Black baby': 'black-baby', // Case fix
    'black bear': 'black-bear',
    'Black bear': 'black-bear', // Case fix
    'black bird': 'black-bird',
    'Black bird': 'black-bird', // Case fix
    'BLACK BIRD': 'black-bird', // Case fix
    'black blood': 'black-blood',
    'Black blood': 'black-blood', // Case fix
    'black bridge': 'black-bridge',
    'Black bridge': 'black-bridge', // Case fix
    'BLACK BRIDGE': 'black-bridge', // Case fix
    'black car': 'black-car',
    'Black car': 'black-car', // Case fix
    'black cat': 'black-cat',
    'Black cat': 'black-cat', // Case fix
    'black crying': 'black-crying',
    'Black crying': 'black-crying', // Case fix
    'BLACK CRYING': 'black-crying', // Case fix
    'black dancing': 'black-dancing',
    'Black dancing': 'black-dancing', // Case fix
    'BLACK DANCING': 'black-dancing', // Case fix
    'black death': 'black-death',
    'Black death': 'black-death', // Case fix
    'black demon': 'black-demon',
    'Black demon': 'black-demon', // Case fix
    'black dog': 'black-dog',
    'Black dog': 'black-dog', // Case fix
    'black door': 'black-door',
    'Black door': 'black-door', // Case fix
    'black dragon': 'black-dragon',
    'Black dragon': 'black-dragon', // Case fix
    'black elephant': 'black-elephant',
    'Black elephant': 'black-elephant', // Case fix
    'black fighting': 'black-fighting',
    'Black fighting': 'black-fighting', // Case fix
    'BLACK FIGHTING': 'black-fighting', // Case fix
    'black fire': 'black-fire',
    'Black fire': 'black-fire', // Case fix
    'BLACK FIRE': 'black-fire', // Case fix
    'black fish': 'black-fish',
    'Black fish': 'black-fish', // Case fix
    'BLACK FISH': 'black-fish', // Case fix
    'black flying': 'black-flying',
    'Black flying': 'black-flying', // Case fix
    'BLACK FLYING': 'black-flying', // Case fix
    'black ghost': 'black-ghost',
    'Black ghost': 'black-ghost', // Case fix
    'black hole': 'black-hole',
    'Black hole': 'black-hole', // Case fix
    'black horse': 'black-horse',
    'Black horse': 'black-horse', // Case fix
    'black house': 'black-house',
    'Black house': 'black-house', // Case fix
    'black key': 'black-key',
    'Black key': 'black-key', // Case fix
    'black knife': 'black-knife',
    'Black knife': 'black-knife', // Case fix
    'BLACK KNIFE': 'black-knife', // Case fix
    'black lion': 'black-lion',
    'Black lion': 'black-lion', // Case fix
    'BLACK LION': 'black-lion', // Case fix
    'black money': 'black-money',
    'Black money': 'black-money', // Case fix
    'black mountain': 'black-mountain',
    'Black mountain': 'black-mountain', // Case fix
    'BLACK MOUNTAIN': 'black-mountain', // Case fix
    'black ocean': 'black-ocean',
    'Black ocean': 'black-ocean', // Case fix
    'black rain': 'black-rain',
    'Black rain': 'black-rain', // Case fix
    'BLACK RAIN': 'black-rain', // Case fix
    'black running': 'black-running',
    'Black running': 'black-running', // Case fix
    'BLACK RUNNING': 'black-running', // Case fix
    'black shark': 'black-shark',
    'Black shark': 'black-shark', // Case fix
    'black snake': 'black-snake',
    'Black snake': 'black-snake', // Case fix
    'black snow': 'black-snow',
    'Black snow': 'black-snow', // Case fix
    'black spider': 'black-spider',
    'Black spider': 'black-spider', // Case fix
    'BLACK SPIDER': 'black-spider', // Case fix
    'black stairs': 'black-stairs',
    'Black stairs': 'black-stairs', // Case fix
    'BLACK STAIRS': 'black-stairs', // Case fix
    'black storm': 'black-storm',
    'Black storm': 'black-storm', // Case fix
    'black swimming': 'black-swimming',
    'Black swimming': 'black-swimming', // Case fix
    'BLACK SWIMMING': 'black-swimming', // Case fix
    'black teeth falling out': 'black-teeth-falling-out',
    'Black teeth falling out': 'black-teeth-falling-out', // Case fix
    'BLACK TEETH FALLING OUT': 'black-teeth-falling-out', // Case fix
    'black vampire': 'black-vampire',
    'Black vampire': 'black-vampire', // Case fix
    'BLACK VAMPIRE': 'black-vampire', // Case fix
    'black water': 'black-water',
    'Black water': 'black-water', // Case fix
    'black wedding': 'black-wedding',
    'Black wedding': 'black-wedding', // Case fix
    'BLACK WEDDING': 'black-wedding', // Case fix
    'black wolf': 'black-wolf',
    'Black wolf': 'black-wolf', // Case fix
    'black wound': 'black-wound',
    'Black wound': 'black-wound', // Case fix
    'black zombie': 'black-zombie',
    'Black zombie': 'black-zombie', // Case fix
    'BLACK ZOMBIE': 'black-zombie', // Case fix
    'siyah renk': 'black',
    'Siyah Renk': 'black', // Case fix
    'SIYAH RENK': 'black', // Case fix
    'battaniye / yorgan': 'blanket',
    'Battaniye / Yorgan': 'blanket', // Case fix
    'BATTANIYE / YORGAN': 'blanket', // Case fix
    'kanama': 'bleeding',
    'Blender': 'blender', // Case fix
    'Kör': 'blind', // Case fix
    'Kan': 'blood', // Case fix
    'mavi renk': 'blue',
    'Mavi Renk': 'blue', // Case fix
    'MAVI RENK': 'blue', // Case fix
    'Blurry': 'blurry', // Case fix
    'Tekne': 'boat', // Case fix
    'Kitap': 'book', // Case fix
    'KITAP': 'book', // Case fix
    'Kitaplık': 'bookshelf', // Case fix
    'KITAPLIK': 'bookshelf', // Case fix
    'boots': 'boots',
    'Boots': 'boots', // Case fix
    'Patron': 'boss', // Case fix
    'şişe': 'bottle',
    'ŞIŞE': 'bottle', // Case fix
    'Kase': 'bowl', // Case fix
    'Kutu': 'box', // Case fix
    'Boks': 'boxing', // Case fix
    'Bilezik': 'bracelet', // Case fix
    'BILEZIK': 'bracelet', // Case fix
    'BEYIN': 'brain', // Case fix
    'Breathing': 'breathing', // Case fix
    'BREATHING': 'breathing', // Case fix
    'Gelin': 'bride', // Case fix
    'GELIN': 'bride', // Case fix
    'Köprü': 'bridge', // Case fix
    'Broken': 'broken', // Case fix
    'Bronz': 'bronze', // Case fix
    'Kahverengi': 'brown', // Case fix
    'KAHVERENGI': 'brown', // Case fix
    'Brush': 'brush', // Case fix
    'Kova': 'bucket', // Case fix
    'Buffalo': 'buffalo', // Case fix
    'Bull': 'bull', // Case fix
    'Burning': 'burning', // Case fix
    'BURNING': 'burning', // Case fix
    'Burying': 'burying', // Case fix
    'BURYING': 'burying', // Case fix
    'otogar': 'bus-terminal',
    'Otobüs': 'bus', // Case fix
    'kasap': 'butcher',
    'Tereyağı': 'butter', // Case fix
    'TEREYAĞI': 'butter', // Case fix
    'Kelebek': 'butterfly', // Case fix
    'Button': 'button', // Case fix
    'satın almak': 'buying',
    'SATIN ALMAK': 'buying', // Case fix
    'Kablo': 'cable', // Case fix
    'kaktüs': 'cactus',
    'Cage': 'cage', // Case fix
    'pasta': 'cake',
    'Hesap Makinesi': 'calculator', // Case fix
    'HESAP MAKINESI': 'calculator', // Case fix
    'Takvim': 'calendar', // Case fix
    'TAKVIM': 'calendar', // Case fix
    'Kamera': 'camera', // Case fix
    'Camouflage': 'camouflage', // Case fix
    'Campfire': 'campfire', // Case fix
    'CAMPFIRE': 'campfire', // Case fix
    'Mum': 'candle', // Case fix
    'Canyon': 'canyon', // Case fix
    'captain': 'captain',
    'Captain': 'captain', // Case fix
    'CAPTAIN': 'captain', // Case fix
    'Araba': 'car', // Case fix
    'Karbon Kağıdı': 'carbon-paper', // Case fix
    'KARBON KAĞIDI': 'carbon-paper', // Case fix
    'marangoz': 'carpenter',
    'Halı': 'carpet', // Case fix
    'HALI': 'carpet', // Case fix
    'Casino': 'casino', // Case fix
    'CASINO': 'casino', // Case fix
    'kale / şato': 'castle',
    'Kale / Şato': 'castle', // Case fix
    'Kedi': 'cat', // Case fix
    'KEDI': 'cat', // Case fix
    'Mağara': 'cave', // Case fix
    'Ceiling': 'ceiling', // Case fix
    'CEILING': 'ceiling', // Case fix
    'ünlü kişi': 'celebrity',
    'Ünlü Kişi': 'celebrity', // Case fix
    'ÜNLÜ KIŞI': 'celebrity', // Case fix
    'mahzen': 'cellar',
    'Zincir': 'chain', // Case fix
    'ZINCIR': 'chain', // Case fix
    'Sandalye': 'chair', // Case fix
    'avize': 'chandelier',
    'AVIZE': 'chandelier', // Case fix
    'Chaos': 'chaos', // Case fix
    'Şarj aleti': 'charger', // Case fix
    'ŞARJ ALETI': 'charger', // Case fix
    'kovalamak/kovalanmak': 'chase',
    'Kovalamak/Kovalanmak': 'chase', // Case fix
    'kovalanmak': 'chased',
    'chasing angel': 'chasing-angel',
    'Chasing angel': 'chasing-angel', // Case fix
    'CHASING ANGEL': 'chasing-angel', // Case fix
    'chasing baby': 'chasing-baby',
    'Chasing baby': 'chasing-baby', // Case fix
    'CHASING BABY': 'chasing-baby', // Case fix
    'chasing bear': 'chasing-bear',
    'Chasing bear': 'chasing-bear', // Case fix
    'CHASING BEAR': 'chasing-bear', // Case fix
    'chasing bird': 'chasing-bird',
    'Chasing bird': 'chasing-bird', // Case fix
    'CHASING BIRD': 'chasing-bird', // Case fix
    'chasing blood': 'chasing-blood',
    'Chasing blood': 'chasing-blood', // Case fix
    'CHASING BLOOD': 'chasing-blood', // Case fix
    'chasing bridge': 'chasing-bridge',
    'Chasing bridge': 'chasing-bridge', // Case fix
    'CHASING BRIDGE': 'chasing-bridge', // Case fix
    'chasing car': 'chasing-car',
    'Chasing car': 'chasing-car', // Case fix
    'CHASING CAR': 'chasing-car', // Case fix
    'chasing cat': 'chasing-cat',
    'Chasing cat': 'chasing-cat', // Case fix
    'CHASING CAT': 'chasing-cat', // Case fix
    'chasing crying': 'chasing-crying',
    'Chasing crying': 'chasing-crying', // Case fix
    'CHASING CRYING': 'chasing-crying', // Case fix
    'chasing dancing': 'chasing-dancing',
    'Chasing dancing': 'chasing-dancing', // Case fix
    'CHASING DANCING': 'chasing-dancing', // Case fix
    'chasing death': 'chasing-death',
    'Chasing death': 'chasing-death', // Case fix
    'CHASING DEATH': 'chasing-death', // Case fix
    'chasing demon': 'chasing-demon',
    'Chasing demon': 'chasing-demon', // Case fix
    'CHASING DEMON': 'chasing-demon', // Case fix
    'chasing dog': 'chasing-dog',
    'Chasing dog': 'chasing-dog', // Case fix
    'CHASING DOG': 'chasing-dog', // Case fix
    'chasing door': 'chasing-door',
    'Chasing door': 'chasing-door', // Case fix
    'CHASING DOOR': 'chasing-door', // Case fix
    'chasing dragon': 'chasing-dragon',
    'Chasing dragon': 'chasing-dragon', // Case fix
    'CHASING DRAGON': 'chasing-dragon', // Case fix
    'chasing elephant': 'chasing-elephant',
    'Chasing elephant': 'chasing-elephant', // Case fix
    'CHASING ELEPHANT': 'chasing-elephant', // Case fix
    'chasing fighting': 'chasing-fighting',
    'Chasing fighting': 'chasing-fighting', // Case fix
    'CHASING FIGHTING': 'chasing-fighting', // Case fix
    'chasing fire': 'chasing-fire',
    'Chasing fire': 'chasing-fire', // Case fix
    'CHASING FIRE': 'chasing-fire', // Case fix
    'chasing fish': 'chasing-fish',
    'Chasing fish': 'chasing-fish', // Case fix
    'CHASING FISH': 'chasing-fish', // Case fix
    'chasing flying': 'chasing-flying',
    'Chasing flying': 'chasing-flying', // Case fix
    'CHASING FLYING': 'chasing-flying', // Case fix
    'chasing ghost': 'chasing-ghost',
    'Chasing ghost': 'chasing-ghost', // Case fix
    'CHASING GHOST': 'chasing-ghost', // Case fix
    'chasing horse': 'chasing-horse',
    'Chasing horse': 'chasing-horse', // Case fix
    'CHASING HORSE': 'chasing-horse', // Case fix
    'chasing house': 'chasing-house',
    'Chasing house': 'chasing-house', // Case fix
    'CHASING HOUSE': 'chasing-house', // Case fix
    'chasing key': 'chasing-key',
    'Chasing key': 'chasing-key', // Case fix
    'CHASING KEY': 'chasing-key', // Case fix
    'chasing knife': 'chasing-knife',
    'Chasing knife': 'chasing-knife', // Case fix
    'CHASING KNIFE': 'chasing-knife', // Case fix
    'chasing lion': 'chasing-lion',
    'Chasing lion': 'chasing-lion', // Case fix
    'CHASING LION': 'chasing-lion', // Case fix
    'chasing money': 'chasing-money',
    'Chasing money': 'chasing-money', // Case fix
    'CHASING MONEY': 'chasing-money', // Case fix
    'chasing mountain': 'chasing-mountain',
    'Chasing mountain': 'chasing-mountain', // Case fix
    'CHASING MOUNTAIN': 'chasing-mountain', // Case fix
    'chasing ocean': 'chasing-ocean',
    'Chasing ocean': 'chasing-ocean', // Case fix
    'CHASING OCEAN': 'chasing-ocean', // Case fix
    'chasing rain': 'chasing-rain',
    'Chasing rain': 'chasing-rain', // Case fix
    'CHASING RAIN': 'chasing-rain', // Case fix
    'chasing running': 'chasing-running',
    'Chasing running': 'chasing-running', // Case fix
    'CHASING RUNNING': 'chasing-running', // Case fix
    'chasing shark': 'chasing-shark',
    'Chasing shark': 'chasing-shark', // Case fix
    'CHASING SHARK': 'chasing-shark', // Case fix
    'chasing snake': 'chasing-snake',
    'Chasing snake': 'chasing-snake', // Case fix
    'CHASING SNAKE': 'chasing-snake', // Case fix
    'chasing snow': 'chasing-snow',
    'Chasing snow': 'chasing-snow', // Case fix
    'CHASING SNOW': 'chasing-snow', // Case fix
    'chasing spider': 'chasing-spider',
    'Chasing spider': 'chasing-spider', // Case fix
    'CHASING SPIDER': 'chasing-spider', // Case fix
    'chasing stairs': 'chasing-stairs',
    'Chasing stairs': 'chasing-stairs', // Case fix
    'CHASING STAIRS': 'chasing-stairs', // Case fix
    'chasing storm': 'chasing-storm',
    'Chasing storm': 'chasing-storm', // Case fix
    'CHASING STORM': 'chasing-storm', // Case fix
    'chasing swimming': 'chasing-swimming',
    'Chasing swimming': 'chasing-swimming', // Case fix
    'CHASING SWIMMING': 'chasing-swimming', // Case fix
    'chasing teeth falling out': 'chasing-teeth-falling-out',
    'Chasing teeth falling out': 'chasing-teeth-falling-out', // Case fix
    'CHASING TEETH FALLING OUT': 'chasing-teeth-falling-out', // Case fix
    'chasing vampire': 'chasing-vampire',
    'Chasing vampire': 'chasing-vampire', // Case fix
    'CHASING VAMPIRE': 'chasing-vampire', // Case fix
    'chasing water': 'chasing-water',
    'Chasing water': 'chasing-water', // Case fix
    'CHASING WATER': 'chasing-water', // Case fix
    'chasing wedding': 'chasing-wedding',
    'Chasing wedding': 'chasing-wedding', // Case fix
    'CHASING WEDDING': 'chasing-wedding', // Case fix
    'chasing wolf': 'chasing-wolf',
    'Chasing wolf': 'chasing-wolf', // Case fix
    'CHASING WOLF': 'chasing-wolf', // Case fix
    'chasing wound': 'chasing-wound',
    'Chasing wound': 'chasing-wound', // Case fix
    'CHASING WOUND': 'chasing-wound', // Case fix
    'chasing zombie': 'chasing-zombie',
    'Chasing zombie': 'chasing-zombie', // Case fix
    'CHASING ZOMBIE': 'chasing-zombie', // Case fix
    'Check': 'check', // Case fix
    'Checkered': 'checkered', // Case fix
    'PEYNIR': 'cheese', // Case fix
    'Cheetah': 'cheetah', // Case fix
    'Aşçı': 'chef', // Case fix
    'AŞÇI': 'chef', // Case fix
    'Chewing': 'chewing', // Case fix
    'CHEWING': 'chewing', // Case fix
    'Tavuk': 'chicken', // Case fix
    'Çocuk': 'child', // Case fix
    'Chimney': 'chimney', // Case fix
    'CHIMNEY': 'chimney', // Case fix
    'Chimpanzee': 'chimpanzee', // Case fix
    'CHIMPANZEE': 'chimpanzee', // Case fix
    'ÇIKOLATA': 'chocolate', // Case fix
    'Koro': 'choir', // Case fix
    'Choking': 'choking', // Case fix
    'CHOKING': 'choking', // Case fix
    'kilise/mabet': 'church',
    'Kilise/Mabet': 'church', // Case fix
    'KILISE/MABET': 'church', // Case fix
    'Cinema': 'cinema', // Case fix
    'CINEMA': 'cinema', // Case fix
    'Circle': 'circle', // Case fix
    'CIRCLE': 'circle', // Case fix
    'Circus': 'circus', // Case fix
    'CIRCUS': 'circus', // Case fix
    'ŞEHIR': 'city', // Case fix
    'Clam': 'clam', // Case fix
    'Clean': 'clean', // Case fix
    'temizlik yapmak': 'cleaning',
    'Temizlik Yapmak': 'cleaning', // Case fix
    'TEMIZLIK YAPMAK': 'cleaning', // Case fix
    'Uçurum': 'cliff', // Case fix
    'Tırmanmak': 'climbing', // Case fix
    'TIRMANMAK': 'climbing', // Case fix
    'Saat': 'clock', // Case fix
    'Closet': 'closet', // Case fix
    'elbise/kıyafet': 'clothes',
    'Elbise/Kıyafet': 'clothes', // Case fix
    'ELBISE/KIYAFET': 'clothes', // Case fix
    'Bulut': 'cloud', // Case fix
    'Clown': 'clown', // Case fix
    'Mont': 'coat', // Case fix
    'hamamböceği': 'cockroach',
    'Hamamböceği': 'cockroach', // Case fix
    'HAMAMBÖCEĞI': 'cockroach', // Case fix
    'Kahve': 'coffee', // Case fix
    'Tabut': 'coffin', // Case fix
    'Cold': 'cold', // Case fix
    'Color': 'color', // Case fix
    'Comb': 'comb', // Case fix
    'kuyruklu yıldız': 'comet',
    'Kuyruklu yıldız': 'comet', // Case fix
    'KUYRUKLU YILDIZ': 'comet', // Case fix
    'Pergel': 'compass-drawing', // Case fix
    'pusula': 'compass',
    'Bilgisayar': 'computer', // Case fix
    'BILGISAYAR': 'computer', // Case fix
    'Oyun Konsolu': 'console', // Case fix
    'Contract': 'contract', // Case fix
    'yemek pişirmek': 'cooking',
    'Yemek Pişirmek': 'cooking', // Case fix
    'YEMEK PIŞIRMEK': 'cooking', // Case fix
    'Bakır': 'copper', // Case fix
    'BAKIR': 'copper', // Case fix
    'Koridor': 'corridor', // Case fix
    'KORIDOR': 'corridor', // Case fix
    'Kanepe': 'couch', // Case fix
    'öksürük': 'cough',
    'Coughing': 'coughing', // Case fix
    'COUGHING': 'coughing', // Case fix
    'i̇nek': 'cow',
    'İnek': 'cow', // Case fix
    'Crashing': 'crashing', // Case fix
    'CRASHING': 'crashing', // Case fix
    'krater': 'crater',
    'Crawling': 'crawling', // Case fix
    'CRAWLING': 'crawling', // Case fix
    'Credit card': 'credit-card', // Case fix
    'CREDIT CARD': 'credit-card', // Case fix
    'Cricket': 'cricket', // Case fix
    'CRICKET': 'cricket', // Case fix
    'timsah': 'crocodile',
    'TIMSAH': 'crocodile', // Case fix
    'Cross': 'cross', // Case fix
    'yol ayrımı': 'crossroads',
    'Yol ayrımı': 'crossroads', // Case fix
    'YOL AYRIMI': 'crossroads', // Case fix
    'karga': 'crow',
    'Karga': 'crow', // Case fix
    'Crowded': 'crowded', // Case fix
    'Taç': 'crown', // Case fix
    'koltuk değneği': 'crutch',
    'KOLTUK DEĞNEĞI': 'crutch', // Case fix
    'Ağlamak': 'crying', // Case fix
    'bardak': 'cup',
    'Minder': 'cushion', // Case fix
    'MINDER': 'cushion', // Case fix
    'Dam': 'dam', // Case fix
    'dancer': 'dancer',
    'Dancer': 'dancer', // Case fix
    'dans etmek': 'dancing',
    'Dans Etmek': 'dancing', // Case fix
    'Darkness': 'darkness', // Case fix
    'dead angel': 'dead-angel',
    'Dead angel': 'dead-angel', // Case fix
    'dead baby': 'dead-baby',
    'Dead baby': 'dead-baby', // Case fix
    'dead bear': 'dead-bear',
    'Dead bear': 'dead-bear', // Case fix
    'dead bird': 'dead-bird',
    'Dead bird': 'dead-bird', // Case fix
    'DEAD BIRD': 'dead-bird', // Case fix
    'dead blood': 'dead-blood',
    'Dead blood': 'dead-blood', // Case fix
    'dead bridge': 'dead-bridge',
    'Dead bridge': 'dead-bridge', // Case fix
    'DEAD BRIDGE': 'dead-bridge', // Case fix
    'dead car': 'dead-car',
    'Dead car': 'dead-car', // Case fix
    'dead cat': 'dead-cat',
    'Dead cat': 'dead-cat', // Case fix
    'dead crying': 'dead-crying',
    'Dead crying': 'dead-crying', // Case fix
    'DEAD CRYING': 'dead-crying', // Case fix
    'dead dancing': 'dead-dancing',
    'Dead dancing': 'dead-dancing', // Case fix
    'DEAD DANCING': 'dead-dancing', // Case fix
    'dead death': 'dead-death',
    'Dead death': 'dead-death', // Case fix
    'dead demon': 'dead-demon',
    'Dead demon': 'dead-demon', // Case fix
    'dead dog': 'dead-dog',
    'Dead dog': 'dead-dog', // Case fix
    'dead door': 'dead-door',
    'Dead door': 'dead-door', // Case fix
    'dead dragon': 'dead-dragon',
    'Dead dragon': 'dead-dragon', // Case fix
    'dead elephant': 'dead-elephant',
    'Dead elephant': 'dead-elephant', // Case fix
    'dead fighting': 'dead-fighting',
    'Dead fighting': 'dead-fighting', // Case fix
    'DEAD FIGHTING': 'dead-fighting', // Case fix
    'dead fire': 'dead-fire',
    'Dead fire': 'dead-fire', // Case fix
    'DEAD FIRE': 'dead-fire', // Case fix
    'dead fish': 'dead-fish',
    'Dead fish': 'dead-fish', // Case fix
    'DEAD FISH': 'dead-fish', // Case fix
    'dead flying': 'dead-flying',
    'Dead flying': 'dead-flying', // Case fix
    'DEAD FLYING': 'dead-flying', // Case fix
    'dead ghost': 'dead-ghost',
    'Dead ghost': 'dead-ghost', // Case fix
    'dead horse': 'dead-horse',
    'Dead horse': 'dead-horse', // Case fix
    'dead house': 'dead-house',
    'Dead house': 'dead-house', // Case fix
    'dead key': 'dead-key',
    'Dead key': 'dead-key', // Case fix
    'dead knife': 'dead-knife',
    'Dead knife': 'dead-knife', // Case fix
    'DEAD KNIFE': 'dead-knife', // Case fix
    'dead lion': 'dead-lion',
    'Dead lion': 'dead-lion', // Case fix
    'DEAD LION': 'dead-lion', // Case fix
    'dead money': 'dead-money',
    'Dead money': 'dead-money', // Case fix
    'dead mountain': 'dead-mountain',
    'Dead mountain': 'dead-mountain', // Case fix
    'DEAD MOUNTAIN': 'dead-mountain', // Case fix
    'dead ocean': 'dead-ocean',
    'Dead ocean': 'dead-ocean', // Case fix
    'Ölü': 'dead-person', // Case fix
    'dead rain': 'dead-rain',
    'Dead rain': 'dead-rain', // Case fix
    'DEAD RAIN': 'dead-rain', // Case fix
    'dead running': 'dead-running',
    'Dead running': 'dead-running', // Case fix
    'DEAD RUNNING': 'dead-running', // Case fix
    'dead shark': 'dead-shark',
    'Dead shark': 'dead-shark', // Case fix
    'dead snake': 'dead-snake',
    'Dead snake': 'dead-snake', // Case fix
    'dead snow': 'dead-snow',
    'Dead snow': 'dead-snow', // Case fix
    'dead spider': 'dead-spider',
    'Dead spider': 'dead-spider', // Case fix
    'DEAD SPIDER': 'dead-spider', // Case fix
    'dead stairs': 'dead-stairs',
    'Dead stairs': 'dead-stairs', // Case fix
    'DEAD STAIRS': 'dead-stairs', // Case fix
    'dead storm': 'dead-storm',
    'Dead storm': 'dead-storm', // Case fix
    'dead swimming': 'dead-swimming',
    'Dead swimming': 'dead-swimming', // Case fix
    'DEAD SWIMMING': 'dead-swimming', // Case fix
    'dead teeth falling out': 'dead-teeth-falling-out',
    'Dead teeth falling out': 'dead-teeth-falling-out', // Case fix
    'DEAD TEETH FALLING OUT': 'dead-teeth-falling-out', // Case fix
    'dead vampire': 'dead-vampire',
    'Dead vampire': 'dead-vampire', // Case fix
    'DEAD VAMPIRE': 'dead-vampire', // Case fix
    'dead water': 'dead-water',
    'Dead water': 'dead-water', // Case fix
    'dead wedding': 'dead-wedding',
    'Dead wedding': 'dead-wedding', // Case fix
    'DEAD WEDDING': 'dead-wedding', // Case fix
    'dead wolf': 'dead-wolf',
    'Dead wolf': 'dead-wolf', // Case fix
    'dead wound': 'dead-wound',
    'Dead wound': 'dead-wound', // Case fix
    'dead zombie': 'dead-zombie',
    'Dead zombie': 'dead-zombie', // Case fix
    'DEAD ZOMBIE': 'dead-zombie', // Case fix
    'Sağır': 'deaf', // Case fix
    'SAĞIR': 'deaf', // Case fix
    'Ölüm': 'death', // Case fix
    'GEYIK': 'deer', // Case fix
    'şeytan/i̇blis': 'demon',
    'Şeytan/İblis': 'demon', // Case fix
    'ŞEYTAN/İBLIS': 'demon', // Case fix
    'Diş Hekimi': 'dentist', // Case fix
    'DIŞ HEKIMI': 'dentist', // Case fix
    'Çöl': 'desert', // Case fix
    'detective': 'detective',
    'Detective': 'detective', // Case fix
    'DETECTIVE': 'detective', // Case fix
    'şeytan/i̇blis': 'devil',
    'Şeytan/İblis': 'devil', // Case fix
    'ŞEYTAN/İBLIS': 'devil', // Case fix
    'Dew': 'dew', // Case fix
    'Elmas': 'diamond', // Case fix
    'Günlük': 'diary-book', // Case fix
    'Diary': 'diary', // Case fix
    'DIARY': 'diary', // Case fix
    'Digging': 'digging', // Case fix
    'DIGGING': 'digging', // Case fix
    'Diploma': 'diploma', // Case fix
    'DIPLOMA': 'diploma', // Case fix
    'Dirty': 'dirty', // Case fix
    'DIRTY': 'dirty', // Case fix
    'Disco': 'disco', // Case fix
    'DISCO': 'disco', // Case fix
    'bulaşık makinesi': 'dishwasher',
    'BULAŞIK MAKINESI': 'dishwasher', // Case fix
    'dalmak': 'diving',
    'boşanma/ayrılık': 'divorce',
    'Boşanma/Ayrılık': 'divorce', // Case fix
    'BOŞANMA/AYRILIK': 'divorce', // Case fix
    'Doktor': 'doctor', // Case fix
    'Köpek': 'dog', // Case fix
    'doll': 'doll',
    'Doll': 'doll', // Case fix
    'Yunus': 'dolphin', // Case fix
    'eşek': 'donkey',
    'Kapı': 'door', // Case fix
    'KAPI': 'door', // Case fix
    'Paspas': 'doormat', // Case fix
    'Download': 'download', // Case fix
    'Ejderha': 'dragon', // Case fix
    'Dragonfly': 'dragonfly', // Case fix
    'Çekmece': 'drawer', // Case fix
    'Drawing': 'drawing', // Case fix
    'DRAWING': 'drawing', // Case fix
    'Dream': 'dream', // Case fix
    'Matkap': 'drill', // Case fix
    'şoför': 'driver',
    'Driveway': 'driveway', // Case fix
    'DRIVEWAY': 'driveway', // Case fix
    'araba kullanmak': 'driving',
    'Araba Kullanmak': 'driving', // Case fix
    'Drone': 'drone', // Case fix
    'boğulmak': 'drowning',
    'Davul': 'drum', // Case fix
    'Dry': 'dry', // Case fix
    'ördek': 'duck',
    'Ördek': 'duck', // Case fix
    'Dunes': 'dunes', // Case fix
    'Dust': 'dust', // Case fix
    'Dwarf': 'dwarf', // Case fix
    'Dying': 'dying', // Case fix
    'DYING': 'dying', // Case fix
    'Kartal': 'eagle', // Case fix
    'Kulak': 'ear', // Case fix
    'earrings': 'earrings',
    'Earrings': 'earrings', // Case fix
    'EARRINGS': 'earrings', // Case fix
    'Deprem': 'earthquake', // Case fix
    'yemek yemek': 'eating',
    'Yemek Yemek': 'eating', // Case fix
    'Echo': 'echo', // Case fix
    'Eclipse': 'eclipse', // Case fix
    'ECLIPSE': 'eclipse', // Case fix
    'Eel': 'eel', // Case fix
    'Yumurta': 'egg', // Case fix
    'Patlıcan': 'eggplant', // Case fix
    'PATLICAN': 'eggplant', // Case fix
    'Dirsek': 'elbow', // Case fix
    'DIRSEK': 'elbow', // Case fix
    'Yaşlı': 'elder', // Case fix
    'YAŞLI': 'elder', // Case fix
    'Fil': 'elephant', // Case fix
    'FIL': 'elephant', // Case fix
    'Asansör': 'elevator', // Case fix
    'Elk': 'elk', // Case fix
    'Düşman': 'enemy', // Case fix
    'MÜHENDIS': 'engineer', // Case fix
    'Zarf': 'envelope', // Case fix
    'Silgi': 'eraser', // Case fix
    'SILGI': 'eraser', // Case fix
    'Escalator': 'escalator', // Case fix
    'kaçmak': 'escaping',
    'Eski Sevgili': 'ex-partner', // Case fix
    'ESKI SEVGILI': 'ex-partner', // Case fix
    'Sınav': 'exam', // Case fix
    'SINAV': 'exam', // Case fix
    'Göz': 'eye', // Case fix
    'Yüz': 'face', // Case fix
    'Fabrika': 'factory', // Case fix
    'FABRIKA': 'factory', // Case fix
    'başarısızlık': 'failure',
    'BAŞARISIZLIK': 'failure', // Case fix
    'Peri': 'fairy', // Case fix
    'PERI': 'fairy', // Case fix
    'Falcon': 'falcon', // Case fix
    'Düşmek': 'falling', // Case fix
    'Pervane': 'fan', // Case fix
    'Çiftlik': 'farm', // Case fix
    'ÇIFTLIK': 'farm', // Case fix
    'Çiftçi': 'farmer', // Case fix
    'ÇIFTÇI': 'farmer', // Case fix
    'Fate': 'fate', // Case fix
    'Baba': 'father', // Case fix
    'Musluk': 'faucet', // Case fix
    'korku': 'fear',
    'Dışkı': 'feces', // Case fix
    'DIŞKI': 'feces', // Case fix
    'Fence': 'fence', // Case fix
    'bayram': 'festival',
    'Field': 'field', // Case fix
    'FIELD': 'field', // Case fix
    'Kavga': 'fight', // Case fix
    'Kavga': 'fighting', // Case fix
    'Dosya': 'file-folder', // Case fix
    'bulmak': 'finding',
    'Parmak': 'finger', // Case fix
    'i̇tfaiye arabası': 'fire-truck',
    'İtfaiye Arabası': 'fire-truck', // Case fix
    'İTFAIYE ARABASI': 'fire-truck', // Case fix
    'i̇tfaiyeci': 'firefighter',
    'İTFAIYECI': 'firefighter', // Case fix
    'Şömine': 'fireplace', // Case fix
    'ŞÖMINE': 'fireplace', // Case fix
    'Balık': 'fish', // Case fix
    'BALIK': 'fish', // Case fix
    'Flag': 'flag', // Case fix
    'Flamingo': 'flamingo', // Case fix
    'FLAMINGO': 'flamingo', // Case fix
    'El feneri': 'flashlight', // Case fix
    'EL FENERI': 'flashlight', // Case fix
    'Flea': 'flea', // Case fix
    'Floating': 'floating', // Case fix
    'FLOATING': 'floating', // Case fix
    'Sel': 'flood', // Case fix
    'Floor': 'floor', // Case fix
    'un': 'flour',
    'çiçek bahçesi': 'flower-garden',
    'ÇIÇEK BAHÇESI': 'flower-garden', // Case fix
    'Çiçek': 'flower', // Case fix
    'ÇIÇEK': 'flower', // Case fix
    'Flüt': 'flute', // Case fix
    'Sinek': 'fly', // Case fix
    'SINEK': 'fly', // Case fix
    'flying angel': 'flying-angel',
    'Flying angel': 'flying-angel', // Case fix
    'FLYING ANGEL': 'flying-angel', // Case fix
    'flying baby': 'flying-baby',
    'Flying baby': 'flying-baby', // Case fix
    'FLYING BABY': 'flying-baby', // Case fix
    'flying bear': 'flying-bear',
    'Flying bear': 'flying-bear', // Case fix
    'FLYING BEAR': 'flying-bear', // Case fix
    'flying bird': 'flying-bird',
    'Flying bird': 'flying-bird', // Case fix
    'FLYING BIRD': 'flying-bird', // Case fix
    'flying blood': 'flying-blood',
    'Flying blood': 'flying-blood', // Case fix
    'FLYING BLOOD': 'flying-blood', // Case fix
    'flying bridge': 'flying-bridge',
    'Flying bridge': 'flying-bridge', // Case fix
    'FLYING BRIDGE': 'flying-bridge', // Case fix
    'flying car': 'flying-car',
    'Flying car': 'flying-car', // Case fix
    'FLYING CAR': 'flying-car', // Case fix
    'flying cat': 'flying-cat',
    'Flying cat': 'flying-cat', // Case fix
    'FLYING CAT': 'flying-cat', // Case fix
    'flying crying': 'flying-crying',
    'Flying crying': 'flying-crying', // Case fix
    'FLYING CRYING': 'flying-crying', // Case fix
    'flying dancing': 'flying-dancing',
    'Flying dancing': 'flying-dancing', // Case fix
    'FLYING DANCING': 'flying-dancing', // Case fix
    'flying death': 'flying-death',
    'Flying death': 'flying-death', // Case fix
    'FLYING DEATH': 'flying-death', // Case fix
    'flying demon': 'flying-demon',
    'Flying demon': 'flying-demon', // Case fix
    'FLYING DEMON': 'flying-demon', // Case fix
    'flying dog': 'flying-dog',
    'Flying dog': 'flying-dog', // Case fix
    'FLYING DOG': 'flying-dog', // Case fix
    'flying door': 'flying-door',
    'Flying door': 'flying-door', // Case fix
    'FLYING DOOR': 'flying-door', // Case fix
    'flying dragon': 'flying-dragon',
    'Flying dragon': 'flying-dragon', // Case fix
    'FLYING DRAGON': 'flying-dragon', // Case fix
    'flying elephant': 'flying-elephant',
    'Flying elephant': 'flying-elephant', // Case fix
    'FLYING ELEPHANT': 'flying-elephant', // Case fix
    'flying fighting': 'flying-fighting',
    'Flying fighting': 'flying-fighting', // Case fix
    'FLYING FIGHTING': 'flying-fighting', // Case fix
    'flying fire': 'flying-fire',
    'Flying fire': 'flying-fire', // Case fix
    'FLYING FIRE': 'flying-fire', // Case fix
    'flying fish': 'flying-fish',
    'Flying fish': 'flying-fish', // Case fix
    'FLYING FISH': 'flying-fish', // Case fix
    'flying flying': 'flying-flying',
    'Flying flying': 'flying-flying', // Case fix
    'FLYING FLYING': 'flying-flying', // Case fix
    'flying ghost': 'flying-ghost',
    'Flying ghost': 'flying-ghost', // Case fix
    'FLYING GHOST': 'flying-ghost', // Case fix
    'flying horse': 'flying-horse',
    'Flying horse': 'flying-horse', // Case fix
    'FLYING HORSE': 'flying-horse', // Case fix
    'flying house': 'flying-house',
    'Flying house': 'flying-house', // Case fix
    'FLYING HOUSE': 'flying-house', // Case fix
    'flying key': 'flying-key',
    'Flying key': 'flying-key', // Case fix
    'FLYING KEY': 'flying-key', // Case fix
    'flying knife': 'flying-knife',
    'Flying knife': 'flying-knife', // Case fix
    'FLYING KNIFE': 'flying-knife', // Case fix
    'flying lion': 'flying-lion',
    'Flying lion': 'flying-lion', // Case fix
    'FLYING LION': 'flying-lion', // Case fix
    'flying money': 'flying-money',
    'Flying money': 'flying-money', // Case fix
    'FLYING MONEY': 'flying-money', // Case fix
    'flying mountain': 'flying-mountain',
    'Flying mountain': 'flying-mountain', // Case fix
    'FLYING MOUNTAIN': 'flying-mountain', // Case fix
    'flying ocean': 'flying-ocean',
    'Flying ocean': 'flying-ocean', // Case fix
    'FLYING OCEAN': 'flying-ocean', // Case fix
    'flying rain': 'flying-rain',
    'Flying rain': 'flying-rain', // Case fix
    'FLYING RAIN': 'flying-rain', // Case fix
    'flying running': 'flying-running',
    'Flying running': 'flying-running', // Case fix
    'FLYING RUNNING': 'flying-running', // Case fix
    'flying shark': 'flying-shark',
    'Flying shark': 'flying-shark', // Case fix
    'FLYING SHARK': 'flying-shark', // Case fix
    'flying snake': 'flying-snake',
    'Flying snake': 'flying-snake', // Case fix
    'FLYING SNAKE': 'flying-snake', // Case fix
    'flying snow': 'flying-snow',
    'Flying snow': 'flying-snow', // Case fix
    'FLYING SNOW': 'flying-snow', // Case fix
    'flying spider': 'flying-spider',
    'Flying spider': 'flying-spider', // Case fix
    'FLYING SPIDER': 'flying-spider', // Case fix
    'flying stairs': 'flying-stairs',
    'Flying stairs': 'flying-stairs', // Case fix
    'FLYING STAIRS': 'flying-stairs', // Case fix
    'flying storm': 'flying-storm',
    'Flying storm': 'flying-storm', // Case fix
    'FLYING STORM': 'flying-storm', // Case fix
    'flying swimming': 'flying-swimming',
    'Flying swimming': 'flying-swimming', // Case fix
    'FLYING SWIMMING': 'flying-swimming', // Case fix
    'flying teeth falling out': 'flying-teeth-falling-out',
    'Flying teeth falling out': 'flying-teeth-falling-out', // Case fix
    'FLYING TEETH FALLING OUT': 'flying-teeth-falling-out', // Case fix
    'flying vampire': 'flying-vampire',
    'Flying vampire': 'flying-vampire', // Case fix
    'FLYING VAMPIRE': 'flying-vampire', // Case fix
    'flying water': 'flying-water',
    'Flying water': 'flying-water', // Case fix
    'FLYING WATER': 'flying-water', // Case fix
    'flying wedding': 'flying-wedding',
    'Flying wedding': 'flying-wedding', // Case fix
    'FLYING WEDDING': 'flying-wedding', // Case fix
    'flying wolf': 'flying-wolf',
    'Flying wolf': 'flying-wolf', // Case fix
    'FLYING WOLF': 'flying-wolf', // Case fix
    'flying wound': 'flying-wound',
    'Flying wound': 'flying-wound', // Case fix
    'FLYING WOUND': 'flying-wound', // Case fix
    'flying zombie': 'flying-zombie',
    'Flying zombie': 'flying-zombie', // Case fix
    'FLYING ZOMBIE': 'flying-zombie', // Case fix
    'Uçmak': 'flying', // Case fix
    'Sis': 'fog', // Case fix
    'SIS': 'fog', // Case fix
    'Yemek': 'food', // Case fix
    'Ayak': 'foot', // Case fix
    'Futbol': 'football', // Case fix
    'Orman': 'forest', // Case fix
    'Fortress': 'fortress', // Case fix
    'Fountain': 'fountain', // Case fix
    'FOUNTAIN': 'fountain', // Case fix
    'Four': 'four', // Case fix
    'Tilki': 'fox', // Case fix
    'TILKI': 'fox', // Case fix
    'Çerçeve': 'frame', // Case fix
    'Freezer': 'freezer', // Case fix
    'Freezing': 'freezing', // Case fix
    'FREEZING': 'freezing', // Case fix
    'Fresh': 'fresh', // Case fix
    'buzdolabı': 'fridge',
    'BUZDOLABI': 'fridge', // Case fix
    'Arkadaş': 'friend', // Case fix
    'kurbağa': 'frog',
    'Frost': 'frost', // Case fix
    'meyve': 'fruit',
    'Meyve': 'fruit', // Case fix
    'Cenaze': 'funeral', // Case fix
    'Future': 'future', // Case fix
    'Futuristic': 'futuristic', // Case fix
    'FUTURISTIC': 'futuristic', // Case fix
    'Galaxy': 'galaxy', // Case fix
    'Garage': 'garage', // Case fix
    'Bahçe': 'garden', // Case fix
    'bahçıvan': 'gardener',
    'BAHÇIVAN': 'gardener', // Case fix
    'SARIMSAK': 'garlic', // Case fix
    'benzinlik': 'gas-station',
    'BENZINLIK': 'gas-station', // Case fix
    'Gate': 'gate', // Case fix
    'kaybolmak': 'getting-lost',
    'Geyser': 'geyser', // Case fix
    'Hayalet': 'ghost', // Case fix
    'giant angel': 'giant-angel',
    'Giant angel': 'giant-angel', // Case fix
    'GIANT ANGEL': 'giant-angel', // Case fix
    'giant baby': 'giant-baby',
    'Giant baby': 'giant-baby', // Case fix
    'GIANT BABY': 'giant-baby', // Case fix
    'giant bear': 'giant-bear',
    'Giant bear': 'giant-bear', // Case fix
    'GIANT BEAR': 'giant-bear', // Case fix
    'giant bird': 'giant-bird',
    'Giant bird': 'giant-bird', // Case fix
    'GIANT BIRD': 'giant-bird', // Case fix
    'giant blood': 'giant-blood',
    'Giant blood': 'giant-blood', // Case fix
    'GIANT BLOOD': 'giant-blood', // Case fix
    'giant bridge': 'giant-bridge',
    'Giant bridge': 'giant-bridge', // Case fix
    'GIANT BRIDGE': 'giant-bridge', // Case fix
    'giant car': 'giant-car',
    'Giant car': 'giant-car', // Case fix
    'GIANT CAR': 'giant-car', // Case fix
    'giant cat': 'giant-cat',
    'Giant cat': 'giant-cat', // Case fix
    'GIANT CAT': 'giant-cat', // Case fix
    'giant crying': 'giant-crying',
    'Giant crying': 'giant-crying', // Case fix
    'GIANT CRYING': 'giant-crying', // Case fix
    'giant dancing': 'giant-dancing',
    'Giant dancing': 'giant-dancing', // Case fix
    'GIANT DANCING': 'giant-dancing', // Case fix
    'giant death': 'giant-death',
    'Giant death': 'giant-death', // Case fix
    'GIANT DEATH': 'giant-death', // Case fix
    'giant demon': 'giant-demon',
    'Giant demon': 'giant-demon', // Case fix
    'GIANT DEMON': 'giant-demon', // Case fix
    'giant dog': 'giant-dog',
    'Giant dog': 'giant-dog', // Case fix
    'GIANT DOG': 'giant-dog', // Case fix
    'giant door': 'giant-door',
    'Giant door': 'giant-door', // Case fix
    'GIANT DOOR': 'giant-door', // Case fix
    'giant dragon': 'giant-dragon',
    'Giant dragon': 'giant-dragon', // Case fix
    'GIANT DRAGON': 'giant-dragon', // Case fix
    'giant elephant': 'giant-elephant',
    'Giant elephant': 'giant-elephant', // Case fix
    'GIANT ELEPHANT': 'giant-elephant', // Case fix
    'giant fighting': 'giant-fighting',
    'Giant fighting': 'giant-fighting', // Case fix
    'GIANT FIGHTING': 'giant-fighting', // Case fix
    'giant fire': 'giant-fire',
    'Giant fire': 'giant-fire', // Case fix
    'GIANT FIRE': 'giant-fire', // Case fix
    'giant fish': 'giant-fish',
    'Giant fish': 'giant-fish', // Case fix
    'GIANT FISH': 'giant-fish', // Case fix
    'giant flying': 'giant-flying',
    'Giant flying': 'giant-flying', // Case fix
    'GIANT FLYING': 'giant-flying', // Case fix
    'giant ghost': 'giant-ghost',
    'Giant ghost': 'giant-ghost', // Case fix
    'GIANT GHOST': 'giant-ghost', // Case fix
    'giant horse': 'giant-horse',
    'Giant horse': 'giant-horse', // Case fix
    'GIANT HORSE': 'giant-horse', // Case fix
    'giant house': 'giant-house',
    'Giant house': 'giant-house', // Case fix
    'GIANT HOUSE': 'giant-house', // Case fix
    'giant key': 'giant-key',
    'Giant key': 'giant-key', // Case fix
    'GIANT KEY': 'giant-key', // Case fix
    'giant knife': 'giant-knife',
    'Giant knife': 'giant-knife', // Case fix
    'GIANT KNIFE': 'giant-knife', // Case fix
    'giant lion': 'giant-lion',
    'Giant lion': 'giant-lion', // Case fix
    'GIANT LION': 'giant-lion', // Case fix
    'giant money': 'giant-money',
    'Giant money': 'giant-money', // Case fix
    'GIANT MONEY': 'giant-money', // Case fix
    'giant mountain': 'giant-mountain',
    'Giant mountain': 'giant-mountain', // Case fix
    'GIANT MOUNTAIN': 'giant-mountain', // Case fix
    'giant ocean': 'giant-ocean',
    'Giant ocean': 'giant-ocean', // Case fix
    'GIANT OCEAN': 'giant-ocean', // Case fix
    'giant rain': 'giant-rain',
    'Giant rain': 'giant-rain', // Case fix
    'GIANT RAIN': 'giant-rain', // Case fix
    'giant running': 'giant-running',
    'Giant running': 'giant-running', // Case fix
    'GIANT RUNNING': 'giant-running', // Case fix
    'giant shark': 'giant-shark',
    'Giant shark': 'giant-shark', // Case fix
    'GIANT SHARK': 'giant-shark', // Case fix
    'giant snake': 'giant-snake',
    'Giant snake': 'giant-snake', // Case fix
    'GIANT SNAKE': 'giant-snake', // Case fix
    'giant snow': 'giant-snow',
    'Giant snow': 'giant-snow', // Case fix
    'GIANT SNOW': 'giant-snow', // Case fix
    'giant spider': 'giant-spider',
    'Giant spider': 'giant-spider', // Case fix
    'GIANT SPIDER': 'giant-spider', // Case fix
    'giant stairs': 'giant-stairs',
    'Giant stairs': 'giant-stairs', // Case fix
    'GIANT STAIRS': 'giant-stairs', // Case fix
    'giant storm': 'giant-storm',
    'Giant storm': 'giant-storm', // Case fix
    'GIANT STORM': 'giant-storm', // Case fix
    'giant swimming': 'giant-swimming',
    'Giant swimming': 'giant-swimming', // Case fix
    'GIANT SWIMMING': 'giant-swimming', // Case fix
    'giant teeth falling out': 'giant-teeth-falling-out',
    'Giant teeth falling out': 'giant-teeth-falling-out', // Case fix
    'GIANT TEETH FALLING OUT': 'giant-teeth-falling-out', // Case fix
    'giant vampire': 'giant-vampire',
    'Giant vampire': 'giant-vampire', // Case fix
    'GIANT VAMPIRE': 'giant-vampire', // Case fix
    'giant water': 'giant-water',
    'Giant water': 'giant-water', // Case fix
    'GIANT WATER': 'giant-water', // Case fix
    'giant wedding': 'giant-wedding',
    'Giant wedding': 'giant-wedding', // Case fix
    'GIANT WEDDING': 'giant-wedding', // Case fix
    'giant wolf': 'giant-wolf',
    'Giant wolf': 'giant-wolf', // Case fix
    'GIANT WOLF': 'giant-wolf', // Case fix
    'giant wound': 'giant-wound',
    'Giant wound': 'giant-wound', // Case fix
    'GIANT WOUND': 'giant-wound', // Case fix
    'giant zombie': 'giant-zombie',
    'Giant zombie': 'giant-zombie', // Case fix
    'GIANT ZOMBIE': 'giant-zombie', // Case fix
    'dev/titan': 'giant',
    'Dev/Titan': 'giant', // Case fix
    'DEV/TITAN': 'giant', // Case fix
    'Hediye': 'gift', // Case fix
    'HEDIYE': 'gift', // Case fix
    'vermek': 'giving',
    'Glacier': 'glacier', // Case fix
    'GLACIER': 'glacier', // Case fix
    'Cam': 'glass', // Case fix
    'Gözlük': 'glasses', // Case fix
    'Küre': 'globe', // Case fix
    'Eldiven': 'gloves', // Case fix
    'ELDIVEN': 'gloves', // Case fix
    'Glowing': 'glowing', // Case fix
    'GLOWING': 'glowing', // Case fix
    'Yapıştırıcı': 'glue', // Case fix
    'YAPIŞTIRICI': 'glue', // Case fix
    'keçi': 'goat',
    'KEÇI': 'goat', // Case fix
    'altın rengi': 'gold',
    'Altın Rengi': 'gold', // Case fix
    'ALTIN RENGI': 'gold', // Case fix
    'Golf': 'golf', // Case fix
    'Goose': 'goose', // Case fix
    'Gorilla': 'gorilla', // Case fix
    'GORILLA': 'gorilla', // Case fix
    'Grail': 'grail', // Case fix
    'GRAIL': 'grail', // Case fix
    'büyükanne/büyükbaba': 'grandparent',
    'Büyükanne/Büyükbaba': 'grandparent', // Case fix
    'Üzüm': 'grapes', // Case fix
    'Grasshopper': 'grasshopper', // Case fix
    'Rende': 'grater', // Case fix
    'Mezar': 'grave', // Case fix
    'Mezarlık': 'graveyard', // Case fix
    'MEZARLIK': 'graveyard', // Case fix
    'Gray': 'gray', // Case fix
    'yeşil renk': 'green',
    'Yeşil Renk': 'green', // Case fix
    'YEŞIL RENK': 'green', // Case fix
    'Greenhouse': 'greenhouse', // Case fix
    'Gri': 'grey', // Case fix
    'GRI': 'grey', // Case fix
    'Damat': 'groom', // Case fix
    'Gitar': 'guitar', // Case fix
    'GITAR': 'guitar', // Case fix
    'Silah': 'gun', // Case fix
    'SILAH': 'gun', // Case fix
    'Gym': 'gym', // Case fix
    'Hail': 'hail', // Case fix
    'HAIL': 'hail', // Case fix
    'Saç': 'hair', // Case fix
    'Hallway': 'hallway', // Case fix
    'Çekiç': 'hammer', // Case fix
    'ÇEKIÇ': 'hammer', // Case fix
    'El': 'hand', // Case fix
    'mutluluk': 'happiness',
    'Mutluluk': 'happiness', // Case fix
    'Harvesting': 'harvesting', // Case fix
    'HARVESTING': 'harvesting', // Case fix
    'Şapka': 'hat', // Case fix
    'nefret': 'hate',
    'Hawk': 'hawk', // Case fix
    'Baş': 'head', // Case fix
    'Kulaklık': 'headphones', // Case fix
    'KULAKLIK': 'headphones', // Case fix
    'şifa': 'healing',
    'ŞIFA': 'healing', // Case fix
    'Kalp': 'heart', // Case fix
    'cennet': 'heaven',
    'Heavy': 'heavy', // Case fix
    'kirpi': 'hedgehog',
    'KIRPI': 'hedgehog', // Case fix
    'Helikopter': 'helicopter', // Case fix
    'HELIKOPTER': 'helicopter', // Case fix
    'cehennem': 'hell',
    'helmet': 'helmet',
    'Helmet': 'helmet', // Case fix
    'saklanmak': 'hiding',
    'hill': 'hill',
    'Hill': 'hill', // Case fix
    'HILL': 'hill', // Case fix
    'Hippo': 'hippo', // Case fix
    'HIPPO': 'hippo', // Case fix
    'kurban/bayram': 'holiday',
    'Kurban/Bayram': 'holiday', // Case fix
    'Hollow': 'hollow', // Case fix
    'Bal': 'honey', // Case fix
    'At': 'horse', // Case fix
    'Hastane': 'hospital', // Case fix
    'Hot': 'hot', // Case fix
    'Otel': 'hotel', // Case fix
    'Ev': 'house', // Case fix
    'Sarılmak': 'hugging', // Case fix
    'SARILMAK': 'hugging', // Case fix
    'Hummingbird': 'hummingbird', // Case fix
    'HUMMINGBIRD': 'hummingbird', // Case fix
    'KASIRGA': 'hurricane', // Case fix
    'Hut': 'hut', // Case fix
    'Hyena': 'hyena', // Case fix
    'Ice': 'ice', // Case fix
    'Iceberg': 'iceberg', // Case fix
    'Igloo': 'igloo', // Case fix
    'Indigo': 'indigo', // Case fix
    'INDIGO': 'indigo', // Case fix
    'Infinity': 'infinity', // Case fix
    'INFINITY': 'infinity', // Case fix
    'Mürekkep': 'ink', // Case fix
    'Böcek': 'insect', // Case fix
    'Internet': 'internet', // Case fix
    'bağırsak': 'intestines',
    'BAĞIRSAK': 'intestines', // Case fix
    'Invisible': 'invisible', // Case fix
    'INVISIBLE': 'invisible', // Case fix
    'ütü': 'iron-appliance',
    'Demir': 'iron', // Case fix
    'DEMIR': 'iron', // Case fix
    'Ironing': 'ironing', // Case fix
    'IRONING': 'ironing', // Case fix
    'Ada': 'island', // Case fix
    'Jaguar': 'jaguar', // Case fix
    'Jar': 'jar', // Case fix
    'kıskançlık': 'jealousy',
    'KISKANÇLIK': 'jealousy', // Case fix
    'Denizanası': 'jellyfish', // Case fix
    'DENIZANASI': 'jellyfish', // Case fix
    'mücevher': 'jewelry',
    'Mücevher': 'jewelry', // Case fix
    'sevinç': 'joy',
    'SEVINÇ': 'joy', // Case fix
    'hakim (yargıç)': 'judge',
    'Hakim (Yargıç)': 'judge', // Case fix
    'HAKIM (YARGIÇ)': 'judge', // Case fix
    'Jumping': 'jumping', // Case fix
    'JUMPING': 'jumping', // Case fix
    'Jungle': 'jungle', // Case fix
    'Kangaroo': 'kangaroo', // Case fix
    'Anahtar': 'key', // Case fix
    'Klavye': 'keyboard', // Case fix
    'Anahtarlık': 'keychain', // Case fix
    'ANAHTARLIK': 'keychain', // Case fix
    'Keyhole': 'keyhole', // Case fix
    'böbrek': 'kidney',
    'Öldürmek': 'killing', // Case fix
    'Kral': 'king', // Case fix
    'Öpücük': 'kiss', // Case fix
    'Öpmek': 'kissing', // Case fix
    'Mutfak': 'kitchen', // Case fix
    'kite': 'kite',
    'Kite': 'kite', // Case fix
    'KITE': 'kite', // Case fix
    'Diz': 'knee', // Case fix
    'DIZ': 'knee', // Case fix
    'Kneeling': 'kneeling', // Case fix
    'KNEELING': 'kneeling', // Case fix
    'BIÇAK': 'knife', // Case fix
    'Knitting': 'knitting', // Case fix
    'KNITTING': 'knitting', // Case fix
    'Knob': 'knob', // Case fix
    'Knot': 'knot', // Case fix
    'Koala': 'koala', // Case fix
    'labirent': 'labyrinth',
    'LABIRENT': 'labyrinth', // Case fix
    'Ladder': 'ladder', // Case fix
    'Ladybug': 'ladybug', // Case fix
    'Göl': 'lake', // Case fix
    'lamba / işık': 'lamp',
    'Lamba / Işık': 'lamp', // Case fix
    'LAMBA / IŞIK': 'lamp', // Case fix
    'Landslide': 'landslide', // Case fix
    'LANDSLIDE': 'landslide', // Case fix
    'Dizüstü bilgisayar': 'laptop', // Case fix
    'DIZÜSTÜ BILGISAYAR': 'laptop', // Case fix
    'Lazer': 'laser', // Case fix
    'geç kalmak': 'late',
    'Geç Kalmak': 'late', // Case fix
    'Gülmek': 'laughing', // Case fix
    'Lava': 'lava', // Case fix
    'Lead': 'lead', // Case fix
    'yaprak': 'leaf',
    'Learning': 'learning', // Case fix
    'LEARNING': 'learning', // Case fix
    'bacak': 'leg',
    'Bacak': 'leg', // Case fix
    'Limon': 'lemon', // Case fix
    'LIMON': 'lemon', // Case fix
    'Leopard': 'leopard', // Case fix
    'mektup/mesaj': 'letter',
    'Mektup/Mesaj': 'letter', // Case fix
    'Kütüphane': 'library', // Case fix
    'Life': 'life', // Case fix
    'LIFE': 'life', // Case fix
    'Light': 'light', // Case fix
    'LIGHT': 'light', // Case fix
    'Lighter': 'lighter', // Case fix
    'LIGHTER': 'lighter', // Case fix
    'Lighthouse': 'lighthouse', // Case fix
    'LIGHTHOUSE': 'lighthouse', // Case fix
    'yıldırım/şimşek': 'lightning',
    'Yıldırım/Şimşek': 'lightning', // Case fix
    'YILDIRIM/ŞIMŞEK': 'lightning', // Case fix
    'Lightweight': 'lightweight', // Case fix
    'LIGHTWEIGHT': 'lightweight', // Case fix
    'Limping': 'limping', // Case fix
    'LIMPING': 'limping', // Case fix
    'Aslan': 'lion', // Case fix
    'Dudak': 'lips', // Case fix
    'Lobster': 'lobster', // Case fix
    'kilit': 'lock',
    'KILIT': 'lock', // Case fix
    'yalnızlık': 'loneliness',
    'YALNIZLIK': 'loneliness', // Case fix
    'özlem': 'longing',
    'kaybetmek': 'losing',
    'kaybolmak': 'lost',
    'piyango/şans oyunu': 'lottery',
    'Piyango/Şans Oyunu': 'lottery', // Case fix
    'PIYANGO/ŞANS OYUNU': 'lottery', // Case fix
    'şans': 'luck',
    'Luggage': 'luggage', // Case fix
    'ay tutulması': 'lunar-eclipse',
    'AY TUTULMASI': 'lunar-eclipse', // Case fix
    'akciğer': 'lungs',
    'AKCIĞER': 'lungs', // Case fix
    'Magma': 'magma', // Case fix
    'Magnet': 'magnet', // Case fix
    'hizmetçi': 'maid',
    'HIZMETÇI': 'maid', // Case fix
    'Makeup': 'makeup', // Case fix
    'Mall': 'mall', // Case fix
    'man': 'man',
    'Man': 'man', // Case fix
    'Mandala': 'mandala', // Case fix
    'harita': 'map',
    'HARITA': 'map', // Case fix
    'Pazar': 'market', // Case fix
    'Maroon': 'maroon', // Case fix
    'Match': 'match', // Case fix
    'Matte': 'matte', // Case fix
    'Mattress': 'mattress', // Case fix
    'Maze': 'maze', // Case fix
    'Meadow': 'meadow', // Case fix
    'Et': 'meat', // Case fix
    'Madalya': 'medal', // Case fix
    'i̇laç': 'medicine',
    'Melting': 'melting', // Case fix
    'MELTING': 'melting', // Case fix
    'Memory': 'memory', // Case fix
    'Deniz kızı': 'mermaid', // Case fix
    'DENIZ KIZI': 'mermaid', // Case fix
    'meteor': 'meteor',
    'Mikrofon': 'microphone', // Case fix
    'MIKROFON': 'microphone', // Case fix
    'Microscope': 'microscope', // Case fix
    'MICROSCOPE': 'microscope', // Case fix
    'Microwave': 'microwave', // Case fix
    'MICROWAVE': 'microwave', // Case fix
    'Ayna': 'mirror', // Case fix
    'Mist': 'mist', // Case fix
    'MIST': 'mist', // Case fix
    'Para': 'money', // Case fix
    'Maymun': 'monkey', // Case fix
    'Monster': 'monster', // Case fix
    'Ay': 'moon', // Case fix
    'Moose': 'moose', // Case fix
    'Mop': 'mop', // Case fix
    'Cami': 'mosque', // Case fix
    'CAMI': 'mosque', // Case fix
    'Mosquito': 'mosquito', // Case fix
    'MOSQUITO': 'mosquito', // Case fix
    'Moth': 'moth', // Case fix
    'Anne': 'mother', // Case fix
    'Kaynana': 'mother_in_law', // Case fix
    'motosiklet': 'motorcycle',
    'MOTOSIKLET': 'motorcycle', // Case fix
    'Dağ': 'mountain', // Case fix
    'Fare': 'mouse-computer', // Case fix
    'Fare': 'mouse', // Case fix
    'Ağız': 'mouth', // Case fix
    'AĞIZ': 'mouth', // Case fix
    'taşınma/ev değiştirme': 'moving',
    'Taşınma/Ev Değiştirme': 'moving', // Case fix
    'TAŞINMA/EV DEĞIŞTIRME': 'moving', // Case fix
    'Çamur': 'mud', // Case fix
    'Mug': 'mug', // Case fix
    'Müze': 'museum', // Case fix
    'Müzik': 'music', // Case fix
    'MÜZIK': 'music', // Case fix
    'Nota': 'musical-note', // Case fix
    'Müzisyen': 'musician', // Case fix
    'MÜZISYEN': 'musician', // Case fix
    'Tırnak': 'nail-body', // Case fix
    'TIRNAK': 'nail-body', // Case fix
    'Çivi': 'nail-hardware', // Case fix
    'ÇIVI': 'nail-hardware', // Case fix
    'Nail': 'nail', // Case fix
    'NAIL': 'nail', // Case fix
    'çıplak olmak': 'naked',
    'Çıplak Olmak': 'naked', // Case fix
    'ÇIPLAK OLMAK': 'naked', // Case fix
    'Napkin': 'napkin', // Case fix
    'NAPKIN': 'napkin', // Case fix
    'Boyun': 'neck', // Case fix
    'Kolye': 'necklace', // Case fix
    'Iğne': 'needle', // Case fix
    'Komşu': 'neighbor', // Case fix
    'Neon': 'neon', // Case fix
    'Ağ': 'net', // Case fix
    'Newspaper': 'newspaper', // Case fix
    'Nightmare': 'nightmare', // Case fix
    'NIGHTMARE': 'nightmare', // Case fix
    'Noise': 'noise', // Case fix
    'NOISE': 'noise', // Case fix
    'erişte / makarna': 'noodles',
    'Erişte / Makarna': 'noodles', // Case fix
    'ERIŞTE / MAKARNA': 'noodles', // Case fix
    'kuzey işıkları': 'northern-lights',
    'KUZEY IŞIKLARI': 'northern-lights', // Case fix
    'Burun': 'nose', // Case fix
    'Defter': 'notebook', // Case fix
    'Çıplaklık': 'nudity', // Case fix
    'ÇIPLAKLIK': 'nudity', // Case fix
    'Number': 'number', // Case fix
    'HEMŞIRE': 'nurse', // Case fix
    'Oasis': 'oasis', // Case fix
    'OASIS': 'oasis', // Case fix
    'şişmanlık': 'obesity',
    'ŞIŞMANLIK': 'obesity', // Case fix
    'okyanus/deniz': 'ocean',
    'Okyanus/Deniz': 'ocean', // Case fix
    'OKYANUS/DENIZ': 'ocean', // Case fix
    'ofis': 'office',
    'Ofis': 'office', // Case fix
    'OFIS': 'office', // Case fix
    'Oil': 'oil', // Case fix
    'OIL': 'oil', // Case fix
    'zeytin': 'olive',
    'ZEYTIN': 'olive', // Case fix
    'Turuncu': 'orange-color', // Case fix
    'turuncu renk': 'orange',
    'Turuncu Renk': 'orange', // Case fix
    'orchard': 'orchard',
    'Orchard': 'orchard', // Case fix
    'Order': 'order', // Case fix
    'Yetim': 'orphan', // Case fix
    'YETIM': 'orphan', // Case fix
    'Ostrich': 'ostrich', // Case fix
    'OSTRICH': 'ostrich', // Case fix
    'Otter': 'otter', // Case fix
    'fırın': 'oven',
    'FIRIN': 'oven', // Case fix
    'Baykuş': 'owl', // Case fix
    'Oyster': 'oyster', // Case fix
    'Package': 'package', // Case fix
    'Packing': 'packing', // Case fix
    'PACKING': 'packing', // Case fix
    'Boya Fırçası': 'paint-brush', // Case fix
    'BOYA FIRÇASI': 'paint-brush', // Case fix
    'Paint': 'paint', // Case fix
    'PAINT': 'paint', // Case fix
    'boyamak': 'painting',
    'Saray': 'palace', // Case fix
    'tava': 'pan',
    'Panda': 'panda', // Case fix
    'Panther': 'panther', // Case fix
    'Kağıt': 'paper', // Case fix
    'KAĞIT': 'paper', // Case fix
    'Ataç': 'paperclip', // Case fix
    'paraşüt': 'parachute',
    'Park': 'park', // Case fix
    'Parking': 'parking', // Case fix
    'PARKING': 'parking', // Case fix
    'papağan': 'parrot',
    'Papağan': 'parrot', // Case fix
    'Sevgili': 'partner', // Case fix
    'SEVGILI': 'partner', // Case fix
    'pasaport': 'passport',
    'Şifre': 'password', // Case fix
    'ŞIFRE': 'password', // Case fix
    'Past': 'past', // Case fix
    'Pastel': 'pastel', // Case fix
    'Pattern': 'pattern', // Case fix
    'Paying': 'paying', // Case fix
    'PAYING': 'paying', // Case fix
    'tavuskuşu': 'peacock',
    'Tavuskuşu': 'peacock', // Case fix
    'Pearl': 'pearl', // Case fix
    'Kalem': 'pen', // Case fix
    'Kalemtıraş': 'pencil-sharpener', // Case fix
    'KALEMTIRAŞ': 'pencil-sharpener', // Case fix
    'Perfume': 'perfume', // Case fix
    'eczane': 'pharmacy',
    'Anka kuşu': 'phoenix', // Case fix
    'Telefon': 'phone', // Case fix
    'Piyano': 'piano', // Case fix
    'PIYANO': 'piano', // Case fix
    'Picture frame': 'picture-frame', // Case fix
    'PICTURE FRAME': 'picture-frame', // Case fix
    'Picture': 'picture', // Case fix
    'PICTURE': 'picture', // Case fix
    'Domuz': 'pig', // Case fix
    'Güvercin': 'pigeon', // Case fix
    'GÜVERCIN': 'pigeon', // Case fix
    'Yastık': 'pillow', // Case fix
    'YASTIK': 'pillow', // Case fix
    'Pilot': 'pilot', // Case fix
    'PILOT': 'pilot', // Case fix
    'pembe renk': 'pink',
    'Pembe Renk': 'pink', // Case fix
    'çukur': 'pit',
    'sürahi': 'pitcher',
    'SÜRAHI': 'pitcher', // Case fix
    'PIZZA': 'pizza', // Case fix
    'Planet': 'planet', // Case fix
    'Planting': 'planting', // Case fix
    'PLANTING': 'planting', // Case fix
    'Plastik': 'plastic', // Case fix
    'PLASTIK': 'plastic', // Case fix
    'tabak': 'plate',
    'Playground': 'playground', // Case fix
    'Pense': 'pliers', // Case fix
    'Fiş': 'plug', // Case fix
    'FIŞ': 'plug', // Case fix
    'Plunger': 'plunger', // Case fix
    'Cep': 'pocket', // Case fix
    'Polis': 'police', // Case fix
    'POLIS': 'police', // Case fix
    'Polka dot': 'polka-dot', // Case fix
    'pond': 'pond',
    'Pond': 'pond', // Case fix
    'Havuz': 'pool', // Case fix
    'Porch': 'porch', // Case fix
    'liman': 'port',
    'LIMAN': 'port', // Case fix
    'Kartpostal': 'postcard', // Case fix
    'postacı': 'postman',
    'POSTACI': 'postman', // Case fix
    'tencere': 'pot',
    'fakirlik': 'poverty',
    'FAKIRLIK': 'poverty', // Case fix
    'dua etmek': 'praying',
    'hamilelik/gebelik': 'pregnancy',
    'Hamilelik/Gebelik': 'pregnancy', // Case fix
    'HAMILELIK/GEBELIK': 'pregnancy', // Case fix
    'gurur': 'pride',
    'Hapishane': 'prison', // Case fix
    'HAPISHANE': 'prison', // Case fix
    'Mahkum': 'prisoner', // Case fix
    'Kukla': 'puppet', // Case fix
    'mor/eflatun renk': 'purple',
    'Mor/Eflatun Renk': 'purple', // Case fix
    'Purse': 'purse', // Case fix
    'Pijama': 'pyjamas', // Case fix
    'PIJAMA': 'pyjamas', // Case fix
    'Kraliçe': 'queen', // Case fix
    'KRALIÇE': 'queen', // Case fix
    'Tavşan': 'rabbit', // Case fix
    'Raccoon': 'raccoon', // Case fix
    'Raket': 'racket', // Case fix
    'Radyo': 'radio', // Case fix
    'Yağmur': 'rain', // Case fix
    'Gökkuşağı': 'rainbow', // Case fix
    'GÖKKUŞAĞI': 'rainbow', // Case fix
    'raincoat': 'raincoat',
    'Raincoat': 'raincoat', // Case fix
    'RAINCOAT': 'raincoat', // Case fix
    'Tırmık': 'rake', // Case fix
    'TIRMIK': 'rake', // Case fix
    'sıçan': 'rat',
    'Sıçan': 'rat', // Case fix
    'SIÇAN': 'rat', // Case fix
    'Raven': 'raven', // Case fix
    'Razor': 'razor', // Case fix
    'okumak': 'reading',
    'Rebirth': 'rebirth', // Case fix
    'REBIRTH': 'rebirth', // Case fix
    'Receipt': 'receipt', // Case fix
    'RECEIPT': 'receipt', // Case fix
    'almak': 'receiving',
    'red angel': 'red-angel',
    'Red angel': 'red-angel', // Case fix
    'red baby': 'red-baby',
    'Red baby': 'red-baby', // Case fix
    'red bear': 'red-bear',
    'Red bear': 'red-bear', // Case fix
    'red bird': 'red-bird',
    'Red bird': 'red-bird', // Case fix
    'RED BIRD': 'red-bird', // Case fix
    'red blood': 'red-blood',
    'Red blood': 'red-blood', // Case fix
    'red bridge': 'red-bridge',
    'Red bridge': 'red-bridge', // Case fix
    'RED BRIDGE': 'red-bridge', // Case fix
    'red car': 'red-car',
    'Red car': 'red-car', // Case fix
    'red cat': 'red-cat',
    'Red cat': 'red-cat', // Case fix
    'red crying': 'red-crying',
    'Red crying': 'red-crying', // Case fix
    'RED CRYING': 'red-crying', // Case fix
    'red dancing': 'red-dancing',
    'Red dancing': 'red-dancing', // Case fix
    'RED DANCING': 'red-dancing', // Case fix
    'red death': 'red-death',
    'Red death': 'red-death', // Case fix
    'red demon': 'red-demon',
    'Red demon': 'red-demon', // Case fix
    'red dog': 'red-dog',
    'Red dog': 'red-dog', // Case fix
    'red door': 'red-door',
    'Red door': 'red-door', // Case fix
    'red dragon': 'red-dragon',
    'Red dragon': 'red-dragon', // Case fix
    'red elephant': 'red-elephant',
    'Red elephant': 'red-elephant', // Case fix
    'red fighting': 'red-fighting',
    'Red fighting': 'red-fighting', // Case fix
    'RED FIGHTING': 'red-fighting', // Case fix
    'red fire': 'red-fire',
    'Red fire': 'red-fire', // Case fix
    'RED FIRE': 'red-fire', // Case fix
    'red fish': 'red-fish',
    'Red fish': 'red-fish', // Case fix
    'RED FISH': 'red-fish', // Case fix
    'red flying': 'red-flying',
    'Red flying': 'red-flying', // Case fix
    'RED FLYING': 'red-flying', // Case fix
    'red ghost': 'red-ghost',
    'Red ghost': 'red-ghost', // Case fix
    'red horse': 'red-horse',
    'Red horse': 'red-horse', // Case fix
    'red house': 'red-house',
    'Red house': 'red-house', // Case fix
    'red key': 'red-key',
    'Red key': 'red-key', // Case fix
    'red knife': 'red-knife',
    'Red knife': 'red-knife', // Case fix
    'RED KNIFE': 'red-knife', // Case fix
    'red lion': 'red-lion',
    'Red lion': 'red-lion', // Case fix
    'RED LION': 'red-lion', // Case fix
    'red money': 'red-money',
    'Red money': 'red-money', // Case fix
    'red mountain': 'red-mountain',
    'Red mountain': 'red-mountain', // Case fix
    'RED MOUNTAIN': 'red-mountain', // Case fix
    'red ocean': 'red-ocean',
    'Red ocean': 'red-ocean', // Case fix
    'red rain': 'red-rain',
    'Red rain': 'red-rain', // Case fix
    'RED RAIN': 'red-rain', // Case fix
    'red running': 'red-running',
    'Red running': 'red-running', // Case fix
    'RED RUNNING': 'red-running', // Case fix
    'red shark': 'red-shark',
    'Red shark': 'red-shark', // Case fix
    'red snake': 'red-snake',
    'Red snake': 'red-snake', // Case fix
    'red snow': 'red-snow',
    'Red snow': 'red-snow', // Case fix
    'red spider': 'red-spider',
    'Red spider': 'red-spider', // Case fix
    'RED SPIDER': 'red-spider', // Case fix
    'red stairs': 'red-stairs',
    'Red stairs': 'red-stairs', // Case fix
    'RED STAIRS': 'red-stairs', // Case fix
    'red storm': 'red-storm',
    'Red storm': 'red-storm', // Case fix
    'red swimming': 'red-swimming',
    'Red swimming': 'red-swimming', // Case fix
    'RED SWIMMING': 'red-swimming', // Case fix
    'red teeth falling out': 'red-teeth-falling-out',
    'Red teeth falling out': 'red-teeth-falling-out', // Case fix
    'RED TEETH FALLING OUT': 'red-teeth-falling-out', // Case fix
    'red vampire': 'red-vampire',
    'Red vampire': 'red-vampire', // Case fix
    'RED VAMPIRE': 'red-vampire', // Case fix
    'red water': 'red-water',
    'Red water': 'red-water', // Case fix
    'red wedding': 'red-wedding',
    'Red wedding': 'red-wedding', // Case fix
    'RED WEDDING': 'red-wedding', // Case fix
    'red wolf': 'red-wolf',
    'Red wolf': 'red-wolf', // Case fix
    'red wound': 'red-wound',
    'Red wound': 'red-wound', // Case fix
    'red zombie': 'red-zombie',
    'Red zombie': 'red-zombie', // Case fix
    'RED ZOMBIE': 'red-zombie', // Case fix
    'kırmızı renk': 'red',
    'Kırmızı Renk': 'red', // Case fix
    'KIRMIZI RENK': 'red', // Case fix
    'Hakem': 'referee', // Case fix
    'Kumanda': 'remote-control', // Case fix
    'Remote': 'remote', // Case fix
    'tamir etmek': 'repairing',
    'TAMIR ETMEK': 'repairing', // Case fix
    'Restoran': 'restaurant', // Case fix
    'Rhino': 'rhino', // Case fix
    'RHINO': 'rhino', // Case fix
    'pirinç': 'rice',
    'PIRINÇ': 'rice', // Case fix
    'Yüzük': 'ring', // Case fix
    'Nehir': 'river', // Case fix
    'NEHIR': 'river', // Case fix
    'Yol': 'road', // Case fix
    'Robot': 'robot', // Case fix
    'Rocket': 'rocket', // Case fix
    'Çatı': 'roof', // Case fix
    'ÇATI': 'roof', // Case fix
    'Oda': 'room', // Case fix
    'Horoz': 'rooster', // Case fix
    'Ip': 'rope', // Case fix
    'Rotten': 'rotten', // Case fix
    'Rowing': 'rowing', // Case fix
    'ROWING': 'rowing', // Case fix
    'kral/kraliçe': 'royalty',
    'Kral/Kraliçe': 'royalty', // Case fix
    'KRAL/KRALIÇE': 'royalty', // Case fix
    'Kilim': 'rug', // Case fix
    'KILIM': 'rug', // Case fix
    'Ruin': 'ruin', // Case fix
    'RUIN': 'ruin', // Case fix
    'harabe / kalıntılar': 'ruins',
    'Harabe / Kalıntılar': 'ruins', // Case fix
    'HARABE / KALINTILAR': 'ruins', // Case fix
    'Cetvel': 'ruler', // Case fix
    'Koşmak': 'running', // Case fix
    'Rust': 'rust', // Case fix
    'Çelik Kasa': 'safe-box', // Case fix
    'ÇELIK KASA': 'safe-box', // Case fix
    'Sailing': 'sailing', // Case fix
    'SAILING': 'sailing', // Case fix
    'sailor': 'sailor',
    'Sailor': 'sailor', // Case fix
    'SAILOR': 'sailor', // Case fix
    'Tuz': 'salt', // Case fix
    'Kum': 'sand', // Case fix
    'Sandviç': 'sandwich', // Case fix
    'SANDVIÇ': 'sandwich', // Case fix
    'Uydu': 'satellite', // Case fix
    'Testere': 'saw', // Case fix
    'Scale': 'scale', // Case fix
    'Yara izi': 'scar', // Case fix
    'YARA IZI': 'scar', // Case fix
    'Atkı': 'scarf', // Case fix
    'ATKI': 'scarf', // Case fix
    'Scepter': 'scepter', // Case fix
    'Okul': 'school', // Case fix
    'scientist': 'scientist',
    'Scientist': 'scientist', // Case fix
    'SCIENTIST': 'scientist', // Case fix
    'Makas': 'scissors', // Case fix
    'Akrep': 'scorpion', // Case fix
    'Vida': 'screw', // Case fix
    'VIDA': 'screw', // Case fix
    'Tornavida': 'screwdriver', // Case fix
    'TORNAVIDA': 'screwdriver', // Case fix
    'Heykel': 'sculpture', // Case fix
    'MARTI': 'seagull', // Case fix
    'Seahorse': 'seahorse', // Case fix
    'aramak': 'searching',
    'sekreter': 'secretary',
    'satmak': 'selling',
    'sayı yedi (7)': 'seven',
    'Sayı Yedi (7)': 'seven', // Case fix
    'SAYI YEDI (7)': 'seven', // Case fix
    'Sewing': 'sewing', // Case fix
    'SEWING': 'sewing', // Case fix
    'cinsellik': 'sex',
    'Cinsellik': 'sex', // Case fix
    'CINSELLIK': 'sex', // Case fix
    'Gölge': 'shadow', // Case fix
    'Shadowy': 'shadowy', // Case fix
    'utanç': 'shame',
    'Shampoo': 'shampoo', // Case fix
    'Shape': 'shape', // Case fix
    'KÖPEKBALIĞI': 'shark', // Case fix
    'Shed': 'shed', // Case fix
    'Koyun': 'sheep', // Case fix
    'shield': 'shield',
    'Shield': 'shield', // Case fix
    'SHIELD': 'shield', // Case fix
    'Shiny': 'shiny', // Case fix
    'SHINY': 'shiny', // Case fix
    'Gemi': 'ship', // Case fix
    'GEMI': 'ship', // Case fix
    'Shoelace': 'shoelace', // Case fix
    'Ayakkabı': 'shoes', // Case fix
    'AYAKKABI': 'shoes', // Case fix
    'Dükkan': 'shop', // Case fix
    'alışveriş': 'shopping',
    'Alışveriş': 'shopping', // Case fix
    'ALIŞVERIŞ': 'shopping', // Case fix
    'Omuz': 'shoulder', // Case fix
    'Shouting': 'shouting', // Case fix
    'SHOUTING': 'shouting', // Case fix
    'Kürek': 'shovel', // Case fix
    'Duş': 'shower', // Case fix
    'Shrimp': 'shrimp', // Case fix
    'SHRIMP': 'shrimp', // Case fix
    'Kardeş': 'sibling', // Case fix
    'hastalık': 'sickness',
    'HASTALIK': 'sickness', // Case fix
    'İmza': 'signature', // Case fix
    'Silence': 'silence', // Case fix
    'SILENCE': 'silence', // Case fix
    'Gümüş': 'silver', // Case fix
    'Şarkı Söylemek': 'singing', // Case fix
    'ŞARKI SÖYLEMEK': 'singing', // Case fix
    'Sink': 'sink', // Case fix
    'SINK': 'sink', // Case fix
    'Sinking': 'sinking', // Case fix
    'SINKING': 'sinking', // Case fix
    'Kaykay': 'skateboard', // Case fix
    'Paten': 'skates', // Case fix
    'Kemik': 'skeleton', // Case fix
    'KEMIK': 'skeleton', // Case fix
    'Kayak': 'skiing', // Case fix
    'deri': 'skin',
    'DERI': 'skin', // Case fix
    'Skunk': 'skunk', // Case fix
    'Gökyüzü': 'sky', // Case fix
    'Skyscraper': 'skyscraper', // Case fix
    'uyumak': 'sleeping',
    'Uyumak': 'sleeping', // Case fix
    'small angel': 'small-angel',
    'Small angel': 'small-angel', // Case fix
    'small baby': 'small-baby',
    'Small baby': 'small-baby', // Case fix
    'small bear': 'small-bear',
    'Small bear': 'small-bear', // Case fix
    'small bird': 'small-bird',
    'Small bird': 'small-bird', // Case fix
    'SMALL BIRD': 'small-bird', // Case fix
    'small blood': 'small-blood',
    'Small blood': 'small-blood', // Case fix
    'small bridge': 'small-bridge',
    'Small bridge': 'small-bridge', // Case fix
    'SMALL BRIDGE': 'small-bridge', // Case fix
    'small car': 'small-car',
    'Small car': 'small-car', // Case fix
    'small cat': 'small-cat',
    'Small cat': 'small-cat', // Case fix
    'small crying': 'small-crying',
    'Small crying': 'small-crying', // Case fix
    'SMALL CRYING': 'small-crying', // Case fix
    'small dancing': 'small-dancing',
    'Small dancing': 'small-dancing', // Case fix
    'SMALL DANCING': 'small-dancing', // Case fix
    'small death': 'small-death',
    'Small death': 'small-death', // Case fix
    'small demon': 'small-demon',
    'Small demon': 'small-demon', // Case fix
    'small dog': 'small-dog',
    'Small dog': 'small-dog', // Case fix
    'small door': 'small-door',
    'Small door': 'small-door', // Case fix
    'small dragon': 'small-dragon',
    'Small dragon': 'small-dragon', // Case fix
    'small elephant': 'small-elephant',
    'Small elephant': 'small-elephant', // Case fix
    'small fighting': 'small-fighting',
    'Small fighting': 'small-fighting', // Case fix
    'SMALL FIGHTING': 'small-fighting', // Case fix
    'small fire': 'small-fire',
    'Small fire': 'small-fire', // Case fix
    'SMALL FIRE': 'small-fire', // Case fix
    'small fish': 'small-fish',
    'Small fish': 'small-fish', // Case fix
    'SMALL FISH': 'small-fish', // Case fix
    'small flying': 'small-flying',
    'Small flying': 'small-flying', // Case fix
    'SMALL FLYING': 'small-flying', // Case fix
    'small ghost': 'small-ghost',
    'Small ghost': 'small-ghost', // Case fix
    'small horse': 'small-horse',
    'Small horse': 'small-horse', // Case fix
    'small house': 'small-house',
    'Small house': 'small-house', // Case fix
    'small key': 'small-key',
    'Small key': 'small-key', // Case fix
    'small knife': 'small-knife',
    'Small knife': 'small-knife', // Case fix
    'SMALL KNIFE': 'small-knife', // Case fix
    'small lion': 'small-lion',
    'Small lion': 'small-lion', // Case fix
    'SMALL LION': 'small-lion', // Case fix
    'small money': 'small-money',
    'Small money': 'small-money', // Case fix
    'small mountain': 'small-mountain',
    'Small mountain': 'small-mountain', // Case fix
    'SMALL MOUNTAIN': 'small-mountain', // Case fix
    'small ocean': 'small-ocean',
    'Small ocean': 'small-ocean', // Case fix
    'small rain': 'small-rain',
    'Small rain': 'small-rain', // Case fix
    'SMALL RAIN': 'small-rain', // Case fix
    'small running': 'small-running',
    'Small running': 'small-running', // Case fix
    'SMALL RUNNING': 'small-running', // Case fix
    'small shark': 'small-shark',
    'Small shark': 'small-shark', // Case fix
    'small snake': 'small-snake',
    'Small snake': 'small-snake', // Case fix
    'small snow': 'small-snow',
    'Small snow': 'small-snow', // Case fix
    'small spider': 'small-spider',
    'Small spider': 'small-spider', // Case fix
    'SMALL SPIDER': 'small-spider', // Case fix
    'small stairs': 'small-stairs',
    'Small stairs': 'small-stairs', // Case fix
    'SMALL STAIRS': 'small-stairs', // Case fix
    'small storm': 'small-storm',
    'Small storm': 'small-storm', // Case fix
    'small swimming': 'small-swimming',
    'Small swimming': 'small-swimming', // Case fix
    'SMALL SWIMMING': 'small-swimming', // Case fix
    'small teeth falling out': 'small-teeth-falling-out',
    'Small teeth falling out': 'small-teeth-falling-out', // Case fix
    'SMALL TEETH FALLING OUT': 'small-teeth-falling-out', // Case fix
    'small vampire': 'small-vampire',
    'Small vampire': 'small-vampire', // Case fix
    'SMALL VAMPIRE': 'small-vampire', // Case fix
    'small water': 'small-water',
    'Small water': 'small-water', // Case fix
    'small wedding': 'small-wedding',
    'Small wedding': 'small-wedding', // Case fix
    'SMALL WEDDING': 'small-wedding', // Case fix
    'small wolf': 'small-wolf',
    'Small wolf': 'small-wolf', // Case fix
    'small wound': 'small-wound',
    'Small wound': 'small-wound', // Case fix
    'small zombie': 'small-zombie',
    'Small zombie': 'small-zombie', // Case fix
    'SMALL ZOMBIE': 'small-zombie', // Case fix
    'Akıllı Saat': 'smart-watch', // Case fix
    'AKILLI SAAT': 'smart-watch', // Case fix
    'salyangoz': 'snail',
    'Yılan': 'snake', // Case fix
    'YILAN': 'snake', // Case fix
    'Kar': 'snow', // Case fix
    'Sabun': 'soap', // Case fix
    'Priz': 'socket', // Case fix
    'PRIZ': 'socket', // Case fix
    'Çorap': 'socks', // Case fix
    'Koltuk': 'sofa', // Case fix
    'güneş tutulması': 'solar-eclipse',
    'GÜNEŞ TUTULMASI': 'solar-eclipse', // Case fix
    'Asker': 'soldier', // Case fix
    'Spa': 'spa', // Case fix
    'Uzay': 'space', // Case fix
    'uzay gemisi': 'spaceship',
    'UZAY GEMISI': 'spaceship', // Case fix
    'Sparkle': 'sparkle', // Case fix
    'Hoparlör': 'speaker', // Case fix
    'Örümcek': 'spider', // Case fix
    'Spiral': 'spiral', // Case fix
    'SPIRAL': 'spiral', // Case fix
    'Ruh': 'spirit', // Case fix
    'Sünger': 'sponge', // Case fix
    'KAŞIK': 'spoon', // Case fix
    'eş (koca/karı)': 'spouse',
    'Eş (Koca/Karı)': 'spouse', // Case fix
    'EŞ (KOCA/KARI)': 'spouse', // Case fix
    'spy': 'spy',
    'Spy': 'spy', // Case fix
    'Square': 'square', // Case fix
    'mürekkep balığı (kalamar)': 'squid',
    'Mürekkep Balığı (Kalamar)': 'squid', // Case fix
    'MÜREKKEP BALIĞI (KALAMAR)': 'squid', // Case fix
    'SINCAP': 'squirrel', // Case fix
    'Stadyum': 'stadium', // Case fix
    'Staircase': 'staircase', // Case fix
    'STAIRCASE': 'staircase', // Case fix
    'Merdiven': 'stairs', // Case fix
    'MERDIVEN': 'stairs', // Case fix
    'Pul': 'stamp-postage', // Case fix
    'Stamp': 'stamp', // Case fix
    'Zımba': 'stapler', // Case fix
    'ZIMBA': 'stapler', // Case fix
    'Yıldız': 'star', // Case fix
    'YILDIZ': 'star', // Case fix
    'Starfish': 'starfish', // Case fix
    'STARFISH': 'starfish', // Case fix
    'i̇stasyon': 'station',
    'çalmak': 'stealing',
    'direksiyon': 'steering-wheel',
    'DIREKSIYON': 'steering-wheel', // Case fix
    'Mide': 'stomach', // Case fix
    'MIDE': 'stomach', // Case fix
    'Taş': 'stone', // Case fix
    'Fırtına': 'storm', // Case fix
    'FIRTINA': 'storm', // Case fix
    'Stove': 'stove', // Case fix
    'Yabancı': 'stranger', // Case fix
    'YABANCI': 'stranger', // Case fix
    'Çilek': 'strawberry', // Case fix
    'ÇILEK': 'strawberry', // Case fix
    'sokak / cadde': 'street',
    'Sokak / Cadde': 'street', // Case fix
    'Striped': 'striped', // Case fix
    'STRIPED': 'striped', // Case fix
    'Öğrenci': 'student', // Case fix
    'ÖĞRENCI': 'student', // Case fix
    'ders çalışmak/öğrenmek': 'studying',
    'Ders Çalışmak/Öğrenmek': 'studying', // Case fix
    'DERS ÇALIŞMAK/ÖĞRENMEK': 'studying', // Case fix
    'metro': 'subway',
    'başarı': 'success',
    'BAŞARI': 'success', // Case fix
    'şeker': 'sugar',
    'Bavul': 'suitcase', // Case fix
    'Güneş': 'sun', // Case fix
    'sunglasses': 'sunglasses',
    'Sunglasses': 'sunglasses', // Case fix
    'Sörf': 'surfing', // Case fix
    'ameliyat': 'surgery',
    'AMELIYAT': 'surgery', // Case fix
    'Bataklık': 'swamp', // Case fix
    'BATAKLIK': 'swamp', // Case fix
    'kuğu': 'swan',
    'Kuğu': 'swan', // Case fix
    'ter': 'sweat',
    'Swimming pool': 'swimming-pool', // Case fix
    'SWIMMING POOL': 'swimming-pool', // Case fix
    'Yüzmek': 'swimming', // Case fix
    'Sword': 'sword', // Case fix
    'şırınga': 'syringe',
    'ŞIRINGA': 'syringe', // Case fix
    'Masa': 'table-furniture', // Case fix
    'Masa': 'table', // Case fix
    'Tablecloth': 'tablecloth', // Case fix
    'Tablet': 'tablet', // Case fix
    'terzi': 'tailor',
    'TERZI': 'tailor', // Case fix
    'talking angel': 'talking-angel',
    'Talking angel': 'talking-angel', // Case fix
    'TALKING ANGEL': 'talking-angel', // Case fix
    'talking baby': 'talking-baby',
    'Talking baby': 'talking-baby', // Case fix
    'TALKING BABY': 'talking-baby', // Case fix
    'talking bear': 'talking-bear',
    'Talking bear': 'talking-bear', // Case fix
    'TALKING BEAR': 'talking-bear', // Case fix
    'talking bird': 'talking-bird',
    'Talking bird': 'talking-bird', // Case fix
    'TALKING BIRD': 'talking-bird', // Case fix
    'talking blood': 'talking-blood',
    'Talking blood': 'talking-blood', // Case fix
    'TALKING BLOOD': 'talking-blood', // Case fix
    'talking bridge': 'talking-bridge',
    'Talking bridge': 'talking-bridge', // Case fix
    'TALKING BRIDGE': 'talking-bridge', // Case fix
    'talking car': 'talking-car',
    'Talking car': 'talking-car', // Case fix
    'TALKING CAR': 'talking-car', // Case fix
    'talking cat': 'talking-cat',
    'Talking cat': 'talking-cat', // Case fix
    'TALKING CAT': 'talking-cat', // Case fix
    'talking crying': 'talking-crying',
    'Talking crying': 'talking-crying', // Case fix
    'TALKING CRYING': 'talking-crying', // Case fix
    'talking dancing': 'talking-dancing',
    'Talking dancing': 'talking-dancing', // Case fix
    'TALKING DANCING': 'talking-dancing', // Case fix
    'talking death': 'talking-death',
    'Talking death': 'talking-death', // Case fix
    'TALKING DEATH': 'talking-death', // Case fix
    'talking demon': 'talking-demon',
    'Talking demon': 'talking-demon', // Case fix
    'TALKING DEMON': 'talking-demon', // Case fix
    'talking dog': 'talking-dog',
    'Talking dog': 'talking-dog', // Case fix
    'TALKING DOG': 'talking-dog', // Case fix
    'talking door': 'talking-door',
    'Talking door': 'talking-door', // Case fix
    'TALKING DOOR': 'talking-door', // Case fix
    'talking dragon': 'talking-dragon',
    'Talking dragon': 'talking-dragon', // Case fix
    'TALKING DRAGON': 'talking-dragon', // Case fix
    'talking elephant': 'talking-elephant',
    'Talking elephant': 'talking-elephant', // Case fix
    'TALKING ELEPHANT': 'talking-elephant', // Case fix
    'talking fighting': 'talking-fighting',
    'Talking fighting': 'talking-fighting', // Case fix
    'TALKING FIGHTING': 'talking-fighting', // Case fix
    'talking fire': 'talking-fire',
    'Talking fire': 'talking-fire', // Case fix
    'TALKING FIRE': 'talking-fire', // Case fix
    'talking fish': 'talking-fish',
    'Talking fish': 'talking-fish', // Case fix
    'TALKING FISH': 'talking-fish', // Case fix
    'talking flying': 'talking-flying',
    'Talking flying': 'talking-flying', // Case fix
    'TALKING FLYING': 'talking-flying', // Case fix
    'talking ghost': 'talking-ghost',
    'Talking ghost': 'talking-ghost', // Case fix
    'TALKING GHOST': 'talking-ghost', // Case fix
    'talking horse': 'talking-horse',
    'Talking horse': 'talking-horse', // Case fix
    'TALKING HORSE': 'talking-horse', // Case fix
    'talking house': 'talking-house',
    'Talking house': 'talking-house', // Case fix
    'TALKING HOUSE': 'talking-house', // Case fix
    'talking key': 'talking-key',
    'Talking key': 'talking-key', // Case fix
    'TALKING KEY': 'talking-key', // Case fix
    'talking knife': 'talking-knife',
    'Talking knife': 'talking-knife', // Case fix
    'TALKING KNIFE': 'talking-knife', // Case fix
    'talking lion': 'talking-lion',
    'Talking lion': 'talking-lion', // Case fix
    'TALKING LION': 'talking-lion', // Case fix
    'talking money': 'talking-money',
    'Talking money': 'talking-money', // Case fix
    'TALKING MONEY': 'talking-money', // Case fix
    'talking mountain': 'talking-mountain',
    'Talking mountain': 'talking-mountain', // Case fix
    'TALKING MOUNTAIN': 'talking-mountain', // Case fix
    'talking ocean': 'talking-ocean',
    'Talking ocean': 'talking-ocean', // Case fix
    'TALKING OCEAN': 'talking-ocean', // Case fix
    'talking rain': 'talking-rain',
    'Talking rain': 'talking-rain', // Case fix
    'TALKING RAIN': 'talking-rain', // Case fix
    'talking running': 'talking-running',
    'Talking running': 'talking-running', // Case fix
    'TALKING RUNNING': 'talking-running', // Case fix
    'talking shark': 'talking-shark',
    'Talking shark': 'talking-shark', // Case fix
    'TALKING SHARK': 'talking-shark', // Case fix
    'talking snake': 'talking-snake',
    'Talking snake': 'talking-snake', // Case fix
    'TALKING SNAKE': 'talking-snake', // Case fix
    'talking snow': 'talking-snow',
    'Talking snow': 'talking-snow', // Case fix
    'TALKING SNOW': 'talking-snow', // Case fix
    'talking spider': 'talking-spider',
    'Talking spider': 'talking-spider', // Case fix
    'TALKING SPIDER': 'talking-spider', // Case fix
    'talking stairs': 'talking-stairs',
    'Talking stairs': 'talking-stairs', // Case fix
    'TALKING STAIRS': 'talking-stairs', // Case fix
    'talking storm': 'talking-storm',
    'Talking storm': 'talking-storm', // Case fix
    'TALKING STORM': 'talking-storm', // Case fix
    'talking swimming': 'talking-swimming',
    'Talking swimming': 'talking-swimming', // Case fix
    'TALKING SWIMMING': 'talking-swimming', // Case fix
    'talking teeth falling out': 'talking-teeth-falling-out',
    'Talking teeth falling out': 'talking-teeth-falling-out', // Case fix
    'TALKING TEETH FALLING OUT': 'talking-teeth-falling-out', // Case fix
    'talking vampire': 'talking-vampire',
    'Talking vampire': 'talking-vampire', // Case fix
    'TALKING VAMPIRE': 'talking-vampire', // Case fix
    'talking water': 'talking-water',
    'Talking water': 'talking-water', // Case fix
    'TALKING WATER': 'talking-water', // Case fix
    'talking wedding': 'talking-wedding',
    'Talking wedding': 'talking-wedding', // Case fix
    'TALKING WEDDING': 'talking-wedding', // Case fix
    'talking wolf': 'talking-wolf',
    'Talking wolf': 'talking-wolf', // Case fix
    'TALKING WOLF': 'talking-wolf', // Case fix
    'talking wound': 'talking-wound',
    'Talking wound': 'talking-wound', // Case fix
    'TALKING WOUND': 'talking-wound', // Case fix
    'talking zombie': 'talking-zombie',
    'Talking zombie': 'talking-zombie', // Case fix
    'TALKING ZOMBIE': 'talking-zombie', // Case fix
    'Mezura': 'tape-measure', // Case fix
    'Bant': 'tape', // Case fix
    'Dövme': 'tattoo', // Case fix
    'taksi': 'taxi',
    'TAKSI': 'taxi', // Case fix
    'Çay': 'tea', // Case fix
    'Öğretmen': 'teacher', // Case fix
    'Teaching': 'teaching', // Case fix
    'TEACHING': 'teaching', // Case fix
    'Genç': 'teenager', // Case fix
    'Diş': 'teeth-falling-out', // Case fix
    'DIŞ': 'teeth-falling-out', // Case fix
    'Diş': 'teeth', // Case fix
    'DIŞ': 'teeth', // Case fix
    'Telescope': 'telescope', // Case fix
    'Televizyon': 'television', // Case fix
    'TELEVIZYON': 'television', // Case fix
    'Tenis': 'tennis', // Case fix
    'TENIS': 'tennis', // Case fix
    'Tent': 'tent', // Case fix
    'Tiyatro': 'theater', // Case fix
    'TIYATRO': 'theater', // Case fix
    'Hırsız': 'thief', // Case fix
    'HIRSIZ': 'thief', // Case fix
    'zayıflık': 'thinness',
    'ZAYIFLIK': 'thinness', // Case fix
    'Thread': 'thread', // Case fix
    'sayı üç (3)': 'three',
    'Sayı Üç (3)': 'three', // Case fix
    'SAYI ÜÇ (3)': 'three', // Case fix
    'Throat': 'throat', // Case fix
    'Throne': 'throne', // Case fix
    'Başparmak': 'thumb', // Case fix
    'Thunder': 'thunder', // Case fix
    'tiara': 'tiara',
    'Tiara': 'tiara', // Case fix
    'TIARA': 'tiara', // Case fix
    'bilet': 'ticket',
    'BILET': 'ticket', // Case fix
    'Kravat': 'tie', // Case fix
    'Kaplan': 'tiger', // Case fix
    'Time': 'time', // Case fix
    'TIME': 'time', // Case fix
    'Tiny': 'tiny', // Case fix
    'TINY': 'tiny', // Case fix
    'Toaster': 'toaster', // Case fix
    'Toilet paper': 'toilet-paper', // Case fix
    'TOILET PAPER': 'toilet-paper', // Case fix
    'Wc': 'toilet', // Case fix
    'Dil': 'tongue', // Case fix
    'DIL': 'tongue', // Case fix
    'Toothbrush': 'toothbrush', // Case fix
    'Toothpaste': 'toothpaste', // Case fix
    'KASIRGA': 'tornado', // Case fix
    'Havlu': 'towel', // Case fix
    'kasaba': 'town',
    'oyuncak': 'toy',
    'traktör': 'tractor',
    'trafik': 'traffic',
    'TRAFIK': 'traffic', // Case fix
    'tramvay': 'tram',
    'Transparent': 'transparent', // Case fix
    'Trash can': 'trash-can', // Case fix
    'Çöp': 'trash', // Case fix
    'seyahat etmek': 'traveling',
    'Seyahat Etmek': 'traveling', // Case fix
    'tepsi': 'tray',
    'TEPSI': 'tray', // Case fix
    'hazine': 'treasure',
    'Hazine': 'treasure', // Case fix
    'HAZINE': 'treasure', // Case fix
    'ağaç kökü': 'tree-roots',
    'Ağaç': 'tree', // Case fix
    'Triangle': 'triangle', // Case fix
    'TRIANGLE': 'triangle', // Case fix
    'Kupa': 'trophy', // Case fix
    'Kamyon': 'truck', // Case fix
    'Trompet': 'trumpet', // Case fix
    'tsunami': 'tsunami',
    'TSUNAMI': 'tsunami', // Case fix
    'lale': 'tulip',
    'Tünel': 'tunnel', // Case fix
    'Turkey': 'turkey', // Case fix
    'Turquoise': 'turquoise', // Case fix
    'TURQUOISE': 'turquoise', // Case fix
    'kaplumbağa': 'turtle',
    'Twelve': 'twelve', // Case fix
    'Ikizler': 'twins', // Case fix
    'IKIZLER': 'twins', // Case fix
    'Ugly': 'ugly', // Case fix
    'Şemsiye': 'umbrella', // Case fix
    'ŞEMSIYE': 'umbrella', // Case fix
    'Iç çamaşırı': 'underwear', // Case fix
    'IÇ ÇAMAŞIRI': 'underwear', // Case fix
    'Tek boynuzlu at': 'unicorn', // Case fix
    'Üniforma': 'uniform', // Case fix
    'ÜNIFORMA': 'uniform', // Case fix
    'Universe': 'universe', // Case fix
    'UNIVERSE': 'universe', // Case fix
    'university': 'university',
    'University': 'university', // Case fix
    'UNIVERSITY': 'university', // Case fix
    'Unpacking': 'unpacking', // Case fix
    'UNPACKING': 'unpacking', // Case fix
    'USB Bellek': 'usb', // Case fix
    'Vaase': 'vaase', // Case fix
    'elektrik süpürgesi': 'vacuum-cleaner',
    'Elektrik Süpürgesi': 'vacuum-cleaner', // Case fix
    'ELEKTRIK SÜPÜRGESI': 'vacuum-cleaner', // Case fix
    'Vadi': 'valley', // Case fix
    'VADI': 'valley', // Case fix
    'Vampir': 'vampire', // Case fix
    'VAMPIR': 'vampire', // Case fix
    'Vazo': 'vase', // Case fix
    'Veil': 'veil', // Case fix
    'VEIL': 'veil', // Case fix
    'Köy': 'village', // Case fix
    'Violet': 'violet', // Case fix
    'VIOLET': 'violet', // Case fix
    'Keman': 'violin', // Case fix
    'Void': 'void', // Case fix
    'VOID': 'void', // Case fix
    'yanardağ (volkan)': 'volcano',
    'Yanardağ (Volkan)': 'volcano', // Case fix
    'Voleybol': 'volleyball', // Case fix
    'Kusmak': 'vomiting', // Case fix
    'Vulture': 'vulture', // Case fix
    'vagon': 'wagon',
    'garson': 'waiter',
    'beklemek': 'waiting',
    'uyanmak': 'waking-up',
    'Duvar': 'wall', // Case fix
    'Cüzdan': 'wallet', // Case fix
    'mors (deniz aygırı)': 'walrus',
    'Mors (Deniz Aygırı)': 'walrus', // Case fix
    'MORS (DENIZ AYGIRI)': 'walrus', // Case fix
    'wand': 'wand',
    'Wand': 'wand', // Case fix
    'Savaş': 'war', // Case fix
    'Gardırop': 'wardrobe', // Case fix
    'GARDIROP': 'wardrobe', // Case fix
    'çamaşır makinesi': 'washing-machine',
    'ÇAMAŞIR MAKINESI': 'washing-machine', // Case fix
    'Yıkanmak': 'washing', // Case fix
    'YIKANMAK': 'washing', // Case fix
    'Watch': 'watch', // Case fix
    'Su': 'water', // Case fix
    'Şelale': 'waterfall', // Case fix
    'Karpuz': 'watermelon', // Case fix
    'zenginlik': 'wealth',
    'ZENGINLIK': 'wealth', // Case fix
    'Silah': 'weapon', // Case fix
    'SILAH': 'weapon', // Case fix
    'Gelinlik': 'wedding-dress', // Case fix
    'GELINLIK': 'wedding-dress', // Case fix
    'Düğün': 'wedding', // Case fix
    'kuyu': 'well',
    'Kurt adam': 'werewolf', // Case fix
    'Wet': 'wet', // Case fix
    'Balina': 'whale', // Case fix
    'BALINA': 'whale', // Case fix
    'Wheel': 'wheel', // Case fix
    'El Arabası': 'wheelbarrow', // Case fix
    'EL ARABASI': 'wheelbarrow', // Case fix
    'tekerlekli sandalye': 'wheelchair',
    'TEKERLEKLI SANDALYE': 'wheelchair', // Case fix
    'Whirlpool': 'whirlpool', // Case fix
    'WHIRLPOOL': 'whirlpool', // Case fix
    'Whispering': 'whispering', // Case fix
    'WHISPERING': 'whispering', // Case fix
    'Düdük': 'whistle', // Case fix
    'white angel': 'white-angel',
    'White angel': 'white-angel', // Case fix
    'WHITE ANGEL': 'white-angel', // Case fix
    'white baby': 'white-baby',
    'White baby': 'white-baby', // Case fix
    'WHITE BABY': 'white-baby', // Case fix
    'white bear': 'white-bear',
    'White bear': 'white-bear', // Case fix
    'WHITE BEAR': 'white-bear', // Case fix
    'white bird': 'white-bird',
    'White bird': 'white-bird', // Case fix
    'WHITE BIRD': 'white-bird', // Case fix
    'white blood': 'white-blood',
    'White blood': 'white-blood', // Case fix
    'WHITE BLOOD': 'white-blood', // Case fix
    'white bridge': 'white-bridge',
    'White bridge': 'white-bridge', // Case fix
    'WHITE BRIDGE': 'white-bridge', // Case fix
    'white car': 'white-car',
    'White car': 'white-car', // Case fix
    'WHITE CAR': 'white-car', // Case fix
    'white cat': 'white-cat',
    'White cat': 'white-cat', // Case fix
    'WHITE CAT': 'white-cat', // Case fix
    'white crying': 'white-crying',
    'White crying': 'white-crying', // Case fix
    'WHITE CRYING': 'white-crying', // Case fix
    'white dancing': 'white-dancing',
    'White dancing': 'white-dancing', // Case fix
    'WHITE DANCING': 'white-dancing', // Case fix
    'white death': 'white-death',
    'White death': 'white-death', // Case fix
    'WHITE DEATH': 'white-death', // Case fix
    'white demon': 'white-demon',
    'White demon': 'white-demon', // Case fix
    'WHITE DEMON': 'white-demon', // Case fix
    'white dog': 'white-dog',
    'White dog': 'white-dog', // Case fix
    'WHITE DOG': 'white-dog', // Case fix
    'white door': 'white-door',
    'White door': 'white-door', // Case fix
    'WHITE DOOR': 'white-door', // Case fix
    'white dragon': 'white-dragon',
    'White dragon': 'white-dragon', // Case fix
    'WHITE DRAGON': 'white-dragon', // Case fix
    'white elephant': 'white-elephant',
    'White elephant': 'white-elephant', // Case fix
    'WHITE ELEPHANT': 'white-elephant', // Case fix
    'white fighting': 'white-fighting',
    'White fighting': 'white-fighting', // Case fix
    'WHITE FIGHTING': 'white-fighting', // Case fix
    'white fire': 'white-fire',
    'White fire': 'white-fire', // Case fix
    'WHITE FIRE': 'white-fire', // Case fix
    'white fish': 'white-fish',
    'White fish': 'white-fish', // Case fix
    'WHITE FISH': 'white-fish', // Case fix
    'white flying': 'white-flying',
    'White flying': 'white-flying', // Case fix
    'WHITE FLYING': 'white-flying', // Case fix
    'white ghost': 'white-ghost',
    'White ghost': 'white-ghost', // Case fix
    'WHITE GHOST': 'white-ghost', // Case fix
    'white horse': 'white-horse',
    'White horse': 'white-horse', // Case fix
    'WHITE HORSE': 'white-horse', // Case fix
    'white house': 'white-house',
    'White house': 'white-house', // Case fix
    'WHITE HOUSE': 'white-house', // Case fix
    'white key': 'white-key',
    'White key': 'white-key', // Case fix
    'WHITE KEY': 'white-key', // Case fix
    'white knife': 'white-knife',
    'White knife': 'white-knife', // Case fix
    'WHITE KNIFE': 'white-knife', // Case fix
    'white lion': 'white-lion',
    'White lion': 'white-lion', // Case fix
    'WHITE LION': 'white-lion', // Case fix
    'white money': 'white-money',
    'White money': 'white-money', // Case fix
    'WHITE MONEY': 'white-money', // Case fix
    'white mountain': 'white-mountain',
    'White mountain': 'white-mountain', // Case fix
    'WHITE MOUNTAIN': 'white-mountain', // Case fix
    'white ocean': 'white-ocean',
    'White ocean': 'white-ocean', // Case fix
    'WHITE OCEAN': 'white-ocean', // Case fix
    'white rain': 'white-rain',
    'White rain': 'white-rain', // Case fix
    'WHITE RAIN': 'white-rain', // Case fix
    'white running': 'white-running',
    'White running': 'white-running', // Case fix
    'WHITE RUNNING': 'white-running', // Case fix
    'white shark': 'white-shark',
    'White shark': 'white-shark', // Case fix
    'WHITE SHARK': 'white-shark', // Case fix
    'white snake': 'white-snake',
    'White snake': 'white-snake', // Case fix
    'WHITE SNAKE': 'white-snake', // Case fix
    'white snow': 'white-snow',
    'White snow': 'white-snow', // Case fix
    'WHITE SNOW': 'white-snow', // Case fix
    'white spider': 'white-spider',
    'White spider': 'white-spider', // Case fix
    'WHITE SPIDER': 'white-spider', // Case fix
    'white stairs': 'white-stairs',
    'White stairs': 'white-stairs', // Case fix
    'WHITE STAIRS': 'white-stairs', // Case fix
    'white storm': 'white-storm',
    'White storm': 'white-storm', // Case fix
    'WHITE STORM': 'white-storm', // Case fix
    'white swimming': 'white-swimming',
    'White swimming': 'white-swimming', // Case fix
    'WHITE SWIMMING': 'white-swimming', // Case fix
    'white teeth falling out': 'white-teeth-falling-out',
    'White teeth falling out': 'white-teeth-falling-out', // Case fix
    'WHITE TEETH FALLING OUT': 'white-teeth-falling-out', // Case fix
    'white vampire': 'white-vampire',
    'White vampire': 'white-vampire', // Case fix
    'WHITE VAMPIRE': 'white-vampire', // Case fix
    'white water': 'white-water',
    'White water': 'white-water', // Case fix
    'WHITE WATER': 'white-water', // Case fix
    'white wedding': 'white-wedding',
    'White wedding': 'white-wedding', // Case fix
    'WHITE WEDDING': 'white-wedding', // Case fix
    'white wolf': 'white-wolf',
    'White wolf': 'white-wolf', // Case fix
    'WHITE WOLF': 'white-wolf', // Case fix
    'white wound': 'white-wound',
    'White wound': 'white-wound', // Case fix
    'WHITE WOUND': 'white-wound', // Case fix
    'white zombie': 'white-zombie',
    'White zombie': 'white-zombie', // Case fix
    'WHITE ZOMBIE': 'white-zombie', // Case fix
    'beyaz renk': 'white',
    'Beyaz Renk': 'white', // Case fix
    'Rüzgar': 'wind', // Case fix
    'Windmill': 'windmill', // Case fix
    'WINDMILL': 'windmill', // Case fix
    'Pencere': 'window', // Case fix
    'şarap': 'wine',
    'Kanat': 'wings', // Case fix
    'Wire': 'wire', // Case fix
    'WIRE': 'wire', // Case fix
    'Cadı': 'witch', // Case fix
    'CADI': 'witch', // Case fix
    'Büyücü': 'wizard', // Case fix
    'Kurt': 'wolf', // Case fix
    'woman': 'woman',
    'Woman': 'woman', // Case fix
    'Tahta': 'wood', // Case fix
    'Woodpecker': 'woodpecker', // Case fix
    'woods': 'woods',
    'Woods': 'woods', // Case fix
    'çalışmak (i̇ş)': 'working',
    'Çalışmak (İş)': 'working', // Case fix
    'ÇALIŞMAK (İŞ)': 'working', // Case fix
    'Worm': 'worm', // Case fix
    'Yara': 'wound', // Case fix
    'İngiliz anahtarı': 'wrench', // Case fix
    'İNGILIZ ANAHTARI': 'wrench', // Case fix
    'Güreş': 'wrestling', // Case fix
    'Bilek': 'wrist', // Case fix
    'BILEK': 'wrist', // Case fix
    'yazmak': 'writing',
    'yard': 'yard',
    'Yard': 'yard', // Case fix
    'sarı renk': 'yellow',
    'Sarı Renk': 'yellow', // Case fix
    'SARI RENK': 'yellow', // Case fix
    'Yoğurt': 'yogurt', // Case fix
    'Zero': 'zero', // Case fix
    'Fermuar': 'zipper', // Case fix
    'Zombi': 'zombie', // Case fix
    'ZOMBI': 'zombie', // Case fix
    'Zoo': 'zoo', // Case fix

    // Auto-generated Fixes
    'oyuncu (aktör/aktris)': 'actor',
    'Oyuncu (Aktör/Aktris)': 'actor', // Case fix
    'OYUNCU (AKTÖR/AKTRIS)': 'actor', // Case fix
    'kale direği': 'goal-post',
    'Kale Direği': 'goal-post', // Case fix
    'KALE DIREĞI': 'goal-post', // Case fix
    'hakim (yargıç)': 'judge',
    'Hakim (Yargıç)': 'judge', // Case fix
    'HAKIM (YARGIÇ)': 'judge', // Case fix
    'maske': 'mask',
    'Maske': 'mask', // Case fix
    'sayı yedi (7)': 'seven',
    'Sayı Yedi (7)': 'seven', // Case fix
    'SAYI YEDI (7)': 'seven', // Case fix
    'eş (koca/karı)': 'spouse',
    'Eş (Koca/Karı)': 'spouse', // Case fix
    'EŞ (KOCA/KARI)': 'spouse', // Case fix
    'mürekkep balığı (kalamar)': 'squid',
    'Mürekkep Balığı (Kalamar)': 'squid', // Case fix
    'MÜREKKEP BALIĞI (KALAMAR)': 'squid', // Case fix
    'sayı üç (3)': 'three',
    'Sayı Üç (3)': 'three', // Case fix
    'SAYI ÜÇ (3)': 'three', // Case fix
    'yanardağ (volkan)': 'volcano',
    'Yanardağ (Volkan)': 'volcano', // Case fix
    'mors (deniz aygırı)': 'walrus',
    'Mors (Deniz Aygırı)': 'walrus', // Case fix
    'MORS (DENIZ AYGIRI)': 'walrus', // Case fix
    'çalışmak (i̇ş)': 'working',
    'Çalışmak (İş)': 'working', // Case fix
    'ÇALIŞMAK (İŞ)': 'working', // Case fix

    // Auto-generated Fixes
    'oyuncu (aktör/aktris)': 'actor',
    'Oyuncu (Aktör/Aktris)': 'actor', // Case fix
    'OYUNCU (AKTÖR/AKTRIS)': 'actor', // Case fix
    'hakim (yargıç)': 'judge',
    'Hakim (Yargıç)': 'judge', // Case fix
    'HAKIM (YARGIÇ)': 'judge', // Case fix
    'sayı yedi (7)': 'seven',
    'Sayı Yedi (7)': 'seven', // Case fix
    'SAYI YEDI (7)': 'seven', // Case fix
    'eş (koca/karı)': 'spouse',
    'Eş (Koca/Karı)': 'spouse', // Case fix
    'EŞ (KOCA/KARI)': 'spouse', // Case fix
    'mürekkep balığı (kalamar)': 'squid',
    'Mürekkep Balığı (Kalamar)': 'squid', // Case fix
    'MÜREKKEP BALIĞI (KALAMAR)': 'squid', // Case fix
    'sayı üç (3)': 'three',
    'Sayı Üç (3)': 'three', // Case fix
    'SAYI ÜÇ (3)': 'three', // Case fix
    'yanardağ (volkan)': 'volcano',
    'Yanardağ (Volkan)': 'volcano', // Case fix
    'mors (deniz aygırı)': 'walrus',
    'Mors (Deniz Aygırı)': 'walrus', // Case fix
    'MORS (DENIZ AYGIRI)': 'walrus', // Case fix
    'çalışmak (i̇ş)': 'working',
    'Çalışmak (İş)': 'working', // Case fix
    'ÇALIŞMAK (İŞ)': 'working', // Case fix

    // Auto-generated Fixes
    'oyuncu (aktör/aktris)': 'actor',
    'Oyuncu (Aktör/Aktris)': 'actor', // Case fix
    'OYUNCU (AKTÖR/AKTRIS)': 'actor', // Case fix
    'bayılmak': 'fainting',
    'BAYILMAK': 'fainting', // Case fix
    'hakim (yargıç)': 'judge',
    'Hakim (Yargıç)': 'judge', // Case fix
    'HAKIM (YARGIÇ)': 'judge', // Case fix
    'sayı yedi (7)': 'seven',
    'Sayı Yedi (7)': 'seven', // Case fix
    'SAYI YEDI (7)': 'seven', // Case fix
    'eş (koca/karı)': 'spouse',
    'Eş (Koca/Karı)': 'spouse', // Case fix
    'EŞ (KOCA/KARI)': 'spouse', // Case fix
    'mürekkep balığı (kalamar)': 'squid',
    'Mürekkep Balığı (Kalamar)': 'squid', // Case fix
    'MÜREKKEP BALIĞI (KALAMAR)': 'squid', // Case fix
    'sayı üç (3)': 'three',
    'Sayı Üç (3)': 'three', // Case fix
    'SAYI ÜÇ (3)': 'three', // Case fix
    'yanardağ (volkan)': 'volcano',
    'Yanardağ (Volkan)': 'volcano', // Case fix
    'mors (deniz aygırı)': 'walrus',
    'Mors (Deniz Aygırı)': 'walrus', // Case fix
    'MORS (DENIZ AYGIRI)': 'walrus', // Case fix
    'çalışmak (i̇ş)': 'working',
    'Çalışmak (İş)': 'working', // Case fix
    'ÇALIŞMAK (İŞ)': 'working' // Case fix,

    // Auto-generated Fixes
    '3d yazıcı': '3d-printer',
    '3D Yazıcı': '3d-printer' // Case fix,
    '3D YAZICI': '3d-printer' // Case fix,
    'tembel hayvan': 'aardvark',
    'Tembel hayvan': 'aardvark' // Case fix,
    'aardwolf': 'aardwolf',
    'Aardwolf': 'aardwolf' // Case fix,
    'soroban': 'abacus',
    'abyssinyalı': 'abyssinian',
    'Abyssinyalı': 'abyssinian' // Case fix,
    'ABYSSINYALI': 'abyssinian' // Case fix,
    'akanthus': 'acanthus',
    'Akanthus': 'acanthus' // Case fix,
    'akordeon': 'accordion',
    'Akordeon': 'accordion' // Case fix,
    'meşe palamudu': 'acorn',
    'Meşe palamudu': 'acorn' // Case fix,
    'aksiyon kamerası': 'action-camera',
    'Aksiyon Kamerası': 'action-camera' // Case fix,
    'AKSIYON KAMERASI': 'action-camera' // Case fix,
    'oyuncu (aktör/aktris)': 'actor',
    'Oyuncu (Aktör/Aktris)': 'actor' // Case fix,
    'OYUNCU (AKTÖR/AKTRIS)': 'actor' // Case fix,
    'adelie': 'adelie',
    'Adelie': 'adelie' // Case fix,
    'ADELIE': 'adelie' // Case fix,
    'agave': 'agave',
    'Agave': 'agave' // Case fix,
    'klimatizasyon cihazı': 'air-conditioner',
    'Klimatizasyon cihazı': 'air-conditioner' // Case fix,
    'KLIMATIZASYON CIHAZI': 'air-conditioner' // Case fix,
    'hava fritözü': 'air-fryer',
    'Hava fritözü': 'air-fryer' // Case fix,
    'HAVA FRITÖZÜ': 'air-fryer' // Case fix,
    'hava temizleyici': 'air-purifier',
    'Hava Temizleyici': 'air-purifier' // Case fix,
    'HAVA TEMIZLEYICI': 'air-purifier' // Case fix,
    'hava taksi': 'air-taxi',
    'Hava Taksi': 'air-taxi' // Case fix,
    'HAVA TAKSI': 'air-taxi' // Case fix,
    'havalimanı güvenlik kontrolü': 'airport-security-check',
    'Havalimanı Güvenlik Kontrolü': 'airport-security-check' // Case fix,
    'HAVALIMANI GÜVENLIK KONTROLÜ': 'airport-security-check' // Case fix,
    'havalimanı güvenliği': 'airport-security',
    'Havalimanı Güvenliği': 'airport-security' // Case fix,
    'HAVALIMANI GÜVENLIĞI': 'airport-security' // Case fix,
    'havaalanı servisi': 'airport-shuttle',
    'Havaalanı Servisi': 'airport-shuttle' // Case fix,
    'HAVAALANI SERVISI': 'airport-shuttle' // Case fix,
    'çalar saat': 'alarm-clock',
    'Çalar saat': 'alarm-clock' // Case fix,
    'albatros': 'albatross',
    'Albatros': 'albatross' // Case fix,
    'albino': 'albino',
    'Albino': 'albino' // Case fix,
    'ALBINO': 'albino' // Case fix,
    'niş': 'alcove',
    'Niş': 'alcove' // Case fix,
    'NIŞ': 'alcove' // Case fix,
    'geçit': 'alley',
    'Geçit': 'alley' // Case fix,
    'GEÇIT': 'alley' // Case fix,
    'badem sütü': 'almond-milk',
    'Badem Sütü': 'almond-milk' // Case fix,
    'kalabalığın içinde yalnız hissetmek': 'alone-in-crowd',
    'Kalabalığın içinde yalnız hissetmek': 'alone-in-crowd' // Case fix,
    'KALABALIĞIN IÇINDE YALNIZ HISSETMEK': 'alone-in-crowd' // Case fix,
    'alpaka': 'alpaca',
    'Alpaka': 'alpaca' // Case fix,
    'amarant': 'amaranth',
    'Amarant': 'amaranth' // Case fix,
    'amaryllis': 'amaryllis',
    'Amaryllis': 'amaryllis' // Case fix,
    'AMARYLLIS': 'amaryllis' // Case fix,
    'ambar gris': 'ambergris',
    'AMBAR GRIS': 'ambergris' // Case fix,
    'ambrosia': 'ambrosia',
    'Ambrosia': 'ambrosia' // Case fix,
    'AMBROSIA': 'ambrosia' // Case fix,
    'ammonit': 'ammonite',
    'Ammonit': 'ammonite' // Case fix,
    'AMMONIT': 'ammonite' // Case fix,
    'amfora': 'amphora',
    'Amfora': 'amphora' // Case fix,
    'ampul': 'ampoule',
    'Ampul': 'ampoule' // Case fix,
    'analiz etmek': 'analyzing',
    'Analiz Etmek': 'analyzing' // Case fix,
    'ANALIZ ETMEK': 'analyzing' // Case fix,
    'çapa': 'anchor',
    'Çapa': 'anchor' // Case fix,
    'eski': 'ancient',
    'Eski': 'ancient' // Case fix,
    'ESKI': 'ancient' // Case fix,
    'anemon': 'anemone',
    'Anemon': 'anemone' // Case fix,
    'bilek botları': 'ankle-boots',
    'Bilek Botları': 'ankle-boots' // Case fix,
    'BILEK BOTLARI': 'ankle-boots' // Case fix,
    'çekiç taşı': 'anvil',
    'Çekiç taşı': 'anvil' // Case fix,
    'ÇEKIÇ TAŞI': 'anvil' // Case fix,
    'özür dilemek': 'apologizing',
    'Özür Dilemek': 'apologizing' // Case fix,
    'ÖZÜR DILEMEK': 'apologizing' // Case fix,
    'akvaryum': 'aquarium',
    'Akvaryum': 'aquarium' // Case fix,
    'arbalet': 'arbalest',
    'Arbalet': 'arbalest' // Case fix,
    'birisiyle tartışmak ama ne hakkında olduğunu hatırlamamak': 'arguing-with-someone-but-can-t-remember-what-about',
    'Birisiyle tartışmak ama ne hakkında olduğunu hatırlamamak': 'arguing-with-someone-but-can-t-remember-what-about' // Case fix,
    'BIRISIYLE TARTIŞMAK AMA NE HAKKINDA OLDUĞUNU HATIRLAMAMAK': 'arguing-with-someone-but-can-t-remember-what-about' // Case fix,
    'tartışmak': 'arguing',
    'Tartışmak': 'arguing' // Case fix,
    'TARTIŞMAK': 'arguing' // Case fix,
    'dashtaklı kaplumbağa': 'armadillo',
    'Dashtaklı kaplumbağa': 'armadillo' // Case fix,
    'DASHTAKLI KAPLUMBAĞA': 'armadillo' // Case fix,
    'armilaryum': 'armillary',
    'Armilaryum': 'armillary' // Case fix,
    'ARMILARYUM': 'armillary' // Case fix,
    'dolap': 'armoire',
    'Dolap': 'armoire' // Case fix,
    'zırh': 'armor',
    'Zırh': 'armor' // Case fix,
    'ZIRH': 'armor' // Case fix,
    'arpeggione': 'arpeggione',
    'Arpeggione': 'arpeggione' // Case fix,
    'ARPEGGIONE': 'arpeggione' // Case fix,
    'Tüfek': 'arquebus' // Case fix,
    'sanatçı çikolatası': 'artisan-chocolate',
    'Sanatçı Çikolatası': 'artisan-chocolate' // Case fix,
    'SANATÇI ÇIKOLATASI': 'artisan-chocolate' // Case fix,
    'el yapımı dondurma': 'artisan-ice-cream',
    'El yapımı Dondurma': 'artisan-ice-cream' // Case fix,
    'EL YAPIMI DONDURMA': 'artisan-ice-cream' // Case fix,
    'küllük': 'ashtray',
    'Küllük': 'ashtray' // Case fix,
    'asfodelos': 'asphodel',
    'Asfodelos': 'asphodel' // Case fix,
    'değerlendirme': 'assessing',
    'Değerlendirme': 'assessing' // Case fix,
    'DEĞERLENDIRME': 'assessing' // Case fix,
    'geçiş.': 'asteroid',
    'Geçiş.': 'asteroid' // Case fix,
    'GEÇIŞ.': 'asteroid' // Case fix,
    'astrolabium': 'astrolabe',
    'Astrolabium': 'astrolabe' // Case fix,
    'ASTROLABIUM': 'astrolabe' // Case fix,
    'astronot': 'astronaut',
    'Astronot': 'astronaut' // Case fix,
    'atm': 'atm',
    'ATM': 'atm' // Case fix,
    'saldırgan melek': 'attacking-angel',
    'Saldırgan melek': 'attacking-angel' // Case fix,
    'SALDIRGAN MELEK': 'attacking-angel' // Case fix,
    'bebeğe saldırmak': 'attacking-baby',
    'Bebeğe Saldırmak': 'attacking-baby' // Case fix,
    'BEBEĞE SALDIRMAK': 'attacking-baby' // Case fix,
    'saldıran ayı': 'attacking-bear',
    'Saldıran ayı': 'attacking-bear' // Case fix,
    'SALDIRAN AYI': 'attacking-bear' // Case fix,
    'saldıran kuş': 'attacking-bird',
    'Saldıran kuş': 'attacking-bird' // Case fix,
    'SALDIRAN KUŞ': 'attacking-bird' // Case fix,
    'saldıran kan': 'attacking-blood',
    'Saldıran kan': 'attacking-blood' // Case fix,
    'SALDIRAN KAN': 'attacking-blood' // Case fix,
    'saldırı köprüsü': 'attacking-bridge',
    'Saldırı köprüsü': 'attacking-bridge' // Case fix,
    'SALDIRI KÖPRÜSÜ': 'attacking-bridge' // Case fix,
    'saldıran araba': 'attacking-car',
    'Saldıran araba': 'attacking-car' // Case fix,
    'SALDIRAN ARABA': 'attacking-car' // Case fix,
    'saldıran kedi': 'attacking-cat',
    'Saldıran kedi': 'attacking-cat' // Case fix,
    'SALDIRAN KEDI': 'attacking-cat' // Case fix,
    'saldırgan ağlama': 'attacking-crying',
    'Saldırgan Ağlama': 'attacking-crying' // Case fix,
    'SALDIRGAN AĞLAMA': 'attacking-crying' // Case fix,
    'saldırgan dans': 'attacking-dancing',
    'Saldırgan dans': 'attacking-dancing' // Case fix,
    'SALDIRGAN DANS': 'attacking-dancing' // Case fix,
    'ölümü saldırmak': 'attacking-death',
    'Ölümü saldırmak': 'attacking-death' // Case fix,
    'ÖLÜMÜ SALDIRMAK': 'attacking-death' // Case fix,
    'saldırgan demon': 'attacking-demon',
    'Saldırgan demon': 'attacking-demon' // Case fix,
    'SALDIRGAN DEMON': 'attacking-demon' // Case fix,
    'saldirgan köpek': 'attacking-dog',
    'SALDIRGAN KÖPEK': 'attacking-dog' // Case fix,
    'kapıyı saldırmak': 'attacking-door',
    'Kapıyı saldırmak': 'attacking-door' // Case fix,
    'KAPIYI SALDIRMAK': 'attacking-door' // Case fix,
    'saldıran ejderha': 'attacking-dragon',
    'Saldıran ejderha': 'attacking-dragon' // Case fix,
    'SALDIRAN EJDERHA': 'attacking-dragon' // Case fix,
    'saldıran fil': 'attacking-elephant',
    'Saldıran fil': 'attacking-elephant' // Case fix,
    'SALDIRAN FIL': 'attacking-elephant' // Case fix,
    'saldırgan dövüşme': 'attacking-fighting',
    'Saldırgan dövüşme': 'attacking-fighting' // Case fix,
    'SALDIRGAN DÖVÜŞME': 'attacking-fighting' // Case fix,
    'saldıran ateş': 'attacking-fire',
    'Saldıran ateş': 'attacking-fire' // Case fix,
    'SALDIRAN ATEŞ': 'attacking-fire' // Case fix,
    'saldırgan balık': 'attacking-fish',
    'Saldırgan balık': 'attacking-fish' // Case fix,
    'SALDIRGAN BALIK': 'attacking-fish' // Case fix,
    'saldıran uçan': 'attacking-flying',
    'Saldıran uçan': 'attacking-flying' // Case fix,
    'SALDIRAN UÇAN': 'attacking-flying' // Case fix,
    'saldıran hayalet': 'attacking-ghost',
    'Saldıran Hayalet': 'attacking-ghost' // Case fix,
    'SALDIRAN HAYALET': 'attacking-ghost' // Case fix,
    'saldıran at': 'attacking-horse',
    'Saldıran at': 'attacking-horse' // Case fix,
    'SALDIRAN AT': 'attacking-horse' // Case fix,
    'saldıran ev': 'attacking-house',
    'Saldıran ev': 'attacking-house' // Case fix,
    'SALDIRAN EV': 'attacking-house' // Case fix,
    'anahtar saldırısı': 'attacking-key',
    'Anahtar saldırısı': 'attacking-key' // Case fix,
    'ANAHTAR SALDIRISI': 'attacking-key' // Case fix,
    'geceleyici bıçak': 'attacking-knife',
    'Geceleyici bıçak': 'attacking-knife' // Case fix,
    'GECELEYICI BIÇAK': 'attacking-knife' // Case fix,
    'saldıran aslan': 'attacking-lion',
    'Saldıran aslan': 'attacking-lion' // Case fix,
    'SALDIRAN ASLAN': 'attacking-lion' // Case fix,
    'saldırgan para': 'attacking-money',
    'Saldırgan para': 'attacking-money' // Case fix,
    'SALDIRGAN PARA': 'attacking-money' // Case fix,
    'dağ saldırısı': 'attacking-mountain',
    'Dağ saldırısı': 'attacking-mountain' // Case fix,
    'DAĞ SALDIRISI': 'attacking-mountain' // Case fix,
    'saldırgan okyanus': 'attacking-ocean',
    'Saldırgan Okyanus': 'attacking-ocean' // Case fix,
    'SALDIRGAN OKYANUS': 'attacking-ocean' // Case fix,
    'saldırgan yağmur': 'attacking-rain',
    'Saldırgan yağmur': 'attacking-rain' // Case fix,
    'SALDIRGAN YAĞMUR': 'attacking-rain' // Case fix,
    'saldırarak koşma': 'attacking-running',
    'Saldırarak Koşma': 'attacking-running' // Case fix,
    'SALDIRARAK KOŞMA': 'attacking-running' // Case fix,
    'saldırgan köpekbalığı': 'attacking-shark',
    'Saldırgan köpekbalığı': 'attacking-shark' // Case fix,
    'SALDIRGAN KÖPEKBALIĞI': 'attacking-shark' // Case fix,
    'saldıran yılan': 'attacking-snake',
    'Saldıran yılan': 'attacking-snake' // Case fix,
    'SALDIRAN YILAN': 'attacking-snake' // Case fix,
    'saldıran kar': 'attacking-snow',
    'Saldıran kar': 'attacking-snow' // Case fix,
    'SALDIRAN KAR': 'attacking-snow' // Case fix,
    'saldırgan örümcek': 'attacking-spider',
    'Saldırgan örümcek': 'attacking-spider' // Case fix,
    'SALDIRGAN ÖRÜMCEK': 'attacking-spider' // Case fix,
    'merdivenleri saldırmak': 'attacking-stairs',
    'Merdivenleri saldırmak': 'attacking-stairs' // Case fix,
    'MERDIVENLERI SALDIRMAK': 'attacking-stairs' // Case fix,
    'saldıran fırtına': 'attacking-storm',
    'Saldıran fırtına': 'attacking-storm' // Case fix,
    'SALDIRAN FIRTINA': 'attacking-storm' // Case fix,
    'saldırgan yüzme': 'attacking-swimming',
    'Saldırgan yüzme': 'attacking-swimming' // Case fix,
    'SALDIRGAN YÜZME': 'attacking-swimming' // Case fix,
    'saldıran dişlerin düşmesi': 'attacking-teeth-falling-out',
    'Saldıran Dişlerin Düşmesi': 'attacking-teeth-falling-out' // Case fix,
    'SALDIRAN DIŞLERIN DÜŞMESI': 'attacking-teeth-falling-out' // Case fix,
    'saldıran vampir': 'attacking-vampire',
    'Saldıran Vampir': 'attacking-vampire' // Case fix,
    'SALDIRAN VAMPIR': 'attacking-vampire' // Case fix,
    'saldıran su': 'attacking-water',
    'Saldıran Su': 'attacking-water' // Case fix,
    'SALDIRAN SU': 'attacking-water' // Case fix,
    'düğün saldırısı': 'attacking-wedding',
    'Düğün saldırısı': 'attacking-wedding' // Case fix,
    'DÜĞÜN SALDIRISI': 'attacking-wedding' // Case fix,
    'saldıran kurt': 'attacking-wolf',
    'Saldıran kurt': 'attacking-wolf' // Case fix,
    'SALDIRAN KURT': 'attacking-wolf' // Case fix,
    'saldırgan yara': 'attacking-wound',
    'Saldırgan yara': 'attacking-wound' // Case fix,
    'SALDIRGAN YARA': 'attacking-wound' // Case fix,
    'saldıran zombi': 'attacking-zombie',
    'Saldıran zombi': 'attacking-zombie' // Case fix,
    'SALDIRAN ZOMBI': 'attacking-zombie' // Case fix,
    'i̇zleyici': 'audience',
    'İzleyici': 'audience' // Case fix,
    'İZLEYICI': 'audience' // Case fix,
    'artırılmış gerçeklik gözlükleri': 'augmented-reality-glasses',
    'Artırılmış Gerçeklik Gözlükleri': 'augmented-reality-glasses' // Case fix,
    'ARTIRILMIŞ GERÇEKLIK GÖZLÜKLERI': 'augmented-reality-glasses' // Case fix,
    'artırılmış gerçeklik': 'augmented-reality',
    'Artırılmış Gerçeklik': 'augmented-reality' // Case fix,
    'ARTIRILMIŞ GERÇEKLIK': 'augmented-reality' // Case fix,
    'auroch - aurochs': 'auroch',
    'Auroch - Aurochs': 'auroch' // Case fix,
    'aurochs - aurochs': 'aurochs',
    'Aurochs - Aurochs': 'aurochs' // Case fix,
    'otonom araç': 'autonomous-car',
    'Otonom Araç': 'autonomous-car' // Case fix,
    'otonom i̇nsansız hava aracı': 'autonomous-drone',
    'Otonom İnsansız Hava Aracı': 'autonomous-drone' // Case fix,
    'OTONOM İNSANSIZ HAVA ARACI': 'autonomous-drone' // Case fix,
    'otonom araç': 'autonomous-vehicle',
    'Otonom Araç': 'autonomous-vehicle' // Case fix,
    'avokado tostu': 'avocado-toast',
    'Avokado Tostu': 'avocado-toast' // Case fix,
    'avokado': 'avocado',
    'Avokado': 'avocado' // Case fix,
    'ödül': 'award',
    'Ödül': 'award' // Case fix,
    'i̇ğne': 'awl',
    'İğne': 'awl' // Case fix,
    'aksolotl': 'axolotl',
    'Aksolotl': 'axolotl' // Case fix,
    'azelya': 'azalea',
    'Azelya': 'azalea' // Case fix,
    'azimut': 'azimuth',
    'Azimut': 'azimuth' // Case fix,
    'AZIMUT': 'azimuth' // Case fix,
    'seramik karo': 'azulejo',
    'Seramik karo': 'azulejo' // Case fix,
    'SERAMIK KARO': 'azulejo' // Case fix,
    'rozet': 'badge',
    'Rozet': 'badge' // Case fix,
    'bagel': 'bagel',
    'Bagel': 'bagel' // Case fix,
    'duduk': 'bagpipes',
    'Duduk': 'bagpipes' // Case fix,
    'fırıncı': 'baker',
    'Fırıncı': 'baker' // Case fix,
    'FIRINCI': 'baker' // Case fix,
    'pasta yapma': 'baking',
    'Pasta yapma': 'baking' // Case fix,
    'balalayka': 'balalaika',
    'Balalayka': 'balalaika' // Case fix,
    'balkon': 'balcony',
    'Balkon': 'balcony' // Case fix,
    'balauster': 'baluster',
    'Balauster': 'baluster' // Case fix,
    'balyustrade': 'balustrade',
    'Balyustrade': 'balustrade' // Case fix,
    'bambu': 'bamboo',
    'Bambu': 'bamboo' // Case fix,
    'muz': 'banana',
    'Muz': 'banana' // Case fix,
    'afiş': 'banner',
    'Afiş': 'banner' // Case fix,
    'AFIŞ': 'banner' // Case fix,
    'banshee': 'banshee',
    'Banshee': 'banshee' // Case fix,
    'banyan': 'banyan',
    'Banyan': 'banyan' // Case fix,
    'baobab': 'baobab',
    'Baobab': 'baobab' // Case fix,
    'barista': 'barista',
    'Barista': 'barista' // Case fix,
    'BARISTA': 'barista' // Case fix,
    'bariton': 'baritone',
    'Bariton': 'baritone' // Case fix,
    'BARITON': 'baritone' // Case fix,
    'barometre': 'barometer',
    'Barometre': 'barometer' // Case fix,
    'barca': 'barque',
    'Barca': 'barque' // Case fix,
    'basenji': 'basenji',
    'Basenji': 'basenji' // Case fix,
    'BASENJI': 'basenji' // Case fix,
    'basilisk': 'basilisk',
    'Basilisk': 'basilisk' // Case fix,
    'BASILISK': 'basilisk' // Case fix,
    'fagot': 'bassoon',
    'Fagot': 'bassoon' // Case fix,
    'banyo halısı': 'bath-mat',
    'Banyo Halısı': 'bath-mat' // Case fix,
    'BANYO HALISI': 'bath-mat' // Case fix,
    'Şarj Aleti': 'battery-charger' // Case fix,
    'pil paketi': 'battery-pack',
    'Pil Paketi': 'battery-pack' // Case fix,
    'PIL PAKETI': 'battery-pack' // Case fix,
    'puf koltuk': 'bean-bag',
    'Puf Koltuk': 'bean-bag' // Case fix,
    'bere': 'beanie',
    'Bere': 'beanie' // Case fix,
    'güzel': 'beautiful',
    'Güzel': 'beautiful' // Case fix,
    'kunduz': 'beaver',
    'Kunduz': 'beaver' // Case fix,
    'ünlü olmak': 'becoming-famous',
    'Ünlü Olmak': 'becoming-famous' // Case fix,
    'bej': 'beige',
    'Bej': 'beige' // Case fix,
    'evlat edinilmek': 'being-adopted',
    'Evlat Edinilmek': 'being-adopted' // Case fix,
    'EVLAT EDINILMEK': 'being-adopted' // Case fix,
    'tutuklanmak': 'being-arrested',
    'Tutuklanmak': 'being-arrested' // Case fix,
    'i̇hanete uğramak': 'being-betrayed',
    'İhanete Uğramak': 'being-betrayed' // Case fix,
    'takip edilmek': 'being-chased',
    'Takip edilmek': 'being-chased' // Case fix,
    'TAKIP EDILMEK': 'being-chased' // Case fix,
    'süslemek': 'being-decorated',
    'Süslemek': 'being-decorated' // Case fix,
    'tahttan i̇ndirilmek': 'being-deposed',
    'Tahttan İndirilmek': 'being-deposed' // Case fix,
    'TAHTTAN İNDIRILMEK': 'being-deposed' // Case fix,
    'yenilmek': 'being-eaten',
    'Yenilmek': 'being-eaten' // Case fix,
    'YENILMEK': 'being-eaten' // Case fix,
    'unutulmuş veya görmezden gelinmiş olmak': 'being-forgotten-or-ignored',
    'Unutulmuş veya görmezden gelinmiş olmak': 'being-forgotten-or-ignored' // Case fix,
    'UNUTULMUŞ VEYA GÖRMEZDEN GELINMIŞ OLMAK': 'being-forgotten-or-ignored' // Case fix,
    'birinin seni görmezden gelmesi': 'being-ignored',
    'Birinin seni görmezden gelmesi': 'being-ignored' // Case fix,
    'BIRININ SENI GÖRMEZDEN GELMESI': 'being-ignored' // Case fix,
    'aynı anda iki yerde olmak': 'being-in-two-places-at-once',
    'Aynı anda iki yerde olmak': 'being-in-two-places-at-once' // Case fix,
    'AYNI ANDA IKI YERDE OLMAK': 'being-in-two-places-at-once' // Case fix,
    'yalnız kalmak': 'being-isolated',
    'Yalnız Kalmak': 'being-isolated' // Case fix,
    'YALNIZ KALMAK': 'being-isolated' // Case fix,
    'bir kalabalık tarafından yargılanmak': 'being-judged-by-a-crowd',
    'Bir kalabalık tarafından yargılanmak': 'being-judged-by-a-crowd' // Case fix,
    'BIR KALABALIK TARAFINDAN YARGILANMAK': 'being-judged-by-a-crowd' // Case fix,
    'kaçırılmak': 'being-kidnapped',
    'Kaçırılmak': 'being-kidnapped' // Case fix,
    'KAÇIRILMAK': 'being-kidnapped' // Case fix,
    'önemli bir etkinliğe geç kalmak': 'being-late-for-an-important-event',
    'Önemli bir etkinliğe geç kalmak': 'being-late-for-an-important-event' // Case fix,
    'ÖNEMLI BIR ETKINLIĞE GEÇ KALMAK': 'being-late-for-an-important-event' // Case fix,
    'tarihi bir olayın parçası olmak': 'being-part-of-a-historical-event',
    'Tarihi bir olayın parçası olmak': 'being-part-of-a-historical-event' // Case fix,
    'TARIHI BIR OLAYIN PARÇASI OLMAK': 'being-part-of-a-historical-event' // Case fix,
    'zehirlenmek': 'being-poisoned',
    'Zehirlenmek': 'being-poisoned' // Case fix,
    'ZEHIRLENMEK': 'being-poisoned' // Case fix,
    'çekilmek': 'being-pulled',
    'Çekilmek': 'being-pulled' // Case fix,
    'ÇEKILMEK': 'being-pulled' // Case fix,
    'herkesin sana bakması': 'being-stared-at',
    'Herkesin sana bakması': 'being-stared-at' // Case fix,
    'HERKESIN SANA BAKMASI': 'being-stared-at' // Case fix,
    'bir labirentte sıkışmak': 'being-stuck-in-a-maze',
    'Bir labirentte sıkışmak': 'being-stuck-in-a-maze' // Case fix,
    'BIR LABIRENTTE SIKIŞMAK': 'being-stuck-in-a-maze' // Case fix,
    'asansörde sıkışmak': 'being-stuck-in-an-elevator',
    'Asansörde sıkışmak': 'being-stuck-in-an-elevator' // Case fix,
    'ASANSÖRDE SIKIŞMAK': 'being-stuck-in-an-elevator' // Case fix,
    'kumda sıkışmak': 'being-stuck-in-quicksand',
    'Kumda sıkışmak': 'being-stuck-in-quicksand' // Case fix,
    'KUMDA SIKIŞMAK': 'being-stuck-in-quicksand' // Case fix,
    'seni tanıyan yabancılarla çevrili olmak': 'being-surrounded-by-strangers-that-know-you',
    'Seni tanıyan yabancılarla çevrili olmak': 'being-surrounded-by-strangers-that-know-you' // Case fix,
    'SENI TANIYAN YABANCILARLA ÇEVRILI OLMAK': 'being-surrounded-by-strangers-that-know-you' // Case fix,
    'gıdıklanmak': 'being-tickled',
    'Gıdıklanmak': 'being-tickled' // Case fix,
    'GIDIKLANMAK': 'being-tickled' // Case fix,
    'bir telefon numarasını arayamamak': 'being-unable-to-dial-a-phone-number',
    'Bir telefon numarasını arayamamak': 'being-unable-to-dial-a-phone-number' // Case fix,
    'BIR TELEFON NUMARASINI ARAYAMAMAK': 'being-unable-to-dial-a-phone-number' // Case fix,
    'bir binada çıkışı bulamamak': 'being-unable-to-find-the-exit-in-a-building',
    'Bir binada çıkışı bulamamak': 'being-unable-to-find-the-exit-in-a-building' // Case fix,
    'BIR BINADA ÇIKIŞI BULAMAMAK': 'being-unable-to-find-the-exit-in-a-building' // Case fix,
    'bel çantası': 'belt-bag',
    'Bel çantası': 'belt-bag' // Case fix,
    'BEL ÇANTASI': 'belt-bag' // Case fix,
    'bento kutusu': 'bento-box',
    'Bento kutusu': 'bento-box' // Case fix,
    'betelgeuse': 'betelgeuse',
    'Betelgeuse': 'betelgeuse' // Case fix,
    'güvendiğin birisi tarafından ihanet edilmek': 'betrayed-by-a-trusted-person',
    'Güvendiğin birisi tarafından ihanet edilmek': 'betrayed-by-a-trusted-person' // Case fix,
    'GÜVENDIĞIN BIRISI TARAFINDAN IHANET EDILMEK': 'betrayed-by-a-trusted-person' // Case fix,
    'bisiklet yolu': 'bicycle-lane',
    'Bisiklet Yolu': 'bicycle-lane' // Case fix,
    'BISIKLET YOLU': 'bicycle-lane' // Case fix,
    'bisiklet park yeri': 'bicycle-rack',
    'Bisiklet Park Yeri': 'bicycle-rack' // Case fix,
    'BISIKLET PARK YERI': 'bicycle-rack' // Case fix,
    'bisiklet paylaşımı': 'bicycle-sharing',
    'Bisiklet Paylaşımı': 'bicycle-sharing' // Case fix,
    'BISIKLET PAYLAŞIMI': 'bicycle-sharing' // Case fix,
    'bisiklet yolu': 'bike-lane',
    'Bisiklet Yolu': 'bike-lane' // Case fix,
    'BISIKLET YOLU': 'bike-lane' // Case fix,
    'bisiklet paylaşım uygulaması': 'bike-share-app',
    'Bisiklet Paylaşım Uygulaması': 'bike-share-app' // Case fix,
    'BISIKLET PAYLAŞIM UYGULAMASI': 'bike-share-app' // Case fix,
    'bisiklet paylaşımı': 'bike-share-bicycle',
    'Bisiklet paylaşımı': 'bike-share-bicycle' // Case fix,
    'BISIKLET PAYLAŞIMI': 'bike-share-bicycle' // Case fix,
    'bisiklet paylaşımı': 'bike-share',
    'Bisiklet Paylaşımı': 'bike-share' // Case fix,
    'BISIKLET PAYLAŞIMI': 'bike-share' // Case fix,
    'fatura': 'bill',
    'Fatura': 'bill' // Case fix,
    'afiş panosu': 'billboard',
    'Afiş panosu': 'billboard' // Case fix,
    'AFIŞ PANOSU': 'billboard' // Case fix,
    'klip dosya tutucu': 'binder-clip',
    'Klip dosya tutucu': 'binder-clip' // Case fix,
    'KLIP DOSYA TUTUCU': 'binder-clip' // Case fix,
    'binturong': 'binturong',
    'Binturong': 'binturong' // Case fix,
    'BINTURONG': 'binturong' // Case fix,
    'isırma': 'biting',
    'Isırma': 'biting' // Case fix,
    'ISIRMA': 'biting' // Case fix,
    'siyah ve beyaz': 'black-and-white',
    'Siyah ve beyaz': 'black-and-white' // Case fix,
    'SIYAH VE BEYAZ': 'black-and-white' // Case fix,
    'siyah melek': 'black-angel',
    'Siyah melek': 'black-angel' // Case fix,
    'SIYAH MELEK': 'black-angel' // Case fix,
    'siyah bebek': 'black-baby',
    'Siyah bebek': 'black-baby' // Case fix,
    'SIYAH BEBEK': 'black-baby' // Case fix,
    'siyah ayı': 'black-bear',
    'Siyah ayı': 'black-bear' // Case fix,
    'SIYAH AYI': 'black-bear' // Case fix,
    'siyah kuş': 'black-bird',
    'Siyah kuş': 'black-bird' // Case fix,
    'SIYAH KUŞ': 'black-bird' // Case fix,
    'siyah kan': 'black-blood',
    'Siyah kan': 'black-blood' // Case fix,
    'SIYAH KAN': 'black-blood' // Case fix,
    'siyah köprü': 'black-bridge',
    'Siyah köprü': 'black-bridge' // Case fix,
    'SIYAH KÖPRÜ': 'black-bridge' // Case fix,
    'siyah araba': 'black-car',
    'Siyah araba': 'black-car' // Case fix,
    'SIYAH ARABA': 'black-car' // Case fix,
    'siyah kedi': 'black-cat',
    'Siyah kedi': 'black-cat' // Case fix,
    'SIYAH KEDI': 'black-cat' // Case fix,
    'siyah ağlayan': 'black-crying',
    'Siyah ağlayan': 'black-crying' // Case fix,
    'SIYAH AĞLAYAN': 'black-crying' // Case fix,
    'siyah dans': 'black-dancing',
    'Siyah dans': 'black-dancing' // Case fix,
    'SIYAH DANS': 'black-dancing' // Case fix,
    'siyah ölüm': 'black-death',
    'Siyah ölüm': 'black-death' // Case fix,
    'SIYAH ÖLÜM': 'black-death' // Case fix,
    'siyah demon': 'black-demon',
    'Siyah demon': 'black-demon' // Case fix,
    'SIYAH DEMON': 'black-demon' // Case fix,
    'siyah köpek': 'black-dog',
    'Siyah köpek': 'black-dog' // Case fix,
    'SIYAH KÖPEK': 'black-dog' // Case fix,
    'siyah kapı': 'black-door',
    'Siyah kapı': 'black-door' // Case fix,
    'SIYAH KAPI': 'black-door' // Case fix,
    'siyah ejderha': 'black-dragon',
    'Siyah ejderha': 'black-dragon' // Case fix,
    'SIYAH EJDERHA': 'black-dragon' // Case fix,
    'siyah fil': 'black-elephant',
    'Siyah fil': 'black-elephant' // Case fix,
    'SIYAH FIL': 'black-elephant' // Case fix,
    'siyah dövüş': 'black-fighting',
    'Siyah dövüş': 'black-fighting' // Case fix,
    'SIYAH DÖVÜŞ': 'black-fighting' // Case fix,
    'siyah ateş': 'black-fire',
    'Siyah ateş': 'black-fire' // Case fix,
    'SIYAH ATEŞ': 'black-fire' // Case fix,
    'siyah balık': 'black-fish',
    'Siyah balık': 'black-fish' // Case fix,
    'SIYAH BALIK': 'black-fish' // Case fix,
    'siyah uçan': 'black-flying',
    'Siyah uçan': 'black-flying' // Case fix,
    'SIYAH UÇAN': 'black-flying' // Case fix,
    'siyah hayalet': 'black-ghost',
    'Siyah hayalet': 'black-ghost' // Case fix,
    'SIYAH HAYALET': 'black-ghost' // Case fix,
    'kara delik': 'black-hole',
    'Kara delik': 'black-hole' // Case fix,
    'KARA DELIK': 'black-hole' // Case fix,
    'siyah at': 'black-horse',
    'Siyah at': 'black-horse' // Case fix,
    'SIYAH AT': 'black-horse' // Case fix,
    'siyah ev': 'black-house',
    'Siyah ev': 'black-house' // Case fix,
    'SIYAH EV': 'black-house' // Case fix,
    'siyah anahtar': 'black-key',
    'Siyah anahtar': 'black-key' // Case fix,
    'SIYAH ANAHTAR': 'black-key' // Case fix,
    'siyah bıçak': 'black-knife',
    'Siyah bıçak': 'black-knife' // Case fix,
    'SIYAH BIÇAK': 'black-knife' // Case fix,
    'siyah aslan': 'black-lion',
    'Siyah aslan': 'black-lion' // Case fix,
    'SIYAH ASLAN': 'black-lion' // Case fix,
    'kara para': 'black-money',
    'Kara para': 'black-money' // Case fix,
    'siyah dağ': 'black-mountain',
    'Siyah dağ': 'black-mountain' // Case fix,
    'SIYAH DAĞ': 'black-mountain' // Case fix,
    'siyah okyanus': 'black-ocean',
    'Siyah okyanus': 'black-ocean' // Case fix,
    'SIYAH OKYANUS': 'black-ocean' // Case fix,
    'siyah yağmur': 'black-rain',
    'Siyah yağmur': 'black-rain' // Case fix,
    'SIYAH YAĞMUR': 'black-rain' // Case fix,
    'siyah koşma': 'black-running',
    'Siyah koşma': 'black-running' // Case fix,
    'SIYAH KOŞMA': 'black-running' // Case fix,
    'siyah köpekbalığı': 'black-shark',
    'Siyah köpekbalığı': 'black-shark' // Case fix,
    'SIYAH KÖPEKBALIĞI': 'black-shark' // Case fix,
    'siyah yılan': 'black-snake',
    'Siyah yılan': 'black-snake' // Case fix,
    'SIYAH YILAN': 'black-snake' // Case fix,
    'siyah kar': 'black-snow',
    'Siyah kar': 'black-snow' // Case fix,
    'SIYAH KAR': 'black-snow' // Case fix,
    'siyah örümcek': 'black-spider',
    'Siyah örümcek': 'black-spider' // Case fix,
    'SIYAH ÖRÜMCEK': 'black-spider' // Case fix,
    'siyah merdivenler': 'black-stairs',
    'Siyah merdivenler': 'black-stairs' // Case fix,
    'SIYAH MERDIVENLER': 'black-stairs' // Case fix,
    'siyah fırtına': 'black-storm',
    'Siyah fırtına': 'black-storm' // Case fix,
    'SIYAH FIRTINA': 'black-storm' // Case fix,
    'siyah yüzme': 'black-swimming',
    'Siyah yüzme': 'black-swimming' // Case fix,
    'SIYAH YÜZME': 'black-swimming' // Case fix,
    'siyah dişlerin dökülmesi': 'black-teeth-falling-out',
    'Siyah dişlerin dökülmesi': 'black-teeth-falling-out' // Case fix,
    'SIYAH DIŞLERIN DÖKÜLMESI': 'black-teeth-falling-out' // Case fix,
    'siyah vampir': 'black-vampire',
    'Siyah vampir': 'black-vampire' // Case fix,
    'SIYAH VAMPIR': 'black-vampire' // Case fix,
    'siyah su': 'black-water',
    'Siyah su': 'black-water' // Case fix,
    'SIYAH SU': 'black-water' // Case fix,
    'siyah düğün': 'black-wedding',
    'Siyah düğün': 'black-wedding' // Case fix,
    'SIYAH DÜĞÜN': 'black-wedding' // Case fix,
    'siyah kurt': 'black-wolf',
    'Siyah kurt': 'black-wolf' // Case fix,
    'SIYAH KURT': 'black-wolf' // Case fix,
    'siyah yara': 'black-wound',
    'Siyah yara': 'black-wound' // Case fix,
    'SIYAH YARA': 'black-wound' // Case fix,
    'siyah zombi': 'black-zombie',
    'Siyah zombi': 'black-zombie' // Case fix,
    'SIYAH ZOMBI': 'black-zombie' // Case fix,
    'ceket': 'blazer',
    'Ceket': 'blazer' // Case fix,
    'mikser': 'blender',
    'Mikser': 'blender' // Case fix,
    'MIKSER': 'blender' // Case fix,
    'jaluzi': 'blinds',
    'Jaluzi': 'blinds' // Case fix,
    'JALUZI': 'blinds' // Case fix,
    'blog': 'blog',
    'Blog': 'blog' // Case fix,
    'mavi baskı': 'blueprint',
    'Mavi baskı': 'blueprint' // Case fix,
    'MAVI BASKI': 'blueprint' // Case fix,
    'bluetooth kulaklıklar': 'bluetooth-earbuds',
    'Bluetooth Kulaklıklar': 'bluetooth-earbuds' // Case fix,
    'BLUETOOTH KULAKLIKLAR': 'bluetooth-earbuds' // Case fix,
    'bluetooth kulaklıklar': 'bluetooth-headphones',
    'Bluetooth Kulaklıklar': 'bluetooth-headphones' // Case fix,
    'BLUETOOTH KULAKLIKLAR': 'bluetooth-headphones' // Case fix,
    'bluetooth hoparlör': 'bluetooth-speaker',
    'Bluetooth Hoparlör': 'bluetooth-speaker' // Case fix,
    'Tüfek': 'blunderbuss' // Case fix,
    'bulanık': 'blurry',
    'Bulanık': 'blurry' // Case fix,
    'BULANIK': 'blurry' // Case fix,
    'boab': 'boab',
    'Boab': 'boab' // Case fix,
    'boba çayı': 'boba-tea',
    'Boba Çayı': 'boba-tea' // Case fix,
    'BOBA ÇAYI': 'boba-tea' // Case fix,
    'bodhran': 'bodhran',
    'Bodhran': 'bodhran' // Case fix,
    'kavak mantarı': 'bolete',
    'Kavak mantarı': 'bolete' // Case fix,
    'KAVAK MANTARI': 'bolete' // Case fix,
    'bariyer': 'bollard',
    'Bariyer': 'bollard' // Case fix,
    'BARIYER': 'bollard' // Case fix,
    'bomber ceket': 'bomber-jacket',
    'Bomber Ceket': 'bomber-jacket' // Case fix,
    'bonobo': 'bonobo',
    'Bonobo': 'bonobo' // Case fix,
    'kış botu': 'boots',
    'Kış botu': 'boots' // Case fix,
    'KIŞ BOTU': 'boots' // Case fix,
    'bougainvillea': 'bougainvillea',
    'Bougainvillea': 'bougainvillea' // Case fix,
    'BOUGAINVILLEA': 'bougainvillea' // Case fix,
    'ekmek kutusu': 'bread-bin',
    'Ekmek Kutusu': 'bread-bin' // Case fix,
    'dinlenme odası': 'break-room',
    'Dinlenme odası': 'break-room' // Case fix,
    'DINLENME ODASI': 'break-room' // Case fix,
    'ayrılmak': 'breaking-up',
    'Ayrılmak': 'breaking-up' // Case fix,
    'AYRILMAK': 'breaking-up' // Case fix,
    'suda nefes almak': 'breathing-underwater',
    'Suda Nefes Almak': 'breathing-underwater' // Case fix,
    'nefes alma': 'breathing',
    'Nefes alma': 'breathing' // Case fix,
    'evrak çantası': 'briefcase',
    'Evrak çantası': 'briefcase' // Case fix,
    'EVRAK ÇANTASI': 'briefcase' // Case fix,
    'çok parlak bir ışık görmek': 'bright-light',
    'Çok parlak bir ışık görmek': 'bright-light' // Case fix,
    'ÇOK PARLAK BIR IŞIK GÖRMEK': 'bright-light' // Case fix,
    'geçersiz': 'briseis',
    'Geçersiz': 'briseis' // Case fix,
    'GEÇERSIZ': 'briseis' // Case fix,
    'brocade': 'brocade',
    'Brocade': 'brocade' // Case fix,
    'kırık': 'broken',
    'Kırık': 'broken' // Case fix,
    'KIRIK': 'broken' // Case fix,
    'brunch büfesi': 'brunch-buffet',
    'Brunch Büfesi': 'brunch-buffet' // Case fix,
    'BRUNCH BÜFESI': 'brunch-buffet' // Case fix,
    'fırça': 'brush',
    'Fırça': 'brush' // Case fix,
    'FIRÇA': 'brush' // Case fix,
    'boba çayı': 'bubble-tea',
    'Boba çayı': 'bubble-tea' // Case fix,
    'BOBA ÇAYI': 'bubble-tea' // Case fix,
    'boğa': 'bull',
    'Boğa': 'bull' // Case fix,
    'hızlı tren': 'bullet-train',
    'Hızlı Tren': 'bullet-train' // Case fix,
    'HIZLI TREN': 'bullet-train' // Case fix,
    'bunyip': 'bunyip',
    'Bunyip': 'bunyip' // Case fix,
    'BUNYIP': 'bunyip' // Case fix,
    'yanma': 'burning',
    'Yanma': 'burning' // Case fix,
    'gömme': 'burying',
    'Gömme': 'burying' // Case fix,
    'otobüs durağı': 'bus-shelter',
    'Otobüs Durağı': 'bus-shelter' // Case fix,
    'OTOBÜS DURAĞI': 'bus-shelter' // Case fix,
    'otobüs durağı': 'bus-stop',
    'Otobüs Durağı': 'bus-stop' // Case fix,
    'OTOBÜS DURAĞI': 'bus-stop' // Case fix,
    'kartvizit': 'business-card',
    'Kartvizit': 'business-card' // Case fix,
    'KARTVIZIT': 'business-card' // Case fix,
    'gömlek': 'button-down-shirt',
    'Gömlek': 'button-down-shirt' // Case fix,
    'düğme': 'button',
    'Düğme': 'button' // Case fix,
    'dolap': 'cabinet',
    'Dolap': 'cabinet' // Case fix,
    'kabriolet': 'cabriolet',
    'Kabriolet': 'cabriolet' // Case fix,
    'KABRIOLET': 'cabriolet' // Case fix,
    'caduceus'un türkçesi "caduceus" olarak geçmektedir. ancak, tıbbi sembol olarak "tıp asası" veya "hermes asası" terimleri de kullanılabilir': 'caduceus',
    'Caduceus'un Türkçesi "caduceus" olarak geçmektedir. Ancak, tıbbi sembol olarak "tıp asası" veya "Hermes asası" terimleri de kullanılabilir': 'caduceus' // Case fix,
    'CADUCEUS'UN TÜRKÇESI "CADUCEUS" OLARAK GEÇMEKTEDIR. ANCAK, TIBBI SEMBOL OLARAK "TIP ASASI" VEYA "HERMES ASASI" TERIMLERI DE KULLANILABILIR': 'caduceus' // Case fix,
    'kafein': 'caffeine',
    'Kafein': 'caffeine' // Case fix,
    'KAFEIN': 'caffeine' // Case fix,
    'kafes': 'cage',
    'Kafes': 'cage' // Case fix,
    'küme taş': 'cairn',
    'Küme taş': 'cairn' // Case fix,
    'caladium': 'caladium',
    'Caladium': 'caladium' // Case fix,
    'CALADIUM': 'caladium' // Case fix,
    'mikrometre': 'caliper',
    'Mikrometre': 'caliper' // Case fix,
    'MIKROMETRE': 'caliper' // Case fix,
    'zambak': 'calla',
    'Zambak': 'calla' // Case fix,
    'hat sanatı': 'calligraphy',
    'Hat sanatı': 'calligraphy' // Case fix,
    'HAT SANATI': 'calligraphy' // Case fix,
    'kalliope': 'calliope',
    'Kalliope': 'calliope' // Case fix,
    'KALLIOPE': 'calliope' // Case fix,
    'kamelya': 'camellia',
    'Kamelya': 'camellia' // Case fix,
    'camembert': 'camembert',
    'Camembert': 'camembert' // Case fix,
    'kamera açılmaması': 'camera-not-opening',
    'Kamera açılmaması': 'camera-not-opening' // Case fix,
    'KAMERA AÇILMAMASI': 'camera-not-opening' // Case fix,
    'kılık değiştirme': 'camouflage',
    'Kılık değiştirme': 'camouflage' // Case fix,
    'KILIK DEĞIŞTIRME': 'camouflage' // Case fix,
    'ateş çukuru': 'campfire',
    'Ateş çukuru': 'campfire' // Case fix,
    'konserve açacağı': 'can-opener',
    'Konserve Açacağı': 'can-opener' // Case fix,
    'KONSERVE AÇACAĞI': 'can-opener' // Case fix,
    'hareket edememek / uyku felci': 'can-t-move-sleep-paralysis',
    'Hareket Edememek / Uyku Felci': 'can-t-move-sleep-paralysis' // Case fix,
    'HAREKET EDEMEMEK / UYKU FELCI': 'can-t-move-sleep-paralysis' // Case fix,
    'şamdan': 'candelabra',
    'Şamdan': 'candelabra' // Case fix,
    'şamdan': 'candelabrum',
    'Şamdan': 'candelabrum' // Case fix,
    'şamdan': 'candlestick',
    'Şamdan': 'candlestick' // Case fix,
    'kıyafet bulamamak': 'cannot-find-clothes',
    'Kıyafet bulamamak': 'cannot-find-clothes' // Case fix,
    'KIYAFET BULAMAMAK': 'cannot-find-clothes' // Case fix,
    'kendi sesini duyamamak': 'cannot-hear-voice',
    'Kendi sesini duyamamak': 'cannot-hear-voice' // Case fix,
    'KENDI SESINI DUYAMAMAK': 'cannot-hear-voice' // Case fix,
    'kapıyı açamamak': 'cannot-open-door',
    'Kapıyı açamamak': 'cannot-open-door' // Case fix,
    'KAPIYI AÇAMAMAK': 'cannot-open-door' // Case fix,
    'birinin adını hatırlayamamak': 'cannot-remember-name',
    'Birinin adını hatırlayamamak': 'cannot-remember-name' // Case fix,
    'BIRININ ADINI HATIRLAYAMAMAK': 'cannot-remember-name' // Case fix,
    'mesaj yazıp gönderememek': 'cannot-send-message',
    'Mesaj yazıp gönderememek': 'cannot-send-message' // Case fix,
    'MESAJ YAZIP GÖNDEREMEMEK': 'cannot-send-message' // Case fix,
    'konuşmak isteyip konuşamamak': 'cannot-speak',
    'Konuşmak isteyip konuşamamak': 'cannot-speak' // Case fix,
    'KONUŞMAK ISTEYIP KONUŞAMAMAK': 'cannot-speak' // Case fix,
    'kanyon': 'canyon',
    'Kanyon': 'canyon' // Case fix,
    'kaptan': 'captain',
    'Kaptan': 'captain' // Case fix,
    'kapibara': 'capybara',
    'Kapibara': 'capybara' // Case fix,
    'KAPIBARA': 'capybara' // Case fix,
    'şarj i̇stasyonu': 'car-charging-station',
    'Şarj İstasyonu': 'car-charging-station' // Case fix,
    'araç paylaşımı': 'car-share',
    'Araç Paylaşımı': 'car-share' // Case fix,
    'ARAÇ PAYLAŞIMI': 'car-share' // Case fix,
    'karakalem': 'carabiner',
    'Karakalem': 'carabiner' // Case fix,
    'kartlık': 'cardholder',
    'Kartlık': 'cardholder' // Case fix,
    'KARTLIK': 'cardholder' // Case fix,
    'kargo i̇nsansız hava aracı': 'cargo-drone',
    'Kargo İnsansız Hava Aracı': 'cargo-drone' // Case fix,
    'KARGO İNSANSIZ HAVA ARACI': 'cargo-drone' // Case fix,
    'kargo pantolonları': 'cargo-pants',
    'Kargo Pantolonları': 'cargo-pants' // Case fix,
    'KARGO PANTOLONLARI': 'cargo-pants' // Case fix,
    'kargo gemisi': 'cargo-ship',
    'Kargo Gemisi': 'cargo-ship' // Case fix,
    'KARGO GEMISI': 'cargo-ship' // Case fix,
    'kargo şortları': 'cargo-shorts',
    'Kargo Şortları': 'cargo-shorts' // Case fix,
    'KARGO ŞORTLARI': 'cargo-shorts' // Case fix,
    'çan kulesi': 'carillon',
    'Çan kulesi': 'carillon' // Case fix,
    'ÇAN KULESI': 'carillon' // Case fix,
    'ateş taşı': 'carnelian',
    'Ateş taşı': 'carnelian' // Case fix,
    'ATEŞ TAŞI': 'carnelian' // Case fix,
    'dönme dolap': 'carousel',
    'Dönme dolap': 'carousel' // Case fix,
    'ortak araç şeridi': 'carpool-lane',
    'Ortak Araç Şeridi': 'carpool-lane' // Case fix,
    'ORTAK ARAÇ ŞERIDI': 'carpool-lane' // Case fix,
    'araç paylaşımı': 'carpool',
    'Araç paylaşımı': 'carpool' // Case fix,
    'ARAÇ PAYLAŞIMI': 'carpool' // Case fix,
    'karyatid': 'caryatid',
    'Karyatid': 'caryatid' // Case fix,
    'KARYATID': 'caryatid' // Case fix,
    'kumarhane': 'casino',
    'Kumarhane': 'casino' // Case fix,
    'kasuvarı': 'cassowary',
    'Kasuvarı': 'cassowary' // Case fix,
    'KASUVARI': 'cassowary' // Case fix,
    'sade blazer': 'casual-blazer',
    'Sade Blazer': 'casual-blazer' // Case fix,
    'kazanın': 'cauldron',
    'Kazanın': 'cauldron' // Case fix,
    'KAZANIN': 'cauldron' // Case fix,
    'güvenlik kamerası': 'cctv',
    'Güvenlik Kamerası': 'cctv' // Case fix,
    'GÜVENLIK KAMERASI': 'cctv' // Case fix,
    'tavan': 'ceiling',
    'Tavan': 'ceiling' // Case fix,
    'doğum günü kutlamak': 'celebrating-a-birthday',
    'Doğum Günü Kutlamak': 'celebrating-a-birthday' // Case fix,
    'kutlamak': 'celebrating',
    'Kutlamak': 'celebrating' // Case fix,
    'celesta': 'celesta',
    'Celesta': 'celesta' // Case fix,
    'celosia': 'celosia',
    'Celosia': 'celosia' // Case fix,
    'CELOSIA': 'celosia' // Case fix,
    'anıt mezar': 'cenotaph',
    'Anıt mezar': 'cenotaph' // Case fix,
    'ANIT MEZAR': 'cenotaph' // Case fix,
    'zincir kolye': 'chain-necklace',
    'Zincir Kolye': 'chain-necklace' // Case fix,
    'ZINCIR KOLYE': 'chain-necklace' // Case fix,
    'chalupa': 'chalupa',
    'Chalupa': 'chalupa' // Case fix,
    'bukalemun': 'chameleon',
    'Bukalemun': 'chameleon' // Case fix,
    'geçmiş.': 'chaos',
    'Geçmiş.': 'chaos' // Case fix,
    'GEÇMIŞ.': 'chaos' // Case fix,
    'şarküteri tabağı': 'charcuterie-board',
    'Şarküteri Tabağı': 'charcuterie-board' // Case fix,
    'ŞARKÜTERI TABAĞI': 'charcuterie-board' // Case fix,
    'şarj kablosu': 'charging-cable',
    'Şarj Kablosu': 'charging-cable' // Case fix,
    'şarj i̇stasyonu': 'charging-station',
    'Şarj İstasyonu': 'charging-station' // Case fix,
    'kiralık otobüs': 'charter-bus',
    'Kiralık Otobüs': 'charter-bus' // Case fix,
    'KIRALIK OTOBÜS': 'charter-bus' // Case fix,
    'meleği kovalamak': 'chasing-angel',
    'Meleği kovalamak': 'chasing-angel' // Case fix,
    'MELEĞI KOVALAMAK': 'chasing-angel' // Case fix,
    'bebek kovalamak': 'chasing-baby',
    'Bebek kovalamak': 'chasing-baby' // Case fix,
    'kovalayan ayı': 'chasing-bear',
    'Kovalayan ayı': 'chasing-bear' // Case fix,
    'KOVALAYAN AYI': 'chasing-bear' // Case fix,
    'kovalanan kuş': 'chasing-bird',
    'Kovalanan kuş': 'chasing-bird' // Case fix,
    'kan kovalamak': 'chasing-blood',
    'Kan kovalamak': 'chasing-blood' // Case fix,
    'köprü kovalamak': 'chasing-bridge',
    'Köprü kovalamak': 'chasing-bridge' // Case fix,
    'araba kovalamak': 'chasing-car',
    'Araba kovalamak': 'chasing-car' // Case fix,
    'kedi kovalamak': 'chasing-cat',
    'Kedi kovalamak': 'chasing-cat' // Case fix,
    'KEDI KOVALAMAK': 'chasing-cat' // Case fix,
    'ağlayan kovalamak': 'chasing-crying',
    'Ağlayan kovalamak': 'chasing-crying' // Case fix,
    'dans edenleri kovalamak': 'chasing-dancing',
    'Dans edenleri kovalamak': 'chasing-dancing' // Case fix,
    'DANS EDENLERI KOVALAMAK': 'chasing-dancing' // Case fix,
    'ölümü kovalamak': 'chasing-death',
    'Ölümü kovalamak': 'chasing-death' // Case fix,
    'kovalanan demon': 'chasing-demon',
    'Kovalanan demon': 'chasing-demon' // Case fix,
    'kovalayan köpek': 'chasing-dog',
    'Kovalayan köpek': 'chasing-dog' // Case fix,
    'kapıyı kovalamak': 'chasing-door',
    'Kapıyı kovalamak': 'chasing-door' // Case fix,
    'KAPIYI KOVALAMAK': 'chasing-door' // Case fix,
    'ejderha kovalamak': 'chasing-dragon',
    'Ejderha kovalamak': 'chasing-dragon' // Case fix,
    'fil kovalamak': 'chasing-elephant',
    'Fil kovalamak': 'chasing-elephant' // Case fix,
    'FIL KOVALAMAK': 'chasing-elephant' // Case fix,
    'kovalamaca çatışması': 'chasing-fighting',
    'Kovalamaca çatışması': 'chasing-fighting' // Case fix,
    'KOVALAMACA ÇATIŞMASI': 'chasing-fighting' // Case fix,
    'ateşi kovalamak': 'chasing-fire',
    'Ateşi kovalamak': 'chasing-fire' // Case fix,
    'ATEŞI KOVALAMAK': 'chasing-fire' // Case fix,
    'balık kovalamak': 'chasing-fish',
    'Balık kovalamak': 'chasing-fish' // Case fix,
    'BALIK KOVALAMAK': 'chasing-fish' // Case fix,
    'uçan kovalamak': 'chasing-flying',
    'Uçan kovalamak': 'chasing-flying' // Case fix,
    'hayalet kovalamak': 'chasing-ghost',
    'Hayalet kovalamak': 'chasing-ghost' // Case fix,
    'at kovalamak': 'chasing-horse',
    'At kovalamak': 'chasing-horse' // Case fix,
    'evi kovalamak': 'chasing-house',
    'Evi kovalamak': 'chasing-house' // Case fix,
    'EVI KOVALAMAK': 'chasing-house' // Case fix,
    'anahtar kovalamak': 'chasing-key',
    'Anahtar kovalamak': 'chasing-key' // Case fix,
    'kovalayan bıçak': 'chasing-knife',
    'Kovalayan bıçak': 'chasing-knife' // Case fix,
    'KOVALAYAN BIÇAK': 'chasing-knife' // Case fix,
    'aslan kovalamak': 'chasing-lion',
    'Aslan kovalamak': 'chasing-lion' // Case fix,
    'para kovalamak': 'chasing-money',
    'Para kovalamak': 'chasing-money' // Case fix,
    'dağı kovalamak': 'chasing-mountain',
    'Dağı kovalamak': 'chasing-mountain' // Case fix,
    'DAĞI KOVALAMAK': 'chasing-mountain' // Case fix,
    'okyanusu kovalamak': 'chasing-ocean',
    'Okyanusu kovalamak': 'chasing-ocean' // Case fix,
    'yağmur kovalamak': 'chasing-rain',
    'Yağmur kovalamak': 'chasing-rain' // Case fix,
    'koşarak kovalamak': 'chasing-running',
    'Koşarak kovalamak': 'chasing-running' // Case fix,
    'köpekbalığı kovalamak': 'chasing-shark',
    'Köpekbalığı kovalamak': 'chasing-shark' // Case fix,
    'KÖPEKBALIĞI KOVALAMAK': 'chasing-shark' // Case fix,
    'yılan kovalamak': 'chasing-snake',
    'Yılan kovalamak': 'chasing-snake' // Case fix,
    'YILAN KOVALAMAK': 'chasing-snake' // Case fix,
    'kar kovalamak': 'chasing-snow',
    'Kar kovalamak': 'chasing-snow' // Case fix,
    'örümcek kovalamak': 'chasing-spider',
    'Örümcek kovalamak': 'chasing-spider' // Case fix,
    'merdiven kovalamak': 'chasing-stairs',
    'Merdiven kovalamak': 'chasing-stairs' // Case fix,
    'MERDIVEN KOVALAMAK': 'chasing-stairs' // Case fix,
    'fırtına kovalamak': 'chasing-storm',
    'Fırtına kovalamak': 'chasing-storm' // Case fix,
    'FIRTINA KOVALAMAK': 'chasing-storm' // Case fix,
    'yüzerek kovalamak': 'chasing-swimming',
    'Yüzerek kovalamak': 'chasing-swimming' // Case fix,
    'dişlerin düşmesi ve peşinden koşmak': 'chasing-teeth-falling-out',
    'Dişlerin düşmesi ve peşinden koşmak': 'chasing-teeth-falling-out' // Case fix,
    'DIŞLERIN DÜŞMESI VE PEŞINDEN KOŞMAK': 'chasing-teeth-falling-out' // Case fix,
    'vampir kovalamak': 'chasing-vampire',
    'Vampir kovalamak': 'chasing-vampire' // Case fix,
    'VAMPIR KOVALAMAK': 'chasing-vampire' // Case fix,
    'su kovalamak': 'chasing-water',
    'Su kovalamak': 'chasing-water' // Case fix,
    'düğün kovalamak': 'chasing-wedding',
    'Düğün kovalamak': 'chasing-wedding' // Case fix,
    'kurt kovalamak': 'chasing-wolf',
    'Kurt kovalamak': 'chasing-wolf' // Case fix,
    'yarayı kovalamak': 'chasing-wound',
    'Yarayı kovalamak': 'chasing-wound' // Case fix,
    'YARAYI KOVALAMAK': 'chasing-wound' // Case fix,
    'zombi kovalamak': 'chasing-zombie',
    'Zombi kovalamak': 'chasing-zombie' // Case fix,
    'ZOMBI KOVALAMAK': 'chasing-zombie' // Case fix,
    'kontrol': 'check',
    'Kontrol': 'check' // Case fix,
    'geçmeli': 'checkered',
    'Geçmeli': 'checkered' // Case fix,
    'GEÇMELI': 'checkered' // Case fix,
    'peynir tabağı': 'cheese-board',
    'Peynir Tabağı': 'cheese-board' // Case fix,
    'PEYNIR TABAĞI': 'cheese-board' // Case fix,
    'çita': 'cheetah',
    'Çita': 'cheetah' // Case fix,
    'ÇITA': 'cheetah' // Case fix,
    'şenil': 'chenille',
    'Şenil': 'chenille' // Case fix,
    'ŞENIL': 'chenille' // Case fix,
    'çin elbisesi': 'cheongsam',
    'Çin elbisesi': 'cheongsam' // Case fix,
    'ÇIN ELBISESI': 'cheongsam' // Case fix,
    'sandık': 'chest',
    'Sandık': 'chest' // Case fix,
    'SANDIK': 'chest' // Case fix,
    'çiğneme': 'chewing',
    'Çiğneme': 'chewing' // Case fix,
    'ÇIĞNEME': 'chewing' // Case fix,
    'tenebrism': 'chiaroscuro',
    'Tenebrism': 'chiaroscuro' // Case fix,
    'TENEBRISM': 'chiaroscuro' // Case fix,
    'kimera': 'chimera',
    'Kimera': 'chimera' // Case fix,
    'KIMERA': 'chimera' // Case fix,
    'şempanze': 'chimpanzee',
    'Şempanze': 'chimpanzee' // Case fix,
    'çiton': 'chiton',
    'Çiton': 'chiton' // Case fix,
    'ÇITON': 'chiton' // Case fix,
    'choker': 'choker',
    'Choker': 'choker' // Case fix,
    'boğulma': 'choking',
    'Boğulma': 'choking' // Case fix,
    'koreografik': 'choreographed',
    'Koreografik': 'choreographed' // Case fix,
    'KOREOGRAFIK': 'choreographed' // Case fix,
    'pupa': 'chrysalis',
    'Pupa': 'chrysalis' // Case fix,
    'krizantem': 'chrysanthemum',
    'Krizantem': 'chrysanthemum' // Case fix,
    'KRIZANTEM': 'chrysanthemum' // Case fix,
    'cymbalom': 'cimbalom',
    'Cymbalom': 'cimbalom' // Case fix,
    'sineması': 'cinema',
    'Sineması': 'cinema' // Case fix,
    'SINEMASI': 'cinema' // Case fix,
    'daire': 'circle',
    'Daire': 'circle' // Case fix,
    'DAIRE': 'circle' // Case fix,
    'sirk': 'circus',
    'Sirk': 'circus' // Case fix,
    'SIRK': 'circus' // Case fix,
    'sarnıç': 'cistern',
    'Sarnıç': 'cistern' // Case fix,
    'SARNIÇ': 'cistern' // Case fix,
    'şehir otobüsü': 'city-bus',
    'Şehir Otobüsü': 'city-bus' // Case fix,
    'ŞEHIR OTOBÜSÜ': 'city-bus' // Case fix,
    'i̇stiridye': 'clam',
    'İstiridye': 'clam' // Case fix,
    'İSTIRIDYE': 'clam' // Case fix,
    'alkışlamak': 'clapping',
    'Alkışlamak': 'clapping' // Case fix,
    'ALKIŞLAMAK': 'clapping' // Case fix,
    'temiz': 'clean',
    'Temiz': 'clean' // Case fix,
    'TEMIZ': 'clean' // Case fix,
    'pano': 'clipboard',
    'Pano': 'clipboard' // Case fix,
    'kartlı geçiş makinesi': 'clock-in-machine',
    'Kartlı geçiş makinesi': 'clock-in-machine' // Case fix,
    'KARTLI GEÇIŞ MAKINESI': 'clock-in-machine' // Case fix,
    'saatin durması': 'clock-stopping',
    'Saatin durması': 'clock-stopping' // Case fix,
    'SAATIN DURMASI': 'clock-stopping' // Case fix,
    'dolap': 'closet',
    'Dolap': 'closet' // Case fix,
    'bulut depolama': 'cloud-storage',
    'Bulut Depolama': 'cloud-storage' // Case fix,
    'palyaço': 'clown',
    'Palyaço': 'clown' // Case fix,
    'koçluk yapmak': 'coaching',
    'Koçluk Yapmak': 'coaching' // Case fix,
    'bardak altlığı': 'coaster',
    'Bardak Altlığı': 'coaster' // Case fix,
    'BARDAK ALTLIĞI': 'coaster' // Case fix,
    'palto askısı': 'coat-rack',
    'Palto askısı': 'coat-rack' // Case fix,
    'PALTO ASKISI': 'coat-rack' // Case fix,
    'kokteyl partisi': 'cocktail-party',
    'Kokteyl Partisi': 'cocktail-party' // Case fix,
    'KOKTEYL PARTISI': 'cocktail-party' // Case fix,
    'köpek balığı': 'coelacanth',
    'Köpek balığı': 'coelacanth' // Case fix,
    'KÖPEK BALIĞI': 'coelacanth' // Case fix,
    'kahve makinesi': 'coffee-machine',
    'Kahve Makinesi': 'coffee-machine' // Case fix,
    'KAHVE MAKINESI': 'coffee-machine' // Case fix,
    'kahve makinesi': 'coffee-maker',
    'Kahve Makinesi': 'coffee-maker' // Case fix,
    'KAHVE MAKINESI': 'coffee-maker' // Case fix,
    'kahve fincanı': 'coffee-mug',
    'Kahve Fincanı': 'coffee-mug' // Case fix,
    'KAHVE FINCANI': 'coffee-mug' // Case fix,
    'kahve dükkanı': 'coffee-shop',
    'Kahve Dükkanı': 'coffee-shop' // Case fix,
    'KAHVE DÜKKANI': 'coffee-shop' // Case fix,
    'süzgeç': 'colander',
    'Süzgeç': 'colander' // Case fix,
    'soğuk demleme': 'cold-brew',
    'Soğuk Demleme': 'cold-brew' // Case fix,
    'soğuk demleme kahve': 'cold-brewed-coffee',
    'Soğuk Demleme Kahve': 'cold-brewed-coffee' // Case fix,
    'soğuk sıkım meyve suyu': 'cold-pressed-juice',
    'Soğuk Sıkım Meyve Suyu': 'cold-pressed-juice' // Case fix,
    'SOĞUK SIKIM MEYVE SUYU': 'cold-pressed-juice' // Case fix,
    'soğuk': 'cold',
    'Soğuk': 'cold' // Case fix,
    'renk': 'color',
    'Renk': 'color' // Case fix,
    'tarak': 'comb',
    'Tarak': 'comb' // Case fix,
    'ticari uçak': 'commercial-airplane',
    'Ticari Uçak': 'commercial-airplane' // Case fix,
    'TICARI UÇAK': 'commercial-airplane' // Case fix,
    'telepatik olarak iletişim kurmak': 'communicating-telepathically',
    'Telepatik olarak iletişim kurmak': 'communicating-telepathically' // Case fix,
    'TELEPATIK OLARAK ILETIŞIM KURMAK': 'communicating-telepathically' // Case fix,
    'sonsuz bir yarışta rekabet etmek': 'competing-in-a-race-with-no-end',
    'Sonsuz bir yarışta rekabet etmek': 'competing-in-a-race-with-no-end' // Case fix,
    'SONSUZ BIR YARIŞTA REKABET ETMEK': 'competing-in-a-race-with-no-end' // Case fix,
    'yarışmak': 'competing',
    'Yarışmak': 'competing' // Case fix,
    'YARIŞMAK': 'competing' // Case fix,
    'şikayet etmek': 'complaining',
    'Şikayet Etmek': 'complaining' // Case fix,
    'ŞIKAYET ETMEK': 'complaining' // Case fix,
    'sıkıştırma çorapları': 'compression-socks',
    'Sıkıştırma Çorapları': 'compression-socks' // Case fix,
    'SIKIŞTIRMA ÇORAPLARI': 'compression-socks' // Case fix,
    'konser bileti': 'concert-ticket',
    'Konser Bileti': 'concert-ticket' // Case fix,
    'KONSER BILETI': 'concert-ticket' // Case fix,
    'sedefli deniz kabuğu': 'conch',
    'SEDEFLI DENIZ KABUĞU': 'conch' // Case fix,
    'uzlaşma': 'conciliating',
    'Uzlaşma': 'conciliating' // Case fix,
    'konferans görüşmesi': 'conference-call',
    'Konferans Görüşmesi': 'conference-call' // Case fix,
    'KONFERANS GÖRÜŞMESI': 'conference-call' // Case fix,
    'konferans masası': 'conference-table',
    'Konferans Masası': 'conference-table' // Case fix,
    'KONFERANS MASASI': 'conference-table' // Case fix,
    'yüzleşmek': 'confronting',
    'Yüzleşmek': 'confronting' // Case fix,
    'i̇nşaat vinçleri': 'construction-crane',
    'İnşaat Vinçleri': 'construction-crane' // Case fix,
    'İNŞAAT VINÇLERI': 'construction-crane' // Case fix,
    'temassız ödeme': 'contactless-payment',
    'Temassız Ödeme': 'contactless-payment' // Case fix,
    'TEMASSIZ ÖDEME': 'contactless-payment' // Case fix,
    'düşünmek': 'contemplating',
    'Düşünmek': 'contemplating' // Case fix,
    'sözleşme': 'contract',
    'Sözleşme': 'contract' // Case fix,
    'dönüşebilir araba': 'convertible',
    'Dönüşebilir araba': 'convertible' // Case fix,
    'DÖNÜŞEBILIR ARABA': 'convertible' // Case fix,
    'i̇kna etmek': 'convincing',
    'İkna Etmek': 'convincing' // Case fix,
    'kopyalamak': 'copying',
    'Kopyalamak': 'copying' // Case fix,
    'kano': 'coracle',
    'Kano': 'coracle' // Case fix,
    'mercan': 'coral',
    'Mercan': 'coral' // Case fix,
    'kordilyera': 'cordillera',
    'Kordilyera': 'cordillera' // Case fix,
    'KORDILYERA': 'cordillera' // Case fix,
    'kablosuz süpürge': 'cordless-vacuum',
    'Kablosuz Süpürge': 'cordless-vacuum' // Case fix,
    'bereket boynuzu': 'cornucopia',
    'Bereket boynuzu': 'cornucopia' // Case fix,
    'öksürme': 'coughing',
    'Öksürme': 'coughing' // Case fix,
    'el yapımı bira': 'craft-beer',
    'El yapımı bira': 'craft-beer' // Case fix,
    'EL YAPIMI BIRA': 'craft-beer' // Case fix,
    'el yapımı kokteyller': 'craft-cocktails',
    'El yapımı kokteyller': 'craft-cocktails' // Case fix,
    'EL YAPIMI KOKTEYLLER': 'craft-cocktails' // Case fix,
    'çarpma': 'crashing',
    'Çarpma': 'crashing' // Case fix,
    'tırmanma': 'crawling',
    'Tırmanma': 'crawling' // Case fix,
    'TIRMANMA': 'crawling' // Case fix,
    'kredi kartı': 'credit-card',
    'Kredi kartı': 'credit-card' // Case fix,
    'KREDI KARTI': 'credit-card' // Case fix,
    'zambak': 'crinum',
    'Zambak': 'crinum' // Case fix,
    'eleştirmek': 'criticizing',
    'Eleştirmek': 'criticizing' // Case fix,
    'ELEŞTIRMEK': 'criticizing' // Case fix,
    'piskopos asası': 'crosier',
    'Piskopos asası': 'crosier' // Case fix,
    'PISKOPOS ASASI': 'crosier' // Case fix,
    'çapraz': 'cross',
    'Çapraz': 'cross' // Case fix,
    'çapraz çanta': 'crossbody-bag',
    'Çapraz Çanta': 'crossbody-bag' // Case fix,
    'Tüfek': 'crossbow' // Case fix,
    'köprüden geçmek': 'crossing-a-bridge',
    'Köprüden Geçmek': 'crossing-a-bridge' // Case fix,
    'yaya geçidi': 'crosswalk',
    'Yaya geçidi': 'crosswalk' // Case fix,
    'YAYA GEÇIDI': 'crosswalk' // Case fix,
    'kalabalık metro': 'crowded-subway',
    'Kalabalık Metro': 'crowded-subway' // Case fix,
    'KALABALIK METRO': 'crowded-subway' // Case fix,
    'kalabalık': 'crowded',
    'Kalabalık': 'crowded' // Case fix,
    'KALABALIK': 'crowded' // Case fix,
    'kitle fonlaması': 'crowdfunding',
    'Kitle fonlaması': 'crowdfunding' // Case fix,
    'KITLE FONLAMASI': 'crowdfunding' // Case fix,
    'ateş testi': 'crucible',
    'Ateş testi': 'crucible' // Case fix,
    'ATEŞ TESTI': 'crucible' // Case fix,
    'crumhorn': 'crumhorn',
    'Crumhorn': 'crumhorn' // Case fix,
    'haçlı seferi yapmak': 'crusading',
    'Haçlı Seferi Yapmak': 'crusading' // Case fix,
    'HAÇLI SEFERI YAPMAK': 'crusading' // Case fix,
    'kripto para': 'cryptocurrency',
    'Kripto para': 'cryptocurrency' // Case fix,
    'KRIPTO PARA': 'cryptocurrency' // Case fix,
    'ofis bölmesi': 'cubicle',
    'Ofis bölmesi': 'cubicle' // Case fix,
    'OFIS BÖLMESI': 'cubicle' // Case fix,
    'kümülonimbus': 'cumulonimbus',
    'Kümülonimbus': 'cumulonimbus' // Case fix,
    'KÜMÜLONIMBUS': 'cumulonimbus' // Case fix,
    'kümülüs': 'cumulus',
    'Kümülüs': 'cumulus' // Case fix,
    'perde çubuğu': 'curtain-rod',
    'Perde Çubuğu': 'curtain-rod' // Case fix,
    'kuskus': 'cuscus',
    'Kuskus': 'cuscus' // Case fix,
    'kesme tahtası': 'cutting-board',
    'Kesme Tahtası': 'cutting-board' // Case fix,
    'KESME TAHTASI': 'cutting-board' // Case fix,
    'siborg': 'cyborg',
    'Siborg': 'cyborg' // Case fix,
    'SIBORG': 'cyborg' // Case fix,
    'siklamen': 'cyclamen',
    'Siklamen': 'cyclamen' // Case fix,
    'SIKLAMEN': 'cyclamen' // Case fix,
    'sedir': 'cypress',
    'Sedir': 'cypress' // Case fix,
    'SEDIR': 'cypress' // Case fix,
    'daguerreotip': 'daguerreotype',
    'Daguerreotip': 'daguerreotype' // Case fix,
    'DAGUERREOTIP': 'daguerreotype' // Case fix,
    'daikon': 'daikon',
    'Daikon': 'daikon' // Case fix,
    'DAIKON': 'daikon' // Case fix,
    'damat kumaşı': 'damask',
    'Damat kumaşı': 'damask' // Case fix,
    'DAMAT KUMAŞI': 'damask' // Case fix,
    'yusufçuk': 'damselfly',
    'Yusufçuk': 'damselfly' // Case fix,
    'dansçı': 'dancer',
    'Dansçı': 'dancer' // Case fix,
    'DANSÇI': 'dancer' // Case fix,
    'karanlık merdiven': 'dark-stairs',
    'Karanlık merdiven': 'dark-stairs' // Case fix,
    'KARANLIK MERDIVEN': 'dark-stairs' // Case fix,
    'karanlık': 'darkness',
    'Karanlık': 'darkness' // Case fix,
    'KARANLIK': 'darkness' // Case fix,
    'flört uygulaması': 'dating-app',
    'Flört Uygulaması': 'dating-app' // Case fix,
    'FLÖRT UYGULAMASI': 'dating-app' // Case fix,
    'ölü melek': 'dead-angel',
    'Ölü melek': 'dead-angel' // Case fix,
    'ölü bebek': 'dead-baby',
    'Ölü bebek': 'dead-baby' // Case fix,
    'ölü ayı': 'dead-bear',
    'Ölü ayı': 'dead-bear' // Case fix,
    'ÖLÜ AYI': 'dead-bear' // Case fix,
    'ölü kuş': 'dead-bird',
    'Ölü kuş': 'dead-bird' // Case fix,
    'ölü kan': 'dead-blood',
    'Ölü kan': 'dead-blood' // Case fix,
    'ölü köprü': 'dead-bridge',
    'Ölü köprü': 'dead-bridge' // Case fix,
    'ölü araba': 'dead-car',
    'Ölü araba': 'dead-car' // Case fix,
    'ölü kedi': 'dead-cat',
    'Ölü kedi': 'dead-cat' // Case fix,
    'ÖLÜ KEDI': 'dead-cat' // Case fix,
    'ölü ağlayan': 'dead-crying',
    'Ölü ağlayan': 'dead-crying' // Case fix,
    'ölülerin dansı': 'dead-dancing',
    'Ölülerin dansı': 'dead-dancing' // Case fix,
    'ÖLÜLERIN DANSI': 'dead-dancing' // Case fix,
    'ölü şeytan': 'dead-demon',
    'Ölü şeytan': 'dead-demon' // Case fix,
    'ölü köpek': 'dead-dog',
    'Ölü köpek': 'dead-dog' // Case fix,
    'ölü kapı': 'dead-door',
    'Ölü kapı': 'dead-door' // Case fix,
    'ÖLÜ KAPI': 'dead-door' // Case fix,
    'ölü ejderha': 'dead-dragon',
    'Ölü ejderha': 'dead-dragon' // Case fix,
    'ölü fil': 'dead-elephant',
    'Ölü fil': 'dead-elephant' // Case fix,
    'ÖLÜ FIL': 'dead-elephant' // Case fix,
    'ölü dövüşü': 'dead-fighting',
    'Ölü dövüşü': 'dead-fighting' // Case fix,
    'ölü ateş': 'dead-fire',
    'Ölü ateş': 'dead-fire' // Case fix,
    'ölü balık': 'dead-fish',
    'Ölü balık': 'dead-fish' // Case fix,
    'ÖLÜ BALIK': 'dead-fish' // Case fix,
    'ölü uçuş': 'dead-flying',
    'Ölü uçuş': 'dead-flying' // Case fix,
    'ölü hayalet': 'dead-ghost',
    'Ölü hayalet': 'dead-ghost' // Case fix,
    'ölü at': 'dead-horse',
    'Ölü at': 'dead-horse' // Case fix,
    'ölü ev': 'dead-house',
    'Ölü ev': 'dead-house' // Case fix,
    'ölü anahtar': 'dead-key',
    'Ölü anahtar': 'dead-key' // Case fix,
    'ölü bıçak': 'dead-knife',
    'Ölü bıçak': 'dead-knife' // Case fix,
    'ÖLÜ BIÇAK': 'dead-knife' // Case fix,
    'ölü aslan': 'dead-lion',
    'Ölü aslan': 'dead-lion' // Case fix,
    'ölü para': 'dead-money',
    'Ölü para': 'dead-money' // Case fix,
    'ölü dağ': 'dead-mountain',
    'Ölü dağ': 'dead-mountain' // Case fix,
    'ölü okyanus': 'dead-ocean',
    'Ölü okyanus': 'dead-ocean' // Case fix,
    'ölü yağmur': 'dead-rain',
    'Ölü yağmur': 'dead-rain' // Case fix,
    'ölü koşusu': 'dead-running',
    'Ölü koşusu': 'dead-running' // Case fix,
    'ölü köpekbalığı': 'dead-shark',
    'Ölü köpekbalığı': 'dead-shark' // Case fix,
    'ÖLÜ KÖPEKBALIĞI': 'dead-shark' // Case fix,
    'ölü yılan': 'dead-snake',
    'Ölü yılan': 'dead-snake' // Case fix,
    'ÖLÜ YILAN': 'dead-snake' // Case fix,
    'ölü kar': 'dead-snow',
    'Ölü kar': 'dead-snow' // Case fix,
    'ölü örümcek': 'dead-spider',
    'Ölü örümcek': 'dead-spider' // Case fix,
    'ölü merdivenler': 'dead-stairs',
    'Ölü merdivenler': 'dead-stairs' // Case fix,
    'ÖLÜ MERDIVENLER': 'dead-stairs' // Case fix,
    'ölümcül fırtına': 'dead-storm',
    'Ölümcül fırtına': 'dead-storm' // Case fix,
    'ÖLÜMCÜL FIRTINA': 'dead-storm' // Case fix,
    'ölü yüzme': 'dead-swimming',
    'Ölü yüzme': 'dead-swimming' // Case fix,
    'ölü dişlerin düşmesi': 'dead-teeth-falling-out',
    'Ölü dişlerin düşmesi': 'dead-teeth-falling-out' // Case fix,
    'ÖLÜ DIŞLERIN DÜŞMESI': 'dead-teeth-falling-out' // Case fix,
    'ölü vampir': 'dead-vampire',
    'Ölü vampir': 'dead-vampire' // Case fix,
    'ÖLÜ VAMPIR': 'dead-vampire' // Case fix,
    'ölü su': 'dead-water',
    'Ölü su': 'dead-water' // Case fix,
    'ölü düğün': 'dead-wedding',
    'Ölü düğün': 'dead-wedding' // Case fix,
    'ölü kurt': 'dead-wolf',
    'Ölü kurt': 'dead-wolf' // Case fix,
    'ölü yara': 'dead-wound',
    'Ölü yara': 'dead-wound' // Case fix,
    'ölü zombi': 'dead-zombie',
    'Ölü zombi': 'dead-zombie' // Case fix,
    'ÖLÜ ZOMBI': 'dead-zombie' // Case fix,
    'kendini savunmak': 'defending-oneself',
    'Kendini Savunmak': 'defending-oneself' // Case fix,
    'KENDINI SAVUNMAK': 'defending-oneself' // Case fix,
    'nem alma cihazı': 'dehumidifier',
    'Nem alma cihazı': 'dehumidifier' // Case fix,
    'NEM ALMA CIHAZI': 'dehumidifier' // Case fix,
    'bir şeyin “tanıdık” gelmesi ama hatırlayamamak': 'deja-vu',
    'Bir şeyin “tanıdık” gelmesi ama hatırlayamamak': 'deja-vu' // Case fix,
    'BIR ŞEYIN “TANIDIK” GELMESI AMA HATIRLAYAMAMAK': 'deja-vu' // Case fix,
    'kot ceket': 'denim-jacket',
    'Kot Ceket': 'denim-jacket' // Case fix,
    'kot şort': 'denim-shorts',
    'Kot Şort': 'denim-shorts' // Case fix,
    'ofis sandalyesi': 'desk-chair',
    'Ofis Sandalyesi': 'desk-chair' // Case fix,
    'OFIS SANDALYESI': 'desk-chair' // Case fix,
    'masa lambası': 'desk-lamp',
    'Masa Lambası': 'desk-lamp' // Case fix,
    'MASA LAMBASI': 'desk-lamp' // Case fix,
    'masa düzenleyici': 'desk-organizer',
    'Masa Düzenleyici': 'desk-organizer' // Case fix,
    'MASA DÜZENLEYICI': 'desk-organizer' // Case fix,
    'masa bitkisi': 'desk-plant',
    'Masa Bitkisi': 'desk-plant' // Case fix,
    'MASA BITKISI': 'desk-plant' // Case fix,
    'bir yerde “olman gerektiğini” bilmek ama nereye olduğunu bilmemek': 'destination-unknown',
    'Bir yerde “olman gerektiğini” bilmek ama nereye olduğunu bilmemek': 'destination-unknown' // Case fix,
    'BIR YERDE “OLMAN GEREKTIĞINI” BILMEK AMA NEREYE OLDUĞUNU BILMEMEK': 'destination-unknown' // Case fix,
    'dedektif': 'detective',
    'Dedektif': 'detective' // Case fix,
    'DEDEKTIF': 'detective' // Case fix,
    'deterjan': 'detergent',
    'Deterjan': 'detergent' // Case fix,
    'çiğ': 'dew',
    'Çiğ': 'dew' // Case fix,
    'dhole': 'dhole',
    'Dhole': 'dhole' // Case fix,
    'dhow': 'dhow',
    'Dhow': 'dhow' // Case fix,
    'diyatom': 'diatom',
    'Diyatom': 'diatom' // Case fix,
    'DIYATOM': 'diatom' // Case fix,
    'didgeridoo': 'didgeridoo',
    'Didgeridoo': 'didgeridoo' // Case fix,
    'DIDGERIDOO': 'didgeridoo' // Case fix,
    'aynada kendini farklı görmek': 'different-reflection',
    'Aynada kendini farklı görmek': 'different-reflection' // Case fix,
    'AYNADA KENDINI FARKLI GÖRMEK': 'different-reflection' // Case fix,
    'kazı yapmak': 'digging',
    'Kazı yapmak': 'digging' // Case fix,
    'KAZI YAPMAK': 'digging' // Case fix,
    'dijital asistan': 'digital-assistant',
    'Dijital Asistan': 'digital-assistant' // Case fix,
    'DIJITAL ASISTAN': 'digital-assistant' // Case fix,
    'dijital reklam panosu': 'digital-billboard',
    'Dijital Reklam Panosu': 'digital-billboard' // Case fix,
    'DIJITAL REKLAM PANOSU': 'digital-billboard' // Case fix,
    'dijital biniş kartı': 'digital-boarding-pass',
    'Dijital Biniş Kartı': 'digital-boarding-pass' // Case fix,
    'DIJITAL BINIŞ KARTI': 'digital-boarding-pass' // Case fix,
    'dijital kamera': 'digital-camera',
    'Dijital Kamera': 'digital-camera' // Case fix,
    'DIJITAL KAMERA': 'digital-camera' // Case fix,
    'dijital harita': 'digital-map',
    'Dijital Harita': 'digital-map' // Case fix,
    'DIJITAL HARITA': 'digital-map' // Case fix,
    'dijital göçebe': 'digital-nomad',
    'Dijital Göçebe': 'digital-nomad' // Case fix,
    'DIJITAL GÖÇEBE': 'digital-nomad' // Case fix,
    'dijital fotoğraf çerçevesi': 'digital-photo-frame',
    'Dijital Fotoğraf Çerçevesi': 'digital-photo-frame' // Case fix,
    'DIJITAL FOTOĞRAF ÇERÇEVESI': 'digital-photo-frame' // Case fix,
    'dijital cüzdan': 'digital-wallet',
    'Dijital Cüzdan': 'digital-wallet' // Case fix,
    'DIJITAL CÜZDAN': 'digital-wallet' // Case fix,
    'dim sum': 'dim-sum',
    'Dim Sum': 'dim-sum' // Case fix,
    'DIM SUM': 'dim-sum' // Case fix,
    'zepelin': 'dirigible',
    'Zepelin': 'dirigible' // Case fix,
    'ZEPELIN': 'dirigible' // Case fix,
    'dirndl': 'dirndl',
    'Dirndl': 'dirndl' // Case fix,
    'DIRNDL': 'dirndl' // Case fix,
    'kirli': 'dirty',
    'Kirli': 'dirty' // Case fix,
    'KIRLI': 'dirty' // Case fix,
    'gece kulübü': 'disco',
    'Gece kulübü': 'disco' // Case fix,
    'bağlantısız kalmak': 'disconnected',
    'Bağlantısız Kalmak': 'disconnected' // Case fix,
    'BAĞLANTISIZ KALMAK': 'disconnected' // Case fix,
    'unutulmuş bir yeteneği keşfetmek': 'discovering-a-forgotten-talent',
    'Unutulmuş bir yeteneği keşfetmek': 'discovering-a-forgotten-talent' // Case fix,
    'UNUTULMUŞ BIR YETENEĞI KEŞFETMEK': 'discovering-a-forgotten-talent' // Case fix,
    'tabaklık': 'dish-rack',
    'Tabaklık': 'dish-rack' // Case fix,
    'TABAKLIK': 'dish-rack' // Case fix,
    'Bulaşık makinesi': 'dishwasher' // Case fix,
    'djembe': 'djembe',
    'Djembe': 'djembe' // Case fix,
    'docksuz scooter': 'dockless-scooter',
    'Docksuz Scooter': 'dockless-scooter' // Case fix,
    'belge parçalayıcı': 'document-shredder',
    'Belge Parçalayıcı': 'document-shredder' // Case fix,
    'BELGE PARÇALAYICI': 'document-shredder' // Case fix,
    'kapının aralık kalması': 'door-ajar',
    'Kapının aralık kalması': 'door-ajar' // Case fix,
    'KAPININ ARALIK KALMASI': 'door-ajar' // Case fix,
    'kapı zili kamerası': 'doorbell-camera',
    'Kapı zili kamerası': 'doorbell-camera' // Case fix,
    'KAPI ZILI KAMERASI': 'doorbell-camera' // Case fix,
    'kapı zili': 'doorbell',
    'Kapı Zili': 'doorbell' // Case fix,
    'KAPI ZILI': 'doorbell' // Case fix,
    'i̇kiz ruh': 'doppelganger',
    'İkiz ruh': 'doppelganger' // Case fix,
    'İKIZ RUH': 'doppelganger' // Case fix,
    'i̇ndir': 'download',
    'İndir': 'download' // Case fix,
    'İNDIR': 'download' // Case fix,
    'su bulma çubuğu': 'dowsing-rod',
    'Su bulma çubuğu': 'dowsing-rod' // Case fix,
    'uçurtma': 'drachenflieger',
    'yusufçuk': 'dragonfly',
    'Yusufçuk': 'dragonfly' // Case fix,
    'ejderha meyvesi': 'dragonfruit',
    'Ejderha meyvesi': 'dragonfruit' // Case fix,
    'EJDERHA MEYVESI': 'dragonfruit' // Case fix,
    'dragoon': 'dragoon',
    'Dragoon': 'dragoon' // Case fix,
    'drakkar': 'drakkar',
    'Drakkar': 'drakkar' // Case fix,
    'çizim': 'drawing',
    'Çizim': 'drawing' // Case fix,
    'ÇIZIM': 'drawing' // Case fix,
    'rüya': 'dream',
    'Rüya': 'dream' // Case fix,
    'şifonyer': 'dresser',
    'Şifonyer': 'dresser' // Case fix,
    'ŞIFONYER': 'dresser' // Case fix,
    'giriş yolu': 'driveway',
    'Giriş yolu': 'driveway' // Case fix,
    'GIRIŞ YOLU': 'driveway' // Case fix,
    'freni olmayan bir araba sürmek': 'driving-a-car-with-no-brakes',
    'Freni olmayan bir araba sürmek': 'driving-a-car-with-no-brakes' // Case fix,
    'FRENI OLMAYAN BIR ARABA SÜRMEK': 'driving-a-car-with-no-brakes' // Case fix,
    'tek hörgüçlü develer': 'dromedary',
    'Tek hörgüçlü develer': 'dromedary' // Case fix,
    'i̇nsansız hava aracı': 'drone',
    'İnsansız Hava Aracı': 'drone' // Case fix,
    'İNSANSIZ HAVA ARACI': 'drone' // Case fix,
    'kameralı i̇nsansız hava araçları': 'drones-with-cameras',
    'Kameralı İnsansız Hava Araçları': 'drones-with-cameras' // Case fix,
    'KAMERALI İNSANSIZ HAVA ARAÇLARI': 'drones-with-cameras' // Case fix,
    'kaçışsız boğulmak': 'drowning-with-no-escape',
    'Kaçışsız Boğulmak': 'drowning-with-no-escape' // Case fix,
    'KAÇIŞSIZ BOĞULMAK': 'drowning-with-no-escape' // Case fix,
    'drumlin': 'drumlin',
    'Drumlin': 'drumlin' // Case fix,
    'DRUMLIN': 'drumlin' // Case fix,
    'geçersiz': 'dry',
    'Geçersiz': 'dry' // Case fix,
    'GEÇERSIZ': 'dry' // Case fix,
    'kurutucu': 'dryer',
    'Kurutucu': 'dryer' // Case fix,
    'çamaşır askılığı': 'drying-rack',
    'Çamaşır Askılığı': 'drying-rack' // Case fix,
    'ÇAMAŞIR ASKILIĞI': 'drying-rack' // Case fix,
    'seyahat çantası': 'duffel-bag',
    'Seyahat çantası': 'duffel-bag' // Case fix,
    'SEYAHAT ÇANTASI': 'duffel-bag' // Case fix,
    'dulzimer': 'dulcimer',
    'Dulzimer': 'dulcimer' // Case fix,
    'DULZIMER': 'dulcimer' // Case fix,
    'dünyalar': 'dunes',
    'Dünyalar': 'dunes' // Case fix,
    'durián': 'durian',
    'Durián': 'durian' // Case fix,
    'DURIÁN': 'durian' // Case fix,
    'toz': 'dust',
    'Toz': 'dust' // Case fix,
    'farş': 'dustpan',
    'Farş': 'dustpan' // Case fix,
    'cüce': 'dwarf',
    'Cüce': 'dwarf' // Case fix,
    'ölmek': 'dying',
    'Ölmek': 'dying' // Case fix,
    'elektrikli bisiklet': 'e-bike',
    'Elektrikli bisiklet': 'e-bike' // Case fix,
    'ELEKTRIKLI BISIKLET': 'e-bike' // Case fix,
    'e-kitap okuyucu': 'e-book-reader',
    'E-Kitap Okuyucu': 'e-book-reader' // Case fix,
    'E-KITAP OKUYUCU': 'e-book-reader' // Case fix,
    'e-kitap': 'e-book',
    'E-kitap': 'e-book' // Case fix,
    'E-KITAP': 'e-book' // Case fix,
    'e-toplantı': 'e-meeting',
    'E-toplantı': 'e-meeting' // Case fix,
    'E-TOPLANTI': 'e-meeting' // Case fix,
    'e-okuyucu': 'e-reader',
    'E-okuyucu': 'e-reader' // Case fix,
    'elektrikli scooter': 'e-scooter',
    'Elektrikli scooter': 'e-scooter' // Case fix,
    'ELEKTRIKLI SCOOTER': 'e-scooter' // Case fix,
    'kulaklıklar': 'earbuds',
    'Kulaklıklar': 'earbuds' // Case fix,
    'KULAKLIKLAR': 'earbuds' // Case fix,
    'küpe': 'earrings',
    'Küpe': 'earrings' // Case fix,
    'kulak misafiri olmak': 'eavesdropping',
    'Kulak Misafiri Olmak': 'eavesdropping' // Case fix,
    'KULAK MISAFIRI OLMAK': 'eavesdropping' // Case fix,
    'echidna': 'echidna',
    'Echidna': 'echidna' // Case fix,
    'ECHIDNA': 'echidna' // Case fix,
    'yankı': 'echo',
    'Yankı': 'echo' // Case fix,
    'YANKI': 'echo' // Case fix,
    'gece gündüz.': 'eclipse',
    'Gece gündüz.': 'eclipse' // Case fix,
    'edelweiss': 'edelweiss',
    'Edelweiss': 'edelweiss' // Case fix,
    'EDELWEISS': 'edelweiss' // Case fix,
    'yılanbalığı': 'eel',
    'Yılanbalığı': 'eel' // Case fix,
    'YILANBALIĞI': 'eel' // Case fix,
    'elektrikli bisiklet': 'electric-bike',
    'Elektrikli Bisiklet': 'electric-bike' // Case fix,
    'ELEKTRIKLI BISIKLET': 'electric-bike' // Case fix,
    'elektrikli battaniye': 'electric-blanket',
    'Elektrikli battaniye': 'electric-blanket' // Case fix,
    'ELEKTRIKLI BATTANIYE': 'electric-blanket' // Case fix,
    'elektrikli otobüs': 'electric-bus',
    'Elektrikli Otobüs': 'electric-bus' // Case fix,
    'ELEKTRIKLI OTOBÜS': 'electric-bus' // Case fix,
    'elektrikli araç şarj i̇stasyonu': 'electric-car-charging-station',
    'Elektrikli Araç Şarj İstasyonu': 'electric-car-charging-station' // Case fix,
    'ELEKTRIKLI ARAÇ ŞARJ İSTASYONU': 'electric-car-charging-station' // Case fix,
    'elektrikli araç': 'electric-car',
    'Elektrikli Araç': 'electric-car' // Case fix,
    'ELEKTRIKLI ARAÇ': 'electric-car' // Case fix,
    'elektrikli fan': 'electric-fan',
    'Elektrikli fan': 'electric-fan' // Case fix,
    'ELEKTRIKLI FAN': 'electric-fan' // Case fix,
    'elektrikli feribot': 'electric-ferry',
    'Elektrikli Feribot': 'electric-ferry' // Case fix,
    'ELEKTRIKLI FERIBOT': 'electric-ferry' // Case fix,
    'elektrikli izgara': 'electric-grill',
    'Elektrikli Izgara': 'electric-grill' // Case fix,
    'ELEKTRIKLI IZGARA': 'electric-grill' // Case fix,
    'elektrikli su isıtıcı': 'electric-kettle',
    'Elektrikli Su Isıtıcı': 'electric-kettle' // Case fix,
    'ELEKTRIKLI SU ISITICI': 'electric-kettle' // Case fix,
    'elektrikli motosiklet': 'electric-motorcycle',
    'Elektrikli motosiklet': 'electric-motorcycle' // Case fix,
    'ELEKTRIKLI MOTOSIKLET': 'electric-motorcycle' // Case fix,
    'elektrikli rickshaw': 'electric-rickshaw',
    'Elektrikli Rickshaw': 'electric-rickshaw' // Case fix,
    'ELEKTRIKLI RICKSHAW': 'electric-rickshaw' // Case fix,
    'elektrikli scooter': 'electric-scooter',
    'Elektrikli Scooter': 'electric-scooter' // Case fix,
    'ELEKTRIKLI SCOOTER': 'electric-scooter' // Case fix,
    'elektrikli kaykay': 'electric-skateboard',
    'Elektrikli Kaykay': 'electric-skateboard' // Case fix,
    'ELEKTRIKLI KAYKAY': 'electric-skateboard' // Case fix,
    'elektrikli diş fırçası': 'electric-toothbrush',
    'Elektrikli Diş Fırçası': 'electric-toothbrush' // Case fix,
    'ELEKTRIKLI DIŞ FIRÇASI': 'electric-toothbrush' // Case fix,
    'elektrikli tramvay': 'electric-tram',
    'Elektrikli Tramvay': 'electric-tram' // Case fix,
    'ELEKTRIKLI TRAMVAY': 'electric-tram' // Case fix,
    'elektrikli tek tekerlekli bisiklet': 'electric-unicycle',
    'Elektrikli Tek Tekerlekli Bisiklet': 'electric-unicycle' // Case fix,
    'ELEKTRIKLI TEK TEKERLEKLI BISIKLET': 'electric-unicycle' // Case fix,
    'elektrikli tekerlekli sandalye': 'electric-wheelchair',
    'Elektrikli Tekerlekli Sandalye': 'electric-wheelchair' // Case fix,
    'ELEKTRIKLI TEKERLEKLI SANDALYE': 'electric-wheelchair' // Case fix,
    'geviş getiren': 'elk',
    'Geviş getiren': 'elk' // Case fix,
    'GEVIŞ GETIREN': 'elk' // Case fix,
    'e-posta eki': 'email-attachment',
    'E-posta Eki': 'email-attachment' // Case fix,
    'E-POSTA EKI': 'email-attachment' // Case fix,
    'e-posta bildirimi': 'email-notification',
    'E-posta Bildirimi': 'email-notification' // Case fix,
    'E-POSTA BILDIRIMI': 'email-notification' // Case fix,
    'e-posta': 'email',
    'E-posta': 'email' // Case fix,
    'emisyon-free bölge': 'emissions-free-zone',
    'Emisyon-free Bölge': 'emissions-free-zone' // Case fix,
    'EMISYON-FREE BÖLGE': 'emissions-free-zone' // Case fix,
    'emoji': 'emoji',
    'Emoji': 'emoji' // Case fix,
    'EMOJI': 'emoji' // Case fix,
    'boş bir oda': 'empty-room',
    'Boş bir oda': 'empty-room' // Case fix,
    'BOŞ BIR ODA': 'empty-room' // Case fix,
    'emu': 'emu',
    'Emu': 'emu' // Case fix,
    'sonsuz çıkışı olmayan koridor': 'endless-hallway-with-no-exit',
    'Sonsuz çıkışı olmayan koridor': 'endless-hallway-with-no-exit' // Case fix,
    'SONSUZ ÇIKIŞI OLMAYAN KORIDOR': 'endless-hallway-with-no-exit' // Case fix,
    'sürekli aynı yere dönmek': 'endless-loop',
    'Sürekli aynı yere dönmek': 'endless-loop' // Case fix,
    'SÜREKLI AYNI YERE DÖNMEK': 'endless-loop' // Case fix,
    'kaybolmuş bir şeyi sonsuz arayış': 'endless-search-for-something-lost',
    'Kaybolmuş bir şeyi sonsuz arayış': 'endless-search-for-something-lost' // Case fix,
    'KAYBOLMUŞ BIR ŞEYI SONSUZ ARAYIŞ': 'endless-search-for-something-lost' // Case fix,
    'sonsuz merdiven': 'endless-staircase',
    'Sonsuz Merdiven': 'endless-staircase' // Case fix,
    'SONSUZ MERDIVEN': 'endless-staircase' // Case fix,
    'tünelin sonunu görememek': 'endless-tunnel',
    'Tünelin sonunu görememek': 'endless-tunnel' // Case fix,
    'TÜNELIN SONUNU GÖREMEMEK': 'endless-tunnel' // Case fix,
    'sonsuzca kaybolmuş bir şeyi aramak': 'endlessly-searching-for-something-lost',
    'Sonsuzca kaybolmuş bir şeyi aramak': 'endlessly-searching-for-something-lost' // Case fix,
    'SONSUZCA KAYBOLMUŞ BIR ŞEYI ARAMAK': 'endlessly-searching-for-something-lost' // Case fix,
    'enerji i̇çeceği': 'energy-drink',
    'Enerji İçeceği': 'energy-drink' // Case fix,
    'ENERJI İÇECEĞI': 'energy-drink' // Case fix,
    'kayıt olmak': 'enrolling',
    'Kayıt Olmak': 'enrolling' // Case fix,
    'KAYIT OLMAK': 'enrolling' // Case fix,
    'entomolog': 'ent',
    'Entomolog': 'ent' // Case fix,
    'entablature -> entablatur': 'entablature',
    'Entablature -> Entablatur': 'entablature' // Case fix,
    'kılıç': 'epee',
    'KILIÇ': 'epee' // Case fix,
    'epergne': 'epergne',
    'Epergne': 'epergne' // Case fix,
    'geçici şeyler': 'ephemera',
    'Geçici şeyler': 'ephemera' // Case fix,
    'GEÇICI ŞEYLER': 'ephemera' // Case fix,
    'silmek': 'erasing',
    'Silmek': 'erasing' // Case fix,
    'SILMEK': 'erasing' // Case fix,
    'ergonomik mousepad': 'ergonomic-mousepad',
    'Ergonomik Mousepad': 'ergonomic-mousepad' // Case fix,
    'ERGONOMIK MOUSEPAD': 'ergonomic-mousepad' // Case fix,
    'erhu': 'erhu',
    'Erhu': 'erhu' // Case fix,
    'acelesiyle bir durumdan kaçmak': 'escaping-from-a-situation-with-urgency',
    'Acelesiyle bir durumdan kaçmak': 'escaping-from-a-situation-with-urgency' // Case fix,
    'ACELESIYLE BIR DURUMDAN KAÇMAK': 'escaping-from-a-situation-with-urgency' // Case fix,
    'hapisten kaçmak': 'escaping-jail',
    'Hapisten Kaçmak': 'escaping-jail' // Case fix,
    'HAPISTEN KAÇMAK': 'escaping-jail' // Case fix,
    'espresso makinesi': 'espresso-machine',
    'Espresso Makinesi': 'espresso-machine' // Case fix,
    'ESPRESSO MAKINESI': 'espresso-machine' // Case fix,
    'espresso shot': 'espresso-shot',
    'Espresso shot': 'espresso-shot' // Case fix,
    'espresso': 'espresso',
    'Espresso': 'espresso' // Case fix,
    'etrüsk vazosu': 'etruscan-vase',
    'Etrüsk Vazosu': 'etruscan-vase' // Case fix,
    'eufonyum': 'euphonium',
    'Eufonyum': 'euphonium' // Case fix,
    'ev şarj cihazı': 'ev-charger',
    'EV Şarj Cihazı': 'ev-charger' // Case fix,
    'EV ŞARJ CIHAZI': 'ev-charger' // Case fix,
    'etkinlik davetiyesi': 'event-invitation',
    'Etkinlik Davetiyesi': 'event-invitation' // Case fix,
    'ETKINLIK DAVETIYESI': 'event-invitation' // Case fix,
    'üstün başarı': 'excelling',
    'Üstün Başarı': 'excelling' // Case fix,
    'ÜSTÜN BAŞARI': 'excelling' // Case fix,
    'zamanın geri gittiğini hissetmek': 'experiencing-time-moving-backwards',
    'Zamanın geri gittiğini hissetmek': 'experiencing-time-moving-backwards' // Case fix,
    'ZAMANIN GERI GITTIĞINI HISSETMEK': 'experiencing-time-moving-backwards' // Case fix,
    'deney yapmak': 'experimenting',
    'Deney Yapmak': 'experimenting' // Case fix,
    'keşfetmek': 'exploring',
    'Keşfetmek': 'exploring' // Case fix,
    'saklanmak ama saklandığın yerin açıkta kalması': 'exposed-hiding',
    'Saklanmak ama saklandığın yerin açıkta kalması': 'exposed-hiding' // Case fix,
    'SAKLANMAK AMA SAKLANDIĞIN YERIN AÇIKTA KALMASI': 'exposed-hiding' // Case fix,
    'açığa çıkarmak': 'exposing',
    'Açığa Çıkarmak': 'exposing' // Case fix,
    'AÇIĞA ÇIKARMAK': 'exposing' // Case fix,
    'uzatma kablosu': 'extension-cord',
    'Uzatma Kablosu': 'extension-cord' // Case fix,
    'yüzünün bozulması': 'face-distorting',
    'Yüzünün bozulması': 'face-distorting' // Case fix,
    'YÜZÜNÜN BOZULMASI': 'face-distorting' // Case fix,
    'yüz maskesi': 'face-mask',
    'Yüz Maskesi': 'face-mask' // Case fix,
    'YÜZ MASKESI': 'face-mask' // Case fix,
    'yüzsüz insanların seninle iletişim kurması': 'faceless-people-communicating-with-you',
    'Yüzsüz insanların seninle iletişim kurması': 'faceless-people-communicating-with-you' // Case fix,
    'YÜZSÜZ INSANLARIN SENINLE ILETIŞIM KURMASI': 'faceless-people-communicating-with-you' // Case fix,
    'yüzü olmayan insan': 'faceless-person',
    'Yüzü olmayan insan': 'faceless-person' // Case fix,
    'YÜZÜ OLMAYAN INSAN': 'faceless-person' // Case fix,
    'önemli bir şeyi hatırlayamamak': 'failing-to-remember-something-crucial',
    'Önemli bir şeyi hatırlayamamak': 'failing-to-remember-something-crucial' // Case fix,
    'ÖNEMLI BIR ŞEYI HATIRLAYAMAMAK': 'failing-to-remember-something-crucial' // Case fix,
    'falafel': 'falafel',
    'Falafel': 'falafel' // Case fix,
    'şahin': 'falcon',
    'Şahin': 'falcon' // Case fix,
    'ŞAHIN': 'falcon' // Case fix,
    'sonsuzca düşmek': 'falling-endlessly',
    'Sonsuzca Düşmek': 'falling-endlessly' // Case fix,
    'büyük bir yükseklikten düşmek': 'falling-from-a-great-height',
    'Büyük bir yükseklikten düşmek': 'falling-from-a-great-height' // Case fix,
    'BÜYÜK BIR YÜKSEKLIKTEN DÜŞMEK': 'falling-from-a-great-height' // Case fix,
    'düşmek ama yere çarpmamak': 'falling-no-impact',
    'Düşmek ama yere çarpmamak': 'falling-no-impact' // Case fix,
    'bel çantası': 'fanny-pack',
    'Bel çantası': 'fanny-pack' // Case fix,
    'BEL ÇANTASI': 'fanny-pack' // Case fix,
    'oruç tutmak': 'fasting',
    'Oruç Tutmak': 'fasting' // Case fix,
    'kader': 'fate',
    'Kader': 'fate' // Case fix,
    'faks makinesi': 'fax-machine',
    'Faks Makinesi': 'fax-machine' // Case fix,
    'FAKS MAKINESI': 'fax-machine' // Case fix,
    'ağırlıksızlık hissi': 'feeling-of-weightlessness',
    'Ağırlıksızlık hissi': 'feeling-of-weightlessness' // Case fix,
    'AĞIRLIKSIZLIK HISSI': 'feeling-of-weightlessness' // Case fix,
    'takip ediliyormuş gibi hissetmek ama peşinden koşulmamak': 'feeling-pursued-but-not-chased',
    'Takip ediliyormuş gibi hissetmek ama peşinden koşulmamak': 'feeling-pursued-but-not-chased' // Case fix,
    'TAKIP EDILIYORMUŞ GIBI HISSETMEK AMA PEŞINDEN KOŞULMAMAK': 'feeling-pursued-but-not-chased' // Case fix,
    'çit': 'fence',
    'Çit': 'fence' // Case fix,
    'ÇIT': 'fence' // Case fix,
    'fennek': 'fennec',
    'Fennek': 'fennec' // Case fix,
    'fenrir': 'fenrir',
    'Fenrir': 'fenrir' // Case fix,
    'FENRIR': 'fenrir' // Case fix,
    'fermente kombucha': 'fermented-kombucha',
    'Fermente Kombucha': 'fermented-kombucha' // Case fix,
    'alan': 'field',
    'Alan': 'field' // Case fix,
    'i̇ncir': 'fig',
    'İncir': 'fig' // Case fix,
    'İNCIR': 'fig' // Case fix,
    'dosya dolabı': 'file-cabinet',
    'Dosya Dolabı': 'file-cabinet' // Case fix,
    'DOSYA DOLABI': 'file-cabinet' // Case fix,
    'dosya yükleme': 'file-upload',
    'Dosya Yükleme': 'file-upload' // Case fix,
    'evde yeni bir oda bulmak': 'finding-a-new-room-in-house',
    'Evde yeni bir oda bulmak': 'finding-a-new-room-in-house' // Case fix,
    'EVDE YENI BIR ODA BULMAK': 'finding-a-new-room-in-house' // Case fix,
    'para bulmak': 'finding-money',
    'Para Bulmak': 'finding-money' // Case fix,
    'hiçbir yerde bulmak': 'finding-yourself-in-the-middle-of-nowhere',
    'Hiçbir yerde bulmak': 'finding-yourself-in-the-middle-of-nowhere' // Case fix,
    'HIÇBIR YERDE BULMAK': 'finding-yourself-in-the-middle-of-nowhere' // Case fix,
    'süsleme': 'finial',
    'Süsleme': 'finial' // Case fix,
    'ateş merdiveni': 'fire-escape',
    'Ateş merdiveni': 'fire-escape' // Case fix,
    'ATEŞ MERDIVENI': 'fire-escape' // Case fix,
    'su vanası': 'fire-hydrant',
    'Su vanası': 'fire-hydrant' // Case fix,
    'SU VANASI': 'fire-hydrant' // Case fix,
    'fitness uygulaması': 'fitness-app',
    'Fitness Uygulaması': 'fitness-app' // Case fix,
    'FITNESS UYGULAMASI': 'fitness-app' // Case fix,
    'fitness takibi': 'fitness-tracker',
    'Fitness Takibi': 'fitness-tracker' // Case fix,
    'FITNESS TAKIBI': 'fitness-tracker' // Case fix,
    'fiyort': 'fjord',
    'Fiyort': 'fjord' // Case fix,
    'FIYORT': 'fjord' // Case fix,
    'bayrak': 'flag',
    'Bayrak': 'flag' // Case fix,
    'flambé': 'flambé',
    'Flambé': 'flambé' // Case fix,
    'ateş püskürtücü': 'flamethrower',
    'Ateş püskürtücü': 'flamethrower' // Case fix,
    'düz şapka': 'flat-cap',
    'Düz Şapka': 'flat-cap' // Case fix,
    'yerden yukarıda süzülmek': 'floating-above-the-ground',
    'Yerden yukarıda süzülmek': 'floating-above-the-ground' // Case fix,
    'YERDEN YUKARIDA SÜZÜLMEK': 'floating-above-the-ground' // Case fix,
    'yüzen': 'floating',
    'Yüzen': 'floating' // Case fix,
    'zemin': 'floor',
    'Zemin': 'floor' // Case fix,
    'ZEMIN': 'floor' // Case fix,
    'çiçek vazosu': 'flower-vase',
    'Çiçek Vazosu': 'flower-vase' // Case fix,
    'ÇIÇEK VAZOSU': 'flower-vase' // Case fix,
    'saksı': 'flowerpot',
    'Saksı': 'flowerpot' // Case fix,
    'SAKSI': 'flowerpot' // Case fix,
    'flügelhorn': 'flugelhorn',
    'Flügelhorn': 'flugelhorn' // Case fix,
    'uçan melek': 'flying-angel',
    'Uçan melek': 'flying-angel' // Case fix,
    'uçan bebek': 'flying-baby',
    'Uçan bebek': 'flying-baby' // Case fix,
    'uçan ayı': 'flying-bear',
    'Uçan ayı': 'flying-bear' // Case fix,
    'UÇAN AYI': 'flying-bear' // Case fix,
    'uçan kuş': 'flying-bird',
    'Uçan kuş': 'flying-bird' // Case fix,
    'uçan kan': 'flying-blood',
    'Uçan kan': 'flying-blood' // Case fix,
    'uçan köprü': 'flying-bridge',
    'Uçan köprü': 'flying-bridge' // Case fix,
    'uçan araba': 'flying-car',
    'Uçan araba': 'flying-car' // Case fix,
    'uçan kedi': 'flying-cat',
    'Uçan kedi': 'flying-cat' // Case fix,
    'UÇAN KEDI': 'flying-cat' // Case fix,
    'uçarken ağlamak': 'flying-crying',
    'Uçarken ağlamak': 'flying-crying' // Case fix,
    'uçan dans': 'flying-dancing',
    'Uçan dans': 'flying-dancing' // Case fix,
    'uçan ölüm': 'flying-death',
    'Uçan ölüm': 'flying-death' // Case fix,
    'uçan demon': 'flying-demon',
    'Uçan demon': 'flying-demon' // Case fix,
    'uçan köpek': 'flying-dog',
    'Uçan köpek': 'flying-dog' // Case fix,
    'uçan kapı': 'flying-door',
    'Uçan kapı': 'flying-door' // Case fix,
    'UÇAN KAPI': 'flying-door' // Case fix,
    'uçan ejderha': 'flying-dragon',
    'Uçan ejderha': 'flying-dragon' // Case fix,
    'uçan fil': 'flying-elephant',
    'Uçan fil': 'flying-elephant' // Case fix,
    'UÇAN FIL': 'flying-elephant' // Case fix,
    'uçan savaşma': 'flying-fighting',
    'Uçan savaşma': 'flying-fighting' // Case fix,
    'uçan ateş': 'flying-fire',
    'Uçan ateş': 'flying-fire' // Case fix,
    'uçan balık': 'flying-fish',
    'Uçan balık': 'flying-fish' // Case fix,
    'UÇAN BALIK': 'flying-fish' // Case fix,
    'uçan hayalet': 'flying-ghost',
    'Uçan hayalet': 'flying-ghost' // Case fix,
    'uçan at': 'flying-horse',
    'Uçan at': 'flying-horse' // Case fix,
    'uçan ev': 'flying-house',
    'Uçan ev': 'flying-house' // Case fix,
    'uçan anahtar': 'flying-key',
    'Uçan anahtar': 'flying-key' // Case fix,
    'uçan bıçak': 'flying-knife',
    'Uçan bıçak': 'flying-knife' // Case fix,
    'UÇAN BIÇAK': 'flying-knife' // Case fix,
    'uçan aslan': 'flying-lion',
    'Uçan aslan': 'flying-lion' // Case fix,
    'uçan para': 'flying-money',
    'Uçan para': 'flying-money' // Case fix,
    'uçan dağ': 'flying-mountain',
    'Uçan dağ': 'flying-mountain' // Case fix,
    'uçan okyanus': 'flying-ocean',
    'Uçan okyanus': 'flying-ocean' // Case fix,
    'uçan yağmur': 'flying-rain',
    'Uçan yağmur': 'flying-rain' // Case fix,
    'uçan koşma': 'flying-running',
    'Uçan koşma': 'flying-running' // Case fix,
    'uçan köpek balığı': 'flying-shark',
    'Uçan köpek balığı': 'flying-shark' // Case fix,
    'UÇAN KÖPEK BALIĞI': 'flying-shark' // Case fix,
    'uçan yılan': 'flying-snake',
    'Uçan yılan': 'flying-snake' // Case fix,
    'UÇAN YILAN': 'flying-snake' // Case fix,
    'uçan kar': 'flying-snow',
    'Uçan kar': 'flying-snow' // Case fix,
    'uçan örümcek': 'flying-spider',
    'Uçan örümcek': 'flying-spider' // Case fix,
    'uçan merdivenler': 'flying-stairs',
    'Uçan merdivenler': 'flying-stairs' // Case fix,
    'UÇAN MERDIVENLER': 'flying-stairs' // Case fix,
    'uçan fırtına': 'flying-storm',
    'Uçan fırtına': 'flying-storm' // Case fix,
    'UÇAN FIRTINA': 'flying-storm' // Case fix,
    'uçan yüzme': 'flying-swimming',
    'Uçan yüzme': 'flying-swimming' // Case fix,
    'uçan dişlerin düşmesi': 'flying-teeth-falling-out',
    'Uçan dişlerin düşmesi': 'flying-teeth-falling-out' // Case fix,
    'UÇAN DIŞLERIN DÜŞMESI': 'flying-teeth-falling-out' // Case fix,
    'uçan vampir': 'flying-vampire',
    'Uçan vampir': 'flying-vampire' // Case fix,
    'UÇAN VAMPIR': 'flying-vampire' // Case fix,
    'uçan su': 'flying-water',
    'Uçan su': 'flying-water' // Case fix,
    'uçan düğün': 'flying-wedding',
    'Uçan düğün': 'flying-wedding' // Case fix,
    'kanatsız uçmak': 'flying-without-wings',
    'Kanatsız Uçmak': 'flying-without-wings' // Case fix,
    'KANATSIZ UÇMAK': 'flying-without-wings' // Case fix,
    'uçan kurt': 'flying-wolf',
    'Uçan kurt': 'flying-wolf' // Case fix,
    'uçan yara': 'flying-wound',
    'Uçan yara': 'flying-wound' // Case fix,
    'uçan zombi': 'flying-zombie',
    'Uçan zombi': 'flying-zombie' // Case fix,
    'UÇAN ZOMBI': 'flying-zombie' // Case fix,
    'invalid': 'foliot',
    'INVALID': 'foliot' // Case fix,
    'takip bildirimi': 'follow-notification',
    'Takip Bildirimi': 'follow-notification' // Case fix,
    'TAKIP BILDIRIMI': 'follow-notification' // Case fix,
    'takipçi': 'follower',
    'Takipçi': 'follower' // Case fix,
    'TAKIPÇI': 'follower' // Case fix,
    'yiyecek teslimatı': 'food-delivery',
    'Yiyecek Teslimatı': 'food-delivery' // Case fix,
    'YIYECEK TESLIMATI': 'food-delivery' // Case fix,
    'mutfak robotu': 'food-processor',
    'Mutfak robotu': 'food-processor' // Case fix,
    'yiyecek tırı': 'food-truck',
    'Yiyecek Tırı': 'food-truck' // Case fix,
    'YIYECEK TIRI': 'food-truck' // Case fix,
    'tabure': 'footstool',
    'Tabure': 'footstool' // Case fix,
    'yürümeyi unuttuğunu hissetmek': 'forgetting-how-to-walk',
    'Yürümeyi unuttuğunu hissetmek': 'forgetting-how-to-walk' // Case fix,
    'YÜRÜMEYI UNUTTUĞUNU HISSETMEK': 'forgetting-how-to-walk' // Case fix,
    'unutmak': 'forgetting',
    'Unutmak': 'forgetting' // Case fix,
    'affetmek': 'forgiving',
    'Affetmek': 'forgiving' // Case fix,
    'unutulmuş kimlik': 'forgotten-identity',
    'Unutulmuş kimlik': 'forgotten-identity' // Case fix,
    'UNUTULMUŞ KIMLIK': 'forgotten-identity' // Case fix,
    'fossa': 'fossa',
    'Fossa': 'fossa' // Case fix,
    'fıskiye': 'fountain',
    'Fıskiye': 'fountain' // Case fix,
    'FISKIYE': 'fountain' // Case fix,
    'dört': 'four',
    'Dört': 'four' // Case fix,
    'dondurucu': 'freezer',
    'Dondurucu': 'freezer' // Case fix,
    'donma': 'freezing',
    'Donma': 'freezing' // Case fix,
    'fresk': 'fresco',
    'Fresk': 'fresco' // Case fix,
    'taze': 'fresh',
    'Taze': 'fresh' // Case fix,
    'fresnel': 'fresnel',
    'Fresnel': 'fresnel' // Case fix,
    'fretwork: süsleme': 'fretwork',
    'Fretwork: Süsleme': 'fretwork' // Case fix,
    'arkadaşlık i̇steği': 'friend-request',
    'Arkadaşlık İsteği': 'friend-request' // Case fix,
    'ARKADAŞLIK İSTEĞI': 'friend-request' // Case fix,
    'donma': 'frost',
    'Donma': 'frost' // Case fix,
    'dondurulmuş yoğurt': 'frozen-yogurt',
    'Dondurulmuş Yoğurt': 'frozen-yogurt' // Case fix,
    'meyve kasesi': 'fruit-bowl',
    'Meyve Kasesi': 'fruit-bowl' // Case fix,
    'MEYVE KASESI': 'fruit-bowl' // Case fix,
    'fuşya': 'fuchsia',
    'Fuşya': 'fuchsia' // Case fix,
    'fugu': 'fugu',
    'Fugu': 'fugu' // Case fix,
    'fujara': 'fujara',
    'Fujara': 'fujara' // Case fix,
    'gelecek': 'future',
    'Gelecek': 'future' // Case fix,
    'gelecekçi̇': 'futuristic',
    'GELECEKÇİ': 'futuristic' // Case fix,
    'galaksi': 'galaxy',
    'Galaksi': 'galaxy' // Case fix,
    'GALAKSI': 'galaxy' // Case fix,
    'galyon': 'galleon',
    'Galyon': 'galleon' // Case fix,
    'gemi mutfağı': 'galley',
    'Gemi mutfağı': 'galley' // Case fix,
    'GEMI MUTFAĞI': 'galley' // Case fix,
    'gambrel': 'gambrel',
    'Gambrel': 'gambrel' // Case fix,
    'gamelan': 'gamelan',
    'Gamelan': 'gamelan' // Case fix,
    'Oyuncu': 'gamer' // Case fix,
    'garaj': 'garage',
    'Garaj': 'garage' // Case fix,
    'gargoyle': 'gargoyle',
    'Gargoyle': 'gargoyle' // Case fix,
    'gazanya': 'gazania',
    'Gazanya': 'gazania' // Case fix,
    'sedir': 'gazebo',
    'Sedir': 'gazebo' // Case fix,
    'SEDIR': 'gazebo' // Case fix,
    'Ceylan': 'gazelle' // Case fix,
    'geko': 'gecko',
    'Geko': 'gecko' // Case fix,
    'jeode': 'geode',
    'Jeode': 'geode' // Case fix,
    'geodezik': 'geodesic',
    'Geodezik': 'geodesic' // Case fix,
    'GEODEZIK': 'geodesic' // Case fix,
    'geoduck': 'geoduck',
    'Geoduck': 'geoduck' // Case fix,
    'gharial': 'gharial',
    'Gharial': 'gharial' // Case fix,
    'GHARIAL': 'gharial' // Case fix,
    'hayaletleme': 'ghosting',
    'Hayaletleme': 'ghosting' // Case fix,
    'dev melek': 'giant-angel',
    'Dev melek': 'giant-angel' // Case fix,
    'dev bebek': 'giant-baby',
    'Dev bebek': 'giant-baby' // Case fix,
    'dev ayı': 'giant-bear',
    'Dev ayı': 'giant-bear' // Case fix,
    'DEV AYI': 'giant-bear' // Case fix,
    'dev kuş': 'giant-bird',
    'Dev kuş': 'giant-bird' // Case fix,
    'dev kan': 'giant-blood',
    'Dev kan': 'giant-blood' // Case fix,
    'dev köprü': 'giant-bridge',
    'Dev köprü': 'giant-bridge' // Case fix,
    'araba dev': 'giant-car',
    'Araba dev': 'giant-car' // Case fix,
    'dev kedi': 'giant-cat',
    'Dev kedi': 'giant-cat' // Case fix,
    'DEV KEDI': 'giant-cat' // Case fix,
    'dev ağlamak': 'giant-crying',
    'Dev ağlamak': 'giant-crying' // Case fix,
    'dev dans etmek': 'giant-dancing',
    'Dev dans etmek': 'giant-dancing' // Case fix,
    'dev ölüm': 'giant-death',
    'Dev ölüm': 'giant-death' // Case fix,
    'geçi̇ci̇ canavar': 'giant-demon',
    'GEÇİCİ CANAVAR': 'giant-demon' // Case fix,
    'dev köpek': 'giant-dog',
    'Dev köpek': 'giant-dog' // Case fix,
    'dev kapı': 'giant-door',
    'Dev kapı': 'giant-door' // Case fix,
    'DEV KAPI': 'giant-door' // Case fix,
    'dev ejderha': 'giant-dragon',
    'Dev ejderha': 'giant-dragon' // Case fix,
    'dev fil': 'giant-elephant',
    'Dev fil': 'giant-elephant' // Case fix,
    'DEV FIL': 'giant-elephant' // Case fix,
    'dev dövüşü': 'giant-fighting',
    'Dev dövüşü': 'giant-fighting' // Case fix,
    'dev ateş': 'giant-fire',
    'Dev ateş': 'giant-fire' // Case fix,
    'dev balık': 'giant-fish',
    'Dev balık': 'giant-fish' // Case fix,
    'DEV BALIK': 'giant-fish' // Case fix,
    'dev uçan': 'giant-flying',
    'Dev uçan': 'giant-flying' // Case fix,
    'dev hayalet': 'giant-ghost',
    'Dev hayalet': 'giant-ghost' // Case fix,
    'dev at': 'giant-horse',
    'Dev at': 'giant-horse' // Case fix,
    'dev ev': 'giant-house',
    'Dev ev': 'giant-house' // Case fix,
    'dev anahtar': 'giant-key',
    'Dev anahtar': 'giant-key' // Case fix,
    'dev bıçak': 'giant-knife',
    'Dev bıçak': 'giant-knife' // Case fix,
    'DEV BIÇAK': 'giant-knife' // Case fix,
    'dev aslan': 'giant-lion',
    'Dev aslan': 'giant-lion' // Case fix,
    'dev para': 'giant-money',
    'Dev para': 'giant-money' // Case fix,
    'dev dağ': 'giant-mountain',
    'Dev dağ': 'giant-mountain' // Case fix,
    'dev okyanus': 'giant-ocean',
    'Dev okyanus': 'giant-ocean' // Case fix,
    'dev yağmur': 'giant-rain',
    'Dev yağmur': 'giant-rain' // Case fix,
    'dev koşu': 'giant-running',
    'Dev koşu': 'giant-running' // Case fix,
    'dev köpekbalığı': 'giant-shark',
    'Dev köpekbalığı': 'giant-shark' // Case fix,
    'DEV KÖPEKBALIĞI': 'giant-shark' // Case fix,
    'yılan.': 'giant-snake',
    'Yılan.': 'giant-snake' // Case fix,
    'YILAN.': 'giant-snake' // Case fix,
    'dev kar.': 'giant-snow',
    'Dev kar.': 'giant-snow' // Case fix,
    'dev örümcek': 'giant-spider',
    'Dev örümcek': 'giant-spider' // Case fix,
    'dev merdivenler': 'giant-stairs',
    'Dev merdivenler': 'giant-stairs' // Case fix,
    'DEV MERDIVENLER': 'giant-stairs' // Case fix,
    'dev fırtına': 'giant-storm',
    'Dev fırtına': 'giant-storm' // Case fix,
    'DEV FIRTINA': 'giant-storm' // Case fix,
    'dev yüzme': 'giant-swimming',
    'Dev yüzme': 'giant-swimming' // Case fix,
    'dev dişlerin düşmesi': 'giant-teeth-falling-out',
    'Dev dişlerin düşmesi': 'giant-teeth-falling-out' // Case fix,
    'DEV DIŞLERIN DÜŞMESI': 'giant-teeth-falling-out' // Case fix,
    'dev vampir': 'giant-vampire',
    'Dev vampir': 'giant-vampire' // Case fix,
    'DEV VAMPIR': 'giant-vampire' // Case fix,
    'dev su': 'giant-water',
    'Dev su': 'giant-water' // Case fix,
    'dev düğün': 'giant-wedding',
    'Dev düğün': 'giant-wedding' // Case fix,
    'dev kurt': 'giant-wolf',
    'Dev kurt': 'giant-wolf' // Case fix,
    'dev yara': 'giant-wound',
    'Dev yara': 'giant-wound' // Case fix,
    'dev zombi': 'giant-zombie',
    'Dev Zombi': 'giant-zombie' // Case fix,
    'DEV ZOMBI': 'giant-zombie' // Case fix,
    'gibonlar': 'gibbons',
    'Gibonlar': 'gibbons' // Case fix,
    'GIBONLAR': 'gibbons' // Case fix,
    'denge aparatı': 'gimbal',
    'Denge aparatı': 'gimbal' // Case fix,
    'DENGE APARATI': 'gimbal' // Case fix,
    'gimlet': 'gimlet',
    'Gimlet': 'gimlet' // Case fix,
    'GIMLET': 'gimlet' // Case fix,
    'ginkgo': 'gingko',
    'Ginkgo': 'gingko' // Case fix,
    'GINKGO': 'gingko' // Case fix,
    'ginkgo': 'ginkgo',
    'Ginkgo': 'ginkgo' // Case fix,
    'GINKGO': 'ginkgo' // Case fix,
    'hediye vermek': 'giving-a-gift',
    'Hediye Vermek': 'giving-a-gift' // Case fix,
    'HEDIYE VERMEK': 'giving-a-gift' // Case fix,
    'buzul': 'glacier',
    'Buzul': 'glacier' // Case fix,
    'gladyatör çiçeği': 'gladiolus',
    'Gladyatör çiçeği': 'gladiolus' // Case fix,
    'GLADYATÖR ÇIÇEĞI': 'gladiolus' // Case fix,
    'geçişli ses': 'glissando',
    'Geçişli ses': 'glissando' // Case fix,
    'GEÇIŞLI SES': 'glissando' // Case fix,
    'kılıçbalığı': 'globefish',
    'Kılıçbalığı': 'globefish' // Case fix,
    'KILIÇBALIĞI': 'globefish' // Case fix,
    'çanakkale': 'glockenspiel',
    'Çanakkale': 'glockenspiel' // Case fix,
    'işıldayan': 'glowing',
    'Işıldayan': 'glowing' // Case fix,
    'IŞILDAYAN': 'glowing' // Case fix,
    'glutensiz ekmek': 'gluten-free-bread',
    'Glutensiz Ekmek': 'gluten-free-bread' // Case fix,
    'GLUTENSIZ EKMEK': 'gluten-free-bread' // Case fix,
    'kadeh': 'goblet',
    'Kadeh': 'goblet' // Case fix,
    'gece yarısı canavarı': 'golem',
    'Gece yarısı canavarı': 'golem' // Case fix,
    'GECE YARISI CANAVARI': 'golem' // Case fix,
    'gondol': 'gondola',
    'Gondol': 'gondola' // Case fix,
    'çan': 'gong',
    'Çan': 'gong' // Case fix,
    'gorgon': 'gorgon',
    'Gorgon': 'gorgon' // Case fix,
    'gorgonzola': 'gorgonzola',
    'Gorgonzola': 'gorgonzola' // Case fix,
    'goril': 'gorilla',
    'Goril': 'gorilla' // Case fix,
    'GORIL': 'gorilla' // Case fix,
    'gurme burger': 'gourmet-burger',
    'Gurme Burger': 'gourmet-burger' // Case fix,
    'gurme patlamış mısır': 'gourmet-popcorn',
    'Gurme Patlamış Mısır': 'gourmet-popcorn' // Case fix,
    'GURME PATLAMIŞ MISIR': 'gourmet-popcorn' // Case fix,
    'gps navigasyon': 'gps-navigation',
    'GPS Navigasyon': 'gps-navigation' // Case fix,
    'GPS NAVIGASYON': 'gps-navigation' // Case fix,
    'mezun olmak': 'graduating',
    'Mezun Olmak': 'graduating' // Case fix,
    'grafiti': 'graffiti',
    'Grafiti': 'graffiti' // Case fix,
    'GRAFITI': 'graffiti' // Case fix,
    'kutsal kase': 'grail',
    'Kutsal Kase': 'grail' // Case fix,
    'granola bar': 'granola-bar',
    'Granola Bar': 'granola-bar' // Case fix,
    'grafik tişört': 'graphic-t-shirt',
    'Grafik tişört': 'graphic-t-shirt' // Case fix,
    'GRAFIK TIŞÖRT': 'graphic-t-shirt' // Case fix,
    'sıçanbacak': 'grasshopper',
    'Sıçanbacak': 'grasshopper' // Case fix,
    'SIÇANBACAK': 'grasshopper' // Case fix,
    'yerçekiminin seni yukarı çekmesi': 'gravity-pulling-you-upwards',
    'Yerçekiminin seni yukarı çekmesi': 'gravity-pulling-you-upwards' // Case fix,
    'YERÇEKIMININ SENI YUKARI ÇEKMESI': 'gravity-pulling-you-upwards' // Case fix,
    'sera': 'greenhouse',
    'Sera': 'greenhouse' // Case fix,
    'grup sohbeti': 'group-chat',
    'Grup Sohbeti': 'group-chat' // Case fix,
    'GRUP SOHBETI': 'group-chat' // Case fix,
    'gruffalo': 'gruffalo',
    'Gruffalo': 'gruffalo' // Case fix,
    'grifon': 'gryphon',
    'Grifon': 'gryphon' // Case fix,
    'GRIFON': 'gryphon' // Case fix,
    'koruma': 'guarding',
    'Koruma': 'guarding' // Case fix,
    'kanatlı kapı': 'gullwing',
    'Kanatlı kapı': 'gullwing' // Case fix,
    'KANATLI KAPI': 'gullwing' // Case fix,
    'spor salonu': 'gym',
    'Spor salonu': 'gym' // Case fix,
    'spor çantası': 'gymbag',
    'Spor çantası': 'gymbag' // Case fix,
    'SPOR ÇANTASI': 'gymbag' // Case fix,
    'jiroskop': 'gyroscope',
    'Jiroskop': 'gyroscope' // Case fix,
    'JIROSKOP': 'gyroscope' // Case fix,
    'geçmiş olsun': 'hail',
    'Geçmiş olsun': 'hail' // Case fix,
    'GEÇMIŞ OLSUN': 'hail' // Case fix,
    'saç kurutma makinesi': 'hair-dryer',
    'Saç kurutma makinesi': 'hair-dryer' // Case fix,
    'SAÇ KURUTMA MAKINESI': 'hair-dryer' // Case fix,
    'saçın dökülmesi': 'hair-falling-out',
    'Saçın dökülmesi': 'hair-falling-out' // Case fix,
    'SAÇIN DÖKÜLMESI': 'hair-falling-out' // Case fix,
    'hamam': 'hammam',
    'Hamam': 'hammam' // Case fix,
    'hamak': 'hammock',
    'Hamak': 'hammock' // Case fix,
    'el dezenfektanı': 'hand-sanitizer',
    'El dezenfektanı': 'hand-sanitizer' // Case fix,
    'EL DEZENFEKTANI': 'hand-sanitizer' // Case fix,
    'askı': 'hanger',
    'Askı': 'hanger' // Case fix,
    'ASKI': 'hanger' // Case fix,
    'harlekin': 'harlequin',
    'Harlekin': 'harlequin' // Case fix,
    'HARLEKIN': 'harlequin' // Case fix,
    'klavyensel': 'harpsichord',
    'Klavyensel': 'harpsichord' // Case fix,
    'hasat etmek': 'harvesting',
    'Hasat etmek': 'harvesting' // Case fix,
    'hashtag': 'hashtag',
    'Hashtag': 'hashtag' // Case fix,
    'askılık': 'hatstand',
    'Askılık': 'hatstand' // Case fix,
    'ASKILIK': 'hatstand' // Case fix,
    'lanetlenmek': 'haunting',
    'Lanetlenmek': 'haunting' // Case fix,
    'yoğun bir konuşma yapmak ama dili anlamamak': 'having-an-intense-conversation-without-understanding-the-language',
    'Yoğun bir konuşma yapmak ama dili anlamamak': 'having-an-intense-conversation-without-understanding-the-language' // Case fix,
    'YOĞUN BIR KONUŞMA YAPMAK AMA DILI ANLAMAMAK': 'having-an-intense-conversation-without-understanding-the-language' // Case fix,
    'şahin': 'hawk',
    'Şahin': 'hawk' // Case fix,
    'ŞAHIN': 'hawk' // Case fix,
    'uzakta bir melodi duymak': 'hearing-a-distant-melody',
    'Uzakta bir melodi duymak': 'hearing-a-distant-melody' // Case fix,
    'UZAKTA BIR MELODI DUYMAK': 'hearing-a-distant-melody' // Case fix,
    'kaynağı olmayan müzik duymak': 'hearing-music-with-no-source',
    'Kaynağı olmayan müzik duymak': 'hearing-music-with-no-source' // Case fix,
    'KAYNAĞI OLMAYAN MÜZIK DUYMAK': 'hearing-music-with-no-source' // Case fix,
    'isıtıcı': 'heater',
    'Isıtıcı': 'heater' // Case fix,
    'ISITICI': 'heater' // Case fix,
    'ağır': 'heavy',
    'Ağır': 'heavy' // Case fix,
    'AĞIR': 'heavy' // Case fix,
    'helikon': 'helicon',
    'Helikon': 'helicon' // Case fix,
    'HELIKON': 'helicon' // Case fix,
    'heliotrop': 'heliotrope',
    'Heliotrop': 'heliotrope' // Case fix,
    'HELIOTROP': 'heliotrope' // Case fix,
    'heliport': 'helipad',
    'Heliport': 'helipad' // Case fix,
    'HELIPORT': 'helipad' // Case fix,
    'helleborus': 'hellebore',
    'Helleborus': 'hellebore' // Case fix,
    'kask': 'helmet',
    'Kask': 'helmet' // Case fix,
    'yardım etmek': 'helping',
    'Yardım Etmek': 'helping' // Case fix,
    'YARDIM ETMEK': 'helping' // Case fix,
    'geçersiz': 'henge',
    'Geçersiz': 'henge' // Case fix,
    'GEÇERSIZ': 'henge' // Case fix,
    'karakuyruk': 'heron',
    'Karakuyruk': 'heron' // Case fix,
    'hibiskus': 'hibiscus',
    'Hibiskus': 'hibiscus' // Case fix,
    'HIBISKUS': 'hibiscus' // Case fix,
    'topuklu ayakkabılar': 'high-heels',
    'Topuklu Ayakkabılar': 'high-heels' // Case fix,
    'TOPUKLU AYAKKABILAR': 'high-heels' // Case fix,
    'hızlı tren': 'high-speed-train',
    'Hızlı tren': 'high-speed-train' // Case fix,
    'HIZLI TREN': 'high-speed-train' // Case fix,
    'yüksek taban ayakkabılar': 'high-tops',
    'Yüksek Taban Ayakkabılar': 'high-tops' // Case fix,
    'YÜKSEK TABAN AYAKKABILAR': 'high-tops' // Case fix,
    'süper kalem': 'highlighter',
    'Süper kalem': 'highlighter' // Case fix,
    'otoyol': 'highway',
    'Otoyol': 'highway' // Case fix,
    'tepe': 'hill',
    'Tepe': 'hill' // Case fix,
    'su aygırı': 'hippo',
    'Su aygırı': 'hippo' // Case fix,
    'SU AYGIRI': 'hippo' // Case fix,
    'hipster kafe': 'hipster-cafe',
    'Hipster Kafe': 'hipster-cafe' // Case fix,
    'HIPSTER KAFE': 'hipster-cafe' // Case fix,
    'otostop çekmek': 'hitchhiking',
    'Otostop Çekmek': 'hitchhiking' // Case fix,
    'tatil kartı': 'holiday-card',
    'Tatil Kartı': 'holiday-card' // Case fix,
    'TATIL KARTI': 'holiday-card' // Case fix,
    'boş': 'hollow',
    'Boş': 'hollow' // Case fix,
    'ev ofisi': 'home-office',
    'Ev Ofisi': 'home-office' // Case fix,
    'EV OFISI': 'home-office' // Case fix,
    'timsah yılanı': 'honeybadger',
    'Timsah yılanı': 'honeybadger' // Case fix,
    'TIMSAH YILANI': 'honeybadger' // Case fix,
    'kapüşonlu sweatshirt': 'hoodie',
    'Kapüşonlu sweatshirt': 'hoodie' // Case fix,
    'KAPÜŞONLU SWEATSHIRT': 'hoodie' // Case fix,
    'sıcak': 'hot',
    'Sıcak': 'hot' // Case fix,
    'SICAK': 'hot' // Case fix,
    'hoverboard': 'hoverboard',
    'Hoverboard': 'hoverboard' // Case fix,
    'avlanmak': 'hunting',
    'Avlanmak': 'hunting' // Case fix,
    'dondurma çalgısı': 'hurdy-gurdy',
    'Dondurma çalgısı': 'hurdy-gurdy' // Case fix,
    'DONDURMA ÇALGISI': 'hurdy-gurdy' // Case fix,
    'hurley': 'hurley',
    'Hurley': 'hurley' // Case fix,
    'kulübe': 'hut',
    'Kulübe': 'hut' // Case fix,
    'hibrit araç': 'hybrid-car',
    'Hibrit Araç': 'hybrid-car' // Case fix,
    'HIBRIT ARAÇ': 'hybrid-car' // Case fix,
    'hibrit araç': 'hybrid-vehicle',
    'Hibrit Araç': 'hybrid-vehicle' // Case fix,
    'HIBRIT ARAÇ': 'hybrid-vehicle' // Case fix,
    'hidra': 'hydra',
    'Hidra': 'hydra' // Case fix,
    'HIDRA': 'hydra' // Case fix,
    'hortensia': 'hydrangea',
    'Hortensia': 'hydrangea' // Case fix,
    'HORTENSIA': 'hydrangea' // Case fix,
    'sırtlan': 'hyena',
    'Sırtlan': 'hyena' // Case fix,
    'SIRTLAN': 'hyena' // Case fix,
    'sarı kantaron': 'hypericum',
    'Sarı kantaron': 'hypericum' // Case fix,
    'SARI KANTARON': 'hypericum' // Case fix,
    'hiperloop': 'hyperloop',
    'Hiperloop': 'hyperloop' // Case fix,
    'HIPERLOOP': 'hyperloop' // Case fix,
    'yaban keçisi': 'ibex',
    'Yaban keçisi': 'ibex' // Case fix,
    'YABAN KEÇISI': 'ibex' // Case fix,
    'hibiskus': 'ibiscus',
    'Hibiskus': 'ibiscus' // Case fix,
    'HIBISKUS': 'ibiscus' // Case fix,
    'buz': 'ice',
    'Buz': 'ice' // Case fix,
    'buzdağı': 'iceberg',
    'Buzdağı': 'iceberg' // Case fix,
    'BUZDAĞI': 'iceberg' // Case fix,
    'kimlik kartı': 'id-badge',
    'Kimlik kartı': 'id-badge' // Case fix,
    'KIMLIK KARTI': 'id-badge' // Case fix,
    'kimlik kartı': 'id-card',
    'Kimlik Kartı': 'id-card' // Case fix,
    'KIMLIK KARTI': 'id-card' // Case fix,
    'geçici barınak': 'igloo',
    'Geçici barınak': 'igloo' // Case fix,
    'GEÇICI BARINAK': 'igloo' // Case fix,
    'i̇guana': 'iguana',
    'İguana': 'iguana' // Case fix,
    'koşmak isteyip koşamayacak kadar ağırlaşmak': 'immobilized-running',
    'Koşmak isteyip koşamayacak kadar ağırlaşmak': 'immobilized-running' // Case fix,
    'KOŞMAK ISTEYIP KOŞAMAYACAK KADAR AĞIRLAŞMAK': 'immobilized-running' // Case fix,
    'sonsuz bir koridorda': 'in-a-never-ending-hallway',
    'Sonsuz bir koridorda': 'in-a-never-ending-hallway' // Case fix,
    'SONSUZ BIR KORIDORDA': 'in-a-never-ending-hallway' // Case fix,
    'bir yarışta ama sürekli yavaşlıyorum': 'in-a-race-but-constantly-slowing-down',
    'Bir yarışta ama sürekli yavaşlıyorum': 'in-a-race-but-constantly-slowing-down' // Case fix,
    'BIR YARIŞTA AMA SÜREKLI YAVAŞLIYORUM': 'in-a-race-but-constantly-slowing-down' // Case fix,
    'değişen duvarlarla bir odada': 'in-a-room-with-changing-walls',
    'Değişen duvarlarla bir odada': 'in-a-room-with-changing-walls' // Case fix,
    'DEĞIŞEN DUVARLARLA BIR ODADA': 'in-a-room-with-changing-walls' // Case fix,
    'uçuş i̇çi eğlence': 'in-flight-entertainment',
    'Uçuş İçi Eğlence': 'in-flight-entertainment' // Case fix,
    'UÇUŞ İÇI EĞLENCE': 'in-flight-entertainment' // Case fix,
    'inkübatör': 'incubator',
    'INKÜBATÖR': 'incubator' // Case fix,
    'i̇ndigo': 'indigo',
    'İndigo': 'indigo' // Case fix,
    'İNDIGO': 'indigo' // Case fix,
    'i̇ndüksiyon ocak': 'induction-cooktop',
    'İndüksiyon Ocak': 'induction-cooktop' // Case fix,
    'İNDÜKSIYON OCAK': 'induction-cooktop' // Case fix,
    'i̇ndüksiyon ocak': 'induction-stove',
    'İndüksiyon Ocak': 'induction-stove' // Case fix,
    'İNDÜKSIYON OCAK': 'induction-stove' // Case fix,
    'sonsuzluk havuzu': 'infinity-pool',
    'Sonsuzluk Havuzu': 'infinity-pool' // Case fix,
    'sonsuzluk': 'infinity',
    'Sonsuzluk': 'infinity' // Case fix,
    'etkileyici': 'influencer',
    'Etkileyici': 'influencer' // Case fix,
    'ETKILEYICI': 'influencer' // Case fix,
    'miras almak': 'inheriting',
    'Miras Almak': 'inheriting' // Case fix,
    'MIRAS ALMAK': 'inheriting' // Case fix,
    'anlık mesajlaşma uygulaması': 'instant-messaging-app',
    'Anlık Mesajlaşma Uygulaması': 'instant-messaging-app' // Case fix,
    'ANLIK MESAJLAŞMA UYGULAMASI': 'instant-messaging-app' // Case fix,
    'hızlı makarna': 'instant-noodles',
    'Hızlı Makarna': 'instant-noodles' // Case fix,
    'HIZLI MAKARNA': 'instant-noodles' // Case fix,
    'hızlı tencere': 'instant-pot',
    'Hızlı Tencere': 'instant-pot' // Case fix,
    'HIZLI TENCERE': 'instant-pot' // Case fix,
    'birleştirme': 'integrating',
    'Birleştirme': 'integrating' // Case fix,
    'BIRLEŞTIRME': 'integrating' // Case fix,
    'kavşak': 'intersection',
    'Kavşak': 'intersection' // Case fix,
    'i̇nukshuk': 'inukshuk',
    'İnukshuk': 'inukshuk' // Case fix,
    'araştırmak': 'investigating',
    'Araştırmak': 'investigating' // Case fix,
    'ARAŞTIRMAK': 'investigating' // Case fix,
    'diğerlerine görünmezlik': 'invisibility-to-others',
    'Diğerlerine görünmezlik': 'invisibility-to-others' // Case fix,
    'DIĞERLERINE GÖRÜNMEZLIK': 'invisibility-to-others' // Case fix,
    'görünmez': 'invisible',
    'Görünmez': 'invisible' // Case fix,
    'ütüleme': 'ironing',
    'Ütüleme': 'ironing' // Case fix,
    'irrawaddy yunusu': 'irrawaddy-dolphin',
    'Irrawaddy Yunusu': 'irrawaddy-dolphin' // Case fix,
    'jabberwock': 'jabberwock',
    'Jabberwock': 'jabberwock' // Case fix,
    'jabiru': 'jabiru',
    'Jabiru': 'jabiru' // Case fix,
    'JABIRU': 'jabiru' // Case fix,
    'jabuticaba': 'jabuticaba',
    'Jabuticaba': 'jabuticaba' // Case fix,
    'JABUTICABA': 'jabuticaba' // Case fix,
    'jacaranda': 'jacaranda',
    'Jacaranda': 'jacaranda' // Case fix,
    'çakal': 'jackal',
    'jackalope': 'jackalope',
    'Jackalope': 'jackalope' // Case fix,
    'yeşim': 'jade',
    'Yeşim': 'jade' // Case fix,
    'YEŞIM': 'jade' // Case fix,
    'jadit': 'jadeite',
    'Jadit': 'jadeite' // Case fix,
    'JADIT': 'jadeite' // Case fix,
    'jalapeño': 'jalapeño',
    'Jalapeño': 'jalapeño' // Case fix,
    'kavanoz': 'jar',
    'Kavanoz': 'jar' // Case fix,
    'cirit': 'javelin',
    'Cirit': 'javelin' // Case fix,
    'CIRIT': 'javelin' // Case fix,
    'javelina': 'javelina',
    'Javelina': 'javelina' // Case fix,
    'JAVELINA': 'javelina' // Case fix,
    'jerboa': 'jerboa',
    'Jerboa': 'jerboa' // Case fix,
    'jet ski': 'jet-ski',
    'Jet Ski': 'jet-ski' // Case fix,
    'JET SKI': 'jet-ski' // Case fix,
    'jetpack': 'jetpack',
    'Jetpack': 'jetpack' // Case fix,
    'jicama': 'jicama',
    'Jicama': 'jicama' // Case fix,
    'JICAMA': 'jicama' // Case fix,
    'bulmaca': 'jigsaw',
    'Bulmaca': 'jigsaw' // Case fix,
    'i̇ş görüşmesi': 'job-interview',
    'İş Görüşmesi': 'job-interview' // Case fix,
    'İŞ GÖRÜŞMESI': 'job-interview' // Case fix,
    'hakim (yargıç)': 'judge',
    'Hakim (Yargıç)': 'judge' // Case fix,
    'HAKIM (YARGIÇ)': 'judge' // Case fix,
    'juggernaut': 'juggernaut',
    'Juggernaut': 'juggernaut' // Case fix,
    'jonglör': 'juggler',
    'Jonglör': 'juggler' // Case fix,
    'sıkacak': 'juicer',
    'Sıkacak': 'juicer' // Case fix,
    'SIKACAK': 'juicer' // Case fix,
    'jukebox': 'jukebox',
    'Jukebox': 'jukebox' // Case fix,
    'atlama': 'jumping',
    'Atlama': 'jumping' // Case fix,
    'kaftan': 'kaftan',
    'Kaftan': 'kaftan' // Case fix,
    'kakapo': 'kakapo',
    'Kakapo': 'kakapo' // Case fix,
    'kale salatası': 'kale-salad',
    'Kale Salatası': 'kale-salad' // Case fix,
    'KALE SALATASI': 'kale-salad' // Case fix,
    'kaleidoskop': 'kaleidoscope',
    'Kaleidoskop': 'kaleidoscope' // Case fix,
    'KALEIDOSKOP': 'kaleidoscope' // Case fix,
    'kanguru': 'kangaroo',
    'Kanguru': 'kangaroo' // Case fix,
    'kapok': 'kapok',
    'Kapok': 'kapok' // Case fix,
    'katana': 'katana',
    'Katana': 'katana' // Case fix,
    'şahin': 'kestrel',
    'Şahin': 'kestrel' // Case fix,
    'ŞAHIN': 'kestrel' // Case fix,
    'çaydanlık': 'kettle',
    'Çaydanlık': 'kettle' // Case fix,
    'ÇAYDANLIK': 'kettle' // Case fix,
    'anahtarlık askısı': 'key-hook',
    'Anahtarlık Askısı': 'key-hook' // Case fix,
    'ANAHTARLIK ASKISI': 'key-hook' // Case fix,
    'anahtarın çalışmaması': 'key-not-working',
    'Anahtarın çalışmaması': 'key-not-working' // Case fix,
    'ANAHTARIN ÇALIŞMAMASI': 'key-not-working' // Case fix,
    'klavye kısayolu': 'keyboard-shortcut',
    'Klavye Kısayolu': 'keyboard-shortcut' // Case fix,
    'KLAVYE KISAYOLU': 'keyboard-shortcut' // Case fix,
    'kilitleme yeri': 'keyhole',
    'Kilitleme yeri': 'keyhole' // Case fix,
    'KILITLEME YERI': 'keyhole' // Case fix,
    'kintsugi': 'kintsugi',
    'Kintsugi': 'kintsugi' // Case fix,
    'KINTSUGI': 'kintsugi' // Case fix,
    'english: kite -> uçurtma': 'kite',
    'English: Kite -> Uçurtma': 'kite' // Case fix,
    'ENGLISH: KITE -> UÇURTMA': 'kite' // Case fix,
    'kivi': 'kiwi',
    'Kivi': 'kiwi' // Case fix,
    'KIVI': 'kiwi' // Case fix,
    'diz çökme': 'kneeling',
    'Diz çökme': 'kneeling' // Case fix,
    'DIZ ÇÖKME': 'kneeling' // Case fix,
    'bıçak seti': 'knife-block',
    'Bıçak Seti': 'knife-block' // Case fix,
    'BIÇAK SETI': 'knife-block' // Case fix,
    'örgü': 'knitting',
    'Örgü': 'knitting' // Case fix,
    'düğme': 'knob',
    'Düğme': 'knob' // Case fix,
    'düğüm': 'knot',
    'Düğüm': 'knot' // Case fix,
    'geçiş.': 'koan',
    'Geçiş.': 'koan' // Case fix,
    'GEÇIŞ.': 'koan' // Case fix,
    'koi': 'koi',
    'Koi': 'koi' // Case fix,
    'KOI': 'koi' // Case fix,
    'komainu': 'komainu',
    'Komainu': 'komainu' // Case fix,
    'KOMAINU': 'komainu' // Case fix,
    'kombucha': 'kombucha',
    'Kombucha': 'kombucha' // Case fix,
    'kookaburra': 'kookaburra',
    'Kookaburra': 'kookaburra' // Case fix,
    'gece canavarı': 'kraken',
    'Gece canavarı': 'kraken' // Case fix,
    'GECE CANAVARI': 'kraken' // Case fix,
    'kukri': 'kukri',
    'Kukri': 'kukri' // Case fix,
    'KUKRI': 'kukri' // Case fix,
    'kumkuat': 'kumquat',
    'Kumkuat': 'kumquat' // Case fix,
    'geçmişte kullanılan bir tür içki kadehi.': 'kylix',
    'Geçmişte kullanılan bir tür içki kadehi.': 'kylix' // Case fix,
    'GEÇMIŞTE KULLANILAN BIR TÜR IÇKI KADEHI.': 'kylix' // Case fix,
    'kepçe': 'ladle',
    'uğur böceği': 'ladybug',
    'Uğur böceği': 'ladybug' // Case fix,
    'UĞUR BÖCEĞI': 'ladybug' // Case fix,
    'lamassu': 'lamassu',
    'Lamassu': 'lamassu' // Case fix,
    'çökmek': 'landslide',
    'Çökmek': 'landslide' // Case fix,
    'fener': 'lantern',
    'Fener': 'lantern' // Case fix,
    'sarkıt': 'lanyard',
    'Sarkıt': 'lanyard' // Case fix,
    'SARKIT': 'lanyard' // Case fix,
    'dizüstü bilgisayar çantası': 'laptop-bag',
    'Dizüstü Bilgisayar Çantası': 'laptop-bag' // Case fix,
    'DIZÜSTÜ BILGISAYAR ÇANTASI': 'laptop-bag' // Case fix,
    'dizüstü bilgisayar şarj aleti': 'laptop-charger',
    'Dizüstü Bilgisayar Şarj Aleti': 'laptop-charger' // Case fix,
    'DIZÜSTÜ BILGISAYAR ŞARJ ALETI': 'laptop-charger' // Case fix,
    'larimar': 'larimar',
    'Larimar': 'larimar' // Case fix,
    'LARIMAR': 'larimar' // Case fix,
    'sınava geç kalmak': 'late-for-an-exam',
    'Sınava Geç Kalmak': 'late-for-an-exam' // Case fix,
    'SINAVA GEÇ KALMAK': 'late-for-an-exam' // Case fix,
    'latte': 'latte',
    'Latte': 'latte' // Case fix,
    'çamaşır sepeti': 'laundry-basket',
    'Çamaşır Sepeti': 'laundry-basket' // Case fix,
    'ÇAMAŞIR SEPETI': 'laundry-basket' // Case fix,
    'lavanta': 'lavender',
    'Lavanta': 'lavender' // Case fix,
    'kurşun': 'lead',
    'Kurşun': 'lead' // Case fix,
    'öğrenme': 'learning',
    'Öğrenme': 'learning' // Case fix,
    'deri botlar': 'leather-boots',
    'Deri Botlar': 'leather-boots' // Case fix,
    'DERI BOTLAR': 'leather-boots' // Case fix,
    'deri ceket': 'leather-jacket',
    'Deri Ceket': 'leather-jacket' // Case fix,
    'DERI CEKET': 'leather-jacket' // Case fix,
    'deri cüzdan': 'leather-wallet',
    'Deri Cüzdan': 'leather-wallet' // Case fix,
    'DERI CÜZDAN': 'leather-wallet' // Case fix,
    'led işık': 'led-light',
    'LED Işık': 'led-light' // Case fix,
    'LED IŞIK': 'led-light' // Case fix,
    'lemur': 'lemur',
    'Lemur': 'lemur' // Case fix,
    'leopar': 'leopard',
    'Leopar': 'leopard' // Case fix,
    'hayat': 'life',
    'Hayat': 'life' // Case fix,
    'hafif raylı sistem': 'light-rail',
    'Hafif Raylı Sistem': 'light-rail' // Case fix,
    'HAFIF RAYLI SISTEM': 'light-rail' // Case fix,
    'işık anahtarı': 'light-switch',
    'Işık Anahtarı': 'light-switch' // Case fix,
    'IŞIK ANAHTARI': 'light-switch' // Case fix,
    'işık': 'light',
    'Işık': 'light' // Case fix,
    'IŞIK': 'light' // Case fix,
    'ateşleyici': 'lighter',
    'Ateşleyici': 'lighter' // Case fix,
    'ATEŞLEYICI': 'lighter' // Case fix,
    'fener': 'lighthouse',
    'Fener': 'lighthouse' // Case fix,
    'hafif': 'lightweight',
    'Hafif': 'lightweight' // Case fix,
    'HAFIF': 'lightweight' // Case fix,
    'beğen butonu': 'like-button',
    'Beğen Butonu': 'like-button' // Case fix,
    'limuzin': 'limousine',
    'Limuzin': 'limousine' // Case fix,
    'LIMUZIN': 'limousine' // Case fix,
    'çiğneyerek yürümek': 'limping',
    'Çiğneyerek yürümek': 'limping' // Case fix,
    'ÇIĞNEYEREK YÜRÜMEK': 'limping' // Case fix,
    'dudak balsamı': 'lip-balm',
    'Dudak Balsamı': 'lip-balm' // Case fix,
    'DUDAK BALSAMI': 'lip-balm' // Case fix,
    'ruj': 'lipstick',
    'Ruj': 'lipstick' // Case fix,
    'litofon': 'lithophone',
    'Litofon': 'lithophone' // Case fix,
    'LITOFON': 'lithophone' // Case fix,
    'kerevit': 'lobster',
    'Kerevit': 'lobster' // Case fix,
    'KEREVIT': 'lobster' // Case fix,
    'kilitli çekmece': 'locked-drawer',
    'Kilitli çekmece': 'locked-drawer' // Case fix,
    'KILITLI ÇEKMECE': 'locked-drawer' // Case fix,
    'dokuma tezgahı': 'loom',
    'Dokuma tezgahı': 'loom' // Case fix,
    'DOKUMA TEZGAHI': 'loom' // Case fix,
    'dut': 'loquat',
    'Dut': 'loquat' // Case fix,
    'vücut hareketleri üzerinde kontrolü kaybetmek': 'losing-control-over-body-movements',
    'Vücut hareketleri üzerinde kontrolü kaybetmek': 'losing-control-over-body-movements' // Case fix,
    'VÜCUT HAREKETLERI ÜZERINDE KONTROLÜ KAYBETMEK': 'losing-control-over-body-movements' // Case fix,
    'bedeni kontrolü kaybetmek': 'losing-control-over-body',
    'Bedeni kontrolü kaybetmek': 'losing-control-over-body' // Case fix,
    'BEDENI KONTROLÜ KAYBETMEK': 'losing-control-over-body' // Case fix,
    'para kaybetmek': 'losing-money',
    'Para Kaybetmek': 'losing-money' // Case fix,
    'kritik bir konuşmada sesini kaybetmek': 'losing-your-voice-in-a-critical-conversation',
    'Kritik bir konuşmada sesini kaybetmek': 'losing-your-voice-in-a-critical-conversation' // Case fix,
    'KRITIK BIR KONUŞMADA SESINI KAYBETMEK': 'losing-your-voice-in-a-critical-conversation' // Case fix,
    'yabancı bir ülkede kaybolmak': 'lost-in-a-foreign-land',
    'Yabancı bir ülkede kaybolmak': 'lost-in-a-foreign-land' // Case fix,
    'YABANCI BIR ÜLKEDE KAYBOLMAK': 'lost-in-a-foreign-land' // Case fix,
    'kaybolan ayakkabı (tek)': 'lost-shoe',
    'Kaybolan ayakkabı (tek)': 'lost-shoe' // Case fix,
    'KAYBOLAN AYAKKABI (TEK)': 'lost-shoe' // Case fix,
    'lotus': 'lotus',
    'Lotus': 'lotus' // Case fix,
    'bagaj': 'luggage',
    'Bagaj': 'luggage' // Case fix,
    'öğle yemeği kutusu': 'lunchbox',
    'Öğle yemeği kutusu': 'lunchbox' // Case fix,
    'ÖĞLE YEMEĞI KUTUSU': 'lunchbox' // Case fix,
    'lir': 'lute',
    'Lir': 'lute' // Case fix,
    'LIR': 'lute' // Case fix,
    'lüks sedan': 'luxury-sedan',
    'Lüks Sedan': 'luxury-sedan' // Case fix,
    'litchi': 'lychee',
    'Litchi': 'lychee' // Case fix,
    'LITCHI': 'lychee' // Case fix,
    'lykopen': 'lycopene',
    'Lykopen': 'lycopene' // Case fix,
    'lycra': 'lycra',
    'Lycra': 'lycra' // Case fix,
    'lynx': 'lynx',
    'Lynx': 'lynx' // Case fix,
    'lir': 'lyre',
    'Lir': 'lyre' // Case fix,
    'LIR': 'lyre' // Case fix,
    'kelaynak': 'lyrebird',
    'Kelaynak': 'lyrebird' // Case fix,
    'makaronlar': 'macarons',
    'Makaronlar': 'macarons' // Case fix,
    'makaron': 'macaroon',
    'Makaron': 'macaroon' // Case fix,
    'mavi başlıklı papağan': 'macaw',
    'Mavi başlıklı papağan': 'macaw' // Case fix,
    'MAVI BAŞLIKLI PAPAĞAN': 'macaw' // Case fix,
    'gece şarkısı': 'madrigal',
    'Gece şarkısı': 'madrigal' // Case fix,
    'GECE ŞARKISI': 'madrigal' // Case fix,
    'dönme dolap': 'maelstrom',
    'mıknatıs': 'magnet',
    'Mıknatıs': 'magnet' // Case fix,
    'MIKNATIS': 'magnet' // Case fix,
    'geçmiş makyaj': 'makeup',
    'Geçmiş makyaj': 'makeup' // Case fix,
    'GEÇMIŞ MAKYAJ': 'makeup' // Case fix,
    'barışmak': 'making-up',
    'Barışmak': 'making-up' // Case fix,
    'BARIŞMAK': 'making-up' // Case fix,
    'alışveriş merkezi': 'mall',
    'Alışveriş merkezi': 'mall' // Case fix,
    'ALIŞVERIŞ MERKEZI': 'mall' // Case fix,
    'adam': 'man',
    'Adam': 'man' // Case fix,
    'deniz inekleri': 'manatee',
    'Deniz inekleri': 'manatee' // Case fix,
    'DENIZ INEKLERI': 'manatee' // Case fix,
    'çene kemiği': 'mandible',
    'Çene kemiği': 'mandible' // Case fix,
    'ÇENE KEMIĞI': 'mandible' // Case fix,
    'mandolin': 'mandolin',
    'Mandolin': 'mandolin' // Case fix,
    'MANDOLIN': 'mandolin' // Case fix,
    'mandrake': 'mandragora',
    'Mandrake': 'mandragora' // Case fix,
    'mandrake bitkisi': 'mandrake',
    'Mandrake bitkisi': 'mandrake' // Case fix,
    'MANDRAKE BITKISI': 'mandrake' // Case fix,
    'mandrilya': 'mandrill',
    'Mandrilya': 'mandrill' // Case fix,
    'MANDRILYA': 'mandrill' // Case fix,
    'mangostin': 'mangosteen',
    'Mangostin': 'mangosteen' // Case fix,
    'MANGOSTIN': 'mangosteen' // Case fix,
    'mangrovlar': 'mangrove',
    'Mangrovlar': 'mangrove' // Case fix,
    'manticore': 'manticore',
    'Manticore': 'manticore' // Case fix,
    'MANTICORE': 'manticore' // Case fix,
    'şömine rafı': 'mantlepiece',
    'Şömine Rafı': 'mantlepiece' // Case fix,
    'ŞÖMINE RAFI': 'mantlepiece' // Case fix,
    'maraka': 'maraca',
    'Maraka': 'maraca' // Case fix,
    'marimba': 'marimba',
    'Marimba': 'marimba' // Case fix,
    'MARIMBA': 'marimba' // Case fix,
    'marmoset': 'marmoset',
    'Marmoset': 'marmoset' // Case fix,
    'kestane': 'maroon',
    'Kestane': 'maroon' // Case fix,
    'marzipan': 'marzipan',
    'Marzipan': 'marzipan' // Case fix,
    'MARZIPAN': 'marzipan' // Case fix,
    'maskeli balo': 'masquerade',
    'Maskeli balo': 'masquerade' // Case fix,
    'MASKELI BALO': 'masquerade' // Case fix,
    'ustalaşmak': 'mastering',
    'Ustalaşmak': 'mastering' // Case fix,
    'mastif': 'mastiff',
    'Mastif': 'mastiff' // Case fix,
    'MASTIF': 'mastiff' // Case fix,
    'geçmişteki bir fillere ait bir terimdir.': 'mastodon',
    'Geçmişteki bir fillere ait bir terimdir.': 'mastodon' // Case fix,
    'GEÇMIŞTEKI BIR FILLERE AIT BIR TERIMDIR.': 'mastodon' // Case fix,
    'eşleşme': 'match',
    'Eşleşme': 'match' // Case fix,
    'matcha latte': 'matcha-latte',
    'Matcha Latte': 'matcha-latte' // Case fix,
    'matcha': 'matcha',
    'Matcha': 'matcha' // Case fix,
    'geçişli': 'matte',
    'Geçişli': 'matte' // Case fix,
    'GEÇIŞLI': 'matte' // Case fix,
    'çayır': 'meadow',
    'Çayır': 'meadow' // Case fix,
    'ÇAYIR': 'meadow' // Case fix,
    'meditasyon yapmak': 'meditating',
    'Meditasyon Yapmak': 'meditating' // Case fix,
    'MEDITASYON YAPMAK': 'meditating' // Case fix,
    'meerschaum': 'meerschaum',
    'vefat etmiş bir akrabayla buluşmak': 'meeting-a-deceased-relative',
    'Vefat etmiş bir akrabayla buluşmak': 'meeting-a-deceased-relative' // Case fix,
    'VEFAT ETMIŞ BIR AKRABAYLA BULUŞMAK': 'meeting-a-deceased-relative' // Case fix,
    'erimek': 'melting',
    'Erimek': 'melting' // Case fix,
    'ERIMEK': 'melting' // Case fix,
    'hafıza': 'memory',
    'Hafıza': 'memory' // Case fix,
    'HAFIZA': 'memory' // Case fix,
    'merlin': 'merlin',
    'Merlin': 'merlin' // Case fix,
    'MERLIN': 'merlin' // Case fix,
    'büyülenmek': 'mesmerizing',
    'Büyülenmek': 'mesmerizing' // Case fix,
    'messenger çantası': 'messenger-bag',
    'Messenger çantası': 'messenger-bag' // Case fix,
    'MESSENGER ÇANTASI': 'messenger-bag' // Case fix,
    'metro kart': 'metro-card',
    'Metro Kart': 'metro-card' // Case fix,
    'mikroskop': 'microscope',
    'Mikroskop': 'microscope' // Case fix,
    'MIKROSKOP': 'microscope' // Case fix,
    'mikrodalga': 'microwave',
    'Mikrodalga': 'microwave' // Case fix,
    'MIKRODALGA': 'microwave' // Case fix,
    'minarete': 'minaret',
    'Minarete': 'minaret' // Case fix,
    'MINARETE': 'minaret' // Case fix,
    'minivan': 'minivan',
    'Minivan': 'minivan' // Case fix,
    'MINIVAN': 'minivan' // Case fix,
    'aynanın kırılması': 'mirror-breaking',
    'Aynanın kırılması': 'mirror-breaking' // Case fix,
    'AYNANIN KIRILMASI': 'mirror-breaking' // Case fix,
    'ayağında farklı ayakkabı olması': 'mismatched-shoes',
    'Ayağında farklı ayakkabı olması': 'mismatched-shoes' // Case fix,
    'AYAĞINDA FARKLI AYAKKABI OLMASI': 'mismatched-shoes' // Case fix,
    'mikser': 'mixer',
    'Mikser': 'mixer' // Case fix,
    'MIKSER': 'mixer' // Case fix,
    'moai': 'moai',
    'Moai': 'moai' // Case fix,
    'MOAI': 'moai' // Case fix,
    'mobil ödeme': 'mobile-payment',
    'Mobil Ödeme': 'mobile-payment' // Case fix,
    'MOBIL ÖDEME': 'mobile-payment' // Case fix,
    'hareketlilik uygulaması': 'mobility-app',
    'Hareketlilik Uygulaması': 'mobility-app' // Case fix,
    'HAREKETLILIK UYGULAMASI': 'mobility-app' // Case fix,
    'mobius': 'mobius',
    'Mobius': 'mobius' // Case fix,
    'MOBIUS': 'mobius' // Case fix,
    'mochi': 'mochi',
    'Mochi': 'mochi' // Case fix,
    'MOCHI': 'mochi' // Case fix,
    'alay etmek': 'mocking',
    'Alay Etmek': 'mocking' // Case fix,
    'monokl': 'monocle',
    'Monokl': 'monocle' // Case fix,
    'monoray': 'monorail',
    'Monoray': 'monorail' // Case fix,
    'canavar': 'monster',
    'Canavar': 'monster' // Case fix,
    'aytaşı': 'moonstone',
    'Aytaşı': 'moonstone' // Case fix,
    'AYTAŞI': 'moonstone' // Case fix,
    'geceyarısı': 'moose',
    'Geceyarısı': 'moose' // Case fix,
    'GECEYARISI': 'moose' // Case fix,
    'mop -> paspas': 'mop',
    'Mop -> Paspas': 'mop' // Case fix,
    'mozaik': 'mosaic',
    'Mozaik': 'mosaic' // Case fix,
    'MOZAIK': 'mosaic' // Case fix,
    'sivrisinek': 'mosquito',
    'Sivrisinek': 'mosquito' // Case fix,
    'SIVRISINEK': 'mosquito' // Case fix,
    'gündüz kelebeği': 'moth',
    'Gündüz kelebeği': 'moth' // Case fix,
    'GÜNDÜZ KELEBEĞI': 'moth' // Case fix,
    'elektrikli scooter': 'motorized-scooter',
    'Elektrikli Scooter': 'motorized-scooter' // Case fix,
    'ELEKTRIKLI SCOOTER': 'motorized-scooter' // Case fix,
    'mantar': 'mushroom',
    'Mantar': 'mushroom' // Case fix,
    'ortak arkadaş': 'mutual-friend',
    'Ortak Arkadaş': 'mutual-friend' // Case fix,
    'miselium': 'mycelium',
    'Miselium': 'mycelium' // Case fix,
    'MISELIUM': 'mycelium' // Case fix,
    'mürver': 'myrrh',
    'Mürver': 'myrrh' // Case fix,
    'mithril': 'mythril',
    'Mithril': 'mythril' // Case fix,
    'MITHRIL': 'mythril' // Case fix,
    'halka açıkta çıplak olmak': 'naked-in-public',
    'Halka açıkta çıplak olmak': 'naked-in-public' // Case fix,
    'HALKA AÇIKTA ÇIPLAK OLMAK': 'naked-in-public' // Case fix,
    'çıplak yakalanmak ve herkesin bakması': 'naked-observed',
    'Çıplak yakalanmak ve herkesin bakması': 'naked-observed' // Case fix,
    'ÇIPLAK YAKALANMAK VE HERKESIN BAKMASI': 'naked-observed' // Case fix,
    'çıplak yakalanmak ama kimsenin umursamaması': 'naked-unnoticed',
    'Çıplak yakalanmak ama kimsenin umursamaması': 'naked-unnoticed' // Case fix,
    'ÇIPLAK YAKALANMAK AMA KIMSENIN UMURSAMAMASI': 'naked-unnoticed' // Case fix,
    'i̇simlik': 'nameplate',
    'İsimlik': 'nameplate' // Case fix,
    'İSIMLIK': 'nameplate' // Case fix,
    'mendil': 'napkin',
    'Mendil': 'napkin' // Case fix,
    'MENDIL': 'napkin' // Case fix,
    'nargile': 'narghile',
    'Nargile': 'narghile' // Case fix,
    'NARGILE': 'narghile' // Case fix,
    'dar koridor': 'narrow-corridor',
    'Dar koridor': 'narrow-corridor' // Case fix,
    'DAR KORIDOR': 'narrow-corridor' // Case fix,
    'narval': 'narwhal',
    'Narval': 'narwhal' // Case fix,
    'nautilus': 'nautilus',
    'Nautilus': 'nautilus' // Case fix,
    'NAUTILUS': 'nautilus' // Case fix,
    'yön bulmak': 'navigating',
    'Yön Bulmak': 'navigating' // Case fix,
    'müzakere etmek': 'negotiating',
    'Müzakere Etmek': 'negotiating' // Case fix,
    'gece lambası': 'neon',
    'Gece lambası': 'neon' // Case fix,
    'GECE LAMBASI': 'neon' // Case fix,
    'nefrit': 'nephrite',
    'NEFRIT': 'nephrite' // Case fix,
    'suya girmek ama suyun sıcak/soğuk olmaması': 'neutral-water',
    'Suya girmek ama suyun sıcak/soğuk olmaması': 'neutral-water' // Case fix,
    'SUYA GIRMEK AMA SUYUN SICAK/SOĞUK OLMAMASI': 'neutral-water' // Case fix,
    'yeniel': 'newel',
    'Yeniel': 'newel' // Case fix,
    'YENIEL': 'newel' // Case fix,
    'gazete': 'newspaper',
    'Gazete': 'newspaper' // Case fix,
    'kabus': 'nightmare',
    'Kabus': 'nightmare' // Case fix,
    'komodin': 'nightstand',
    'Komodin': 'nightstand' // Case fix,
    'KOMODIN': 'nightstand' // Case fix,
    'nimbüs': 'nimbus',
    'Nimbüs': 'nimbus' // Case fix,
    'NIMBÜS': 'nimbus' // Case fix,
    'i̇nternetin çekmemesi': 'no-internet',
    'İnternetin çekmemesi': 'no-internet' // Case fix,
    'İNTERNETIN ÇEKMEMESI': 'no-internet' // Case fix,
    'gürültü engelleyici kulaklıklar': 'noise-canceling-headphones',
    'Gürültü Engelleyici Kulaklıklar': 'noise-canceling-headphones' // Case fix,
    'GÜRÜLTÜ ENGELLEYICI KULAKLIKLAR': 'noise-canceling-headphones' // Case fix,
    'gürültü önleyici kulaklıklar': 'noise-cancelling-earbuds',
    'Gürültü Önleyici Kulaklıklar': 'noise-cancelling-earbuds' // Case fix,
    'GÜRÜLTÜ ÖNLEYICI KULAKLIKLAR': 'noise-cancelling-earbuds' // Case fix,
    'gürültü': 'noise',
    'Gürültü': 'noise' // Case fix,
    'erişte çorbası': 'noodle-soup',
    'Erişte Çorbası': 'noodle-soup' // Case fix,
    'ERIŞTE ÇORBASI': 'noodle-soup' // Case fix,
    'birinin seni tanımaması': 'not-recognized',
    'Birinin seni tanımaması': 'not-recognized' // Case fix,
    'BIRININ SENI TANIMAMASI': 'not-recognized' // Case fix,
    'not defteri': 'notepad',
    'Not defteri': 'notepad' // Case fix,
    'NOT DEFTERI': 'notepad' // Case fix,
    'bildirim': 'notification',
    'Bildirim': 'notification' // Case fix,
    'BILDIRIM': 'notification' // Case fix,
    'numara': 'number',
    'NUMARA': 'number' // Case fix,
    'nyala': 'nyala',
    'Nyala': 'nyala' // Case fix,
    'gece sever': 'nyctophile',
    'Gece sever': 'nyctophile' // Case fix,
    'vaha': 'oasis',
    'Vaha': 'oasis' // Case fix,
    'obelisk': 'obelisk',
    'Obelisk': 'obelisk' // Case fix,
    'OBELISK': 'obelisk' // Case fix,
    'nesnelerin kendi kendine hareket etmesi': 'objects-moving-on-their-own',
    'Nesnelerin kendi kendine hareket etmesi': 'objects-moving-on-their-own' // Case fix,
    'NESNELERIN KENDI KENDINE HAREKET ETMESI': 'objects-moving-on-their-own' // Case fix,
    'okarina': 'ocarina',
    'Okarina': 'ocarina' // Case fix,
    'OKARINA': 'ocarina' // Case fix,
    'Okyanus': 'ocean' // Case fix,
    'ocelot': 'ocelot',
    'Ocelot': 'ocelot' // Case fix,
    'ocotillo': 'ocotillo',
    'Ocotillo': 'ocotillo' // Case fix,
    'OCOTILLO': 'ocotillo' // Case fix,
    'sekizli': 'octavo',
    'Sekizli': 'octavo' // Case fix,
    'SEKIZLI': 'octavo' // Case fix,
    'ofis sandalyesi': 'office-chair',
    'Ofis Sandalyesi': 'office-chair' // Case fix,
    'OFIS SANDALYESI': 'office-chair' // Case fix,
    'ofis partisi': 'office-party',
    'Ofis Partisi': 'office-party' // Case fix,
    'OFIS PARTISI': 'office-party' // Case fix,
    'ofis telefonu': 'office-phone',
    'Ofis Telefonu': 'office-phone' // Case fix,
    'OFIS TELEFONU': 'office-phone' // Case fix,
    'ofis bitkisi': 'office-plant',
    'Ofis Bitkisi': 'office-plant' // Case fix,
    'OFIS BITKISI': 'office-plant' // Case fix,
    'yağ': 'oil',
    'Yağ': 'oil' // Case fix,
    'okapi': 'okapi',
    'Okapi': 'okapi' // Case fix,
    'OKAPI': 'okapi' // Case fix,
    'omfalos': 'omphalos',
    'Omfalos': 'omphalos' // Case fix,
    'çevrimiçi bankacılık': 'online-banking',
    'Çevrimiçi Bankacılık': 'online-banking' // Case fix,
    'ÇEVRIMIÇI BANKACILIK': 'online-banking' // Case fix,
    'çevrimiçi kontrol': 'online-check-in',
    'Çevrimiçi Kontrol': 'online-check-in' // Case fix,
    'ÇEVRIMIÇI KONTROL': 'online-check-in' // Case fix,
    'çevrimiçi kurs': 'online-course',
    'Çevrimiçi Kurs': 'online-course' // Case fix,
    'ÇEVRIMIÇI KURS': 'online-course' // Case fix,
    'çevrimiçi flört uygulaması': 'online-dating-app',
    'Çevrimiçi Flört Uygulaması': 'online-dating-app' // Case fix,
    'ÇEVRIMIÇI FLÖRT UYGULAMASI': 'online-dating-app' // Case fix,
    'çevrimiçi forum': 'online-forum',
    'Çevrimiçi Forum': 'online-forum' // Case fix,
    'ÇEVRIMIÇI FORUM': 'online-forum' // Case fix,
    'çevrimiçi oyun': 'online-game',
    'Çevrimiçi Oyun': 'online-game' // Case fix,
    'ÇEVRIMIÇI OYUN': 'online-game' // Case fix,
    'çevrimiçi öğrenme platformu': 'online-learning-platform',
    'Çevrimiçi Öğrenme Platformu': 'online-learning-platform' // Case fix,
    'ÇEVRIMIÇI ÖĞRENME PLATFORMU': 'online-learning-platform' // Case fix,
    'çevrimiçi i̇nceleme': 'online-review',
    'Çevrimiçi İnceleme': 'online-review' // Case fix,
    'ÇEVRIMIÇI İNCELEME': 'online-review' // Case fix,
    'çevrimiçi alışveriş sepeti': 'online-shopping-cart',
    'Çevrimiçi Alışveriş Sepeti': 'online-shopping-cart' // Case fix,
    'ÇEVRIMIÇI ALIŞVERIŞ SEPETI': 'online-shopping-cart' // Case fix,
    'çevrimiçi alışveriş': 'online-shopping',
    'Çevrimiçi Alışveriş': 'online-shopping' // Case fix,
    'ÇEVRIMIÇI ALIŞVERIŞ': 'online-shopping' // Case fix,
    'çevrimiçi yayınlama': 'online-streaming',
    'Çevrimiçi Yayınlama': 'online-streaming' // Case fix,
    'ÇEVRIMIÇI YAYINLAMA': 'online-streaming' // Case fix,
    'sera': 'orangery',
    'Sera': 'orangery' // Case fix,
    'orangutan': 'orangutan',
    'Orangutan': 'orangutan' // Case fix,
    'orkide': 'orchid',
    'Orkide': 'orchid' // Case fix,
    'ORKIDE': 'orchid' // Case fix,
    'sıra': 'order',
    'Sıra': 'order' // Case fix,
    'SIRA': 'order' // Case fix,
    'sipariş vermek': 'ordering',
    'Sipariş Vermek': 'ordering' // Case fix,
    'SIPARIŞ VERMEK': 'ordering' // Case fix,
    'organik meyve suyu': 'organic-juice',
    'Organik Meyve Suyu': 'organic-juice' // Case fix,
    'ORGANIK MEYVE SUYU': 'organic-juice' // Case fix,
    'organik salata': 'organic-salad',
    'Organik Salata': 'organic-salad' // Case fix,
    'ORGANIK SALATA': 'organic-salad' // Case fix,
    'organik smoothie': 'organic-smoothie',
    'Organik Smoothie': 'organic-smoothie' // Case fix,
    'ORGANIK SMOOTHIE': 'organic-smoothie' // Case fix,
    'organizasyon yapmak': 'organizing',
    'Organizasyon Yapmak': 'organizing' // Case fix,
    'ORGANIZASYON YAPMAK': 'organizing' // Case fix,
    'ormolu': 'ormolu',
    'Ormolu': 'ormolu' // Case fix,
    'ortocerus': 'orthoceras',
    'Ortocerus': 'orthoceras' // Case fix,
    'oryx': 'oryx',
    'Oryx': 'oryx' // Case fix,
    'devekuşu': 'ostrich',
    'Devekuşu': 'ostrich' // Case fix,
    'su samuru': 'otter',
    'Su samuru': 'otter' // Case fix,
    'ud': 'oud',
    'Ud': 'oud' // Case fix,
    'duymak': 'overhearing',
    'Duymak': 'overhearing' // Case fix,
    'üstgeçit': 'overpass',
    'Üstgeçit': 'overpass' // Case fix,
    'ÜSTGEÇIT': 'overpass' // Case fix,
    'üzerine büyük gelen kıyafet': 'oversized-clothes',
    'Üzerine büyük gelen kıyafet': 'oversized-clothes' // Case fix,
    'ÜZERINE BÜYÜK GELEN KIYAFET': 'oversized-clothes' // Case fix,
    'büyük beden kazak': 'oversized-sweater',
    'Büyük beden kazak': 'oversized-sweater' // Case fix,
    'geç kalmak ve önemli bir etkinliği kaçırmak': 'oversleeping-and-missing-an-important-event',
    'Geç kalmak ve önemli bir etkinliği kaçırmak': 'oversleeping-and-missing-an-important-event' // Case fix,
    'GEÇ KALMAK VE ÖNEMLI BIR ETKINLIĞI KAÇIRMAK': 'oversleeping-and-missing-an-important-event' // Case fix,
    'i̇stiridye': 'oyster',
    'İstiridye': 'oyster' // Case fix,
    'İSTIRIDYE': 'oyster' // Case fix,
    'paket': 'package',
    'Paket': 'package' // Case fix,
    'paketleme': 'packing',
    'Paketleme': 'packing' // Case fix,
    'pagoda': 'pagoda',
    'Pagoda': 'pagoda' // Case fix,
    'boya': 'paint',
    'Boya': 'paint' // Case fix,
    'palanquin': 'palanquin',
    'Palanquin': 'palanquin' // Case fix,
    'PALANQUIN': 'palanquin' // Case fix,
    'palimpsest': 'palimpsest',
    'Palimpsest': 'palimpsest' // Case fix,
    'PALIMPSEST': 'palimpsest' // Case fix,
    'pangolin': 'pangolin',
    'Pangolin': 'pangolin' // Case fix,
    'PANGOLIN': 'pangolin' // Case fix,
    'panoptikon': 'panopticon',
    'Panoptikon': 'panopticon' // Case fix,
    'PANOPTIKON': 'panopticon' // Case fix,
    'panter': 'panther',
    'Panter': 'panther' // Case fix,
    'kiler': 'pantry',
    'Kiler': 'pantry' // Case fix,
    'KILER': 'pantry' // Case fix,
    'papirüs': 'papyrus',
    'Papirüs': 'papyrus' // Case fix,
    'PAPIRÜS': 'papyrus' // Case fix,
    'paraşütle atlamak': 'parachuting',
    'Paraşütle Atlamak': 'parachuting' // Case fix,
    'otopark uygulaması': 'parking-app',
    'Otopark Uygulaması': 'parking-app' // Case fix,
    'OTOPARK UYGULAMASI': 'parking-app' // Case fix,
    'otopark': 'parking-garage',
    'Otopark': 'parking-garage' // Case fix,
    'parkmetre': 'parking-meter',
    'Parkmetre': 'parking-meter' // Case fix,
    'park etme': 'parking',
    'Park etme': 'parking' // Case fix,
    'hazırlıksız bir performansa katılmak': 'participating-in-a-performance-unprepared',
    'Hazırlıksız bir performansa katılmak': 'participating-in-a-performance-unprepared' // Case fix,
    'HAZIRLIKSIZ BIR PERFORMANSA KATILMAK': 'participating-in-a-performance-unprepared' // Case fix,
    'paşa': 'pasha',
    'Paşa': 'pasha' // Case fix,
    'geçmiş': 'past',
    'Geçmiş': 'past' // Case fix,
    'GEÇMIŞ': 'past' // Case fix,
    'makarna tabağı': 'pasta-dish',
    'Makarna Tabağı': 'pasta-dish' // Case fix,
    'MAKARNA TABAĞI': 'pasta-dish' // Case fix,
    'desen': 'pattern',
    'Desen': 'pattern' // Case fix,
    'kaldırım': 'pavement',
    'Kaldırım': 'pavement' // Case fix,
    'KALDIRIM': 'pavement' // Case fix,
    'pavyon': 'pavilion',
    'Pavyon': 'pavilion' // Case fix,
    'ödeme yapmak': 'paying',
    'Ödeme yapmak': 'paying' // Case fix,
    'tavus kuşu': 'peafowl',
    'Tavus kuşu': 'peafowl' // Case fix,
    'yaya köprüsü': 'pedestrian-bridge',
    'Yaya Köprüsü': 'pedestrian-bridge' // Case fix,
    'soyucu': 'peeler',
    'Soyucu': 'peeler' // Case fix,
    'pelikan': 'pelican',
    'Pelikan': 'pelican' // Case fix,
    'PELIKAN': 'pelican' // Case fix,
    'kalemlik': 'pencil-holder',
    'Kalemlik': 'pencil-holder' // Case fix,
    'KALEMLIK': 'pencil-holder' // Case fix,
    'şakayık': 'peony',
    'Şakayık': 'peony' // Case fix,
    'ŞAKAYIK': 'peony' // Case fix,
    'herkesin fısıldaşması': 'people-whispering',
    'Herkesin fısıldaşması': 'people-whispering' // Case fix,
    'HERKESIN FISILDAŞMASI': 'people-whispering' // Case fix,
    'karabiber değirmeni': 'pepper-grinder',
    'Karabiber Değirmeni': 'pepper-grinder' // Case fix,
    'KARABIBER DEĞIRMENI': 'pepper-grinder' // Case fix,
    'şahin': 'peregrine',
    'Şahin': 'peregrine' // Case fix,
    'ŞAHIN': 'peregrine' // Case fix,
    'parfüm': 'perfume',
    'Parfüm': 'perfume' // Case fix,
    'periskop': 'periscope',
    'Periskop': 'periscope' // Case fix,
    'PERISKOP': 'periscope' // Case fix,
    'çiğdem': 'periwinkle',
    'Çiğdem': 'periwinkle' // Case fix,
    'ÇIĞDEM': 'periwinkle' // Case fix,
    'kişisel i̇nsansız hava aracı': 'personal-drone',
    'Kişisel İnsansız Hava Aracı': 'personal-drone' // Case fix,
    'KIŞISEL İNSANSIZ HAVA ARACI': 'personal-drone' // Case fix,
    'kişisel helikopter': 'personal-helicopter',
    'Kişisel Helikopter': 'personal-helicopter' // Case fix,
    'KIŞISEL HELIKOPTER': 'personal-helicopter' // Case fix,
    'telefonun çalışmaması': 'phone-not-working',
    'Telefonun çalışmaması': 'phone-not-working' // Case fix,
    'TELEFONUN ÇALIŞMAMASI': 'phone-not-working' // Case fix,
    'fonograf': 'phonograph',
    'Fonograf': 'phonograph' // Case fix,
    'pibgorn': 'pibgorn',
    'Pibgorn': 'pibgorn' // Case fix,
    'PIBGORN': 'pibgorn' // Case fix,
    'kamyonet': 'pickup-truck',
    'Kamyonet': 'pickup-truck' // Case fix,
    'resim': 'picture',
    'Resim': 'picture' // Case fix,
    'RESIM': 'picture' // Case fix,
    'piyemonte': 'piedmont',
    'Piyemonte': 'piedmont' // Case fix,
    'PIYEMONTE': 'piedmont' // Case fix,
    'yastık kılıfı': 'pillowcase',
    'Yastık Kılıfı': 'pillowcase' // Case fix,
    'YASTIK KILIFI': 'pillowcase' // Case fix,
    'ananas': 'pineapple',
    'Ananas': 'pineapple' // Case fix,
    'çam kozalakları': 'pinecone',
    'Çam kozalakları': 'pinecone' // Case fix,
    'ÇAM KOZALAKLARI': 'pinecone' // Case fix,
    'zirve': 'pinnacle',
    'ZIRVE': 'pinnacle' // Case fix,
    'piksellik': 'pixel',
    'Piksellik': 'pixel' // Case fix,
    'PIKSELLIK': 'pixel' // Case fix,
    'pizza dilimi': 'pizza-slice',
    'Pizza Dilimi': 'pizza-slice' // Case fix,
    'PIZZA DILIMI': 'pizza-slice' // Case fix,
    'amerikan servis': 'placemat',
    'Amerikan Servis': 'placemat' // Case fix,
    'AMERIKAN SERVIS': 'placemat' // Case fix,
    'ekoseli gömlek': 'plaid-shirt',
    'Ekoseli Gömlek': 'plaid-shirt' // Case fix,
    'EKOSELI GÖMLEK': 'plaid-shirt' // Case fix,
    'gezegen': 'planet',
    'Gezegen': 'planet' // Case fix,
    'bitki bazlı protein': 'plant-based-protein',
    'Bitki bazlı protein': 'plant-based-protein' // Case fix,
    'BITKI BAZLI PROTEIN': 'plant-based-protein' // Case fix,
    'bitki bazlı sosis': 'plant-based-sausage',
    'Bitki Bazlı Sosis': 'plant-based-sausage' // Case fix,
    'BITKI BAZLI SOSIS': 'plant-based-sausage' // Case fix,
    'ekim': 'planting',
    'Ekim': 'planting' // Case fix,
    'EKIM': 'planting' // Case fix,
    'ornitorenk': 'platypus',
    'Ornitorenk': 'platypus' // Case fix,
    'ORNITORENK': 'platypus' // Case fix,
    'oyun alanı': 'playground',
    'Oyun alanı': 'playground' // Case fix,
    'OYUN ALANI': 'playground' // Case fix,
    'oyun oynamak': 'playing',
    'Oyun Oynamak': 'playing' // Case fix,
    'yalvarmak': 'pleading',
    'Yalvarmak': 'pleading' // Case fix,
    'podyum': 'plinth',
    'Podyum': 'plinth' // Case fix,
    'plumbob: ağırlık': 'plumbob',
    'Plumbob: Ağırlık': 'plumbob' // Case fix,
    'PLUMBOB: AĞIRLIK': 'plumbob' // Case fix,
    'pompa': 'plunger',
    'Pompa': 'plunger' // Case fix,
    'cep mendili': 'pocket-square',
    'Cep mendili': 'pocket-square' // Case fix,
    'CEP MENDILI': 'pocket-square' // Case fix,
    'podcast': 'podcast',
    'Podcast': 'podcast' // Case fix,
    'poke kasesi': 'poke-bowl',
    'Poke Kasesi': 'poke-bowl' // Case fix,
    'POKE KASESI': 'poke-bowl' // Case fix,
    'polka daması': 'polka-dot',
    'Polka daması': 'polka-dot' // Case fix,
    'POLKA DAMASI': 'polka-dot' // Case fix,
    'nar': 'pomegranate',
    'Nar': 'pomegranate' // Case fix,
    'pomelo': 'pomelo',
    'Pomelo': 'pomelo' // Case fix,
    'gölet': 'pond',
    'Gölet': 'pond' // Case fix,
    'açılır bildirim': 'pop-up-notification',
    'Açılır Bildirim': 'pop-up-notification' // Case fix,
    'AÇILIR BILDIRIM': 'pop-up-notification' // Case fix,
    'veranda': 'porch',
    'Veranda': 'porch' // Case fix,
    'porfir': 'porphyry',
    'Porfir': 'porphyry' // Case fix,
    'PORFIR': 'porphyry' // Case fix,
    'sırtlanbalığı': 'porpoise',
    'Sırtlanbalığı': 'porpoise' // Case fix,
    'SIRTLANBALIĞI': 'porpoise' // Case fix,
    'taşınabilir şarj aleti': 'portable-charger',
    'Taşınabilir Şarj Aleti': 'portable-charger' // Case fix,
    'TAŞINABILIR ŞARJ ALETI': 'portable-charger' // Case fix,
    'taşınabilir isıtıcı': 'portable-heater',
    'Taşınabilir Isıtıcı': 'portable-heater' // Case fix,
    'TAŞINABILIR ISITICI': 'portable-heater' // Case fix,
    'taşınabilir hoparlör': 'portable-speaker',
    'Taşınabilir Hoparlör': 'portable-speaker' // Case fix,
    'TAŞINABILIR HOPARLÖR': 'portable-speaker' // Case fix,
    'savaş kapısı': 'portcullis',
    'Savaş kapısı': 'portcullis' // Case fix,
    'SAVAŞ KAPISI': 'portcullis' // Case fix,
    'possum': 'possum',
    'Possum': 'possum' // Case fix,
    'çukur yol': 'pothole',
    'Çukur yol': 'pothole' // Case fix,
    'power bank': 'power-bank',
    'Power Bank': 'power-bank' // Case fix,
    'priz uzatma': 'power-strip',
    'Priz uzatma': 'power-strip' // Case fix,
    'PRIZ UZATMA': 'power-strip' // Case fix,
    'sunum slaytı': 'presentation-slide',
    'Sunum Slaytı': 'presentation-slide' // Case fix,
    'SUNUM SLAYTI': 'presentation-slide' // Case fix,
    'yazıcı': 'printer',
    'Yazıcı': 'printer' // Case fix,
    'YAZICI': 'printer' // Case fix,
    'prizma': 'prism',
    'Prizma': 'prism' // Case fix,
    'PRIZMA': 'prism' // Case fix,
    'profil resmi': 'profile-picture',
    'Profil Resmi': 'profile-picture' // Case fix,
    'PROFIL RESMI': 'profile-picture' // Case fix,
    'projektör': 'projector',
    'Projektör': 'projector' // Case fix,
    'teklif etmek': 'proposing',
    'Teklif Etmek': 'proposing' // Case fix,
    'TEKLIF ETMEK': 'proposing' // Case fix,
    'protein bar': 'protein-bar',
    'Protein Bar': 'protein-bar' // Case fix,
    'PROTEIN BAR': 'protein-bar' // Case fix,
    'protesto etmek': 'protesting',
    'Protesto Etmek': 'protesting' // Case fix,
    'pterodaktıl': 'pterodactyl',
    'Pterodaktıl': 'pterodactyl' // Case fix,
    'PTERODAKTIL': 'pterodactyl' // Case fix,
    'halk parkı': 'public-park',
    'Halk Parkı': 'public-park' // Case fix,
    'HALK PARKI': 'public-park' // Case fix,
    'halk protestosu': 'public-protest',
    'Halk Protestosu': 'public-protest' // Case fix,
    'kamusal çöp kutusu': 'public-trash-can',
    'Kamusal Çöp Kutusu': 'public-trash-can' // Case fix,
    'şişme ceket': 'puffer-jacket',
    'Şişme Ceket': 'puffer-jacket' // Case fix,
    'ŞIŞME CEKET': 'puffer-jacket' // Case fix,
    'fugu': 'pufferfish',
    'Fugu': 'pufferfish' // Case fix,
    'puffin': 'puffin',
    'Puffin': 'puffin' // Case fix,
    'PUFFIN': 'puffin' // Case fix,
    'puma': 'puma',
    'Puma': 'puma' // Case fix,
    'bildirim': 'push-notification',
    'Bildirim': 'push-notification' // Case fix,
    'BILDIRIM': 'push-notification' // Case fix,
    'qr kodu': 'qr-code',
    'QR Kodu': 'qr-code' // Case fix,
    'quagga': 'quagga',
    'Quagga': 'quagga' // Case fix,
    'kuasar': 'quasar',
    'Kuasar': 'quasar' // Case fix,
    'quetzal': 'quetzal',
    'Quetzal': 'quetzal' // Case fix,
    'ayva': 'quince',
    'Ayva': 'quince' // Case fix,
    'kinoalı kase': 'quinoa-bowl',
    'Kinoalı Kase': 'quinoa-bowl' // Case fix,
    'KINOALI KASE': 'quinoa-bowl' // Case fix,
    'kinoalı': 'quinoa',
    'Kinoalı': 'quinoa' // Case fix,
    'KINOALI': 'quinoa' // Case fix,
    'kipu': 'quipu',
    'Kipu': 'quipu' // Case fix,
    'KIPU': 'quipu' // Case fix,
    'ok çantası': 'quiver',
    'Ok çantası': 'quiver' // Case fix,
    'OK ÇANTASI': 'quiver' // Case fix,
    'köşe taşı': 'quoin',
    'Köşe taşı': 'quoin' // Case fix,
    'KÖŞE TAŞI': 'quoin' // Case fix,
    'quokka': 'quokka',
    'Quokka': 'quokka' // Case fix,
    'quoll': 'quoll',
    'Quoll': 'quoll' // Case fix,
    'rakun': 'raccoon',
    'Rakun': 'raccoon' // Case fix,
    'radyatör': 'radiator',
    'Radyatör': 'radiator' // Case fix,
    'geçmiş.': 'raincoat',
    'Geçmiş.': 'raincoat' // Case fix,
    'GEÇMIŞ.': 'raincoat' // Case fix,
    'ramen': 'ramen',
    'Ramen': 'ramen' // Case fix,
    'kılıç': 'rapier',
    'Kılıç': 'rapier' // Case fix,
    'KILIÇ': 'rapier' // Case fix,
    'hüseyinbaba': 'ratel',
    'Hüseyinbaba': 'ratel' // Case fix,
    'HÜSEYINBABA': 'ratel' // Case fix,
    'gecekuşu': 'raven',
    'Gecekuşu': 'raven' // Case fix,
    'jilet': 'razor',
    'Jilet': 'razor' // Case fix,
    'JILET': 'razor' // Case fix,
    'yeniden doğuş': 'rebirth',
    'Yeniden doğuş': 'rebirth' // Case fix,
    'YENIDEN DOĞUŞ': 'rebirth' // Case fix,
    'hediye almak': 'receiving-a-gift',
    'Hediye Almak': 'receiving-a-gift' // Case fix,
    'HEDIYE ALMAK': 'receiving-a-gift' // Case fix,
    'resepsiyon masası': 'reception-desk',
    'RESEPSIYON MASASI': 'reception-desk' // Case fix,
    'şarj i̇stasyonu': 'recharging-station',
    'Şarj İstasyonu': 'recharging-station' // Case fix,
    'geri dönüşüm kutusu': 'recycle-bin',
    'Geri Dönüşüm Kutusu': 'recycle-bin' // Case fix,
    'GERI DÖNÜŞÜM KUTUSU': 'recycle-bin' // Case fix,
    'geri dönüşüm kutusu': 'recycling-bin',
    'Geri Dönüşüm Kutusu': 'recycling-bin' // Case fix,
    'GERI DÖNÜŞÜM KUTUSU': 'recycling-bin' // Case fix,
    'geri dönüşüm': 'recycling',
    'Geri Dönüşüm': 'recycling' // Case fix,
    'GERI DÖNÜŞÜM': 'recycling' // Case fix,
    'kırmızı melek': 'red-angel',
    'Kırmızı melek': 'red-angel' // Case fix,
    'KIRMIZI MELEK': 'red-angel' // Case fix,
    'kırmızı bebek': 'red-baby',
    'Kırmızı bebek': 'red-baby' // Case fix,
    'KIRMIZI BEBEK': 'red-baby' // Case fix,
    'kırmızı ayı': 'red-bear',
    'Kırmızı ayı': 'red-bear' // Case fix,
    'KIRMIZI AYI': 'red-bear' // Case fix,
    'kırmızı kuş': 'red-bird',
    'Kırmızı kuş': 'red-bird' // Case fix,
    'KIRMIZI KUŞ': 'red-bird' // Case fix,
    'kırmızı kan': 'red-blood',
    'Kırmızı kan': 'red-blood' // Case fix,
    'KIRMIZI KAN': 'red-blood' // Case fix,
    'geçit köprüsü': 'red-bridge',
    'Geçit köprüsü': 'red-bridge' // Case fix,
    'GEÇIT KÖPRÜSÜ': 'red-bridge' // Case fix,
    'geçmişteki araba': 'red-car',
    'Geçmişteki araba': 'red-car' // Case fix,
    'GEÇMIŞTEKI ARABA': 'red-car' // Case fix,
    'kırmızı kedi': 'red-cat',
    'Kırmızı kedi': 'red-cat' // Case fix,
    'KIRMIZI KEDI': 'red-cat' // Case fix,
    'kırmızı ağlama': 'red-crying',
    'Kırmızı ağlama': 'red-crying' // Case fix,
    'KIRMIZI AĞLAMA': 'red-crying' // Case fix,
    'kırmızı dans etmek': 'red-dancing',
    'Kırmızı dans etmek': 'red-dancing' // Case fix,
    'KIRMIZI DANS ETMEK': 'red-dancing' // Case fix,
    'kırmızı ölüm': 'red-death',
    'Kırmızı ölüm': 'red-death' // Case fix,
    'KIRMIZI ÖLÜM': 'red-death' // Case fix,
    'kırmızı şeytan': 'red-demon',
    'Kırmızı şeytan': 'red-demon' // Case fix,
    'KIRMIZI ŞEYTAN': 'red-demon' // Case fix,
    'kırmızı köpek': 'red-dog',
    'Kırmızı köpek': 'red-dog' // Case fix,
    'KIRMIZI KÖPEK': 'red-dog' // Case fix,
    'kırmızı kapı': 'red-door',
    'Kırmızı kapı': 'red-door' // Case fix,
    'KIRMIZI KAPI': 'red-door' // Case fix,
    'kırmızı ejderha': 'red-dragon',
    'Kırmızı ejderha': 'red-dragon' // Case fix,
    'KIRMIZI EJDERHA': 'red-dragon' // Case fix,
    'kırmızı fil': 'red-elephant',
    'Kırmızı Fil': 'red-elephant' // Case fix,
    'KIRMIZI FIL': 'red-elephant' // Case fix,
    'kırmızı dövüş': 'red-fighting',
    'Kırmızı dövüş': 'red-fighting' // Case fix,
    'KIRMIZI DÖVÜŞ': 'red-fighting' // Case fix,
    'kırmızı ateş': 'red-fire',
    'Kırmızı ateş': 'red-fire' // Case fix,
    'KIRMIZI ATEŞ': 'red-fire' // Case fix,
    'kırmızı balık': 'red-fish',
    'Kırmızı balık': 'red-fish' // Case fix,
    'KIRMIZI BALIK': 'red-fish' // Case fix,
    'kırmızı uçan': 'red-flying',
    'Kırmızı uçan': 'red-flying' // Case fix,
    'KIRMIZI UÇAN': 'red-flying' // Case fix,
    'kırmızı hayalet': 'red-ghost',
    'Kırmızı hayalet': 'red-ghost' // Case fix,
    'KIRMIZI HAYALET': 'red-ghost' // Case fix,
    'kırmızı at': 'red-horse',
    'Kırmızı at': 'red-horse' // Case fix,
    'KIRMIZI AT': 'red-horse' // Case fix,
    'gecekondu': 'red-house',
    'Gecekondu': 'red-house' // Case fix,
    'kırmızı anahtar': 'red-key',
    'Kırmızı anahtar': 'red-key' // Case fix,
    'KIRMIZI ANAHTAR': 'red-key' // Case fix,
    'kırmızı bıçak': 'red-knife',
    'Kırmızı bıçak': 'red-knife' // Case fix,
    'KIRMIZI BIÇAK': 'red-knife' // Case fix,
    'kırmızı aslan': 'red-lion',
    'Kırmızı aslan': 'red-lion' // Case fix,
    'KIRMIZI ASLAN': 'red-lion' // Case fix,
    'kırmızı para': 'red-money',
    'Kırmızı para': 'red-money' // Case fix,
    'KIRMIZI PARA': 'red-money' // Case fix,
    'kırmızı dağ': 'red-mountain',
    'Kırmızı dağ': 'red-mountain' // Case fix,
    'KIRMIZI DAĞ': 'red-mountain' // Case fix,
    'kırmızı okyanus': 'red-ocean',
    'Kırmızı okyanus': 'red-ocean' // Case fix,
    'KIRMIZI OKYANUS': 'red-ocean' // Case fix,
    'kırmızı yağmur': 'red-rain',
    'Kırmızı yağmur': 'red-rain' // Case fix,
    'KIRMIZI YAĞMUR': 'red-rain' // Case fix,
    'kırmızı koşma': 'red-running',
    'Kırmızı koşma': 'red-running' // Case fix,
    'KIRMIZI KOŞMA': 'red-running' // Case fix,
    'kırmızı köpekbalığı': 'red-shark',
    'Kırmızı köpekbalığı': 'red-shark' // Case fix,
    'KIRMIZI KÖPEKBALIĞI': 'red-shark' // Case fix,
    'kırmızı yılan': 'red-snake',
    'Kırmızı yılan': 'red-snake' // Case fix,
    'KIRMIZI YILAN': 'red-snake' // Case fix,
    'kırmızı kar': 'red-snow',
    'Kırmızı kar': 'red-snow' // Case fix,
    'KIRMIZI KAR': 'red-snow' // Case fix,
    'kırmızı örümcek': 'red-spider',
    'Kırmızı örümcek': 'red-spider' // Case fix,
    'KIRMIZI ÖRÜMCEK': 'red-spider' // Case fix,
    'kırmızı merdivenler': 'red-stairs',
    'Kırmızı merdivenler': 'red-stairs' // Case fix,
    'KIRMIZI MERDIVENLER': 'red-stairs' // Case fix,
    'kırmızı fırtına': 'red-storm',
    'Kırmızı fırtına': 'red-storm' // Case fix,
    'KIRMIZI FIRTINA': 'red-storm' // Case fix,
    'kırmızı yüzme': 'red-swimming',
    'Kırmızı yüzme': 'red-swimming' // Case fix,
    'KIRMIZI YÜZME': 'red-swimming' // Case fix,
    'kırmızı dişlerin dökülmesi': 'red-teeth-falling-out',
    'Kırmızı Dişlerin Dökülmesi': 'red-teeth-falling-out' // Case fix,
    'KIRMIZI DIŞLERIN DÖKÜLMESI': 'red-teeth-falling-out' // Case fix,
    'kırmızı vampir': 'red-vampire',
    'Kırmızı vampir': 'red-vampire' // Case fix,
    'KIRMIZI VAMPIR': 'red-vampire' // Case fix,
    'kırmızı su': 'red-water',
    'Kırmızı su': 'red-water' // Case fix,
    'KIRMIZI SU': 'red-water' // Case fix,
    'kırmızı düğün': 'red-wedding',
    'Kırmızı düğün': 'red-wedding' // Case fix,
    'KIRMIZI DÜĞÜN': 'red-wedding' // Case fix,
    'gece yarısı': 'red-wolf',
    'Gece yarısı': 'red-wolf' // Case fix,
    'GECE YARISI': 'red-wolf' // Case fix,
    'kırmızı yara': 'red-wound',
    'Kırmızı yara': 'red-wound' // Case fix,
    'KIRMIZI YARA': 'red-wound' // Case fix,
    'kırmızı zombi': 'red-zombie',
    'Kırmızı Zombi': 'red-zombie' // Case fix,
    'KIRMIZI ZOMBI': 'red-zombie' // Case fix,
    'hatırlamak': 'remembering',
    'Hatırlamak': 'remembering' // Case fix,
    'HATIRLAMAK': 'remembering' // Case fix,
    'uzaktan kumanda': 'remote-control',
    'Uzaktan kumanda': 'remote-control' // Case fix,
    'uzaktan çalışma': 'remote-work',
    'Uzaktan Çalışma': 'remote-work' // Case fix,
    'UZAKTAN ÇALIŞMA': 'remote-work' // Case fix,
    'uzak': 'remote',
    'Uzak': 'remote' // Case fix,
    'bir hedefe ulaşmak için defalarca denemek ve başaramamak': 'repeatedly-trying-and-failing-to-reach-a-destination',
    'Bir hedefe ulaşmak için defalarca denemek ve başaramamak': 'repeatedly-trying-and-failing-to-reach-a-destination' // Case fix,
    'BIR HEDEFE ULAŞMAK IÇIN DEFALARCA DENEMEK VE BAŞARAMAMAK': 'repeatedly-trying-and-failing-to-reach-a-destination' // Case fix,
    'tekrarlama': 'repeating',
    'Tekrarlama': 'repeating' // Case fix,
    'kurtarmak': 'rescuing',
    'Kurtarmak': 'rescuing' // Case fix,
    'i̇stifa etmek': 'resigning',
    'İstifa Etmek': 'resigning' // Case fix,
    'İSTIFA ETMEK': 'resigning' // Case fix,
    'çocukluk arkadaşıyla yeniden buluşmak': 'reuniting-with-a-childhood-friend',
    'Çocukluk arkadaşıyla yeniden buluşmak': 'reuniting-with-a-childhood-friend' // Case fix,
    'ÇOCUKLUK ARKADAŞIYLA YENIDEN BULUŞMAK': 'reuniting-with-a-childhood-friend' // Case fix,
    'çocukluk arkadaşlarının versiyonlarıyla yeniden bir araya gelmek': 'reuniting-with-childhood-versions-of-friends',
    'Çocukluk arkadaşlarının versiyonlarıyla yeniden bir araya gelmek': 'reuniting-with-childhood-versions-of-friends' // Case fix,
    'ÇOCUKLUK ARKADAŞLARININ VERSIYONLARIYLA YENIDEN BIR ARAYA GELMEK': 'reuniting-with-childhood-versions-of-friends' // Case fix,
    'tekrar kullanılabilir çanta': 'reusable-bag',
    'Tekrar kullanılabilir çanta': 'reusable-bag' // Case fix,
    'TEKRAR KULLANILABILIR ÇANTA': 'reusable-bag' // Case fix,
    'çocukluk anısını déjà vu hissiyle yeniden yaşamak': 'revisiting-a-childhood-memory-with-a-sense-of-d-j-vu',
    'Çocukluk anısını déjà vu hissiyle yeniden yaşamak': 'revisiting-a-childhood-memory-with-a-sense-of-d-j-vu' // Case fix,
    'ÇOCUKLUK ANISINI DÉJÀ VU HISSIYLE YENIDEN YAŞAMAK': 'revisiting-a-childhood-memory-with-a-sense-of-d-j-vu' // Case fix,
    'rhea': 'rhea',
    'Rhea': 'rhea' // Case fix,
    'gergedan': 'rhino',
    'Gergedan': 'rhino' // Case fix,
    'pirinç pişirici': 'rice-cooker',
    'Pirinç pişirici': 'rice-cooker' // Case fix,
    'PIRINÇ PIŞIRICI': 'rice-cooker' // Case fix,
    'pirinc kağıdı ruloları': 'rice-paper-roll',
    'Pirinc Kağıdı Ruloları': 'rice-paper-roll' // Case fix,
    'PIRINC KAĞIDI RULOLARI': 'rice-paper-roll' // Case fix,
    'araç çağırma servisi': 'ride-hailing-service',
    'Araç çağırma servisi': 'ride-hailing-service' // Case fix,
    'ARAÇ ÇAĞIRMA SERVISI': 'ride-hailing-service' // Case fix,
    'paylaşım uygulaması': 'ride-share-app',
    'Paylaşım Uygulaması': 'ride-share-app' // Case fix,
    'PAYLAŞIM UYGULAMASI': 'ride-share-app' // Case fix,
    'paylaşımlı araç': 'ride-share',
    'Paylaşımlı Araç': 'ride-share' // Case fix,
    'PAYLAŞIMLI ARAÇ': 'ride-share' // Case fix,
    'araç paylaşım uygulaması': 'ride-sharing-app',
    'Araç paylaşım uygulaması': 'ride-sharing-app' // Case fix,
    'ARAÇ PAYLAŞIM UYGULAMASI': 'ride-sharing-app' // Case fix,
    'araç paylaşımı': 'ride-sharing',
    'Araç paylaşımı': 'ride-sharing' // Case fix,
    'ARAÇ PAYLAŞIMI': 'ride-sharing' // Case fix,
    'kırıcı testere': 'ripsaw',
    'Kırıcı testere': 'ripsaw' // Case fix,
    'KIRICI TESTERE': 'ripsaw' // Case fix,
    'robot süpürge': 'robot-vacuum',
    'Robot Süpürge': 'robot-vacuum' // Case fix,
    'gece kuşu': 'roc',
    'Gece kuşu': 'roc' // Case fix,
    'roket': 'rocket',
    'Roket': 'rocket' // Case fix,
    'rokoko': 'rococo',
    'Rokoko': 'rococo' // Case fix,
    'rulolu perde': 'roller-shutter',
    'Rulolu perde': 'roller-shutter' // Case fix,
    'oklava': 'rolling-pin',
    'Oklava': 'rolling-pin' // Case fix,
    'geçersiz': 'ronin',
    'Geçersiz': 'ronin' // Case fix,
    'GEÇERSIZ': 'ronin' // Case fix,
    'çatı bahçesi': 'rooftop-garden',
    'Çatı Bahçesi': 'rooftop-garden' // Case fix,
    'ÇATI BAHÇESI': 'rooftop-garden' // Case fix,
    'rorschach': 'rorschach',
    'Rorschach': 'rorschach' // Case fix,
    'çürük': 'rotten',
    'Çürük': 'rotten' // Case fix,
    'dönel kavşak': 'roundabout',
    'Dönel kavşak': 'roundabout' // Case fix,
    'kürek çekme': 'rowing',
    'Kürek çekme': 'rowing' // Case fix,
    'çöp kutusu': 'rubbish-bin',
    'Çöp Kutusu': 'rubbish-bin' // Case fix,
    'yıkım': 'ruin',
    'Yıkım': 'ruin' // Case fix,
    'YIKIM': 'ruin' // Case fix,
    'koşu taşı': 'runestone',
    'Koşu taşı': 'runestone' // Case fix,
    'KOŞU TAŞI': 'runestone' // Case fix,
    'bilinmeyen bir tehditten kaçmak': 'running-from-an-unknown-threat',
    'Bilinmeyen bir tehditten kaçmak': 'running-from-an-unknown-threat' // Case fix,
    'BILINMEYEN BIR TEHDITTEN KAÇMAK': 'running-from-an-unknown-threat' // Case fix,
    'yavaş hareketle koşmak': 'running-in-slow-motion',
    'Yavaş hareketle koşmak': 'running-in-slow-motion' // Case fix,
    'koşu ayakkabıları': 'running-shoes',
    'Koşu Ayakkabıları': 'running-shoes' // Case fix,
    'KOŞU AYAKKABILARI': 'running-shoes' // Case fix,
    'i̇lerleme kaydetmeden koşmak': 'running-without-making-progress',
    'İlerleme kaydetmeden koşmak': 'running-without-making-progress' // Case fix,
    'pas': 'rust',
    'Pas': 'rust' // Case fix,
    'şalgam': 'rutabaga',
    'Şalgam': 'rutabaga' // Case fix,
    'saguaro': 'saguaro',
    'Saguaro': 'saguaro' // Case fix,
    'yelken açma': 'sailing',
    'Yelken açma': 'sailing' // Case fix,
    'denizci': 'sailor',
    'Denizci': 'sailor' // Case fix,
    'DENIZCI': 'sailor' // Case fix,
    'salamandra': 'salamander',
    'Salamandra': 'salamander' // Case fix,
    'tuzluk': 'salt-shaker',
    'Tuzluk': 'salt-shaker' // Case fix,
    'selamlamak': 'saluting',
    'Selamlamak': 'saluting' // Case fix,
    'sambar': 'sambar',
    'Sambar': 'sambar' // Case fix,
    'semaver': 'samovar',
    'Semaver': 'samovar' // Case fix,
    'deniz börülcesi': 'samphire',
    'Deniz börülcesi': 'samphire' // Case fix,
    'DENIZ BÖRÜLCESI': 'samphire' // Case fix,
    'saola': 'saola',
    'Saola': 'saola' // Case fix,
    'sarong': 'sarong',
    'Sarong': 'sarong' // Case fix,
    'satir': 'satyr',
    'Satir': 'satyr' // Case fix,
    'SATIR': 'satyr' // Case fix,
    'birini kurtarmak': 'saving-someone',
    'Birini Kurtarmak': 'saving-someone' // Case fix,
    'BIRINI KURTARMAK': 'saving-someone' // Case fix,
    'sazerac': 'sazerac',
    'Sazerac': 'sazerac' // Case fix,
    'ölçek': 'scale',
    'Ölçek': 'scale' // Case fix,
    'tarayıcı': 'scanner',
    'Tarayıcı': 'scanner' // Case fix,
    'TARAYICI': 'scanner' // Case fix,
    'skarabey': 'scarab',
    'Skarabey': 'scarab' // Case fix,
    'skarabey': 'scarabaeus',
    'Skarabey': 'scarabaeus' // Case fix,
    'sultan sopası': 'scepter',
    'Sultan sopası': 'scepter' // Case fix,
    'SULTAN SOPASI': 'scepter' // Case fix,
    'bilim insanı': 'scientist',
    'Bilim insanı': 'scientist' // Case fix,
    'BILIM INSANI': 'scientist' // Case fix,
    'duvar lambası': 'sconce',
    'Duvar lambası': 'sconce' // Case fix,
    'DUVAR LAMBASI': 'sconce' // Case fix,
    'sconcheon kelimesinin türkçe karşılığı yoktur. ancak, "sconcheon" terimi genellikle tıbbi veya anatomik bir bağlamda kullanılır. eğer bağlamı belirtirseniz, daha uygun bir çeviri yapabilirim': 'sconcheon',
    'Sconcheon kelimesinin Türkçe karşılığı yoktur. Ancak, "sconcheon" terimi genellikle tıbbi veya anatomik bir bağlamda kullanılır. Eğer bağlamı belirtirseniz, daha uygun bir çeviri yapabilirim': 'sconcheon' // Case fix,
    'SCONCHEON KELIMESININ TÜRKÇE KARŞILIĞI YOKTUR. ANCAK, "SCONCHEON" TERIMI GENELLIKLE TIBBI VEYA ANATOMIK BIR BAĞLAMDA KULLANILIR. EĞER BAĞLAMI BELIRTIRSENIZ, DAHA UYGUN BIR ÇEVIRI YAPABILIRIM': 'sconcheon' // Case fix,
    'gözlem kasesi': 'scrying-bowl',
    'Gözlem Kasesi': 'scrying-bowl' // Case fix,
    'GÖZLEM KASESI': 'scrying-bowl' // Case fix,
    'döşeme odası': 'scullery',
    'Döşeme odası': 'scullery' // Case fix,
    'DÖŞEME ODASI': 'scullery' // Case fix,
    'deniz kestanesi': 'sea-urchin',
    'Deniz kestanesi': 'sea-urchin' // Case fix,
    'DENIZ KESTANESI': 'sea-urchin' // Case fix,
    'hippokampüs': 'seahorse',
    'Hippokampüs': 'seahorse' // Case fix,
    'HIPPOKAMPÜS': 'seahorse' // Case fix,
    'güvenlik kamerası': 'security-camera',
    'Güvenlik Kamerası': 'security-camera' // Case fix,
    'GÜVENLIK KAMERASI': 'security-camera' // Case fix,
    'tanıdık ama kim olduğunu bilemediğin bir yüz görmek': 'seeing-a-familiar-face-you-can-t-identify',
    'Tanıdık ama kim olduğunu bilemediğin bir yüz görmek': 'seeing-a-familiar-face-you-can-t-identify' // Case fix,
    'TANIDIK AMA KIM OLDUĞUNU BILEMEDIĞIN BIR YÜZ GÖRMEK': 'seeing-a-familiar-face-you-can-t-identify' // Case fix,
    'segway': 'segway',
    'Segway': 'segway' // Case fix,
    'kendin checkout': 'self-checkout',
    'Kendin Checkout': 'self-checkout' // Case fix,
    'KENDIN CHECKOUT': 'self-checkout' // Case fix,
    'otonom araç': 'self-driving-car',
    'Otonom Araç': 'self-driving-car' // Case fix,
    'selfie çubuğu': 'selfie-stick',
    'Selfie Çubuğu': 'selfie-stick' // Case fix,
    'SELFIE ÇUBUĞU': 'selfie-stick' // Case fix,
    'selfie': 'selfie',
    'Selfie': 'selfie' // Case fix,
    'SELFIE': 'selfie' // Case fix,
    'sinyal bayrağı': 'semaphore',
    'Sinyal bayrağı': 'semaphore' // Case fix,
    'SINYAL BAYRAĞI': 'semaphore' // Case fix,
    'geçmiş.': 'serape',
    'Geçmiş.': 'serape' // Case fix,
    'GEÇMIŞ.': 'serape' // Case fix,
    'seraf': 'seraph',
    'Seraf': 'seraph' // Case fix,
    'serow': 'serow',
    'Serow': 'serow' // Case fix,
    'serradella': 'serradella',
    'Serradella': 'serradella' // Case fix,
    'yerleşmek': 'settling',
    'Yerleşmek': 'settling' // Case fix,
    'sayı yedi (7)': 'seven',
    'Sayı Yedi (7)': 'seven' // Case fix,
    'SAYI YEDI (7)': 'seven' // Case fix,
    'dikiş': 'sewing',
    'Dikiş': 'sewing' // Case fix,
    'DIKIŞ': 'sewing' // Case fix,
    'sextant': 'sextant',
    'Sextant': 'sextant' // Case fix,
    'gölge gibi': 'shadowy',
    'Gölge gibi': 'shadowy' // Case fix,
    'GÖLGE GIBI': 'shadowy' // Case fix,
    'şampuan': 'shampoo',
    'Şampuan': 'shampoo' // Case fix,
    'şekil': 'shape',
    'Şekil': 'shape' // Case fix,
    'ŞEKIL': 'shape' // Case fix,
    'geçici barınak': 'shed',
    'Geçici barınak': 'shed' // Case fix,
    'GEÇICI BARINAK': 'shed' // Case fix,
    'raf': 'shelf',
    'Raf': 'shelf' // Case fix,
    'kalkan': 'shield',
    'Kalkan': 'shield' // Case fix,
    'şillelagh': 'shillelagh',
    'Şillelagh': 'shillelagh' // Case fix,
    'ŞILLELAGH': 'shillelagh' // Case fix,
    'parlak': 'shiny',
    'Parlak': 'shiny' // Case fix,
    'titremek': 'shivering',
    'Titremek': 'shivering' // Case fix,
    'TITREMEK': 'shivering' // Case fix,
    'ayakkabılık': 'shoerack',
    'Ayakkabılık': 'shoerack' // Case fix,
    'AYAKKABILIK': 'shoerack' // Case fix,
    'alışveriş merkezi': 'shopping-mall',
    'Alışveriş Merkezi': 'shopping-mall' // Case fix,
    'ALIŞVERIŞ MERKEZI': 'shopping-mall' // Case fix,
    'bağırmak ama kimse duymuyor': 'shouting-but-nobody-hears',
    'Bağırmak ama kimse duymuyor': 'shouting-but-nobody-hears' // Case fix,
    'BAĞIRMAK AMA KIMSE DUYMUYOR': 'shouting-but-nobody-hears' // Case fix,
    'bağırma': 'shouting',
    'Bağırma': 'shouting' // Case fix,
    'BAĞIRMA': 'shouting' // Case fix,
    'duş perdesi': 'shower-curtain',
    'Duş Perdesi': 'shower-curtain' // Case fix,
    'DUŞ PERDESI': 'shower-curtain' // Case fix,
    'kızılgerdan': 'shrike',
    'Kızılgerdan': 'shrike' // Case fix,
    'KIZILGERDAN': 'shrike' // Case fix,
    'karides': 'shrimp',
    'Karides': 'shrimp' // Case fix,
    'KARIDES': 'shrimp' // Case fix,
    'panjur': 'shutters',
    'Panjur': 'shutters' // Case fix,
    'yan sehpa': 'sideboard',
    'Yan Sehpa': 'sideboard' // Case fix,
    'kaldırım': 'sidewalk',
    'Kaldırım': 'sidewalk' // Case fix,
    'KALDIRIM': 'sidewalk' // Case fix,
    'eleğe': 'sieve',
    'Eleğe': 'sieve' // Case fix,
    'sembol': 'sigil',
    'Sembol': 'sigil' // Case fix,
    'sessizlik': 'silence',
    'Sessizlik': 'silence' // Case fix,
    'SESSIZLIK': 'silence' // Case fix,
    'lavabo': 'sink',
    'Lavabo': 'sink' // Case fix,
    'toprağa batmak': 'sinking-into-the-ground',
    'Toprağa Batmak': 'sinking-into-the-ground' // Case fix,
    'batma': 'sinking',
    'Batma': 'sinking' // Case fix,
    'denizkızı': 'siren',
    'Denizkızı': 'siren' // Case fix,
    'DENIZKIZI': 'siren' // Case fix,
    'sitar': 'sitar',
    'Sitar': 'sitar' // Case fix,
    'SITAR': 'sitar' // Case fix,
    'çizim yapmak': 'sketching',
    'Çizim Yapmak': 'sketching' // Case fix,
    'ÇIZIM YAPMAK': 'sketching' // Case fix,
    'dar jean': 'skinny-jeans',
    'Dar Jean': 'skinny-jeans' // Case fix,
    'sürekli': 'skunk',
    'Sürekli': 'skunk' // Case fix,
    'SÜREKLI': 'skunk' // Case fix,
    'gökdelen': 'skyscraper',
    'Gökdelen': 'skyscraper' // Case fix,
    'sürekli kaçmak ama yavaşlamak': 'slow-escape',
    'Sürekli kaçmak ama yavaşlamak': 'slow-escape' // Case fix,
    'SÜREKLI KAÇMAK AMA YAVAŞLAMAK': 'slow-escape' // Case fix,
    'kanalizasyon kapakları': 'sluice',
    'Kanalizasyon kapakları': 'sluice' // Case fix,
    'KANALIZASYON KAPAKLARI': 'sluice' // Case fix,
    'küçük melek': 'small-angel',
    'Küçük melek': 'small-angel' // Case fix,
    'küçük ayı': 'small-bear',
    'Küçük ayı': 'small-bear' // Case fix,
    'KÜÇÜK AYI': 'small-bear' // Case fix,
    'küçük kuş': 'small-bird',
    'Küçük kuş': 'small-bird' // Case fix,
    'küçük kan': 'small-blood',
    'Küçük kan': 'small-blood' // Case fix,
    'küçük köprü': 'small-bridge',
    'Küçük köprü': 'small-bridge' // Case fix,
    'küçük araba': 'small-car',
    'Küçük araba': 'small-car' // Case fix,
    'küçük kedi': 'small-cat',
    'Küçük kedi': 'small-cat' // Case fix,
    'KÜÇÜK KEDI': 'small-cat' // Case fix,
    'küçük ağlama': 'small-crying',
    'Küçük ağlama': 'small-crying' // Case fix,
    'küçük dans etmek': 'small-dancing',
    'Küçük dans etmek': 'small-dancing' // Case fix,
    'küçük ölüm': 'small-death',
    'Küçük ölüm': 'small-death' // Case fix,
    'küçük demon': 'small-demon',
    'Küçük demon': 'small-demon' // Case fix,
    'küçük köpek': 'small-dog',
    'Küçük köpek': 'small-dog' // Case fix,
    'küçük kapı': 'small-door',
    'Küçük kapı': 'small-door' // Case fix,
    'KÜÇÜK KAPI': 'small-door' // Case fix,
    'küçük ejderha': 'small-dragon',
    'Küçük ejderha': 'small-dragon' // Case fix,
    'fil yavrusu': 'small-elephant',
    'Fil yavrusu': 'small-elephant' // Case fix,
    'FIL YAVRUSU': 'small-elephant' // Case fix,
    'küçük dövüş': 'small-fighting',
    'Küçük dövüş': 'small-fighting' // Case fix,
    'küçük ateş': 'small-fire',
    'Küçük ateş': 'small-fire' // Case fix,
    'küçük balık': 'small-fish',
    'Küçük balık': 'small-fish' // Case fix,
    'KÜÇÜK BALIK': 'small-fish' // Case fix,
    'küçük uçan': 'small-flying',
    'Küçük uçan': 'small-flying' // Case fix,
    'ponny': 'small-horse',
    'Ponny': 'small-horse' // Case fix,
    'gecekondu': 'small-house',
    'Gecekondu': 'small-house' // Case fix,
    'aslan yavrusu': 'small-lion',
    'Aslan yavrusu': 'small-lion' // Case fix,
    'küçük para': 'small-money',
    'Küçük para': 'small-money' // Case fix,
    'küçük dağ': 'small-mountain',
    'Küçük dağ': 'small-mountain' // Case fix,
    'küçük okyanus': 'small-ocean',
    'Küçük okyanus': 'small-ocean' // Case fix,
    'hafif yağmur': 'small-rain',
    'Hafif yağmur': 'small-rain' // Case fix,
    'HAFIF YAĞMUR': 'small-rain' // Case fix,
    'küçük koşma': 'small-running',
    'Küçük koşma': 'small-running' // Case fix,
    'küçük köpekbalığı': 'small-shark',
    'Küçük köpekbalığı': 'small-shark' // Case fix,
    'KÜÇÜK KÖPEKBALIĞI': 'small-shark' // Case fix,
    'küçük yılan': 'small-snake',
    'Küçük yılan': 'small-snake' // Case fix,
    'KÜÇÜK YILAN': 'small-snake' // Case fix,
    'küçük kar': 'small-snow',
    'Küçük kar': 'small-snow' // Case fix,
    'küçük örümcek': 'small-spider',
    'Küçük örümcek': 'small-spider' // Case fix,
    'küçük merdivenler': 'small-stairs',
    'Küçük merdivenler': 'small-stairs' // Case fix,
    'KÜÇÜK MERDIVENLER': 'small-stairs' // Case fix,
    'küçük fırtına': 'small-storm',
    'Küçük fırtına': 'small-storm' // Case fix,
    'KÜÇÜK FIRTINA': 'small-storm' // Case fix,
    'küçük yüzme': 'small-swimming',
    'Küçük yüzme': 'small-swimming' // Case fix,
    'küçük dişlerin düşmesi': 'small-teeth-falling-out',
    'Küçük dişlerin düşmesi': 'small-teeth-falling-out' // Case fix,
    'KÜÇÜK DIŞLERIN DÜŞMESI': 'small-teeth-falling-out' // Case fix,
    'küçük vampir': 'small-vampire',
    'Küçük vampir': 'small-vampire' // Case fix,
    'KÜÇÜK VAMPIR': 'small-vampire' // Case fix,
    'küçük su': 'small-water',
    'Küçük su': 'small-water' // Case fix,
    'küçük düğün': 'small-wedding',
    'Küçük düğün': 'small-wedding' // Case fix,
    'küçük kurt': 'small-wolf',
    'Küçük kurt': 'small-wolf' // Case fix,
    'küçük yara': 'small-wound',
    'Küçük yara': 'small-wound' // Case fix,
    'küçük zombi': 'small-zombie',
    'Küçük zombi': 'small-zombie' // Case fix,
    'KÜÇÜK ZOMBI': 'small-zombie' // Case fix,
    'akıllı ampul': 'smart-bulb',
    'Akıllı Ampul': 'smart-bulb' // Case fix,
    'AKILLI AMPUL': 'smart-bulb' // Case fix,
    'akıllı durak': 'smart-bus-stop',
    'Akıllı Durak': 'smart-bus-stop' // Case fix,
    'AKILLI DURAK': 'smart-bus-stop' // Case fix,
    'akıllı araç': 'smart-car',
    'Akıllı Araç': 'smart-car' // Case fix,
    'AKILLI ARAÇ': 'smart-car' // Case fix,
    'akıllı kapı zili': 'smart-doorbell',
    'Akıllı Kapı Zili': 'smart-doorbell' // Case fix,
    'AKILLI KAPI ZILI': 'smart-doorbell' // Case fix,
    'akıllı gözlükler': 'smart-glasses',
    'Akıllı Gözlükler': 'smart-glasses' // Case fix,
    'AKILLI GÖZLÜKLER': 'smart-glasses' // Case fix,
    'akıllı ev cihazı': 'smart-home-device',
    'Akıllı Ev Cihazı': 'smart-home-device' // Case fix,
    'AKILLI EV CIHAZI': 'smart-home-device' // Case fix,
    'akıllı işık': 'smart-light',
    'Akıllı Işık': 'smart-light' // Case fix,
    'AKILLI IŞIK': 'smart-light' // Case fix,
    'akıllı kilit': 'smart-lock',
    'Akıllı Kilit': 'smart-lock' // Case fix,
    'AKILLI KILIT': 'smart-lock' // Case fix,
    'akıllı priz': 'smart-plug',
    'Akıllı Priz': 'smart-plug' // Case fix,
    'AKILLI PRIZ': 'smart-plug' // Case fix,
    'akıllı buzdolabı': 'smart-refrigerator',
    'Akıllı Buzdolabı': 'smart-refrigerator' // Case fix,
    'AKILLI BUZDOLABI': 'smart-refrigerator' // Case fix,
    'akıllı hoparlör': 'smart-speaker',
    'Akıllı Hoparlör': 'smart-speaker' // Case fix,
    'AKILLI HOPARLÖR': 'smart-speaker' // Case fix,
    'akıllı termostat': 'smart-thermostat',
    'Akıllı Termostat': 'smart-thermostat' // Case fix,
    'AKILLI TERMOSTAT': 'smart-thermostat' // Case fix,
    'akıllı trafik işığı': 'smart-traffic-light',
    'Akıllı Trafik Işığı': 'smart-traffic-light' // Case fix,
    'AKILLI TRAFIK IŞIĞI': 'smart-traffic-light' // Case fix,
    'akıllı tv': 'smart-tv',
    'Akıllı TV': 'smart-tv' // Case fix,
    'AKILLI TV': 'smart-tv' // Case fix,
    'akıllı telefon gps': 'smartphone-gps',
    'Akıllı telefon GPS': 'smartphone-gps' // Case fix,
    'AKILLI TELEFON GPS': 'smartphone-gps' // Case fix,
    'akıllı telefon navigasyonu': 'smartphone-navigation',
    'Akıllı telefon navigasyonu': 'smartphone-navigation' // Case fix,
    'AKILLI TELEFON NAVIGASYONU': 'smartphone-navigation' // Case fix,
    'akıllı telefon': 'smartphone',
    'Akıllı Telefon': 'smartphone' // Case fix,
    'AKILLI TELEFON': 'smartphone' // Case fix,
    'duman dedektörü': 'smoke-detector',
    'Duman Dedektörü': 'smoke-detector' // Case fix,
    'smoothie': 'smoothie',
    'Smoothie': 'smoothie' // Case fix,
    'SMOOTHIE': 'smoothie' // Case fix,
    'snapback': 'snapback',
    'Snapback': 'snapback' // Case fix,
    'snapdragon çiçeği': 'snapdragon',
    'Snapdragon çiçeği': 'snapdragon' // Case fix,
    'SNAPDRAGON ÇIÇEĞI': 'snapdragon' // Case fix,
    'spor çorapları': 'sneaker-socks',
    'Spor Çorapları': 'sneaker-socks' // Case fix,
    'SPOR ÇORAPLARI': 'sneaker-socks' // Case fix,
    'spor ayakkabı': 'sneakers',
    'Spor ayakkabı': 'sneakers' // Case fix,
    'SPOR AYAKKABI': 'sneakers' // Case fix,
    'horlamak': 'snoring',
    'Horlamak': 'snoring' // Case fix,
    'kar üzümü': 'snowberry',
    'Kar üzümü': 'snowberry' // Case fix,
    'sosyal medya uygulaması': 'social-media-app',
    'Sosyal Medya Uygulaması': 'social-media-app' // Case fix,
    'SOSYAL MEDYA UYGULAMASI': 'social-media-app' // Case fix,
    'sosyal medya akışı': 'social-media-feed',
    'Sosyal Medya Akışı': 'social-media-feed' // Case fix,
    'SOSYAL MEDYA AKIŞI': 'social-media-feed' // Case fix,
    'sosyal medya gönderisi': 'social-media-post',
    'Sosyal Medya Gönderisi': 'social-media-post' // Case fix,
    'SOSYAL MEDYA GÖNDERISI': 'social-media-post' // Case fix,
    'sosyal medya': 'social-media',
    'Sosyal Medya': 'social-media' // Case fix,
    'güneş paneli': 'solar-panel',
    'Güneş Paneli': 'solar-panel' // Case fix,
    'GÜNEŞ PANELI': 'solar-panel' // Case fix,
    'ekşi mayalı ekmek': 'sourdough-bread',
    'Ekşi mayalı ekmek': 'sourdough-bread' // Case fix,
    'EKŞI MAYALI EKMEK': 'sourdough-bread' // Case fix,
    'sousafon': 'sousaphone',
    'Sousafon': 'sousaphone' // Case fix,
    'parıltı': 'sparkle',
    'Parıltı': 'sparkle' // Case fix,
    'PARILTI': 'sparkle' // Case fix,
    'spatula': 'spatula',
    'Spatula': 'spatula' // Case fix,
    'hız botu': 'speedboat',
    'Hız botu': 'speedboat' // Case fix,
    'HIZ BOTU': 'speedboat' // Case fix,
    'sfenks': 'sphinx',
    'Sfenks': 'sphinx' // Case fix,
    'sfenks': 'sphynx',
    'Sfenks': 'sphynx' // Case fix,
    'i̇ğne': 'spindle',
    'İğne': 'spindle' // Case fix,
    'spinnaker': 'spinnaker',
    'Spinnaker': 'spinnaker' // Case fix,
    'SPINNAKER': 'spinnaker' // Case fix,
    'spiral -> sarmal': 'spiral',
    'Spiral -> Sarmal': 'spiral' // Case fix,
    'SPIRAL -> SARMAL': 'spiral' // Case fix,
    'spirograf': 'spirograph',
    'Spirograf': 'spirograph' // Case fix,
    'SPIROGRAF': 'spirograph' // Case fix,
    'eş (koca/karı)': 'spouse',
    'Eş (Koca/Karı)': 'spouse' // Case fix,
    'EŞ (KOCA/KARI)': 'spouse' // Case fix,
    'hesap tablosu': 'spreadsheet',
    'Hesap tablosu': 'spreadsheet' // Case fix,
    'gececi': 'spy',
    'Gececi': 'spy' // Case fix,
    'GECECI': 'spy' // Case fix,
    'kare': 'square',
    'Kare': 'square' // Case fix,
    'mürekkep balığı (kalamar)': 'squid',
    'Mürekkep Balığı (Kalamar)': 'squid' // Case fix,
    'MÜREKKEP BALIĞI (KALAMAR)': 'squid' // Case fix,
    'stalaktit': 'stalagmite',
    'Stalaktit': 'stalagmite' // Case fix,
    'STALAKTIT': 'stalagmite' // Case fix,
    'mühür': 'stamp',
    'Mühür': 'stamp' // Case fix,
    'deniz yıldızı': 'starfish',
    'Deniz yıldızı': 'starfish' // Case fix,
    'DENIZ YILDIZI': 'starfish' // Case fix,
    'girişim ofisi': 'startup-office',
    'Girişim Ofisi': 'startup-office' // Case fix,
    'GIRIŞIM OFISI': 'startup-office' // Case fix,
    'girişim': 'startup',
    'Girişim': 'startup' // Case fix,
    'GIRIŞIM': 'startup' // Case fix,
    'durum güncellemesi': 'status-update',
    'Durum Güncellemesi': 'status-update' // Case fix,
    'DURUM GÜNCELLEMESI': 'status-update' // Case fix,
    'yapışkan not': 'sticky-note',
    'Yapışkan Not': 'sticky-note' // Case fix,
    'YAPIŞKAN NOT': 'sticky-note' // Case fix,
    'depolama kutusu': 'storage-box',
    'Depolama Kutusu': 'storage-box' // Case fix,
    'ocak': 'stove',
    'Ocak': 'stove' // Case fix,
    'akış cihazı': 'streaming-device',
    'Akış Cihazı': 'streaming-device' // Case fix,
    'AKIŞ CIHAZI': 'streaming-device' // Case fix,
    'akış servisi': 'streaming-service',
    'Akış Servisi': 'streaming-service' // Case fix,
    'AKIŞ SERVISI': 'streaming-service' // Case fix,
    'akış aboneliği': 'streaming-subscription',
    'Akış Aboneliği': 'streaming-subscription' // Case fix,
    'AKIŞ ABONELIĞI': 'streaming-subscription' // Case fix,
    'sokak sanatı': 'street-art',
    'Sokak Sanatı': 'street-art' // Case fix,
    'SOKAK SANATI': 'street-art' // Case fix,
    'sokak yemeği arabası': 'street-food-cart',
    'Sokak Yemeği Arabası': 'street-food-cart' // Case fix,
    'SOKAK YEMEĞI ARABASI': 'street-food-cart' // Case fix,
    'sokak yemeği': 'street-food',
    'Sokak Yemeği': 'street-food' // Case fix,
    'SOKAK YEMEĞI': 'street-food' // Case fix,
    'sokak lambası': 'street-lamp',
    'Sokak Lambası': 'street-lamp' // Case fix,
    'SOKAK LAMBASI': 'street-lamp' // Case fix,
    'sokak performansı': 'street-performance',
    'Sokak Performansı': 'street-performance' // Case fix,
    'SOKAK PERFORMANSI': 'street-performance' // Case fix,
    'sokak sanatçısı': 'street-performer',
    'Sokak Sanatçısı': 'street-performer' // Case fix,
    'SOKAK SANATÇISI': 'street-performer' // Case fix,
    'sokak tabelası': 'street-sign',
    'Sokak Tabelası': 'street-sign' // Case fix,
    'SOKAK TABELASI': 'street-sign' // Case fix,
    'sokak satıcısı': 'street-vendor',
    'Sokak Satıcısı': 'street-vendor' // Case fix,
    'SOKAK SATICISI': 'street-vendor' // Case fix,
    'sokak lambası': 'streetlight',
    'Sokak lambası': 'streetlight' // Case fix,
    'SOKAK LAMBASI': 'streetlight' // Case fix,
    'vurmak': 'striking',
    'Vurmak': 'striking' // Case fix,
    'çizgili': 'striped',
    'Çizgili': 'striped' // Case fix,
    'ÇIZGILI': 'striped' // Case fix,
    'durmaksızın bir güce karşı mücadele etmek': 'struggling-against-an-unstoppable-force',
    'Durmaksızın bir güce karşı mücadele etmek': 'struggling-against-an-unstoppable-force' // Case fix,
    'DURMAKSIZIN BIR GÜCE KARŞI MÜCADELE ETMEK': 'struggling-against-an-unstoppable-force' // Case fix,
    'mücadele etmek': 'struggling',
    'Mücadele Etmek': 'struggling' // Case fix,
    'tekrar eden bir döngüde sıkışmak': 'stuck-in-a-repeating-loop',
    'Tekrar eden bir döngüde sıkışmak': 'stuck-in-a-repeating-loop' // Case fix,
    'TEKRAR EDEN BIR DÖNGÜDE SIKIŞMAK': 'stuck-in-a-repeating-loop' // Case fix,
    'geometri': 'stupa',
    'Geometri': 'stupa' // Case fix,
    'GEOMETRI': 'stupa' // Case fix,
    'stylus': 'stylus',
    'Stylus': 'stylus' // Case fix,
    'abonelik kutusu': 'subscription-box',
    'Abonelik Kutusu': 'subscription-box' // Case fix,
    'ABONELIK KUTUSU': 'subscription-box' // Case fix,
    'abonelik': 'subscription',
    'Abonelik': 'subscription' // Case fix,
    'ABONELIK': 'subscription' // Case fix,
    'metro vagonu': 'subway-car',
    'Metro Vagonu': 'subway-car' // Case fix,
    'metro haritası': 'subway-map',
    'Metro Haritası': 'subway-map' // Case fix,
    'METRO HARITASI': 'subway-map' // Case fix,
    'metro turnikesi': 'subway-turnstile',
    'Metro Turnikesi': 'subway-turnstile' // Case fix,
    'METRO TURNIKESI': 'subway-turnstile' // Case fix,
    'geç kaldığını aniden fark etmek': 'sudden-realization-of-being-late',
    'Geç kaldığını aniden fark etmek': 'sudden-realization-of-being-late' // Case fix,
    'GEÇ KALDIĞINI ANIDEN FARK ETMEK': 'sudden-realization-of-being-late' // Case fix,
    'aniden hızlıca yaşlanmak': 'suddenly-aging-rapidly',
    'Aniden hızlıca yaşlanmak': 'suddenly-aging-rapidly' // Case fix,
    'ANIDEN HIZLICA YAŞLANMAK': 'suddenly-aging-rapidly' // Case fix,
    'aniden okumayı unuttuğunu hissetmek': 'suddenly-forgetting-how-to-read',
    'Aniden okumayı unuttuğunu hissetmek': 'suddenly-forgetting-how-to-read' // Case fix,
    'ANIDEN OKUMAYI UNUTTUĞUNU HISSETMEK': 'suddenly-forgetting-how-to-read' // Case fix,
    'aniden olağanüstü bir güç kazanmak': 'suddenly-gaining-extraordinary-strength',
    'Aniden olağanüstü bir güç kazanmak': 'suddenly-gaining-extraordinary-strength' // Case fix,
    'ANIDEN OLAĞANÜSTÜ BIR GÜÇ KAZANMAK': 'suddenly-gaining-extraordinary-strength' // Case fix,
    'aniden önemli bir sorumluluğun farkına varmak': 'suddenly-realizing-an-important-responsibility',
    'Aniden önemli bir sorumluluğun farkına varmak': 'suddenly-realizing-an-important-responsibility' // Case fix,
    'ANIDEN ÖNEMLI BIR SORUMLULUĞUN FARKINA VARMAK': 'suddenly-realizing-an-important-responsibility' // Case fix,
    'aniden yanlış yerde olduğunuzu fark etmek': 'suddenly-realizing-you-re-in-the-wrong-place',
    'Aniden yanlış yerde olduğunuzu fark etmek': 'suddenly-realizing-you-re-in-the-wrong-place' // Case fix,
    'ANIDEN YANLIŞ YERDE OLDUĞUNUZU FARK ETMEK': 'suddenly-realizing-you-re-in-the-wrong-place' // Case fix,
    'aniden yeni bir dil konuşmak': 'suddenly-speaking-a-new-language',
    'Aniden yeni bir dil konuşmak': 'suddenly-speaking-a-new-language' // Case fix,
    'ANIDEN YENI BIR DIL KONUŞMAK': 'suddenly-speaking-a-new-language' // Case fix,
    'çağırmak': 'summoning',
    'Çağırmak': 'summoning' // Case fix,
    'ÇAĞIRMAK': 'summoning' // Case fix,
    'güneş saati': 'sundial',
    'Güneş saati': 'sundial' // Case fix,
    'GÜNEŞ SAATI': 'sundial' // Case fix,
    'gözetleme i̇nsansız hava aracı': 'surveillance-drone',
    'Gözetleme İnsansız Hava Aracı': 'surveillance-drone' // Case fix,
    'GÖZETLEME İNSANSIZ HAVA ARACI': 'surveillance-drone' // Case fix,
    'sushi': 'sushi',
    'Sushi': 'sushi' // Case fix,
    'SUSHI': 'sushi' // Case fix,
    'terlemek': 'sweating',
    'Terlemek': 'sweating' // Case fix,
    'güçlü bir akıntıya karşı yüzmek': 'swimming-against-a-strong-current',
    'Güçlü bir akıntıya karşı yüzmek': 'swimming-against-a-strong-current' // Case fix,
    'GÜÇLÜ BIR AKINTIYA KARŞI YÜZMEK': 'swimming-against-a-strong-current' // Case fix,
    'yüzme havuzu': 'swimming-pool',
    'Yüzme havuzu': 'swimming-pool' // Case fix,
    'kartı kaydırmak': 'swipe-card',
    'Kartı kaydırmak': 'swipe-card' // Case fix,
    'KARTI KAYDIRMAK': 'swipe-card' // Case fix,
    'kılıç': 'sword',
    'Kılıç': 'sword' // Case fix,
    'KILIÇ': 'sword' // Case fix,
    'senkronizasyon': 'synchronizing',
    'Senkronizasyon': 'synchronizing' // Case fix,
    'SENKRONIZASYON': 'synchronizing' // Case fix,
    'masa örtüsü': 'tablecloth',
    'Masa örtüsü': 'tablecloth' // Case fix,
    'tablet tutucu': 'tablet-stand',
    'Tablet Tutucu': 'tablet-stand' // Case fix,
    'tako': 'tacos',
    'Tako': 'tacos' // Case fix,
    'tajin': 'tajine',
    'Tajin': 'tajine' // Case fix,
    'TAJIN': 'tajine' // Case fix,
    'konuşan melek': 'talking-angel',
    'Konuşan melek': 'talking-angel' // Case fix,
    'konuşan bebek': 'talking-baby',
    'Konuşan bebek': 'talking-baby' // Case fix,
    'konuşan ayı': 'talking-bear',
    'Konuşan ayı': 'talking-bear' // Case fix,
    'KONUŞAN AYI': 'talking-bear' // Case fix,
    'konuşan kuş': 'talking-bird',
    'Konuşan kuş': 'talking-bird' // Case fix,
    'konuşan kan': 'talking-blood',
    'Konuşan kan': 'talking-blood' // Case fix,
    'konuşan köprü': 'talking-bridge',
    'Konuşan köprü': 'talking-bridge' // Case fix,
    'konuşan araba': 'talking-car',
    'Konuşan araba': 'talking-car' // Case fix,
    'konuşan kedi': 'talking-cat',
    'Konuşan kedi': 'talking-cat' // Case fix,
    'KONUŞAN KEDI': 'talking-cat' // Case fix,
    'ağlayan konuşma': 'talking-crying',
    'Ağlayan konuşma': 'talking-crying' // Case fix,
    'konuşan dans': 'talking-dancing',
    'Konuşan dans': 'talking-dancing' // Case fix,
    'konuşan ölüm': 'talking-death',
    'Konuşan ölüm': 'talking-death' // Case fix,
    'konuşan demon': 'talking-demon',
    'Konuşan demon': 'talking-demon' // Case fix,
    'konuşan köpek': 'talking-dog',
    'Konuşan köpek': 'talking-dog' // Case fix,
    'konuşan kapı': 'talking-door',
    'Konuşan kapı': 'talking-door' // Case fix,
    'KONUŞAN KAPI': 'talking-door' // Case fix,
    'konuşan ejderha': 'talking-dragon',
    'Konuşan ejderha': 'talking-dragon' // Case fix,
    'konuşan fil': 'talking-elephant',
    'Konuşan fil': 'talking-elephant' // Case fix,
    'KONUŞAN FIL': 'talking-elephant' // Case fix,
    'konuşarak kavga etmek': 'talking-fighting',
    'Konuşarak kavga etmek': 'talking-fighting' // Case fix,
    'konuşan ateş': 'talking-fire',
    'Konuşan ateş': 'talking-fire' // Case fix,
    'konuşan balık': 'talking-fish',
    'Konuşan balık': 'talking-fish' // Case fix,
    'KONUŞAN BALIK': 'talking-fish' // Case fix,
    'konuşan uçuş': 'talking-flying',
    'Konuşan uçuş': 'talking-flying' // Case fix,
    'konuşan hayalet': 'talking-ghost',
    'Konuşan hayalet': 'talking-ghost' // Case fix,
    'konuşan at': 'talking-horse',
    'Konuşan at': 'talking-horse' // Case fix,
    'konuşan ev': 'talking-house',
    'Konuşan ev': 'talking-house' // Case fix,
    'konuşan anahtar': 'talking-key',
    'Konuşan anahtar': 'talking-key' // Case fix,
    'konuşan bıçak': 'talking-knife',
    'Konuşan bıçak': 'talking-knife' // Case fix,
    'KONUŞAN BIÇAK': 'talking-knife' // Case fix,
    'konuşan aslan': 'talking-lion',
    'Konuşan aslan': 'talking-lion' // Case fix,
    'konuşan para': 'talking-money',
    'Konuşan para': 'talking-money' // Case fix,
    'konuşan dağ': 'talking-mountain',
    'Konuşan dağ': 'talking-mountain' // Case fix,
    'konuşan okyanus': 'talking-ocean',
    'Konuşan okyanus': 'talking-ocean' // Case fix,
    'konuşan yağmur': 'talking-rain',
    'Konuşan yağmur': 'talking-rain' // Case fix,
    'koşan konuşma': 'talking-running',
    'Koşan konuşma': 'talking-running' // Case fix,
    'konuşan köpekbalığı': 'talking-shark',
    'Konuşan köpekbalığı': 'talking-shark' // Case fix,
    'KONUŞAN KÖPEKBALIĞI': 'talking-shark' // Case fix,
    'konuşan yılan': 'talking-snake',
    'Konuşan yılan': 'talking-snake' // Case fix,
    'KONUŞAN YILAN': 'talking-snake' // Case fix,
    'konuşan kar': 'talking-snow',
    'Konuşan kar': 'talking-snow' // Case fix,
    'konuşan örümcek': 'talking-spider',
    'Konuşan örümcek': 'talking-spider' // Case fix,
    'konuşan merdivenler': 'talking-stairs',
    'Konuşan merdivenler': 'talking-stairs' // Case fix,
    'KONUŞAN MERDIVENLER': 'talking-stairs' // Case fix,
    'konuşan fırtına': 'talking-storm',
    'Konuşan fırtına': 'talking-storm' // Case fix,
    'KONUŞAN FIRTINA': 'talking-storm' // Case fix,
    'konuşan yüzme': 'talking-swimming',
    'Konuşan yüzme': 'talking-swimming' // Case fix,
    'konuşan dişlerin düşmesi': 'talking-teeth-falling-out',
    'Konuşan dişlerin düşmesi': 'talking-teeth-falling-out' // Case fix,
    'KONUŞAN DIŞLERIN DÜŞMESI': 'talking-teeth-falling-out' // Case fix,
    'konuşan vampir': 'talking-vampire',
    'Konuşan vampir': 'talking-vampire' // Case fix,
    'KONUŞAN VAMPIR': 'talking-vampire' // Case fix,
    'konuşan su': 'talking-water',
    'Konuşan su': 'talking-water' // Case fix,
    'konuşan düğün': 'talking-wedding',
    'Konuşan düğün': 'talking-wedding' // Case fix,
    'konuşan kurt': 'talking-wolf',
    'Konuşan kurt': 'talking-wolf' // Case fix,
    'konuşan yara': 'talking-wound',
    'Konuşan yara': 'talking-wound' // Case fix,
    'konuşan zombi': 'talking-zombie',
    'Konuşan zombi': 'talking-zombie' // Case fix,
    'KONUŞAN ZOMBI': 'talking-zombie' // Case fix,
    'tamarillo': 'tamarillo',
    'Tamarillo': 'tamarillo' // Case fix,
    'TAMARILLO': 'tamarillo' // Case fix,
    'tamarin': 'tamarin',
    'Tamarin': 'tamarin' // Case fix,
    'TAMARIN': 'tamarin' // Case fix,
    'tamarind': 'tamarind',
    'Tamarind': 'tamarind' // Case fix,
    'TAMARIND': 'tamarind' // Case fix,
    'tambur': 'tambour',
    'Tambur': 'tambour' // Case fix,
    'darbuka': 'tambourine',
    'Darbuka': 'tambourine' // Case fix,
    'tangram': 'tangram',
    'Tangram': 'tangram' // Case fix,
    'tanuki': 'tanuki',
    'Tanuki': 'tanuki' // Case fix,
    'TANUKI': 'tanuki' // Case fix,
    'tapas': 'tapas',
    'Tapas': 'tapas' // Case fix,
    'tapir': 'tapir',
    'Tapir': 'tapir' // Case fix,
    'TAPIR': 'tapir' // Case fix,
    'tarsier': 'tarsier',
    'Tarsier': 'tarsier' // Case fix,
    'TARSIER': 'tarsier' // Case fix,
    'görev listesi': 'task-list',
    'Görev Listesi': 'task-list' // Case fix,
    'GÖREV LISTESI': 'task-list' // Case fix,
    'taksi durağı': 'taxi-stand',
    'Taksi Durağı': 'taxi-stand' // Case fix,
    'TAKSI DURAĞI': 'taxi-stand' // Case fix,
    'çay bezi': 'tea-towel',
    'Çay Bezi': 'tea-towel' // Case fix,
    'ÇAY BEZI': 'tea-towel' // Case fix,
    'öğretim': 'teaching',
    'Öğretim': 'teaching' // Case fix,
    'ÖĞRETIM': 'teaching' // Case fix,
    'teknoloji eldivenleri': 'tech-gloves',
    'Teknoloji Eldivenleri': 'tech-gloves' // Case fix,
    'TEKNOLOJI ELDIVENLERI': 'tech-gloves' // Case fix,
    'teknoloji ceketi': 'tech-jacket',
    'Teknoloji Ceketi': 'tech-jacket' // Case fix,
    'TEKNOLOJI CEKETI': 'tech-jacket' // Case fix,
    'teknik özellikler': 'tech-specs',
    'Teknik Özellikler': 'tech-specs' // Case fix,
    'TEKNIK ÖZELLIKLER': 'tech-specs' // Case fix,
    'dişlerin dağılması': 'teeth-crumbling',
    'Dişlerin dağılması': 'teeth-crumbling' // Case fix,
    'DIŞLERIN DAĞILMASI': 'teeth-crumbling' // Case fix,
    'telekonferans': 'teleconference',
    'Telekonferans': 'teleconference' // Case fix,
    'tele sağlık': 'telehealth',
    'Tele sağlık': 'telehealth' // Case fix,
    'TELE SAĞLIK': 'telehealth' // Case fix,
    'işınlanmak': 'teleporting',
    'Işınlanmak': 'teleporting' // Case fix,
    'IŞINLANMAK': 'teleporting' // Case fix,
    'teleskop': 'telescope',
    'Teleskop': 'telescope' // Case fix,
    'çadır': 'tent',
    'Çadır': 'tent' // Case fix,
    'ÇADIR': 'tent' // Case fix,
    'teraryum': 'terrarium',
    'Teraryum': 'terrarium' // Case fix,
    'tesla bobini': 'tesla-coil',
    'Tesla Bobini': 'tesla-coil' // Case fix,
    'TESLA BOBINI': 'tesla-coil' // Case fix,
    'tesla': 'tesla',
    'Tesla': 'tesla' // Case fix,
    'mozaikleme': 'tessellation',
    'Mozaikleme': 'tessellation' // Case fix,
    'MOZAIKLEME': 'tessellation' // Case fix,
    'mesaj': 'text-message',
    'Mesaj': 'text-message' // Case fix,
    'theremin': 'theremin',
    'Theremin': 'theremin' // Case fix,
    'THEREMIN': 'theremin' // Case fix,
    'termostat': 'thermostat',
    'Termostat': 'thermostat' // Case fix,
    'dikiş ipi': 'thread',
    'Dikiş ipi': 'thread' // Case fix,
    'DIKIŞ IPI': 'thread' // Case fix,
    'sayı üç (3)': 'three',
    'Sayı Üç (3)': 'three' // Case fix,
    'SAYI ÜÇ (3)': 'three' // Case fix,
    'boğaz': 'throat',
    'Boğaz': 'throat' // Case fix,
    'taht': 'throne',
    'Taht': 'throne' // Case fix,
    'gök gürültüsü': 'thunder',
    'Gök gürültüsü': 'thunder' // Case fix,
    'tütsü kabı': 'thurible',
    'Tütsü kabı': 'thurible' // Case fix,
    'TÜTSÜ KABI': 'thurible' // Case fix,
    'tazmanya kaplanı': 'thylacine',
    'Tazmanya kaplanı': 'thylacine' // Case fix,
    'TAZMANYA KAPLANI': 'thylacine' // Case fix,
    'zamanın geriye gitmesi': 'time-moving-backwards',
    'Zamanın geriye gitmesi': 'time-moving-backwards' // Case fix,
    'ZAMANIN GERIYE GITMESI': 'time-moving-backwards' // Case fix,
    'zamanın çok hızlı geçmesi': 'time-moving-too-quickly',
    'Zamanın çok hızlı geçmesi': 'time-moving-too-quickly' // Case fix,
    'ZAMANIN ÇOK HIZLI GEÇMESI': 'time-moving-too-quickly' // Case fix,
    'Zaman': 'time' // Case fix,
    'timpani': 'timpani',
    'Timpani': 'timpani' // Case fix,
    'TIMPANI': 'timpani' // Case fix,
    'küçük': 'tiny',
    'Küçük': 'tiny' // Case fix,
    'bitki çayı': 'tisane',
    'Bitki çayı': 'tisane' // Case fix,
    'BITKI ÇAYI': 'tisane' // Case fix,
    'tost makinesi': 'toaster',
    'Tost makinesi': 'toaster' // Case fix,
    'TOST MAKINESI': 'toaster' // Case fix,
    'kayağı': 'toboggan',
    'Kayağı': 'toboggan' // Case fix,
    'KAYAĞI': 'toboggan' // Case fix,
    'tuvalet fırçası': 'toilet-brush',
    'Tuvalet Fırçası': 'toilet-brush' // Case fix,
    'TUVALET FIRÇASI': 'toilet-brush' // Case fix,
    'tuvalet kağıdı': 'toilet-paper',
    'Tuvalet kağıdı': 'toilet-paper' // Case fix,
    'TUVALET KAĞIDI': 'toilet-paper' // Case fix,
    'ücretli geçiş noktası': 'toll-booth',
    'Ücretli geçiş noktası': 'toll-booth' // Case fix,
    'ÜCRETLI GEÇIŞ NOKTASI': 'toll-booth' // Case fix,
    'diş fırçası': 'toothbrush',
    'Diş fırçası': 'toothbrush' // Case fix,
    'DIŞ FIRÇASI': 'toothbrush' // Case fix,
    'diş macunu': 'toothpaste',
    'Diş macunu': 'toothpaste' // Case fix,
    'DIŞ MACUNU': 'toothpaste' // Case fix,
    'topaz': 'topaz',
    'Topaz': 'topaz' // Case fix,
    'şekil verilmiş bitki': 'topiary',
    'Şekil verilmiş bitki': 'topiary' // Case fix,
    'ŞEKIL VERILMIŞ BITKI': 'topiary' // Case fix,
    'kaplumbağa kabuğu': 'tortoiseshell',
    'Kaplumbağa kabuğu': 'tortoiseshell' // Case fix,
    'dokunmatik eldivenler': 'touchscreen-gloves',
    'Dokunmatik Eldivenler': 'touchscreen-gloves' // Case fix,
    'DOKUNMATIK ELDIVENLER': 'touchscreen-gloves' // Case fix,
    'ticaret yapmak': 'trading',
    'Ticaret Yapmak': 'trading' // Case fix,
    'TICARET YAPMAK': 'trading' // Case fix,
    'trafik konisi': 'traffic-cone',
    'Trafik konisi': 'traffic-cone' // Case fix,
    'TRAFIK KONISI': 'traffic-cone' // Case fix,
    'trafik sıkışıklığı': 'traffic-jam',
    'Trafik Sıkışıklığı': 'traffic-jam' // Case fix,
    'TRAFIK SIKIŞIKLIĞI': 'traffic-jam' // Case fix,
    'trafik işığı': 'traffic-light',
    'Trafik Işığı': 'traffic-light' // Case fix,
    'TRAFIK IŞIĞI': 'traffic-light' // Case fix,
    'tren i̇stasyonu': 'train-station',
    'Tren İstasyonu': 'train-station' // Case fix,
    'dönüşmek': 'transforming',
    'Dönüşmek': 'transforming' // Case fix,
    'şeffaf': 'transparent',
    'Şeffaf': 'transparent' // Case fix,
    'geometri': 'trapezium',
    'Geometri': 'trapezium' // Case fix,
    'GEOMETRI': 'trapezium' // Case fix,
    'çöp kutusu': 'trash-can',
    'Çöp kutusu': 'trash-can' // Case fix,
    'çöp sıkıştırıcı': 'trash-compactor',
    'Çöp Sıkıştırıcı': 'trash-compactor' // Case fix,
    'ÇÖP SIKIŞTIRICI': 'trash-compactor' // Case fix,
    'karavan': 'travel-trailer',
    'Karavan': 'travel-trailer' // Case fix,
    'yurtdışına seyahat etmek': 'traveling-abroad',
    'Yurtdışına Seyahat Etmek': 'traveling-abroad' // Case fix,
    'YURTDIŞINA SEYAHAT ETMEK': 'traveling-abroad' // Case fix,
    'i̇lerleme kaydetmeden suyun üstünde kalmak': 'treading-water-without-progress',
    'İlerleme kaydetmeden suyun üstünde kalmak': 'treading-water-without-progress' // Case fix,
    'koşu bandı': 'treadmill',
    'Koşu bandı': 'treadmill' // Case fix,
    'KOŞU BANDI': 'treadmill' // Case fix,
    'trebuchet': 'trebuchet',
    'Trebuchet': 'trebuchet' // Case fix,
    'palto': 'trench-coat',
    'Palto': 'trench-coat' // Case fix,
    'trend': 'trend',
    'Trend': 'trend' // Case fix,
    'destek': 'trestle',
    'Destek': 'trestle' // Case fix,
    'üçgen': 'triangle',
    'Üçgen': 'triangle' // Case fix,
    'üçgen şapka': 'tricorn',
    'Üçgen şapka': 'tricorn' // Case fix,
    'üç dişli mızrak': 'trident',
    'Üç dişli mızrak': 'trident' // Case fix,
    'ÜÇ DIŞLI MIZRAK': 'trident' // Case fix,
    'trilobit': 'trilobite',
    'Trilobit': 'trilobite' // Case fix,
    'TRILOBIT': 'trilobite' // Case fix,
    'triyem': 'trireme',
    'Triyem': 'trireme' // Case fix,
    'TRIYEM': 'trireme' // Case fix,
    'geometrik üçgen': 'triskelion',
    'Geometrik üçgen': 'triskelion' // Case fix,
    'GEOMETRIK ÜÇGEN': 'triskelion' // Case fix,
    'şoför şapkası': 'trucker-hat',
    'Şoför Şapkası': 'trucker-hat' // Case fix,
    'ŞOFÖR ŞAPKASI': 'trucker-hat' // Case fix,
    'yardım çağırmaya çalışmak ama ses yok': 'trying-to-call-for-help-but-no-voice',
    'Yardım çağırmaya çalışmak ama ses yok': 'trying-to-call-for-help-but-no-voice' // Case fix,
    'YARDIM ÇAĞIRMAYA ÇALIŞMAK AMA SES YOK': 'trying-to-call-for-help-but-no-voice' // Case fix,
    'çığlık atmaya çalışmak ama ses çıkmamak': 'trying-to-scream-but-no-sound',
    'Çığlık atmaya çalışmak ama ses çıkmamak': 'trying-to-scream-but-no-sound' // Case fix,
    'ÇIĞLIK ATMAYA ÇALIŞMAK AMA SES ÇIKMAMAK': 'trying-to-scream-but-no-sound' // Case fix,
    'invalid': 'tsuba',
    'INVALID': 'tsuba' // Case fix,
    'tsuchinoko': 'tsuchinoko',
    'Tsuchinoko': 'tsuchinoko' // Case fix,
    'TSUCHINOKO': 'tsuchinoko' // Case fix,
    'çekiştirmek': 'tugging',
    'Çekiştirmek': 'tugging' // Case fix,
    'ÇEKIŞTIRMEK': 'tugging' // Case fix,
    'tünel kazmak': 'tunneling',
    'Tünel Kazmak': 'tunneling' // Case fix,
    'türkiye': 'turkey',
    'Türkiye': 'turkey' // Case fix,
    'TÜRKIYE': 'turkey' // Case fix,
    'zerdeçal latte': 'turmeric-latte',
    'Zerdeçal Latte': 'turmeric-latte' // Case fix,
    'dönel kapı': 'turnstile',
    'Dönel kapı': 'turnstile' // Case fix,
    'DÖNEL KAPI': 'turnstile' // Case fix,
    'turkuaz': 'turquoise',
    'Turkuaz': 'turquoise' // Case fix,
    'taret': 'turret',
    'Taret': 'turret' // Case fix,
    'on iki': 'twelve',
    'On iki': 'twelve' // Case fix,
    'ON IKI': 'twelve' // Case fix,
    'taifun': 'typhoon',
    'Taifun': 'typhoon' // Case fix,
    'TAIFUN': 'typhoon' // Case fix,
    'uakari': 'uakari',
    'Uakari': 'uakari' // Case fix,
    'UAKARI': 'uakari' // Case fix,
    'uber yolculuğu': 'uber-ride',
    'Uber Yolculuğu': 'uber-ride' // Case fix,
    'uber': 'uber',
    'Uber': 'uber' // Case fix,
    'çirkin': 'ugly',
    'Çirkin': 'ugly' // Case fix,
    'ÇIRKIN': 'ugly' // Case fix,
    'ukulele': 'ukulele',
    'Ukulele': 'ukulele' // Case fix,
    'umami': 'umami',
    'Umami': 'umami' // Case fix,
    'UMAMI': 'umami' // Case fix,
    'geçmiş': 'umber',
    'Geçmiş': 'umber' // Case fix,
    'GEÇMIŞ': 'umber' // Case fix,
    'bir telefona numara çevirememe': 'unable-to-dial-a-phone',
    'Bir telefona numara çevirememe': 'unable-to-dial-a-phone' // Case fix,
    'BIR TELEFONA NUMARA ÇEVIREMEME': 'unable-to-dial-a-phone' // Case fix,
    'eve giden yolu bulamamak': 'unable-to-find-the-way-home',
    'Eve giden yolu bulamamak': 'unable-to-find-the-way-home' // Case fix,
    'EVE GIDEN YOLU BULAMAMAK': 'unable-to-find-the-way-home' // Case fix,
    'sesini bulamamak': 'unable-to-find-your-voice',
    'Sesini bulamamak': 'unable-to-find-your-voice' // Case fix,
    'SESINI BULAMAMAK': 'unable-to-find-your-voice' // Case fix,
    'gözlerini açamamak': 'unable-to-open-your-eyes',
    'Gözlerini açamamak': 'unable-to-open-your-eyes' // Case fix,
    'GÖZLERINI AÇAMAMAK': 'unable-to-open-your-eyes' // Case fix,
    'açılış': 'unboxing',
    'Açılış': 'unboxing' // Case fix,
    'AÇILIŞ': 'unboxing' // Case fix,
    'kontrolsüz gülme': 'uncontrollable-laughter',
    'Kontrolsüz Gülme': 'uncontrollable-laughter' // Case fix,
    'kontrolsüzce gülmek': 'uncontrollably-laughing',
    'Kontrolsüzce gülmek': 'uncontrollably-laughing' // Case fix,
    'uçmak ama kontrol edememek': 'uncontrolled-flying',
    'Uçmak ama kontrol edememek': 'uncontrolled-flying' // Case fix,
    'yeraltı tüneli': 'underground-tunnel',
    'Yeraltı Tüneli': 'underground-tunnel' // Case fix,
    'YERALTI TÜNELI': 'underground-tunnel' // Case fix,
    'altgeçit': 'underpass',
    'Altgeçit': 'underpass' // Case fix,
    'ALTGEÇIT': 'underpass' // Case fix,
    'açıklanamaz kaygı, çözüm olmadan': 'unexplainable-anxiety-without-resolution',
    'Açıklanamaz kaygı, çözüm olmadan': 'unexplainable-anxiety-without-resolution' // Case fix,
    'AÇIKLANAMAZ KAYGI, ÇÖZÜM OLMADAN': 'unexplainable-anxiety-without-resolution' // Case fix,
    'bir şey söyleyince kimsenin duymaması': 'unheard-words',
    'Bir şey söyleyince kimsenin duymaması': 'unheard-words' // Case fix,
    'BIR ŞEY SÖYLEYINCE KIMSENIN DUYMAMASI': 'unheard-words' // Case fix,
    'tek tekerlekli bisiklet': 'unicycle',
    'Tek tekerlekli bisiklet': 'unicycle' // Case fix,
    'TEK TEKERLEKLI BISIKLET': 'unicycle' // Case fix,
    'evren': 'universe',
    'Evren': 'universe' // Case fix,
    'üniversite': 'university',
    'Üniversite': 'university' // Case fix,
    'ÜNIVERSITE': 'university' // Case fix,
    'açma': 'unpacking',
    'Açma': 'unpacking' // Case fix,
    'takip edilmek ama kimin takip ettiğini görememek': 'unseen-pursuer',
    'Takip edilmek ama kimin takip ettiğini görememek': 'unseen-pursuer' // Case fix,
    'TAKIP EDILMEK AMA KIMIN TAKIP ETTIĞINI GÖREMEMEK': 'unseen-pursuer' // Case fix,
    'durmaksızın i̇leri hareket': 'unstoppable-forward-motion',
    'Durmaksızın İleri Hareket': 'unstoppable-forward-motion' // Case fix,
    'DURMAKSIZIN İLERI HAREKET': 'unstoppable-forward-motion' // Case fix,
    'şehir bahçesi': 'urban-garden',
    'Şehir Bahçesi': 'urban-garden' // Case fix,
    'ŞEHIR BAHÇESI': 'urban-garden' // Case fix,
    'şehir parkı': 'urban-park',
    'Şehir Parkı': 'urban-park' // Case fix,
    'ŞEHIR PARKI': 'urban-park' // Case fix,
    'usb şarj aleti': 'usb-charger',
    'USB Şarj Aleti': 'usb-charger' // Case fix,
    'USB ŞARJ ALETI': 'usb-charger' // Case fix,
    'aşı pasaportu': 'vaccine-passport',
    'Aşı Pasaportu': 'vaccine-passport' // Case fix,
    'AŞI PASAPORTU': 'vaccine-passport' // Case fix,
    'Elektrik süpürgesi': 'vacuum-cleaner' // Case fix,
    'vegan burger': 'vegan-burger',
    'Vegan Burger': 'vegan-burger' // Case fix,
    'duvak (peçe)': 'veil',
    'Duvak (Peçe)': 'veil' // Case fix,
    'velosiped': 'velocipede',
    'Velosiped': 'velocipede' // Case fix,
    'VELOSIPED': 'velocipede' // Case fix,
    'velosiraptor': 'velociraptor',
    'Velosiraptor': 'velociraptor' // Case fix,
    'VELOSIRAPTOR': 'velociraptor' // Case fix,
    'velodrom': 'velodrome',
    'Velodrom': 'velodrome' // Case fix,
    'otomat bileti': 'vending-machine-ticket',
    'Otomat Bileti': 'vending-machine-ticket' // Case fix,
    'OTOMAT BILETI': 'vending-machine-ticket' // Case fix,
    'otomat': 'vending-machine',
    'Otomat': 'vending-machine' // Case fix,
    'veranda': 'veranda',
    'Veranda': 'veranda' // Case fix,
    'vespa': 'vespa',
    'Vespa': 'vespa' // Case fix,
    'viyadük': 'viaduct',
    'Viyadük': 'viaduct' // Case fix,
    'VIYADÜK': 'viaduct' // Case fix,
    'görüntülü arama': 'video-call',
    'Görüntülü Arama': 'video-call' // Case fix,
    'video zili': 'video-doorbell',
    'Video Zili': 'video-doorbell' // Case fix,
    'VIDEO ZILI': 'video-doorbell' // Case fix,
    'video akışı': 'video-streaming',
    'Video Akışı': 'video-streaming' // Case fix,
    'VIDEO AKIŞI': 'video-streaming' // Case fix,
    'menekşe': 'violet',
    'Menekşe': 'violet' // Case fix,
    'viral video': 'viral-video',
    'Viral Video': 'viral-video' // Case fix,
    'VIRAL VIDEO': 'viral-video' // Case fix,
    'virelay': 'virelay',
    'Virelay': 'virelay' // Case fix,
    'VIRELAY': 'virelay' // Case fix,
    'sanal asistan': 'virtual-assistant',
    'Sanal Asistan': 'virtual-assistant' // Case fix,
    'SANAL ASISTAN': 'virtual-assistant' // Case fix,
    'sanal toplantı': 'virtual-meeting',
    'Sanal Toplantı': 'virtual-meeting' // Case fix,
    'SANAL TOPLANTI': 'virtual-meeting' // Case fix,
    'sanal gerçeklik oyunu': 'virtual-reality-game',
    'Sanal Gerçeklik Oyunu': 'virtual-reality-game' // Case fix,
    'SANAL GERÇEKLIK OYUNU': 'virtual-reality-game' // Case fix,
    'sanal gerçeklik gözlüğü': 'virtual-reality-headset',
    'Sanal Gerçeklik Gözlüğü': 'virtual-reality-headset' // Case fix,
    'SANAL GERÇEKLIK GÖZLÜĞÜ': 'virtual-reality-headset' // Case fix,
    'sanal gerçeklik': 'virtual-reality',
    'Sanal Gerçeklik': 'virtual-reality' // Case fix,
    'SANAL GERÇEKLIK': 'virtual-reality' // Case fix,
    'vlog': 'vlog',
    'Vlog': 'vlog' // Case fix,
    'sesli asistan': 'voice-assistant',
    'Sesli Asistan': 'voice-assistant' // Case fix,
    'SESLI ASISTAN': 'voice-assistant' // Case fix,
    'bağırdıkça sesin kısılması': 'voice-fading',
    'Bağırdıkça sesin kısılması': 'voice-fading' // Case fix,
    'BAĞIRDIKÇA SESIN KISILMASI': 'voice-fading' // Case fix,
    'sessiz sohbetler': 'voiceless-conversations',
    'Sessiz Sohbetler': 'voiceless-conversations' // Case fix,
    'SESSIZ SOHBETLER': 'voiceless-conversations' // Case fix,
    'konuşmaya çalışırken sessiz kalmak': 'voiceless-when-trying-to-speak',
    'Konuşmaya çalışırken sessiz kalmak': 'voiceless-when-trying-to-speak' // Case fix,
    'KONUŞMAYA ÇALIŞIRKEN SESSIZ KALMAK': 'voiceless-when-trying-to-speak' // Case fix,
    'geçersiz': 'void',
    'Geçersiz': 'void' // Case fix,
    'GEÇERSIZ': 'void' // Case fix,
    'yanardağ (volkan)': 'volcano',
    'Yanardağ (Volkan)': 'volcano' // Case fix,
    'vr kulaklığı': 'vr-headset',
    'VR Kulaklığı': 'vr-headset' // Case fix,
    'VR KULAKLIĞI': 'vr-headset' // Case fix,
    'akbaba': 'vulture',
    'Akbaba': 'vulture' // Case fix,
    'vuvuzela': 'vuvuzela',
    'Vuvuzela': 'vuvuzela' // Case fix,
    'vişivanka': 'vyshyvanka',
    'Vişivanka': 'vyshyvanka' // Case fix,
    'VIŞIVANKA': 'vyshyvanka' // Case fix,
    'döşeme': 'wainscot',
    'Döşeme': 'wainscot' // Case fix,
    'duvar kaplaması': 'wainscoting',
    'Duvar kaplaması': 'wainscoting' // Case fix,
    'DUVAR KAPLAMASI': 'wainscoting' // Case fix,
    'sırada beklemek': 'waiting-in-line',
    'Sırada Beklemek': 'waiting-in-line' // Case fix,
    'SIRADA BEKLEMEK': 'waiting-in-line' // Case fix,
    'havada yürümek': 'walking-on-air',
    'Havada Yürümek': 'walking-on-air' // Case fix,
    'sonsuz koridorlarda yürümek': 'walking-through-endless-corridors',
    'Sonsuz koridorlarda yürümek': 'walking-through-endless-corridors' // Case fix,
    'SONSUZ KORIDORLARDA YÜRÜMEK': 'walking-through-endless-corridors' // Case fix,
    'duvarların i̇çinden yürümek': 'walking-through-walls',
    'Duvarların İçinden Yürümek': 'walking-through-walls' // Case fix,
    'DUVARLARIN İÇINDEN YÜRÜMEK': 'walking-through-walls' // Case fix,
    'yürümek': 'walking',
    'Yürümek': 'walking' // Case fix,
    'mors (deniz aygırı)': 'walrus',
    'Mors (Deniz Aygırı)': 'walrus' // Case fix,
    'MORS (DENIZ AYGIRI)': 'walrus' // Case fix,
    'sihirli değnek': 'wand',
    'Sihirli değnek': 'wand' // Case fix,
    'SIHIRLI DEĞNEK': 'wand' // Case fix,
    'sonsuz koridorlarda dolaşmak': 'wandering-through-endless-corridors',
    'Sonsuz koridorlarda dolaşmak': 'wandering-through-endless-corridors' // Case fix,
    'SONSUZ KORIDORLARDA DOLAŞMAK': 'wandering-through-endless-corridors' // Case fix,
    'dolaşmak': 'wandering',
    'Dolaşmak': 'wandering' // Case fix,
    'geçiş': 'watch',
    'Geçiş': 'watch' // Case fix,
    'GEÇIŞ': 'watch' // Case fix,
    'olayların gelişimini izlemek, müdahale edememek': 'watching-events-unfold-unable-to-intervene',
    'Olayların gelişimini izlemek, müdahale edememek': 'watching-events-unfold-unable-to-intervene' // Case fix,
    'OLAYLARIN GELIŞIMINI IZLEMEK, MÜDAHALE EDEMEMEK': 'watching-events-unfold-unable-to-intervene' // Case fix,
    'su şişesi': 'water-bottle',
    'Su Şişesi': 'water-bottle' // Case fix,
    'SU ŞIŞESI': 'water-bottle' // Case fix,
    'su soğutucu': 'water-cooler',
    'Su Soğutucu': 'water-cooler' // Case fix,
    'su filtresi': 'water-filter',
    'Su Filtresi': 'water-filter' // Case fix,
    'SU FILTRESI': 'water-filter' // Case fix,
    'su isıtıcı': 'water-heater',
    'Su Isıtıcı': 'water-heater' // Case fix,
    'SU ISITICI': 'water-heater' // Case fix,
    'rüzgâr gülü': 'weathervane',
    'Rüzgâr gülü': 'weathervane' // Case fix,
    'web kamerası': 'webcam',
    'Web kamerası': 'webcam' // Case fix,
    'WEB KAMERASI': 'webcam' // Case fix,
    'wendigo': 'wendigo',
    'Wendigo': 'wendigo' // Case fix,
    'WENDIGO': 'wendigo' // Case fix,
    'islak': 'wet',
    'Islak': 'wet' // Case fix,
    'tekerlek (çark)': 'wheel',
    'Tekerlek (Çark)': 'wheel' // Case fix,
    'çift kolu': 'whippletree',
    'Çift kolu': 'whippletree' // Case fix,
    'ÇIFT KOLU': 'whippletree' // Case fix,
    'dönme dolap': 'whirligig',
    'Dönme dolap': 'whirligig' // Case fix,
    'dönme dolap': 'whirlpool',
    'Dönme dolap': 'whirlpool' // Case fix,
    'çırpıcı': 'whisk',
    'Çırpıcı': 'whisk' // Case fix,
    'ÇIRPICI': 'whisk' // Case fix,
    'fısıldama': 'whispering',
    'Fısıldama': 'whispering' // Case fix,
    'FISILDAMA': 'whispering' // Case fix,
    'beyaz melek': 'white-angel',
    'Beyaz melek': 'white-angel' // Case fix,
    'beyaz bebek': 'white-baby',
    'Beyaz bebek': 'white-baby' // Case fix,
    'beyaz ayı': 'white-bear',
    'Beyaz ayı': 'white-bear' // Case fix,
    'BEYAZ AYI': 'white-bear' // Case fix,
    'beyaz kuş': 'white-bird',
    'Beyaz kuş': 'white-bird' // Case fix,
    'beyaz kan': 'white-blood',
    'Beyaz kan': 'white-blood' // Case fix,
    'beyaz köprü': 'white-bridge',
    'Beyaz köprü': 'white-bridge' // Case fix,
    'beyaz araba': 'white-car',
    'Beyaz araba': 'white-car' // Case fix,
    'beyaz kedi': 'white-cat',
    'Beyaz kedi': 'white-cat' // Case fix,
    'BEYAZ KEDI': 'white-cat' // Case fix,
    'beyaz ağlayan': 'white-crying',
    'Beyaz ağlayan': 'white-crying' // Case fix,
    'beyaz dans': 'white-dancing',
    'Beyaz dans': 'white-dancing' // Case fix,
    'beyaz ölüm': 'white-death',
    'Beyaz ölüm': 'white-death' // Case fix,
    'beyaz demon': 'white-demon',
    'Beyaz demon': 'white-demon' // Case fix,
    'beyaz köpek': 'white-dog',
    'Beyaz köpek': 'white-dog' // Case fix,
    'beyaz kapı': 'white-door',
    'Beyaz kapı': 'white-door' // Case fix,
    'BEYAZ KAPI': 'white-door' // Case fix,
    'beyaz ejderha': 'white-dragon',
    'Beyaz ejderha': 'white-dragon' // Case fix,
    'beyaz fil': 'white-elephant',
    'Beyaz fil': 'white-elephant' // Case fix,
    'BEYAZ FIL': 'white-elephant' // Case fix,
    'beyaz dövüş': 'white-fighting',
    'Beyaz dövüş': 'white-fighting' // Case fix,
    'beyaz ateş': 'white-fire',
    'Beyaz ateş': 'white-fire' // Case fix,
    'beyaz balık': 'white-fish',
    'Beyaz balık': 'white-fish' // Case fix,
    'BEYAZ BALIK': 'white-fish' // Case fix,
    'beyaz uçan': 'white-flying',
    'Beyaz uçan': 'white-flying' // Case fix,
    'beyaz hayalet': 'white-ghost',
    'Beyaz hayalet': 'white-ghost' // Case fix,
    'beyaz at': 'white-horse',
    'Beyaz at': 'white-horse' // Case fix,
    'beyaz ev': 'white-house',
    'Beyaz ev': 'white-house' // Case fix,
    'beyaz anahtar': 'white-key',
    'Beyaz anahtar': 'white-key' // Case fix,
    'beyaz bıçak': 'white-knife',
    'Beyaz bıçak': 'white-knife' // Case fix,
    'BEYAZ BIÇAK': 'white-knife' // Case fix,
    'beyaz aslan': 'white-lion',
    'Beyaz aslan': 'white-lion' // Case fix,
    'beyaz para': 'white-money',
    'Beyaz para': 'white-money' // Case fix,
    'beyaz dağ': 'white-mountain',
    'Beyaz dağ': 'white-mountain' // Case fix,
    'beyaz okyanus': 'white-ocean',
    'Beyaz okyanus': 'white-ocean' // Case fix,
    'beyaz yağmur': 'white-rain',
    'Beyaz yağmur': 'white-rain' // Case fix,
    'beyaz koşma': 'white-running',
    'Beyaz koşma': 'white-running' // Case fix,
    'beyaz köpekbalığı': 'white-shark',
    'Beyaz köpekbalığı': 'white-shark' // Case fix,
    'BEYAZ KÖPEKBALIĞI': 'white-shark' // Case fix,
    'beyaz yılan': 'white-snake',
    'Beyaz yılan': 'white-snake' // Case fix,
    'BEYAZ YILAN': 'white-snake' // Case fix,
    'beyaz kar': 'white-snow',
    'Beyaz kar': 'white-snow' // Case fix,
    'beyaz örümcek': 'white-spider',
    'Beyaz örümcek': 'white-spider' // Case fix,
    'beyaz merdivenler': 'white-stairs',
    'Beyaz merdivenler': 'white-stairs' // Case fix,
    'BEYAZ MERDIVENLER': 'white-stairs' // Case fix,
    'beyaz fırtına': 'white-storm',
    'Beyaz fırtına': 'white-storm' // Case fix,
    'BEYAZ FIRTINA': 'white-storm' // Case fix,
    'beyaz yüzme': 'white-swimming',
    'Beyaz yüzme': 'white-swimming' // Case fix,
    'beyaz dişlerin dökülmesi': 'white-teeth-falling-out',
    'Beyaz dişlerin dökülmesi': 'white-teeth-falling-out' // Case fix,
    'BEYAZ DIŞLERIN DÖKÜLMESI': 'white-teeth-falling-out' // Case fix,
    'beyaz vampir': 'white-vampire',
    'Beyaz vampir': 'white-vampire' // Case fix,
    'BEYAZ VAMPIR': 'white-vampire' // Case fix,
    'beyaz su': 'white-water',
    'Beyaz su': 'white-water' // Case fix,
    'beyaz düğün': 'white-wedding',
    'Beyaz düğün': 'white-wedding' // Case fix,
    'beyaz kurt': 'white-wolf',
    'Beyaz kurt': 'white-wolf' // Case fix,
    'beyaz yara': 'white-wound',
    'Beyaz yara': 'white-wound' // Case fix,
    'beyaz zombi': 'white-zombie',
    'Beyaz zombi': 'white-zombie' // Case fix,
    'BEYAZ ZOMBI': 'white-zombie' // Case fix,
    'beyaz tahta': 'whiteboard',
    'Beyaz tahta': 'whiteboard' // Case fix,
    'wi-fi router': 'wi-fi-router',
    'Wi-Fi Router': 'wi-fi-router' // Case fix,
    'WI-FI ROUTER': 'wi-fi-router' // Case fix,
    'wi-fi sinyali': 'wi-fi-signal',
    'Wi-Fi Sinyali': 'wi-fi-signal' // Case fix,
    'WI-FI SINYALI': 'wi-fi-signal' // Case fix,
    'wifi noktası': 'wifi-hotspot',
    'WiFi Noktası': 'wifi-hotspot' // Case fix,
    'WIFI NOKTASI': 'wifi-hotspot' // Case fix,
    'wifi router': 'wifi-router',
    'WiFi Router': 'wifi-router' // Case fix,
    'WIFI ROUTER': 'wifi-router' // Case fix,
    'gnu': 'wildebeest',
    'Gnu': 'wildebeest' // Case fix,
    'rüzgarlık': 'windbreaker',
    'Rüzgarlık': 'windbreaker' // Case fix,
    'RÜZGARLIK': 'windbreaker' // Case fix,
    'değirmen': 'windmill',
    'Değirmen': 'windmill' // Case fix,
    'DEĞIRMEN': 'windmill' // Case fix,
    'şarap rafı': 'wine-rack',
    'Şarap Rafı': 'wine-rack' // Case fix,
    'ŞARAP RAFI': 'wine-rack' // Case fix,
    'kazanmak': 'winning',
    'Kazanmak': 'winning' // Case fix,
    'tel': 'wire',
    'Tel': 'wire' // Case fix,
    'kablosuz şarj aleti': 'wireless-charger',
    'Kablosuz Şarj Aleti': 'wireless-charger' // Case fix,
    'KABLOSUZ ŞARJ ALETI': 'wireless-charger' // Case fix,
    'kablosuz kulaklıklar': 'wireless-earbuds',
    'Kablosuz Kulaklıklar': 'wireless-earbuds' // Case fix,
    'KABLOSUZ KULAKLIKLAR': 'wireless-earbuds' // Case fix,
    'mor salkım': 'wisteria',
    'Mor salkım': 'wisteria' // Case fix,
    'MOR SALKIM': 'wisteria' // Case fix,
    'sazlık': 'withy',
    'Sazlık': 'withy' // Case fix,
    'SAZLIK': 'withy' // Case fix,
    'i̇mkansız bir olaya tanıklık etmek': 'witnessing-an-impossible-event',
    'İmkansız bir olaya tanıklık etmek': 'witnessing-an-impossible-event' // Case fix,
    'İMKANSIZ BIR OLAYA TANIKLIK ETMEK': 'witnessing-an-impossible-event' // Case fix,
    'yansımanızın farklı davranışlar sergilemesini izlemek': 'witnessing-your-reflection-behaving-differently',
    'Yansımanızın farklı davranışlar sergilemesini izlemek': 'witnessing-your-reflection-behaving-differently' // Case fix,
    'YANSIMANIZIN FARKLI DAVRANIŞLAR SERGILEMESINI IZLEMEK': 'witnessing-your-reflection-behaving-differently' // Case fix,
    'tanık olmak': 'witnessing',
    'Tanık Olmak': 'witnessing' // Case fix,
    'TANIK OLMAK': 'witnessing' // Case fix,
    'kadın': 'woman',
    'Kadın': 'woman' // Case fix,
    'KADIN': 'woman' // Case fix,
    'wombat': 'wombat',
    'Wombat': 'wombat' // Case fix,
    'odun sobası': 'wood-burner',
    'Odun Sobası': 'wood-burner' // Case fix,
    'ODUN SOBASI': 'wood-burner' // Case fix,
    'ağaçkakan': 'woodpecker',
    'Ağaçkakan': 'woodpecker' // Case fix,
    'i̇ş e-postası': 'work-email',
    'İş E-postası': 'work-email' // Case fix,
    'İŞ E-POSTASI': 'work-email' // Case fix,
    'çalışmak (i̇ş)': 'working',
    'Çalışmak (İş)': 'working' // Case fix,
    'ÇALIŞMAK (İŞ)': 'working' // Case fix,
    'solucan': 'worm',
    'Solucan': 'worm' // Case fix,
    'bileklik': 'wristband',
    'Bileklik': 'wristband' // Case fix,
    'BILEKLIK': 'wristband' // Case fix,
    'bileklik çanta': 'wristlet',
    'Bileklik çanta': 'wristlet' // Case fix,
    'BILEKLIK ÇANTA': 'wristlet' // Case fix,
    'wyvern': 'wyvern',
    'Wyvern': 'wyvern' // Case fix,
    'xerox': 'xerox',
    'Xerox': 'xerox' // Case fix,
    'xoloitzcuintli': 'xoloitzcuintli',
    'Xoloitzcuintli': 'xoloitzcuintli' // Case fix,
    'XOLOITZCUINTLI': 'xoloitzcuintli' // Case fix,
    'ahşap baskı': 'xylograph',
    'Ahşap baskı': 'xylograph' // Case fix,
    'AHŞAP BASKI': 'xylograph' // Case fix,
    'ksilofon': 'xylophone',
    'Ksilofon': 'xylophone' // Case fix,
    'KSILOFON': 'xylophone' // Case fix,
    'yat': 'yacht',
    'Yat': 'yacht' // Case fix,
    'avlu (bahçe)': 'yard',
    'Avlu (Bahçe)': 'yard' // Case fix,
    'yeti': 'yeti',
    'Yeti': 'yeti' // Case fix,
    'YETI': 'yeti' // Case fix,
    'söğüt': 'yew',
    'Söğüt': 'yew' // Case fix,
    'yoga matı': 'yoga-mat',
    'Yoga Matı': 'yoga-mat' // Case fix,
    'YOGA MATI': 'yoga-mat' // Case fix,
    'yoga pantolonu': 'yoga-pants',
    'Yoga Pantolonu': 'yoga-pants' // Case fix,
    'yoga stüdyosu': 'yoga-studio',
    'Yoga Stüdyosu': 'yoga-studio' // Case fix,
    'yurt': 'yurt',
    'Yurt': 'yurt' // Case fix,
    'zebra ağacı': 'zebrawood',
    'Zebra ağacı': 'zebrawood' // Case fix,
    'ZEBRA AĞACI': 'zebrawood' // Case fix,
    'zebu': 'zebu',
    'Zebu': 'zebu' // Case fix,
    'zefir': 'zephyr',
    'Zefir': 'zephyr' // Case fix,
    'ZEFIR': 'zephyr' // Case fix,
    'zeplin': 'zeppelin',
    'Zeplin': 'zeppelin' // Case fix,
    'ZEPLIN': 'zeppelin' // Case fix,
    'sıfır': 'zero',
    'Sıfır': 'zero' // Case fix,
    'SIFIR': 'zero' // Case fix,
    'ziggurat': 'ziggurat',
    'Ziggurat': 'ziggurat' // Case fix,
    'ZIGGURAT': 'ziggurat' // Case fix,
    'zip car': 'zip-car',
    'Zip Car': 'zip-car' // Case fix,
    'ZIP CAR': 'zip-car' // Case fix,
    'zither': 'zither',
    'Zither': 'zither' // Case fix,
    'ZITHER': 'zither' // Case fix,
    'hayvanat bahçesi': 'zoo',
    'Hayvanat Bahçesi': 'zoo' // Case fix,
    'HAYVANAT BAHÇESI': 'zoo' // Case fix,
    'zoom görüşmesi': 'zoom-call',
    'Zoom Görüşmesi': 'zoom-call' // Case fix,
    'ZOOM GÖRÜŞMESI': 'zoom-call' // Case fix
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

// Add localized keywords from content files (e.g., "gergedan" -> "rhino")
const localizedKeywords = require('./keyword_index_localized');
for (const [keyword, slug] of Object.entries(localizedKeywords)) {
    // We intentionally overwrite here. 
    // If a content file exists (e.g. "Bamboo"), it takes precedence over a dictionary association (e.g. Panda -> Bamboo).
    keywordIndex[keyword] = slug;
}

module.exports = keywordIndex;

// Debug
if (require.main === module) {
    console.log('Sample keywords:');
    console.log('yılan ->', keywordIndex['yılan']);
    console.log('snake ->', keywordIndex['snake']);
    console.log('gergedan ->', keywordIndex['gergedan']);
    console.log('Total keywords:', Object.keys(keywordIndex).length);
}
