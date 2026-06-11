import { Star } from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'

const fallbackReviews = [
  { name: 'Ananya Sharma', city: 'Mumbai', rating: 5, text: 'One of the most peaceful and soulful trips of my life. Highly recommended!', trip: 'Spiritual Trail' },
]

function initials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2)
}

export default function Testimonials({ reviews }) {
  const list = Array.isArray(reviews) && reviews.length ? reviews : fallbackReviews

  return (
    <section id="reviews" className="relative overflow-hidden border-y border-[#eee6d7] bg-cream-50 py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold-500/10 blur-[100px]" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-navy-600/5 blur-[100px]" />
      </div>

      <div className="section-shell relative px-4 sm:px-6">
        <Reveal y={20} className="mx-auto mb-4 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">Loved by Travellers</p>
          <h2 className="mt-2 font-display text-[2rem] font-bold leading-tight text-navy-800 sm:text-[2.7rem]">
            Stories That Stay With You
          </h2>
        </Reveal>

        {/* Trust summary bar */}
        <Reveal y={16} delay={0.1} className="mx-auto mb-10 flex max-w-md items-center justify-center gap-6 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold text-navy-800/70">4.9 / 5 average</p>
          </div>
          <span className="h-8 w-px bg-navy-800/10" />
          <div>
            <p className="font-display text-2xl font-bold text-navy-800">500+</p>
            <p className="text-xs font-semibold text-navy-800/70">Happy travellers</p>
          </div>
          <span className="h-8 w-px bg-navy-800/10" />
          <div>
            <p className="font-display text-2xl font-bold text-navy-800">100%</p>
            <p className="text-xs font-semibold text-navy-800/70">Would book again</p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1} amount={0.15}>
          {list.map((r) => (
            <StaggerItem key={`${r.name}-${r.city}`}>
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_14px_38px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_22px_46px_rgba(15,31,61,0.14)]"
              >
                <span className="font-display text-5xl leading-none text-gold-400">&ldquo;</span>
                <div className="mb-3 flex gap-0.5 text-gold-500">
                  {Array.from({ length: r.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-navy-800/78">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[#efe3ca] pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-xs font-bold text-white">
                    {initials(r.name)}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-sm font-extrabold text-navy-800">{r.name}</span>
                    <span className="block truncate text-xs text-navy-800/60">
                      {r.city}{r.trip ? ` · ${r.trip}` : ''}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
