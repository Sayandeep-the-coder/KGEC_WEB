import { google } from "googleapis";

const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
const senderEmail = process.env.GMAIL_SENDER_EMAIL;

function getGmailClient() {
  if (!clientId || !clientSecret || !refreshToken || !senderEmail) {
    return null;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.gmail({ version: "v1", auth: oauth2Client });
}

/**
 * Builds a raw RFC 2822 email and base64url-encodes it for the Gmail API.
 * Supports both plain text and HTML content via the `contentType` parameter.
 */
function buildRawEmail(
  to: string,
  from: string,
  subject: string,
  body: string,
  contentType: "text/plain" | "text/html" = "text/html"
): string {
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: ${contentType}; charset="UTF-8"`,
    "",
    body,
  ];
  const message = messageParts.join("\r\n");

  // Gmail API requires base64url encoding (no padding, URL-safe chars)
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/* ------------------------------------------------------------------ */
/*  Shared email layout wrapper                                        */
/* ------------------------------------------------------------------ */

function emailLayout(title: string, innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%); padding:28px 32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:0.3px;">
                Kalyani Government Engineering College
              </h1>
              <p style="margin:4px 0 0; color:#93c5fd; font-size:13px; font-weight:500; letter-spacing:0.5px;">
                KGEC &middot; Established 1995
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${innerHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; background-color:#f9fafb; border-top:1px solid #e5e7eb; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9ca3af; line-height:1.5;">
                Kalyani Government Engineering College, Kalyani, Nadia, West Bengal 741235
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#9ca3af;">
                &copy; ${new Date().getFullYear()} KGEC. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  Contact form notification                                          */
/* ------------------------------------------------------------------ */

export async function sendContactNotification(name: string, email: string, message: string) {
  const gmail = getGmailClient();

  if (!gmail) {
    console.log(`[Email Mock] Contact form submission from ${name} (${email}): ${message}`);
    return { success: true, mocked: true };
  }

  const adminEmail = process.env.ADMIN_EMAIL || "contact@kgec.ac.in";

  // Escape ALL user-supplied fields before HTML interpolation
  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const subject = `New Contact Submission from ${escapedName}`;

  const body = emailLayout(
    subject,
    `
    <p style="margin:0 0 4px; font-size:13px; color:#6b7280; text-transform:uppercase; font-weight:600; letter-spacing:0.8px;">
      New Contact Submission
    </p>
    <h2 style="margin:0 0 24px; font-size:20px; color:#111827; font-weight:700;">
      ${escapedName} reached out via the website
    </h2>

    <!-- Sender details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:12px 16px; background-color:#f0f9ff; border-radius:8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:4px 0;">
                <span style="font-size:12px; color:#6b7280; font-weight:600;">NAME</span><br />
                <span style="font-size:15px; color:#111827;">${escapedName}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 0;">
                <span style="font-size:12px; color:#6b7280; font-weight:600;">EMAIL</span><br />
                <a href="mailto:${escapedEmail}" style="font-size:15px; color:#2563eb; text-decoration:none;">${escapedEmail}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <p style="margin:0 0 8px; font-size:12px; color:#6b7280; font-weight:600; text-transform:uppercase; letter-spacing:0.8px;">
      Message
    </p>
    <div style="padding:16px; background-color:#f9fafb; border-left:4px solid #2d5a8e; border-radius:0 8px 8px 0; font-size:15px; color:#374151; line-height:1.7;">
      ${escapedMessage}
    </div>

    <p style="margin:24px 0 0; font-size:13px; color:#9ca3af; text-align:center;">
      Reply directly to this email to respond to <strong>${escapedName}</strong>.
    </p>
    `
  );

  try {
    const raw = buildRawEmail(adminEmail, `KGEC Contact Form <${senderEmail}>`, subject, body);

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return { success: true, data: result.data };
  } catch (err) {
    console.error("Failed to send contact notification email via Gmail API:", err);
    return { success: false, error: err };
  }
}

