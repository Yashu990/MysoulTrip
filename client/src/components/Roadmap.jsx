import { MapPin, Check } from './icons'
import { Stagger, StaggerItem, motion } from './motion'
import Img from './Img'

// Refined, brand-led accent palette (premium tones, not neon) cycled per day.
const ACCENTS = [
  { from: '#63d1ea', to: '#179fc8' }, // gold
  { from: '#3a7d6e', to: '#235c4f' }, // teal-green
  { from: '#e0795b', to: '#c75a3c' }, // terracotta
  { from: '#4a78b5', to: '#2f5588' }, // blue
  { from: '#7a5ea8', to: '#553d80' }, // muted purple
  { from: '#d98a3a', to: '#b86d18' }, // amber
  { from: '#1f3a6e', to: '#0f1f3d' }, // navy
]

const pad = (n) => String(n).padStart(2, '0')

function DayBadge({ day, accent, size = 'md' }) {
  const dim = size === 'sm' ? 'h-14 w-14' : 'h-[5.5rem] w-[5.5rem]'
  return (
    <span
      className={`relative grid ${dim} shrink-0 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(15,31,61,0.28)] ring-4 ring-white`}
      style={{ background: `linear-gradient(145deg, ${accent.from}, ${accent.to})` }}
    >
      <span className={`font-bold uppercase leading-none ${size === 'sm' ? 'text-[9px]' : 'text-[11px]'} opacity-90`}>Day</span>
      <span className={`font-extrabold leading-none ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>{pad(day)}</span>
    </span>
  )
}

function DayCard({ d, accent, arrow }) {
  return (
    <div className="relative rounded-2xl bg-white p-5 shadow-[0_14px_36px_rgba(15,31,61,0.10)] ring-1 ring-black/5">
      {/* connector arrow pointing toward the road (desktop only) */}
      {arrow && (
        <span
          className={`absolute top-8 hidden h-4 w-4 rotate-45 bg-white lg:block ${arrow === 'left' ? '-left-2' : '-right-2'}`}
        />
      )}
      <h3 className="text-[1.05rem] font-extrabold leading-tight" style={{ color: accent.to }}>{d.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-800/72">{d.desc}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy-800/60">
        {d.stay && d.stay !== '—' && (
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" style={{ color: accent.to }} /> Stay: {d.stay}</span>
        )}
        {d.meals && (
          <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: accent.to }} /> Meals: {d.meals}</span>
        )}
      </div>
    </div>
  )
}

function DayImage({ src, alt, accent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(15,31,61,0.16)] ring-2"
      style={{ '--tw-ring-color': accent.from, borderColor: accent.from }}
    >
      <Img src={src} alt={alt} loading="lazy" className="h-44 w-full object-cover sm:h-52" />
    </motion.div>
  )
}

export default function Roadmap({ itinerary = [], gallery = [], fallbackImage }) {
  const imageFor = (i) => (gallery.length ? gallery[i % gallery.length] : fallbackImage)

  return (
    <div className="relative mt-8">
      {/* Desktop "road" spine */}
      <div className="absolute left-1/2 top-3 bottom-3 hidden w-3 -translate-x-1/2 rounded-full bg-navy-800 lg:block">
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 opacity-55 [background:repeating-linear-gradient(180deg,#fff_0_12px,transparent_12px_26px)]" />
      </div>
      {/* Mobile rail */}
      <div className="absolute left-[1.65rem] top-3 bottom-3 w-1 rounded-full bg-navy-800/80 lg:hidden" />

      <Stagger className="space-y-6 lg:space-y-10" stagger={0.1} amount={0.05}>
        {itinerary.map((d, i) => {
          const accent = ACCENTS[i % ACCENTS.length]
          const even = i % 2 === 0
          const img = imageFor(i)
          return (
            <StaggerItem key={d.day}>
              {/* ---------- Desktop: alternating zigzag ---------- */}
              <div className="relative hidden grid-cols-[1fr_5.5rem_1fr] items-center gap-4 lg:grid">
                <div>{even ? <DayImage src={img} alt={d.title} accent={accent} /> : <DayCard d={d} accent={accent} arrow="right" />}</div>
                <div className="flex justify-center"><DayBadge day={d.day} accent={accent} /></div>
                <div>{even ? <DayCard d={d} accent={accent} arrow="left" /> : <DayImage src={img} alt={d.title} accent={accent} />}</div>
              </div>

              {/* ---------- Mobile: left rail ---------- */}
              <div className="relative flex gap-4 lg:hidden">
                <div className="relative z-10"><DayBadge day={d.day} accent={accent} size="sm" /></div>
                <div className="flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,31,61,0.10)] ring-1 ring-black/5">
                  <Img src={img} alt={d.title} loading="lazy" className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-base font-extrabold" style={{ color: accent.to }}>{d.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-800/72">{d.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy-800/60">
                      {d.stay && d.stay !== '—' && (
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" style={{ color: accent.to }} /> {d.stay}</span>
                      )}
                      {d.meals && (
                        <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" style={{ color: accent.to }} /> {d.meals}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </Stagger>
    </div>
  )
}
