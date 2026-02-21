/**
 * Test: add setRequestLocale to meaning page with only 1 slug
 * to isolate the prerender crash
 */
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, '..', 'app', '[locale]', 'meaning', '[slug]', 'page.tsx');
let c = fs.readFileSync(fp, 'utf8');

// 1. Add setRequestLocale import
c = c.replace(
    "import { getTranslations } from 'next-intl/server';",
    "import { getTranslations, setRequestLocale } from 'next-intl/server';"
);

// 2. Add setRequestLocale to generateMetadata
c = c.replace(
    "    const { locale, slug: rawSlug } = await params;\r\n    const slug = decodeURIComponent(rawSlug);\r\n    const content = getContent(locale, slug);\r\n\r\n    if (!content) return { title: 'Not Found' };",
    "    const { locale, slug: rawSlug } = await params;\r\n    setRequestLocale(locale);\r\n    const slug = decodeURIComponent(rawSlug);\r\n    const content = getContent(locale, slug);\r\n\r\n    if (!content) return { title: 'Not Found' };"
);

// 3. Add setRequestLocale to page component (first occurrence after function declaration)
c = c.replace(
    "export default async function MeaningPage({ params }: Props) {\r\n    const { locale, slug: rawSlug } = await params;\r\n    const slug = decodeURIComponent(rawSlug);",
    "export default async function MeaningPage({ params }: Props) {\r\n    const { locale, slug: rawSlug } = await params;\r\n    setRequestLocale(locale);\r\n    const slug = decodeURIComponent(rawSlug);"
);

// 4. Replace generateStaticParams to only generate 1 slug: retail
const gsOld = c.match(/\/\/ SSG: pre-render all meaning pages at build time[\s\S]*?return params;\r?\n\}/);
if (gsOld) {
    c = c.replace(gsOld[0],
        `// TEST: only prerender retail\r\nexport async function generateStaticParams() {\r\n    return [{ slug: 'retail' }];\r\n}`
    );
    console.log('Replaced generateStaticParams with single slug test');
} else {
    console.log('generateStaticParams pattern not found');
    // Try to find it anyway
    const idx = c.indexOf('generateStaticParams');
    if (idx >= 0) {
        console.log('Found at index', idx, ':', JSON.stringify(c.substring(idx, idx + 200)));
    }
}

// 5. Add generateStaticParams to layout
const layoutFp = path.join(__dirname, '..', 'app', '[locale]', 'layout.tsx');
let lc = fs.readFileSync(layoutFp, 'utf8');
if (!lc.includes('generateStaticParams')) {
    lc = lc.replace(
        "import { routing } from '@/i18n/routing';",
        "import { routing } from '@/i18n/routing';\r\nimport { setRequestLocale } from 'next-intl/server';"
    );
    lc = lc.replace(
        "export const metadata",
        "export function generateStaticParams() {\r\n    return ['en', 'tr'].map((locale) => ({ locale }));\r\n}\r\n\r\nexport const metadata"
    );
    // Add setRequestLocale to layout  
    lc = lc.replace(
        "    const { locale } = await params;\r\n\r\n    if (!routing.locales.includes(locale as any)) {",
        "    const { locale } = await params;\r\n    setRequestLocale(locale);\r\n\r\n    if (!routing.locales.includes(locale as any)) {"
    );
    fs.writeFileSync(layoutFp, lc);
    console.log('Updated layout with generateStaticParams + setRequestLocale');
} else {
    console.log('Layout already has generateStaticParams');
}

fs.writeFileSync(fp, c);
console.log('Done - meaning page ready for test build');
