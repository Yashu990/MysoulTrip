import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Play,
  Search,
  Sliders,
  Sparkle,
  Star,
  Users,
  Whatsapp,
  Youtube,
} from './icons'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destination', href: '/destinations' },
  { label: 'About Us', href: '#about' },
  { label: 'Tour', href: '#popular' },
  { label: 'Testimonial', href: '#testimonials' },
  { label: 'Blog', href: '/blog' },
]

const offerCards = [
  { discount: '15%', title: 'Monsoon stay deal for soulful mountain mornings', image: '/images/generated/offer-waterfall.png' },
  { discount: '25%', title: 'Weekend retreat offer across hidden Himalayan villages', image: '/images/generated/offer-lagoon.png' },
  { discount: '35%', title: 'Private group booking offer for family getaways', image: '/images/generated/offer-lakeside.png' },
]

const categoryImages = [
  '/images/generated/category-adventure-uttarakhand-trek.png',
  '/images/generated/category-cultural-uttarakhand.png',
  '/images/generated/category-uttarakhand-food.png',
  '/images/generated/category-luxury.png',
  '/images/generated/category-wildlife.png',
]

const blogCardImages = [
  '/images/generated/about-cliff.png',
  '/images/generated/offer-waterfall.png',
  '/images/generated/offer-lakeside.png',
]

function ScriptHeading({ children }) {
  return <p className="font-script text-[30px] leading-none text-[#29b9df]">{children}</p>
}

function SectionTitle({ kicker, title, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <ScriptHeading>{kicker}</ScriptHeading>
      <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#061836] sm:text-5xl">{title}</h2>
    </div>
  )
}

function SearchField({ icon: Icon, label, value }) {
  return (
    <button className="flex h-16 min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 text-left text-[#0d1d3a] shadow-[0_10px_24px_rgba(13,29,58,0.06)]">
      <Icon className="h-5 w-5 text-[#23b7df]" />
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
        <div className="truncate text-sm font-bold">{value}</div>
      </div>
    </button>
  )
}

function PromoPill({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/78 px-4 py-2 text-sm font-bold text-[#0b1e3e] shadow-[0_14px_30px_rgba(6,24,54,0.08)] backdrop-blur">
      <Sparkle className="h-4 w-4 text-[#23b7df]" />
      {children}
    </div>
  )
}

function CameraDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="none" aria-hidden="true">
      <g transform="rotate(-8 40 32)">
        <rect x="14" y="18" width="44" height="30" rx="8" fill="#67db69" stroke="#3a3a3a" strokeWidth="2.6" />
        <path d="M22 20l5-7h10l3 7" fill="#7f8c8d" stroke="#3a3a3a" strokeWidth="2.6" strokeLinejoin="round" />
        <circle cx="38" cy="33" r="10" fill="#9fe8ff" stroke="#3a3a3a" strokeWidth="2.6" />
        <circle cx="38" cy="33" r="5.5" fill="#4d6670" />
        <circle cx="50" cy="23" r="2" fill="#f4d35e" />
      </g>
    </svg>
  )
}

function TicketDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 88 68" className={className} fill="none" aria-hidden="true">
      <g transform="rotate(-12 44 34)">
        <path d="M25 14h37l8 9v16H25a6 6 0 0 0 0-12V14z" fill="#ffd46b" stroke="#7d5a1b" strokeWidth="2.3" />
        <path d="M18 26h39l7 9v16H18a6 6 0 0 0 0-12V26z" fill="#f8c54f" stroke="#7d5a1b" strokeWidth="2.3" />
        <path d="M28 23h12M24 35h15M50 31l7 7M50 38l7-7" stroke="#7d5a1b" strokeWidth="2.3" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function PalmOutline({ className = '' }) {
  return (
    <svg viewBox="0 0 90 100" className={className} fill="none" aria-hidden="true">
      <path d="M18 92c7-22 19-36 35-43" stroke="#d9edf4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 48c-2-16 4-28 17-37M40 48c-11-10-22-13-34-11M40 48c-14-2-25 3-35 15M40 48c9-13 21-17 36-15" stroke="#d9edf4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M23 92c5-12 10-24 17-36" stroke="#d9edf4" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function SuitcaseOutline({ className = '' }) {
  return (
    <svg viewBox="0 0 72 92" className={className} fill="none" aria-hidden="true">
      <path d="M26 19v-6c0-5 4-9 10-9s10 4 10 9v6" stroke="#d9edf4" strokeWidth="2.4" />
      <rect x="18" y="18" width="36" height="56" rx="9" stroke="#d9edf4" strokeWidth="2.4" />
      <path d="M24 32h24M28 74l-4 10M48 74l4 10" stroke="#d9edf4" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function ExperienceBadgeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 56 56" className={className} fill="none" aria-hidden="true">
      <circle cx="28" cy="30" r="10" stroke="currentColor" strokeWidth="2.8" />
      <path d="M28 24v12M22 30h12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path
        d="M28 9l2.7 4.7 5.3-.2-2.6 4.7 4.4 2.9-5 1.8.7 5.2-4.8-2.1-4.8 2.1.7-5.2-5-1.8 4.4-2.9-2.6-4.7 5.3.2L28 9z"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AwardBadgeIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 56 56" className={className} fill="none" aria-hidden="true">
      <circle cx="28" cy="23" r="9" stroke="currentColor" strokeWidth="2.4" />
      <path d="M28 18v10M23 23h10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22 32l-4 12 10-5 10 5-4-12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M28 8l2.3 4 4.6-.1-2.2 4 3.8 2.5-4.3 1.5.6 4.4-4-1.8-4 1.8.6-4.4-4.3-1.5 3.8-2.5-2.2-4 4.6.1L28 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function PlaneTrailDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 140 54" className={className} fill="none" aria-hidden="true">
      <path d="M3 34c17-18 44-18 61 0s44 18 61 0" stroke="#28b7df" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M111 17l18 9-18 9 4-9-4-9z" fill="#28b7df" />
    </svg>
  )
}

function HomeNav({ onEnquire }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex w-[min(100%-32px,1280px)] items-center justify-between gap-4 py-6 lg:gap-8">
        <Logo />
        <nav className="hidden items-center gap-10 text-[17px] font-medium text-[#0a1730] lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-[#23b7df]">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onEnquire}
            className="rounded-2xl border border-[#16294f]/30 px-5 py-3 text-sm font-bold text-[#071a38] transition hover:border-[#23b7df] hover:text-[#23b7df] sm:px-7 sm:py-4"
          >
            Book Now
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-12 w-12 place-items-center rounded-xl border border-[#16294f]/20 text-[#071a38] transition hover:border-[#23b7df] hover:text-[#23b7df] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto w-[min(100%-32px,1280px)] lg:hidden">
          <nav className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white/95 p-3 text-[16px] font-semibold text-[#0a1730] shadow-[0_18px_40px_rgba(6,24,54,0.12)] backdrop-blur">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 transition hover:bg-[#e9f6fb] hover:text-[#23b7df]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function HeroSection({ onEnquire }) {
  return (
    <section className="relative overflow-hidden bg-[#f4f7fb]">
      <HomeNav onEnquire={onEnquire} />
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-[72%_center] brightness-[0.98] contrast-[1.16] saturate-[1.08]"
        style={{ backgroundImage: "url('/images/generated/hero-figma-travel.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.58)_28%,rgba(255,255,255,0.12)_54%,rgba(255,255,255,0.00)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.28),transparent_26%)]" />

      <div className="relative mx-auto flex min-h-[600px] w-[min(100%-32px,1280px)] items-end pb-16 pt-32 sm:min-h-[760px] sm:pt-36 lg:min-h-[860px]">
        <div className="w-full">
          <div className="max-w-3xl">
            <PromoPill>Offbeat Himalayan journeys curated for seekers and explorers</PromoPill>
            <h1 className="mt-8 max-w-[12ch] text-[3.35rem] font-extrabold leading-[1.02] tracking-tight text-[#071734] sm:text-[4.2rem] lg:text-[5.2rem]">
              Explore the Hidden Soul, One Trip at a Time
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[#31425e] sm:text-[1.18rem]">
              Discover handcrafted journeys through Uttarakhand&apos;s spiritual trails, village stays,
              forest retreats, and mountain stories with MySoulTrip.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onEnquire}
                className="rounded-2xl bg-[#23b7df] px-8 py-5 text-base font-extrabold text-white shadow-[0_18px_35px_rgba(35,183,223,0.32)] transition hover:bg-[#17acd6]"
              >
                Start Your Journey
              </button>
              <a
                href="#popular"
                className="inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 text-base font-bold text-[#071734] shadow-[0_18px_40px_rgba(6,24,54,0.10)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#23b7df] text-white">
                  <Play className="ml-0.5 h-4 w-4" />
                </span>
                View Tours
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

function CategoriesSection({ destinations }) {
  const cards = destinations.slice(0, 5).map((item, index) => ({
    ...item,
    image: categoryImages[index] || item.image,
    title: ['Adventure Tours', 'Cultural Tours', 'Local Cuisine', 'Luxury Escapes', 'Wildlife Expeditions'][index] || item.name,
  }))

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
      <PalmOutline className="pointer-events-none absolute -bottom-2 left-0 hidden h-28 w-24 xl:block" />
      <SuitcaseOutline className="pointer-events-none absolute bottom-6 right-6 hidden h-20 w-16 xl:block" />
      <CameraDoodle className="pointer-events-none absolute left-[29%] top-16 hidden h-12 w-14 xl:block" />
      <TicketDoodle className="pointer-events-none absolute right-[28%] top-12 hidden h-12 w-14 xl:block" />

      <div className="mx-auto max-w-[1380px]">
        <div className="text-center">
          <p className="font-script text-[28px] leading-none text-[#29b9df]">Wonderful place for You</p>
          <h2 className="mt-3 text-[34px] font-extrabold tracking-tight text-[#071734] sm:text-[38px]">
            Tour Categories
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1180px] grid-cols-2 items-end gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-7">
          {cards.map((item, index) => {
            const offsets = [
              'lg:-translate-y-10',
              'lg:-translate-y-1',
              'lg:translate-y-8',
              'lg:translate-y-8',
              'lg:-translate-y-10',
            ]

            return (
              <article
                key={item.id}
                className={`mx-auto w-full max-w-[180px] text-center transition-transform ${offsets[index] || ''}`}
              >
                <div className="overflow-hidden rounded-[20px] shadow-[0_12px_28px_rgba(6,24,54,0.12)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[0.9] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-extrabold leading-tight text-[#111827] sm:text-[16px]">
                  {item.title}
                </h3>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PopularToursSection({ tours, onBook }) {
  const cards = tours.slice(0, 3).map((tour, index) => ({
    ...tour,
    description:
      tour.description ||
      tour.desc ||
      `Explore ${tour.title} with a curated itinerary, guided support, and thoughtfully planned local experiences.`,
    duration: tour.duration.replaceAll('/', ','),
    rating: '4.8',
    priceLabel: `Rs.${tour.price.toLocaleString('en-IN')}`,
  }))

  return (
    <section id="popular" className="relative overflow-hidden bg-[#e9f6fb] px-4 py-20 sm:px-6">
      {/* faint travel doodles scattered across the whole section */}
      <div className="pointer-events-none absolute inset-0 select-none text-[#cbe7f2]">
        <span className="absolute left-[3%] top-[14%] hidden text-[34px] sm:block">🧳</span>
        <span className="absolute left-[8%] top-[42%] hidden text-[30px] sm:block">🌐</span>
        <span className="absolute left-[5%] top-[68%] hidden text-[32px] sm:block">🎈</span>
        <span className="absolute left-[16%] top-[8%] hidden text-[26px] md:block">✈</span>
        <span className="absolute left-[22%] top-[60%] hidden text-[28px] md:block">📷</span>
        <span className="absolute left-[34%] top-[10%] hidden text-[24px] lg:block">☂</span>
        <span className="absolute left-[46%] top-[6%] hidden text-[26px] lg:block">🛶</span>
        <span className="absolute right-[34%] top-[12%] hidden text-[24px] lg:block">🚗</span>
        <span className="absolute right-[22%] top-[8%] hidden text-[28px] md:block">⛴</span>
        <span className="absolute right-[14%] top-[40%] hidden text-[30px] md:block">🗼</span>
        <span className="absolute right-[6%] top-[18%] hidden text-[30px] sm:block">🌴</span>
        <span className="absolute right-[4%] top-[64%] hidden text-[28px] sm:block">👒</span>
        <span className="absolute left-[28%] top-[82%] hidden text-[26px] lg:block">🧭</span>
        <span className="absolute right-[28%] top-[78%] hidden text-[26px] lg:block">⛵</span>
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        <div className="text-center">
          <p className="font-script text-[25px] leading-none text-[#29b9df]">Wonderful place for You</p>
          <h2 className="mt-3 text-[36px] font-extrabold tracking-tight text-[#071734] sm:text-[40px]">
            Most Popular Tour
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1120px] items-center gap-6 lg:grid-cols-3">
          {cards.map((tour, index) => (
            <article
              key={tour.id}
              className={`rounded-[18px] bg-white p-3 transition ${
                index === 1
                  ? 'z-10 ring-[2px] ring-[#63d1ea] shadow-[0_24px_50px_rgba(35,183,223,0.18)] lg:-my-6 lg:scale-[1.04]'
                  : 'shadow-[0_14px_30px_rgba(6,24,54,0.08)] ring-1 ring-slate-200/70'
              }`}
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="h-[168px] w-full rounded-[14px] object-cover sm:h-[180px]"
              />
              <div className="px-2 pb-1 pt-3">
                <h3 className="text-[16px] font-extrabold leading-tight text-[#111827] sm:text-[17px]">
                  {tour.title}
                </h3>
                <p
                  className="mt-2 text-[13px] leading-6 text-[#5d6980]"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {tour.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 text-[#071734]">
                  <div className="flex items-center gap-2 text-[13px] font-bold">
                    <Clock className="h-4.5 w-4.5 text-[#071734]" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#6a7489]">
                    <Star className="h-4 w-4 text-[#f6ab76]" filled={false} />
                    {tour.rating}
                  </div>
                </div>
                <div className="mt-4 h-px bg-slate-200" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-[16px] font-extrabold text-[#111827] sm:text-[18px]">
                    {tour.priceLabel}
                  </div>
                  <button
                    onClick={() => onBook?.(tour)}
                    className={`rounded-[7px] border px-4 py-2 text-[12px] font-bold transition ${
                      index === 1
                        ? 'border-[#23b7df] bg-[#23b7df] text-white hover:bg-[#17acd6]'
                        : 'border-[#16294f]/30 text-[#071734] hover:border-[#23b7df] hover:text-[#23b7df]'
                    }`}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection({ onEnquire }) {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-8">
      <img
        src="/images/generated/about-airplane-doodle.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-12 top-3 hidden w-[138px] xl:block"
      />
      <div className="mx-auto grid max-w-[1080px] gap-5 lg:grid-cols-[452px_minmax(0,1fr)] lg:items-start">
        <div className="w-full max-w-[452px] grid grid-cols-[1fr_0.74fr] gap-4">
          <div className="space-y-3.5">
            <img
              src="/images/generated/about-boat.png"
              alt="Traveler on scenic boat"
              className="aspect-[1.16] w-full rounded-[15px] object-cover object-center shadow-[0_10px_22px_rgba(6,24,54,0.10)]"
            />
            <div className="rounded-[14px] bg-[#2db6df] px-5 py-4 text-white shadow-[0_12px_24px_rgba(39,183,222,0.14)]">
              <div className="flex items-center gap-3">
                <ExperienceBadgeIcon className="h-8.5 w-8.5 shrink-0" />
                <div>
                  <div className="text-[14px] font-extrabold leading-tight sm:text-[16px]">25 Years</div>
                  <div className="text-[12px] font-medium leading-tight text-white/92 sm:text-[13px]">Of Experiences</div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/generated/about-cliff.png"
            alt="Traveler on coastal cliff"
            className="mt-5 aspect-[0.66] w-full rounded-[15px] object-cover object-center shadow-[0_10px_22px_rgba(6,24,54,0.10)]"
          />
        </div>

        <div className="pt-0.5 lg:pt-1">
          <div className="text-left">
            <p className="font-script text-[18px] leading-none text-[#29b9df] sm:text-[20px]">About Company</p>
            <h2 className="mt-2 max-w-[16ch] text-[28px] font-extrabold leading-[1.08] tracking-tight text-[#071734] sm:text-[30px] lg:text-[31px]">
              Great Opportunity for Adventure & Travels
            </h2>
          </div>
          <p className="mt-3 max-w-[61ch] text-[12.5px] leading-5.5 text-[#5d6b83] sm:text-[13px]">
            Embark on a journey filled with breathtaking landscapes, thrilling experiences, and
            unforgettable memories. Whether you&apos;re an explorer or a leisure traveler, this is the
            perfect opportunity to discover the world&apos;s wonders.
          </p>

          <div className="mt-5 grid max-w-[500px] gap-x-6 gap-y-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-[#29b9df] text-[#23b7df]">
                <Users className="h-6.5 w-6.5" />
              </div>
              <div>
                <h3 className="text-[13px] font-extrabold text-[#111827] sm:text-[14px]">Trusted travel guide</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#5d6b83]">
                  Discover the world with a guide you can trust.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[3px] border-[#29b9df] text-[#23b7df]">
                <Compass className="h-6.5 w-6.5" />
              </div>
              <div>
                <h3 className="text-[13px] font-extrabold text-[#111827] sm:text-[14px]">Mission & Vision</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#5d6b83]">
                  Discover the world with a guide you can trust.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4.5">
            <button
              onClick={onEnquire}
              className="rounded-[6px] bg-[#23b7df] px-6 py-2.5 text-[11.5px] font-bold text-white shadow-[0_12px_24px_rgba(35,183,223,0.20)] transition hover:bg-[#17acd6]"
            >
              Start Your Journey
            </button>
            <div className="flex items-center gap-3">
              <img
                src="/images/generated/testimonial-traveler.png"
                alt="Yogesh Singh portrait"
                className="h-10 w-10 rounded-full object-cover ring-3 ring-[#efe8ff]"
              />
              <div>
                <div className="text-[13px] font-extrabold text-[#111827]">Yogesh Singh</div>
                <div className="text-[11px] text-[#5d6b83]">Author</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneyStatsSection() {
  return (
    <section className="bg-white px-4 pb-12 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <img
          src="/images/generated/journey-stats-banner.png"
          alt="Travel statistics banner"
          className="w-full rounded-[22px] lg:scale-[1.04] origin-center"
        />
      </div>
    </section>
  )
}

function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-28 sm:px-6">
      <div className="absolute -left-10 top-5 hidden text-5xl text-[#23b7df] lg:block">✈</div>
      <div className="absolute bottom-10 right-8 hidden text-5xl text-[#23b7df] lg:block">✈</div>
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Special Offers" title="Offers To Inspire You" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {offerCards.map((offer) => (
            <article
              key={offer.title}
              className="relative overflow-hidden rounded-[26px] bg-slate-900 shadow-[0_20px_50px_rgba(6,24,54,0.14)]"
            >
              <img src={offer.image} alt={offer.title} className="h-64 w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,54,0.08),rgba(6,24,54,0.72))]" />
              <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#23b7df] text-white">%</div>
              <div className="absolute right-5 top-5 rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                Valid for this season
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="max-w-[16ch] text-[31px] font-extrabold leading-tight">{offer.discount}</div>
                <div className="mt-2 max-w-[18ch] text-2xl font-bold leading-tight">{offer.title}</div>
                <div className="mt-3 text-sm text-white/80">with local guides, stays, and curated add-ons</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({ reviews }) {
  const [index, setIndex] = useState(0)
  const perView = 2
  const visible = useMemo(() => {
    if (!reviews.length) return []
    return Array.from({ length: Math.min(perView, reviews.length) }, (_, i) => reviews[(index + i) % reviews.length])
  }, [index, reviews])

  const next = () => setIndex((value) => (value + 1) % reviews.length)
  const prev = () => setIndex((value) => (value - 1 + reviews.length) % reviews.length)

  if (!reviews.length) return null

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute right-[8%] top-8 hidden xl:block">
        <PlaneTrailDoodle className="h-16 w-[210px] rotate-[8deg]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,rgba(35,183,223,0.00),rgba(35,183,223,0.06))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-30 bg-[linear-gradient(180deg,transparent_0%,rgba(186,228,239,0.34)_100%)]" />

      <div className="relative mx-auto max-w-[1110px]">
        <div className="text-center">
          <p className="font-script text-[22px] leading-none text-[#29b9df]">Our Testimonials</p>
          <h2 className="mt-3 text-[34px] font-extrabold tracking-tight text-[#071734] sm:text-[38px]">
            What they are talking about
          </h2>
        </div>

        <div className="mt-12 grid items-start gap-7 lg:grid-cols-[262px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[22px] bg-[#8797f3] shadow-[0_18px_42px_rgba(6,24,54,0.12)]">
            <img
              src="/images/generated/testimonial-traveler.png"
              alt="Traveler holding a map"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {visible.map((review, offset) => (
                <article
                  key={`${review.name}-${offset}`}
                  className={`relative flex flex-col rounded-[18px] border bg-white px-5 pb-5 pt-20 shadow-[0_12px_30px_rgba(6,24,54,0.08)] ${
                    offset === 0 ? 'border-[#63d1ea]' : 'border-slate-200'
                  }`}
                >
                  <div className="absolute right-5 top-5 flex items-center gap-2">
                    <img
                      src="/images/generated/testimonial-avatar.png"
                      alt=""
                      aria-hidden="true"
                      className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-[0_8px_18px_rgba(6,24,54,0.14)]"
                    />
                    <div className={`rounded-[6px] px-4 py-2 text-right text-white shadow-[0_12px_24px_rgba(6,24,54,0.14)] ${offset === 0 ? 'bg-[#23b7df]' : 'bg-[#071734]'}`}>
                      <div className="text-[12px] font-bold leading-tight">{review.name}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">Tourist</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[#23b7df]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-6 text-[13px] leading-7 text-[#4c5d78]">
                    {review.text}
                  </p>
                </article>
              ))}
            </motion.div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#23b7df]' : 'w-2 bg-[#cfe6ef] hover:bg-[#9fd4e6]'}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#63d1ea] text-[#23b7df] transition hover:bg-[#23b7df] hover:text-white"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={next}
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#23b7df] text-white transition hover:bg-[#17acd6]"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StoriesGallerySection({ blogs, images }) {
  const gallery = [
    '/images/IMG_9817.jpg',
    '/images/IMG_9807.jpg',
    '/images/IMG_0313.jpg',
    '/images/IMG_9846.jpg',
    '/images/IMG_9820.jpg',
    '/images/IMG_9810.jpg',
  ]
  const [activeSlide, setActiveSlide] = useState(2)

  return (
    <section className="bg-white px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Our Blog News" title="Recent Articles & Posts" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {blogs.slice(0, 3).map((blog) => (
            <article key={blog.id} className="overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(6,24,54,0.10)] ring-1 ring-slate-200/70">
              <div className="relative">
                <img src={blog.image} alt={blog.title} className="h-72 w-full object-cover" />
                <div className="absolute right-4 top-4 rounded-xl bg-[#23b7df] px-3 py-2 text-center text-xs font-bold text-white">
                  30
                  <br />
                  Jan
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-[#6a7891]">
                  <span>By Admin</span>
                  <span>14 Comment</span>
                </div>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[#071734]">{blog.title}</h3>
                <a href={`/blog/${blog.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#071734] transition hover:text-[#23b7df]">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24">
          <div className="text-center">
            <p className="font-script text-[24px] leading-none text-[#29b9df]">Me be Your Tour More Pleaser</p>
            <h2 className="mt-3 text-[34px] font-extrabold tracking-tight text-[#071734] sm:text-[38px]">
              Recent Gallery
            </h2>
          </div>
          <div className="mx-auto mt-14 max-w-[1460px]">
            <div className="relative overflow-hidden rounded-[34px] bg-white px-4 py-10 shadow-[0_24px_60px_rgba(6,24,54,0.10)] sm:px-8 lg:px-10 lg:py-14">
              <div className="relative hidden h-[520px] [perspective:1600px] lg:block">
                {gallery.map((image, index) => {
                  const offset = index - activeSlide
                  const absOffset = Math.abs(offset)
                  const xMap = ['0%', '18%', '35%', '50%', '65%', '82%']
                  const widthMap = ['17%', '19%', '24%', '28%', '24%', '19%']
                  const left = xMap[index] || '50%'
                  const width = widthMap[index] || '20%'

                  return (
                    <motion.button
                      key={image}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className="absolute bottom-0 top-0 overflow-hidden rounded-[22px] border border-slate-200 shadow-[0_18px_40px_rgba(6,24,54,0.14)]"
                      style={{ left, width, zIndex: 20 - absOffset }}
                      animate={{
                        rotateY: offset * -18,
                        scale: index === activeSlide ? 1.04 : absOffset === 1 ? 0.9 : 0.78,
                        x: `${offset * 8}%`,
                        opacity: absOffset > 2 ? 0.4 : 1,
                        filter: index === activeSlide ? 'saturate(1.02)' : 'saturate(0.78) brightness(0.9)',
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img src={image} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(6,24,54,0.10))]" />
                    </motion.button>
                  )
                })}
              </div>

              <div className="grid gap-4 lg:hidden">
                <img src={gallery[activeSlide]} alt="Active gallery visual" className="aspect-[1.08] w-full rounded-[22px] object-cover" />
                <div className="grid grid-cols-3 gap-3">
                  {gallery.slice(0, 3).map((image, index) => (
                    <button key={image} type="button" onClick={() => setActiveSlide(index)} className="overflow-hidden rounded-[16px]">
                      <img src={image} alt={`Gallery thumbnail ${index + 1}`} className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-10 bg-[#35b6df]' : 'w-2.5 bg-slate-300'}`}
                      aria-label={`Go to gallery slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveSlide((value) => (value - 1 + gallery.length) % gallery.length)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-[#071734] transition hover:border-[#35b6df] hover:text-[#35b6df]"
                    aria-label="Previous gallery slide"
                  >
                    <ChevronLeft className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((value) => (value + 1) % gallery.length)}
                    className="grid h-11 w-11 place-items-center rounded-full bg-[#35b6df] text-white transition hover:bg-[#17acd6]"
                    aria-label="Next gallery slide"
                  >
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterCta({ onEnquire, onSubscribe }) {
  const [email, setEmail] = useState('')
  const socials = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: Whatsapp, label: 'WhatsApp', href: 'https://wa.me/918368479749' },
  ]

  return (
    <section className="bg-white pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-[26px] shadow-[0_24px_55px_rgba(35,183,223,0.16)]">
          <img
            src="/images/generated/cta-booking-banner.png"
            alt="30% offer banner to start your journey with a single click"
            className="w-full"
          />
        </div>
      </div>

      <footer className="mt-0 w-full bg-[#041c22] text-white">
        <div className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1280px] gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_1fr]">
            <div className="flex items-center gap-4">
              <Logo light />
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <Phone className="h-5 w-5 text-[#6fe4ff]" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">Call Agent</div>
                <div className="mt-1 font-semibold text-white">+91 8368479749</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <Mail className="h-5 w-5 text-[#6fe4ff]" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">Send Email</div>
                <div className="mt-1 font-semibold text-white">info@mysoultrip.in</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <MapPin className="h-5 w-5 text-[#6fe4ff]" />
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">Office Address</div>
                <div className="mt-1 font-semibold text-white">Dwarahat, Almora, Uttarakhand</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[28px] font-extrabold text-white">About Us</h3>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/62">
              We create meaningful journeys through Uttarakhand with village stays, sacred places, mountain stories, and locally guided travel experiences.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-md bg-white/8 text-white/80 transition hover:bg-[#23b7df] hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[28px] font-extrabold text-white">Destinations</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/62">
              <li><a href="/destinations" className="hover:text-white">Dwarahat</a></li>
              <li><a href="/destinations" className="hover:text-white">Jageshwar</a></li>
              <li><a href="/destinations" className="hover:text-white">Binsar</a></li>
              <li><a href="/destinations" className="hover:text-white">Bhimtal</a></li>
              <li><a href="/destinations" className="hover:text-white">Mukteshwar</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[28px] font-extrabold text-white">Useful links</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/62">
              <li><a href="/#about" className="hover:text-white">About Us</a></li>
              <li><a href="/destinations" className="hover:text-white">Destination</a></li>
              <li><a href="/blog" className="hover:text-white">News & Blog</a></li>
              <li><a href="/packages" className="hover:text-white">Meet the Guide</a></li>
              <li><a href="/contact-us" className="hover:text-white">Contacts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[28px] font-extrabold text-white">Newsletter</h3>
            <p className="mt-5 text-sm leading-7 text-white/62">
              Enter your email address to register to our newsletter subscription
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (!email.trim()) return
                onSubscribe?.(email)
                setEmail('')
              }}
              className="mt-5"
            >
              <div className="flex overflow-hidden rounded-full bg-white">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter email"
                  className="min-w-0 flex-1 px-4 py-3 text-sm text-[#071734] outline-none"
                  required
                />
                <button className="m-1 rounded-full bg-[#23b7df] px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
                  Subscribe
                </button>
              </div>
            </form>
            <label className="mt-4 flex items-center gap-2 text-xs text-white/55">
              <input type="checkbox" className="rounded border-white/20 bg-transparent" defaultChecked />
              I agree to the Privacy Policy
            </label>
          </div>
        </div>

        <div className="bg-[#072830]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-5 text-xs text-white/70 sm:flex-row">
            <div>Copyright ? {new Date().getFullYear()} MySoulTrip. All Rights Reserved.</div>
            <div className="flex gap-3">
              {['Privacy Policy', 'Terms & Conditions'].map((label) => (
                <a key={label} href="#" className="rounded bg-white/8 px-3 py-1.5 text-white/80 hover:bg-white/12 hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}

export default function FigmaHomePage({ data, openModal, handleBook, onSubscribe }) {
  const popularTours = data.groupTours.slice(0, 3)

  return (
    <main className="bg-white text-[#071734]">
      <HeroSection onEnquire={() => openModal()} />
      <CategoriesSection destinations={data.destinations} />
      <PopularToursSection tours={popularTours} onBook={handleBook} />
      <AboutSection onEnquire={() => openModal()} />
      <JourneyStatsSection />
      <OffersSection />
      <TestimonialsSection reviews={data.reviews} />
      <StoriesGallerySection blogs={data.blogs} images={data.instagram} />
      <FooterCta onEnquire={() => openModal()} onSubscribe={onSubscribe} />
    </main>
  )
}
