const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../content/tr/meanings');
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));

let roboticCount = 0;
let invalidCount = 0;

console.log(`Scanning ${files.length} files...`);

files.forEach(file => {
    const filePath = path.join(CONTENT_DIR, file);
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(content);

        // 1. Check for Robotic Pattern
        // Pattern: "... sembolüdür. Rüyanızda ... karşılaşmak ... mesajlar taşır."
        const intro = json.introduction || "";
        if (intro.includes("sembolüdür.") && intro.includes("mesajlar taşır.") && intro.includes("Rüyanızda")) {
            console.log(`[ROBOTIC] ${file}`);
            roboticCount++;
        }

    } catch (e) {
        console.error(`[INVALID JSON] ${file}: ${e.message}`);
        invalidCount++;
    }
});

console.log(`\nSummary:`);
console.log(`- Robotic/Template Files: ${roboticCount}`);
console.log(`- Invalid JSON Files: ${invalidCount}`);
