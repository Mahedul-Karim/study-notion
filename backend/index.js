const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const { configCloudinary } = require('./config/cloudinary');

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());


configCloudinary();

