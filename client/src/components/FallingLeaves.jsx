import { useReducedMotion } from 'framer-motion'

/**
 * Ambient drifting leaves — a lightweight CSS-animated background layer that
 * gives forms a "living scene" feel (like the glass-login reference) without
 * any heavy WebGL. Leaves fall + sway with staggered timing. Purely decorative;
 * hidden entirely under prefers-reduced-motion.
 */

// Brand-warm autumn-Himalaya palette.
const COLORS = ['#edae2b', '#f5bc4a', '#d99211', '#e0795b', '#c9912f']

// Hand-tuned variety so it never looks like a uniform grid.
const LEAVES = [
  { left: 6, size: 18, dur: 11, delay: 0, sway: 5, color: 0, spin: 320 },
  { left: 16, size: 13, dur: 14, delay: 3, sway: 6.5, color: 1, spin: -300 },
  { left: 27, size: 22, dur: 9.5, delay: 1.5, sway: 4.5, color: 2, spin: 360 },
  { left: 38, size: 15, dur: 13, delay: 5, sway: 7, color: 3, spin: -340 },
  { left: 47, size: 11, dur: 16, delay: 2, sway: 5.5, color: 0, spin: 300 },
  { left: 58, size: 20, dur: 10.5, delay: 4, sway: 4, color: 4, spin: -360 },
  { left: 67, size: 14, dur: 12.5, delay: 0.8, sway: 6, color: 1, spin: 330 },
  { left: 76, size: 17, dur: 15, delay: 6, sway: 7.5, color: 2, spin: -310 },
  { left: 85, size: 12, dur: 11.5, delay: 2.6, sway: 5, color: 3, spin: 350 },
  { left: 93, size: 19, dur: 13.5, delay: 4.5, sway: 4.8, color: 0, spin: -330 },
  { left: 33, size: 10, dur: 17, delay: 7, sway: 8, color: 4, spin: 360 },
  { left: 71, size: 16, dur: 10, delay: 1.2, sway: 5.2, color: 1, spin: -350 },
]

function Leaf({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.12))' }}>
      <path
        d="M12 2C7 5 4 9 4 14c0 4 3 8 8 8 1-6 0-11-4-15 5 2 8 6 8 12 3-3 4-7 4-11 0-3-3-5-8-6Z"
        fill={color}
        opacity="0.92"
      />
      <path d="M12 22C11 16 9 11 5 8" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

export default function FallingLeaves({ className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return null

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${l.left}%`,
            animation: `leaf-fall ${l.dur}s linear ${l.delay}s infinite`,
          }}
        >
          <span
            className="block"
            style={{
              animation: `leaf-sway ${l.sway}s ease-in-out ${l.delay}s infinite alternate`,
              ['--spin']: `${l.spin}deg`,
            }}
          >
            <Leaf color={COLORS[l.color]} size={l.size} />
          </span>
        </span>
      ))}
    </div>
  )
}
