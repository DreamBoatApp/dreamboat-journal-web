// Auto-generated alias mapping
// Maps association words to their main symbol for redirects
// Example: "viper" -> "snake", "shedding" -> "snake"

const dictionary = require('./source_dictionary');

// Build the alias map
const aliasMap = {};

for (const [symbol, data] of Object.entries(dictionary)) {
    const mainSlug = symbol.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    // Add each association as an alias pointing to the main symbol
    for (const association of data.associations) {
        const aliasSlug = association.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

        // Don't overwrite if alias already points to something
        // (first definition wins)
        if (!aliasMap[aliasSlug]) {
            aliasMap[aliasSlug] = mainSlug;
        }
    }
}

module.exports = aliasMap;

// Debug: show some examples
if (require.main === module) {
    console.log('Sample aliases:');
    console.log('viper ->', aliasMap['viper']);
    console.log('shedding ->', aliasMap['shedding']);
    console.log('mane ->', aliasMap['mane']);
    console.log('Total aliases:', Object.keys(aliasMap).length);
}
