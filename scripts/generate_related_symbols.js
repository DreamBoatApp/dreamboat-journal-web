/**
 * Generate semantically related symbols using GPT API.
 * Replaces the random related_symbols.json with meaningful relationships.
 * 
 * Usage: node scripts/generate_related_symbols.js
 * 
 * Processes symbols in batches of 50 to minimize API calls.
 * Uses gpt-4o-mini for cost efficiency (~$0.15/1M input tokens).
 */

const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BATCH_SIZE = 50;
const OUTPUT_FILE = path.join(__dirname, 'data', 'related_symbols.json');
const PROGRESS_FILE = path.join(__dirname, 'data', 'related_symbols_progress.json');

// Load all available symbols
function getAllSymbols() {
    const enDir = path.join(__dirname, '..', 'content', 'en', 'meanings');
    if (!fs.existsSync(enDir)) return [];
    return fs.readdirSync(enDir)
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
}

async function callGPT(batch) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: `You are a dream symbolism expert. Given a list of dream symbols, for each one suggest exactly 20 SEMANTICALLY RELATED single-word concepts.
                    
CRITICAL RULES:
1. FOCUS ON MEANING: Suggest words based on thematic, psychological, or archetypal connections.
2. NO SPELLING MATCHES: Do NOT suggest words just because they start with the same letters or sound similar. 
   - BAD: cat -> catacomb, cut, cot
   - GOOD: cat -> kitten, pet, animal, meow
3. Return valid JSON: {"symbolA": ["word1", "word2", ...], "symbolB": [...]}`
                },
                {
                    role: 'user',
                    content: `Generate 20 semantically related symbols for each of these dream symbols: ${batch.join(', ')}`
                }
            ],
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    return JSON.parse(content);
}

async function main() {
    const allSymbols = getAllSymbols();
    console.log(`Total symbols: ${allSymbols.length}`);

    // Load progress (resume support)
    let result = {};
    if (fs.existsSync(PROGRESS_FILE)) {
        result = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
        console.log(`Resuming from progress: ${Object.keys(result).length} symbols already done`);
    }

    // Filter out already processed symbols
    const remaining = allSymbols.filter(s => !result[s]);
    console.log(`Remaining: ${remaining.length} symbols`);

    // Create batches
    const batches = [];
    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        batches.push(remaining.slice(i, i + BATCH_SIZE));
    }
    console.log(`Batches: ${batches.length} (${BATCH_SIZE} per batch)`);

    let processedCount = Object.keys(result).length;

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        console.log(`\nBatch ${i + 1}/${batches.length}: ${batch.slice(0, 3).join(', ')}... (${batch.length} symbols)`);

        try {
            const batchResult = await callGPT(batch);

            // Merge results
            for (const [key, value] of Object.entries(batchResult)) {
                if (Array.isArray(value) && value.length > 0) {
                    // Validate that related symbols exist in our list
                    const validated = value.filter(v => allSymbols.includes(v)).slice(0, 6);
                    if (validated.length > 0) {
                        result[key] = validated;
                    }
                }
            }

            processedCount = Object.keys(result).length;
            console.log(`  ✓ Done. Total processed: ${processedCount}/${allSymbols.length}`);

            // Save progress every batch
            fs.writeFileSync(PROGRESS_FILE, JSON.stringify(result, null, 2));

            // Rate limit: 100ms between requests
            await new Promise(r => setTimeout(r, 100));

        } catch (err) {
            console.error(`  ✗ Batch ${i + 1} failed:`, err.message);
            // Save progress and continue
            fs.writeFileSync(PROGRESS_FILE, JSON.stringify(result, null, 2));
            // Wait longer on error
            await new Promise(r => setTimeout(r, 2000));
        }
    }

    // Final save
    console.log(`\n✅ Complete! ${Object.keys(result).length} symbols with related symbols.`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

    // Clean up progress file
    if (fs.existsSync(PROGRESS_FILE)) {
        fs.unlinkSync(PROGRESS_FILE);
    }

    console.log(`Saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
