import { ChevronLeft, ArrowRight, Clock, Calendar } from './icons'
import { Reveal, motion } from './motion'
import CoverImage from './CoverImage'
import { blogPosts } from '../data/blogs'

function initials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2)
}

export default function BlogPost({ id, onPlan }) {
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <main className="section-shell px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-navy-800">Story not found</h1>
        <a href="/blog" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900">
          <ChevronLeft className="h-4 w-4" /> Back to Journal
        </a>
      </main>
    )
  }

  const body = post.body || [
    post.excerpt,
    `In this story we dig into ${post.title.replace(/—.*/, '').trim().toLowerCase()} — what to expect, when to go, and the small details that make all the difference on the ground.`,
    'The full piece is on its way. In the meantime, our team is a message away if you’d like to plan a trip around it.',
  ]

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
  const relatedFinal = (related.length ? related : blogPosts.filter((p) => p.id !== post.id)).slice(0, 3)

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_48%,#ffffff_100%)]">
      {/* Cover hero */}
      <section className="relative">
        <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[26rem]">
          <CoverImage id={post.id} theme={post.theme} big alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-transparent" />
          <div className="section-shell relative flex min-h-[20rem] flex-col justify-end px-4 py-10 sm:min-h-[26rem] sm:px-6">
            <a href="/blog" className="mb-auto inline-flex w-fit items-center gap-1.5 rounded-full glass-dark px-4 py-2 text-xs font-bold text-white transition hover:text-gold-300">
              <ChevronLeft className="h-4 w-4" /> Journal
            </a>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-white">
              <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-900">{post.category}</span>
              <h1 className="mt-3 max-w-3xl font-display text-[2.3rem] font-bold leading-[0.98] sm:text-[3.5rem]">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-[11px] font-bold">{initials(post.author)}</span>
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-shell px-4 py-12 sm:px-6">
        <Reveal y={18} className="mx-auto max-w-2xl">
          <p className="text-lg font-semibold leading-relaxed text-navy-800">{body[0]}</p>
          {body.slice(1).map((para, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed text-navy-800/72">{para}</p>
          ))}

          {/* Inline CTA */}
          <div className="mt-10 rounded-2xl border border-[#eee3ce] bg-cream-50 p-6 text-center">
            <p className="font-display text-xl font-bold text-navy-800">Want to experience this for real?</p>
            <p className="mt-1 text-sm text-navy-800/65">Let us craft a trip around it — tailored to your dates and pace.</p>
            <button onClick={onPlan} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900 transition hover:bg-gold-400">
              Plan My Trip <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* Related */}
      <section className="section-shell px-4 pb-16 sm:px-6">
        <h2 className="mb-6 font-display text-2xl font-bold text-navy-800">More Stories</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {relatedFinal.map((p) => (
            <a key={p.id} href={`/blog/${p.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,31,61,0.14)]">
              <CoverImage id={p.id} theme={p.theme} alt={p.title} className="h-28 w-full object-cover" />
              <div className="p-4">
                <span className="text-[11px] font-bold uppercase tracking-wide text-gold-600">{p.category}</span>
                <h3 className="mt-1 text-sm font-extrabold leading-snug text-navy-800 line-clamp-2 group-hover:text-gold-700">{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
