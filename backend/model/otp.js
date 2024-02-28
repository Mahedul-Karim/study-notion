const mongoose = require("mongoose");
const sendEmail = require("../util/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

const sendVerificationEmail = async function (email, otp) {
  try {
    await sendEmail(email, "Verification OTP", otp);
  } catch (err) {
    console.error(err.message);
  }
};

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
