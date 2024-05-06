const Stripe = require("stripe");
const CourseProgress = require("../model/courseProgress");

const x =
  "sk_test_51NIsJcJslDAWGDHdA22nu6RQsgtIMHzngR0xqMEZcALpMmdN9tojjXYJi8B3VkoKsZoEouQgmsMMoksaDkphsg1400F2xwIxuv";
const stripe = Stripe(x);

const catchAsync = require("../util/catchAsync");

const Course = require("../model/course");
const User = require("../model/user");

exports.getPayment = catchAsync(async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });

  res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

exports.enrollStudent = catchAsync(async (req, res) => {
  const { courseId, userId } = req.body;

  const course = await Course.findByIdAndUpdate(courseId, {
    $push: {
      studentsEnrolled: userId,
    },
  });

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        courses: courseId,
      },
    },
    {
      new: true,
    }
  );

  await CourseProgress.create({
    userId,
    courseId: course._id,
  });

  res.status(201).json({
    success: true,
    user,
  });
});
