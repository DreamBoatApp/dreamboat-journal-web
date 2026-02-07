const fs = require('fs');
const path = require('path');

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');

// Common English words that shouldn't appear in Turkish content frequently
const ENGLISH_INDICATORS = [
    ' the ', ' is ', ' are ', ' and ', ' of ', ' to ', ' in ', ' that ', ' with ', ' as ', ' for ',
    ' dream ', ' symbol ', ' meaning ', ' interpretation ', ' because '
];

function scan() {
    console.log("🔍 Scanning Turkish content for hidden English text...");
    const files = fs.readdirSync(TR_DIR).filter(f => f.endsWith('.json'));
    let issues = 0;

    for (const file of files) {
        const content = JSON.parse(fs.readFileSync(path.join(TR_DIR, file), 'utf8'));
        const textToCheck = (content.introduction + " " + content.symbolism + " " + (content.seoDescription || "")).toLowerCase();

        let englishScore = 0;
        const matches = [];

        ENGLISH_INDICATORS.forEach(word => {
            if (textToCheck.includes(word)) {
                englishScore++;
                matches.push(word.trim());
            }
        });

        // Threshold: If distinct English common words appear more than 3 times, it's likely English.
        if (englishScore >= 3) {
            console.log(`❌ POTENTIAL ENGLISH DETECTED: ${file}`);
            console.log(`   Matches: ${matches.join(', ')}`);
            console.log(`   Preview: ${content.introduction.substring(0, 100)}...`);
            issues++;
        }
    }

    if (issues === 0) {
        console.log("✅ No significant English content detected in Turkish files.");
    } else {
        console.log(`⚠️ Found ${issues} files with potential English content.`);
    }
}

scan();
