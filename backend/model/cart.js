const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course"
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
