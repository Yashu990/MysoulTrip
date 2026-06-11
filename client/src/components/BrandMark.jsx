import { useEffect, useState } from 'react'

/**
 * Renders the logo with its white JPG background knocked out at runtime, so the
 * dark navy + gold mark floats cleanly on LIGHT surfaces (cream/white) instead
 * of showing a pasted white rectangle.
 *
 * Only use this on light backgrounds — the logo ink is dark, so a transparent
 * version would vanish on dark surfaces (there, keep the white card).
 * Falls back to the original image if canvas processing fails.
 */
export default function BrandMark({
  src = '/images/mysoultrip-logo-premium.jpg',
  alt = 'MySoulTrip',
  className = '',
  threshold = 236, // pixels brighter than this (in every channel) become transparent
  feather = 22, // soft alpha ramp just below the threshold for clean edges
  onDark = false, // recolour the dark navy ink to white (keeps gold) for dark backgrounds
}) {
  const [out, setOut] = useState(src)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imageData.data
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]
          const min = Math.min(r, g, b) // how "white" the pixel is
          if (min >= threshold) {
            d[i + 3] = 0
            continue
          }
          if (min > threshold - feather) {
            d[i + 3] = Math.round((255 * (threshold - min)) / feather)
          }
          if (onDark) {
            // Keep warm/gold ink; turn cool/dark (navy) ink into near-white.
            const warm = r > b + 25 && r > 110
            if (!warm) {
              d[i] = 244
              d[i + 1] = 247
              d[i + 2] = 252
            }
          }
        }
        ctx.putImageData(imageData, 0, 0)
        if (!cancelled) setOut(canvas.toDataURL('image/png'))
      } catch {
        /* keep original src on any error (e.g. canvas tainted) */
      }
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src, threshold, feather, onDark])

  return <img src={out} alt={alt} className={className} decoding="async" />
}
