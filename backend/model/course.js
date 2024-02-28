const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
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
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  whatYouWillLearn:{
    type:String
  },
  courseContents:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Section'
    }
  ],
  ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReviews'
    }
  ],
  price:{
    type:Number
  },
  thumbnail:{
    public_id:{
      type:String
    },
    url:{
      type:String
    }
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  studentsEnrolled:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model("Course", courseSchema);
