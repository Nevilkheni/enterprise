const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Gmail SMTP (⚠️ App Password use karo, normal password nahi chalega)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nevilkheni135@gmail.com",
    pass: "pwtkieyjxgmperfb" // Gmail App Password
  }
});

// Temp memory store (Production me Firestore use karna better hai)
let otpStore = {};

// ✅ Send OTP
exports.sendOtp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = otp;

      const mailOptions = {
        from: "nevilkheni135@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ verificationId: email });
    } catch (error) {
      console.error("sendOtp Error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
});

// ✅ Verify OTP & Create User
exports.verifyOtpAndCreateUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email, password, otp, verificationId } = req.body;

      if (!email || !password || !otp || !verificationId) {
        return res.status(400).json({ error: "Missing fields" });
      }

      if (otpStore[verificationId] !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      const userRecord = await admin.auth().createUser({ email, password });

      // OTP remove kar dete hain after success
      delete otpStore[verificationId];

      return res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      console.error("verifyOtp Error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
});
