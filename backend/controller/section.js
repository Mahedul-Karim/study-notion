const Section = require("../model/section");
const Course = require("../model/course");
const catchAsync = require("../util/catchAsync");
const SubSection = require("../model/subSection");

const { deleteFromCloudinary } = require("../config/cloudinary");

exports.createSection = catchAsync(async (req, res) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const newSection = await Section.create({ sectionName, subSection: [] });

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      $push: {
        courseContents: newSection._id,
      },
    },
    {
      new: true,
    }
  )
    .populate({
      path: "courseContents",
      populate: {
        path: "subSection",
      },
    })
    .exec();

  res.status(201).json({
    success: true,
    message: "Section created successfully!",
    updatedCourse,
  });
});

exports.updateSection = catchAsync(async (req, res) => {
  const { sectionName, sectionId } = req.body;

  if (!sectionName || !sectionId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const section = await Section.findByIdAndUpdate(
    sectionId,
    {
      sectionName,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Section updated successfully!",
    section,
  });
});

exports.deleteSection = catchAsync(async (req, res) => {
  
  const { courseId,sectionId } = req.body;

  await Course.findByIdAndUpdate(courseId, {
    $pull: {
      courseContents: sectionId,
    },
  });

  const section = await Section.findByIdAndDelete(sectionId);

  for (const subSections of section.subSection) {
    const subSec = await SubSection.findByIdAndDelete(subSections);
    await deleteFromCloudinary(subSec.videoUrl.public_id, "video");
  }

  res.status(200).json({
    success: true,
    message: "Section deleted successfully!",
  });
});
