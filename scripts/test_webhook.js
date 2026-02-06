require('dotenv').config({ path: '.env.local' }); // Try to load .env.local

const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

if (!url) {
    console.error("Error: GOOGLE_SHEETS_WEBHOOK_URL is not set in environment or .env.local");
    console.log("Please set the variable or create a .env.local file with:");
    console.log("GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...");
    process.exit(1);
}

console.log(`Testing Webhook URL: ${url.substring(0, 50)}...`);

async function testWebhook() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: "TEST_WEBHOOK_VERIFICATION",
                locale: "tr",
                source: "verification_script",
                timestamp: new Date().toISOString()
            })
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log(`Response: ${text}`);

        if (response.ok) {
            console.log("✅ Webhook test passed successfully!");
        } else {
            console.error("❌ Webhook test failed!");
        }

    } catch (error) {
        console.error("❌ Fetch error:", error);
    }
}

testWebhook();
