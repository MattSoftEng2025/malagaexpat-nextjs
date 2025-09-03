// pages/api/ping.js
export default (req, res) => res.status(200).json({ ok: true, method: req.method });

// pages/api/env-check.js
export default (req, res) => res.status(200).json({
  FROM_EMAIL: !!process.env.FROM_EMAIL,
  TO_EMAIL: !!process.env.TO_EMAIL,
  SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY
});
