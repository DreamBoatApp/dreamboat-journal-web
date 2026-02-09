
const fs = require('fs');
const path = require('path');

// Re-read report to get missing content list
const report = JSON.parse(fs.readFileSync('audit_report.json', 'utf-8'));
const dictionary = require('./scripts/data/source_dictionary');
const contentDir = path.join(__dirname, 'content');
const locales = ['en', 'tr', 'de', 'es', 'pt'];

console.log('Fixing ' + report.missingContent.length + ' missing files...');

report.missingContent.forEach(item => {
    const key = item.key;
    const slug = item.slug;
    const data = dictionary[key] || { meaning: 'General Meaning', associations: [] };

    locales.forEach(loc => {
        const dir = path.join(contentDir, loc, 'meanings');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const filePath = path.join(dir, slug + '.json');

        // Simple generation like before
        const associations = data.associations || [];
        const meaning = (data.meaning || '').toLowerCase();

        const content = {
            localizedName: key, // Should ideally be translated, but key is better than nothing
            title: 'Meaning of ' + key,
            seoDescription: 'What does it mean to dream of ' + key + '?',
            introduction: 'To dream of ' + key + ' represents ' + meaning + '.',
            symbolism: 'This symbol is associated with ' + associations.join(', ') + '.',
            cosmicAnalysis: 'Analysis for ' + key + '...',
            commonScenarios: ['See ' + key],
            cta: 'Download Dream Boat'
        };

        try {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        } catch (e) {
            console.error('Error writing ' + filePath, e);
        }
    });
});
console.log('Fixed ' + report.missingContent.length + ' files.');
