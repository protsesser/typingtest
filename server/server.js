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

app.post('/attempt', async (req, res) => {
  const { speed, accuracy, score, user_id, text_id } = req.body;
  try {
    const newAttempt = await Attempt.create({speed, accuracy, score, user_id, text_id});

    res.status(201).json(newAttempt);
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

app.get('/attempts/:user_id', async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      where: { user_id: req.params.user_id },
      include: [{ model: User, attributes: ['name'] }],
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

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });