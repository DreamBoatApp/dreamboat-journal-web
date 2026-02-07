const fs = require('fs').promises;
const path = require('path');

const TR_DIR = path.join(__dirname, '../content/tr/meanings');

const TARGET_FILES = [
    'avocado.json', 'bamboo.json', 'hammock.json', 'fig.json',
    'juggler.json', 'lavender.json', 'mushroom.json',
    'pomegranate.json', 'orchid.json', 'lipstick.json'
];

async function fixFile(filename) {
    const filePath = path.join(TR_DIR, filename);
    try {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const content = JSON.parse(rawContent);

        if (Array.isArray(content.commonScenarios) && content.commonScenarios.length > 0) {
            // Check if first item is an object
            if (typeof content.commonScenarios[0] === 'object' && content.commonScenarios[0] !== null && !Array.isArray(content.commonScenarios[0])) {
                console.log(`🔧 Fixing format for ${filename}...`);

                content.commonScenarios = content.commonScenarios.map(item => {
                    if (item.scenario && item.interpretation) {
                        return `${item.scenario}: ${item.interpretation}`;
                    }
                    return JSON.stringify(item); // Fallback
                });

                await fs.writeFile(filePath, JSON.stringify(content, null, 2));
                console.log(`   ✅ Fixed ${filename}`);
            } else {
                console.log(`   ℹ️ ${filename} is already in correct format.`);
            }
        }
    } catch (error) {
        console.error(`   ❌ Error processing ${filename}: ${error.message}`);
    }
}

async function main() {
    console.log('🔍 Checking new symbols for schema format...');
    for (const file of TARGET_FILES) {
        // Wait a bit if file doesn't differ exist yet (in case run in parallel with generator)
        try {
            await fs.access(path.join(TR_DIR, file));
            await fixFile(file);
        } catch (e) {
            console.log(`   ⚠️ File ${file} not found yet.`);
        }
    }
}

main();
