import { NextResponse } from "next/server";
import { z } from "zod";
import { sendResendEmail } from "@/lib/server/emailDelivery";
import { renderWelcomeEmail } from "@/lib/email/welcomeEmail";
import { rateLimit, rateLimitKey } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  name: z.string().trim().max(120).optional(),
});

function senderFromEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const val = process.env[key];
    if (val) return val;
  }
  return undefined;
}

export async function POST(request: Request) {
  const rl = rateLimit(rateLimitKey(request, "newsletter"), {
    max: 3,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait before subscribing again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message || "Invalid email" },
      { status: 400 },
    );
  }

  const { email, name } = parsed.data;

  const from = senderFromEnv("NEWSLETTER_FROM", "MAIL_FROM", "RESEND_FROM");
  const recipient = process.env.NEWSLETTER_DELIVERY_MODE === "test"
    ? process.env.NEWSLETTER_TEST_RECIPIENT || email
    : email;

  const welcomeEmail = renderWelcomeEmail({
    name,
    email,
    websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ractysh.com",
    unsubscribeUrl: `https://ractysh.com/unsubscribe?email=${encodeURIComponent(email)}`,
  });

  const result = await sendResendEmail({
    from: from || "Ractysh Global Trade <noreply@ractysh.com>",
    to: [recipient],
    subject: welcomeEmail.subject,
    text: welcomeEmail.text,
    html: welcomeEmail.html,
    idempotencyKey: `newsletter-welcome-${email}`,
  });

  if (!result.sent) {
    console.error("[newsletter] Failed to send welcome email", {
      email,
      error: result.error,
    });
    return NextResponse.json(
      { success: false, message: "Subscription failed. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Welcome! You are now subscribed to the Ractysh Trade Network.",
    },
    { status: 200 },
  );
}
