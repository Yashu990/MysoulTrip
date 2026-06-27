import { Check, Compass, Sparkle } from './icons'
import { themedTourPages } from '../data/themedTours'

function ScriptHeading({ children }) {
  return <p className="font-script text-[30px] leading-none text-[#29b9df]">{children}</p>
}

export default function ThemedTourPage({ pageId, onPlan }) {
  const page = themedTourPages[pageId]

  if (!page) return null

  return (
    <main className="bg-[linear-gradient(180deg,#f8fdff_0%,#eef8fb_40%,#ffffff_100%)] text-[#071734]">
      <section className="relative overflow-hidden px-4 pb-20 pt-18 sm:px-6 sm:pt-24">
        <div className="pointer-events-none absolute left-[-70px] top-16 h-56 w-56 rounded-full bg-[#8fe4f6]/35 blur-3xl" />
        <div className="pointer-events-none absolute right-[-90px] top-40 h-72 w-72 rounded-full bg-[#dff6b6]/35 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1260px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <ScriptHeading>{page.heroKicker}</ScriptHeading>
            <h1 className="mt-3 max-w-[11ch] text-[2.9rem] font-extrabold leading-[1.02] tracking-tight text-[#071734] sm:text-[4.3rem]">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-[#42516b] sm:text-[1.08rem]">
              {page.subtitle}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {page.quickFacts.map((fact) => (
                <article key={fact.label} className="rounded-[24px] border border-white/80 bg-white/88 p-5 shadow-[0_18px_38px_rgba(6,24,54,0.08)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#23b7df]">{fact.label}</div>
                  <div className="mt-3 text-sm font-extrabold leading-6 text-[#071734]">{fact.value}</div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onPlan}
                className="rounded-2xl bg-[#23b7df] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_35px_rgba(35,183,223,0.28)] transition hover:bg-[#17acd6]"
              >
                Plan This Trip
              </button>
              <a
                href="/contact-us"
                className="rounded-2xl border border-[#16294f]/16 bg-white px-7 py-4 text-sm font-bold text-[#071734] shadow-[0_14px_28px_rgba(6,24,54,0.06)] transition hover:border-[#23b7df] hover:text-[#23b7df]"
              >
                Talk to an Expert
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] shadow-[0_28px_70px_rgba(6,24,54,0.18)]">
            <img src={page.image} alt={page.title} className="h-[380px] w-full object-cover sm:h-[520px]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,54,0.04),rgba(6,24,54,0.48))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/92 backdrop-blur">
                <Compass className="h-4 w-4" />
                Signature tour page
              </div>
              <div className="mt-4 max-w-[18ch] text-2xl font-extrabold leading-tight sm:text-[2rem]">
                Premium routes, better stays, and a journey that feels intentional.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1260px] gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[30px] bg-[#071734] p-8 text-white shadow-[0_24px_60px_rgba(7,23,52,0.22)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/82">
              <Sparkle className="h-4 w-4 text-[#75e5ff]" />
              Why travelers love it
            </div>
            <h2 className="mt-5 text-[2rem] font-extrabold leading-tight">A better-paced Uttarakhand trip with personality</h2>
            <div className="mt-6 space-y-4">
              {page.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-7 text-white/80">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/12 text-[#7ee6ff]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            {page.sections.map((section) => (
              <article key={section.title} className="rounded-[28px] border border-[#d7edf4] bg-white p-6 shadow-[0_18px_40px_rgba(6,24,54,0.08)]">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#23b7df]">Experience design</div>
                <h3 className="mt-3 text-[1.5rem] font-extrabold leading-tight text-[#071734]">{section.title}</h3>
                <div className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm leading-7 text-[#4d5f79]">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dff6fb] text-[#1d9fc7]">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
