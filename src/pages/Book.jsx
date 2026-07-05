import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import { EASE } from '../lib/motion'

const BookingWizard = lazy(() => import('../components/booking/BookingWizard'))

function WizardSkeleton() {
  return (
    <div className="flex min-h-96 items-center justify-center rounded-[2rem] border border-ink-100 bg-white shadow-lift">
      <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" aria-label="Loading" />
    </div>
  )
}

export default function Book() {
  const { t } = useTranslation()

  return (
    <PageWrap className="bg-ink-50/70">
      <Seo page="book" />
      <div className="relative overflow-hidden">
        {/* Dark decorative header behind the wizard */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[26rem] bg-ink-950">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(11_143_74/0.3),transparent)]" />
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(217_165_0/0.16),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 md:pb-32 md:pt-36 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-10 text-center"
          >
            <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t('booking.title')}
            </h1>
            <p className="mt-4 text-balance text-lg text-white/70">{t('booking.subtitle')}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <Suspense fallback={<WizardSkeleton />}>
              <BookingWizard />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </PageWrap>
  )
}
