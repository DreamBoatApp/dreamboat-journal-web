export type SearchEventCallback = (data: {
    query: string;
    locale: string;
    source: 'web' | 'app';
    timestamp: string;
}) => void;

// Simple logger that outputs structured JSON to stdout
// This is captured by Vercel logs and can be filtered/alerted on
export function logFailedSearch(query: string, locale: string, source: 'web' | 'app') {
    const event = {
        event: 'failed_search',
        data: {
            query,
            locale,
            source,
            timestamp: new Date().toISOString()
        }
    };

    // In production, this would go to a real analytics service
    console.log(JSON.stringify(event));
}
