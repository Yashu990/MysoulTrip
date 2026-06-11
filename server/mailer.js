import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
  BRAND_NAME = 'MySoulTrip',
} = process.env

// A single shared transporter. Returns null when SMTP is not configured,
// so the API can degrade gracefully (log-only) in local/dev environments.
let transporter = null

export function getTransporter() {
  if (transporter) return transporter

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[mailer] SMTP not configured — emails will be skipped. Set SMTP_* env vars to enable.')
    return null
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(SMTP_SECURE) === 'true', // true for 465, false for 587/STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  return transporter
}

const fromAddress = () => MAIL_FROM || `${BRAND_NAME} <${SMTP_USER}>`

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Branded "Thank you" auto-reply sent to the visitor who filled the form.
function thankYouHtml(name) {
  const safeName = escapeHtml(name || 'Traveller')
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0f1722;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(15,31,61,0.18);">
            <!-- Gradient header -->
            <tr>
              <td style="background:linear-gradient(90deg,#34d6c0 0%,#5bb8f0 100%);padding:44px 36px;">
                <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.2;font-weight:800;">
                  Thank you, ${safeName}! &#127881;
                </h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:36px;color:#d7dbe2;font-size:17px;line-height:1.6;">
                <p style="margin:0 0 20px;">
                  We've received your message and truly appreciate you reaching out to
                  <strong style="color:#ffffff;">${escapeHtml(BRAND_NAME)}</strong>.
                </p>
                <p style="margin:0 0 20px;">
                  Our team will review your inquiry and get back to you within
                  <strong style="color:#ffffff;">24 hours</strong>.
                </p>
                <p style="margin:0;">
                  Warm regards,<br />
                  The ${escapeHtml(BRAND_NAME)} Team
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:18px 0 0;color:#9aa1ad;font-size:12px;">
            This is an automated confirmation — please do not reply to this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

// Plain-text fallback for the visitor auto-reply.
function thankYouText(name) {
  return [
    `Thank you, ${name || 'Traveller'}!`,
    '',
    `We've received your message and truly appreciate you reaching out to ${BRAND_NAME}.`,
    'Our team will review your inquiry and get back to you within 24 hours.',
    '',
    'Warm regards,',
    `The ${BRAND_NAME} Team`,
  ].join('\n')
}

// Internal notification with the full enquiry details for the team inbox.
function teamNotificationHtml(form) {
  const detailRow = (label, value, isLast) => `
        <tr>
          <td style="padding:14px 24px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;width:120px;vertical-align:top;border-bottom:${isLast ? 'none' : '1px solid #eef0f3'};">${label}</td>
          <td style="padding:14px 24px;font-size:15px;color:#111827;vertical-align:top;border-bottom:${isLast ? 'none' : '1px solid #eef0f3'};white-space:pre-wrap;word-break:break-word;">${value}</td>
        </tr>`

  const emailCell = form.email
    ? `<a href="mailto:${escapeHtml(form.email)}" style="color:#c79a3a;text-decoration:none;font-weight:600;">${escapeHtml(form.email)}</a>`
    : '—'
  const phoneCell = form.phone
    ? `<a href="tel:${escapeHtml(form.phone)}" style="color:#111827;text-decoration:none;">${escapeHtml(form.phone)}</a>`
    : '—'

  const rows = [
    detailRow('Name', escapeHtml(form.name || '—')),
    detailRow('Email', emailCell),
    detailRow('Phone', phoneCell),
    detailRow('Subject', escapeHtml(form.subject || '—')),
    detailRow('Message', escapeHtml(form.message || '—'), true),
  ].join('')

  const replyButton = form.email
    ? `
              <tr>
                <td style="padding:8px 24px 28px;">
                  <a href="mailto:${escapeHtml(form.email)}?subject=${encodeURIComponent(`Re: ${form.subject || 'Your enquiry'} — ${escapeHtml(BRAND_NAME)}`)}"
                     style="display:inline-block;background:#0f1722;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:8px;">
                    Reply to ${escapeHtml((form.name || 'enquirer').split(' ')[0])} &rarr;
                  </a>
                </td>
              </tr>`
    : ''

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef1f5;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:28px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 36px rgba(15,23,34,0.10);">
            <!-- Brand header -->
            <tr>
              <td style="background:#0f1722;padding:26px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.02em;">
                      ${escapeHtml(BRAND_NAME)}
                    </td>
                    <td align="right" style="font-size:12px;font-weight:600;color:#c79a3a;text-transform:uppercase;letter-spacing:0.08em;">
                      New Enquiry
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Accent bar -->
            <tr><td style="height:4px;background:#c79a3a;font-size:0;line-height:0;">&nbsp;</td></tr>
            <!-- Intro -->
            <tr>
              <td style="padding:26px 24px 6px;">
                <h1 style="margin:0 0 6px;font-size:19px;color:#0f1722;font-weight:700;">You have a new contact enquiry</h1>
                <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">
                  A visitor submitted the contact form on the website. Details are below.
                </p>
              </td>
            </tr>
            <!-- Details card -->
            <tr>
              <td style="padding:18px 24px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f3;border-radius:10px;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            ${replyButton}
            <!-- Footer -->
            <tr>
              <td style="background:#f7f8fa;padding:18px 24px;border-top:1px solid #eef0f3;">
                <p style="margin:0;font-size:12px;color:#9aa1ad;line-height:1.5;">
                  This enquiry was generated automatically from the ${escapeHtml(BRAND_NAME)} website contact form.
                  Reply directly to this email to respond to the visitor.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/**
 * Send both the visitor auto-reply and the internal team notification.
 * Resolves with { sent: boolean } and never throws so the API stays responsive.
 */
export async function sendContactEmails(form) {
  const tx = getTransporter()
  if (!tx) return { sent: false, reason: 'smtp-not-configured' }

  try {
    const tasks = []

    // 1) Auto-reply to the visitor (matches the branded template).
    if (form.email) {
      tasks.push(
        tx.sendMail({
          from: fromAddress(),
          to: form.email,
          subject: `Thank you for contacting ${BRAND_NAME}!`,
          text: thankYouText(form.name),
          html: thankYouHtml(form.name),
        }),
      )
    }

    // 2) Notification to the team inbox.
    const teamInbox = MAIL_TO || SMTP_USER
    if (teamInbox) {
      tasks.push(
        tx.sendMail({
          from: fromAddress(),
          to: teamInbox,
          replyTo: form.email || undefined,
          subject: `New enquiry${form.subject ? `: ${form.subject}` : ''} — ${form.name || 'Website'}`,
          html: teamNotificationHtml(form),
        }),
      )
    }

    const info = await Promise.all(tasks)
    return { sent: true, info }
  } catch (error) {
    console.error('[mailer] Failed to send contact emails:', error.message)
    return { sent: false, reason: error.message }
  }
}
