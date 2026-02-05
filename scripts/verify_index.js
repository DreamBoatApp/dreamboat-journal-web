const fs = require('fs');
const path = require('path');
const keywordIndex = require('./data/keyword_index');

const contentDir = path.join(__dirname, '../content/tr/meanings');
const indexedSlugs = new Set(Object.values(keywordIndex));

// Define recent batches to verify (Batch 11-15)
const batchSlugs = [

    // Batch 18 (100 items)
    'lawyer', 'judge', 'nurse', 'dentist', 'engineer', 'architect', 'barber', 'tailor', 'butcher', 'carpenter', 'gardener', 'firefighter', 'postman', 'waiter', 'secretary', 'artist', 'athlete', 'driver', 'maid', 'beggar',
    'airplane', 'train', 'subway', 'tram', 'taxi', 'motorcycle', 'ambulance', 'fire-truck', 'tractor', 'balloon', 'parachute', 'port', 'airport', 'station', 'traffic', 'crossroads', 'bus-terminal', 'gas-station', 'steering-wheel', 'wagon',
    'surgery', 'medicine', 'syringe', 'bleeding', 'bandage', 'pharmacy', 'wheelchair', 'crutch', 'lungs', 'brain', 'intestines', 'kidney', 'skin', 'sweat', 'thinness', 'obesity', 'fever', 'cough', 'fainting', 'band-aid',
    'cup', 'plate', 'fork', 'knife', 'spoon', 'pot', 'pan', 'tray', 'pitcher', 'bottle', 'fridge', 'washing-machine', 'dishwasher', 'oven', 'iron-appliance', 'vacuum-cleaner', 'air-conditioner', 'chandelier', 'curtain', 'quilt',
    'barn', 'well', 'cellar', 'labyrinth', 'ruins', 'castle', 'tower', 'town', 'city', 'pit', 'getting-lost', 'festival', 'lock', 'map', 'compass', 'passport', 'ticket', 'backpack', 'toy', 'letter',

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
    'elephant', 'tiger', 'dolphin', 'whale', 'rabbit', 'bee', 'butterfly', 'ant', 'bat', 'owl',

    // Batch 19 & New Discoveries
    'alley', 'altar', 'anchor', 'ancient', 'antenna', 'archery', 'attacking-angel', 'attacking-baby', 'attacking-bear', 'attacking-bird', 'attacking-blood', 'attacking-bridge', 'attacking-car', 'attacking-cat', 'attacking-crying', 'attacking-dancing', 'attacking-death', 'attacking-demon', 'attacking-dog', 'attacking-door', 'attacking-dragon', 'attacking-elephant', 'attacking-fighting', 'attacking-fire', 'attacking-fish', 'attacking-flying', 'attacking-ghost', 'attacking-horse', 'attacking-house', 'attacking-key', 'attacking-knife', 'attacking-lion', 'attacking-money', 'attacking-mountain', 'attacking-ocean', 'attacking-rain', 'attacking-running', 'attacking-shark', 'attacking-snake', 'attacking-snow', 'attacking-spider', 'attacking-stairs', 'attacking-storm', 'attacking-swimming', 'attacking-teeth-falling-out', 'attacking-vampire', 'attacking-water', 'attacking-wedding', 'attacking-wolf', 'attacking-wound', 'attacking-zombie', 'attic', 'balcony', 'ball', 'banana', 'basketball', 'bathtub', 'beautiful', 'bed-sheet', 'beige', 'bell', 'bill', 'black-and-white', 'black-angel', 'black-baby', 'black-bear', 'black-bird', 'black-blood', 'black-bridge', 'black-car', 'black-cat', 'black-crying', 'black-dancing', 'black-death', 'black-demon', 'black-dog', 'black-door', 'black-dragon', 'black-elephant', 'black-fighting', 'black-fire', 'black-fish', 'black-flying', 'black-ghost', 'black-horse', 'black-house', 'black-key', 'black-knife', 'black-lion', 'black-money', 'black-mountain', 'black-ocean', 'black-rain', 'black-running', 'black-shark', 'black-snake', 'black-snow', 'black-spider', 'black-stairs', 'black-storm', 'black-swimming', 'black-teeth-falling-out', 'black-vampire', 'black-water', 'black-wedding', 'black-wolf', 'black-wound', 'black-zombie', 'blanket', 'blurry', 'bookshelf', 'boxing', 'broken', 'brush', 'bucket', 'bull', 'button', 'cable', 'cage', 'calculator', 'calendar', 'camouflage', 'campfire', 'carbon-paper', 'ceiling', 'charger', 'chasing-angel', 'chasing-baby', 'chasing-bear', 'chasing-bird', 'chasing-blood', 'chasing-bridge', 'chasing-car', 'chasing-cat', 'chasing-crying', 'chasing-dancing', 'chasing-death', 'chasing-demon', 'chasing-dog', 'chasing-door', 'chasing-dragon', 'chasing-elephant', 'chasing-fighting', 'chasing-fire', 'chasing-fish', 'chasing-flying', 'chasing-ghost', 'chasing-horse', 'chasing-house', 'chasing-key', 'chasing-knife', 'chasing-lion', 'chasing-money', 'chasing-mountain', 'chasing-ocean', 'chasing-rain', 'chasing-running', 'chasing-shark', 'chasing-snake', 'chasing-snow', 'chasing-spider', 'chasing-stairs', 'chasing-storm', 'chasing-swimming', 'chasing-teeth-falling-out', 'chasing-vampire', 'chasing-water', 'chasing-wedding', 'chasing-wolf', 'chasing-wound', 'chasing-zombie', 'check', 'checkered', 'chimney', 'clean', 'closet', 'clown', 'cold', 'compass-drawing', 'console', 'contract', 'couch', 'credit-card', 'crowded', 'cushion', 'darkness', 'dead-angel', 'dead-baby', 'dead-bear', 'dead-bird', 'dead-blood', 'dead-bridge', 'dead-car', 'dead-cat', 'dead-crying', 'dead-dancing', 'dead-death', 'dead-demon', 'dead-dog', 'dead-door', 'dead-dragon', 'dead-elephant', 'dead-fighting', 'dead-fire', 'dead-fish', 'dead-flying', 'dead-ghost', 'dead-horse', 'dead-house', 'dead-key', 'dead-knife', 'dead-lion', 'dead-money', 'dead-mountain', 'dead-ocean', 'dead-rain', 'dead-running', 'dead-shark', 'dead-snake', 'dead-snow', 'dead-spider', 'dead-stairs', 'dead-storm', 'dead-swimming', 'dead-teeth-falling-out', 'dead-vampire', 'dead-water', 'dead-wedding', 'dead-wolf', 'dead-wound', 'dead-zombie', 'diary-book', 'diploma', 'dirty', 'doormat', 'download', 'drawer', 'drill', 'drone', 'dry', 'dust', 'dwarf', 'dying', 'envelope', 'eraser', 'fan', 'feces', 'fence', 'file-folder', 'fireplace', 'flag', 'flashlight', 'floor', 'flying-angel', 'flying-baby', 'flying-bear', 'flying-bird', 'flying-blood', 'flying-bridge', 'flying-car', 'flying-cat', 'flying-crying', 'flying-dancing', 'flying-death', 'flying-demon', 'flying-dog', 'flying-door', 'flying-dragon', 'flying-elephant', 'flying-fighting', 'flying-fire', 'flying-fish', 'flying-flying', 'flying-ghost', 'flying-horse', 'flying-house', 'flying-key', 'flying-knife', 'flying-lion', 'flying-money', 'flying-mountain', 'flying-ocean', 'flying-rain', 'flying-running', 'flying-shark', 'flying-snake', 'flying-snow', 'flying-spider', 'flying-stairs', 'flying-storm', 'flying-swimming', 'flying-teeth-falling-out', 'flying-vampire', 'flying-water', 'flying-wedding', 'flying-wolf', 'flying-wound', 'flying-zombie', 'football', 'four', 'frame', 'fresh', 'fruit', 'futuristic', 'gate', 'giant-angel', 'giant-baby', 'giant-bear', 'giant-bird', 'giant-blood', 'giant-bridge', 'giant-car', 'giant-cat', 'giant-crying', 'giant-dancing', 'giant-death', 'giant-demon', 'giant-dog', 'giant-door', 'giant-dragon', 'giant-elephant', 'giant-fighting', 'giant-fire', 'giant-fish', 'giant-flying', 'giant-ghost', 'giant-horse', 'giant-house', 'giant-key', 'giant-knife', 'giant-lion', 'giant-money', 'giant-mountain', 'giant-ocean', 'giant-rain', 'giant-running', 'giant-shark', 'giant-snake', 'giant-snow', 'giant-spider', 'giant-stairs', 'giant-storm', 'giant-swimming', 'giant-teeth-falling-out', 'giant-vampire', 'giant-water', 'giant-wedding', 'giant-wolf', 'giant-wound', 'giant-zombie', 'globe', 'glowing', 'glue', 'golf', 'grail', 'grater', 'gray', 'hallway', 'headphones', 'heavy', 'hollow', 'hose', 'hot', 'ice', 'indigo', 'ink', 'insect', 'invisible', 'jar', 'jewelry', 'keychain', 'keyhole', 'knob', 'ladder', 'laptop', 'laser', 'lead', 'lightweight', 'luggage', 'magnet', 'makeup', 'mandala', 'maroon', 'mask', 'matte', 'mattress', 'medal', 'microphone', 'microscope', 'monster', 'mouse-computer', 'nail-hardware', 'nail', 'neon', 'newspaper', 'notebook', 'nudity', 'oil', 'orange', 'package', 'paint-brush', 'paint', 'paper', 'paperclip', 'pastel', 'pearl', 'pencil-sharpener', 'perfume', 'picture', 'pliers', 'plug', 'polka-dot', 'pool', 'postcard', 'purse', 'racket', 'rake', 'rat', 'razor', 'receipt', 'red-angel', 'red-baby', 'red-bear', 'red-bird', 'red-blood', 'red-bridge', 'red-car', 'red-cat', 'red-crying', 'red-dancing', 'red-death', 'red-demon', 'red-dog', 'red-door', 'red-dragon', 'red-elephant', 'red-fighting', 'red-fire', 'red-fish', 'red-flying', 'red-ghost', 'red-horse', 'red-key', 'red-knife', 'red-lion', 'red-money', 'red-mountain', 'red-ocean', 'red-rain', 'red-running', 'red-shark', 'red-snake', 'red-snow', 'red-spider', 'red-stairs', 'red-storm', 'red-swimming', 'red-teeth-falling-out', 'red-vampire', 'red-water', 'red-wedding', 'red-wolf', 'red-wound', 'red-zombie', 'referee', 'remote-control', 'rocket', 'rotten', 'rug', 'ruin', 'ruler', 'rust', 'safe-box', 'satellite', 'saw', 'scepter', 'screw', 'screwdriver', 'sculpture', 'seven', 'shadowy', 'shiny', 'shoelace', 'shower', 'signature', 'skateboard', 'skates', 'skiing', 'skyscraper', 'small-angel', 'small-baby', 'small-bear', 'small-bird', 'small-blood', 'small-bridge', 'small-car', 'small-cat', 'small-crying', 'small-dancing', 'small-death', 'small-demon', 'small-dog', 'small-door', 'small-dragon', 'small-elephant', 'small-fighting', 'small-fire', 'small-fish', 'small-flying', 'small-ghost', 'small-horse', 'small-house', 'small-key', 'small-knife', 'small-lion', 'small-money', 'small-mountain', 'small-ocean', 'small-rain', 'small-running', 'small-shark', 'small-snake', 'small-snow', 'small-spider', 'small-stairs', 'small-storm', 'small-swimming', 'small-teeth-falling-out', 'small-vampire', 'small-water', 'small-wedding', 'small-wolf', 'small-wound', 'small-zombie', 'smart-watch', 'soap', 'socket', 'sofa', 'sparkle', 'speaker', 'sponge', 'stamp-postage', 'stamp', 'stapler', 'striped', 'surfing', 'swimming-pool', 'sword', 'table-furniture', 'tablet', 'talking-angel', 'talking-baby', 'talking-bear', 'talking-bird', 'talking-blood', 'talking-bridge', 'talking-car', 'talking-cat', 'talking-crying', 'talking-dancing', 'talking-death', 'talking-demon', 'talking-dog', 'talking-door', 'talking-dragon', 'talking-elephant', 'talking-fighting', 'talking-fire', 'talking-fish', 'talking-flying', 'talking-ghost', 'talking-horse', 'talking-house', 'talking-key', 'talking-knife', 'talking-lion', 'talking-money', 'talking-mountain', 'talking-ocean', 'talking-rain', 'talking-running', 'talking-shark', 'talking-snake', 'talking-snow', 'talking-spider', 'talking-stairs', 'talking-storm', 'talking-swimming', 'talking-teeth-falling-out', 'talking-vampire', 'talking-water', 'talking-wedding', 'talking-wolf', 'talking-wound', 'talking-zombie', 'tape-measure', 'tape', 'telescope', 'tennis', 'tent', 'thread', 'throat', 'throne', 'tiny', 'toothbrush', 'towel', 'transparent', 'trash-can', 'trophy', 'turquoise', 'twelve', 'ugly', 'usb', 'veil', 'violet', 'volleyball', 'wardrobe', 'watch', 'wet', 'wheel', 'wheelbarrow', 'whistle', 'white-angel', 'white-baby', 'white-bear', 'white-bird', 'white-blood', 'white-bridge', 'white-car', 'white-cat', 'white-crying', 'white-dancing', 'white-death', 'white-demon', 'white-dog', 'white-door', 'white-dragon', 'white-elephant', 'white-fighting', 'white-fire', 'white-fish', 'white-flying', 'white-ghost', 'white-horse', 'white-house', 'white-key', 'white-knife', 'white-lion', 'white-money', 'white-mountain', 'white-ocean', 'white-rain', 'white-running', 'white-shark', 'white-snake', 'white-snow', 'white-spider', 'white-stairs', 'white-storm', 'white-swimming', 'white-teeth-falling-out', 'white-vampire', 'white-water', 'white-wedding', 'white-wolf', 'white-wound', 'white-zombie', 'wire', 'wrench', 'wrestling'
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
    console.log("✅ All checked Batch 11, 12, 13, 14, 15, 16, 17, 18, 19 symbols are correctly indexed.");
    console.log("   (Each symbol has at least one Turkish keyword pointing to it)");
} else {
    console.log(`⚠️  Found ${missingCount} issues.`);
}
