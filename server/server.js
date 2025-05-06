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

app.get('/users', async (req, res) => {
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



// const http = require('http');
// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// const uri = "mongodb://localhost:27017"; // Change for remote DB
// const client = new MongoClient(uri);

// async function connectDB() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("MongoDB Connection Error:", error);
//     }
// }

// connectDB();

// // API Endpoint to Fetch Data
// app.get('/data', async (req, res) => {
//     try {
//         const db = client.db("yourDatabaseName");  // Replace with your actual DB name
//         const collection = db.collection("yourCollectionName");  // Replace with collection name
//         const data = await collection.find().toArray();

//         res.json(data); // Send JSON response
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching data" });
//     }
// });

// // Creating HTTP Server
// const server = http.createServer(app);

// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('message', (msg) => {
//         console.log(`Message received: ${msg}`);
//         io.emit('message', msg); // Broadcast message to all clients
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// server.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });
