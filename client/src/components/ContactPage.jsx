import { useState } from 'react'
import { Headset, Mail, ShieldCheck, Phone, MapPin, Clock, Whatsapp, ArrowRight, Compass } from './icons'
import { Reveal, Stagger, StaggerItem, motion } from './motion'
import FallingLeaves from './FallingLeaves'

const trustPoints = [
  { icon: Headset, title: '24/7 Support', text: 'We are always here for you' },
  { icon: Mail, title: 'Quick Response', text: 'We reply within 24 hours' },
  { icon: ShieldCheck, title: 'Trusted & Reliable', text: 'Your satisfaction is our priority' },
]

const contactItems = [
  { icon: Phone, title: 'Phone', lines: ['+91 8368479749', '(24/7 Travel Support)'] },
  { icon: Mail, title: 'Email', lines: ['info@mysoultrip.in', 'We reply within 24 hours'] },
  { icon: MapPin, title: 'Office Address', lines: ['MySoulTrip Travel LLP', 'Dwarahat, Almora, Uttarakhand, India'] },
  { icon: Clock, title: 'Working Hours', lines: ['Mon - Sun: 9:00 AM - 8:00 PM', '(All Days Open)'] },
  { icon: Whatsapp, title: 'WhatsApp', lines: ['+91 8368479749', 'Chat with us on WhatsApp'] },
]

export default function ContactPage({ onPlan, onSubmitMessage }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const updateField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    onSubmitMessage?.(form)
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
  }

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_48%,#ffffff_100%)]">
      <section className="section-shell px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8">
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_18px_50px_rgba(15,31,61,0.12)] ring-1 ring-black/5">
          <img
            src="/images/contact-hero-banner-opt.jpg"
            alt="Peaceful Himalayan lakeside town in Uttarakhand"
            width="1600"
            height="640"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/78 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/18 to-transparent" />
          <FallingLeaves />

          <div className="relative grid min-h-[18rem] items-end px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[20rem] lg:max-w-[58%]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[3.1rem] font-bold uppercase leading-none tracking-tight text-navy-800 sm:text-[4.8rem]">
                Contact Us
              </p>
              <p className="mt-2 font-script text-[2.15rem] leading-none text-gold-600 sm:text-[2.85rem]">
                We'd Love to Hear from You!
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-800/82 sm:text-lg">
                Have a question, need travel advice, or want a custom trip? Our team is here to
                help you plan the perfect journey.
              </p>

              <Stagger className="mt-6 grid gap-4 md:grid-cols-3" stagger={0.1} delayChildren={0.2}>
                {trustPoints.map((item, index) => (
                  <StaggerItem key={item.title}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className={`flex h-full items-center gap-3 rounded-2xl bg-white/72 px-4 py-3 backdrop-blur-sm ${
                        index < trustPoints.length - 1 ? 'ring-1 ring-white/50' : 'ring-1 ring-white/40'
                      }`}
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-800 text-white">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-sm font-extrabold text-navy-800">{item.title}</span>
                        <span className="mt-1 block text-xs text-navy-800/65">{item.text}</span>
                      </span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </motion.div>
          </div>
        </div>
      </section>

      <Stagger className="section-shell grid gap-7 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[0.95fr_1.8fr_1.2fr]" stagger={0.14} amount={0.1}>
        <StaggerItem className="rounded-[1.6rem] bg-white px-5 py-6 shadow-[0_14px_40px_rgba(15,31,61,0.08)] ring-1 ring-black/5">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-[1.65rem] font-extrabold uppercase tracking-tight text-navy-800">Get in Touch</h2>
            <span className="mt-1 h-0.5 w-12 rounded bg-gold-500" />
          </div>

          <div className="space-y-5">
            {contactItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-800 text-white shadow-sm">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-navy-800">{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-relaxed text-navy-800/72">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-white/85 to-cream-50/80 px-5 py-6 shadow-[0_14px_40px_rgba(15,31,61,0.08)] ring-1 ring-white/50 backdrop-blur-xl sm:px-6">
          <FallingLeaves />
          <div className="relative z-10 mb-6 flex items-center gap-3">
            <h2 className="text-[1.65rem] font-extrabold uppercase tracking-tight text-navy-800">Send Us a Message</h2>
            <span className="mt-1 h-0.5 w-12 rounded bg-gold-500" />
          </div>

          <form onSubmit={submit} className="relative z-10 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                required
                value={form.name}
                onChange={updateField('name')}
                placeholder="Your Name"
                className="rounded-xl border border-[#e7e3d8] px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={updateField('email')}
                placeholder="Your Email"
                className="rounded-xl border border-[#e7e3d8] px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
              />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={updateField('phone')}
                placeholder="Phone Number"
                className="rounded-xl border border-[#e7e3d8] px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
              />
              <input
                type="text"
                value={form.subject}
                onChange={updateField('subject')}
                placeholder="Subject"
                className="rounded-xl border border-[#e7e3d8] px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
              />
            </div>

            <textarea
              required
              rows="6"
              value={form.message}
              onChange={updateField('message')}
              placeholder="Your Message"
              className="w-full rounded-xl border border-[#e7e3d8] px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ece5d6] bg-cream-50 px-4 py-3">
              <span className="text-sm font-semibold text-navy-800/80">We usually reply within 24 hours.</span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-navy-900"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </StaggerItem>

        <StaggerItem className="rounded-[1.6rem] bg-white px-5 py-6 shadow-[0_14px_40px_rgba(15,31,61,0.08)] ring-1 ring-black/5">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-[1.65rem] font-extrabold uppercase tracking-tight text-navy-800">Find Us Here</h2>
            <span className="mt-1 h-0.5 w-12 rounded bg-gold-500" />
          </div>

          <div className="overflow-hidden rounded-[1.2rem] ring-1 ring-black/5">
            <iframe
              title="MySoulTrip location map"
              src="https://www.google.com/maps?q=Dwarahat,Almora,Uttarakhand&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[18rem] w-full border-0"
            />
          </div>

          <div className="mt-4 rounded-[1.2rem] bg-navy-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-800 text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-extrabold text-navy-800">MySoulTrip Travel LLP</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-800/72">
                  Dwarahat, Almora, Uttarakhand, India
                </p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dwarahat+Almora+Uttarakhand"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-navy-900"
            >
              Directions <Compass className="h-4 w-4" />
            </a>
          </div>
        </StaggerItem>
      </Stagger>

      <section className="section-shell px-4 pb-10 pt-2 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-[#eee3ce] bg-white px-6 py-6 shadow-[0_10px_32px_rgba(15,31,61,0.06)] sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-navy-800 text-navy-800">
              <Compass className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[1.55rem] font-extrabold tracking-tight text-navy-800">Let's Plan Your Next Adventure!</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-800/72 sm:text-base">
                Share your travel plans and we'll create the perfect Uttarakhand itinerary for you.
              </p>
            </div>
          </div>

          <button
            onClick={onPlan}
            className="inline-flex items-center gap-2 rounded-xl border border-navy-800 px-6 py-3 text-sm font-extrabold text-navy-800 transition hover:bg-navy-800 hover:text-white"
          >
            Plan Your Trip <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  )
}
