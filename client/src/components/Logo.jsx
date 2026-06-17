import BrandMark from './BrandMark'

export default function Logo({ light = false }) {
  // On dark surfaces (light=true) keep the white card so the navy ink stays
  // readable. On light surfaces use the transparent knockout so it floats clean.
  return (
    <a href="/" className="inline-flex items-center">
      {light ? (
        <BrandMark onDark alt="MySoulTrip logo" className="block h-20 w-auto sm:h-24 lg:h-28" />
      ) : (
        <BrandMark alt="MySoulTrip logo" className="block h-16 w-auto sm:h-20 lg:h-24" />
      )}
    </a>
  )
}
