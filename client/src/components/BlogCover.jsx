import { Lotus, Mountain, Compass, Leaf, Sparkle, MapPin, Sun } from './icons'

/**
 * Generative scenic cover art for blog posts — no photos.
 * Each theme is a gradient "sky" with a glowing sun/moon and layered Himalayan
 * mountain silhouettes, so every post gets a unique, crisp, on-brand cover.
 */
const THEMES = {
  spiritual: { sky: ['#fbe7c0', '#f5bc4a', '#d99211'], far: '#9a6a1f', mid: '#5a3d12', near: '#2a1c08', sun: '#fff4d6', icon: Lotus },
  destinations: { sky: ['#dbeafe', '#7fa9e0', '#3a5f96'], far: '#2f4d7a', mid: '#1d3358', near: '#0c1a30', sun: '#eaf3ff', icon: MapPin },
  guides: { sky: ['#ece3f6', '#a98fd0', '#6b4ea0'], far: '#553d80', mid: '#3a2a5a', near: '#1a1230', sun: '#f3ecff', icon: Compass },
  culture: { sky: ['#ffe2d0', '#f0a07a', '#cf6a44'], far: '#a04e2e', mid: '#6e351c', near: '#371a0f', sun: '#fff0e6', icon: Sparkle },
  nature: { sky: ['#d8f3e6', '#6fc6a0', '#2f8d6b'], far: '#246b50', mid: '#174636', near: '#0b261c', sun: '#eafff6', icon: Leaf },
  wellness: { sky: ['#dff1fb', '#88c6ee', '#3f8fc0'], far: '#2f6f97', mid: '#1d4763', near: '#0a2230', sun: '#eef9ff', icon: Mountain },
}

export default function BlogCover({ theme = 'destinations', className = '', big = false }) {
  const t = THEMES[theme] || THEMES.destinations
  const Icon = t.icon

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(180deg, ${t.sky[0]} 0%, ${t.sky[1]} 45%, ${t.sky[2]} 100%)` }}
    >
      {/* Sun / moon glow */}
      <div
        className="animate-pulse-glow absolute"
        style={{
          top: big ? '16%' : '20%',
          right: '18%',
          width: big ? 110 : 70,
          height: big ? 110 : 70,
          borderRadius: '9999px',
          background: t.sun,
          filter: 'blur(2px)',
          boxShadow: `0 0 60px 20px ${t.sun}`,
          opacity: 0.9,
        }}
      />

      {/* Drifting cloud wisps */}
      <div className="animate-float-slow absolute left-[8%] top-[26%] h-3 w-24 rounded-full bg-white/40 blur-md" />
      <div className="animate-float-slower absolute right-[30%] top-[40%] h-2.5 w-16 rounded-full bg-white/30 blur-md" />

      {/* Layered mountain silhouettes */}
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[72%] w-full">
        <path d="M0 130 L70 70 L120 110 L190 50 L250 100 L320 60 L400 120 L400 200 L0 200 Z" fill={t.far} opacity="0.55" />
        <path d="M0 160 L60 110 L110 145 L170 95 L230 140 L300 100 L360 140 L400 120 L400 200 L0 200 Z" fill={t.mid} opacity="0.8" />
        <path d="M0 200 L0 175 L80 140 L150 175 L210 145 L280 180 L340 150 L400 178 L400 200 Z" fill={t.near} />
        {/* snow caps on the front-mid peaks */}
        <path d="M170 95 L160 108 L168 110 L178 102 Z" fill="#ffffff" opacity="0.85" />
        <path d="M300 100 L292 112 L300 114 L309 105 Z" fill="#ffffff" opacity="0.8" />
      </svg>

      {/* tiny birds */}
      <g>
        <svg className="absolute left-[24%] top-[30%] h-4 w-8 text-white/60" viewBox="0 0 24 8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M1 5 q3 -4 6 0 q3 -4 6 0" />
          <path d="M13 6 q2.5 -3 5 0" />
        </svg>
      </g>

      {/* category watermark icon */}
      <Icon className="absolute -bottom-3 -right-3 h-24 w-24 text-white/12" />

      {/* subtle top sheen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
    </div>
  )
}
