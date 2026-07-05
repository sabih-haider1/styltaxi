import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { EASE } from '../../lib/motion'

/** Animated confirmation with a drawn checkmark and booking reference. */
export default function SuccessScreen({ reference, name, onRestart }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="rounded-[2rem] border border-ink-100 bg-white px-6 py-14 text-center shadow-lift md:px-16 md:py-20"
    >
      <motion.svg
        viewBox="0 0 96 96"
        className="mx-auto h-24 w-24"
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        <motion.circle
          cx="48"
          cy="48"
          r="42"
          fill="none"
          stroke="#0B8F4A"
          strokeWidth="5"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7, ease: 'easeInOut' } },
          }}
        />
        <motion.path
          d="M30 50 L43 63 L67 36"
          fill="none"
          stroke="#0B8F4A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 0.45, delay: 0.6, ease: 'easeOut' } },
          }}
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
      >
        <h2 className="mt-8 font-display text-3xl font-extrabold text-ink-950 md:text-4xl">
          {t('booking.success.title')}
        </h2>
        <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full bg-brand-50 px-6 py-3">
          <span className="text-sm text-brand-800">{t('booking.success.reference')}</span>
          <span className="font-display text-lg font-bold tracking-wider text-brand-700">{reference}</span>
        </div>
        <p className="mx-auto mt-6 max-w-md text-balance leading-relaxed text-ink-500">
          {t('booking.success.text', { name: name.split(' ')[0] })}
        </p>
        <p className="mt-3 text-sm text-ink-400">{t('booking.success.note')}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="dark" size="lg">
            {t('booking.success.home')}
          </Button>
          <Button onClick={onRestart} variant="ghost" size="lg">
            {t('booking.success.another')}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
