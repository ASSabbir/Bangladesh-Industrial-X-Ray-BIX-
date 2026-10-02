const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// @route  POST /api/contact
// Accepts a contact form submission and emails it to the BIX team.
router.post("/", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      jobTitle,
      district,
      industry,
      topic,
      message,
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and message are required",
      });
    }

    console.log("New contact form submission:", {
      firstName, lastName, email, phone, companyName, jobTitle,
      district, industry, topic, message, date: new Date(),
    });

    await transporter.sendMail({
      from: `"BIX Website" <${process.env.SMTP_USER}>`,
      to: "faiz@bixndt.com, shuvo@bixndt.com",
      replyTo: email,
      subject: `New Contact Form Submission — ${topic || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${companyName || "-"}</p>
        <p><b>Job Title:</b> ${jobTitle || "-"}</p>
        <p><b>District:</b> ${district || "-"}</p>
        <p><b>Industry:</b> ${industry || "-"}</p>
        <p><b>Topic:</b> ${topic || "-"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Thank you, your message has been received. We will get back to you soon.",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;