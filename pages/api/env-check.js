// pages/api/env-check.js
export default function handler(req, res) {
  res.status(200).json({
    FROM_EMAIL: !!process.env.FROM_EMAIL,
    TO_EMAIL: !!process.env.TO_EMAIL,
    SMTP_HOST: !!process.env.SMTP_HOST,
    SMTP_USER: !!process.env.SMTP_USER,
    SMTP_PASS: !!process.env.SMTP_PASS,
  });
}
