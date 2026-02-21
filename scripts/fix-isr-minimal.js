const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'app', '[locale]');

function replaceInFile(relPath, search, replace) {
    const fp = path.join(base, relPath);
    let c = fs.readFileSync(fp, 'utf8');
    if (!c.includes(search)) {
        console.log('SKIP', relPath, '- pattern not found');
        return;
    }
    c = c.replace(search, replace);
    fs.writeFileSync(fp, c);
    console.log('✓', relPath);
}

// Replace force-dynamic with revalidate on all 3 pages
// Use exact strings from the files (CRLF)
replaceInFile(
    path.join('meaning', '[slug]', 'page.tsx'),
    "export const dynamic = 'force-dynamic';",
    '// ISR: cache on Vercel CDN for 7 days\r\nexport const revalidate = 604800;'
);

replaceInFile(
    path.join('dictionary', '[letter]', 'page.tsx'),
    "export const dynamic = 'force-dynamic';",
    '// ISR: cache on Vercel CDN for 7 days\r\nexport const revalidate = 604800;'
);

replaceInFile(
    path.join('guide', '[slug]', 'page.tsx'),
    "export const dynamic = 'force-dynamic';",
    '// ISR: cache on Vercel CDN for 7 days\r\nexport const revalidate = 604800;'
);

// Also remove the empty generateStaticParams from meaning page
const mp = path.join(base, 'meaning', '[slug]', 'page.tsx');
let mc = fs.readFileSync(mp, 'utf8');
const gsRegex = /\r?\n\/\/ No static params.*\r?\nexport async function generateStaticParams\(\) \{\r?\n\s+return \[\];\r?\n\}/;
if (gsRegex.test(mc)) {
    mc = mc.replace(gsRegex, '');
    fs.writeFileSync(mp, mc);
    console.log('✓ Removed empty generateStaticParams from meaning page');
}

// Remove the dynamic comment from meaning page
const mp2 = path.join(base, 'meaning', '[slug]', 'page.tsx');
let mc2 = fs.readFileSync(mp2, 'utf8');
mc2 = mc2.replace(/\r?\n\/\/ Dynamic rendering required because getTranslations\(\) uses request context\r?\n/, '\r\n');
fs.writeFileSync(mp2, mc2);

console.log('\nDone!');
