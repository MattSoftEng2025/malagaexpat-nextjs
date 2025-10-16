// pages/api/env-check.js
export default function handler(req, res) {
  // Server-side envs
  const checks = {
    FROM_EMAIL: !!process.env.FROM_EMAIL,
    TO_EMAIL: !!process.env.TO_EMAIL,
    TO_EMAIL_CONSULTATION: !!process.env.TO_EMAIL_CONSULTATION, // optional, for consultations
    SMTP_HOST: !!process.env.SMTP_HOST,
    SMTP_USER: !!process.env.SMTP_USER,
    SMTP_PASS: !!process.env.SMTP_PASS,

    // Public env (defined in .env.local). Available here if set in the runtime env.
    NEXT_PUBLIC_CONSULTATION_ENDPOINT: !!process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT,
  };

  // Optional niceties (don’t expose secrets/values)
  // Try to infer SES region from SMTP_HOST just for sanity check
  if (process.env.SMTP_HOST) {
    const m = /email-smtp\.([a-z0-9-]+)\.amazonaws\.com/i.exec(process.env.SMTP_HOST);
    checks.SES_REGION_INFERRED = !!(m && m[1]);
  }

  res.status(200).json(checks);
}
