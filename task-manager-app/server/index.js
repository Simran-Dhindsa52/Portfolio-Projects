const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

// Task Schema
const TaskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  completed: Boolean,
});
const Task = mongoose.model('Task', TaskSchema);

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(403).send('Invalid Token');
    req.userId = decoded.id;
    next();
  });
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ username: req.body.username, password: hashedPassword });
  await user.save();
  res.send({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('User not found');
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token });
});

// Task Routes
app.get('/api/tasks', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.send(tasks);
});

app.post('/api/tasks', verifyToken, async (req, res) => {
  const task = new Task({ userId: req.userId, title: req.body.title, completed: false });
  await task.save();
  res.send(task);
});

app.put('/api/tasks/:id', verifyToken, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title: req.body.title, completed: req.body.completed },
    { new: true }
  );
  res.send(task);
});

app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.send({ message: 'Task deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
