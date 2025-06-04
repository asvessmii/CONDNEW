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
// Check several possible variable names that may be provided by hosting
// platforms or integration tools. `DATABASE_URL` is the main one used in this
// project, but the Neon/Vercel integration can expose the connection string
// under different names.
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DB_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL_INTERNAL;

module.exports = {
  botToken: process.env.BOT_TOKEN,
  adminId: process.env.ADMIN_USER_ID,
  dbUrl,
  webhookUrl: process.env.WEBHOOK_URL
};
