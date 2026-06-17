import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fallbackData } from './data/fallback'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import WhyTravel from './components/WhyTravel'
import RadialShowcase from './components/RadialShowcase'
import MomentsGallery from './components/MomentsGallery'
import FloatingActions from './components/FloatingActions'
import ChatWidget from './components/ChatWidget'
import Testimonials from './components/Testimonials'
import ExploreKumaon from './components/ExploreKumaon'
import FeaturedExperiences from './components/FeaturedExperiences'
import TemperatureBanner from './components/TemperatureBanner'
import GroupTours from './components/GroupTours'
import BottomRow from './components/BottomRow'
import Footer from './components/Footer'
import PlanTripModal from './components/PlanTripModal'
import Toast from './components/Toast'
import ContactPage from './components/ContactPage'
import DestinationPage from './components/DestinationPage'
import SpiritualPage from './components/SpiritualPage'
import PackagesPage from './components/PackagesPage'
import PackageDetail from './components/PackageDetail'
import GroupToursPage from './components/GroupToursPage'
import BlogPage from './components/BlogPage'
import BlogPost from './components/BlogPost'
import SplashScreen from './components/SplashScreen'
import FigmaHomePage from './components/FigmaHomePage'

function normalizeHomeData(data) {
  return {
    destinations: Array.isArray(data?.destinations) ? data.destinations : fallbackData.destinations,
    experiences: Array.isArray(data?.experiences) ? data.experiences : fallbackData.experiences,
    groupTours: Array.isArray(data?.groupTours) ? data.groupTours : fallbackData.groupTours,
    blogs: Array.isArray(data?.blogs) ? data.blogs : fallbackData.blogs,
    review: data?.review && typeof data.review === 'object' ? data.review : fallbackData.review,
    reviews: Array.isArray(data?.reviews) ? data.reviews : fallbackData.reviews,
    instagram: Array.isArray(data?.instagram) ? data.instagram : fallbackData.instagram,
  }
}

function getCurrentPage() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  if (pathname === '/contact-us') return 'contact'
  if (pathname === '/packages') return 'packages'
  if (pathname.startsWith('/packages/')) return 'package-detail'
  if (pathname === '/group-tours') return 'group-tours'
  if (pathname === '/blog') return 'blog'
  if (pathname.startsWith('/blog/')) return 'blog-post'
  if (pathname === '/destinations/spiritual') return 'spiritual'
  if (pathname === '/destinations') return 'destinations'
  return 'home'
}

function getPackageSlug() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return pathname.startsWith('/packages/') ? pathname.slice('/packages/'.length) : null
}

function getBlogSlug() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  return pathname.startsWith('/blog/') ? pathname.slice('/blog/'.length) : null
}

function HomePage({ data, openModal, handleBook }) {
  return (
    <main>
      <HeroSlider
        destinations={data.destinations}
        onExplore={() => {
          document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
        }}
        onPlan={() => openModal()}
      />
      <WhyTravel />
      <RadialShowcase onExplore={() => openModal()} />
      <ExploreKumaon destinations={data.destinations} />
      <FeaturedExperiences experiences={data.experiences} onExplore={(e) => openModal(e)} />
      <TemperatureBanner onJoin={() => openModal()} />
      <GroupTours groupTours={data.groupTours} onBook={handleBook} />
      <Testimonials reviews={data.reviews} />
      <MomentsGallery
        images={data.instagram}
        captions={data.destinations.map((d) => d.name)}
      />
      <BottomRow blogs={data.blogs} review={data.review} instagram={data.instagram} />
    </main>
  )
}

export default function App() {
  const [data, setData] = useState(() => normalizeHomeData(fallbackData))
  const [modalOpen, setModalOpen] = useState(false)
  const [preset, setPreset] = useState(null)
  const [toast, setToast] = useState('')
  const [page, setPage] = useState(() => getCurrentPage())

  useEffect(() => {
    fetch('/api/home')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d) => setData(normalizeHomeData(d)))
      .catch((error) => {
        console.warn('Using fallback home data:', error)
      })
  }, [])

  useEffect(() => {
    const syncPage = () => setPage(getCurrentPage())
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const post = async (url, body, fallbackMsg) => {
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const d = await r.json().catch(() => ({}))
      flash(d.message || fallbackMsg)
    } catch {
      flash(fallbackMsg)
    }
  }

  const openModal = (p = null) => {
    setPreset(p)
    setModalOpen(true)
  }

  const handleEnquiry = (form) => {
    setModalOpen(false)
    post('/api/enquiry', form, 'Thanks! Our team will reach out within 24 hours.')
  }

  const handleBook = (tour) => {
    post('/api/book', { tour: tour?.title, price: tour?.price }, `Booking request received for ${tour?.title || 'your tour'}!`)
  }

  const handleSubscribe = (email) => {
    post('/api/subscribe', { email }, 'Subscribed! Best Himalayan journeys coming your way.')
  }

  const handleContactMessage = (form) => {
    post('/api/contact', form, 'Thanks! Our team will get back to you within 24 hours.')
  }

  const isHomePage = page === 'home'

  return (
    <div className="min-h-screen bg-white">
      <SplashScreen />
      {!isHomePage && page !== 'contact' && <TopBar />}
      {!isHomePage && <Navbar currentPage={page} onEnquire={() => openModal()} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'contact' && <ContactPage onPlan={() => openModal()} onSubmitMessage={handleContactMessage} />}
          {page === 'packages' && <PackagesPage onPlan={() => openModal()} onBook={handleBook} />}
          {page === 'package-detail' && <PackageDetail id={getPackageSlug()} onPlan={() => openModal()} onBook={handleBook} />}
          {page === 'group-tours' && <GroupToursPage onPlan={() => openModal()} onBook={handleBook} />}
          {page === 'blog' && <BlogPage onSubscribe={handleSubscribe} />}
          {page === 'blog-post' && <BlogPost id={getBlogSlug()} onPlan={() => openModal()} />}
          {page === 'destinations' && <DestinationPage onPlan={() => openModal()} />}
          {page === 'spiritual' && <SpiritualPage onPlan={() => openModal()} />}
          {page === 'home' && (
            <FigmaHomePage
              data={data}
              openModal={openModal}
              handleBook={handleBook}
              onSubscribe={handleSubscribe}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {!isHomePage && <Footer onSubscribe={handleSubscribe} />}

      <PlanTripModal
        open={modalOpen}
        preset={preset}
        onClose={() => setModalOpen(false)}
        onSubmit={handleEnquiry}
      />
      <Toast message={toast} />
      <FloatingActions />
      <ChatWidget />
    </div>
  )
}
