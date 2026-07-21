import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'
import FloatingRatingBadge from './FloatingRatingBadge'
import ReviewModal from '../ui/ReviewModal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout({ children }) {
  const { t } = useTranslation()
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  useEffect(() => {
    const handleOpenModal = () => setReviewModalOpen(true)
    window.addEventListener('open-review-modal', handleOpenModal)
    return () => window.removeEventListener('open-review-modal', handleOpenModal)
  }, [])

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('common.skipToContent')}
      </a>
      <ScrollToTop />
      <Navbar />
      {children}
      <FloatingActions />
      <FloatingRatingBadge onClick={() => setReviewModalOpen(true)} />
      <Footer />

      <ReviewModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)} />
    </>
  )
}

