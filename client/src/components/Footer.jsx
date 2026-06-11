import { useState } from 'react'
import Logo from './Logo'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Whatsapp } from './icons'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Packages', href: '/#tours' },
  { label: 'Group Tours', href: '/#tours' },
  { label: 'Spiritual Retreats', href: '/#experiences' },
  { label: 'Blog', href: '/#stories' },
  { label: 'About Us', href: '/#why' },
  { label: 'Contact Us', href: '/contact-us' },
]

const topDest = [
  { label: 'Dwarahat', href: '/destinations' },
  { label: 'Almora', href: '/destinations' },
  { label: 'Jageshwar', href: '/destinations' },
  { label: 'Binsar', href: '/destinations' },
  { label: 'Patal Bhuvaneshwar', href: '/destinations' },
  { label: 'Masi', href: '/destinations' },
  { label: 'Bhimtal', href: '/destinations' },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Whatsapp, label: 'WhatsApp' },
]

function Col({ title, items }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-white">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="text-sm text-white/60 transition hover:text-gold-400">{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('')

  return (
    <footer id="footer" className="bg-navy-900 text-white/70">
      <div className="section-shell grid grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            We create meaningful journeys that connect you with the hidden soul of Uttarakhand.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-900"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <Col title="Quick Links" items={quickLinks} />
        <Col title="Top Destinations" items={topDest} />

        <div className="col-span-2 md:col-span-1">
          <h4 className="mb-4 text-sm font-bold text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-400" /> 8368479749</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-400" /> info@mysoultrip.in</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold-400" /> Dwarahat, Almora<br />Uttarakhand, India</li>
          </ul>

          <h4 className="mb-1 mt-6 text-sm font-bold text-white">Stay Updated</h4>
          <p className="mb-3 text-xs text-white/50">Subscribe to our newsletter</p>
          <form onSubmit={(e) => { e.preventDefault(); onSubscribe?.(email); setEmail('') }} className="space-y-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/40 ring-1 ring-white/15 focus:outline-none focus:ring-gold-500/50"
            />
            <button className="w-full rounded-md bg-gold-500 px-4 py-2.5 text-xs font-bold tracking-wide text-navy-900 transition hover:bg-gold-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} MySoulTrip LLP. All Rights Reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-gold-400">Privacy Policy</a>
            <a href="#" className="transition hover:text-gold-400">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
