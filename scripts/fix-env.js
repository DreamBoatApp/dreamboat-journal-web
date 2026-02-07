const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const content = `GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbz1z37ESi30Oj6RRvWXi71iqRZl1Pj-8hYxdp72Zm8JOngv0fdCi5uB5Ao9dw-TWCTb/exec
OPENAI_API_KEY=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
`;

fs.writeFileSync(envPath, content, 'utf8');
console.log("✅ .env.local rewritten cleanly.");
