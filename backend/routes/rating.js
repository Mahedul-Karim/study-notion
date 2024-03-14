const express = require("express");

const rating = require("../controller/rating");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(userVerification, isStudent, rating.createRating)
  .get(rating.getAllRating);
router.route("/:courseId").get(rating.getAvgRating);

module.exports = router;
