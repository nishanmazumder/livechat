const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const DB_PASS = process.env.DB_PASS;
const DB_URL = `mongodb+srv://btiahwpweb:${DB_PASS}@cluster0.9nknrlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(cors());
app.use(express.json());

// jwt
const SECRET_KEY = process.env.SECRET_KEY || 'live123';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'liverefresh123';
const refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign({
        username: user.name, email: user.email
    }, SECRET_KEY, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({
        username: user.name, email: user.email
    }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    refreshTokens.push(refreshToken);
    return refreshToken;
}


// Database Connection
let db;
const client = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function dbConnect() {
    try {
        await client.connect();
        db = client.db('sample_mflix');
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit the process if the connection fails
    }
}
dbConnect();

// Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token missing!' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token!' });
        req.user = decoded;
        next();
    });
}

// Routes
app.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await db.collection('users')
            .find({
                email: { $in: ['user1@gmail.com', 'user2@gmail.com'] }
            })
            .limit(2)
            .toArray();

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        const pass = await bcrypt.compare(password, user.password);

        if (!user || !pass)
            return res.status(404).json({
                error: 'Invalid credential!'
            });

        const authToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user)

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'Strict' })
        res.json({authToken});
    } catch (error) {
        res.status(400).json({ error: 'Login Failed!' });
    }
});

// Health Check Route
app.get('/test', (req, res) => {
    console.log("✅ Test Route Accessed");
    res.send("Test successful!");
});

// Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// token verify
// const token = localStorage.getItem('token');

// const res = await axios.get('http://localhost:3000/users', {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });

// insert
// const hashedPassword = await bcrypt.hash('user1234', 10);
// await db.collection('users').insertOne({ email: 'user1@gmail.com', password: hashedPassword });
