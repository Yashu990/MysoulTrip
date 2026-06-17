import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Clock, Seat, Users, Compass, ShieldCheck, MapPin, Star, Check, Calendar,
  Heart, Sparkle, ChevronDown, Headset,
} from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'
import Img from './Img'
import Testimonials from './Testimonials'
import { fallbackData } from '../data/fallback'

// Fixed departures — each links to an existing package itinerary for the roadmap.
const departures = [
  { id: 'dunagiri-babaji', title: 'Dunagiri & Babaji Cave Pilgrimage', category: 'Spiritual', image: '/images/IMG_9846.jpg', day: '25', month: 'MAY', duration: '7D / 6N', total: 12, left: 4, price: 16999, oldPrice: 19999 },
  { id: 'dwarahat-jageshwar', title: 'Dwarahat & Jageshwar Spiritual Trail', category: 'Spiritual', image: '/images/IMG_9170.jpg', day: '08', month: 'JUN', duration: '6D / 5N', total: 10, left: 6, price: 14499 },
  { id: 'binsar-wildlife', title: 'Binsar Nature & Wildlife Retreat', category: 'Nature', image: '/images/IMG_9820.jpg', day: '22', month: 'JUN', duration: '5D / 4N', total: 8, left: 3, price: 13999 },
  { id: 'pandavkholi-trek', title: 'Pandavkholi Trek Adventure', category: 'Adventure', image: '/images/IMG_9808.jpg', day: '06', month: 'JUL', duration: '4D / 4N', total: 14, left: 9, price: 9999 },
  { id: 'kumaon-village', title: 'Kumaon Village Experience', category: 'Nature', image: '/images/IMG_9817.jpg', day: '20', month: 'JUL', duration: '5D / 4N', total: 10, left: 7, price: 11499 },
  { id: 'munsiyari-expedition', title: 'Munsiyari Himalayan Expedition', category: 'Adventure', image: '/images/IMG_9810.jpg', day: '10', month: 'AUG', duration: '8D / 7N', total: 12, left: 5, price: 21999, oldPrice: 24999 },
]

const categories = ['All', 'Spiritual', 'Nature', 'Adventure']

const whyGroup = [
  { icon: Users, title: 'Small Groups', text: '8–14 travellers max, never a crowd' },
  { icon: Heart, title: 'Make Friends', text: 'Travel solo, leave with a tribe' },
  { icon: Compass, title: 'Expert Local Guides', text: 'Born & raised in Uttarakhand' },
  { icon: ShieldCheck, title: 'Safe & Secure', text: 'Vetted stays, first-aid trained leads' },
  { icon: Sparkle, title: 'Zero Hassle', text: 'Stay, food, transport — all handled' },
  { icon: Calendar, title: 'Fixed Departures', text: 'Just pick a date and pack' },
]

const steps = [
  { n: 1, title: 'Pick a Departure', text: 'Choose the date and trip that calls to you.' },
  { n: 2, title: 'Reserve Your Seat', text: 'Book online — seats are limited per batch.' },
  { n: 3, title: 'We Handle Everything', text: 'Stays, meals, transport, permits & guide.' },
  { n: 4, title: 'Travel & Belong', text: 'Show up, explore, and make lifelong friends.' },
]

const included = [
  'Hand-picked stays & homestays',
  'Daily breakfast & dinner',
  'All ground transport in Uttarakhand',
  'Expert local trip leader',
  'Permits, entries & activities',
  '24×7 on-trip support',
]

const faqs = [
  { q: 'Who joins these group tours?', a: 'A friendly mix of solo travellers, couples and friends — mostly 22–45. Solo travellers are very welcome; many come alone and leave with a close-knit group.' },
  { q: 'How big are the groups?', a: 'Intentionally small: 8–14 travellers per departure, so it stays personal and you actually see the offbeat places.' },
  { q: 'What if a departure is almost full?', a: 'Seats are first-come. If a batch is nearly full, reserve early — we cap each group and never overbook. We can also open a new date for 6+ people.' },
  { q: 'Can I get a private group departure?', a: 'Yes! For families, friends or corporate groups we run private departures on your own dates. Use “Plan a Private Group” below.' },
]

