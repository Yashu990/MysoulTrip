import SectionHead from './SectionHead'
import { Lotus, Mountain, Hiking, Tree, Home, ArrowRight } from './icons'
import { Stagger, StaggerItem, motion } from './motion'
import Img from './Img'

const iconMap = { temple: Lotus, mountain: Mountain, hiking: Hiking, tree: Tree, home: Home }

export default function FeaturedExperiences({ experiences, onExplore }) {
  return (
    <section id="experiences" className="section-shell px-4 py-14 sm:px-6">
      <SectionHead title="Featured Experiences" />

      <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5" stagger={0.08}>
        {experiences.map((e) => {
          const Icon = iconMap[e.icon] || Mountain
          return (
            <StaggerItem key={e.id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] bg-white shadow-[0_14px_32px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_50px_rgba(15,31,61,0.18)]"
              >
                <div className="relative h-32 overflow-hidden">
                  <Img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute -bottom-5 left-4 grid h-11 w-11 place-items-center rounded-full bg-navy-800 text-gold-400 ring-4 ring-white shadow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 pt-7">
                  <h3 className="text-[1.06rem] font-extrabold leading-tight text-navy-800">{e.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-snug text-gray-500">{e.desc}</p>
                  <button
                    onClick={() => onExplore?.(e)}
                    className="group/btn mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition hover:text-gold-700"
                  >
                    Explore <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
