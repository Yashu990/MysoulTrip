import { Check, Compass, Heart, Hiking, Home, Leaf, Lotus, MapPin, Mountain, Sparkle, Users } from './icons'

const uspThemes = [
  {
    icon: Lotus,
    title: 'Spiritual & Wellness Tourism',
    image: '/images/generated/usp-himalayan-experience.png',
    glow: 'from-[#0a5f6e] via-[#1d92a7] to-[#b5eff5]',
    points: [
      'Deep spiritual immersion across ancient Himalayan temples and high-energy heritage sites.',
      'Authentic ashram experiences for slower, more meaningful self-reflection.',
      'Mind-body rejuvenation through guided yoga and meditation in serene mountain settings.',
    ],
  },
  {
    icon: Hiking,
    title: 'High-Octane Adventure Tour',
    image: '/images/dest-pandavkholi.jpg',
    glow: 'from-[#10386b] via-[#1c5cb0] to-[#91d4ff]',
    points: [
      'Thrill on demand with organized paragliding, river boating, and white-water rafting.',
      'End-to-end safety through certified instructors and premium gear support.',
      'Adventure days that still feel smooth, guided, and premium from pickup to return.',
    ],
  },
  {
    icon: Mountain,
    title: 'Specialized Himalayan Trekking',
    image: '/images/dest-dunagiri.jpg',
    glow: 'from-[#39521b] via-[#6e9c2e] to-[#d8ef9f]',
    points: [
      'Offbeat and iconic trails spanning mystical Pandavkholi and the wild terrain of Munsiyari.',
      'Treks for every level, from meadow walks to demanding high-altitude ridges.',
      'Locally grounded itineraries that blend scenery, story, and practical support.',
    ],
  },
]

const mobilityHighlights = [
  'Complete freedom of mobility with instant taxi, bike, and scooter rentals from your arrival point.',
  'Well-maintained vehicles built for both easy highway cruising and winding mountain roads.',
  'Flexible routing that lets you stay spontaneous without sacrificing support or comfort.',
]

const hospitalitySegments = [
  {
    icon: Users,
    title: 'Family-Friendly',
    image: '/images/generated/usp-family-friendly.png',
    description: 'Safe, spacious hotels with child-friendly amenities, flexible transport, and slow-paced itineraries for multigenerational travel.',
  },
  {
    icon: Heart,
    title: 'Couple-Friendly (18+)',
    image: '/images/generated/usp-couple-friendly.png',
    description: 'Premium homestays, starlit setups, and adult-only retreat options for couples seeking privacy, quiet, and beautiful mountain evenings.',
  },
  {
    icon: Home,
    title: 'Pet-Friendly',
    image: '/images/generated/usp-pet-friendly.png',
    description: 'Verified pet-friendly properties with open lawns, welcoming hosts, and space for your companion to enjoy the hills too.',
  },
]

function ScriptHeading({ children }) {
  return <p className="font-script text-[30px] leading-none text-[#29b9df]">{children}</p>
}

