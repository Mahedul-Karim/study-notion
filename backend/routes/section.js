const express = require("express");

const section = require("../controller/section");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(userVerification, isInstructor, section.createSection)
  .patch(userVerification, isInstructor, section.updateSection)
  .delete(userVerification, isInstructor, section.deleteSection);

module.exports = router;
