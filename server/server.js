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

app.get('/attempt/:id', async (req, res) => {
  const attemptId = req.params.id;

  try {
    const attempt = await Attempt.findOne({
      where: { id: attemptId },
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Text, attributes: ['id', 'content'] }
      ],
    });

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    res.json(attempt);
  } catch (error) {
    console.error('Error fetching attempt:', error);
    res.status(500).json({ error: 'Internal server error' });
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

app.get('/leaderboard', async (req, res) => {
  try {
    const attempts = await Attempt.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name'],
      }],
      attributes: ['id', 'speed', 'accuracy', 'score', 'user_id', 'text_id'],
      order: [['score', 'DESC']],
    });
    const topAttempts = attempts
      .sort((a, b) => b.maxScore - a.maxScore)
      .slice(0, 10);

    res.json(topAttempts);
  } catch (error) {
    console.error('Error fetching top attempts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/user-attempts', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const attempts = await Attempt.findAll({
      where: { user_id },
      include: [{
        model: User,
        attributes: ['id', 'name'],
      }],
      attributes: ['id', 'speed', 'accuracy', 'score', 'user_id', 'text_id'],
      order: [['id', 'DESC']], 
      limit: 10
    });

    res.json(attempts);
  } catch (error) {
    console.error('Error fetching user attempts:', error);
    res.status(500).json({ error: 'Internal server error' });
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