import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ChevronDown } from './icons'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations', caret: true, page: 'destinations' },
  { label: 'Packages', href: '/packages', page: 'packages' },
  { label: 'Group Tours', href: '/group-tours', page: 'group-tours' },
  { label: 'Blog', href: '/blog', page: 'blog' },
  { label: 'Contact Us', href: '/contact-us', page: 'contact' },
]

function isActiveLink(link, currentPage) {
  if (link.page === 'destinations') return currentPage === 'destinations' || currentPage === 'spiritual'
  if (link.page === 'blog') return currentPage === 'blog' || currentPage === 'blog-post'
  if (link.page === 'packages') return currentPage === 'packages' || currentPage === 'package-detail'
  if (link.page) return currentPage === link.page
  if (link.href === '/') return currentPage === 'home'
  // Section-scroll links (/#...) are not pages — never force them "active".
  return false
}

export default function Navbar({ currentPage = 'home', onEnquire }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Shrink + intensify the bar once the user scrolls past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-black/5 bg-white/90 shadow-[0_10px_30px_rgba(15,31,61,0.10)] backdrop-blur-md'
          : 'border-transparent bg-white/95 shadow-[0_12px_30px_rgba(15,31,61,0.04)] backdrop-blur'
      }`}
    >
      <div
        className={`section-shell flex items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? 'h-[66px]' : 'h-[86px]'
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-9 text-[14px] font-semibold text-navy-700 lg:flex">
          {links.map((l) => {
            const active = isActiveLink(l, currentPage)
            return (
              <a
                key={l.label}
                href={l.href}
                className={`relative flex items-center gap-1 py-1 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 ${
                  active
                    ? 'text-gold-600 after:w-full'
                    : 'text-navy-700 hover:text-gold-600 after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
                {l.caret && <ChevronDown className={`h-3.5 w-3.5 transition-transform ${active ? 'opacity-80' : 'opacity-50'}`} />}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnquire}
            className="hidden rounded-lg bg-gold-500 px-5 py-3 text-sm font-extrabold text-navy-900 shadow-sm transition hover:bg-gold-600 hover:shadow-md sm:inline-flex"
          >
            Enquire Now
          </button>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-navy-800 hover:bg-gray-100 lg:hidden"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-3 border-t border-gray-100 bg-white px-6 py-4 text-sm font-medium text-navy-700 lg:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="hover:text-gold-600">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              onEnquire?.()
            }}
            className="mt-2 rounded-md bg-gold-500 px-5 py-2.5 text-xs font-bold tracking-wide text-navy-900"
          >
            Enquire Now
          </button>
        </nav>
      )}
    </header>
  )
}
