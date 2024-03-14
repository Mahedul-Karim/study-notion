const express = require("express");

const category = require("../controller/category");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.userVerification,
    authMiddleware.isAdmin,
    category.createCategory
  )
  .get(category.getAllCategorys);
router.route("/:categoryId").get(category.categoryPageDetails);

module.exports = router;
