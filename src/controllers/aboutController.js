const { Project } = require('../models');

async function showFirstProject(ctx) {
  const project = await Project.findOne({ order: [['sortOrder', 'ASC']] });
  if (!project) return ctx.reply('Нет проектов');
  const photos = JSON.parse(project.photos || '[]');
  await ctx.replyWithPhoto(photos[0] || null, {
    caption: `${project.title}\n${project.address}`
  });
}

module.exports = { showFirstProject };
