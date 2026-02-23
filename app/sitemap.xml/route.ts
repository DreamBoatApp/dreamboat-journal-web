import { NextResponse } from 'next/server';
import dictionary from '@/scripts/data/source_dictionary';
import seoIndex from '@/scripts/data/seo_index.json';
import fs from 'fs';
import path from 'path';

// Dynamically calculate the number of sitemap chunks to match app/sitemap.ts
// This avoids the sitemap index getting out of sync with actual chunk files.

const BASE_URL = 'https://dreamboatjournal.com';
const LOCALES = ['en', 'tr'];
const CHUNK_SIZE = 2000;

function countRoutes(): number {
    let count = 0;
    for (const locale of LOCALES) {
        // Static pages: home, blog, dictionary, about, privacy = 5
        count += 5;
        // Dictionary letter pages: 26
        count += 26;
        // Blog posts
        try {
            const blogDir = path.join(process.cwd(), 'content', locale, 'blog');
            if (fs.existsSync(blogDir)) {
                count += fs.readdirSync(blogDir).filter(f => f.endsWith('.json')).length;
            }
        } catch { }
        // Meaning pages (only indexable ones)
        const seo = seoIndex as Record<string, boolean>;
        const keys = Object.keys(dictionary);
        keys.forEach(key => {
            const slug = key.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
            if (seo[`${locale}/${slug}`] !== false) count++;
        });
    }
    return count;
}

export async function GET() {
    const totalRoutes = countRoutes();
    const chunkCount = Math.ceil(totalRoutes / CHUNK_SIZE);

    const sitemaps = Array.from({ length: chunkCount }, (_, i) =>
        `  <sitemap>\n    <loc>${BASE_URL}/sitemap/${i}.xml</loc>\n  </sitemap>`
    ).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
