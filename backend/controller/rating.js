const Rating = require("../model/ratings");
const Course = require("../model/course");

const catchAsync = require("../util/catchAsync");

exports.createRating = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { rating, reviews, courseId } = req.body;

  const courseDetails = await Course.findOne({
    _id: courseId,
    studentsEnrolled: {
      $elemMatch: {
        $eq: userId,
      },
    },
  });

  if (!courseDetails) {
    return res.json({
      success: false,
      message: "You must enroll in the course to write a review",
    });
  }

  const existingReview = await Rating.findOne({
    user: userId,
    course: courseId,
  });

  if (existingReview) {
    return res.status(403).json({
      success: false,
      message: "Course is already reviewed by the user",
    });
  }

  const ratingAndReview = await Rating.create({
    user: userId,
    course: courseId,
    rating,
    reviews,
  });

  await Course.findByIdAndUpdate(courseId, {
    $push: {
      ratingAndReviews: ratingAndReview._id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Review successfully posted",
  });
});

exports.getAvgRating = catchAsync(async (req, res) => {
  const  courseId  = req.params;

  const average = await Rating.aggregate([
    {
      $match: {
        course: courseId,
      },
    },
    {
      $group: {
        _id: null,
        avgRating: {
          $avg: "$rating",
        },
      },
    },
  ]);

  if (average.length > 0) {
    res.status(200).json({
      success: true,
      averageRating: average[0].avgRating,
    });
  } else {
    res.status(200).json({
      success: true,
      averageRating: 0,
    });
  }
});

exports.getAllRating = catchAsync(async (req, res) => {
  const allRatings = await Rating.find()
    .populate("user", "firstName lastName email image")
    .populate("course", "courseName")
    .sort({ rating: "desc" })
    .exec();

  res.status(200).json({
    success: true,
    data: allRatings,
  });
});
