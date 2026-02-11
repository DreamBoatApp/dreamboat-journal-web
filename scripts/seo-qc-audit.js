/**
 * SEO Quality Control Script
 * 
 * Audits all content files across all locales for:
 * - Missing required fields
 * - Title/description length (SEO optimal ranges)
 * - Content word count (thin content detection)
 * - FAQ presence (Tier 1 symbols should have unique FAQs)
 * - Duplicate titles
 * - Internal linking opportunities
 * - Orphan pages (no related symbols)
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'tr', 'es', 'de', 'pt'];
const CONTENT_ROOT = path.join(__dirname, '..', 'content');

const TIER1_SLUGS = [
    'snake', 'falling', 'teeth', 'death', 'cat', 'dog', 'water',
    'baby', 'pregnancy', 'flying', 'gold', 'blood', 'fire', 'rain',
    'house', 'love', 'horse', 'fish', 'spider', 'marriage'
];

// SEO limits
const TITLE_MIN = 30, TITLE_MAX = 60;
const DESC_MIN = 120, DESC_MAX = 160;
const MIN_WORD_COUNT = 300;
const MIN_SECTIONS = 3;

const issues = [];
const stats = { total: 0, withFaqs: 0, tier1WithFaqs: 0, thin: 0 };
const titleMap = {};

function wordCount(text) {
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
}

function auditMeanings(locale) {
    const dir = path.join(CONTENT_ROOT, locale, 'meanings');
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const slug = file.replace('.json', '');
        const filePath = path.join(dir, file);
        let content;
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            issues.push({ severity: 'ERROR', locale, slug, issue: `JSON parse error: ${e.message}` });
            continue;
        }

        stats.total++;
        const loc = `${locale}/${slug}`;

        // Required fields
        const required = ['title', 'seoDescription', 'introduction', 'symbolism'];
        for (const field of required) {
            if (!content[field]) {
                issues.push({ severity: 'ERROR', locale, slug, issue: `Missing required field: ${field}` });
            }
        }

        // Title length
        if (content.title) {
            const len = content.title.length;
            if (len < TITLE_MIN) issues.push({ severity: 'WARN', locale, slug, issue: `Title too short (${len}ch, min ${TITLE_MIN})` });
            if (len > TITLE_MAX) issues.push({ severity: 'WARN', locale, slug, issue: `Title too long (${len}ch, max ${TITLE_MAX})` });

            // Duplicate detection
            const key = content.title.toLowerCase().trim();
            if (titleMap[key]) {
                issues.push({ severity: 'WARN', locale, slug, issue: `Duplicate title with ${titleMap[key]}` });
            } else {
                titleMap[key] = loc;
            }
        }

        // Description length
        if (content.seoDescription) {
            const len = content.seoDescription.length;
            if (len < DESC_MIN) issues.push({ severity: 'INFO', locale, slug, issue: `Meta description short (${len}ch, target ${DESC_MIN}-${DESC_MAX})` });
            if (len > DESC_MAX) issues.push({ severity: 'INFO', locale, slug, issue: `Meta description long (${len}ch, target ${DESC_MIN}-${DESC_MAX})` });
        }

        // Word count (thin content)
        const totalWords = wordCount(content.introduction) + wordCount(content.symbolism) +
            wordCount(content.psychologicalPerspective) + wordCount(content.culturalContext);
        if (totalWords < MIN_WORD_COUNT) {
            issues.push({ severity: 'WARN', locale, slug, issue: `Thin content (${totalWords} words, min ${MIN_WORD_COUNT})` });
            stats.thin++;
        }

        // FAQ check
        if (content.faqs && content.faqs.length > 0) {
            stats.withFaqs++;
            if (TIER1_SLUGS.includes(slug)) stats.tier1WithFaqs++;
        } else if (TIER1_SLUGS.includes(slug)) {
            issues.push({ severity: 'WARN', locale, slug, issue: `Tier 1 symbol missing unique FAQs` });
        }
    }
}

function auditGuides(locale) {
    const dir = path.join(CONTENT_ROOT, locale, 'guides');
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const slug = file.replace('.json', '');
        let content;
        try {
            content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch { continue; }

        if (!content.sections || content.sections.length < MIN_SECTIONS) {
            issues.push({ severity: 'WARN', locale, slug, issue: `Guide has fewer than ${MIN_SECTIONS} sections` });
        }
        if (!content.relatedSymbols || content.relatedSymbols.length === 0) {
            issues.push({ severity: 'WARN', locale, slug, issue: `Guide has no related symbols (orphan page)` });
        }
    }
}

function auditBlog(locale) {
    const dir = path.join(CONTENT_ROOT, locale, 'blog');
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    for (const file of files) {
        const slug = file.replace('.json', '');
        let content;
        try {
            content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        } catch { continue; }

        if (!content.relatedSymbols || content.relatedSymbols.length === 0) {
            issues.push({ severity: 'WARN', locale, slug, issue: `Blog post has no related symbols (orphan page)` });
        }
        if (!content.faqs || content.faqs.length === 0) {
            issues.push({ severity: 'INFO', locale, slug, issue: `Blog post has no FAQs` });
        }
    }
}

// --- Run Audits ---
console.log('🔍 SEO Quality Control Audit\n');

for (const locale of LOCALES) {
    auditMeanings(locale);
    auditGuides(locale);
    auditBlog(locale);
}

// --- Report ---
const errors = issues.filter(i => i.severity === 'ERROR');
const warns = issues.filter(i => i.severity === 'WARN');
const infos = issues.filter(i => i.severity === 'INFO');

console.log('=== SUMMARY ===');
console.log(`Total content files audited: ${stats.total}`);
console.log(`Files with unique FAQs: ${stats.withFaqs} (${(stats.withFaqs / stats.total * 100).toFixed(1)}%)`);
console.log(`Tier 1 symbols with FAQs: ${stats.tier1WithFaqs}/${TIER1_SLUGS.length * LOCALES.length}`);
console.log(`Thin content pages: ${stats.thin}`);
console.log();
console.log(`❌ Errors: ${errors.length}`);
console.log(`⚠️  Warnings: ${warns.length}`);
console.log(`ℹ️  Info: ${infos.length}`);
console.log();

if (errors.length > 0) {
    console.log('--- ERRORS ---');
    errors.forEach(i => console.log(`  ${i.locale}/${i.slug}: ${i.issue}`));
    console.log();
}

if (warns.length > 0) {
    console.log('--- WARNINGS (Top 20) ---');
    warns.slice(0, 20).forEach(i => console.log(`  ${i.locale}/${i.slug}: ${i.issue}`));
    if (warns.length > 20) console.log(`  ... and ${warns.length - 20} more`);
    console.log();
}

// Locale breakdown
console.log('--- LOCALE BREAKDOWN ---');
for (const locale of LOCALES) {
    const dir = path.join(CONTENT_ROOT, locale, 'meanings');
    const count = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).length : 0;
    const guidesDir = path.join(CONTENT_ROOT, locale, 'guides');
    const guidesCount = fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter(f => f.endsWith('.json')).length : 0;
    const blogDir = path.join(CONTENT_ROOT, locale, 'blog');
    const blogCount = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter(f => f.endsWith('.json')).length : 0;
    console.log(`  ${locale.toUpperCase()}: ${count} meanings | ${guidesCount} guides | ${blogCount} blog posts`);
}

process.exit(errors.length > 0 ? 1 : 0);
