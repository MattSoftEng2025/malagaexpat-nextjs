// malagaexpat-nextjs/pages/api/send-message.js
import sendgrid from "@sendgrid/mail";

// Configure SendGrid with API key from environment
if (!process.env.SENDGRID_API_KEY) {
  console.error("Missing SENDGRID_API_KEY env var");
}
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    // Accept both "content" and "message" (depending on your frontend form)
    const { name, email } = req.body || {};
    const content = req.body?.content ?? req.body?.message;

    // Validation
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

    // Block links like your original logic
    const lower = content.toLowerCase();
    if (lower.includes("http://") || lower.includes("https://")) {
      return res.status(400).json({ ok: false, error: "Links not allowed" });
    }

    // Simple email validation
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
      from: FROM_EMAIL,         // must be a verified sender/domain in SendGrid
      replyTo: email,           // allows you to hit "reply" in Gmail/Outlook
      subject: `New enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${content}`,
      html: `
        <p><strong>From:</strong> ${esc(name)} (${esc(email)})</p>
        <p>${esc(content).replace(/\n/g, "<br>")}</p>
      `,
      headers: { "X-MalagaExpat-Source": "contact-form" },
    });

    return res.status(200).json({ ok: true, message: "Message sent" });
  } catch (err) {
    // Detailed error in debug mode (?debug=1)
    const sg = err?.response?.body || null;
    const debug = String(req.query?.debug || "") === "1";
    console.error("SendGrid error:", sg || err);

    return res.status(500).json(
      debug
        ? {
            ok: false,
            error: err?.message || "Send failed",
            sendgrid: sg,
            hasFROM: !!process.env.FROM_EMAIL,
            hasTO: !!process.env.TO_EMAIL,
            hasKEY: !!process.env.SENDGRID_API_KEY,
            receivedBody: req.body,
          }
        : { ok: false, error: "Send failed" }
    );
  }
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
