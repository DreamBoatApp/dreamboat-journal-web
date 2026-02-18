/**
 * Fix body content in TR meanings to match updated localizedName.
 * 
 * Strategy: For each duplicate group, we know the OLD shared Turkish name.
 * For slugs whose localizedName was changed to something different,
 * replace the old name in body text with the new name.
 */

const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'content', 'tr', 'meanings');

// Load the duplicate groups from the saved file
const dupes = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dupes.json'), 'utf8'));

// Text fields to update
const TEXT_FIELDS = ['introduction', 'symbolism', 'cosmicAnalysis', 'seoDescription'];

let totalFixed = 0;
let totalReplacements = 0;

for (const [oldName, slugs] of dupes) {
    for (const slug of slugs) {
        const filePath = path.join(dir, `${slug}.json`);
        if (!fs.existsSync(filePath)) continue;

        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const newName = content.localizedName;

        // Skip if the name didn't change
        if (newName === oldName) continue;

        let fileChanged = false;
        let replacements = 0;

        // Replace old name in text fields
        for (const field of TEXT_FIELDS) {
            if (!content[field]) continue;
            const oldText = content[field];

            // Replace oldName with newName (case-insensitive, preserving case pattern)
            // Handle both exact case and lowercase version
            let newText = oldText;

            // Replace exact old name
            if (newText.includes(oldName)) {
                newText = newText.split(oldName).join(newName);
            }
            // Replace lowercase version
            const oldLower = oldName.toLowerCase();
            const newLower = newName.toLowerCase();
            if (oldLower !== oldName && newText.toLowerCase().includes(oldLower)) {
                // Case-insensitive replace
                const regex = new RegExp(escapeRegex(oldLower), 'gi');
                newText = newText.replace(regex, (match) => {
                    // Preserve the case of the first char
                    if (match[0] === match[0].toUpperCase()) {
                        return newName;
                    }
                    return newLower;
                });
            }

            if (newText !== oldText) {
                content[field] = newText;
                fileChanged = true;
                replacements++;
            }
        }

        // Also fix commonScenarios array
        if (content.commonScenarios && Array.isArray(content.commonScenarios)) {
            content.commonScenarios = content.commonScenarios.map(s => {
                let newS = s;
                if (newS.includes(oldName)) {
                    newS = newS.split(oldName).join(newName);
                }
                const oldLower = oldName.toLowerCase();
                if (newS.toLowerCase().includes(oldLower)) {
                    const regex = new RegExp(escapeRegex(oldLower), 'gi');
                    newS = newS.replace(regex, (match) => {
                        if (match[0] === match[0].toUpperCase()) return newName;
                        return newName.toLowerCase();
                    });
                }
                if (newS !== s) {
                    fileChanged = true;
                    replacements++;
                }
                return newS;
            });
        }

        if (fileChanged) {
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
            totalFixed++;
            totalReplacements += replacements;
            if (replacements > 0) {
                console.log(`${slug}: "${oldName}" → "${newName}" (${replacements} field(s))`);
            }
        }
    }
}

console.log(`\n--- Summary ---`);
console.log(`Files updated: ${totalFixed}`);
console.log(`Total field replacements: ${totalReplacements}`);

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
