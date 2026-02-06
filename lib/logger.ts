export type SearchEventCallback = (data: {
    query: string;
    locale: string;
    source: 'web' | 'app';
    timestamp: string;
}) => void;

// Simple logger that outputs structured JSON to stdout
// This is captured by Vercel logs and can be filtered/alerted on
// Async logger that outputs structured JSON to stdout and sends webhook
// This is captured by Vercel logs and can be filtered/alerted on
export async function logFailedSearch(query: string, locale: string, source: 'web' | 'app') {
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

    // Notify via Google Sheets Webhook if configured
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
        await notifyGoogleSheets(query, locale, source).catch(console.error);
    }
}

async function notifyGoogleSheets(query: string, locale: string, source: string) {
    const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!url) return;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                locale,
                source,
                timestamp: new Date().toISOString()
            })
        });
    } catch (e) {
        console.error("Failed to send google sheet notification", e);
    }
}
