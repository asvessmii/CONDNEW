const { Project } = require('../models');

async function showFirstProject(ctx) {
  const project = await Project.findOne({ order: [['sortOrder', 'ASC']] });
  if (!project) return ctx.reply('Нет проектов');
  return showProject(ctx, project);
}

async function showProject(ctx, project) {
  const photos = JSON.parse(project.photos || '[]');
  await ctx.replyWithPhoto(photos[0] || null, {
    caption: `${project.title}\n${project.address}`,
    reply_markup: {
      inline_keyboard: [[{ text: 'Следующий', callback_data: `NEXT_PROJECT_${project.sortOrder}` }]]
    }
  });
}

async function nextProject(ctx, currentOrder) {
  const project = await Project.findOne({ where: { sortOrder: currentOrder + 1 } });
  if (!project) return ctx.answerCbQuery('Конец списка');
  await showProject(ctx, project);
}

module.exports = { showFirstProject, nextProject };
