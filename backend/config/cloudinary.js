const cloudinary = require("cloudinary");

exports.configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
};

exports.uploadToCloudinary = async (
  file,
  folder = "avatars",
  height,
  quality
) => {
  const options = { folder };

  if (height) {
    options.height = height;
  }

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  return await cloudinary.v2.uploader.upload(file, options);
};

exports.deleteFromCloudinary = async (publicId, type) => {
  return await cloudinary.v2.uploader.destroy(publicId, {
    resource_type: type,
  });
};
