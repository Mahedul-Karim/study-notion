const express = require("express");

const profile = require("../controller/profile");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .patch(userVerification, profile.updateProfile)
  .delete(userVerification, profile.deleteUser)
  .put(userVerification,profile.updateProfilePicture)

module.exports = router;
