require('dotenv').config();
const defaultDbUrl = process.env.VERCEL
  ? 'sqlite:///tmp/database.sqlite'
  : 'sqlite://./database.sqlite';

module.exports = {
  botToken: process.env.BOT_TOKEN,
  adminId: process.env.ADMIN_USER_ID,
  dbUrl: process.env.DB_URL || defaultDbUrl,
  webhookUrl: process.env.WEBHOOK_URL
};
