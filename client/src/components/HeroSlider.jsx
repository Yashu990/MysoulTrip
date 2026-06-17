import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from './icons'
import { WordReveal } from './motion'

const EASE = [0.22, 1, 0.36, 1]
const AUTOPLAY_MS = 6000

/**
 * Cinematic full-screen destination slider (inspired by award-style travel heroes):
 * - Full-bleed background image with a slow Ken-Burns zoom that crossfades on change.
 * - Left: region eyebrow, large destination name, description and CTAs.
 * - Right: a row of overlapping "up next" cards you can click to jump to.
 * - Auto-advances, pauses on hover, supports arrows + keyboard, shows a slide counter.
 * Honours prefers-reduced-motion (no Ken-Burns, instant swaps).
 */
export default function HeroSlider({ destinations = [], onExplore, onPlan }) {
  const slides = destinations.slice(0, 6)
  const count = slides.length
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Scroll-driven parallax: image drifts/zooms, content floats up and fades.
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  // Pause autoplay when the hero is scrolled out of view or the tab is hidden.
  const [offscreen, setOffscreen] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Autoplay
  useEffect(() => {
    if (paused || offscreen || count < 2) return
    const t = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, offscreen, next, count])

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!count) return null
  const active = slides[index]
  // The "up next" cards: the slides that follow the active one, wrapped.
  const upcoming = Array.from({ length: count - 1 }, (_, k) => slides[(index + 1 + k) % count])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-navy-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image — scroll parallax + crossfade + slow zoom */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
        <AnimatePresence mode="sync">
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          >
            <motion.img
              src={active.image}
              alt={active.name}
              className="h-full w-full object-cover"
              initial={reduce ? {} : { scale: 1.12 }}
              animate={reduce ? {} : { scale: 1 }}
              transition={{ duration: AUTOPLAY_MS / 1000 + 1.5, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/40 to-navy-900/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-navy-900/20" />

      {/* Drifting gold glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-24 top-16 h-72 w-72 rounded-full bg-gold-500/15 blur-[90px]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section-shell relative flex min-h-[100svh] flex-col justify-center px-4 py-20 sm:px-6"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.25fr]">
          {/* ---------------- Left: destination copy ---------------- */}
          <div className="text-white [text-shadow:0_2px_18px_rgba(10,23,48,0.55)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -18 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                  <MapPin className="h-3.5 w-3.5" /> Uttarakhand, India
                </span>
                <h1 className="mt-5 font-display text-[3.4rem] font-bold uppercase leading-[0.9] tracking-tight sm:text-[5.5rem]">
                  <WordReveal key={active.id} text={active.name} className="block" />
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                  {active.tagline}. A curated MySoulTrip journey into the hidden soul of the
                  Himalayas — temples, forests and stories away from the crowds.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onExplore}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-extrabold text-navy-900 shadow-[0_12px_30px_rgba(237,174,43,0.4)] transition hover:bg-gold-400"
                  >
                    Discover Destination
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={onPlan}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/40 glass-dark px-6 py-3 text-sm font-extrabold text-white transition hover:border-white/70"
                  >
                    Plan My Journey
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---------------- Right: overlapping "up next" cards ---------------- */}
          <div className="relative">
            <div className="flex items-end justify-start gap-3 overflow-visible lg:justify-end">
              {upcoming.map((d, k) => (
                <motion.button
                  key={d.id}
                  layout
                  onClick={() => goTo((index + 1 + k) % count)}
                  whileHover={reduce ? {} : { y: -10, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="group relative h-56 w-36 shrink-0 overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/15 sm:h-64 sm:w-44"
                  style={{ marginLeft: k === 0 ? 0 : '-1.25rem' }}
                >
                  <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-300">Up Next</p>
                    <p className="mt-0.5 text-sm font-extrabold leading-tight text-white">{d.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Controls + counter */}
            <div className="mt-6 flex items-center justify-between gap-4 lg:justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous destination"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-900"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next destination"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-900"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="font-display text-white">
                <span className="text-3xl font-bold text-gold-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-lg text-white/50"> / {String(count).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-4 flex items-center gap-2 lg:justify-end">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${s.name}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? '2rem' : '0.5rem',
                    background: i === index ? '#23b7df' : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:flex sm:flex-col sm:items-center sm:gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Scroll</span>
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-gold-400"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
