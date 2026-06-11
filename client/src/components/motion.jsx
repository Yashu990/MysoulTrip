import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Shared motion primitives for the MySoulTrip site.
 * Every component honours prefers-reduced-motion — animations collapse to
 * simple fades (or nothing) for users who ask their OS to reduce motion.
 */

// Smooth, premium-feeling easing curve reused across the site.
const EASE = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ *
 * Reveal — fades + slides content in as it scrolls into view.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.25,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ *
 * Stagger — parent that reveals its children one after another.
 * Pair <Stagger> with <StaggerItem> children.
 * ------------------------------------------------------------------ */
export function Stagger({ children, className = '', delayChildren = 0.08, stagger = 0.1, amount = 0.2, once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 26, as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ *
 * TiltCard — 3D tilt that follows the cursor with a soft spring.
 * Adds a subtle moving glare for depth. Disabled under reduced-motion.
 * ------------------------------------------------------------------ */
export function TiltCard({ children, className = '', max = 10, glare = true, scale = 1.02, ...rest }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 18 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 18 })
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  }

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
          style={{
            background: useTransform(glareX, (gx) => `radial-gradient(420px circle at ${gx} 0%, rgba(255,255,255,0.28), transparent 45%)`),
          }}
        />
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ *
 * MagneticButton — gently pulls toward the cursor, snaps back on leave.
 * Wraps any clickable content. Falls back to a plain element if reduced.
 * ------------------------------------------------------------------ */
export function MagneticButton({ children, className = '', strength = 0.4, as = 'button', ...rest }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 16 })
  const sy = useSpring(y, { stiffness: 260, damping: 16 })
  const MotionTag = motion[as] || motion.button

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionTag
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ *
 * Small helpers
 * ------------------------------------------------------------------ */

// Words that animate up one-by-one — used for the hero headline.
export function WordReveal({ text, className = '', delay = 0, highlightClassName = '', highlightWords = [] }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${highlightWords.includes(word) ? highlightClassName : ''}`}
            initial={reduce ? { opacity: 0 } : { y: '110%', opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Typewriter — types text out character by character with a blinking caret.
// Collapses to the full text instantly under reduced-motion.
export function Typewriter({ text = '', speed = 45, startDelay = 150, className = '', caret = true }) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState(reduce ? text : '')
  const [done, setDone] = useState(reduce)

  useEffect(() => {
    if (reduce) {
      setOut(text)
      setDone(true)
      return
    }
    setOut('')
    setDone(false)
    let i = 0
    let interval
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, startDelay, reduce])

  return (
    <span className={className}>
      {out}
      {caret && (
        <span
          className="ml-0.5 inline-block w-[2px] -translate-y-[1px] self-stretch bg-current align-middle"
          style={{ height: '1em', animation: done ? 'tw-blink 1s step-end infinite' : 'none', opacity: done ? undefined : 1 }}
        />
      )}
    </span>
  )
}

export { motion, EASE }
