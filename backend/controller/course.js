const Category = require("../model/category");
const Course = require("../model/course");
const User = require("../model/user");

const { uploadToCloudinary } = require("../config/cloudinary");

const catchAsync = require("../util/catchAsync");

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const categorys = await Category.create({
    name,
    description,
  });

  res.status(200).json({
    success: false,
    message: "Category created successfully!",
  });
});

exports.getAllCategorys = catchAsync(async (req, res) => {
  const categorys = await Category.find({}, { name: true, description: true });

  res.status(200).json({
    success: true,
    categorys,
  });
});

exports.createCourse = catchAsync(async (req, res) => {
  const {
    courseName,
    courseDescription,
    whatYouWillLearn,
    price,
    category,
    thumbnail,
  } = req.body;

  const categoryDetails = await Category.findById(category);

  if (!categoryDetails) {
    return res.status(404).json({
      success: false,
      message: "Tag details not found!",
    });
  }

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
    category: categoryDetails._id,
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

  categoryDetails.course = course._id;
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

exports.getCourseDetails = catchAsync(async (req,res)=>{
  
})