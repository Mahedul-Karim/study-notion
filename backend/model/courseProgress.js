const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  completedSections: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  completedVideos: [{ type: mongoose.Schema.ObjectId }],
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
