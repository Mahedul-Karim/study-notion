const User = require("../model/user");
const Profile = require("../model/profile");
const catchAsync = require("../util/catchAsync");
const { uploadToCloudinary } = require("../config/cloudinary");

exports.updateProfile = catchAsync(async (req, res) => {
  const { dateOfBirth = "", about = "", contactNumber, gender,firstName,lastName } = req.body;

  const profileId = req.user.additionalDetails;
  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(userId,{
    firstName,
    lastName
  },{
    new:true
  })

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

  const token = user.getToken();

  user.password = null;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite:'none',
    secure:true
  };

  res.cookie("token", token, options).status(200).json({
    success: true,
    user,
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

exports.updateProfilePicture = catchAsync(async (req, res) => {
  const { image } = req.body;
  const { _id } = req.user;

  const result = await uploadToCloudinary(image);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      image: result.url,
    },
    {
      new: true,
    }
  );

  const token = user.getToken();

  user.password = null;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite:'none',
    secure:true
  };

  res.cookie("token", token, options).status(200).json({
    success: true,
    user,
  });

});
