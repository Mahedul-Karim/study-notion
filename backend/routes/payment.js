const express = require("express");

const payment = require("../controller/payment");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.userVerification,
    authMiddleware.isStudent,
    payment.getPayment
  )
  .patch(
    authMiddleware.userVerification,
    authMiddleware.isStudent,
    payment.enrollStudent
  );

module.exports = router;
