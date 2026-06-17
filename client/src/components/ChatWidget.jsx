import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { packages } from '../data/packages'
import { ArrowRight, ChevronDown } from './icons'
import BotIcon from './BotIcon'

const WHATSAPP = '918368479749'
const PHONE = '+91 8368479749'
const EMAIL = 'info@mysoultrip.in'

const MENU = [
  { label: '🏔️ View Packages', value: 'packages' },
  { label: '📅 Book a Trip', value: 'book' },
  { label: '💰 Prices', value: 'price' },
  { label: '💬 Talk to a Human', value: 'human' },
]

let uid = 0
const mk = (from, extra = {}) => ({ id: ++uid, from, ...extra })

const priceRange = () => {
  const ps = packages.map((p) => p.price)
  return [Math.min(...ps), Math.max(...ps)]
}

// ---- Knowledge / intent engine -------------------------------------------------
function answer(text) {
  const q = text.toLowerCase()
  const has = (...w) => w.some((x) => q.includes(x))

  if (has('hi', 'hello', 'namaste', 'hey', 'hii'))
    return [mk('bot', { text: '👋 Namaste! How can I help you plan your trip?', options: MENU })]

  if (has('price', 'cost', 'much', 'rate', 'budget', 'fee')) {
    const [lo, hi] = priceRange()
    return [mk('bot', {
      text: `Our all-inclusive trips range from ₹${lo.toLocaleString('en-IN')} to ₹${hi.toLocaleString('en-IN')} per person. Want to see the full list?`,
      options: [{ label: 'View Packages', value: 'packages' }, { label: 'Book a Trip', value: 'book' }],
    })]
  }

  if (has('includ', 'cover', 'meal', 'food', 'stay', 'accommod'))
    return [mk('bot', { text: '✅ Every package includes: hand-picked stays, daily breakfast & dinner, all ground transport in Uttarakhand, an expert local guide, and permits. Flights/trains to Kathgodam are not included.', options: MENU })]

  if (has('day', 'duration', 'night', 'how long', 'length'))
    return [mk('bot', { text: '🗓️ Trips run from 4 to 8 days. For example: Pandavkholi Trek (4D), Binsar Retreat (5D), Dunagiri Pilgrimage (7D), Munsiyari Expedition (8D).', options: [{ label: 'View Packages', value: 'packages' }] })]

  if (has('where', 'location', 'place', 'destination', 'kumaon', 'uttarakhand', 'area'))
    return [mk('bot', { text: '📍 All our journeys are in the Kumaon Himalayas, Uttarakhand — Dwarahat, Almora, Jageshwar, Binsar, Munsiyari and more.', options: [{ label: 'View Packages', value: 'packages' }] })]

  if (has('cancel', 'refund'))
    return [mk('bot', { text: '↩️ Free cancellation up to 15 days before departure for a full refund (minus payment-gateway fees). Within 15 days, partial refunds apply.', options: MENU })]

  if (has('contact', 'phone', 'call', 'email', 'number', 'reach'))
    return [mk('bot', { text: `📞 ${PHONE}\n✉️ ${EMAIL}\nYou can also chat with us on WhatsApp.`, options: [{ label: 'Open WhatsApp', value: 'whatsapp' }, { label: 'Book a Trip', value: 'book' }] })]

  if (has('spiritual', 'temple', 'babaji', 'jageshwar', 'pilgrim', 'dunagiri'))
    return [packagesMessage('Spiritual'), bookPrompt()]
  if (has('adventure', 'trek', 'munsiyari', 'pandavkholi', 'hike'))
    return [packagesMessage('Adventure'), bookPrompt()]
  if (has('nature', 'wildlife', 'binsar', 'forest', 'village'))
    return [packagesMessage('Nature'), bookPrompt()]

  if (has('package', 'tour', 'trip', 'travel', 'options', 'show'))
    return [packagesMessage()]

  if (has('book', 'reserve', 'enquir', 'join'))
    return null // handled by caller to start booking flow

  // Fallback
  return [mk('bot', {
    text: "I'm still learning! For anything specific, our team replies fast on WhatsApp — or I can take your booking right here.",
    options: [{ label: 'Talk to a Human', value: 'human' }, { label: 'Book a Trip', value: 'book' }],
  })]
}

