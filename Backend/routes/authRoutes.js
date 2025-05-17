const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");
const authController = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/signup", authController.registerUser);
module.exports = router;
