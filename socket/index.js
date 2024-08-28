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
const io = new Server(server);

let allUsers = [];

const removeUser = function (socketId) {
  allUsers = allUsers.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  socket.on("setUser", (userId) => {
    const isUserExist = allUsers.find((user) => user.userId === userId);

    if (isUserExist) {
      return;
    }

    allUsers.push({ userId, socketId: socket.id });
    socket.emit("getUsers", allUsers);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT, () => console.log(`server is running at ${PORT}`));
