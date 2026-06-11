/**
 * Drop-in <img> replacement that serves a WebP version when the browser
 * supports it and falls back to the original JPEG/PNG otherwise (zero
 * compatibility risk). The .webp sibling is produced by scripts/optimize-images.
 *
 * All <img> attributes (className, loading, width, style, draggable…) pass
 * straight through to the underlying image element.
 */
export default function Img({ src, alt = '', ...imgProps }) {
  const webp =
    typeof src === 'string' && /\.(jpe?g|png)$/i.test(src)
      ? src.replace(/\.(jpe?g|png)$/i, '.webp')
      : null

  if (!webp) return <img src={src} alt={alt} {...imgProps} />

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} {...imgProps} />
    </picture>
  )
}
