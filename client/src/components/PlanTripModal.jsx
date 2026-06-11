import { useEffect, useState } from 'react'
import { motion, Typewriter } from './motion'
import FallingLeaves from './FallingLeaves'

export default function PlanTripModal({ open, onClose, onSubmit, preset }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', travelers: '2' })

  // Lock background scroll while the modal is open (no scrollbar behind it).
  // Compensate for the removed scrollbar width so the page doesn't jump.
  useEffect(() => {
    if (!open) return
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPad
    }
  }, [open])

  if (!open) return null
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const inputClass =
    'w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-navy-800 transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40'

  return (
    <div className="no-scrollbar fixed inset-0 z-[70] grid place-items-center overflow-y-auto p-4" role="dialog" aria-modal="true">
      {/* Animated scene backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-navy-900/85 via-navy-800/80 to-[#2a1d08]/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold-500/20 blur-[90px]" />
        <div className="animate-float-slower absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-[#e0795b]/15 blur-[100px]" />
      </div>
      <FallingLeaves />

      {/* Glass form card */}
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white/85 shadow-[0_30px_80px_rgba(10,23,48,0.5)] ring-1 ring-white/40 backdrop-blur-2xl"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        {/* Header with animated glow + typewriter heading */}
        <div className="relative overflow-hidden bg-gradient-to-r from-navy-800 to-navy-700 px-6 py-5">
          <span aria-hidden className="animate-float-slow absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/25 blur-2xl" />
          <h3 className="relative text-lg font-extrabold text-white">
            <Typewriter text="Plan Your Trip" speed={70} />
          </h3>
          <p className="relative mt-0.5 text-xs text-white/70">Tell us a little and our team reaches out within 24 hours.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit?.(form)
          }}
          className="space-y-4 p-6"
        >
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy-700">Full Name</label>
            <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="Your name" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy-700">Email</label>
            <input required type="email" value={form.email} onChange={set('email')} className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy-700">Phone</label>
            <input required value={form.phone} onChange={set('phone')} className={inputClass} placeholder="+91 ..." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy-700">Destination</label>
            <input value={form.destination || preset?.title || ''} onChange={set('destination')} className={inputClass} placeholder="Where to?" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy-700">Travelers</label>
            <select value={form.travelers} onChange={set('travelers')} className={inputClass}>
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5">5+ Travelers</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.96 }}
              className="flex-1 rounded-md bg-gold-500 px-4 py-2.5 text-sm font-bold text-navy-900 shadow-[0_10px_24px_rgba(237,174,43,0.4)] transition hover:bg-gold-400"
            >
              Submit
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
