const User = require("../model/user");
const Profile = require("../model/profile");
const catchAsync = require("../util/catchAsync");

exports.updateProfile = catchAsync(async (req, res) => {
  const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

  const profileId = req.user.additionalDetails;

  const profileDetails = await Profile.findByIdAndUpdate(
    profileId,
    {
      dateOfBirth,
      about,
      contactNumber,
      gender,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    profileDetails,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const profileId = req.user.additionalDetails;

  await Profile.findByIdAndDelete(profileId);
  await User.findByIdAndDelete(userId);

  //unenroll student from course
  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});
