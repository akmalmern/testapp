const express = require("express");
const {
  createCategory,
  createTest,
} = require("../controller/admin/adminController");
const router = express.Router();

router.post("/create-category", createCategory);
router.post("/create-test", createTest);

module.exports = router;
