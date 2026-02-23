/**
 * Regenerate thin content pages using GPT-4o-mini
 * Usage: node scripts/regenerate-thin.js
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const seoIndex = require('./data/seo_index.json');

// Find all noindex pages
const thinPages = Object.entries(seoIndex)
    .filter(([k, v]) => !v)
    .map(([k]) => {
        const [locale, slug] = k.split('/');
        return { locale, slug, key: k };
    });

console.log(`Found ${thinPages.length} thin pages to regenerate`);

const SYSTEM_PROMPT = `You are an expert dream interpretation content writer for DreamBoat Journal. 
You write rich, psychologically-informed content about dream symbols using Jungian archetypes, 
shadow work, and cosmic moon phase analysis. Your prose is engaging and mysterious but grounded.

Output ONLY valid JSON matching this exact schema (no markdown, no code fences):
{
  "localizedName": "Symbol Name",
  "title": "Page title",
  "seoDescription": "1 sentence SEO meta description",
  "introduction": "2 paragraphs, 120+ words, depth psychology perspective on this symbol",
  "symbolism": "2 paragraphs, 120+ words, Jungian symbolism deep dive",
  "cosmicAnalysis": "4 moon phases analysis with emoji headers, 150+ words total",
  "commonScenarios": [
    {"scenario": "Dreaming of X doing Y", "interpretation": "This represents..."},
    {"scenario": "...", "interpretation": "..."},
    {"scenario": "...", "interpretation": "..."},
    {"scenario": "...", "interpretation": "..."},
    {"scenario": "...", "interpretation": "..."}
  ],
  "faqs": [
    {"question": "What does it mean to dream of X?", "answer": "..."},
    {"question": "Is dreaming of X good or bad?", "answer": "..."},
    {"question": "What does X symbolize psychologically?", "answer": "..."}
  ]
}`;

async function regenerate(locale, slug) {
    const langInstruction = locale === 'tr'
        ? 'Write ENTIRELY in Turkish (Türkçe). The localizedName should be the Turkish name for this symbol.'
        : 'Write in English.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: `Generate dream interpretation content for the symbol: "${slug}". ${langInstruction}` }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    // Strip markdown code fences if present
    const cleanJson = text.replace(/^```json?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
    return JSON.parse(cleanJson);
}

async function main() {
    for (const { locale, slug, key } of thinPages) {
        console.log(`Regenerating ${key}...`);
        try {
            const content = await regenerate(locale, slug);
            const outPath = path.join('content', locale, 'meanings', `${slug}.json`);
            fs.writeFileSync(outPath, JSON.stringify(content, null, 2));
            console.log(`  ✓ Written to ${outPath}`);
        } catch (err) {
            console.error(`  ✗ Failed: ${err.message}`);
        }
    }
    console.log('\nDone! Run "node scripts/build-seo-index.js" to rebuild SEO index.');
}

main();
