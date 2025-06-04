const { Feedback } = require('../models');
const states = new Map();

async function startFeedback(ctx) {
  states.set(ctx.chat.id, { step: 'name' });
  await ctx.reply('Пожалуйста, введите ваше имя:');
}

async function handleResponse(ctx) {
  const st = states.get(ctx.chat.id);
  if (!st) return;
  if (st.step === 'name') {
    st.name = ctx.message.text.trim();
    st.step = 'phone';
    await ctx.reply('Введите телефон:');
  } else if (st.step === 'phone') {
    st.phone = ctx.message.text.trim();
    await Feedback.create({ userId: ctx.chat.id, name: st.name, phone: st.phone });
    states.delete(ctx.chat.id);
    await ctx.reply('Спасибо, ваша заявка принята.');
  }
}

module.exports = { startFeedback, handleResponse };