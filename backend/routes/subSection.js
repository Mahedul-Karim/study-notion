const express = require("express");

const subSection = require("../controller/subSection");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(userVerification, isInstructor, subSection.createSubSection)
  .patch(userVerification,isInstructor,subSection.editSubSection)
  .delete(userVerification,isInstructor,subSection.deleteSubSection);

module.exports = router;
