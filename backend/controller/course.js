const Section = require("../model/section");
const SubSection = require("../model/subSection");
const Course = require("../model/course");
const User = require("../model/user");
const CourseProgress = require("../model/courseProgress");
const Cart = require("../model/cart");

const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary");

const catchAsync = require("../util/catchAsync");

exports.createCourse = catchAsync(async (req, res) => {
  const {
    courseName,
    courseDescription,
    whatYouWillLearn,
    price,
    category,
    thumbnail,
    instructions,
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
    courseContents: [],
    instructions,
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
    .populate("ratingAndReviews")
    .exec();

  res.status(200).json({
    success: true,
    courses: allCourse,
  });
});

exports.getCourseDetails = catchAsync(async (req, res) => {
  const { courseName } = req.params;

  const courseDetails = await Course.findOne({
    courseName,
  })
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate({
      path: "ratingAndReviews",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "courseContents",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  res.status(200).json({
    success: true,
    courseDetails,
  });
});

exports.publishCourse = catchAsync(async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      isDrift: false,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    success: true,
    message: "Course published successfully!",
    course,
  });
});

exports.instructorCourses = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const courses = await Course.find({
    instructor: _id,
  })
    .populate("instructor")
    .populate({
      path: "courseContents",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  if (!courses) {
    return res.status(200).json({
      success: true,
      message: "You have not created any courses",
    });
  }

  res.status(200).json({
    success: true,
    courses,
  });
});

exports.deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findByIdAndDelete(courseId);

  await deleteFromCloudinary(course.thumbnail.public_id, "image");

  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      courses: courseId,
    },
  });

  for (const sectionId of course.courseContents) {
    const removeSection = await Section.findByIdAndDelete(sectionId);

    for (const subSec of removeSection.subSection) {
      const removeSubSection = await SubSection.findByIdAndDelete(subSec);

      await deleteFromCloudinary(removeSubSection.videoUrl.public_id, "video");
    }
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully!",
  });
});

exports.updateCourse = catchAsync(async (req, res) => {
  const {
    courseId,
    courseName,
    courseDescription,
    whatYouWillLearn,
    price,
    category,
    thumbnail,
    instructions,
  } = req.body;

  const course = await Course.findById(courseId).populate({
    path: "courseContents",
    populate: {
      path: "subSection",
    },
  });

  let newThumbnail;

  if (thumbnail !== course.thumbnail.url) {
    await deleteFromCloudinary(course.thumbnail.public_id, "image");
    newThumbnail = await uploadToCloudinary(thumbnail);
    course.thumbnail = {
      public_id: newThumbnail.public_id,
      url: newThumbnail.url,
    };
  }

  course.courseName = courseName;
  course.courseDescription = courseDescription;
  course.whatYouWillLearn = whatYouWillLearn;
  course.category = category;
  course.price = price;
  course.instructions = instructions;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course updated successfully!",
    course,
  });
});

exports.categoryCourses = catchAsync(async (req, res) => {
  const { categoryName } = req.params;

  const courses = await Course.find({
    category: categoryName,
  }).populate("instructor");

  res.status(200).json({
    success: true,
    courses,
  });
});

exports.getUserCourses = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const courses = await Course.find({
    studentsEnrolled: userId,
  });

  const courseProgress = await CourseProgress.find({
    userId,
  });

  res.status(200).json({
    success: true,
    courses,
    courseProgress,
  });
});

exports.getViewCourse = catchAsync(async (req, res) => {
  const { courseName } = req.params;
  const userId = req.user._id;

  const course = await Course.findOne({ courseName }).populate({
    path: "courseContents",
    populate: {
      path: "subSection",
    },
  });

  const courseProgress = await CourseProgress.findOne({
    courseId: course._id,
    userId,
  });

  res.status(200).json({
    success: true,
    course,
    courseProgress,
  });
});

exports.setCourseProgress = catchAsync(async (req, res) => {
  const { sectionId, videoUrl, courseId } = req.body;
  const userId = req.user._id;

  const courseProgress = await CourseProgress.findOne({
    courseId,
    userId,
  });

  if (sectionId) {
    courseProgress.completedSections.push(sectionId);
  }

  if (videoUrl) {
    courseProgress.completedVideos.push(videoUrl);
  }

  await courseProgress.save();

  res.status(200).json({
    success: true,
    message: "Course Progress updated successfully!",
  });
});

exports.searchCourses = catchAsync(async (req, res) => {
  const { category, instructor, price, search, page = 1 } = req.query;

  const query = {};

  const limit = 4;

  const skip = (page - 1) * limit;

  if (category && category !== "all") {
    query.category = new RegExp(category, "i");
  }

  if (price && price !== "all") {
    query.price =
      price === "free"
        ? 0
        : {
            $gt: 0,
          };
  }

  if (instructor && instructor !== "all") {
    const firstName = instructor.split(" ")[0];
    const lastName = instructor.split(" ")[1];

    const user = await User.findOne({
      firstName: {
        $regex: firstName,
        $options: "i",
      },
      lastName: {
        $regex: lastName,
        $options: "i",
      },
    });

    query.instructor = user._id;
  }

  if (search) {
    query.courseName = {
      $regex: search,
      $options: "i",
    };
  }

  const courses = await Course.find(query)
    .populate("instructor")
    .populate("ratingAndReviews")
    .skip(skip)
    .limit(limit);

  if (courses.length === 0) {
    return res.status(404).json({
      success: true,
      courses: [],
    });
  }

  res.status(200).json({
    success: true,
    courses,
  });
});

exports.countCourse = catchAsync(async (req, res) => {
  const { category, search } = req.query;

  const query = {};

  if (category && category !== "all") {
    query.category = {
      $regex: category,
      $options: "i",
    };
  }

  if (search) {
    query.courseName = {
      $regex: search,
      $options: "i",
    };
  }

  const totalDocuments = await Course.countDocuments(query);

  res.status(200).json({
    success: true,
    totalDocuments,
  });
});

exports.addToCart = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const { courseId } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Login first to add to cart",
    });
  }

  const existingCart = await Cart.findOne({ courseId, userId });

  if (existingCart) {
    return res.status(403).json({
      success: false,
      message: "Course is already in wishlist",
    });
  }

  await Cart.create({
    courseId,
    userId,
  });

  res.status(201).json({
    success: true,
    message: "Course was added to wishlist",
  });
});

exports.getCarts = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const carts = await Cart.find({ userId }).populate({
    path: "courseId",
    populate: {
      path: "ratingAndReviews",
    },
  });

  if (carts.length === 0) {
    return res.status(200).json({
      success: true,
      carts: [],
    });
  }

  res.status(200).json({
    success: true,
    carts,
  });
});

exports.removeFromCart = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const courseId = req.params.courseId;

  await Cart.findOneAndDelete({
    userId,
    courseId,
  });

  res.status(200).json({
    success: true,
  });
});
