const fs = require('fs');
const path = require('path');

const trDir = path.join(__dirname, '../content/tr/meanings');
const enDir = path.join(__dirname, '../content/en/meanings');

if (!fs.existsSync(trDir) || !fs.existsSync(enDir)) {
    console.log("Directories not found");
    process.exit(1);
}

const trFiles = fs.readdirSync(trDir);
const enFiles = fs.readdirSync(enDir);

const missing = trFiles.filter(file => !enFiles.includes(file));

console.log(`Total TR files: ${trFiles.length}`);
console.log(`Total EN files: ${enFiles.length}`);
console.log(`Missing files count: ${missing.length}`);
console.log("--- Missing Files ---");
console.log(JSON.stringify(missing.slice(0, 50))); // Show first 50
