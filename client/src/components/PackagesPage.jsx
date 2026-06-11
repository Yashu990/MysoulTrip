import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Clock, Seat, MapPin, Star, Check, ShieldCheck, Users, Compass, ChevronDown, Calendar,
} from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'
import Img from './Img'
import { packages } from '../data/packages'

const categories = ['All', 'Spiritual', 'Nature', 'Adventure']

const included = [
  { icon: ShieldCheck, title: 'Safe & Insured', text: 'Vetted stays, first-aid trained guides' },
  { icon: Users, title: 'Small Groups', text: 'Intimate batches, never crowded' },
  { icon: Compass, title: 'Expert Local Guides', text: 'Born and raised in Uttarakhand' },
  { icon: Check, title: 'All-Inclusive', text: 'Stay, meals, transport & permits' },
]

const faqs = [
  { q: 'What is included in the package price?', a: 'Accommodation, daily meals, all ground transport within Uttarakhand, permits, and an expert local guide. Flights and personal expenses are not included.' },
  { q: 'Can packages be customised?', a: 'Absolutely. Every itinerary can be tailored to your dates, pace and interests. Use “Plan Custom Trip” and our team will craft it for you within 24 hours.' },
  { q: 'How fit do I need to be for treks?', a: 'Spiritual and nature packages are easy-to-moderate. Adventure treks need basic fitness — we share a prep guide after booking.' },
  { q: 'What is the cancellation policy?', a: 'Free cancellation up to 15 days before departure for a full refund (minus payment-gateway fees). Within 15 days, partial refunds apply.' },
]

function PriceTag({ price, oldPrice }) {
  return (
    <div className="flex items-end gap-2">
      <span className="font-display text-2xl font-bold text-navy-800">₹{price.toLocaleString('en-IN')}</span>
      {oldPrice && <span className="mb-0.5 text-sm text-navy-800/40 line-through">₹{oldPrice.toLocaleString('en-IN')}</span>}
      <span className="mb-0.5 text-xs font-semibold text-navy-800/55">/ person</span>
    </div>
  )
}

function PackageCard({ pkg, onPlan }) {
  const detailHref = `/packages/${pkg.id}`
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_16px_40px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_26px_56px_rgba(15,31,61,0.16)]"
    >
      <a href={detailHref} className="relative block h-52 overflow-hidden">
        <Img src={pkg.image} alt={pkg.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />

        {pkg.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-900 shadow">
            {pkg.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full glass-dark px-2.5 py-1 text-xs font-bold text-white">
          <Star className="h-3.5 w-3.5 text-gold-400" /> {pkg.rating}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-xs font-semibold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
          <MapPin className="h-3.5 w-3.5 text-gold-400" /> {pkg.location}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">{pkg.category}</span>
        <a href={detailHref} className="mt-1 text-[1.2rem] font-extrabold leading-tight text-navy-800 transition hover:text-gold-700">{pkg.title}</a>

        <div className="mt-3 flex items-center gap-4 text-xs text-navy-800/65">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold-500" />{pkg.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Seat className="h-4 w-4 text-gold-500" />{pkg.group}</span>
        </div>

        <ul className="mt-4 space-y-1.5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-navy-800/75">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" /> {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#efe6d3] pt-4">
          <PriceTag price={pkg.price} oldPrice={pkg.oldPrice} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={detailHref}
            className="group/btn flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-3 text-sm font-extrabold text-navy-900 shadow-[0_10px_24px_rgba(237,174,43,0.4)] transition hover:shadow-[0_14px_30px_rgba(237,174,43,0.55)]"
          >
            View Itinerary <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </a>
          <button
            onClick={onPlan}
            className="shrink-0 rounded-xl border-2 border-navy-800 px-4 py-2.5 text-sm font-extrabold text-navy-800 transition hover:bg-navy-800 hover:text-white"
            aria-label="Enquire about this package"
          >
            Enquire
          </button>
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-navy-800/70">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PackagesPage({ onPlan, onBook }) {
  const [filter, setFilter] = useState('All')
  const [openFaq, setOpenFaq] = useState(0)

  const visible = filter === 'All' ? packages : packages.filter((p) => p.category === filter)

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_48%,#ffffff_100%)]">
      {/* Hero */}
      <section className="relative">
        <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[24rem]">
          <Img src="/images/hero-kumaon-banner-v2-opt.jpg" alt="Himalayan travel packages" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/20" />
          <div aria-hidden className="animate-float-slow pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold-500/15 blur-[90px]" />

          <div className="section-shell relative flex min-h-[22rem] flex-col justify-center px-4 py-12 sm:min-h-[24rem] sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-white"
            >
              <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                <Compass className="h-3.5 w-3.5" /> Curated Himalayan Journeys
              </span>
              <h1 className="mt-4 font-display text-[3rem] font-bold leading-[0.95] sm:text-[4.4rem]">
                Travel <span className="text-gradient-gold">Packages</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                All-inclusive, small-group trips through Uttarakhand — handcrafted by locals,
                priced with no surprises.
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-white">
                {[['6+', 'Signature Trips'], ['4.9★', 'Avg. Rating'], ['100%', 'All-Inclusive']].map(([v, l]) => (
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

      {/* Filters */}
      <section className="section-shell px-4 pt-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  active ? 'text-navy-900' : 'text-navy-800/70 hover:text-navy-900'
                }`}
              >
                {active && (
                  <motion.span layoutId="pkgFilter" className="absolute inset-0 rounded-full bg-gold-500" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Package grid */}
      <section className="section-shell px-4 py-10 sm:px-6">
        <Stagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
          {visible.map((pkg) => (
            <StaggerItem key={pkg.id}>
              <PackageCard pkg={pkg} onBook={onBook} onPlan={onPlan} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* What's included */}
      <section className="border-y border-[#eee6d7] bg-cream-50 py-14">
        <div className="section-shell px-4 sm:px-6">
          <Reveal y={18} className="mb-8 text-center">
            <h2 className="font-display text-[1.9rem] font-bold text-navy-800 sm:text-[2.4rem]">Every Package Includes</h2>
            <span className="mx-auto mt-3 block h-0.5 w-14 rounded bg-gold-500" />
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} amount={0.2}>
            {included.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col items-center rounded-2xl bg-white px-5 py-6 text-center shadow-[0_12px_32px_rgba(15,31,61,0.06)] ring-1 ring-black/5">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-500/12 text-gold-600 ring-2 ring-gold-500/25">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-navy-800">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy-800/65">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-shell px-4 py-14 sm:px-6">
        <Reveal y={18} className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Good to Know</p>
          <h2 className="mt-2 font-display text-[1.9rem] font-bold text-navy-800 sm:text-[2.4rem]">Frequently Asked</h2>
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
            <Calendar className="mx-auto h-9 w-9 text-gold-400" />
            <h2 className="mt-4 font-display text-[1.8rem] font-bold sm:text-[2.4rem]">Don't see your perfect trip?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/75 sm:text-base">
              Tell us your dates, pace and interests — we'll craft a custom Uttarakhand package just for you within 24 hours.
            </p>
            <button
              onClick={onPlan}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-sm font-extrabold text-navy-900 shadow-[0_12px_30px_rgba(237,174,43,0.4)] transition hover:bg-gold-400"
            >
              Plan a Custom Trip <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
