const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const Text = require('./models/text');
const Attempt = require('./models/attempt');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Регистрация
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Вход
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Получение текста для теста
app.get('/texts/:id', async (req, res) => {
  try {
    const text = await Text.findByPk(req.params.id);
    res.json(text);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Сохранение попытки
app.post('/attempts', async (req, res) => {
  const { userId, textId, speed, accuracy } = req.body;
  const score = speed * accuracy;
  try {
    const attempt = await Attempt.create({ userId, textId, speed, accuracy, score });
    res.json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Получение таблицы лидеров
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Attempt.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['score', 'DESC']],
      limit: 10
    });
    res.json(leaderboard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection to the database has been established successfully.');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
