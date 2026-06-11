import SectionHead from './SectionHead'
import { Clock, Seat, Users, Compass, ShieldCheck, Mountain } from './icons'
import { Stagger, StaggerItem, motion } from './motion'
import Img from './Img'

function TourCard({ tour, onBook }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white shadow-[0_14px_32px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_50px_rgba(15,31,61,0.18)]"
    >
      <div className="relative h-36 overflow-hidden">
        <Img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 rounded-md bg-navy-900 px-2.5 py-1.5 text-center leading-none text-gold-400 shadow">
          <span className="block text-lg font-extrabold">{tour.day}</span>
          <span className="block text-[10px] font-bold tracking-wide">{tour.month}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[1.06rem] font-extrabold leading-tight text-navy-800">{tour.title}</h3>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold-500" />{tour.duration}</span>
          <span className="flex items-center gap-1.5"><Seat className="h-3.5 w-3.5 text-gold-500" />{tour.seats}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-extrabold text-navy-800">₹{tour.price.toLocaleString('en-IN')}</span>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => onBook?.(tour)}
            className="rounded-md bg-gold-500 px-4 py-2 text-xs font-extrabold text-navy-900 shadow-sm transition hover:bg-gold-400 hover:shadow-[0_8px_20px_rgba(237,174,43,0.45)]"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const promises = [
  { icon: Users, title: 'Small Groups', sub: 'Big Experiences' },
  { icon: Compass, title: 'Expert Local Guides', sub: '' },
  { icon: ShieldCheck, title: 'Safe, Comfortable', sub: '& Responsible' },
]

export default function GroupTours({ groupTours, onBook }) {
  return (
    <section id="tours" className="section-shell px-4 py-14 sm:px-6">
      <SectionHead title="Upcoming Group Tours" linkLabel="View All Tours" />

      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
        {groupTours.map((t) => (
          <StaggerItem key={t.id}>
            <TourCard tour={t} onBook={onBook} />
          </StaggerItem>
        ))}

        <StaggerItem>
          <div className="relative flex h-full flex-col justify-center gap-5 overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-navy-800 to-navy-900 p-5 text-white shadow-[0_14px_32px_rgba(15,31,61,0.12)]">
            <div className="animate-spin-slow absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[conic-gradient(from_0deg,rgba(237,174,43,0.35),transparent_55%)] blur-md" />
            {promises.map((p) => (
              <div key={p.title} className="relative flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-gold-400 ring-1 ring-white/10">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold">{p.title}</span>
                  {p.sub && <span className="block text-xs text-white/60">{p.sub}</span>}
                </span>
              </div>
            ))}
            <Mountain className="absolute -bottom-3 -right-3 h-24 w-24 text-gold-500/15" />
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  )
}
