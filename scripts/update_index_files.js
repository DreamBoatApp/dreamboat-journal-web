const fs = require('fs');
const path = require('path');

const newSlugsPath = path.join(__dirname, '../new_slugs.txt');
const keywordIndexPath = path.join(__dirname, 'data/keyword_index.js');
const verifyIndexPath = path.join(__dirname, 'verify_index.js');

try {
    const rawContent = fs.readFileSync(newSlugsPath, 'utf-8');

    // Extract Keyword Entries
    const keywordMatch = rawContent.match(/--- KEYWORD INDEX ENTRIES ---\r?\n([\s\S]*?)\r?\n--- VERIFY INDEX SLUGS ---/);
    if (!keywordMatch) throw new Error("Could not find KEYWORD INDEX ENTRIES block");
    const keywordEntries = keywordMatch[1].trim();

    // Extract Verify Slugs
    const verifyMatch = rawContent.match(/--- VERIFY INDEX SLUGS ---\r?\n([\s\S]*?)\r?\nTotal new items:/);
    if (!verifyMatch) throw new Error("Could not find VERIFY INDEX SLUGS block");
    const verifySlugs = verifyMatch[1].trim();

    // Update keyword_index.js
    let keywordFileContent = fs.readFileSync(keywordIndexPath, 'utf-8');
    // Find the last closing brace of the object
    const lastBraceIndex = keywordFileContent.lastIndexOf('};');
    if (lastBraceIndex === -1) throw new Error("Could not find closing brace in keyword_index.js");

    const newKeywordContent = keywordFileContent.slice(0, lastBraceIndex) +
        `\n    // Batch 19 & New Discoveries\n` +
        keywordEntries +
        `\n` +
        keywordFileContent.slice(lastBraceIndex);

    fs.writeFileSync(keywordIndexPath, newKeywordContent, 'utf-8');
    console.log("Updated keyword_index.js");

    // Update verify_index.js
    let verifyFileContent = fs.readFileSync(verifyIndexPath, 'utf-8');
    const lastBracketIndex = verifyFileContent.lastIndexOf('];');
    if (lastBracketIndex === -1) throw new Error("Could not find closing bracket in verify_index.js");

    // Clean up slugs string (it's comma separated, but we want to format it nicely)
    // The verifySlugs string is like 'slug1', 'slug2', ...
    // We can just prepend it with `    // Batch 19\n    `

    // Split slugs by comma to format them if needed, or just dump them.
    // The format in the file is: 'slug', 'slug', ...
    // verify_index.js format is:
    // 'slug', 'slug', ...

    const newVerifyContent = verifyFileContent.slice(0, lastBracketIndex) +
        `\n    // Batch 19 & New Discoveries\n    ` +
        verifySlugs +
        `\n` +
        verifyFileContent.slice(lastBracketIndex);

    fs.writeFileSync(verifyIndexPath, newVerifyContent, 'utf-8');
    console.log("Updated verify_index.js");

} catch (error) {
    console.error("Error:", error);
}
