const express = require("express");

const {
  getConversations,
  getConversation,
  createMessage,
  getMessages,
} = require("../controller/conversation");
const {
  userVerification,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(userVerification, getConversations);
router.route("/first").post(userVerification, getConversation);

router
  .route("/message")
  .post(userVerification, createMessage)
  .get(userVerification, getMessages);

module.exports = router;
