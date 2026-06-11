import { ArrowRight } from './icons'

export default function TemperatureBanner({ onJoin }) {
  return (
    <section className="section-shell px-4 py-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[1.2rem] shadow-[0_22px_48px_rgba(15,31,61,0.12)] ring-1 ring-black/5">
        <img src="/images/IMG_9820.jpg" alt="Snow-capped Himalayan peaks" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/88 via-navy-900/62 to-navy-900/35" />
        <div className="relative flex flex-col items-start justify-between gap-5 px-7 py-8 sm:flex-row sm:items-center">
          <div className="text-white [text-shadow:0_2px_10px_rgba(10,23,48,0.5)]">
            <h3 className="font-display text-[2.2rem] font-bold leading-[0.95] sm:text-[3.2rem]">
              45°C in the city.
              <br />
              15°C in the Himalayas.
            </h3>
            <p className="mt-2 text-sm text-white/80">Escape the heat. Breathe the peace.</p>
          </div>
          <button
            onClick={onJoin}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900 shadow-lg transition hover:bg-gold-600"
          >
            Join Our Next Tour <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
