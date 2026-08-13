const express = require("express");
const router = express.Router();

// @route  POST /api/contact
// Accepts a contact form submission. In production, wire this to an email
// service (Nodemailer/SendGrid/etc). For now it validates and logs it so the
// endpoint is fully functional end-to-end.
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required" });
    }
    console.log("New contact form submission:", { name, email, phone, message, date: new Date() });
    res.status(201).json({ success: true, message: "Thank you, your message has been received. We will get back to you soon." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
