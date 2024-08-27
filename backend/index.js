const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io')

const { configCloudinary } = require("./config/cloudinary");

const { connect } = require("./config/db");

const categoryRoute = require("./routes/category");
const courseRoute = require("./routes/course");
const paymentRoute = require("./routes/payment");
const profileRoute = require("./routes/profile");
const ratingRoute = require("./routes/rating");
const sectionRoute = require("./routes/section");
const subSecRoute = require("./routes/subSection");
const userRoute = require("./routes/user");

dotenv.config({
  path: "/.env",
});
connect();
configCloudinary();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/rating", ratingRoute);
app.use("/api/v1/section", sectionRoute);
app.use("/api/v1/subSection", subSecRoute);
app.use("/api/v1/category", categoryRoute);

const PORT = process.env.PORT || 4000;


const server = http.createServer(app);

const io = new Server(server);

io.on('connection',(socket)=>{
  socket.emit('hello',{
    id:socket.id
  })
})


server.listen(PORT, () => console.log(`server is running at ${PORT}`));
