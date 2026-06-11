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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_center,#fffdf8_0%,#fdf6e9_55%,#f7eed9_100%)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Soft gold glow + drifting aurora behind the mark */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(237,174,43,0.18),transparent_60%)]" />
            <div className="animate-float-slow absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-500/15 blur-[90px]" />
            <div className="animate-float-slower absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gold-300/20 blur-[100px]" />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Transparent floating logo */}
            <motion.div
              className="relative"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              >
                <BrandMark className="h-20 w-auto drop-shadow-[0_14px_30px_rgba(15,31,61,0.18)] sm:h-24" />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-6 font-script text-2xl text-gold-600 sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Discover the Hidden Soul of Uttarakhand
            </motion.p>

            {/* Loading bar */}
            {!reduce && (
              <div className="mt-7 h-[3px] w-44 overflow-hidden rounded-full bg-navy-900/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
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
