import { useState } from 'react'

export default function PlanTripModal({ open, onClose, onSubmit, preset }) {
  const [form, setForm] = useState({ name: '', phone: '', destination: '', travelers: '2' })
  if (!open) return null
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 px-6 py-5">
          <h3 className="text-lg font-extrabold text-white">Plan Your Trip</h3>
          <p className="text-xs text-white/70 mt-0.5">Tell us a little and our team reaches out within 24 hours.</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onSubmit?.(form) }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-navy-700 mb-1">Full Name</label>
            <input required value={form.name} onChange={set('name')} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-navy-700 mb-1">Phone</label>
            <input required value={form.phone} onChange={set('phone')} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" placeholder="+91 ..." />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-navy-700 mb-1">Destination</label>
            <input value={form.destination || preset?.title || ''} onChange={set('destination')} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" placeholder="Where to?" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-navy-700 mb-1">Travelers</label>
            <select value={form.travelers} onChange={set('travelers')} className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40">
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5">5+ Travelers</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-semibold text-navy-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-md bg-gold-500 hover:bg-gold-600 px-4 py-2.5 text-sm font-bold text-navy-900">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
