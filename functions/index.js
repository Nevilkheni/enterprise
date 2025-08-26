const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Gmail SMTP (App Password use karna hoga)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nevilkheni135@gmail.com",
    pass: "pwtkieyjxgmperfb" // Gmail App Password
  }
});

let otpStore = {}; // temp store (prod me Firestore use karo)

exports.sendOtp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email } = req.body;

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

exports.verifyOtpAndCreateUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email, password, otp, verificationId } = req.body;

      if (otpStore[verificationId] !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      const userRecord = await admin.auth().createUser({ email, password });

      delete otpStore[verificationId];

      return res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      console.error("verifyOtp Error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
});