function SeatBar({ total, left }) {
  const bookedPct = Math.round(((total - left) / total) * 100)
  const low = left <= 4
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className={low ? 'text-red-600' : 'text-navy-800/70'}>
          {low ? `Only ${left} seats left!` : `${left} of ${total} seats left`}
        </span>
        <span className="text-navy-800/45">{bookedPct}% booked</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-navy-900/10">
        <div
          className={`h-full rounded-full ${low ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-gold-400 to-gold-600'}`}
          style={{ width: `${bookedPct}%` }}
        />
      </div>
    </div>
  )
}

function DepartureCard({ d, onBook }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_16px_40px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_26px_56px_rgba(15,31,61,0.16)]"
    >
      <a href={`/packages/${d.id}`} className="relative block h-48 overflow-hidden">
        <Img src={d.image} alt={d.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        {/* Date ribbon */}
        <div className="absolute left-3 top-3 rounded-xl bg-navy-900/90 px-3 py-1.5 text-center leading-none text-gold-400 shadow-lg backdrop-blur-sm">
          <span className="block text-xl font-extrabold">{d.day}</span>
          <span className="block text-[10px] font-bold tracking-widest">{d.month}</span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy-800 shadow-sm backdrop-blur-sm">{d.category}</span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.12rem] font-extrabold leading-tight text-navy-800 line-clamp-2">{d.title}</h3>
        <div className="mt-2 flex items-center gap-4 text-xs text-navy-800/65">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold-500" />{d.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-gold-500" />{d.total} max</span>
        </div>

        <div className="mt-4"><SeatBar total={d.total} left={d.left} /></div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t border-[#dceff6] pt-4">
          <div className="flex items-end gap-2">
            <span className="font-display text-2xl font-bold text-navy-800">₹{d.price.toLocaleString('en-IN')}</span>
            {d.oldPrice && <span className="mb-0.5 text-xs text-navy-800/40 line-through">₹{d.oldPrice.toLocaleString('en-IN')}</span>}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a href={`/packages/${d.id}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-navy-800 px-3 py-2.5 text-sm font-extrabold text-navy-800 transition hover:bg-navy-800 hover:text-white">
            Itinerary
          </a>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onBook?.({ title: d.title, price: d.price })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-3 py-2.5 text-sm font-extrabold text-navy-900 shadow-[0_10px_24px_rgba(237,174,43,0.4)]"
          >
            Reserve Seat
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-extrabold text-navy-800 sm:text-base">{item.q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <p className="px-5 pb-5 text-sm leading-relaxed text-navy-800/70">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GroupToursPage({ onPlan, onBook }) {
  const [filter, setFilter] = useState('All')
  const [openFaq, setOpenFaq] = useState(0)
  const visible = filter === 'All' ? departures : departures.filter((d) => d.category === filter)

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fcff_48%,#ffffff_100%)]">
      {/* Hero */}
      <section className="relative">
        <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[27rem]">
          <Img src="/images/IMG_9820.jpg" alt="Group trekking in the Himalayas" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/92 via-navy-900/65 to-navy-900/25" />
          <div aria-hidden className="animate-float-slow pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold-500/15 blur-[90px]" />

          <div className="section-shell relative flex min-h-[24rem] flex-col justify-center px-4 py-12 sm:min-h-[27rem] sm:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                <Users className="h-3.5 w-3.5" /> Travel Together
              </span>
              <h1 className="mt-4 font-display text-[3rem] font-bold leading-[0.95] sm:text-[4.4rem]">
                Group <span className="text-gradient-gold">Tours</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Join a small, like-minded crew on fixed-date Himalayan journeys. Come solo, leave with friends —
                we handle every detail.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                {[['8–14', 'Per Group'], ['4.9★', 'Avg. Rating'], ['500+', 'Travellers']].map(([v, l]) => (
                  <div key={l} className="leading-none">
                    <div className="font-display text-2xl font-bold text-gold-300 sm:text-3xl">{v}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/65">{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why group tours */}
      <section className="section-shell px-4 pt-14 sm:px-6">
        <Reveal y={18} className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Why Travel in a Group</p>
          <h2 className="mt-2 font-display text-[2rem] font-bold text-navy-800 sm:text-[2.5rem]">Better Together</h2>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.08} amount={0.2}>
          {whyGroup.map((w) => (
            <StaggerItem key={w.title}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white px-3 py-5 text-center shadow-[0_12px_30px_rgba(15,31,61,0.06)] ring-1 ring-black/5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500/12 text-gold-600 ring-2 ring-gold-500/25">
                  <w.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-3 text-sm font-extrabold text-navy-800">{w.title}</h3>
                <p className="mt-1 text-[11px] leading-snug text-navy-800/60">{w.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Filters + departures */}
      <section className="section-shell px-4 pt-12 sm:px-6">
        <Reveal y={16} className="mb-6 text-center">
          <h2 className="font-display text-[2rem] font-bold text-navy-800 sm:text-[2.5rem]">Upcoming Departures</h2>
          <p className="mt-2 text-sm text-navy-800/60">Fixed dates · limited seats · all-inclusive</p>
        </Reveal>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => {
            const active = filter === c
            return (
              <button key={c} onClick={() => setFilter(c)} className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition ${active ? 'text-navy-900' : 'text-navy-800/70 hover:text-navy-900'}`}>
                {active && <motion.span layoutId="gtFilter" className="absolute inset-0 rounded-full bg-gold-500" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative">{c}</span>
              </button>
            )
          })}
        </div>
        <Stagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
          {visible.map((d) => (
            <StaggerItem key={d.id}><DepartureCard d={d} onBook={onBook} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How it works */}
      <section className="border-y border-[#dceff6] bg-cream-50 py-14 mt-14">
        <div className="section-shell px-4 sm:px-6">
          <Reveal y={18} className="mb-10 text-center">
            <h2 className="font-display text-[2rem] font-bold text-navy-800 sm:text-[2.5rem]">How It Works</h2>
            <span className="mx-auto mt-3 block h-0.5 w-14 rounded bg-gold-500" />
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} amount={0.2}>
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative flex h-full flex-col items-center rounded-2xl bg-white px-5 py-7 text-center shadow-[0_12px_30px_rgba(15,31,61,0.06)] ring-1 ring-black/5">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 font-display text-2xl font-bold text-gold-300 shadow-md">{s.n}</span>
                  <h3 className="mt-4 text-base font-extrabold text-navy-800">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-800/65">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Included */}
          <Reveal y={18} className="mt-10 rounded-[1.6rem] bg-white p-6 shadow-[0_12px_32px_rgba(15,31,61,0.06)] ring-1 ring-black/5 sm:p-8">
            <h3 className="text-center text-lg font-extrabold text-navy-800">Every Departure Includes</h3>
            <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((x) => (
                <span key={x} className="flex items-center gap-2 text-sm text-navy-800/78">
                  <Check className="h-4 w-4 shrink-0 text-green-600" /> {x}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social proof */}
      <Testimonials reviews={fallbackData.reviews} />

      {/* FAQ */}
      <section className="section-shell px-4 py-14 sm:px-6">
        <Reveal y={18} className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Good to Know</p>
          <h2 className="mt-2 font-display text-[1.9rem] font-bold text-navy-800 sm:text-[2.4rem]">Group Tour FAQs</h2>
        </Reveal>
        <div className="mx-auto grid max-w-3xl gap-3">
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell px-4 pb-16 sm:px-6">
        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-10 text-center text-white sm:px-12">
            <div aria-hidden className="animate-spin-slow absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[conic-gradient(from_0deg,rgba(237,174,43,0.35),transparent_55%)] blur-md" />
            <Headset className="mx-auto h-9 w-9 text-gold-400" />
            <h2 className="mt-4 font-display text-[1.8rem] font-bold sm:text-[2.4rem]">Travelling as a group of 6+?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/75 sm:text-base">
              Get a private departure on your own dates — perfect for families, friends or company offsites.
            </p>
            <button onClick={onPlan} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-sm font-extrabold text-navy-900 shadow-[0_12px_30px_rgba(237,174,43,0.4)] transition hover:bg-gold-400">
              Plan a Private Group <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