function packagesMessage(category) {
  const list = category ? packages.filter((p) => p.category === category) : packages
  return mk('bot', {
    text: category ? `Here are our ${category.toLowerCase()} trips:` : 'Here are our most-loved trips:',
    cards: list.slice(0, 5).map((p) => ({ id: p.id, title: p.title, duration: p.duration, price: p.price })),
  })
}
const bookPrompt = () => mk('bot', { text: 'Ready to reserve a spot?', options: [{ label: 'Book a Trip', value: 'book' }] })

// ---- Component -----------------------------------------------------------------
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const [messages, setMessages] = useState([
    mk('bot', { text: "👋 Namaste! I'm Soul, your MySoulTrip assistant.\nHow can I help you plan your Himalayan escape?", options: MENU }),
  ])
  const [flow, setFlow] = useState({ step: 'idle', data: {} })
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  const pushBot = (msgs) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, ...(Array.isArray(msgs) ? msgs : [msgs])])
    }, 600)
  }

  const openChat = () => { setOpen(true); setSeen(true) }

  // ---- Booking flow ----
  const startBooking = (presetTrip) => {
    setFlow({ step: 'name', data: { trip: presetTrip || '' } })
    pushBot(mk('bot', { text: presetTrip ? `Great choice — ${presetTrip}! 🎉 First, what's your name?` : "Let's get you booked! 🎉 What's your name?" }))
  }

  const handleFlowInput = (value) => {
    const { step, data } = flow
    if (step === 'name') {
      setFlow({ step: 'email', data: { ...data, name: value } })
      pushBot(mk('bot', { text: `Nice to meet you, ${value.split(' ')[0]}! What's your email?` }))
    } else if (step === 'email') {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        pushBot(mk('bot', { text: 'Hmm, that doesn’t look like a valid email — mind trying again?' }))
        return
      }
      setFlow({ step: 'phone', data: { ...data, email: value } })
      pushBot(mk('bot', { text: 'And your phone / WhatsApp number?' }))
    } else if (step === 'phone') {
      const next = { ...data, phone: value }
      if (!next.trip) {
        setFlow({ step: 'trip', data: next })
        pushBot(mk('bot', { text: 'Which trip are you interested in?', cards: packages.slice(0, 5).map((p) => ({ id: p.id, title: p.title, duration: p.duration, price: p.price, pick: true })), options: [{ label: 'Not sure yet', value: 'pick:Custom / Not sure' }] }))
      } else {
        confirmBooking(next)
      }
    }
  }

  const confirmBooking = async (data) => {
    setFlow({ step: 'idle', data: {} })
    pushBot(mk('bot', { text: 'Submitting your request… ⏳' }))

    let ok = false
    try {
      const r = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, destination: data.trip, travelers: '1', source: 'Website chatbot' }),
      })
      ok = r.ok
    } catch {
      ok = false
    }

    if (ok) {
      pushBot(mk('bot', {
        text: `✅ All done, ${data.name.split(' ')[0]}! Your enquiry for "${data.trip}" is in — a confirmation is on its way to ${data.email}, and our team will reach out within 24 hours. Anything else?`,
        options: MENU,
      }))
    } else {
      pushBot(mk('bot', {
        text: `I’ve saved your details for "${data.trip}" but couldn’t reach our server just now. Please ping us on WhatsApp so we don’t miss you — or try again in a moment.`,
        options: [{ label: 'Open WhatsApp', value: 'whatsapp' }, { label: 'Try Again', value: `pick:${data.trip}` }],
      }))
      // keep the collected data so "Try Again" can resubmit
      setFlow({ step: 'idle', data })
    }
  }

  // ---- Action handling ----
  const handleValue = (value, label) => {
    setMessages((m) => [...m, mk('user', { text: label || value })])

    if (value === 'packages') return pushBot(packagesMessage())
    if (value === 'price') return pushBot(answer('price'))
    if (value === 'human') return pushBot(mk('bot', { text: `Our team is a tap away on WhatsApp (${PHONE}) and replies fast. Or leave a booking and we'll call you!`, options: [{ label: 'Open WhatsApp', value: 'whatsapp' }, { label: 'Book a Trip', value: 'book' }] }))
    if (value === 'whatsapp') { window.open(`https://wa.me/${WHATSAPP}`, '_blank'); return }
    if (value === 'book') return startBooking()
    if (value.startsWith('book:')) return startBooking(value.slice(5))
    if (value.startsWith('pick:')) {
      const trip = value.slice(5)
      return confirmBooking({ ...flow.data, trip })
    }
  }

  const handleSend = (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, mk('user', { text })])

    if (flow.step !== 'idle' && flow.step !== 'trip') return handleFlowInput(text)

    if (/\b(book|reserve|enquir)/i.test(text)) return startBooking()
    const res = answer(text)
    if (res) pushBot(res)
    else startBooking()
  }

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            onClick={openChat}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="fixed bottom-6 right-6 z-[65] flex items-center gap-2"
            aria-label="Open chat assistant"
          >
            <span className="hidden rounded-full bg-white px-3 py-2 text-sm font-bold text-navy-800 shadow-[0_8px_24px_rgba(15,31,61,0.18)] sm:block">
              Chat with us
            </span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
              className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 shadow-[0_12px_30px_rgba(15,31,61,0.45)] ring-2 ring-gold-500/30"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-500 opacity-15" />
              <BotIcon className="relative h-11 w-11" />
              {!seen && <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold-500 text-[11px] font-bold text-navy-900 ring-2 ring-white">1</span>}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-4 right-4 z-[65] flex h-[34rem] max-h-[82vh] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(10,23,48,0.45)] ring-1 ring-black/10"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-navy-800 to-navy-900 px-4 py-4 text-white">
              <span aria-hidden className="animate-float-slow absolute -right-6 -top-8 h-24 w-24 rounded-full bg-gold-500/20 blur-2xl" />
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                <BotIcon className="h-8 w-8" />
              </span>
              <div className="relative leading-tight">
                <p className="text-sm font-extrabold">Soul · MySoulTrip Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> Online · replies instantly
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="relative ml-auto grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/10" aria-label="Close chat">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-cream-50/60 px-3 py-4">
              {messages.map((m) => (
                <Message key={m.id} m={m} onAction={handleValue} />
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 w-fit">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="h-2 w-2 rounded-full bg-navy-800/40" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }} />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full bg-cream-50 px-4 py-2.5 text-sm text-navy-800 outline-none ring-1 ring-black/5 focus:ring-gold-500/40"
              />
              <button type="submit" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-900 transition hover:bg-gold-400" aria-label="Send">
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Message({ m, onAction }) {
  if (m.from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-navy-800 px-4 py-2.5 text-sm text-white shadow-sm">{m.text}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-start gap-2">
      {m.text && (
        <div className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-relaxed text-navy-800 shadow-sm ring-1 ring-black/5">{m.text}</div>
      )}

      {/* Package cards */}
      {m.cards && (
        <div className="flex w-full flex-col gap-2">
          {m.cards.map((c) => (
            <div key={c.id} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-extrabold leading-tight text-navy-800">{c.title}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-navy-800/60">{c.duration}</span>
                <span className="text-sm font-bold text-gold-700">₹{c.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <a href={`/packages/${c.id}`} className="flex-1 rounded-lg border border-navy-800/15 px-2 py-1.5 text-center text-xs font-bold text-navy-800 transition hover:bg-navy-50">View</a>
                <button onClick={() => onAction(c.pick ? `pick:${c.title}` : `book:${c.title}`, c.title)} className="flex-1 rounded-lg bg-gold-500 px-2 py-1.5 text-center text-xs font-bold text-navy-900 transition hover:bg-gold-400">
                  {c.pick ? 'Choose' : 'Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick-reply options */}
      {m.options && (
        <div className="flex flex-wrap gap-2">
          {m.options.map((o) => (
            <button
              key={o.value}
              onClick={() => onAction(o.value, o.label)}
              className="rounded-full border border-gold-500/60 bg-white px-3 py-1.5 text-xs font-bold text-navy-800 transition hover:bg-gold-500 hover:text-navy-900"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
