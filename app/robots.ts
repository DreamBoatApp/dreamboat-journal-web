import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',           // API routes — no index value
                    '/*/search',       // Search results — thin/duplicate
                    '/_next/',         // Next.js internals
                    '/private/',       // Private routes
                ],
            },
        ],
        sitemap: 'https://dreamboatjournal.com/sitemap.xml',
    };
}
