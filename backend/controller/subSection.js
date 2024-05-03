const SubSection = require("../model/subSection");
const Section = require("../model/section");
const catchAsync = require("../util/catchAsync");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../config/cloudinary");
/**
 * "videoUrl": {
                                "public_id": "avatars/ohanl0py32n4bxadnjxl",
                                "url": "http://res.cloudinary.com/dleogo48u/video/upload/v1714645190/avatars/ohanl0py32n4bxadnjxl.mp4"
                            },
 */
exports.createSubSection = catchAsync(async (req, res) => {
  const { sectionId, title, description, timeDuration = "", video } = req.body;

  // const uploadedVideo = await uploadToCloudinary(video);

  const subSectionDetails = await SubSection.create({
    title,
    description,
    timeDuration,
    videoUrl: {
      public_id: "avatars/ohanl0py32n4bxadnjxl",
      url: "http://res.cloudinary.com/dleogo48u/video/upload/v1714645190/avatars/ohanl0py32n4bxadnjxl.mp4",
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
    subSectionDetails,
  });
});

exports.editSubSection = catchAsync(async (req, res) => {
  const { id, title, description, video } = req.body;

  const subSection = await SubSection.findById(id);

  if (video !== subSection.videoUrl.url) {
    await deleteFromCloudinary(subSection.videoUrl.public_id, "video");

    const newVideo = await uploadToCloudinary(video);

    subSection.videoUrl = {
      public_id: newVideo.public_id,
      url: newVideo.url,
    };
  }

  subSection.title = title;
  subSection.description = description;
  await subSection.save();

  res.status(201).json({
    success: true,
    message: "SubSection updated successfully!",
    subSection,
  });
});

exports.deleteSubSection = catchAsync(async (req, res) => {
  const { id, sectionName } = req.body;

  const subSection = await SubSection.findByIdAndDelete(id);

  const section = await Section.findOneAndUpdate(
    {
      sectionName,
    },
    {
      $pull: {
        subSection: id,
      },
    }
  );

  await deleteFromCloudinary(subSection.videoUrl.public_id, "video");

  res.status(200).json({
    success: true,
    message: "SubSection was deleted",
  });
});
