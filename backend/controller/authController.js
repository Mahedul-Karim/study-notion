const User = require("../model/userModel");
const OTP = require("../model/otpModel");
const catchAsync = require("../util/catchAsync");
const Profile = require("../model/profileModel");

const otpGenerator = require("otp-generator");

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

  const recentOtp = await OTP.find({ email })
    .sort({ createdAt: -1 })
    .limit(1);

  if (otp !== recentOtp) {
    return res.status(401).json({
      success: false,
      message: "OTP does not match!",
    });
  }

  const profile = await Profile.create({
    gender: null,
    dateOfBirth: null,
    contactNumber,
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

  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    user,
  });
});
