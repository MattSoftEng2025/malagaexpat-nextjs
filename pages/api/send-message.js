// pages/api/send-message.js
import sendgrid from "@sendgrid/mail";

// Ensure the key exists (fail fast on cold start for clearer errors)
if (!process.env.SENDGRID_API_KEY) {
  // eslint-disable-next-line no-console
  console.error("Missing SENDGRID_API_KEY env var");
}
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    // Accept your existing payload shape (name, email, content)
    const { name, email, content } = req.body || {};

    // Basic validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof content !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !content.trim()
    ) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // Simple spam/link block (keeps your original behavior)
    const lower = content.toLowerCase();
    if (lower.includes("http://") || lower.includes("https://")) {
      return res.status(400).json({ ok: false, error: "Links not allowed" });
    }

    // Very light email sanity check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return res.status(422).json({ ok: false, error: "Invalid email" });
    }

    const FROM_EMAIL = process.env.FROM_EMAIL;
    const TO_EMAIL = process.env.TO_EMAIL;

    if (!FROM_EMAIL || !TO_EMAIL) {
      return res.status(500).json({
        ok: false,
        error: "Server misconfiguration (FROM_EMAIL / TO_EMAIL missing)",
      });
    }

    // Send via SendGrid
    await sendgrid.send({
      to: TO_EMAIL,
      from: FROM_EMAIL, // must be a verified sender/domain in SendGrid
      subject: `New enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${content}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p>${escapeHtml(content).replace(/\n/g, "<br>")}</p>
      `,
      headers: {
        "X-MalagaExpat-Source": "contact-form",
      },
    });

    return res.status(200).json({ ok: true, message: "Message sent" });
  } catch (err) {
    // Log full error server-side; return safe message client-side
    // eslint-disable-next-line no-console
    console.error("SendGrid error:", err?.response?.body || err?.message || err);
    const sgDetail = err?.response?.body?.errors?.[0]?.message;
    return res
      .status(500)
      .json({ ok: false, error: sgDetail || err.message || "Send failed" });
  }
}

// Small HTML escaper to avoid HTML injection in the email body
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
