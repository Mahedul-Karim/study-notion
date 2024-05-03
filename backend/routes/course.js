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
  .get(course.getAllCourses)
  .put(userVerification, isInstructor, course.publishCourse)
  .patch(userVerification, isInstructor, course.updateCourse);

router
  .route("/:courseId")
  .get(course.getCourseDetails)
  .delete(userVerification, isInstructor, course.deleteCourse);

router
  .route("/instructor/course")
  .get(userVerification, isInstructor, course.instructorCourses);

router.route("/category/:categoryName").get(course.categoryCourses);

module.exports = router;
