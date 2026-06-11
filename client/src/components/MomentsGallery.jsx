import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CurvedGallery from './CurvedGallery'
import { Reveal } from './motion'

/**
 * Dark "stage" section that hosts the 3D curved gallery — mirrors the moody
 * backdrop of the reference so the angled images pop.
 */
export default function MomentsGallery({ images = [], captions = [] }) {
  // Only mount the heavy 3D stage once the section is near the viewport.
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '300px' })

  if (!images.length) return null
  return (
    <section id="gallery" ref={ref} className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
      </div>

      <div className="section-shell relative px-4 sm:px-6">
        <Reveal y={20} className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-300">Glimpses</p>
          <h2 className="mt-2 font-display text-[2rem] font-bold leading-tight text-white sm:text-[2.6rem]">
            Moments from the Mountains
          </h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Drag, swipe or tap to explore frames from our Himalayan journeys.
          </p>
        </Reveal>

        {inView ? (
          <CurvedGallery images={images} captions={captions} />
        ) : (
          <div className="h-[22rem] sm:h-[26rem]" aria-hidden />
        )}
      </div>
    </section>
  )
}
