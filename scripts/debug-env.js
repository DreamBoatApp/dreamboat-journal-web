const path = require('path');
require('dotenv').config({ path: '.env.local' });

const key = process.env.OPENAI_API_KEY;

if (!key) {
    console.log("❌ Key is undefined");
} else {
    console.log(`✅ Key found. Length: ${key.length}`);
    console.log(`Raw: ${JSON.stringify(key)}`);
    console.log(`Start: ${key.substring(0, 10)}...`);
    console.log(`End: ...${key.substring(key.length - 5)}`);

    // Check for whitespace
    if (key.trim() !== key) {
        console.log("⚠️ Key has leading/trailing whitespace!");
    }

    // Try a list models call
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: key.trim() });

    openai.models.list()
        .then(() => console.log("✅ API Connectivity: SUCCESS"))
        .catch(err => {
            console.log("❌ API Connectivity: FAILED");
            console.error(err.message);
        });
}
