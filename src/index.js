const { Telegraf } = require('telegraf');
const config = require('./config/config');
const { sequelize } = require('./models');
const catalog = require('./controllers/catalogController');
const cart = require('./controllers/cartController');
const feedback = require('./controllers/feedbackController');
const about = require('./controllers/aboutController');

const bot = new Telegraf(config.botToken);

bot.start(async (ctx) => {
  await sequelize.sync();
  await ctx.reply('Добро пожаловать в бот «Кондиционеры Питер»!', {
    reply_markup: {
      keyboard: [
        ['Каталог', 'Обратная связь'],
        ['О нас', 'Корзина (0)']
      ],
      resize_keyboard: true
    }
  });
});

bot.hears('Каталог', catalog.showCatalog);

bot.hears('Корзина', cart.showCart);

bot.hears('Обратная связь', feedback.startFeedback);

bot.hears('О нас', about.showFirstProject);

bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (data.startsWith('ADD_')) {
    const id = parseInt(data.slice(4));
    await cart.addToCart(ctx, id);
  }
});

module.exports = bot;
