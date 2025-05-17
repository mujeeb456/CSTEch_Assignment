const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const fileUpload = require("express-fileupload");

router.post("/csv", uploadController.uploadCSV);

module.exports = router;
