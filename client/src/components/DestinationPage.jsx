import { ArrowRight, Compass, Hiking, Lotus, MapPin, Mountain, Search, Sun, Tree, Users } from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'

const stats = [
  { icon: MapPin, value: '15+', label: 'Destinations' },
  { icon: Mountain, value: '100+', label: 'Experiences' },
  { icon: Search, value: 'Endless', label: 'Views' },
  { icon: Lotus, value: 'Authentic', label: 'Local Culture' },
]

const categories = [
  { label: 'All Destinations', count: 15, href: '/destinations', active: true },
  { label: 'Spiritual', count: 6, href: '/destinations/spiritual' },
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

const destinationCards = [
  {
    name: 'Dwarahat',
    desc: 'Spiritual energy, ancient temples & serene landscapes.',
    image: '/images/IMG_9817.jpg',
    tags: ['Lotus', 'Trail', 'Village'],
  },
  {
    name: 'Almora',
    desc: 'Cultural heritage, local markets & panoramic Himalayan views.',
    image: '/images/IMG_0313.jpg',
    tags: ['Culture', 'Views', 'Town'],
  },
  {
    name: 'Jageshwar',
    desc: 'Ancient temples, spirituality & peaceful surroundings.',
    image: '/images/IMG_9170.jpg',
    tags: ['Temples', 'Forest', 'Peace'],
  },
  {
    name: 'Binsar',
    desc: 'Wildlife sanctuary, zero point & stunning Himalayan views.',
    image: '/images/IMG_9808.jpg',
    tags: ['Wildlife', 'Sunrise', 'Forest'],
  },
  {
    name: 'Patal Bhuvaneshwar',
    desc: 'Mysterious caves, legends & natural formations.',
    image: '/images/IMG_9846.jpg',
    tags: ['Caves', 'Mystic', 'Legends'],
  },
  {
    name: 'Masi',
    desc: 'A peaceful Himalayan village retreat away from crowds.',
    image: '/images/IMG_9807.jpg',
    tags: ['Village', 'Calm', 'Local'],
  },
  {
    name: 'Chaukori',
    desc: 'Breathtaking views of Panchachuli peaks & tranquil vibes.',
    image: '/images/IMG_9820.jpg',
    tags: ['Peaks', 'Views', 'Sunrise'],
  },
  {
    name: 'Munsiyari',
    desc: 'Gateway to Johar Valley, mesmerizing mountain views.',
    image: '/images/IMG_9810.jpg',
    tags: ['Adventure', 'Valley', 'Peaks'],
  },
  {
    name: 'Kausani',
    desc: 'The Switzerland of India, stunning snowpeak views.',
    image: '/images/dest-kausani.jpg',
    tags: ['Tea', 'Views', 'Calm'],
  },
  {
    name: 'Ranikhet',
    desc: 'Colonial charm, golf course & peaceful environment.',
    image: '/images/dest-ranikhet.jpg',
    tags: ['Heritage', 'Greenery', 'Quiet'],
  },
  {
    name: 'Bhimtal',
    desc: 'Beautiful lake, nature walks & scenic serenity.',
    image: '/images/dest-bhimtal.jpg',
    tags: ['Lake', 'Nature', 'Walks'],
  },
  {
    name: 'Nainital',
    desc: 'Iconic lake town, boating & vibrant local life.',
    image: '/images/dest-nainital.jpg',
    tags: ['Lake', 'Town', 'Boating'],
  },
  {
    name: 'Mukteshwar',
    desc: 'Adventure, rock climbing & stunning Himalayan views.',
    image: '/images/dest-mukteshwar.jpg',
    tags: ['Adventure', 'Cliffs', 'Views'],
  },
  {
    name: 'Pandavkholi',
    desc: 'Spiritual trek, ancient temple & peaceful meadows.',
    image: '/images/dest-pandavkholi.jpg',
    tags: ['Trek', 'Temple', 'Meadows'],
  },
  {
    name: 'Dunagiri',
    desc: 'Sacred temples, meditation & spiritual energy.',
    image: '/images/dest-dunagiri.jpg',
    tags: ['Sacred', 'Meditation', 'Views'],
  },
  {
    name: 'Sattal',
    desc: 'Seven connected lakes, perfect for nature lovers.',
    image: '/images/dest-sattal.jpg',
    tags: ['Lakes', 'Birding', 'Nature'],
  },
]

const iconCycle = [Lotus, Tree, Hiking]

export default function DestinationPage({ onPlan }) {
  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fcff_48%,#ffffff_100%)]">
      <section className="px-0 pt-0">
        <div className="relative min-h-[20rem] overflow-hidden">
          <img
            src="/images/hero-kumaon-banner-v2-opt.jpg"
            alt="Kumaon mountain region"
            width="1600"
            height="758"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/88 via-navy-900/55 to-navy-900/10" />
          <div className="section-shell relative px-4 py-10 sm:px-6 sm:py-12">
            <motion.div
              className="max-w-[42rem] text-white"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold text-white/90">Home / Destinations</p>
              <h1 className="mt-3 font-display text-[3.2rem] font-bold leading-none sm:text-[4.7rem]">
                Kumaon Region
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88 sm:text-xl">
                Explore the untouched beauty of Kumaon - ancient temples, peaceful villages, dense forests,
                majestic peaks and breathtaking landscapes.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/18 px-4 py-3 backdrop-blur-sm">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-400">
                      <stat.icon className="h-5 w-5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[1.35rem] font-extrabold">{stat.value}</span>
                      <span className="block text-xs text-white/72">{stat.label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 pb-8 pt-10 sm:px-6">
        <Reveal y={20} className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[2.4rem] font-bold text-navy-800 sm:text-[3.3rem]">
            Explore the Best of Kumaon
          </h2>
          <span className="mx-auto mt-3 block h-0.5 w-14 rounded bg-gold-500" />
          <p className="mt-4 text-base leading-relaxed text-navy-800/70 sm:text-lg">
            From spiritual trails and ancient temples to offbeat villages and scenic viewpoints,
            Kumaon has something for every kind of traveler.
          </p>
        </Reveal>
      </section>

      <section className="section-shell grid gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[18rem_1fr]">
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
              Our travel experts are here to help you plan the perfect Kumaon trip.
            </p>
            <button
              onClick={onPlan}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gold-500 px-4 py-3 text-sm font-extrabold text-navy-800 transition hover:bg-gold-500 hover:text-navy-900"
            >
              <Users className="h-4 w-4" /> Talk to Expert
            </button>
          </div>
        </aside>

        <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.06} amount={0.05}>
          {destinationCards.map((card, index) => {
            const Icon = iconCycle[index % iconCycle.length]
            return (
              <StaggerItem key={card.name}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="group h-full overflow-hidden rounded-[1.3rem] bg-white shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_22px_46px_rgba(15,31,61,0.16)]"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.name}
                      loading="lazy"
                      className="h-40 w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                <div className="p-4">
                  <h3 className="text-[1.35rem] font-extrabold leading-tight text-navy-800">{card.name}</h3>
                  <p className="mt-2 min-h-[3.25rem] text-sm leading-relaxed text-navy-800/70">{card.desc}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-navy-800/86">
                      Experiences
                    </span>
                    <div className="flex items-center gap-2 text-gold-600">
                      {card.tags.map((tag, tagIndex) => {
                        const TagIcon = iconCycle[tagIndex % iconCycle.length]
                        return <TagIcon key={tag} className="h-4 w-4" />
                      })}
                    </div>
                  </div>
                </div>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </section>

      <section className="section-shell px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.65rem] border border-[#dceff6] bg-white px-6 py-5 shadow-[0_12px_34px_rgba(15,31,61,0.06)] sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-800">
              <MapPin className="h-7 w-7" />
            </span>
            <div>
              <p className="text-[1.45rem] font-extrabold tracking-tight text-navy-800">Can't decide where to go?</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/72 sm:text-base">
                Let our travel experts help you choose the perfect destination based on your interests and travel style.
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
