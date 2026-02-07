const OpenAI = require('openai');

const key = "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";

console.log("Testing key directly...");
const openai = new OpenAI({ apiKey: key });

openai.models.list()
    .then(() => console.log("✅ SUCCESS: Key is valid."))
    .catch(err => {
        console.log("❌ FAILED: Key is invalid.");
        console.error(err.message);
    });
