// pages/api/consultation.js — SES via SMTP (Nodemailer)
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,             // STARTTLS
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const {
      name,
      email,
      phone,
      service,           // from the popup’s “topic”
      preferredTime,     // Morning/Afternoon/Evening/Any time
      message,
      company            // honeypot
    } = req.body || {};

    // Honeypot: if bots fill it, pretend success
    if (typeof company === "string" && company.trim()) {
      return res.status(200).json({ ok: true });
    }

    // Basic validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() || !email.trim() || !message.trim()
    ) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // Light anti-spam: block raw links
    if (/\bhttps?:\/\/\S+/i.test(message)) {
      return res.status(400).json({ ok: false, error: "Links are not allowed in the message." });
    }

    const to = process.env.TO_EMAIL_CONSULTATION || process.env.TO_EMAIL || process.env.FROM_EMAIL;
    if (!to || !process.env.FROM_EMAIL) {
      return res.status(500).json({ ok: false, error: "Email env vars not set" });
    }

    const subject = `[Consultation Request] from ${name}`;
    const html = `
      <h2>New consultation</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
      ${service ? `<p><strong>Service/Topic:</strong> ${esc(service)}</p>` : ""}
      ${preferredTime ? `<p><strong>Preferred time-slot:</strong> ${esc(preferredTime)}</p>` : ""}
      <hr/>
      <p>${esc(message).replace(/\n/g, "<br/>")}</p>
    `;

    const text =
      `New consultation\n` +
      `Name: ${name}\nEmail: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      (service ? `Service/Topic: ${service}\n` : "") +
      (preferredTime ? `Preferred time-slot: ${preferredTime}\n` : "") +
      `\n---\n${message}`;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      text,
      replyTo: email,
      headers: { "X-Entity-Ref-ID": "malagaexpat-consultation" },
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
