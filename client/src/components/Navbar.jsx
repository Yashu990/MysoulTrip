import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ChevronDown } from './icons'
import { themedTourLinks } from '../data/themedTours'

const destinationLinks = [
  { label: 'All Destinations', href: '/destinations', page: 'destinations' },
  { label: 'Spiritual Destinations', href: '/destinations/spiritual', page: 'spiritual' },
]

const links = [
  { label: 'Home', href: '/' },
  { label: 'Why Choose Us', href: '/why-choose-us', page: 'why-choose-us' },
  { label: 'Tours', href: '/bike-tour-uttarakhand-explore', page: 'tours', caret: true, children: themedTourLinks },
  { label: 'Destinations', href: '/destinations', caret: true, page: 'destinations', children: destinationLinks },
  { label: 'Packages', href: '/packages', page: 'packages' },
  { label: 'Group Tours', href: '/group-tours', page: 'group-tours' },
  { label: 'Blog', href: '/blog', page: 'blog' },
  { label: 'Contact Us', href: '/contact-us', page: 'contact' },
]

function isActiveLink(link, currentPage) {
  if (link.page === 'destinations') return currentPage === 'destinations' || currentPage === 'spiritual'
  if (link.page === 'blog') return currentPage === 'blog' || currentPage === 'blog-post'
  if (link.page === 'packages') return currentPage === 'packages' || currentPage === 'package-detail'
  if (link.page === 'tours') return currentPage === 'bike-tour' || currentPage === 'family-tour' || currentPage === 'solo-trip'
  if (link.page) return currentPage === link.page
  if (link.href === '/') return currentPage === 'home'
  return false
}

export default function Navbar({ currentPage = 'home', onEnquire }) {
  const [open, setOpen] = useState(false)
  const [mobileToursOpen, setMobileToursOpen] = useState(false)
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
            if (l.children) {
              return (
                <div key={l.label} className="group relative">
                  <a
                    href={l.href}
                    className={`relative flex items-center gap-1 py-1 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:rounded-full after:bg-gold-500 after:transition-all after:duration-300 ${
                      active
                        ? 'text-gold-600 after:w-full'
                        : 'text-navy-700 hover:text-gold-600 after:w-0 group-hover:after:w-full'
                    }`}
                  >
                    {l.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform group-hover:rotate-180 ${active ? 'opacity-80' : 'opacity-50'}`} />
                  </a>
                  <div className="invisible absolute left-0 top-full z-30 w-[300px] translate-y-3 rounded-2xl border border-slate-200 bg-white/96 p-2 opacity-0 shadow-[0_20px_45px_rgba(6,24,54,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                    {l.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#0a1730] transition hover:bg-[#ecf8fd] hover:text-[#23b7df]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

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
        <nav className="grid gap-2 border-t border-gray-100 bg-white px-6 py-4 text-sm font-medium text-navy-700 lg:hidden">
          {links.map((l) => {
            if (l.children) {
              const isTours = l.page === 'tours'
              const isOpen = isTours ? mobileToursOpen : mobileDestinationsOpen
              const toggleOpen = () => {
                if (isTours) setMobileToursOpen((v) => !v)
                else setMobileDestinationsOpen((v) => !v)
              }

              return (
                <div key={l.label} className="rounded-xl border border-slate-100 bg-slate-50/60 px-2 py-2">
                  <button
                    type="button"
                    onClick={toggleOpen}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left font-semibold text-[#0a1730]"
                  >
                    <span>{l.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="mt-1 grid gap-1 pb-1">
                      {l.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-semibold text-[#3c4f69] hover:bg-white hover:text-[#23b7df]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:text-gold-600">
                {l.label}
              </a>
            )
          })}
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
