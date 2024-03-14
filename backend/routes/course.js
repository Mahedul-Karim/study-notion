const express = require("express");

const course = require("../controller/course");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(userVerification, isInstructor, course.createCourse)
  .get(course.getAllCourses);

  router.route('/:courseId').get(course.getCourseDetails)

module.exports = router;
