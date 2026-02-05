import { MetadataRoute } from 'next';
import dictionary from '@/scripts/data/source_dictionary';

const BASE_URL = 'https://dreamboatjournal.com';
const LOCALES = ['en', 'tr', 'de', 'es', 'pt'];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // 1. Home Pages & Dictionary Indices
    LOCALES.forEach(locale => {
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
    });

    // 2. Meaning Pages (2500+ URLs)
    const keys = Object.keys(dictionary);

    keys.forEach(key => {
        const slug = slugify(key);

        LOCALES.forEach(locale => {
            routes.push({
                url: `${BASE_URL}/${locale}/meaning/${slug}`,
                lastModified: new Date(), // Ideally this comes from file mtime
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
