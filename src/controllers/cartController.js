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

async function removeFromCart(ctx, productId) {
  await CartItem.destroy({ where: { userId: ctx.chat.id, productId } });
  await ctx.answerCbQuery('Удалено');
  return showCart(ctx);
}

async function clearCart(ctx) {
  await CartItem.destroy({ where: { userId: ctx.chat.id } });
  await ctx.reply('Корзина очищена');
}

async function confirmOrder(ctx) {
  const items = await CartItem.findAll({ where: { userId: ctx.chat.id }, include: Product });
  if (!items.length) return ctx.answerCbQuery('Корзина пуста');
  let total = 0;
  let text = '*Ваш заказ:*\n';
  for (const it of items) {
    const cost = it.quantity * it.priceAtAdd;
    total += cost;
    text += `\n${it.Product.name} x ${it.quantity} = ${cost} ₽`;
  }
  text += `\n\nИтого: ${total} ₽`;
  await ctx.reply(text, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [[
        { text: 'Подтвердить', callback_data: 'ORDER_FINALIZE' },
        { text: 'Отмена', callback_data: 'ORDER_CANCEL' }
      ]]
    }
  });
}

async function finalizeOrder(ctx) {
  await clearCart(ctx);
  await ctx.reply('Спасибо за заказ!');
}

async function cancelOrder(ctx) {
  await ctx.reply('Оформление отменено');
}

module.exports = {
  addToCart,
  showCart,
  removeFromCart,
  clearCart,
  confirmOrder,
  finalizeOrder,
  cancelOrder
};
