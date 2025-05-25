const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const jwt = require('jsonwebtoken');

const {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  authenticateToken
} = require('./auth');

const router = express.Router();
router.use(cookieParser());

// register
router.post('/register', async (req, res) => {
  const db = await connectDB();
  const { username, email, password } = req.body;

  const existing = await db.collection('users').findOne({ name: username });
  if (existing) return res.status(400).json({ error: 'User already exists!' });

  const hashPassword = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ name: username, email, password: hashPassword });
  res.status(201).json({ message: 'User created' });
});

// login
router.post('/login', async (req, res) => {
  const db = await connectDB();
  const { email, password } = req.body?.crendential;
  const user = await db.collection('users').findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });

  res.json({ accessToken });
});

//logout
router.post('/logout', (req, res) => {
  const token = req.cookies.refreshToken;

  if (!refreshTokens.has(token))
    refreshTokens.delete(token);

  res.clearCookie('refreshToken');
  res.sendStatus(204);
})

// get users
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const db = await connectDB();
    const users = await db.collection('users')
      .find({
        email: { $in: ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com'] }
      })
      .limit(3)
      .toArray();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users! Details:' + error });
  }
});

// refresh token
router.post('/refresh', async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: 'No refresh token' });

  if (!refreshTokens.has(token))
    return res.status(403).json({ error: 'Invalid refresh token' });

  jwt.verify(token, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({
      error: 'Refresh token expired, please log in again'
    });

    const newAccessToken = generateAccessToken(decoded.username);
    res.json({ accessToken: newAccessToken });
  })
});

// protected route
router.get('/chat', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}! This is the chat room.` });
});

router.get('/action', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('messages');

    await collection.createIndex({ reveiverId: 1 });

    // await db.collection('users').deleteMany({});
    // await db.collection('messages').deleteMany({});

    // const messages = [
    //     {
    //         userId: 'user001',
    //         message: 'Hey, how are you?',
    //         time: new Date() // current time
    //     },
    //     {
    //         userId: 'user002',
    //         message: 'I\'m good, thanks!',
    //         time: new Date()
    //     },
    //     {
    //         userId: 'user001',
    //         message: 'Want to catch up later?',
    //         time: new Date()
    //     },
    //     {
    //         userId: 'user003',
    //         message: 'Sure, let me know what time.',
    //         time: new Date()
    //     },
    // ];

    // await collection.insertMany(messages);

    res.sendStatus(204);

  } catch (error) {
    res.status(500).json({ error: 'Action Failed! ' + error });
  }
});

router.get('/', (req, res) => {
  return res.send('This is home!');
});

module.exports = router;