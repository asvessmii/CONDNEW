const bot = require('../index');
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await bot.handleUpdate(req.body, res);
    res.statusCode = 200;
    res.end('OK');
  } else {
    res.statusCode = 200;
    res.end('Hello');
  }
};
