const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nevilkheni135@gmail.com",
    pass: "pwtkieyjxgmperfb" 
  }
});


exports.sendOtp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await db.collection("otpStore").doc(email).set({
        otp,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

       const mailOptions = {
    from: "Your Website <nevilkheni135@gmail.com>",
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background: #f9f9f9;">
        <h2 style="color:#333;">🔐 Your OTP Code</h2>
        <p style="font-size: 18px;">Use the OTP below to continue:</p>
        <div style="background:#fff; border:1px solid #ddd; padding:15px; display:inline-block; font-size:22px; font-weight:bold; letter-spacing:3px;">
          ${otp}
        </div>
        <p style="color:#777; margin-top:10px;">This code will expire in <b>5 minutes</b>.</p>
      </div>
    `
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

      if (!email || !password || !otp || !verificationId) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const doc = await db.collection("otpStore").doc(verificationId).get();
      if (!doc.exists) {
        return res.status(400).json({ error: "OTP expired or not found" });
      }

      const data = doc.data();

      const now = Date.now();
      const createdAt = data.createdAt.toDate().getTime();
      if (now - createdAt > 5 * 60 * 1000) {
        await db.collection("otpStore").doc(verificationId).delete();
        return res.status(400).json({ error: "OTP expired" });
      }

      if (data.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      const userRecord = await admin.auth().createUser({ email, password });

      await db.collection("otpStore").doc(verificationId).delete();

      return res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      console.error("verifyOtp Error:", error);
      return res.status(500).json({ error: error.message });
    }
  });
});




















