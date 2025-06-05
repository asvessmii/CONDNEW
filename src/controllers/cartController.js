const { carts, products } = require('../models');

function getCart(userId) {
  if (!carts.has(userId)) {
    carts.set(userId, []);
  }
  return carts.get(userId);
}

async function addToCart(ctx, productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return ctx.answerCbQuery('Товар недоступен');
  }
  const cart = getCart(ctx.chat.id);
  let item = cart.find((i) => i.productId === productId);
  if (item) {
    item.quantity += 1;
  } else {
    item = { productId, quantity: 1, priceAtAdd: product.price };
    cart.push(item);
  }
  await ctx.answerCbQuery(`Добавлено в корзину: ${product.name}`);
}

async function showCart(ctx) {
  const cart = getCart(ctx.chat.id);
  if (!cart.length) {
    return ctx.reply('Ваша корзина пуста');
  }
  let total = 0;
  let text = '*Ваша корзина:*\n';
  for (const it of cart) {
    const product = products.find((p) => p.id === it.productId);
    const cost = it.quantity * it.priceAtAdd;
    total += cost;
    text += `\n${product.name} x ${it.quantity} = ${cost} ₽`;
  }
  text += `\n\nИтого: ${total} ₽`;
  await ctx.reply(text, { parse_mode: 'Markdown' });
}

async function removeFromCart(ctx, productId) {
  const cart = getCart(ctx.chat.id);
  const index = cart.findIndex((i) => i.productId === productId);
  if (index !== -1) cart.splice(index, 1);
  await ctx.answerCbQuery('Удалено');
  return showCart(ctx);
}

async function clearCart(ctx) {
  carts.set(ctx.chat.id, []);
  await ctx.reply('Корзина очищена');
}

async function confirmOrder(ctx) {
  const cart = getCart(ctx.chat.id);
  if (!cart.length) return ctx.answerCbQuery('Корзина пуста');
  let total = 0;
  let text = '*Ваш заказ:*\n';
  for (const it of cart) {
    const product = products.find((p) => p.id === it.productId);
    const cost = it.quantity * it.priceAtAdd;
    total += cost;
    text += `\n${product.name} x ${it.quantity} = ${cost} ₽`;
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
