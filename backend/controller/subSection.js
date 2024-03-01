const SubSection = require("../model/subSection");
const Section = require("../model/section");

const { uploadToCloudinary } = require("../config/cloudinary");

exports.createSubSection = catchAsync(async (req, res) => {
  const { sectionId, title, description, timeDuration, video } = req.body;

  const uploadedVideo = await uploadToCloudinary(video);

  const subSectionDetails = await SubSection.create({
    title,
    description,
    timeDuration,
    videoUrl: {
      public_id: uploadedVideo.public_id,
      url: subSectionDetails.url,
    },
  });

  const updatedSection = await Section.findByIdAndUpdate(
    sectionId,
    {
      $push: {
        subSection: subSectionDetails._id,
      },
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    success: true,
    message: "Sub section created successfully!",
    updatedSection,
  });
});
