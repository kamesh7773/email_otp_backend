const otpController = require("../controllers/otp.controller");

const express = require("express");
const router = express.Router();

router.post("/send-otp", otpController.otpLogin);
router.post("/verify-otp", otpController.verifyOTP);

module.exports = router;
