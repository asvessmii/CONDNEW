const { CartItem, Product } = require('../models');

async function addToCart(ctx, productId) {
  const product = await Product.findByPk(productId);
  if (!product) {
    return ctx.answerCbQuery('Товар недоступен');
  }
  const [item] = await CartItem.findOrCreate({
    where: { userId: ctx.chat.id, productId },
    defaults: { quantity: 1, priceAtAdd: product.price }
  });
  if (!item.isNewRecord) {
    item.quantity += 1;
    await item.save();
  }
  await ctx.answerCbQuery(`Добавлено в корзину: ${product.name}`);
}

async function showCart(ctx) {
  const items = await CartItem.findAll({ where: { userId: ctx.chat.id }, include: Product });
  if (!items.length) {
    return ctx.reply('Ваша корзина пуста');
  }
  let total = 0;
  let text = '*Ваша корзина:*\n';
  for (const it of items) {
    const cost = it.quantity * it.priceAtAdd;
    total += cost;
    text += `\n${it.Product.name} x ${it.quantity} = ${cost} ₽`;
  }
  text += `\n\nИтого: ${total} ₽`;
  await ctx.reply(text, { parse_mode: 'Markdown' });
}

module.exports = { addToCart, showCart };
