// Lightweight inline SVG icons (stroke = currentColor) so we avoid an icon dep.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Phone = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Search = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export const Calendar = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

export const Users = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export const MapPin = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const Star = ({ filled = true, ...p }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export const Shield = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const Tag = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

export const Headset = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)

export const Sliders = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
  </svg>
)

export const Compass = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
  </svg>
)

export const Play = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
)

export const Clock = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

export const Check = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export const Mail = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)

export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
)

export const Facebook = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300c-1.2 0-1.6.8-1.6 1.6v1.8H17l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" />
  </svg>
)

export const Youtube = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C19 4.8 12 4.8 12 4.8s-7 0-8.8.4A2.6 2.6 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.8.4 8.8.4 8.8.4s7 0 8.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-5 .4-5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
  </svg>
)

export const Whatsapp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6 8.9a4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3z" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const ChevronDown = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronLeft = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const ChevronRight = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const Heart = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 21s-6.7-4.3-9.3-8.5C1 9.4 2.3 5.8 5.6 5.1c1.9-.4 3.7.5 4.7 2 .9-1.5 2.8-2.4 4.7-2 3.3.7 4.6 4.3 2.9 7.4C18.7 16.7 12 21 12 21z" />
  </svg>
)

export const Mountain = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
)

export const Leaf = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
)

export const Lotus = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3c1.8 2 2.6 4 2.6 6.5 0 1.6-1 3-2.6 3.6-1.6-.6-2.6-2-2.6-3.6C9.4 7 10.2 5 12 3z" />
    <path d="M5 9c2.4.4 4 1.6 4.8 3.4M19 9c-2.4.4-4 1.6-4.8 3.4" />
    <path d="M3 13c3 4 6 5 9 5s6-1 9-5c-2 0-3.5.4-5 1.2" />
  </svg>
)

export const Hiking = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="13" cy="4" r="1.8" />
    <path d="M11 8l-2 4 3 2 1 6M11 8l3 1 2 3M9 12l-2 8M16 7v14" />
  </svg>
)

export const Tree = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 2 6 9h3l-4 5h4l-3 4h12l-3-4h4l-4-5h3L12 2z" />
    <path d="M12 18v4" />
  </svg>
)

export const Home = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
)

export const Sun = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const ShieldCheck = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
)

export const Seat = (p) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 18v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5M6 11V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M4 18h16M7 18v2M17 18v2" />
  </svg>
)

