exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again later!",
      });
    });
  };
};
