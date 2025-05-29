const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const { Server } = require("socket.io");
const connectDB = require("./db");
const { ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", routes);

// Socket
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173', // 3000
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = {};

io.on("connection", async (socket) => {
  console.log("🟢 New client connected");

  socket.on("register", (userID) => {
    users[userID] = socket.id;
    socket.join(users[userID]);
  });

  // console.log(socket.handshake.headers);

  // socket.on("private message", (messageData) => {

  //   console.log(messageData.message);

  //   // socket.to(anotherSocketId).emit("private message", messageData);
  // });

  // if (users.length > 0) {
  //   users.forEach((user) => {
  //     socket.join(user);
  //   });
  // }

  socket.on("send_message", async (messageData) => {
    // send to receiver
    const receiverId = users[messageData?.receiverId];

    if (receiverId) {
      console.log(receiverId);
      console.log("receiver ID: " + io.sockets.sockets.has(receiverId));
      console.log(messageData);
      // console.log(io.sockets.sockets);
      // socket.broadcast.emit('receive_message', messageData);
      socket.to(receiverId).emit("receive_message", messageData);
      // setTimeout(()=>{
      //   socket.to(receiverId).emit('receive_message', messageData);
      // }, 5000)
    } else {
      console.log("Recipient not connected");
    }

    // insert msg to db
    // const convertMsgData = {
    //   ...messageData,
    //   senderId: new ObjectId(String(messageData.senderId)),
    //   receiverId: new ObjectId(String(messageData.receiverId))
    // }
    // const db = await connectDB();
    // await db.collection('message').insertOne(convertMsgData);
  });

  // socket.on('load_messages', async (id) => {
  //   const messages = await db.collection('message').find({ userId: new ObjectId(String(id)) }).toArray();

  //   // console.log(id);
  //   // console.log(messages);
  //   // console.log('message found!');

  //   socket.emit('user_messages', messages);
  // });

  console.log(users);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
