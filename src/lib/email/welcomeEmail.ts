export interface WelcomeEmailProps {
  name?: string;
  email: string;
  unsubscribeUrl?: string;
  websiteUrl?: string;
}

export function renderWelcomeEmailHtml(props: WelcomeEmailProps): string {
  const { name, unsubscribeUrl, websiteUrl = "https://ractysh.com" } = props;
  const greeting = name?.trim() ? name.trim() : "there";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Ractysh Global Trade</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; border-radius: 0 !important; }
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
      .hero-title { font-size: 32px !important; line-height: 38px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f2ee;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f2ee;padding:40px 16px;">
    <tr>
      <td align="center">
        <table class="container" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td class="pad" style="padding:40px 48px 0;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:700;letter-spacing:0.15em;color:#0f172a;text-transform:uppercase;">
                Ractysh
              </h1>
              <p style="margin:2px 0 0;font-size:11px;font-weight:600;letter-spacing:0.3em;color:#b8860b;text-transform:uppercase;">
                Global Trade
              </p>
              <div style="width:40px;height:2px;margin:20px auto 0;background-color:#b8860b;"></div>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td class="pad" style="padding:36px 48px 0;text-align:center;">
              <h2 class="hero-title" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:40px;font-weight:400;line-height:46px;letter-spacing:-0.02em;color:#0f172a;">
                Welcome to the<br/>
                <span style="font-weight:700;letter-spacing:-0.01em;">Ractysh Trade Network</span>
              </h2>
              <p style="margin:20px 0 0;font-size:16px;line-height:26px;color:#475569;">
                Hello ${greeting},
              </p>
              <p style="margin:12px 0 0;font-size:16px;line-height:26px;color:#475569;">
                You are now connected to a premium global trade ecosystem. Expect curated market intelligence, logistics insights, and trade opportunity briefings delivered straight to your inbox.
              </p>
            </td>
          </tr>

          <!-- Features -->
          <tr>
            <td class="pad" style="padding:36px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px;border:1px solid #e2e8f0;border-radius:10px;text-align:center;width:33%;">
                    <p style="margin:0;font-size:24px;line-height:1;">🚢</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#0f172a;letter-spacing:0.05em;text-transform:uppercase;">Ocean Freight</p>
                  </td>
                  <td style="width:8px;"></td>
                  <td style="padding:16px;border:1px solid #e2e8f0;border-radius:10px;text-align:center;width:33%;">
                    <p style="margin:0;font-size:24px;line-height:1;">✈️</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#0f172a;letter-spacing:0.05em;text-transform:uppercase;">Air Cargo</p>
                  </td>
                  <td style="width:8px;"></td>
                  <td style="padding:16px;border:1px solid #e2e8f0;border-radius:10px;text-align:center;width:33%;">
                    <p style="margin:0;font-size:24px;line-height:1;">📦</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#0f172a;letter-spacing:0.05em;text-transform:uppercase;">Supply Chain</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="pad" style="padding:36px 48px 40px;text-align:center;">
              <a href="${websiteUrl}" style="display:inline-block;padding:16px 40px;border-radius:8px;background:linear-gradient(135deg,#b8860b,#9a7209);color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">
                Explore Services →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 48px 32px;text-align:center;">
              <div style="height:1px;background-color:#e2e8f0;margin-bottom:24px;"></div>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:700;color:#0f172a;">Ractysh Global Trade</p>
              <p style="margin:10px 0 0;font-size:12px;color:#64748b;">
                Coimbatore · Palani · Thidugul
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:#64748b;">
                India · UAE · USA · UK · Germany
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;">
                &copy; ${new Date().getFullYear()} Ractysh Global Trade. All rights reserved.
              </p>
              ${
                unsubscribeUrl
                  ? `<p style="margin:10px 0 0;font-size:11px;color:#94a3b8;">Sent to ${props.email} · <a href="${unsubscribeUrl}" style="color:#b8860b;text-decoration:underline;">Unsubscribe</a></p>`
                  : ""
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderWelcomeEmailText(props: WelcomeEmailProps): string {
  const { name, websiteUrl = "https://ractysh.com" } = props;
  const greeting = name?.trim() ? name.trim() : "there";

  return [
    `Hello ${greeting},`,
    "",
    "Welcome to the Ractysh Trade Network.",
    "",
    "You are now connected to a premium global trade ecosystem. Expect curated market intelligence, logistics insights, and trade opportunity briefings delivered straight to your inbox.",
    "",
    "Our Services:",
    "- Ocean Freight",
    "- Air Cargo",
    "- Supply Chain Solutions",
    "",
    `Explore Ractysh Global Trade: ${websiteUrl}`,
    "",
    "Ractysh Global Trade",
    "Coimbatore · Palani · Thidugul",
    `© ${new Date().getFullYear()} Ractysh Global Trade. All rights reserved.`,
  ].join("\n");
}

export function renderWelcomeEmail(props: WelcomeEmailProps) {
  return {
    html: renderWelcomeEmailHtml(props),
    text: renderWelcomeEmailText(props),
    subject: "Welcome to the Ractysh Trade Network",
  };
}
