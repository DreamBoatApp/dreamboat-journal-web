import { NextResponse } from 'next/server';

// Manually serve a sitemap index because Next.js 15's generateSitemaps()
// only produces chunk files (/sitemap/0.xml, /sitemap/1.xml, etc.)
// but does NOT auto-generate a /sitemap.xml index file.
// Google Search Console needs /sitemap.xml to discover all chunks.

const BASE_URL = 'https://dreamboatjournal.com';

// Must match the number of chunks from app/sitemap.ts generateSitemaps()
const CHUNK_COUNT = 3; // 0, 1, 2

export async function GET() {
    const sitemaps = Array.from({ length: CHUNK_COUNT }, (_, i) =>
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
