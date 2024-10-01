import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const issueJWT = (payload) => {
  const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
  return token;
};

const generateResetPasswordToken = (user) => {
  const payload = {
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.AUTH_JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
  return token;
};

const sendMail = async (email, resetToken) => {
  const outlookEmail = process.env.OUTLOOK_EMAIL;
  const outlookPassword = process.env.OUTLOOK_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: outlookEmail,
      pass: outlookPassword,
    },
  });

  // Function to send the reset password email
  const sendResetPasswordEmail = async (email, resetToken) => {
    const resetLink = `${process.env.FRONTEND_ORIGIN}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: `"Teal Climate" <${outlookEmail}>`,
      to: email, // Recipient email
      subject: "Password Reset",
      text: `You requested a password reset. Click the link below to reset your password: ${resetLink}`,
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      // console.log("Reset password email sent successfully.");
    } catch (error) {
      console.error("Error sending reset password email:", error);
    }
  };

  sendResetPasswordEmail(email, resetToken);
};

export { issueJWT, generateResetPasswordToken, sendMail };
