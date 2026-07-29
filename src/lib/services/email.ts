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
 */
function buildRawEmail(to: string, from: string, subject: string, body: string): string {
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
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

export async function sendContactNotification(name: string, email: string, message: string) {
  const gmail = getGmailClient();

  if (!gmail) {
    console.log(`[Email Mock] Contact form submission from ${name} (${email}): ${message}`);
    return { success: true, mocked: true };
  }

  const adminEmail = process.env.ADMIN_EMAIL || "contact@kgec.ac.in";
  const subject = `New Contact Submission from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

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

export async function sendPasswordResetOtp(email: string, otp: string) {
  const gmail = getGmailClient();

  if (!gmail) {
    console.log(`[Email Mock] Password reset OTP for ${email}: ${otp}`);
    return { success: true, mocked: true };
  }

  const subject = "KGEC Admin — Password Reset OTP";
  const body = [
    "You requested a password reset for your KGEC Admin account.",
    "",
    `Your OTP is: ${otp}`,
    "",
    "This code expires in 10 minutes. If you did not request this, ignore this email.",
  ].join("\n");

  try {
    const raw = buildRawEmail(email, `KGEC Admin <${senderEmail}>`, subject, body);

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return { success: true, data: result.data };
  } catch (err) {
    console.error("Failed to send password reset OTP via Gmail API:", err);
    return { success: false, error: err };
  }
}
