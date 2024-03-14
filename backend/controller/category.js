const Category = require("../model/category");

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

exports.categoryPageDetails = catchAsync(async (req, res) => {
  const  categoryId  = req.params;

  const selectedCategory = await Category.findById(categoryId).populate(
    "course"
  );

  const differentCategory = await Category.find({
    _id: {
      $ne: categoryId,
    },
  }).populate("course");

  res.status(200).json({
    success: true,
    data: {
      selectedCategory,
      differentCategory,
    },
  });
});
