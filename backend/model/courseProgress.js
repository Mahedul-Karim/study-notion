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
  completedVideos: [
    {
      subSectionId: {
        type: mongoose.Schema.ObjectId,
        ref: "SubSection",
      },
      completed: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
