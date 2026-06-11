import { getPackageById } from '../data/packages'
import {
  ArrowRight, ChevronLeft, Clock, Seat, MapPin, Star, Check, Calendar, ShieldCheck, Compass, Whatsapp,
} from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'
import Img from './Img'
import Roadmap from './Roadmap'

const WHATSAPP_NUMBER = '918368479749'

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-500/12 text-gold-600">
        <Icon className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-navy-800/55">{label}</span>
        <span className="block text-sm font-extrabold text-navy-800">{value}</span>
      </span>
    </div>
  )
}

export default function PackageDetail({ id, onPlan, onBook }) {
  const pkg = getPackageById(id)

  // Unknown id — graceful fallback back to the listing.
  if (!pkg) {
    return (
      <main className="section-shell px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-navy-800">Package not found</h1>
        <p className="mt-3 text-navy-800/70">The trip you’re looking for doesn’t exist or was moved.</p>
        <a href="/packages" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900">
          <ChevronLeft className="h-4 w-4" /> Back to Packages
        </a>
      </main>
    )
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi MySoulTrip! I'm interested in the "${pkg.title}" package (${pkg.duration}). Please share details.`)}`

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_48%,#ffffff_100%)]">
      {/* Hero */}
      <section className="relative">
        <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[28rem]">
          <Img src={pkg.image} alt={pkg.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/55 to-navy-900/25" />

          <div className="section-shell relative flex min-h-[24rem] flex-col justify-end px-4 py-10 sm:min-h-[28rem] sm:px-6">
            <a href="/packages" className="mb-auto inline-flex w-fit items-center gap-1.5 rounded-full glass-dark px-4 py-2 text-xs font-bold text-white transition hover:text-gold-300">
              <ChevronLeft className="h-4 w-4" /> All Packages
            </a>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-white"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-900">{pkg.category}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star className="h-4 w-4 text-gold-400" /> {pkg.rating} <span className="text-white/60">({pkg.reviews} reviews)</span>
                </span>
              </div>
              <h1 className="mt-3 max-w-3xl font-display text-[2.6rem] font-bold leading-[0.95] sm:text-[4rem]">{pkg.title}</h1>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/85">
                <MapPin className="h-4 w-4 text-gold-400" /> {pkg.location} · {pkg.duration}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="section-shell px-4 pt-8 sm:px-6">
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4" stagger={0.08} amount={0.2}>
          <StaggerItem><Fact icon={Clock} label="Duration" value={pkg.duration} /></StaggerItem>
          <StaggerItem><Fact icon={Seat} label="Group Size" value={pkg.group} /></StaggerItem>
          <StaggerItem><Fact icon={Compass} label="Difficulty" value={pkg.difficulty} /></StaggerItem>
          <StaggerItem><Fact icon={Calendar} label="Best Season" value={pkg.bestSeason} /></StaggerItem>
        </Stagger>
      </section>

      <section className="section-shell grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem] lg:items-start">
        {/* Main column */}
        <div>
          {/* Overview */}
          <Reveal y={18}>
            <h2 className="font-display text-[1.8rem] font-bold text-navy-800 sm:text-[2.2rem]">Trip Overview</h2>
            <span className="mt-2 block h-0.5 w-14 rounded bg-gold-500" />
            <p className="mt-4 text-base leading-relaxed text-navy-800/75">{pkg.overview}</p>
          </Reveal>

          {/* Highlights */}
          <Reveal y={18} className="mt-8">
            <h3 className="text-lg font-extrabold text-navy-800">Trip Highlights</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {pkg.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1.5 text-sm font-semibold text-navy-800 ring-1 ring-gold-500/20">
                  <Check className="h-4 w-4 text-gold-600" /> {h}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Roadmap / day-by-day itinerary */}
          <div className="mt-10">
            <Reveal y={18}>
              <h2 className="font-display text-[1.8rem] font-bold text-navy-800 sm:text-[2.2rem]">Day-by-Day Roadmap</h2>
              <span className="mt-2 block h-0.5 w-14 rounded bg-gold-500" />
              <p className="mt-3 text-sm text-navy-800/65">Your full {pkg.days}-day journey, day by day.</p>
            </Reveal>

            <Roadmap itinerary={pkg.itinerary} gallery={pkg.gallery} fallbackImage={pkg.image} />
          </div>

          {/* Inclusions / Exclusions */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Reveal y={18} className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,31,61,0.06)] ring-1 ring-black/5">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-navy-800">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-green-700"><Check className="h-4 w-4" /></span>
                What's Included
              </h3>
              <ul className="mt-4 space-y-2.5">
                {pkg.includes.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-navy-800/78">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {x}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal y={18} delay={0.1} className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(15,31,61,0.06)] ring-1 ring-black/5">
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-navy-800">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-red-100 text-red-600 text-base font-bold leading-none">×</span>
                Not Included
              </h3>
              <ul className="mt-4 space-y-2.5">
                {pkg.excludes.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm text-navy-800/70">
                    <span className="mt-0.5 text-red-400">×</span> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Gallery */}
          {pkg.gallery?.length > 1 && (
            <div className="mt-10">
              <Reveal y={18}>
                <h3 className="text-lg font-extrabold text-navy-800">Glimpses</h3>
              </Reveal>
              <Stagger className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4" stagger={0.07} amount={0.1}>
                {pkg.gallery.map((src, i) => (
                  <StaggerItem key={`${src}-${i}`}>
                    <motion.div whileHover={{ scale: 1.03 }} className="overflow-hidden rounded-xl ring-1 ring-black/5">
                      <Img src={src} alt={`${pkg.title} ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover" />
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-[1.4rem] bg-white p-6 shadow-[0_16px_44px_rgba(15,31,61,0.12)] ring-1 ring-black/5">
            <div className="flex items-end gap-2">
              <span className="font-display text-3xl font-bold text-navy-800">₹{pkg.price.toLocaleString('en-IN')}</span>
              {pkg.oldPrice && <span className="mb-1 text-sm text-navy-800/40 line-through">₹{pkg.oldPrice.toLocaleString('en-IN')}</span>}
            </div>
            <p className="mt-0.5 text-xs font-semibold text-navy-800/55">per person · all-inclusive</p>

            <button
              onClick={() => onBook?.({ title: pkg.title, price: pkg.price })}
              className="mt-5 w-full rounded-xl bg-gold-500 px-5 py-3.5 text-sm font-extrabold text-navy-900 shadow-[0_12px_30px_rgba(237,174,43,0.4)] transition hover:bg-gold-400"
            >
              Book This Trip
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-105"
            >
              <Whatsapp className="h-4 w-4" /> Ask on WhatsApp
            </a>
            <button
              onClick={onPlan}
              className="mt-3 w-full rounded-xl border border-navy-800/15 px-5 py-3 text-sm font-extrabold text-navy-800 transition hover:bg-navy-50"
            >
              Customise This Trip
            </button>

            <div className="mt-5 space-y-2 border-t border-[#efe6d3] pt-4 text-xs text-navy-800/65">
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold-600" /> Free cancellation up to 15 days prior</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4 text-gold-600" /> Reply within 24 hours</p>
            </div>
          </div>
        </aside>
      </section>

      {/* Bottom CTA */}
      <section className="section-shell px-4 pb-16 sm:px-6">
        <Reveal y={20}>
          <div className="flex flex-col items-center justify-between gap-5 rounded-[1.6rem] bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-8 text-center text-white sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-[1.6rem] font-bold sm:text-[2rem]">Ready for {pkg.title.split(' ')[0]}?</h2>
              <p className="mt-1 text-sm text-white/75">Secure your spot or ask us anything — we reply within 24 hours.</p>
            </div>
            <button
              onClick={() => onBook?.({ title: pkg.title, price: pkg.price })}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 text-sm font-extrabold text-navy-900 transition hover:bg-gold-400"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
