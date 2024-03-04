const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
    },
    additionalDetails: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Profile",
    },
    courses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
    image: {
      type: String,
      required: true,
    },
    courseProgress: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CourseProgress",
      },
    ],
    resetPasswordToken:{
      type:String
    },
    resetPasswordTokenExpires:{
      type:Date
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getToken = function () {
  return jwt.sign({ ...this,password:null }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("User", userSchema);
