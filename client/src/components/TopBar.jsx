import { Heart, Mail, Phone, Instagram, Facebook, Youtube } from './icons'

export default function TopBar() {
  return (
    <div className="hidden bg-navy-900 text-xs text-white/80 md:block">
      <div className="section-shell flex h-9 items-center justify-between px-4 sm:px-6">
        <p className="flex items-center gap-2">
          Discover the Hidden Soul of Uttarakhand
          <Heart className="h-3.5 w-3.5 text-gold-400" />
        </p>
        <div className="flex items-center gap-5">
          <a href="mailto:info@mysoultrip.in" className="flex items-center gap-1.5 transition hover:text-gold-400">
            <Mail className="h-3.5 w-3.5" /> info@mysoultrip.in
          </a>
          <a href="tel:+918368479749" className="flex items-center gap-1.5 transition hover:text-gold-400">
            <Phone className="h-3.5 w-3.5" /> 8368479749
          </a>
          <span className="flex items-center gap-3 pl-1">
            <a href="#" aria-label="Instagram" className="transition hover:text-gold-400"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="transition hover:text-gold-400"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="transition hover:text-gold-400"><Youtube className="h-4 w-4" /></a>
          </span>
        </div>
      </div>
    </div>
  )
}
