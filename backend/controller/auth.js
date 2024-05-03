const User = require("../model/user");
const OTP = require("../model/otp");
const catchAsync = require("../util/catchAsync");
const Profile = require("../model/profile");

const otpGenerator = require("otp-generator");
const sendEmail = require("../util/mailSender");

exports.sentOtp = catchAsync(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({
      success: false,
      message: "User already exists!",
    });
  }

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otpPayload = { email, otp };

  const otpBody = await OTP.create(otpPayload);

  res.status(200).json({
    success: true,
    message: `OTP was sent to ${email}`,
    otp,
  });
});
exports.signUp = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !otp
  ) {
    return res.status(403).json({
      success: false,
      message: "All fields are required!",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and ConfirmPassword does not match",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists!",
    });
  }

  const recentOtp = await OTP.findOne({ email });

  if (otp !== recentOtp.otp) {
    return res.status(401).json({
      success: false,
      message: "OTP does not match!",
    });
  }

  const profile = await Profile.create({
    gender: null,
    dateOfBirth: null,
    contactNumber: contactNumber ? contactNumber : null,
    about: null,
  });

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    additionalDetails: profile._id,
    accountType,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  });

  await OTP.findOneAndDelete({ email });

  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    host: req.headers.host,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const user = await User.findOne({ email }).populate("additionalDetails");

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exist! Please sign up first",
    });
  }

  if (!(await user.comparePassword(password))) {
    return res.status(400).json({
      success: false,
      message: "Invalid password!",
    });
  }

  const token = user.getToken();

  user.password = null;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite:'none'
  };
  

  res.cookie("token", token, options).status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {});

exports.resetPasswordToken = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Your email is not registered!",
    });
  }

  const token = crypto.randomUUID();

  user.resetPasswordToken = token;
  user.resetPasswordTokenExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  const url = `http://localhost:3000/reset-password?token=${token}`;

  await sendEmail(email, "Password Reset Link", url);

  res.status(200).json({
    success: true,
    message: `An email with password reset link was sent to ${email}`,
    url,
    fullUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and ConfirmPassword did not match",
    });
  }

  const user = await User.findOne({ resetPasswordToken: token });

  if (!user || +user.resetPasswordTokenExpires < Date.now()) {
    return res.status(404).json({
      success: false,
      message: "Invalid token! Please try again",
    });
  }

  user.password = password;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully!!",
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).populate("additionalDetails");

  res.status(200).json({
    success: true,
    user,
  });
});

exports.logOut = catchAsync(async (req, res) => {
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie("token", null, options).json({
    success: true,
  });
});
