import { MetadataRoute } from 'next';
import dictionary from '@/scripts/data/source_dictionary';

const BASE_URL = 'https://dreamboatjournal.com';
const LOCALES = ['en', 'tr', 'de', 'es', 'pt'];

const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

// Generate one sitemap per locale (id 0-4) + one for static pages (id 5)
export async function generateSitemaps() {
    return LOCALES.map((_, index) => ({ id: index })).concat({ id: LOCALES.length });
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // id 5 = static pages (home, dictionary, about, privacy for all locales)
    if (id === LOCALES.length) {
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
        });

        return routes;
    }

    // id 0-4 = meaning pages for each locale
    const locale = LOCALES[id];
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

    return routes;
}
