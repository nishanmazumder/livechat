const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Middleware
const cors = require('cors');
app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');
const { error } = require('console');
const token = jwt.sign({ user: 'admin' }, 'secretKey123', { expiresIn: '1h' });
console.log('Token:', token);

// get env data
require('dotenv').config();
const port = process.env.PORT;
const dbPass = process.env.DB_PASS;

// MongoClient
const dbUrl = `mongodb+srv://btiahwpweb:${dbPass}@cluster0.9nknrlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(dbUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function dbConnect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

dbConnect()

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const authtoken = authHeader && authHeader.split(' ')[1];

    if(!authtoken) return res.status(401).json({error: 'Token missing!'});

    jwt.verify(authtoken, 'secretKey123', (err, decode)=>{
        if(err) return res.status(403).json({error: err});
        req.decode = decode;
        next();
    })
}

app.get('/users', authenticateToken, async (req, res) => {
    try {
        const db = client.db('sample_mflix');
        const collection = db.collection('users');
        
        const users = await collection.find({
            email : {$in : ['user1@gmail.com', 'user2@gmail.com']}
        }).limit(2).toArray();

        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
})

app.get('/test', (req, res) => {
    console.log("tets");
    res.send("test hello!");
})

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { MongoClient } = require('mongodb');

// const app = express();
// const port = 3000;
// app.use(express.json());

// const uri = 'mongodb://localhost:27017';
// const dbName = 'myapp';
// let db;

// MongoClient.connect(uri, { useUnifiedTopology: true })
//   .then(client => {
//     db = client.db(dbName);
//     console.log('MongoDB connected');
//   })
//   .catch(err => console.error('DB connection failed:', err));

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await db.collection('users').findOne({ email });

//     if (!user) return res.status(404).json({ error: 'User not found' });

//     // Compare password (assuming bcrypt-hashed)
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ error: 'Invalid password' });

//     // Generate JWT
//     const token = jwt.sign({ email: user.email }, 'secretKey123', { expiresIn: '1h' });

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


// front

// LoginForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/login', { email, password });
//       const token = res.data.token;

//       // Save token to localStorage
//       localStorage.setItem('token', token);
//       alert('Login successful!');
//     } catch (err) {
//       alert('Login failed: ' + err.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginForm;


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
