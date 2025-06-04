const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env and .env.local similar to Next.js
// First load from .env if it exists, then override with .env.local
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
}
module.exports = {
  botToken: process.env.BOT_TOKEN,
  adminId: process.env.ADMIN_USER_ID,
  dbUrl: process.env.DATABASE_URL || process.env.DB_URL,
  webhookUrl: process.env.WEBHOOK_URL
};
