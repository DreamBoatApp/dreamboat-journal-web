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

    // Notify via Discord Webhook if configured
    if (process.env.DISCORD_WEBHOOK_URL) {
        notifyDiscord(query, locale, source).catch(console.error);
    }
}

async function notifyDiscord(query: string, locale: string, source: string) {
    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return;

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "Dreamboat Scout",
                avatar_url: "https://dreamboatjournal.com/images/app_icon.png",
                embeds: [{
                    title: "🔍 New Missing Symbol",
                    color: 16776960, // Yellow
                    fields: [
                        { name: "Query", value: query, inline: true },
                        { name: "Locale", value: locale.toUpperCase(), inline: true },
                        { name: "Source", value: source, inline: true }
                    ],
                    timestamp: new Date().toISOString()
                }]
            })
        });
    } catch (e) {
        console.error("Failed to send discord notification", e);
    }
}
