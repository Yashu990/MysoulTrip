import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Whatsapp, ChevronDown } from './icons'

const WHATSAPP_NUMBER = '918368479749' // +91 8368479749
const WHATSAPP_MSG = encodeURIComponent("Hi MySoulTrip! I'd like to plan a trip to Uttarakhand.")

/**
 * Persistent conversion helpers, fixed bottom-right:
 * - WhatsApp chat (always visible) — the expected quick-contact for an Indian travel brand.
 * - Back-to-top (appears once the user scrolls down).
 */
export default function FloatingActions() {
  const reduce = useReducedMotion()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col items-center gap-3 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={scrollTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ y: -3 }}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/5 bg-white text-navy-800 shadow-[0_10px_28px_rgba(15,31,61,0.18)] transition hover:text-gold-600"
          >
            <ChevronDown className="h-5 w-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
      >
        {!reduce && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        )}
        <Whatsapp className="relative h-7 w-7" />
        <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          WhatsApp us
        </span>
      </a>
    </div>
  )
}
