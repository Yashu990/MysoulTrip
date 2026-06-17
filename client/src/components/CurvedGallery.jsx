import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from './icons'
import Img from './Img'

/**
 * 3D "coverflow" gallery — images sit on a concave arc, the centre one facing
 * the viewer while the sides angle back in 3D. Click a side image, use the
 * arrows, drag, or the arrow keys to rotate through. Pure CSS 3D + Framer
 * Motion (no GSAP needed). Falls back to a flat centred image under
 * prefers-reduced-motion.
 */
export default function CurvedGallery({ images = [], captions = [] }) {
  const reduce = useReducedMotion()
  const count = images.length
  const [active, setActive] = useState(Math.floor(count / 2))

  const goTo = useCallback((i) => setActive(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(active + 1), [goTo, active])
  const prev = useCallback(() => goTo(active - 1), [goTo, active])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  if (!count) return null

  return (
    <div className="relative">
      {/* Stage */}
      <div
        className="relative mx-auto flex h-[22rem] w-full max-w-[60rem] items-center justify-center sm:h-[26rem]"
        style={{ perspective: '1600px' }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next()
            else if (info.offset.x > 60) prev()
          }}
        >
          {images.map((src, i) => {
            // Shortest signed distance from the active card (handles wrap-around).
            let r = i - active
            if (r > count / 2) r -= count
            if (r < -count / 2) r += count
            const abs = Math.abs(r)
            const hidden = abs > 2.5

            const transform = reduce
              ? { x: r * 20, opacity: r === 0 ? 1 : 0 }
              : {
                  x: r * 190,
                  z: -abs * 140,
                  rotateY: -r * 38,
                  scale: r === 0 ? 1 : 0.86,
                  opacity: hidden ? 0 : 1,
                }

            return (
              <motion.button
                key={src}
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className="absolute left-1/2 top-1/2 h-[18rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl ring-1 ring-white/15 sm:h-[22rem] sm:w-[15rem]"
                style={{ transformStyle: 'preserve-3d', zIndex: 20 - abs, cursor: r === 0 ? 'grab' : 'pointer' }}
                animate={transform}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                <Img
                  src={src}
                  alt={captions[i] || `Gallery ${i + 1}`}
                  draggable={false}
                  loading="lazy"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  style={{ filter: r === 0 ? 'none' : 'brightness(0.6) saturate(0.9)' }}
                />
                {/* Gold ring + caption only on the centred image */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-300"
                  style={{ boxShadow: r === 0 ? 'inset 0 0 0 2px rgba(237,174,43,0.8)' : 'none' }}
                />
                {r === 0 && captions[i] && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-4 text-left">
                    <p className="text-sm font-extrabold text-white">{captions[i]}</p>
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous image"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-900"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? '1.75rem' : '0.5rem',
                background: i === active ? '#23b7df' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next image"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-navy-900"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
