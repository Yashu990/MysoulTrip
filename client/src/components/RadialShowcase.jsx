import { Lotus, Mountain, Hiking, Users } from './icons'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'
import BrandMark from './BrandMark'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Dove-style radial showcase: the brand logo floats at the centre while four
 * offerings orbit around it. Thin connector lines draw in, and each offering
 * staggers outward into place. On small screens it gracefully falls back to a
 * simple 2-column grid (a circular layout doesn't fit a phone).
 */
const offerings = [
  { icon: Lotus, title: 'Spiritual Trails', desc: 'Temples, ashrams & sacred energy', pos: 'top-[6%] left-[4%] sm:left-[10%]', anchor: { x: 22, y: 22 } },
  { icon: Mountain, title: 'Nature Escapes', desc: 'Mountains, forests & alpine lakes', pos: 'top-[6%] right-[4%] sm:right-[10%]', anchor: { x: 78, y: 22 } },
  { icon: Hiking, title: 'Adventure', desc: 'Treks, trails & high-Himalaya exploration', pos: 'bottom-[6%] left-[4%] sm:left-[10%]', anchor: { x: 22, y: 78 } },
  { icon: Users, title: 'Group Tours', desc: 'Community, bonding & shared journeys', pos: 'bottom-[6%] right-[4%] sm:right-[10%]', anchor: { x: 78, y: 78 } },
]

export default function RadialShowcase({ onExplore }) {
  const reduce = useReducedMotion()

  return (
    <section id="offerings" className="relative overflow-hidden bg-cream-50 py-16 sm:py-20">
      {/* Decorative line-art background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10" />
        <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-500/15" />
      </div>

      <div className="section-shell relative px-4 sm:px-6">
        <Reveal y={20} className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-[2rem] font-bold leading-tight text-navy-800 sm:text-[2.6rem]">
            One Journey, <span className="text-gold-600">Many Souls</span>
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Whatever calls to you, MySoulTrip crafts the path — from sacred trails to wild escapes.
          </p>
          <span className="mx-auto mt-4 block h-0.5 w-14 rounded bg-gold-500" />
        </Reveal>

        {/* ---------- Desktop: circular orbit ---------- */}
        <div className="relative mx-auto hidden aspect-square max-w-[44rem] md:block">
          {/* Connector lines (draw on view) */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {offerings.map((o, i) => (
              <motion.line
                key={o.title}
                x1="50" y1="50" x2={o.anchor.x} y2={o.anchor.y}
                stroke="#edae2b" strokeWidth="0.25" strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: EASE }}
              />
            ))}
          </svg>

          {/* Centre logo */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="relative">
              <span className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-gold-500/30 blur-2xl" />
              <motion.div
                animate={reduce ? {} : { y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="grid h-44 w-44 place-items-center p-2"
              >
                <BrandMark className="h-auto w-full drop-shadow-[0_12px_24px_rgba(15,31,61,0.18)]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Orbiting offerings */}
          {offerings.map((o, i) => (
            <motion.button
              key={o.title}
              onClick={onExplore}
              className={`group absolute z-20 w-52 ${o.pos}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.14, ease: EASE }}
              whileHover={reduce ? {} : { y: -6 }}
            >
              <div className="flex flex-col items-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-gold-600 shadow-[0_12px_30px_rgba(15,31,61,0.12)] ring-2 ring-gold-500/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white group-hover:shadow-[0_14px_34px_rgba(237,174,43,0.45)]">
                  <o.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-3 text-base font-extrabold text-navy-800">{o.title}</h3>
                <p className="mt-1 text-xs leading-snug text-gray-500">{o.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* ---------- Mobile: stacked grid ---------- */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {offerings.map((o, i) => (
            <motion.button
              key={o.title}
              onClick={onExplore}
              className="group flex flex-col items-center rounded-2xl bg-white px-4 py-5 text-center shadow-[0_10px_28px_rgba(15,31,61,0.08)] ring-1 ring-[#efe3ca]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-500/12 text-gold-600 ring-2 ring-gold-500/25 transition group-hover:bg-gold-500 group-hover:text-white">
                <o.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-3 text-sm font-extrabold text-navy-800">{o.title}</h3>
              <p className="mt-1 text-[11px] leading-snug text-gray-500">{o.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
