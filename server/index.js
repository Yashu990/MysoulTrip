import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import {
  destinations,
  experiences,
  groupTours,
  blogs,
  review,
  instagram,
  homePayload,
} from './data.js'
import { sendContactEmails } from './mailer.js'

const app = express()
const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDistDir = path.resolve(__dirname, '../client/dist')
const clientIndexFile = path.join(clientDistDir, 'index.html')

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'mysoultrip-api' })
})

app.get('/api/destinations', (_req, res) => res.json(destinations))
app.get('/api/experiences', (_req, res) => res.json(experiences))
app.get('/api/group-tours', (_req, res) => res.json(groupTours))
app.get('/api/blogs', (_req, res) => res.json(blogs))
app.get('/api/review', (_req, res) => res.json(review))
app.get('/api/instagram', (_req, res) => res.json(instagram))
app.get('/api/home', (_req, res) => res.json(homePayload))

const enquiries = []
const messages = []
const bookings = []
const subscribers = []

app.post('/api/enquiry', (req, res) => {
  const entry = { ...req.body, at: new Date().toISOString() }
  enquiries.push(entry)
  console.log('New enquiry:', entry)
  res.json({ ok: true, message: 'Thanks! Our team will reach out within 24 hours.' })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: 'Please provide your name, email and message.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Please provide a valid email address.' })
  }

  const entry = { name, email, phone, subject, message, at: new Date().toISOString() }
  messages.push(entry)
  console.log('New contact message:', entry)

  const result = await sendContactEmails(entry)
  if (!result.sent) {
    console.warn('[contact] Email not sent:', result.reason)
  }

  res.json({ ok: true, message: `Thank you, ${name}! We've received your message and will reply within 24 hours.` })
})

app.post('/api/book', (req, res) => {
  const entry = { ...req.body, at: new Date().toISOString() }
  bookings.push(entry)
  console.log('New booking request:', entry)
  res.json({ ok: true, message: `Booking request received for ${req.body?.tour || 'your tour'}!` })
})

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body || {}
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Please provide a valid email.' })
  }

  subscribers.push({ email, at: new Date().toISOString() })
  console.log('New subscriber:', email)
  res.json({ ok: true, message: 'Subscribed! Best Himalayan journeys coming your way.' })
})

if (existsSync(clientIndexFile)) {
  app.use(express.static(clientDistDir))

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next()
    }

    res.sendFile(clientIndexFile)
  })
} else {
  app.get('/', (_req, res) => {
    res
      .status(200)
      .type('text/plain')
      .send('Frontend build not found. Run "npm run build" from the project root, then reload this page.')
  })
}

app.listen(PORT, () => {
  console.log(`MySoulTrip app running on http://localhost:${PORT}`)
})
