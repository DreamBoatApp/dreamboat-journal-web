/**
 * Build Related Symbols Index
 * 
 * Groups dream symbols by category (animal, emotion, place, body, etc.)
 * and creates a related_symbols.json mapping each slug to 6 related symbols.
 */

const fs = require('fs');
const path = require('path');
const dictionary = require('./data/source_dictionary');

// Category keywords for classification
const CATEGORIES = {
    animal: ['aardvark', 'aardwolf', 'abyssinian', 'adelie', 'alligator', 'ant', 'antelope', 'ape', 'bat', 'bear', 'bee', 'bird', 'buffalo', 'bull', 'butterfly', 'camel', 'cat', 'cattle', 'chameleon', 'cheetah', 'chicken', 'cobra', 'cow', 'crab', 'crane', 'crocodile', 'crow', 'deer', 'dinosaur', 'dog', 'dolphin', 'donkey', 'dove', 'dragon', 'dragonfly', 'duck', 'eagle', 'eel', 'elephant', 'falcon', 'fish', 'flamingo', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'goose', 'gorilla', 'grasshopper', 'hamster', 'hare', 'hawk', 'hedgehog', 'hen', 'heron', 'hippo', 'hippopotamus', 'horse', 'hummingbird', 'hyena', 'iguana', 'insect', 'jaguar', 'jellyfish', 'kangaroo', 'kitten', 'koala', 'ladybug', 'lamb', 'leopard', 'lion', 'lizard', 'llama', 'lobster', 'lynx', 'macaw', 'monkey', 'moose', 'mosquito', 'moth', 'mouse', 'octopus', 'ostrich', 'otter', 'owl', 'ox', 'panda', 'panther', 'parrot', 'peacock', 'pelican', 'penguin', 'pig', 'pigeon', 'pony', 'porcupine', 'puppy', 'rabbit', 'raccoon', 'raven', 'rooster', 'salmon', 'scorpion', 'seal', 'shark', 'sheep', 'shrimp', 'snail', 'snake', 'sparrow', 'spider', 'squid', 'squirrel', 'stag', 'stork', 'swan', 'tiger', 'toad', 'tortoise', 'turkey', 'turtle', 'unicorn', 'viper', 'vulture', 'wasp', 'whale', 'wolf', 'worm', 'zebra'],
    emotion: ['abandon', 'abandonment', 'acceptance', 'addiction', 'admiration', 'adore', 'affection', 'aggression', 'ambition', 'ambivalence', 'anger', 'anguish', 'anxiety', 'betrayal', 'bliss', 'boredom', 'calm', 'compassion', 'confusion', 'contentment', 'courage', 'curiosity', 'defeat', 'depression', 'desire', 'despair', 'devotion', 'disappointment', 'disgust', 'ecstasy', 'embarrassment', 'empathy', 'envy', 'euphoria', 'excitement', 'exhaustion', 'fascination', 'fear', 'forgiveness', 'freedom', 'frustration', 'gratitude', 'grief', 'guilt', 'happiness', 'harmony', 'hate', 'hope', 'humiliation', 'impatience', 'independence', 'indifference', 'innocence', 'insecurity', 'inspiration', 'jealousy', 'joy', 'kindness', 'loneliness', 'longing', 'love', 'melancholy', 'mercy', 'nostalgia', 'obsession', 'optimism', 'panic', 'passion', 'patience', 'peace', 'pity', 'pride', 'rage', 'regret', 'relief', 'remorse', 'resentment', 'revenge', 'romance', 'sadness', 'satisfaction', 'serenity', 'shame', 'shock', 'sorrow', 'sympathy', 'tenderness', 'terror', 'trust', 'vulnerability', 'warmth', 'wisdom', 'wonder', 'worry'],
    place: ['apartment', 'arena', 'attic', 'balcony', 'barn', 'basement', 'bathroom', 'beach', 'bedroom', 'bridge', 'building', 'cabin', 'cafe', 'camp', 'campus', 'canyon', 'castle', 'cave', 'cemetery', 'church', 'city', 'classroom', 'cliff', 'clinic', 'corridor', 'cottage', 'courtyard', 'dam', 'desert', 'door', 'dungeon', 'factory', 'farm', 'field', 'forest', 'fountain', 'gallery', 'garden', 'garage', 'gate', 'graveyard', 'gym', 'hall', 'harbor', 'highway', 'hill', 'home', 'hospital', 'hotel', 'house', 'hut', 'island', 'jungle', 'kitchen', 'laboratory', 'lake', 'library', 'lighthouse', 'mansion', 'market', 'meadow', 'monastery', 'monument', 'mosque', 'mountain', 'museum', 'ocean', 'office', 'oasis', 'palace', 'park', 'path', 'pharmacy', 'pier', 'planet', 'playground', 'pool', 'port', 'prison', 'pyramid', 'restaurant', 'river', 'road', 'roof', 'room', 'ruins', 'school', 'sea', 'shore', 'stadium', 'stairs', 'station', 'store', 'street', 'studio', 'suburb', 'swamp', 'temple', 'theater', 'tower', 'train', 'tunnel', 'university', 'valley', 'village', 'volcano', 'waterfall', 'well', 'window', 'zoo'],
    body: ['abdomen', 'ankle', 'arm', 'back', 'beard', 'blood', 'bone', 'brain', 'breast', 'cheek', 'chest', 'chin', 'ear', 'elbow', 'eye', 'face', 'finger', 'foot', 'forehead', 'hair', 'hand', 'head', 'heart', 'hip', 'jaw', 'kidney', 'knee', 'leg', 'lip', 'liver', 'lungs', 'mouth', 'muscle', 'nail', 'navel', 'neck', 'nose', 'palm', 'rib', 'shoulder', 'skeleton', 'skin', 'skull', 'spine', 'stomach', 'teeth', 'throat', 'thumb', 'toe', 'tongue', 'vein', 'waist', 'wrist'],
    nature: ['acacia', 'acanthus', 'acorn', 'aurora', 'autumn', 'avalanche', 'bamboo', 'basil', 'blossom', 'blizzard', 'breeze', 'bush', 'cactus', 'cherry', 'cloud', 'clover', 'coral', 'daisy', 'dawn', 'dew', 'dust', 'earthquake', 'eclipse', 'elm', 'emerald', 'fern', 'flood', 'flower', 'fog', 'frost', 'gale', 'gem', 'glacier', 'grass', 'hail', 'harvest', 'herb', 'horizon', 'hurricane', 'ice', 'iris', 'ivy', 'jasmine', 'lavender', 'leaf', 'lightning', 'lily', 'lotus', 'magma', 'maple', 'meteor', 'mist', 'moon', 'moss', 'mud', 'mushroom', 'oak', 'orchid', 'pebble', 'peony', 'pine', 'planet', 'pollen', 'quartz', 'rain', 'rainbow', 'reef', 'river', 'rock', 'root', 'rose', 'sand', 'sapphire', 'sea', 'seed', 'sky', 'snow', 'spring', 'star', 'stone', 'storm', 'stream', 'summer', 'sun', 'sunflower', 'sunrise', 'sunset', 'swamp', 'thunder', 'tide', 'tree', 'tulip', 'vine', 'violet', 'volcano', 'wave', 'weed', 'wildflower', 'willow', 'wind', 'winter'],
    object: ['abacus', 'accordion', 'anchor', 'anvil', 'arrow', 'axe', 'bag', 'ball', 'balloon', 'basket', 'bell', 'blanket', 'book', 'bottle', 'bow', 'box', 'bracelet', 'broom', 'bucket', 'button', 'cage', 'candle', 'car', 'carpet', 'chain', 'chair', 'chest', 'clock', 'coin', 'compass', 'cord', 'cradle', 'crown', 'cup', 'curtain', 'cushion', 'dagger', 'desk', 'diamond', 'diary', 'doll', 'door', 'dress', 'drum', 'fan', 'feather', 'flag', 'flute', 'fork', 'frame', 'glass', 'glove', 'guitar', 'hammer', 'harp', 'hat', 'helmet', 'jar', 'jewel', 'key', 'kite', 'knife', 'ladder', 'lamp', 'lantern', 'locket', 'loom', 'map', 'mask', 'medal', 'mirror', 'necklace', 'needle', 'net', 'oven', 'paddle', 'paintbrush', 'pearl', 'pen', 'pencil', 'phone', 'piano', 'pillow', 'pipe', 'plate', 'pocket', 'pot', 'purse', 'quilt', 'radio', 'ribbon', 'ring', 'rope', 'rug', 'saddle', 'sail', 'scale', 'scissors', 'scroll', 'shield', 'ship', 'shoe', 'silk', 'spear', 'spoon', 'staff', 'stamp', 'stone', 'string', 'suit', 'sword', 'table', 'telescope', 'tent', 'thread', 'ticket', 'tools', 'torch', 'towel', 'toy', 'treasure', 'trophy', 'trumpet', 'umbrella', 'vase', 'violin', 'wallet', 'wand', 'watch', 'weapon', 'wheel', 'whistle', 'wig', 'wreath'],
    action: ['accompany', 'adventure', 'arrest', 'assault', 'attack', 'awaken', 'bathe', 'bite', 'bleed', 'bless', 'boil', 'break', 'breathe', 'build', 'burn', 'bury', 'buy', 'carry', 'catch', 'chase', 'cheat', 'chew', 'choke', 'clap', 'clean', 'climb', 'close', 'cook', 'crawl', 'create', 'cross', 'crush', 'cry', 'cut', 'dance', 'defend', 'deliver', 'demolish', 'destroy', 'dig', 'disappear', 'discover', 'dive', 'douse', 'draw', 'dream', 'dress', 'drink', 'drive', 'drown', 'eat', 'embrace', 'escape', 'excavate', 'exercise', 'explore', 'fall', 'feed', 'fight', 'find', 'float', 'fly', 'follow', 'forgive', 'freeze', 'gallop', 'gather', 'give', 'grab', 'grow', 'guard', 'guide', 'hang', 'harvest', 'haunt', 'heal', 'hear', 'hide', 'hike', 'hold', 'hug', 'hunt', 'hurt', 'inject', 'inspect', 'invade', 'invent', 'invite', 'jog', 'judge', 'jump', 'kick', 'kidnap', 'kill', 'kiss', 'kneel', 'knock', 'land', 'laugh', 'lead', 'learn', 'leave', 'lend', 'lie', 'lift', 'listen', 'lock', 'lose', 'march', 'marry', 'melt', 'mix', 'move', 'murder', 'nourish', 'open', 'operate', 'pack', 'paint', 'parachute', 'perform', 'plant', 'play', 'pray', 'protect', 'pull', 'punish', 'push', 'race', 'rain', 'read', 'receive', 'rescue', 'ride', 'rise', 'roar', 'rob', 'run', 'sail', 'save', 'scream', 'search', 'sell', 'send', 'sew', 'shake', 'shave', 'shoot', 'shop', 'shout', 'shower', 'shut', 'sing', 'sink', 'sit', 'skate', 'sleep', 'slide', 'slip', 'smell', 'smile', 'smoke', 'sneeze', 'soar', 'speak', 'spend', 'spy', 'stand', 'stare', 'steal', 'steer', 'step', 'stitch', 'stop', 'stretch', 'strike', 'stumble', 'succeed', 'suffocate', 'surrender', 'survive', 'swallow', 'sweep', 'swim', 'swing', 'tear', 'throw', 'tie', 'touch', 'transform', 'travel', 'trip', 'turn', 'twist', 'undress', 'unlock', 'unpack', 'urinate', 'vacuum', 'vanish', 'visit', 'vomit', 'wade', 'wait', 'wake', 'walk', 'wander', 'wash', 'watch', 'wave', 'weave', 'whisper', 'win', 'work', 'worship', 'wrap', 'wrestle', 'write', 'yell'],
    relationship: ['baby', 'birth', 'boy', 'boyfriend', 'bride', 'brother', 'child', 'children', 'companion', 'couple', 'dad', 'daughter', 'divorce', 'elder', 'enemy', 'ex', 'exboyfriend', 'exgirlfriend', 'family', 'father', 'fiance', 'fiancee', 'friend', 'gentleman', 'girl', 'girlfriend', 'grandchild', 'granddaughter', 'grandfather', 'grandmother', 'grandparent', 'grandson', 'groom', 'guardian', 'guest', 'heir', 'heiress', 'hero', 'heroine', 'husband', 'infant', 'kid', 'king', 'knight', 'lady', 'lover', 'maiden', 'man', 'marriage', 'mate', 'mentor', 'mistress', 'mom', 'mother', 'neighbor', 'nephew', 'niece', 'nun', 'nurse', 'orphan', 'parent', 'partner', 'passenger', 'peer', 'pilgrim', 'president', 'prince', 'princess', 'prisoner', 'prophet', 'queen', 'relative', 'rival', 'saint', 'servant', 'sibling', 'sister', 'son', 'spouse', 'stranger', 'student', 'teacher', 'thief', 'toddler', 'twin', 'uncle', 'victim', 'villain', 'wife', 'witch', 'wizard', 'woman'],
};

