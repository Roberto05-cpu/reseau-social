const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(
  "/upload",
  express.static(path.join(__dirname, "upload"))
);

// routes
app.use('/api/users', require('./Routes/userRoute'))
app.use('/api/posts', require('./Routes/postRoute'))
app.use('/api/notifs', require('./Routes/notifRoute'))
app.use('/api/chats', require('./Routes/chatRoute'))
app.use('/api/messages', require('./Routes/messageRoute'))

// connecter la base de donnees
connectDB()

app.get('/', (req, res) => {
  res.send('🚀 API de reseau social en marche');
});

// 🔥 SOCKET.IO — BASE
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend
    credentials: true,
  },
});

// rendre io accessible partout
global.io = io;

// map pour stocker users en ligne
global.onlineUsers = new Map();

// connexion socket
io.on("connection", (socket) => {
  console.log("🟢 Socket connecté :", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId.toString(), socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    console.log("👤 User en ligne :", userId);
  });

   // Note: sendMessage event handling is done in messageController on POST /api/messages
  // This ensures messages are saved to DB before being emitted to real-time clients

  socket.on("disconnect", () => {
    let removed = null;
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        removed = userId;
        console.log("🔴 User déconnecté :", userId);
        break;
      }
    }
    if (removed !== null) {
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});

// démarrage serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur + Socket en marche sur le port ${PORT}`.bgGreen);
});
