// One-off verification: actually SENDS the contact emails through Nodemailer's
// Ethereal test SMTP (no real credentials needed) and prints preview URLs so you
// can SEE the rendered "Thank you" email. Run:  node verify-mail.js
import nodemailer from 'nodemailer'

// Create a throwaway Ethereal inbox and feed its creds into the mailer via env.
const test = await nodemailer.createTestAccount()
process.env.SMTP_HOST = 'smtp.ethereal.email'
process.env.SMTP_PORT = '587'
process.env.SMTP_SECURE = 'false'
process.env.SMTP_USER = test.user
process.env.SMTP_PASS = test.pass
process.env.MAIL_TO = 'team-inbox@example.com'
process.env.BRAND_NAME = process.env.BRAND_NAME || 'MySoulTrip'

// Import AFTER env is set so the transporter picks up the Ethereal config.
const { sendContactEmails } = await import('./mailer.js')

const result = await sendContactEmails({
  name: 'Visitor Test',
  email: 'visitor@example.com',
  phone: '+91 8368479749',
  subject: 'Trip enquiry',
  message: 'Hi, I would like to plan a Himalayan trip in October.',
})

console.log('\nsendContactEmails ->', result.sent ? 'SENT ✅' : `FAILED ❌ (${result.reason})`)
for (const info of result.info || []) {
  console.log('  • Preview:', nodemailer.getTestMessageUrl(info))
}
