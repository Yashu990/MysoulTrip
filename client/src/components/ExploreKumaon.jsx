import SectionHead from './SectionHead'
import { MapPin } from './icons'
import { Stagger, StaggerItem, TiltCard } from './motion'
import Img from './Img'

export default function ExploreKumaon({ destinations }) {
  return (
    <section id="destinations" className="section-shell px-4 py-14 sm:px-6">
      <SectionHead title="Explore the Best of Kumaon" linkLabel="View All Destinations" />

      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={0.07}>
        {destinations.map((d) => (
          <StaggerItem key={d.id} className="group [perspective:900px]">
            <TiltCard max={12} className="h-full">
              <a
                href="#tours"
                className="group relative block h-72 overflow-hidden rounded-[1.15rem] shadow-[0_14px_32px_rgba(15,31,61,0.08)] ring-1 ring-black/5"
              >
                <Img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/18 to-transparent" />
                <div
                  className="absolute inset-x-0 bottom-0 p-3.5 text-white"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <h3 className="flex items-center gap-1.5 font-extrabold leading-tight">
                    <MapPin className="h-3.5 w-3.5 text-gold-400" /> {d.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug text-white/78">{d.tagline}</p>
                </div>
              </a>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
