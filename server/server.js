const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/', routes);

// Socket
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // 3000
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('🟢 New client connected');

  socket.on('send_message', async (messageData) => {
    // Save message to MongoDB
    await db.collection('messages').insertOne(messageData);

    // Broadcast to all connected clients
    io.emit('receive_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});


server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});