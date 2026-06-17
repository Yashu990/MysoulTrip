import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import BrandMark from './BrandMark'

/**
 * Branded intro / splash screen shown when the site first loads.
 * - Navy backdrop with the MySoulTrip logo, a gold shimmer sweep and a loading bar.
 * - Auto-dismisses after `duration`, then fades up to reveal the site.
 * - Shows once per browser session (sessionStorage) so it isn't repeated on
 *   every internal navigation. Pass `oncePerSession={false}` to always show it.
 * - Honours prefers-reduced-motion (static logo, quick fade).
 */
export default function SplashScreen({ duration = 2600, oncePerSession = true }) {
  const reduce = useReducedMotion()

  // Decide synchronously on first render so the site never flashes underneath.
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (oncePerSession && sessionStorage.getItem('mst_splash_seen')) return false
    return true
  })

  useEffect(() => {
    if (!show) return
    // Lock scroll while the splash is up.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      if (oncePerSession) sessionStorage.setItem('mst_splash_seen', '1')
      setShow(false)
    }, reduce ? 900 : duration)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = prevOverflow
    }
  }, [show, duration, oncePerSession, reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#06142b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,200,239,0.24),transparent_34%),linear-gradient(135deg,#071734_0%,#0b1f42_42%,#092654_72%,#06142b_100%)]" />
            <div className="animate-float-slow absolute -left-20 top-0 h-[28rem] w-[28rem] rounded-full bg-[#1fc8f0]/18 blur-[110px]" />
            <div className="animate-float-slower absolute right-[-8rem] top-16 h-[32rem] w-[32rem] rounded-full bg-[#1b89ff]/14 blur-[130px]" />
            <div className="animate-pulse-glow absolute bottom-[-6rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#23b7df]/14 blur-[110px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-[18%] top-[24%] h-2 w-2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
            <div className="absolute left-[76%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#86ecff]/80 shadow-[0_0_16px_rgba(134,236,255,0.9)]" />
            <div className="absolute right-[14%] top-[58%] h-2 w-2 rounded-full bg-white/60 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
            <div className="absolute left-[22%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-[#86ecff]/70 shadow-[0_0_16px_rgba(134,236,255,0.85)]" />
            {!reduce && (
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M86 372C206 438 352 426 470 326C587 226 700 118 922 152"
                  fill="none"
                  stroke="rgba(159,239,255,0.55)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 12"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
              </svg>
            )}

          </div>

          <div className="relative flex flex-col items-center px-6">
            <motion.div
              className="relative rounded-[34px] border border-white/14 bg-white/[0.06] px-8 py-8 shadow-[0_32px_90px_rgba(2,10,26,0.5)] backdrop-blur-[18px] sm:px-12 sm:py-10"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-[1px] rounded-[33px] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]" />
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-[34px] border border-[#6de6ff]/30"
                animate={reduce ? {} : { opacity: [0.4, 0.85, 0.4], scale: [1, 1.015, 1] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative"
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              >
                <BrandMark className="h-24 w-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.38)] sm:h-28 lg:h-32" />
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-7 text-center font-script text-[2rem] text-[#8fe8ff] sm:text-[2.5rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Discover the Hidden Soul of Uttarakhand
            </motion.p>

            <motion.p
              className="mt-2 max-w-xl text-center text-sm font-medium tracking-[0.16em] text-white/60 uppercase sm:text-[0.9rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Mountains, culture, soulful journeys
            </motion.p>

            {!reduce && (
              <div className="mt-8 h-[4px] w-52 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#88e7ff] via-[#23b7df] to-[#0e82ff] shadow-[0_0_22px_rgba(35,183,223,0.7)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: duration / 1000 - 0.4, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
