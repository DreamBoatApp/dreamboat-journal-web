const fs = require('fs');
const path = require('path');
const keywordIndex = require('./data/keyword_index');

const contentDir = path.join(__dirname, '../content/tr/meanings');
const indexedSlugs = new Set(Object.values(keywordIndex));

// Define recent batches to verify (Batch 11-15)
const batchSlugs = [

    // Batch 17 (100 items)
    'giraffe', 'zebra', 'crocodile', 'turtle', 'frog', 'snail', 'hedgehog', 'shark', 'octopus', 'crab', 'jellyfish', 'penguin', 'seal', 'seagull', 'stork', 'deer', 'camel', 'donkey', 'goat', 'squirrel',
    'bread', 'milk', 'wine', 'chocolate', 'cake', 'ice-cream', 'soup', 'rice', 'pasta', 'pizza', 'hamburger', 'beer', 'sugar', 'flour', 'cheese', 'olive', 'tomato', 'potato', 'onion', 'garlic',
    'lunar-eclipse', 'solar-eclipse', 'comet', 'black-hole', 'spaceship', 'northern-lights', 'hurricane', 'tornado', 'avalanche', 'tsunami', 'crater', 'beach', 'meteor', 'flower-garden', 'rose', 'tulip', 'daisy', 'cactus', 'tree-roots', 'leaf',
    'diving', 'drowning', 'escaping', 'chased', 'hiding', 'searching', 'finding', 'losing', 'stealing', 'giving', 'receiving', 'selling', 'buying', 'writing', 'reading', 'painting', 'repairing', 'waiting', 'waking-up', 'praying',
    'fear', 'joy', 'anger', 'jealousy', 'shame', 'pride', 'love', 'hate', 'longing', 'loneliness', 'success', 'failure', 'wealth', 'poverty', 'sickness', 'healing', 'accident', 'luck', 'heaven', 'hell',

    // Batch 16 (100 items)
    'farmer', 'chef', 'pilot', 'actor', 'prisoner', 'teenager', 'twins', 'orphan', 'mermaid', 'unicorn',
    'fairy', 'dragon', 'phoenix', 'werewolf', 'alien', 'giant', 'puppet', 'robot', 'spirit', 'piano',
    'guitar', 'violin', 'flute', 'trumpet', 'drum', 'singing', 'musical-note', 'music', 'choir', 'broom',
    'shovel', 'axe', 'hammer', 'needle', 'rope', 'net', 'chain', 'vase', 'faucet', 'coat',
    'gloves', 'glasses', 'belt', 'tie', 'scarf', 'socks', 'underwear', 'pyjamas', 'uniform', 'computer',
    'keyboard', 'television', 'camera', 'radio', 'internet', 'password', 'battery', 'alarm', 'helicopter', 'volcano',
    'waterfall', 'swamp', 'cliff', 'valley', 'island', 'farm', 'park', 'tunnel', 'hotel', 'restaurant',
    'library', 'theater', 'shop', 'church', 'factory', 'museum', 'stadium', 'village', 'pink', 'orange-color',
    'brown', 'grey', 'iron', 'copper', 'bronze', 'glass', 'wood', 'plastic', 'climbing', 'vomiting',
    'birth', 'scar', 'tattoo', 'blind', 'deaf', 'zipper', 'pocket', 'trash', 'umbrella', 'stairs',

    // Batch 15 (50 items)
    'dog', 'cat', 'horse', 'snake', 'mouse', 'bird', 'eagle', 'pigeon', 'scorpion', 'fly',
    'rain', 'snow', 'sun', 'lightning', 'storm', 'fog', 'rainbow', 'flood', 'earthquake', 'fire',
    'school', 'mosque', 'graveyard', 'prison', 'palace', 'desert', 'ocean', 'toilet', 'hospital', 'market',
    'teeth', 'hair', 'nail-body', 'beard', 'tongue', 'naked', 'mouth', 'stomach', 'back-body', 'skeleton',
    'gold', 'money', 'silver', 'diamond', 'ring', 'bracelet', 'necklace', 'wallet', 'gift', 'treasure',

    // Batch 14 (50 items)
    'key', 'door', 'mirror', 'scissors', 'pillow', 'umbrella', 'phone', 'book', 'pen', 'box',
    'car', 'bus', 'truck', 'bicycle', 'boat', 'ship', 'bridge', 'elevator', 'stairs', 'suitcase',
    'water', 'meat', 'fish', 'apple', 'grapes', 'egg', 'honey', 'coffee', 'tea', 'salt',
    'mother', 'father', 'child', 'sibling', 'partner', 'bride', 'groom', 'mother_in_law', 'neighbor', 'boss',
    'running', 'flying', 'falling', 'swimming', 'crying', 'laughing', 'kissing', 'hugging', 'washing', 'cleaning',

    // Batch 13 (50 items)
    'white', 'black', 'red', 'blue', 'green', 'yellow', 'purple',
    'one', 'two', 'three',
    'police', 'soldier', 'doctor', 'teacher', 'student', 'thief', 'enemy', 'friend', 'elder', 'stranger',
    'eye', 'hand', 'foot', 'head', 'heart', 'face', 'ear', 'nose', 'finger', 'blood',
    'tree', 'forest', 'river', 'lake', 'mountain', 'stone', 'mud', 'sand', 'wind', 'sky',
    'bear', 'lion', 'wolf', 'fox', 'pig', 'cow', 'sheep', 'chicken', 'monkey', 'spider',

    // Batch 12 (Home - 20 items)
    'road', 'food', 'bread', 'milk', 'clothes', 'bed', 'bathroom', 'kitchen', 'window', 'wall',
    'chair', 'table', 'room', 'basement', 'roof', 'carpet', 'lamp', 'candle', 'bag', 'hat',

    // Batch 11 (Animals - 10 items)
    'elephant', 'tiger', 'dolphin', 'whale', 'rabbit', 'bee', 'butterfly', 'ant', 'bat', 'owl'
];

console.log(`Checking ${batchSlugs.length} recent symbols for indexing integrity...`);

let missingCount = 0;
batchSlugs.forEach(slug => {
    // Check if file exists
    const filePath = path.join(contentDir, slug + '.json');
    if (!fs.existsSync(filePath)) {
        console.error(`❌ FILE MISSING: ${slug}.json`);
        missingCount++;
        return;
    }

    // Check if indexed
    if (!indexedSlugs.has(slug)) {
        console.error(`❌ INDEX ENTRY MISSING: ${slug}`);
        missingCount++;
    } else {
        // console.log(`✅ OK: ${slug}`);
    }
});

if (missingCount === 0) {
    console.log("✅ All checked Batch 11, 12, 13, 14 symbols (130 items) are correctly indexed.");
    console.log("   (Each symbol has at least one Turkish keyword pointing to it)");
} else {
    console.log(`⚠️  Found ${missingCount} issues.`);
}
