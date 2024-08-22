const express = require("express");

const auth = require("../controller/auth");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(auth.login);
router.route("/signup").post(auth.signUp);
router.route("/otp").post(auth.sentOtp);
router.route("/instructors").get(auth.getAllInstructors);
router
  .route("/change/password")
  .post(authMiddleware.userVerification, auth.changePassword);
router.route("/reset/token").post(auth.resetPasswordToken);
router.route("/reset/password").post(auth.resetPassword);
router.route("/me").get(authMiddleware.userVerification, auth.getMe);
router.route("/logout").post(auth.logOut);

module.exports = router;
