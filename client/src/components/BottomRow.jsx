import { ArrowRight, Play, Star, Instagram } from './icons'
import Img from './Img'

function Stories({ blogs }) {
  return (
    <div id="stories">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="font-display text-[2rem] font-bold text-navy-800">Stories from Uttarakhand</h2>
        <a href="#stories" className="hidden items-center gap-1 text-xs font-semibold text-navy-700 hover:text-gold-700 sm:inline-flex">
          View All Blogs <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <span className="mb-5 block h-0.5 w-14 rounded bg-gold-500" />

      <div className="space-y-4">
        {blogs.map((b) => (
          <a key={b.id} href="#" className="group flex items-center gap-3">
            <Img src={b.image} alt={b.title} loading="lazy" className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-black/5" />
            <div className="leading-tight">
              <h3 className="text-sm font-semibold leading-snug text-navy-800 transition group-hover:text-gold-600">{b.title}</h3>
              <p className="mt-1 text-xs text-gray-400">{b.date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function Reviews({ review }) {
  return (
    <div>
      <h2 className="font-display text-[2rem] font-bold text-navy-800">Traveler Reviews</h2>
      <p className="mb-1 text-sm text-gray-500">What our travelers say</p>
      <span className="mb-5 block h-0.5 w-14 rounded bg-gold-500" />

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="relative h-44">
          <Img src={review.thumb} alt="Traveler review" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 grid place-items-center bg-navy-900/30">
            <button aria-label="Play review video" className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-gold-600 shadow-lg transition hover:scale-105">
              <Play className="h-6 w-6 translate-x-0.5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-navy-700 to-navy-800 text-xs font-bold text-white">
              {review.name.split(' ').map((n) => n[0]).join('')}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-navy-800">{review.name}</p>
              <p className="text-xs text-gray-400">{review.city}</p>
            </div>
            <span className="ml-auto flex gap-0.5 text-gold-500">
              {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">"{review.text}"</p>
        </div>
      </div>
    </div>
  )
}

function Follow({ instagram }) {
  return (
    <div>
      <h2 className="font-display text-[2rem] font-bold text-navy-800">Follow Our Journey</h2>
      <p className="mb-1 text-sm text-gray-500">On Instagram</p>
      <span className="mb-5 block h-0.5 w-14 rounded bg-gold-500" />

      <div className="grid grid-cols-3 gap-2">
        {instagram.map((src, i) => (
          <a key={src} href={src} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-lg ring-1 ring-black/5">
            <Img src={src} alt={`Instagram ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110" />
            <span className="absolute inset-0 grid place-items-center bg-navy-900/0 transition group-hover:bg-navy-900/30">
              <Instagram className="h-5 w-5 text-white opacity-0 transition group-hover:opacity-100" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-xs font-semibold text-navy-700 transition hover:bg-gray-50"
        >
          <Instagram className="h-4 w-4 text-[#e1306c]" /> Follow @mysoultrip
        </a>
      </div>
    </div>
  )
}

export default function BottomRow({ blogs, review, instagram }) {
  return (
    <section className="section-shell grid grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3">
      <Stories blogs={blogs} />
      <Reviews review={review} />
      <Follow instagram={instagram} />
    </section>
  )
}
