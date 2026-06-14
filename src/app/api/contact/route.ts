import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const rl = rateLimit(rateLimitKey(request, "contact"), {
    max: 3,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    let { name, email, phone, company, country, subject, services, message } = body;

    name = name ? escapeHtml(String(name).trim()) : "";
    email = email ? String(email).trim() : "";
    phone = phone ? escapeHtml(String(phone).trim()) : "";
    company = company ? escapeHtml(String(company).trim()) : null;
    country = country ? escapeHtml(String(country).trim()) : null;
    subject = subject ? escapeHtml(String(subject).trim()) : null;
    services = services ? (Array.isArray(services) ? services.map((s: string) => escapeHtml(s)) : escapeHtml(String(services))) : null;
    message = message ? escapeHtml(String(message).trim()) : null;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 },
      );
    }

    const submission = await prisma.submission.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        country: country || null,
        subject: subject || null,
        services: services ? (Array.isArray(services) ? services.join(", ") : services) : null,
        message: message || null,
      },
    });

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const adminEmail = process.env.ADMIN_EMAIL || "kalandars2004@gmail.com";

      const servicesList = Array.isArray(services) && services.length
        ? services.map((s: string) => `    <li>${s}</li>`).join("\n")
        : services && typeof services === "string"
          ? `    <li>${services}</li>`
          : "    <li>Not specified</li>";

      await resend.emails.send({
        from: process.env.EMAIL_FROM || "Ractysh Import Export <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Trade Inquiry — ${subject || "General"} — ${name} from ${country || "Unknown"}`,
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
    .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .header { background: #0f172a; padding: 32px; text-align: center; }
    .header img { height: 36px; width: auto; }
    .header h1 { color: #b8860b; font-size: 18px; margin: 12px 0 0; font-weight: 700; letter-spacing: 0.05em; }
    .header p { color: rgba(255,255,255,0.5); font-size: 12px; margin: 4px 0 0; }
    .body { padding: 32px; }
    .badge { display: inline-block; background: #b8860b; color: #fff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 4px; margin-bottom: 16px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 2px; }
    .field-value { font-size: 14px; color: #0f172a; }
    .field-value a { color: #b8860b; text-decoration: none; }
    .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
    ul { margin: 4px 0; padding-left: 20px; }
    ul li { font-size: 14px; color: #0f172a; margin-bottom: 4px; }
    .message-box { background: #f8f7f4; border-radius: 8px; padding: 16px; font-size: 14px; color: #0f172a; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb; }
    .footer p { font-size: 11px; color: #9ca3af; margin: 2px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <img src="${SITE_URL}/logo.png" alt="Ractysh Global Trade" style="height:36px" />
        <h1>RACTYSH GLOBAL TRADE</h1>
        <p>New Trade Inquiry</p>
      </div>
      <div class="body">
        <div class="badge">${submission.read ? "Read" : "New Submission"}</div>

        <div class="field">
          <div class="field-label">Subject</div>
          <div class="field-value" style="font-size:16px;font-weight:600">${subject || "General Inquiry"}</div>
        </div>

        <div class="divider"></div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${company || "Not provided"}</div>
          </div>
          <div class="field">
            <div class="field-label">Country</div>
            <div class="field-value">${country || "Not provided"}</div>
          </div>
          <div class="field">
            <div class="field-label">Submitted</div>
            <div class="field-value">${new Date(submission.createdAt).toLocaleString()}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="field">
          <div class="field-label">Services Interested In</div>
          <ul>
${servicesList}
          </ul>
        </div>

        ${message ? `
        <div class="divider"></div>
        <div class="field">
          <div class="field-label">Message</div>
          <div class="message-box">${message}</div>
        </div>` : ""}
      </div>
      <div class="footer">
        <p><strong>Ractysh Global Trade</strong></p>
        <p>ID: ${submission.id}</p>
        <p>${new Date(submission.createdAt).toISOString()}</p>
      </div>
    </div>
  </div>
</body>
</html>`,
      });
    } catch (emailErr) {
      console.error("Failed to send email notification:", emailErr);
    }

    return NextResponse.json({
      message:
        "Thank you for your inquiry. Our trade team will contact you within 24 hours.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Unable to process your request. Please try again." },
      { status: 500 },
    );
  }
}
