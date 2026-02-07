const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

// Manual .env loading
try {
    const envPath = path.join(__dirname, '../.env.local');
    const envContent = require('fs').readFileSync(envPath, 'utf-8');
    const match = envContent.match(/OPENAI_API_KEY=(sk-proj-[a-zA-Z0-9\-_]+)/);
    if (match) {
        process.env.OPENAI_API_KEY = match[1];
    }
} catch (e) { console.error("Could not read .env.local manually"); }

const apiKey = process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : null;

if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY is missing via .env.local');
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

const TR_DIR = path.join(__dirname, '../content/tr/meanings');

// Common English words found in localizedNames that indicate untranslated content
const ENGLISH_INDICATORS = [
    'Chasing', 'Dead', 'Fighting', 'Flying', 'Running', 'Swimming',
    'Talking', 'Walking', 'Crying', 'Eating', 'Falling', 'Killing',
    'Kissing', 'Laughing'
];

async function fixFile(filename) {
    const filePath = path.join(TR_DIR, filename);

    try {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const content = JSON.parse(rawContent);

        const localizedName = content.localizedName;

        // Check if localizedName contains English indicators
        const hasEnglishIndicator = ENGLISH_INDICATORS.some(ind => localizedName.includes(ind));

        // Also check if body has English indicators even if name is fixed
        const bodyHasEnglish = ENGLISH_INDICATORS.some(ind => JSON.stringify(content).includes(ind));

        if (!hasEnglishIndicator && !bodyHasEnglish) {
            return false;
        }

        console.log(`\n🔄 Fixing: ${filename}`);
        console.log(`   Current Name: "${localizedName}"`);

        // Use AI to translate and fix everything
        const prompt = `This Turkish dream interpretation file has mixed English/Turkish content.
The 'localizedName' might be in English (e.g., "Chasing baby") and needs to be translated to Turkish (e.g., "Bebek kovalamak").
The body text also contains English references to the symbol name which must be replaced with the Turkish equivalent.

Current Content:
${JSON.stringify(content, null, 2)}

INSTRUCTIONS:
1. Translate 'localizedName' to natural Turkish if it is in English.
2. In 'title', 'seoDescription', 'introduction', 'symbolism', 'cosmicAnalysis', 'commonScenarios', and 'cta':
   - Replace ALL English references to the symbol with the correct Turkish translation.
   - Fix any broken grammar resulting from the replacement.
   - Ensure the tone is mystical and professional.
3. Return ONLY the valid JSON content. Do not include markdown formatting.

Corrected JSON:`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        let fixedContent = completion.choices[0].message.content.trim();

        // Clean up response
        if (fixedContent.startsWith('```json')) {
            fixedContent = fixedContent.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (fixedContent.startsWith('```')) {
            fixedContent = fixedContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        // Parse and validate
        const parsedContent = JSON.parse(fixedContent);

        console.log(`   New Name: "${parsedContent.localizedName}"`);

        await fs.writeFile(filePath, JSON.stringify(parsedContent, null, 2));
        console.log(`   ✅ Fixed!`);
        return true;

    } catch (error) {
        console.error(`   ❌ Failed: ${filename} - ${error.message}`);
        return false;
    }
}

async function main() {
    const files = await fs.readdir(TR_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    console.log(`🔍 Scanning ${jsonFiles.length} files for remaining English content...`);

    // Prioritize files starting with known English prefixes for speed
    const englishPrefixes = ['chasing-', 'dead-', 'fighting-', 'flying-', 'running-', 'swimming-'];
    const priorityFiles = jsonFiles.filter(f => englishPrefixes.some(pre => f.startsWith(pre)));
    const otherFiles = jsonFiles.filter(f => !englishPrefixes.some(pre => f.startsWith(pre)));

    const allFiles = [...priorityFiles, ...otherFiles];

    let fixedCount = 0;
    // Process in chunks to avoid rate limits but still be fast
    const CHUNK_SIZE = 5;

    for (let i = 0; i < allFiles.length; i += CHUNK_SIZE) {
        const chunk = allFiles.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(file => fixFile(file));
        const results = await Promise.all(promises);
        fixedCount += results.filter(r => r).length;
    }

    console.log(`\n✅ Done! Fixed ${fixedCount} files.`);
}

main();
