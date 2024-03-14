// const { instance } = require("../config/razorpay");
// const { enrollment } = require("../mail/enrollmentTemplate");
// const { sendEmail } = require("../util/mailSender");
// const catchAsync = require("../util/catchAsync");

// const Course = require("../model/course");
// const User = require("../model/user");

// exports.capturePayment = catchAsync(async (req, res) => {
//   const userId = req.user._id;
//   const { courseId } = req.body;

//   if (!courseId) {
//     return res.json({
//       success: false,
//       message: "Please try again later!",
//     });
//   }

//   const course = await Course.findById(courseId);

//   if (course.studentsEnrolled.includes(userId)) {
//     return res.json({
//       success: false,
//       message: "Student already enrolled!",
//     });
//   }

//   const paymentResponse = await instance.orders.create({
//     amount: course.price * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId,
//       userId,
//     },
//   });

//   res.status(201).json({
//     success: true,
//     courseName: course.courseName,
//     courseDescription: course.courseDescription,
//     thumbnail: course.thumbnail,
//     orderId: paymentResponse.id,
//   });
// });

// exports.verifySignature = catchAsync(async (req, res) => {
//   const webhookSecret = "12345678";

//   const signature = req.headers("x-razorpay-signature");

//   const hmacObj = crypto.createHmac("sha256", webhookSecret);
//   hmacObj.update(JSON.stringify(req.body));
//   const digest = hmacObj.digest("hex");

//   if (digest !== signature) {
//     return res.json({
//       success: false,
//       message: "Something went wrong!",
//     });
//   }

//   const { courseId, userId } = req.body.payload.payment.entity.notes;

//   const enrolledCourse = await Course.findByIdAndUpdate(
//     courseId,
//     {
//       $push: {
//         studentsEnrolled: userId,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const enrolledStudent = await User.findByIdAndUpdate(
//     userId,
//     {
//       $push: {
//         courses: courseId,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   await sendEmail(
//     enrolledStudent.email,
//     "Course Enrolled",
//     "Course enrollment was successfull!"
//   );

//   res.status(200).json({
//     success: true,
//     message: "You have successfully enrolled to the course!",
//   });
// });
