if (typeof fetch === "undefined") global.fetch = (...args) => import("node-fetch").then(({default: f}) => f(...args));
const config = require('./src/config/config');

async function main() {
  if (!config.botToken || !config.webhookUrl) {
    console.error('BOT_TOKEN and WEBHOOK_URL must be set');
    process.exit(1);
  }
  const url = `https://api.telegram.org/bot${config.botToken}/setWebhook`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: config.webhookUrl })
  });
  const data = await res.json();
  console.log(data);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
