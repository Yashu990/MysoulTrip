import SectionHead from './SectionHead'
import { Lotus, Mountain, Hiking, Tree, Home, ArrowRight } from './icons'
import { Stagger, StaggerItem, motion } from './motion'
import Img from './Img'

const iconMap = { temple: Lotus, mountain: Mountain, hiking: Hiking, tree: Tree, home: Home }
const labelMap = { temple: 'Spiritual', mountain: 'Nature', hiking: 'Adventure', tree: 'Forest Stay', home: 'Village Stay' }

export default function FeaturedExperiences({ experiences, onExplore }) {
  return (
    <section id="experiences" className="section-shell px-4 py-14 sm:px-6">
      <SectionHead title="Featured Experiences" subtitle="Handpicked journeys for every kind of traveller" />

      <Stagger className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5" stagger={0.08}>
        {experiences.map((e) => {
          const Icon = iconMap[e.icon] || Mountain
          const label = labelMap[e.icon] || 'Experience'
          return (
            <StaggerItem key={e.id}>
              <motion.button
                onClick={() => onExplore?.(e)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[1.2rem] bg-white text-left shadow-[0_14px_32px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_50px_rgba(15,31,61,0.18)]"
              >
                {/* Image with cohesive overlay + category chip */}
                <div className="relative h-40 overflow-hidden">
                  <Img
                    src={e.image}
                    alt={e.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {/* unified tint so mixed photos feel like one set */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/15 to-navy-900/5" />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy-800 shadow-sm backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-gold-600" /> {label}
                  </span>
                </div>

                {/* Body — flex so the CTA always sits at the same baseline */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[1.02rem] font-extrabold leading-snug text-navy-800 line-clamp-2">{e.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">{e.desc}</p>

                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-[#dceff6] pt-3 text-sm font-extrabold text-gold-700">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
