const jwt = require("jsonwebtoken");

const User = require("../model/user");
const catchAsync = require("../util/catchAsync");
const { checkRole } = require("../util/checkRole");

exports.userVerification = catchAsync(async (req, res, next) => {
  const token = req.cookies.token || req.header("authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing!",
    });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
  if (!decodedToken._doc) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  req.user = decodedToken._doc;

  next();
});

exports.isStudent = catchAsync(async (req, res, next) => {
  const isTrue = checkRole(req, "Student");

  if (!isTrue) {
    return res.status(401).json({
      success: false,
      message: "This resource is only available for students",
    });
  }

  next();
});
exports.isInstructor = catchAsync(async (req, res, next) => {
  const isTrue = checkRole(req, "Instructor");

  if (!isTrue) {
    return res.status(401).json({
      success: false,
      message: "This resource is only available for Instructor",
    });
  }

  next();
});
exports.isAdmin = catchAsync(async (req, res, next) => {
  const isTrue = checkRole(req, "Admin");

  if (!isTrue) {
    return res.status(401).json({
      success: false,
      message: "This resource is only available for Admin",
    });
  }

  next();
});
