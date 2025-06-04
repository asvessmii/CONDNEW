require('dotenv').config();
module.exports = {
  botToken: process.env.BOT_TOKEN,
  adminId: process.env.ADMIN_USER_ID,
  dbUrl: process.env.DB_URL || 'sqlite://./database.sqlite',
  webhookUrl: process.env.WEBHOOK_URL
};
