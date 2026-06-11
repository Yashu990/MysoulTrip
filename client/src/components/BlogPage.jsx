import { useState } from 'react'
import { ArrowRight, Clock, Calendar, Mail, Sparkle } from './icons'
import { Reveal, Stagger, StaggerItem, motion, Typewriter } from './motion'
import CoverImage from './CoverImage'
import { blogPosts, blogCategories } from '../data/blogs'

function initials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2)
}

function Meta({ post, light = false }) {
  const c = light ? 'text-white/70' : 'text-navy-800/55'
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold ${c}`}>
      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
    </div>
  )
}

function Author({ name, light = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold ${light ? 'bg-white/20 text-white' : 'bg-gradient-to-br from-navy-700 to-navy-900 text-white'}`}>
        {initials(name)}
      </span>
      <span className={`text-sm font-bold ${light ? 'text-white' : 'text-navy-800'}`}>{name}</span>
    </span>
  )
}

function PostCard({ post }) {
  return (
    <motion.a
      href={`/blog/${post.id}`}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.3rem] bg-white shadow-[0_14px_36px_rgba(15,31,61,0.08)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_26px_54px_rgba(15,31,61,0.16)]"
    >
      <div className="relative h-44 overflow-hidden">
        <CoverImage id={post.id} theme={post.theme} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-navy-800 shadow-sm backdrop-blur-sm">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Meta post={post} />
        <h3 className="mt-2 text-[1.12rem] font-extrabold leading-snug text-navy-800 line-clamp-2 transition-colors group-hover:text-gold-700">{post.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-navy-800/60">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[#f0ead9] pt-3">
          <Author name={post.author} />
          <ArrowRight className="h-4 w-4 text-gold-600 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  )
}

export default function BlogPage({ onSubscribe }) {
  const [filter, setFilter] = useState('All')
  const [email, setEmail] = useState('')

  const featured = blogPosts.find((p) => p.featured) || blogPosts[0]
  const rest = blogPosts.filter((p) => p.id !== featured.id)
  const visible = filter === 'All' ? rest : rest.filter((p) => p.category === filter)

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_48%,#ffffff_100%)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-float-slow absolute -left-20 top-6 h-72 w-72 rounded-full bg-gold-500/15 blur-[100px]" />
          <div className="animate-float-slower absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-navy-600/40 blur-[110px]" />
        </div>
        <div className="section-shell relative px-4 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300"
          >
            <Sparkle className="h-3.5 w-3.5" /> The MySoulTrip Journal
          </motion.span>
          <h1 className="mt-5 font-display text-[3rem] font-bold leading-[0.95] text-white sm:text-[4.6rem]">
            <Typewriter text="Stories from the Hills" speed={55} />
          </h1>
          <Reveal as="p" delay={0.3} className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Guides, reflections and hidden gems from across Uttarakhand — written by the people who call these mountains home.
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section className="section-shell px-4 py-12 sm:px-6">
        <Reveal y={24}>
          <a href={`/blog/${featured.id}`} className="group grid overflow-hidden rounded-[1.8rem] bg-white shadow-[0_22px_60px_rgba(15,31,61,0.12)] ring-1 ring-black/5 lg:grid-cols-2">
            <div className="relative min-h-[15rem] overflow-hidden lg:min-h-[24rem]">
              <CoverImage id={featured.id} theme={featured.theme} big alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 z-10 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-navy-900 shadow">Featured</span>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-600">{featured.category}</span>
              <h2 className="mt-2 font-display text-[2rem] font-bold leading-tight text-navy-800 sm:text-[2.6rem]">{featured.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-navy-800/65">{featured.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <Author name={featured.author} />
                <Meta post={featured} />
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-navy-800 px-5 py-3 text-sm font-extrabold text-white transition group-hover:bg-navy-900">
                Read Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* Filter + grid */}
      <section className="section-shell px-4 pb-14 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {blogCategories.map((c) => {
            const active = filter === c
            return (
              <button key={c} onClick={() => setFilter(c)} className={`relative rounded-full px-4 py-2 text-sm font-bold transition ${active ? 'text-navy-900' : 'text-navy-800/70 hover:text-navy-900'}`}>
                {active && <motion.span layoutId="blogFilter" className="absolute inset-0 rounded-full bg-gold-500" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                <span className="relative">{c}</span>
              </button>
            )
          })}
        </div>

        <Stagger key={filter} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} amount={0.05}>
          {visible.map((post) => (
            <StaggerItem key={post.id}><PostCard post={post} /></StaggerItem>
          ))}
        </Stagger>
        {visible.length === 0 && (
          <p className="py-16 text-center text-navy-800/50">No stories in this category yet — check back soon.</p>
        )}
      </section>

      {/* Newsletter */}
      <section className="section-shell px-4 pb-16 sm:px-6">
        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-10 text-center text-white sm:px-12">
            <div aria-hidden className="animate-spin-slow absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[conic-gradient(from_0deg,rgba(237,174,43,0.35),transparent_55%)] blur-md" />
            <Mail className="mx-auto h-9 w-9 text-gold-400" />
            <h2 className="mt-4 font-display text-[1.8rem] font-bold sm:text-[2.3rem]">Get hill stories in your inbox</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/75">One thoughtful email a month — new trails, quiet villages and travel notes. No spam, ever.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); onSubscribe?.(email); setEmail('') }}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 ring-1 ring-white/15 focus:outline-none focus:ring-gold-500/50"
              />
              <button className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900 transition hover:bg-gold-400">Subscribe</button>
            </form>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
