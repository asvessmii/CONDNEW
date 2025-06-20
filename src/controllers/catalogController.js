const { products } = require('../models');

async function showCatalog(ctx) {
  const all = products;
  if (!all.length) {
    return ctx.reply('Каталог пуст.');
  }
  for (const p of all) {
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

async function showProduct(ctx, id) {
  const p = products.find((prod) => prod.id === id);
  if (!p) {
    return ctx.answerCbQuery('Товар не найден');
  }
  await ctx.replyWithPhoto(p.photoFull || null, {
    caption: `*${p.name}*\n${p.fullDescription}\n\nЦена: *${p.price} ₽*`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: 'В корзину', callback_data: `ADD_${p.id}` },
        { text: 'Назад', callback_data: 'BACK_TO_CATALOG' }
      ]]
    }
  });
}

module.exports = { showCatalog, showProduct };
