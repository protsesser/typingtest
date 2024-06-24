const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const Text = require('./models/text');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, password, email});
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

app.get('/attempts/:userId', async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { userId: req.params.userId },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(attempts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/texts/:id', async (req, res) => {
  try {
    const text = await Text.findByPk(req.params.id);
    res.json(text);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


/*
sequelize.authenticate().then(() => {
  console.log('Connection to the database has been established successfully.');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
*/
sequelize.sync() // Это синхронизирует модели с базой данных
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });