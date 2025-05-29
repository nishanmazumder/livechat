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
  await db.collection('users').insertOne({ username, email, password: hashPassword });
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
    const msgCollection = db.collection("message");
    const userCollection = db.collection("users");

    // create index
    // await collection.createIndex({ receiverId: 1 });
    // await msgCollection.createIndex(
    //   { senderId: 1, receiverId: 1, time: 1 },
    //   { name: "sender_receiver_time" }
    // );

    // empty data
    // await db.collection('users').deleteMany({});
    // await db.collection('message').deleteMany({});

    // insert users
    // const users = [
    //   {
    //     username: "user1",
    //     email: "user1@gmail.com",
    //     password:
    //       "$2a$12$.i2JoTR7Xhzj6KOjAUWKC.o3WAM8K4zXaLLECLfQUSKSr8lVcVw.e",
    //   },
    //   {
    //     username: "user2",
    //     email: "user2@gmail.com",
    //     password:
    //       "$2a$12$GWTV8IRIfBfs5q4Fortul.94eJJB4ZtnwMcHXZSMu27Q6f9QhWoxa",
    //   },
    //   {
    //     username: "user3",
    //     email: "user3@gmail.com",
    //     password:
    //       "$2a$12$AUhs0WjAku76e.faJMvrs.r9kpbv31Zf9tTiR/IRO1rK0Gst70tDm",
    //   },
    // ];

    // insert message data
    // const messages = [
    //   {
    //     senderId: "u1",
    //     receiverId: "u2",
    //     message: "Hey!",
    //     time: new Date()
    //   },
    //   {
    //     senderId: "u2",
    //     receiverId: "u1",
    //     message: "Hello!",
    //     time: new Date()
    //   },
    //   {
    //     senderId: "u1",
    //     receiverId: "u3",
    //     message: "Hi u3",
    //     time: new Date()
    //   }
    // ];

    // await userCollection.insertMany(users);
    // await msgCollection.insertMany(messages);

    // retrive message data
    // const messages = await msgCollection.find({
    //   $or: [
    //     { senderId: "u1", receiverId: "u2" },
    //     { senderId: "u2", receiverId: "u1" }
    //   ]
    // })
    //   .sort({ time: 1 }) // oldest to newest
    //   .toArray();

    // return res.status(200).json(messages);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Action Failed! ' + error });
  }
});

router.get('/', (req, res) => {
  return res.send('This is home!');
});

module.exports = router;