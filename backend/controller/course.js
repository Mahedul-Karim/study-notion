const Category = require("../model/category");
const Course = require("../model/course");
const User = require("../model/user");

const { uploadToCloudinary } = require("../config/cloudinary");

const catchAsync = require("../util/catchAsync");


exports.createCourse = catchAsync(async (req, res) => {
  const {
    courseName,
    courseDescription,
    whatYouWillLearn,
    price,
    category,
    thumbnail,
    instructions
  } = req.body;

  
  const uploadImage = await uploadToCloudinary(thumbnail);

  const course = await Course.create({
    courseName,
    courseDescription,
    instructor: req.user._id,
    thumbnail: {
      public_id: uploadImage.public_id,
      url: uploadImage.url,
    },
    whatYouWillLearn,
    price,
    category,
    courseContents:[],
    instructions
  });

  const instructor = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        courses: course._id,
      },
    },
    {
      new: true,
    }
  );

  categoryDetails.course.push(course._id);
  await categoryDetails.save();

  res.status(201).json({
    success: true,
    course,
  });
});

exports.getAllCourses = catchAsync(async (req, res) => {
  const allCourse = await Course.find(
    {},
    {
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReviews: true,
      studentsEnrolled: true,
    }
  )
    .populate("instructor")
    .exec();

  res.status(200).json({
    success: true,
    courses: allCourse,
  });
});

exports.getCourseDetails = catchAsync(async (req, res) => {
  const  courseId  = req.params;

  const courseDetails = await Course.findById(courseId)
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContents",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  res.status(200).json({
    success: true,
    data: courseDetails,
  });
});
