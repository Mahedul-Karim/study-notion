const express = require('express');

const auth = require('../controller/auth');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.route('/login').post(auth.login);
router.route('/signup').post(auth.signUp);
router.route('/otp').post(auth.sentOtp);
router.route('/change/password').post(authMiddleware.userVerification,auth.changePassword);
router.route('/reset/token').post(auth.resetPasswordToken);
router.route('/reset/password').post(auth.resetPassword);

module.exports = router;
