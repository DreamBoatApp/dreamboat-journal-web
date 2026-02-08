const fs = require('fs');
const path = require('path');
const dict = require('./data/source_dictionary.js');

const keys = Object.keys(dict);
const normalizedMap = new Map();
const duplicates = [];

keys.forEach(k => {
    // Normalize: remove spaces, underscores, toLowerCase
    // This mimics loose matching
    const norm = k.toLowerCase().replace(/[_ -]/g, '');
    if (normalizedMap.has(norm)) {
        duplicates.push({
            original: k,
            conflict: normalizedMap.get(norm)
        });
    } else {
        normalizedMap.set(norm, k);
    }
});

console.log(`Found ${duplicates.length} potential duplicates (by loose normalization):`);
duplicates.forEach(d => {
    console.log(`Key: "${d.original}" conflicts with "${d.conflict}"`);
});
