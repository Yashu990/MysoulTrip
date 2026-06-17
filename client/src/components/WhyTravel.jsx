import { Compass, Users, Sparkle, Leaf } from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'

const reasons = [
  { icon: Compass, title: 'Hidden Destinations', desc: 'Offbeat places away from the crowds' },
  { icon: Users, title: 'Local Experts', desc: 'Born and raised in Uttarakhand' },
  { icon: Sparkle, title: 'Authentic Experiences', desc: 'Live culture, local food & real connections' },
  { icon: Leaf, title: 'Responsible Travel', desc: 'We travel slow & give back locally' },
]

export default function WhyTravel() {
  return (
    <section id="why" className="border-y border-[#dceff6] bg-white">
      <div className="section-shell grid grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_4fr] lg:items-center">
        <Reveal x={-24} y={0}>
          <h2 className="font-display text-[2rem] font-bold leading-[0.95] text-navy-800">
            Why Travel with{' '}
            <span className="block">
              <span className="text-gold-600">My</span>
              <span className="text-navy-800">SoulTrip?</span>
            </span>
          </h2>
          <span className="mt-3 block h-0.5 w-14 rounded bg-gold-500" />
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="group flex h-full items-start gap-3 rounded-2xl bg-cream-50 px-4 py-4 ring-1 ring-[#dceff6] transition-shadow hover:shadow-[0_16px_36px_rgba(15,31,61,0.12)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-gold-600 ring-2 ring-gold-500/30 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <h3 className="text-base font-extrabold text-navy-800">{r.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">{r.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
