import { Resend } from "resend";

export interface EmailDeliveryInput {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  idempotencyKey?: string;
}

export interface EmailDeliveryResult {
  sent: boolean;
  error?: string;
  id?: string;
  sentAt?: string;
}

export async function sendResendEmail(
  input: EmailDeliveryInput,
): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not configured", {
      subject: input.subject,
      to: input.to,
    });
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  if (!input.from) {
    console.error("[email] sender not configured", {
      subject: input.subject,
      to: input.to,
    });
    return { sent: false, error: "Sender not configured" };
  }

  if (!input.to.length) {
    console.error("[email] no recipients", {
      subject: input.subject,
      from: input.from,
    });
    return { sent: false, error: "No recipients" };
  }

  const resend = new Resend(apiKey);

  const response = await resend.emails.send(
    {
      from: input.from,
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    },
    input.idempotencyKey
      ? { idempotencyKey: input.idempotencyKey }
      : undefined,
  );

  if (response.error) {
    console.error("[email] Resend send failed", {
      subject: input.subject,
      to: input.to,
      error: response.error.message,
    });
    return { sent: false, error: response.error.message };
  }

  return {
    sent: true,
    id: response.data?.id,
    sentAt: new Date().toISOString(),
  };
}