export default function WhyChooseUsPage({ onPlan }) {
  return (
    <main className="bg-[linear-gradient(180deg,#f7fcff_0%,#eef8fb_42%,#ffffff_100%)] text-[#071734]">
      <section className="relative overflow-hidden px-4 pb-24 pt-18 sm:px-6 sm:pt-24">
        <div className="pointer-events-none absolute left-[-90px] top-12 h-60 w-60 rounded-full bg-[#9fe7f3]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 right-[-80px] h-72 w-72 rounded-full bg-[#d7f2b2]/45 blur-3xl" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <ScriptHeading>Why Choose MySoulTrip</ScriptHeading>
              <h1 className="mt-3 max-w-[13ch] text-[2.8rem] font-extrabold leading-[1.02] tracking-tight text-[#071734] sm:text-[3.8rem]">
                The zero-compromise Uttarakhand experience
              </h1>
              <p className="mt-6 max-w-2xl text-[1rem] leading-8 text-[#42516b] sm:text-[1.05rem]">
                We blend spiritual depth, adrenaline, hidden Himalayan trekking, smooth local mobility, and stay styles for every kind of traveler into one seamless mountain journey.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Spiritual retreats', 'Adventure sports', 'Offbeat trekking', 'Taxi, bike & scooter rentals'].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#23b7df]/20 bg-white/80 px-4 py-2 text-sm font-bold text-[#0a3250] shadow-[0_10px_24px_rgba(6,24,54,0.06)]"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <blockquote className="mt-8 max-w-2xl rounded-[28px] border border-white/70 bg-white/78 p-6 text-[#10223f] shadow-[0_22px_50px_rgba(6,24,54,0.10)] backdrop-blur">
                <p className="text-lg font-bold leading-8 text-[#071734]">
                  Whether you want to conquer a Himalayan peak, find your inner peace in a riverside ashram, or explore hidden valleys on a rented scooter with your pet by your side, we design the journey around you.
                </p>
              </blockquote>

              <button
                onClick={onPlan}
                className="mt-8 inline-flex rounded-2xl bg-[#23b7df] px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_35px_rgba(35,183,223,0.28)] transition hover:bg-[#17acd6]"
              >
                Build My Soul Trip
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="group relative min-h-[430px] overflow-hidden rounded-[32px] shadow-[0_26px_60px_rgba(6,24,54,0.14)] sm:col-span-2">
                <img
                  src="/images/generated/usp-himalayan-experience.png"
                  alt="Illustration of a premium Uttarakhand journey with Himalayan peaks, ashram calm, trekking, and adventure"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,44,0.02),rgba(5,20,44,0.72))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <div className="inline-flex rounded-full bg-white/18 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/90 backdrop-blur">
                    Signature mix
                  </div>
                  <h2 className="mt-4 max-w-[16ch] text-2xl font-extrabold sm:text-[2rem]">Spiritual calm, mountain freedom, and adventure in one frame</h2>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_18px_38px_rgba(6,24,54,0.10)]">
                <img src="/images/dest-pandavkholi.jpg" alt="Pandavkholi trekking trail" className="h-56 w-full rounded-[20px] object-cover" />
                <div className="px-2 pb-2 pt-4">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#23b7df]">Offbeat trails</div>
                  <div className="mt-2 text-lg font-extrabold text-[#071734]">Pandavkholi, Munsiyari, and raw Himalayan edges</div>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_18px_38px_rgba(6,24,54,0.10)]">
                <img src="/images/generated/usp-mobility-arrival.png" alt="Taxi, scooter, and touring bike ready at a Himalayan arrival point" className="h-56 w-full rounded-[20px] object-cover" />
                <div className="px-2 pb-2 pt-4">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#7aa63a]">Move freely</div>
                  <div className="mt-2 text-lg font-extrabold text-[#071734]">Taxi, bike, and scooter access the moment you arrive</div>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {uspThemes.map((theme) => (
              <article key={theme.title} className="overflow-hidden rounded-[30px] border border-white/80 bg-white/88 shadow-[0_24px_55px_rgba(6,24,54,0.10)]">
                <div className="relative">
                  <img src={theme.image} alt={theme.title} className="h-64 w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${theme.glow} opacity-70 mix-blend-multiply`} />
                  <div className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/88 text-[#071734] shadow-[0_12px_30px_rgba(6,24,54,0.12)]">
                    <theme.icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[1.35rem] font-extrabold text-[#071734]">{theme.title}</h3>
                  <div className="mt-5 space-y-3">
                    {theme.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm leading-7 text-[#4a5973]">
                        <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#dff6fb] text-[#1d9fc7]">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <article className="rounded-[30px] bg-[#071734] p-8 text-white shadow-[0_24px_60px_rgba(7,23,52,0.22)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/82">
                <Compass className="h-4 w-4 text-[#75e5ff]" />
                Convenience & logistics
              </div>
              <h3 className="mt-5 max-w-[12ch] text-[2rem] font-extrabold leading-tight">Freedom to roam without rigid schedules</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/72">
                Arrive in the hills and keep the rest easy. Our mobility setup is designed so travelers can stay flexible, independent, and supported all at once.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Taxis', 'Bikes', 'Scooters'].map((item) => (
                  <span key={item} className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-bold text-white">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-3">
              {mobilityHighlights.map((item, index) => (
                <article key={item} className="rounded-[24px] border border-[#d5eef6] bg-white p-5 shadow-[0_14px_34px_rgba(6,24,54,0.08)]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff6fb] text-[#118fb8]">
                    {index === 0 ? <MapPin className="h-5 w-5" /> : index === 1 ? <Leaf className="h-5 w-5" /> : <Sparkle className="h-5 w-5" />}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#33435d]">{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {hospitalitySegments.map((segment) => (
                <article key={segment.title} className="group relative mx-auto w-full max-w-[248px] overflow-hidden rounded-[30px] border border-white/75 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] shadow-[0_20px_44px_rgba(6,24,54,0.10)] ring-1 ring-[#d9ecf4]/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_56px_rgba(6,24,54,0.14)]">
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-[72px] rounded-b-[24px] bg-[linear-gradient(180deg,rgba(35,183,223,0.08),rgba(35,183,223,0))]" />
                  <div className="relative p-3">
                    <div className="relative overflow-hidden rounded-[26px]">
                      <img src={segment.image} alt={segment.title} className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,54,0.02),rgba(6,24,54,0.18))]" />
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[1.05rem] font-extrabold leading-[1.12] text-[#071734]">{segment.title}</h3>
                      <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(35,183,223,0.18),rgba(35,183,223,0))]" />
                    </div>
                    <p className="mt-3 text-[12.5px] leading-6.5 text-[#4d5f79]">{segment.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <article className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#0b2746,#155d77_58%,#7ed9cf)] p-8 text-white shadow-[0_24px_60px_rgba(6,24,54,0.22)]">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white/88">
                  <Lotus className="h-4 w-4" />
                  Inclusive hospitality
                </div>
                <h3 className="mt-5 text-[2rem] font-extrabold leading-tight">Made for families, couples, solo seekers, and pets alike</h3>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  The stay style, pacing, and privacy level can all shift around your group so the trip feels personal from check-in to checkout.
                </p>
                <div className="mt-8 rounded-[24px] bg-white/12 p-5 backdrop-blur">
                  <p className="text-lg font-bold leading-8 text-white">
                    The ultimate pitch: Whether you want to push for a summit, retreat into silence by the river, or wander hidden valleys on two wheels with your pet, MySoulTrip makes it feel effortless.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
