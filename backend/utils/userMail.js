const nodemailer = require('nodemailer');

function userMail(otp) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OTP Verification - Rasipe Sharing Platform</title>
</head>

<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:40px 0;">
  <tr>
    <td align="center">

      <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#0d6efd;padding:24px;text-align:center;color:#ffffff;">
            <h1 style="margin:0;font-size:22px;font-weight:600;">
              🍳 Rasipe Sharing Platform
            </h1>
            <p style="margin:8px 0 0 0;font-size:14px;">Email Verification</p>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:40px 30px;text-align:center;">
            
            <p style="font-size:16px;color:#333;margin:0 0 30px 0;">
              Welcome to Rasipe! Your verification code is:
            </p>

            <div style="
              display:inline-block;
              padding:16px 30px;
              font-size:26px;
              font-weight:700;
              letter-spacing:6px;
              color:#0d6efd;
              border:2px solid #0d6efd;
              border-radius:10px;
              background:#f9fbff;
            ">
              ${otp}
            </div>

            <p style="margin-top:20px;font-size:13px;color:#777;">
              OTP is valid for 10 minutes. Please do not share it with anyone.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;background:#f5f5f5;border-top:1px solid #eee;font-size:12px;color:#999;">
            <p style="margin:0;">Rasipe © 2026 - Recipe Sharing Platform</p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
  `;
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send OTP Email
exports.sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Rasipe - Email Verification OTP',
      html: userMail(otp)
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};

module.exports.userMail = userMail;