const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

// Classify each symbol
function classifySymbol(key) {
    const slug = slugify(key);
    for (const [category, keywords] of Object.entries(CATEGORIES)) {
        if (keywords.includes(slug)) return category;
    }
    return 'other';
}

// Build category groupings
const categoryGroups = {};
const symbolCategories = {};

const keys = Object.keys(dictionary);
keys.forEach(key => {
    const slug = slugify(key);
    const cat = classifySymbol(key);
    symbolCategories[slug] = cat;

    if (!categoryGroups[cat]) categoryGroups[cat] = [];
    categoryGroups[cat].push(slug);
});

// Build related symbols index
const relatedIndex = {};

keys.forEach(key => {
    const slug = slugify(key);
    const cat = symbolCategories[slug];
    const sameCategorySlugs = (categoryGroups[cat] || []).filter(s => s !== slug);

    // Pick up to 6 related symbols from same category
    const shuffled = sameCategorySlugs.sort(() => 0.5 - Math.random());
    relatedIndex[slug] = shuffled.slice(0, 6);
});

// Write output
const outputPath = path.join(__dirname, 'data', 'related_symbols.json');
fs.writeFileSync(outputPath, JSON.stringify(relatedIndex, null, 2));

// Stats
const catCounts = {};
for (const [slug, cat] of Object.entries(symbolCategories)) {
    catCounts[cat] = (catCounts[cat] || 0) + 1;
}
console.log('Category distribution:', catCounts);
console.log(`Written ${Object.keys(relatedIndex).length} entries to`, outputPath);
