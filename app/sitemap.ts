import { MetadataRoute } from 'next';
import dictionary from '@/scripts/data/source_dictionary';

const BASE_URL = 'https://dreamboatjournal.com';
const LOCALES = ['en', 'tr'];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    LOCALES.forEach(locale => {
        // --- Static Pages ---

        // Home
        routes.push({
            url: `${BASE_URL}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
            alternates: {
                languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}` }), {})
            }
        });

        // Dictionary Index
        routes.push({
            url: `${BASE_URL}/${locale}/dictionary`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: LOCALES.reduce((acc, l) => ({ ...acc, [l]: `${BASE_URL}/${l}/dictionary` }), {})
            }
        });

        // About
        routes.push({
            url: `${BASE_URL}/${locale}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        });

        // Privacy
        routes.push({
            url: `${BASE_URL}/${locale}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        });

        // Dictionary letter pages
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            routes.push({
                url: `${BASE_URL}/${locale}/dictionary/${letter.toLowerCase()}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });

        // --- Dynamic Meaning Pages ---
        const keys = Object.keys(dictionary);
        keys.forEach(key => {
            const slug = slugify(key);

            routes.push({
                url: `${BASE_URL}/${locale}/meaning/${slug}`,
                lastModified: new Date(),
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
