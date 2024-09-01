const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config({
  path: "/.env",
});

const app = express();

app.use(cors());

app.options("*", cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  maxHttpBufferSize: 1e8, // 100 MB
});

let allUsers = [];

const removeUser = function (socketId) {
  allUsers = allUsers.filter((user) => user.socketId !== socketId);
};

const setOnlineUsers = (socket, isDisconnect) => {
  const onlineUser =
    allUsers.length > 0 ? allUsers.map((user) => user.userId) : [];

  if (!isDisconnect) {
    socket.emit("getUsers", onlineUser);
  }
  socket.broadcast.emit("getUsers", onlineUser);
};

io.on("connection", (socket) => {
  socket.on("setUser", (id) => {
    const isUserExist = allUsers.find((user) => user.userId === id);

    if (isUserExist) {
      return;
    }

    allUsers.push({ userId: id, socketId: socket.id });

    setOnlineUsers(socket);
  });

  socket.on("getMessage", (message) => {
    const { recieverId, text, senderId } = message;

    

    const activeReciever = allUsers.find((user) => user.userId === recieverId);

    if (!activeReciever) {
      return;
    }

    socket.to(activeReciever?.socketId).emit("sendMessage", message);
  });

  socket.on("logout", () => {
    removeUser(socket.id);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);

    setOnlineUsers(socket, true);
  });
});

server.listen(PORT, () => console.log(`server is running at ${PORT}`));
