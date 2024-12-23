const express = require("express");
const {
  signUp,
  signIn,
  userProfile,
  refreshAccessToken,
  logOut,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/isAuth");
const router = express.Router();
const upload = require("../middlware/upload");
const {
  startTest,
  finishTest,
} = require("../controller/testYechishController");

router.post("/signup", upload.single("image"), signUp);
router.post("/signin", signIn);
router.get("/user-profile", isAuthenticated, userProfile);
router.post("/refresh-token", refreshAccessToken);
router.get("/logout", logOut);
// +++++++++++++++++++++++++++++++++++++++++++
router.post("/start-test", startTest);
router.post("/finish-test", finishTest);

module.exports = router;
