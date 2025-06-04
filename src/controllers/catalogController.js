const { Product } = require('../models');

async function showCatalog(ctx) {
  const products = await Product.findAll();
  if (!products.length) {
    return ctx.reply('Каталог пуст.');
  }
  for (const p of products) {
    await ctx.replyWithPhoto(p.photoThumb || null, {
      caption: `*${p.name}*\n${p.shortDescription}\nЦена: *${p.price} ₽*`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[
          { text: 'Подробнее', callback_data: `VIEW_${p.id}` },
          { text: 'В корзину', callback_data: `ADD_${p.id}` }
        ]]
      }
    });
  }
}

module.exports = { showCatalog };
