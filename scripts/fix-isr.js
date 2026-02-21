/**
 * ISR Fix: Replace generateStaticParams with revalidate on meaning/dictionary/guide pages
 * Pages are rendered on first request and cached by Vercel CDN.
 * setRequestLocale is kept for proper next-intl locale handling.
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'app', '[locale]');

// 1. Meaning page: remove generateStaticParams, add revalidate
const meaningPage = path.join(base, 'meaning', '[slug]', 'page.tsx');
let mc = fs.readFileSync(meaningPage, 'utf8');

// Remove the full generateStaticParams function
mc = mc.replace(
    /\/\/ SSG: pre-render all meaning pages at build time\nexport async function generateStaticParams\(\) \{[\s\S]*?\n\}\n/,
    '// ISR: cache on CDN after first visit, revalidate every 7 days\nexport const revalidate = 604800;\n\n'
);

fs.writeFileSync(meaningPage, mc);
console.log('✓ Meaning page: generateStaticParams → revalidate');

// 2. Dictionary page: remove generateStaticParams, add revalidate
const dictPage = path.join(base, 'dictionary', '[letter]', 'page.tsx');
let dc = fs.readFileSync(dictPage, 'utf8');

dc = dc.replace(
    /\/\/ SSG: pre-render all letter pages at build time\nexport async function generateStaticParams\(\) \{[\s\S]*?\n\}\n/,
    '// ISR: cache on CDN after first visit, revalidate every 7 days\nexport const revalidate = 604800;\n\n'
);

fs.writeFileSync(dictPage, dc);
console.log('✓ Dictionary page: generateStaticParams → revalidate');

// 3. Guide page: remove generateStaticParams, add revalidate
const guidePage = path.join(base, 'guide', '[slug]', 'page.tsx');
let gc = fs.readFileSync(guidePage, 'utf8');

gc = gc.replace(
    /\/\/ SSG: pre-render all guide pages at build time\nexport async function generateStaticParams\(\) \{[\s\S]*?\n\}\n/,
    '// ISR: cache on CDN after first visit, revalidate every 7 days\nexport const revalidate = 604800;\n\n'
);

fs.writeFileSync(guidePage, gc);
console.log('✓ Guide page: generateStaticParams → revalidate');

// 4. Blog pages: add revalidate (they already have ISR from before but let's ensure)
const blogPage = path.join(base, 'blog', '[slug]', 'page.tsx');
let bc = fs.readFileSync(blogPage, 'utf8');
if (bc.includes("export const revalidate = 86400")) {
    console.log('✓ Blog post page: already has revalidate');
} else if (!bc.includes('revalidate')) {
    bc = bc.replace(
        /export default async function/,
        'export const revalidate = 604800;\n\nexport default async function'
    );
    fs.writeFileSync(blogPage, bc);
    console.log('✓ Blog post page: added revalidate');
}

const blogListPage = path.join(base, 'blog', 'page.tsx');
let blc = fs.readFileSync(blogListPage, 'utf8');
if (blc.includes("export const revalidate = 86400")) {
    console.log('✓ Blog list page: already has revalidate');
} else if (!blc.includes('revalidate')) {
    blc = blc.replace(
        /export default async function/,
        'export const revalidate = 604800;\n\nexport default async function'
    );
    fs.writeFileSync(blogListPage, blc);
    console.log('✓ Blog list page: added revalidate');
}

// 5. Layout: remove generateStaticParams (not needed for ISR)
const layoutPage = path.join(base, 'layout.tsx');
let lc = fs.readFileSync(layoutPage, 'utf8');
lc = lc.replace(
    /\/\/ SSG: generate pages for each locale\nexport function generateStaticParams\(\) \{\n    return \['en', 'tr'\]\.map\(\(locale\) => \(\{ locale \}\)\);\n\}\n\n/,
    ''
);
fs.writeFileSync(layoutPage, lc);
console.log('✓ Layout: removed generateStaticParams');

console.log('\nDone! All pages now use ISR (revalidate = 604800).');
