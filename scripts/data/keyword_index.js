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
    'ÇALIŞMAK (İŞ)': 'working' // Case fix
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
    if (!keywordIndex[keyword]) {
        keywordIndex[keyword] = slug;
    }
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
