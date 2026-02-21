/**
 * SSG Fix: Add setRequestLocale() to all pages that use getTranslations
 * AND add generateStaticParams to layout for next-intl SSG support
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'app', '[locale]');

// Fix pages
function fixPage(filePath) {
    if (!fs.existsSync(filePath)) return;
    let c = fs.readFileSync(filePath, 'utf8');
    if (!c.includes('getTranslations')) return;
    if (c.includes('setRequestLocale')) return console.log('SKIP (already has setRequestLocale)', filePath);

    // Add setRequestLocale import
    c = c.replace(
        /import\s*\{\s*getTranslations\s*\}\s*from\s*'next-intl\/server'/,
        "import { getTranslations, setRequestLocale } from 'next-intl/server'"
    );

    // Find locale destructuring and add setRequestLocale after it
    // Pattern: const { locale, ... } = await params;
    c = c.replace(
        /(const\s*\{[^}]*locale[^}]*\}\s*=\s*await\s*params\s*;)/g,
        (match) => match + '\n    setRequestLocale(locale);'
    );

    fs.writeFileSync(filePath, c);
    console.log('FIXED', path.relative(path.join(__dirname, '..'), filePath));
}

// Fix layout - add generateStaticParams
function fixLayout() {
    const layoutPath = path.join(base, 'layout.tsx');
    let c = fs.readFileSync(layoutPath, 'utf8');

    // Check if generateStaticParams already exists
    if (c.includes('generateStaticParams')) {
        console.log('SKIP layout (already has generateStaticParams)');
    } else {
        // Add generateStaticParams after the imports
        // Add it right before "export const metadata"
        c = c.replace(
            /export const metadata/,
            `// SSG: generate pages for each locale
export function generateStaticParams() {
    return ['en', 'tr'].map((locale) => ({ locale }));
}

export const metadata`
        );
        console.log('ADDED generateStaticParams to layout');
    }

    // Check if setRequestLocale is imported
    if (!c.includes('setRequestLocale')) {
        c = c.replace(
            /import\s*\{\s*getMessages\s*\}\s*from\s*'next-intl\/server'/,
            "import { getMessages, setRequestLocale } from 'next-intl/server'"
        );
        // Add setRequestLocale after locale destructuring
        c = c.replace(
            /(const\s*\{\s*locale\s*\}\s*=\s*await\s*params\s*;)/,
            (match) => match + '\n    setRequestLocale(locale);'
        );
        console.log('ADDED setRequestLocale to layout');
    }

    fs.writeFileSync(layoutPath, c);
}

function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) walk(fp);
        else if (f === 'page.tsx') fixPage(fp);
    });
}

console.log('--- Fixing layout ---');
fixLayout();
console.log('\n--- Fixing pages ---');
walk(base);
console.log('\nDone!');
