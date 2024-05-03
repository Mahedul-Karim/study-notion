const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    whatYouWillLearn: {
      type: String,
    },
    isDrift: {
      type: Boolean,
      default: true,
    },
    courseContents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Section",
      },
    ],
    ratingAndReviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "RatingAndReviews",
      },
    ],
    price: {
      type: Number,
    },
    instructions: [
      {
        type: String,
      },
    ],
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    category: {
      type: String,
    },
    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    courseDuration: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
