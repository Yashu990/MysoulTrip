import { motion } from 'framer-motion'

/**
 * Friendly animated chat-bot mascot (gold face, navy features) — antenna wiggle,
 * blinking eyes and a gentle idle bob. Pure SVG + Framer Motion, scales crisply.
 */
export default function BotIcon({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      animate={{ y: [0, -1.5, 0] }}
      transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
      aria-hidden
    >
      <defs>
        <linearGradient id="botFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fe4f6" />
          <stop offset="1" stopColor="#23b7df" />
        </linearGradient>
      </defs>

      {/* Antenna */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
        animate={{ rotate: [-9, 9, -9] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <line x1="32" y1="14" x2="32" y2="6" stroke="#63d1ea" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="32" cy="4.5" r="3" fill="#0f1f3d" />
        <circle cx="32" cy="4.5" r="3" fill="#fff" opacity="0.25" />
      </motion.g>

      {/* Ears */}
      <rect x="8" y="28" width="6" height="12" rx="3" fill="#179fc8" />
      <rect x="50" y="28" width="6" height="12" rx="3" fill="#179fc8" />

      {/* Head */}
      <rect x="13" y="14" width="38" height="36" rx="14" fill="url(#botFace)" />
      <rect x="13" y="14" width="38" height="36" rx="14" fill="#fff" opacity="0.08" />

      {/* Eyes (blink) */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{ scaleY: [1, 1, 0.12, 1] }}
        transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.9, 0.95, 1], ease: 'easeInOut' }}
      >
        <circle cx="25" cy="31" r="3.6" fill="#0f1f3d" />
        <circle cx="39" cy="31" r="3.6" fill="#0f1f3d" />
        <circle cx="26.2" cy="29.8" r="1.1" fill="#fff" />
        <circle cx="40.2" cy="29.8" r="1.1" fill="#fff" />
      </motion.g>

      {/* Smile */}
      <path d="M24 38 Q32 45 40 38" stroke="#0f1f3d" strokeWidth="2.6" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <circle cx="20" cy="38" r="2" fill="#179fc8" opacity="0.5" />
      <circle cx="44" cy="38" r="2" fill="#179fc8" opacity="0.5" />

      {/* Chat-bubble tail */}
      <path d="M18 47 L14 56 L26 49 Z" fill="url(#botFace)" />
    </motion.svg>
  )
}
