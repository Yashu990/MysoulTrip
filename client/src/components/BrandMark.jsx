export default function BrandMark({
  src = '/images/mysoultrip-logo-latest.png',
  alt = 'MySoulTrip',
  className = '',
  onDark = false,
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${onDark ? 'brightness-110 contrast-110' : ''}`}
      decoding="async"
    />
  )
}
