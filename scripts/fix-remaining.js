/**
 * Add setRequestLocale to all pages that use getTranslations
 * but don't have it yet. Also fix layout.
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'app', '[locale]');

// Fix layout: add generateStaticParams + setRequestLocale
function fixLayout() {
    const fp = path.join(base, 'layout.tsx');
    let c = fs.readFileSync(fp, 'utf8');

    if (c.includes('setRequestLocale')) {
        console.log('SKIP layout (already has setRequestLocale)');
        return;
    }

    // Add setRequestLocale import
    c = c.replace(
        "import { getMessages } from 'next-intl/server';",
        "import { getMessages, setRequestLocale } from 'next-intl/server';"
    );

    // Add generateStaticParams before metadata
    if (!c.includes('generateStaticParams')) {
        c = c.replace(
            "export const metadata",
            "export function generateStaticParams() {\r\n    return ['en', 'tr'].map((locale) => ({ locale }));\r\n}\r\n\r\nexport const metadata"
        );
    }

    // Add setRequestLocale after locale destructuring
    c = c.replace(
        "    const { locale } = await params;\r\n\r\n    if (!routing.locales.includes(locale as any)) {\r\n        notFound();\r\n    }",
        "    const { locale } = await params;\r\n    setRequestLocale(locale);"
    );

    fs.writeFileSync(fp, c);
    console.log('✓ Layout: added generateStaticParams + setRequestLocale');
}

// Fix pages: add setRequestLocale after locale destructuring
function fixPage(relPath) {
    const fp = path.join(base, relPath);
    if (!fs.existsSync(fp)) return;
    let c = fs.readFileSync(fp, 'utf8');

    if (!c.includes('getTranslations')) return;
    if (c.includes('setRequestLocale')) {
        console.log('SKIP', relPath, '(already has setRequestLocale)');
        return;
    }

    // Add setRequestLocale import
    c = c.replace(
        "import { getTranslations } from 'next-intl/server';",
        "import { getTranslations, setRequestLocale } from 'next-intl/server';"
    );

    // Add setRequestLocale after locale destructuring
    // Pattern: const { locale } = await params;
    c = c.replace(
        /(\s*const \{ locale[^}]*\} = await params;)\r?\n/g,
        (match) => {
            if (match.includes('setRequestLocale')) return match;
            return match.trimEnd() + '\r\n    setRequestLocale(locale);\r\n';
        }
    );

    fs.writeFileSync(fp, c);
    console.log('✓', relPath);
}

fixLayout();
fixPage(path.join('page.tsx'));                     // homepage
fixPage(path.join('about', 'page.tsx'));            // about
fixPage(path.join('privacy', 'page.tsx'));          // privacy
fixPage(path.join('blog', '[slug]', 'page.tsx'));   // blog post
fixPage(path.join('search', 'page.tsx'));           // search

console.log('\nDone!');
