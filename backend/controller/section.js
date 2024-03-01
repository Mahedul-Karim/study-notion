const Section = require("../model/section");
const Course = require("../model/course");

exports.createSection = catchAsync(async (req, res) => {
  const { sectionName, courseId } = req.body;

  if (!sectionName || !courseId) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const newSection = await Section.create({ sectionName });

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
  );

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
  });
});

exports.deleteSection = catchAsync(async (req, res) => {
  const { sectionId } = req.params;

  await Section.findByIdAndDelete(sectionId);

  res.status(200).json({
    success: true,
    message: "Section deleted successfully!",
  });
});
