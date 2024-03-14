const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Course",
    index:true
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RatingAndReviews", ratingSchema);
