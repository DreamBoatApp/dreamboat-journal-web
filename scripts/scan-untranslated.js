const fs = require('fs');
const path = require('path');

const TR_DIR = path.join(__dirname, '..', 'content', 'tr', 'meanings');

function isEnglish(text) {
    // Simple heuristic: if it contains only ASCII characters, it MIGHT be English.
    // Turkish has ç, ğ, ı, ö, ş, ü.
    // But some Turkish words are ASCII (e.g., "Araba", "Kalem").
    // Better check: If localizedName == filename-slug (with spaces), it's suspicious if the slug is English.
    return /^[a-zA-Z\s]+$/.test(text);
}

function scan() {
    const files = fs.readdirSync(TR_DIR);
    const suspicious = [];

    files.forEach(file => {
        if (!file.endsWith('.json')) return;

        try {
            const content = fs.readFileSync(path.join(TR_DIR, file), 'utf8');
            const json = JSON.parse(content);
            const name = json.localizedName;

            // Check specific known failures
            if (name === 'Sewing' || name === 'Alarm clock' || name === 'Airplane' || name === 'Airport') {
                suspicious.push({ file, name, reason: 'Known English' });
                return;
            }

            // Check if name matches slug exactly (case-insensitive)
            const slug = file.replace('.json', '').replace(/-/g, ' ');
            if (name.toLowerCase() === slug.toLowerCase()) {
                // It matches the slug. Is the slug clearly English?
                // This is hard to detect perfectly without a dictionary, but let's list them.
                suspicious.push({ file, name, reason: 'Matches Slug' });
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    });

    console.log(JSON.stringify(suspicious, null, 2));
}

scan();
