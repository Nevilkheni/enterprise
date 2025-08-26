const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Gmail SMTP (App Password use karna hoga)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nevilkheni135@gmail.com",
    pass: "pwtkieyjxgmperfb", // Gmail App Password (not your main password)
  },
});

let otpStore = {}; // Temp store (production me Firestore use karo)

// ======================= SEND OTP API =======================
exports.sendOtp = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp; // Save in memory (use Firestore in production)

    const mailOptions = {
      from: "nevilkheni135@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${email}: ${otp}`);

    return res.json({ verificationId: email });
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// ======================= VERIFY OTP & CREATE USER =======================
exports.verifyOtpAndCreateUser = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { email, password, otp, verificationId } = req.body;

    if (!email || !password || !otp || !verificationId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (otpStore[verificationId] !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP match → create Firebase user
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    delete otpStore[verificationId]; // clear OTP after use

    return res.json({ uid: userRecord.uid });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({ error: error.message });
  }
});
