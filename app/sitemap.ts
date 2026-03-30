import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import dictionary from '@/scripts/data/source_dictionary';
import publishDates from '@/scripts/data/publish_dates.json';
import seoIndex from '@/scripts/data/seo_index.json';

const BASE_URL = 'https://dreamboatjournal.com';
const LOCALES = ['en', 'tr']; // Only indexable locales (de/es/pt 301→en)
const CHUNK_SIZE = 2000;

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

// Build the full list of sitemap entries once
function buildAllRoutes(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];
    const dates = publishDates as Record<string, { published: string; modified: string }>;
    const seo = seoIndex as Record<string, boolean>;

    LOCALES.forEach(locale => {
        // --- Static Pages ---
        routes.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date('2026-02-15'),
            changeFrequency: 'daily',
            priority: 1.0,
            alternates: {
                languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}` }), {})
            }
        });

        routes.push({
            url: `${BASE_URL}/${locale}/blog`,
            lastModified: new Date('2026-02-17'),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}/blog` }), {})
            }
        });

        routes.push({
            url: `${BASE_URL}/${locale}/dictionary`,
            lastModified: new Date('2026-02-15'),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}/dictionary` }), {})
            }
        });

        routes.push({
            url: `${BASE_URL}/${locale}/about`,
            lastModified: new Date('2026-01-15'),
            changeFrequency: 'monthly',
            priority: 0.5,
        });

        routes.push({
            url: `${BASE_URL}/${locale}/privacy`,
            lastModified: new Date('2026-01-15'),
            changeFrequency: 'yearly',
            priority: 0.3,
        });

        // --- Blog Posts (read real dates from JSON) ---
        try {
            const blogDir = path.join(process.cwd(), 'content', locale, 'blog');
            if (fs.existsSync(blogDir)) {
                fs.readdirSync(blogDir).filter(f => f.endsWith('.json')).forEach(f => {
                    try {
                        const blogContent = JSON.parse(fs.readFileSync(path.join(blogDir, f), 'utf-8'));
                        const slug = f.replace('.json', '');
                        const postDate = blogContent.date ? new Date(blogContent.date) : new Date('2026-02-17');

                        routes.push({
                            url: `${BASE_URL}/${locale}/blog/${slug}`,
                            lastModified: postDate,
                            changeFrequency: 'monthly',
                            priority: 0.7,
                            alternates: {
                                languages: LOCALES.reduce((acc, l) => ({
                                    ...acc, [l]: `${BASE_URL}/${l}/blog/${slug}`
                                }), {})
                            }
                        });
                    } catch { /* skip invalid JSON */ }
                });
            }
        } catch { /* blog dir missing is fine */ }

        // Dictionary letter pages
        const alphabet = locale === 'tr' 
            ? 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('') 
            : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const TR_LOWER_MAP: Record<string, string> = { 'I': 'ı', 'İ': 'i', 'Ç': 'ç', 'Ş': 'ş', 'Ğ': 'ğ', 'Ü': 'ü', 'Ö': 'ö' };
        alphabet.forEach(letter => {
            const letterSlug = locale === 'tr' && TR_LOWER_MAP[letter] ? TR_LOWER_MAP[letter] : letter.toLowerCase();
            routes.push({
                url: `${BASE_URL}/${locale}/dictionary/${letterSlug}`,
                lastModified: new Date('2026-02-15'),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });

        // --- Dynamic Meaning Pages (only indexable ones) ---
        const keys = Object.keys(dictionary);
        keys.forEach(key => {
            const slug = slugify(key);
            const seoKey = `${locale}/${slug}`;

            // Skip noindex pages — no point putting them in sitemap
            if (seo[seoKey] === false) return;

            // FIX: Skip meaning pages where the content JSON does not yet exist to prevent 404 indexing errors
            const filePath = path.join(process.cwd(), 'content', locale, 'meanings', `${slug}.json`);
            if (!fs.existsSync(filePath)) return;

            const pubDates = dates[slug];
            const lastMod = pubDates?.modified
                ? new Date(pubDates.modified)
                : new Date('2026-02-11');

            routes.push({
                url: `${BASE_URL}/${locale}/meaning/${slug}`,
                lastModified: lastMod,
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: {
                    languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}/meaning/${slug}` }), {})
                }
            });
        });
    });

    return routes;
}

// Next.js 15 sitemap index: generates /sitemap/0.xml, /sitemap/1.xml, etc.
export async function generateSitemaps() {
    const total = buildAllRoutes().length;
    const numChunks = Math.ceil(total / CHUNK_SIZE);
    return Array.from({ length: numChunks }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
    const all = buildAllRoutes();
    const start = id * CHUNK_SIZE;
    return all.slice(start, start + CHUNK_SIZE);
}
