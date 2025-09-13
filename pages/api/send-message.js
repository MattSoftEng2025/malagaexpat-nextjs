// pages/api/send-message.js  — SES via SMTP (Nodemailer)
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,            // STARTTLS
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { name, email, company, phone, content } = req.body || {};

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

    // Very light bot guard: block messages containing raw URLs
    if (/\bhttps?:\/\/\S+/i.test(content)) {
      return res.status(400).json({ ok: false, error: "Links are not allowed in the message." });
    }

    const to = process.env.TO_EMAIL || process.env.FROM_EMAIL;
    if (!to || !process.env.FROM_EMAIL) {
      return res.status(500).json({ ok: false, error: "Email env vars not set" });
    }

    const subject = `New website enquiry from ${name}`;
    const html = `
      <h2>New enquiry</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ""}
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
      <hr/>
      <p>${esc(content).replace(/\n/g, "<br/>")}</p>
    `;
    const text =
      `New enquiry\n` +
      `Name: ${name}\nEmail: ${email}\n` +
      (company ? `Company: ${company}\n` : "") +
      (phone ? `Phone: ${phone}\n` : "") +
      `\n---\n${content}`;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      text,
      replyTo: email, // so you can reply directly to the sender
      headers: {
        "X-Entity-Ref-ID": "malagaexpat",
      },
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false, error: "Send failed" });
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
