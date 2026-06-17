import { ArrowRight, Compass, Hiking, Lotus, MapPin, ShieldCheck, Sun, Tree, Users } from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'

const categories = [
  { label: 'All Destinations', count: 15, href: '/destinations' },
  { label: 'Spiritual', count: 6, href: '/destinations/spiritual', active: true },
  { label: 'Nature & Wildlife', count: 5, href: '/destinations' },
  { label: 'Trekking', count: 4, href: '/destinations' },
  { label: 'Village Life', count: 3, href: '/destinations' },
  { label: 'Lakes & Hill Stations', count: 4, href: '/destinations' },
  { label: 'Photography', count: 3, href: '/destinations' },
]

const seasons = [
  'Summer (Mar - Jun)',
  'Monsoon (Jul - Sep)',
  'Autumn (Oct - Nov)',
  'Winter (Dec - Feb)',
]

const spiritualCards = [
  {
    title: 'Jageshwar Dham',
    image: '/images/IMG_9170.jpg',
    desc: 'A group of 100+ ancient temples dedicated to Lord Shiva, surrounded by deodar forests and spiritual energy.',
    badge: 'Most Popular',
  },
  {
    title: 'Dunagiri Temple',
    image: '/images/IMG_9817.jpg',
    desc: 'A powerful Shakti Peeth and Kriya Yoga meditation center, known for its divine vibrations and scenic views.',
  },
  {
    title: 'Babaji Cave',
    image: '/images/IMG_9850.jpg',
    desc: 'The mystical cave where Babaji is believed to have meditated. A must-visit for spiritual seekers.',
  },
  {
    title: 'Pandavkholi',
    image: '/images/IMG_9820.jpg',
    desc: 'A serene cave where Pandavas are believed to have meditated during their exile.',
  },
  {
    title: 'Chitai Golu Devta',
    image: '/images/IMG_9810.jpg',
    desc: 'The temple of Golu Devta, known as the “God of Justice”, where wishes are fulfilled.',
  },
  {
    title: 'Patal Bhuvaneshwar',
    image: '/images/IMG_9846.jpg',
    desc: 'A mysterious cave with stunning natural formations and spiritual significance.',
  },
]

const trustStrip = [
  { icon: Users, title: 'Expert Local Guides', text: 'Born & raised in Uttarakhand' },
  { icon: Lotus, title: 'Authentic Experiences', text: 'Real culture, real connections' },
  { icon: ShieldCheck, title: 'Safe & Comfortable', text: 'Your safety is our priority' },
  { icon: Tree, title: 'Responsible Travel', text: 'We travel slow & give back' },
]

export default function SpiritualPage({ onPlan }) {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fcff_48%,#ffffff_100%)]">
      <section className="section-shell px-4 pb-8 pt-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="space-y-4">
            <div className="rounded-[1.5rem] bg-white px-5 py-6 shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5">
              <h3 className="text-[1.3rem] font-extrabold text-navy-800">Filter Destinations</h3>

              <div className="mt-6">
                <p className="text-sm font-extrabold uppercase tracking-wide text-navy-800">By Category</p>
                <div className="mt-4 space-y-1">
                  {categories.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                        item.active
                          ? 'border-l-2 border-gold-500 bg-gold-500/8 font-bold text-gold-700'
                          : 'text-navy-800/78 hover:bg-navy-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`${item.active ? 'text-gold-700' : 'font-semibold text-navy-800/60'}`}>
                        {item.count}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#dceff6] pt-6">
                <p className="text-sm font-extrabold uppercase tracking-wide text-navy-800">Best Time to Visit</p>
                <div className="mt-4 space-y-3">
                  {seasons.map((season) => (
                    <div key={season} className="flex items-center gap-2 text-sm text-navy-800/78">
                      <Sun className="h-4 w-4 text-gold-600" />
                      <span>{season}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white px-5 py-6 shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5">
              <h3 className="text-[1.2rem] font-extrabold text-navy-800">Need Help?</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/72">
                Our travel experts are here to help you plan the perfect Uttarakhand trip.
              </p>
              <button
                onClick={onPlan}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gold-500 px-4 py-3 text-sm font-extrabold text-navy-800 transition hover:bg-gold-500 hover:text-navy-900"
              >
                <Users className="h-4 w-4" /> Talk to Expert
              </button>
            </div>
          </aside>

          <div>
            <div className="rounded-[1.5rem] bg-white px-5 py-6 shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-600">Spiritual Trails</p>
              <h1 className="mt-2 font-display text-[2.4rem] font-bold leading-none text-navy-800 sm:text-[3.1rem]">
                Sacred Places of Kumaon
              </h1>
              <p className="mt-3 max-w-4xl text-base leading-relaxed text-navy-800/74">
                Reconnect with divinity at ancient temples, mystical caves and powerful spiritual
                sites nestled in the lap of the Himalayas.
              </p>
            </div>

            <Stagger className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.08} amount={0.1}>
              {spiritualCards.map((card, index) => {
                const accentIcons = [Lotus, Hiking, Tree]
                return (
                  <StaggerItem key={card.title}>
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="group h-full overflow-hidden rounded-[1.3rem] bg-white shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_22px_46px_rgba(15,31,61,0.16)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="h-48 w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      {card.badge && (
                        <span className="absolute right-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-xs font-extrabold text-white shadow">
                          {card.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                        <h3 className="text-[1.45rem] font-extrabold leading-tight text-navy-800">{card.title}</h3>
                      </div>
                      <p className="mt-3 min-h-[5rem] text-sm leading-relaxed text-navy-800/74">{card.desc}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 text-sm font-extrabold text-navy-800 transition hover:text-gold-700"
                        >
                          Explore More <ArrowRight className="h-4 w-4" />
                        </a>
                        <div className="flex items-center gap-2 text-gold-600">
                          {accentIcons.map((Icon, iconIndex) => (
                            <Icon key={`${card.title}-${iconIndex}`} className="h-4 w-4" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 pb-10 sm:px-6">
        <div className="rounded-[1.65rem] border border-[#dceff6] bg-white px-6 py-5 shadow-[0_12px_34px_rgba(15,31,61,0.06)]">
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" stagger={0.1} amount={0.3}>
            {trustStrip.map((item) => (
              <StaggerItem key={item.title} className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500/10 text-gold-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold text-navy-800">{item.title}</span>
                  <span className="mt-1 block text-xs text-navy-800/65">{item.text}</span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-shell px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.65rem] border border-[#dceff6] bg-white px-6 py-5 shadow-[0_12px_34px_rgba(15,31,61,0.06)] sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-800">
              <Compass className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[1.45rem] font-extrabold tracking-tight text-navy-800">Looking for a deeper spiritual journey?</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/72 sm:text-base">
                Let our travel experts curate a sacred Kumaon route that matches your interests, pace and intention.
              </p>
            </div>
          </div>

          <button
            onClick={onPlan}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900 transition hover:bg-gold-600"
          >
            Plan My Journey <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  )
}
