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

// --- Shared building blocks for the internal team notification -----------------
const detailRow = (label, value, isLast) => `
        <tr>
          <td style="padding:14px 24px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b7280;width:120px;vertical-align:top;border-bottom:${isLast ? 'none' : '1px solid #eef0f3'};">${label}</td>
          <td style="padding:14px 24px;font-size:15px;color:#111827;vertical-align:top;border-bottom:${isLast ? 'none' : '1px solid #eef0f3'};white-space:pre-wrap;word-break:break-word;">${value}</td>
        </tr>`

const emailCell = (email) =>
  email ? `<a href="mailto:${escapeHtml(email)}" style="color:#c79a3a;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>` : '—'
const phoneCell = (phone) =>
  phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#111827;text-decoration:none;">${escapeHtml(phone)}</a>` : '—'

// Generic branded notification shell — used by both the contact form and the
// "Plan Your Trip" enquiry, just with different rows + heading.
function notificationShell({ tag, heading, intro, rows, replyTo, replyName, replySubject }) {
  const replyButton = replyTo
    ? `
              <tr>
                <td style="padding:8px 24px 28px;">
                  <a href="mailto:${escapeHtml(replyTo)}?subject=${encodeURIComponent(`Re: ${replySubject || 'Your enquiry'} — ${BRAND_NAME}`)}"
                     style="display:inline-block;background:#0f1722;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 26px;border-radius:8px;">
                    Reply to ${escapeHtml((replyName || 'enquirer').split(' ')[0])} &rarr;
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
            <tr>
              <td style="background:#0f1722;padding:26px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:0.02em;">${escapeHtml(BRAND_NAME)}</td>
                    <td align="right" style="font-size:12px;font-weight:600;color:#c79a3a;text-transform:uppercase;letter-spacing:0.08em;">${tag}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td style="height:4px;background:#c79a3a;font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr>
              <td style="padding:26px 24px 6px;">
                <h1 style="margin:0 0 6px;font-size:19px;color:#0f1722;font-weight:700;">${heading}</h1>
                <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.5;">${intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 24px 4px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f3;border-radius:10px;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            ${replyButton}
            <tr>
              <td style="background:#f7f8fa;padding:18px 24px;border-top:1px solid #eef0f3;">
                <p style="margin:0;font-size:12px;color:#9aa1ad;line-height:1.5;">
                  Generated automatically from the ${escapeHtml(BRAND_NAME)} website. Reply directly to this email to respond to the visitor.
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

// Contact-form notification.
function teamNotificationHtml(form) {
  const rows = [
    detailRow('Name', escapeHtml(form.name || '—')),
    detailRow('Email', emailCell(form.email)),
    detailRow('Phone', phoneCell(form.phone)),
    detailRow('Subject', escapeHtml(form.subject || '—')),
    detailRow('Message', escapeHtml(form.message || '—'), true),
  ].join('')
  return notificationShell({
    tag: 'New Contact Message', heading: 'You have a new contact enquiry',
    intro: 'A visitor submitted the contact form on the website. Details are below.',
    rows, replyTo: form.email, replyName: form.name, replySubject: form.subject || 'Your enquiry',
  })
}

// "Plan Your Trip" enquiry notification.
function enquiryNotificationHtml(form) {
  const rows = [
    detailRow('Name', escapeHtml(form.name || '—')),
    detailRow('Email', emailCell(form.email)),
    detailRow('Phone', phoneCell(form.phone)),
    detailRow('Destination', escapeHtml(form.destination || '—')),
    detailRow('Travellers', escapeHtml(form.travelers || '—'), !form.source),
    ...(form.source ? [detailRow('Source', escapeHtml(form.source), true)] : []),
  ].join('')
  return notificationShell({
    tag: 'New Trip Enquiry', heading: 'You have a new trip enquiry',
    intro: 'A visitor submitted the “Plan Your Trip” form on the website. Details are below.',
    rows, replyTo: form.email, replyName: form.name,
    replySubject: form.destination ? `Your ${form.destination} trip` : 'Your trip enquiry',
  })
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

/**
 * Send emails for a "Plan Your Trip" enquiry: a thank-you to the visitor (if an
 * email was provided) and a detailed notification to the team inbox.
 */
export async function sendEnquiryEmails(form) {
  const tx = getTransporter()
  if (!tx) return { sent: false, reason: 'smtp-not-configured' }

  try {
    const tasks = []

    if (form.email) {
      tasks.push(
        tx.sendMail({
          from: fromAddress(),
          to: form.email,
          subject: `Thank you for your enquiry — ${BRAND_NAME}!`,
          text: thankYouText(form.name),
          html: thankYouHtml(form.name),
        }),
      )
    }

    const teamInbox = MAIL_TO || SMTP_USER
    if (teamInbox) {
      tasks.push(
        tx.sendMail({
          from: fromAddress(),
          to: teamInbox,
          replyTo: form.email || undefined,
          subject: `New trip enquiry${form.destination ? `: ${form.destination}` : ''} — ${form.name || 'Website'}`,
          html: enquiryNotificationHtml(form),
        }),
      )
    }

    const info = await Promise.all(tasks)
    return { sent: true, info }
  } catch (error) {
    console.error('[mailer] Failed to send enquiry emails:', error.message)
    return { sent: false, reason: error.message }
  }
}
