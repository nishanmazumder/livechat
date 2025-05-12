const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  authenticateToken
} = require('./auth');

const router = express.Router();
router.use(cookieParser());

router.post('/register', async (req, res) => {
  const db = await connectDB();
  const { username, email, password } = req.body;

  const existing = await db.collection('users').findOne({ name: username });
  if (existing) return res.status(400).json({ error: 'User already exists!' });

  const hashPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ name: username, email, password: hashPassword });
  res.status(201).json({ message: 'User created' });
});

router.post('/login', async (req, res) => {
  const db = await connectDB();
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' });
  res.json({ accessToken });
});

router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await db.collection('users')
            .find({
                email: { $in: ['user1@gmail.com', 'user2@gmail.com'] }
            })
            .limit(2)
            .toArray();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users! Details:' + error });
    }
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  const user = verifyRefreshToken(token);
  if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

  const newAccessToken = generateAccessToken(user);
  res.json({ accessToken: newAccessToken });
});

router.get('/chat', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}! This is the chat room.` });
});

module.exports = router;