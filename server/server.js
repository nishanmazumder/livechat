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
    origin: 'http://localhost:5173',
    // origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let usersSocket = {};

io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  const userId = socket.handshake.query.userId;

  if(userId){
    usersSocket[userId] = socket.id;
  }


  // socket.on('message', ({id, msg})=>{
  //   // console.log('data', data);

  //   // socket.broadcast.emit('send', data)
  //   socket.to(id).emit("send", msg);
  // })

  // socket.broadcast.emit("welcome", `Hello User! ${socket.id}`);


  // socket.on("login", (user) => {
  //   users[user.id] = user;
  //   // socket.join(users[userID]);
  //   // users.push(user)
  //   // const activeUsers = users.map(id => Object.keys(id));

  // });


  // if(users.length > 0){
    // socket.emit('active_users', Object.keys(usersSocket));
    socket.emit('active_users', 'active usres from server');
  // }
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
    const receiverSocketId = usersSocket[messageData?.receiverId];

    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("receive_message", messageData);
    } else {
      console.log("Recipient not connected");
    }

    // insert msg to db
    const convertMsgData = {
      ...messageData,
      senderId: new ObjectId(String(messageData.senderId)),
      receiverId: new ObjectId(String(messageData.receiverId))
    }
    const db = await connectDB();
    await db.collection('message').insertOne(convertMsgData);
  });

  socket.on("load_messages", async (id) => {
    const db = await connectDB();
    const messages = await db
      .collection("message")
      .find({ receiverId: new ObjectId(String(id)) })
      .toArray();

    socket.emit("user_messages", messages);
  });

  console.log('active users', usersSocket);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected", socket.id);
    delete usersSocket[userId]
    socket.emit('active_users', Object.keys(usersSocket));
    console.log('after disconnect from server', usersSocket);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
