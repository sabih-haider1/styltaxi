import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IconWhatsApp, IconCar } from '../ui/Icons'
import { SITE } from '../../lib/site'

/** Floating Book Now + WhatsApp buttons, shown after scrolling past the hero. */
export default function FloatingActions() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const show = visible && pathname !== '/book'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8 md:right-8"
        >
          <motion.a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('common.whatsapp')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="rounded-full bg-[#25D366] p-3.5 text-white shadow-lift"
          >
            <IconWhatsApp className="h-6 w-6" />
          </motion.a>
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-brand-600 animate-pulse-ring" aria-hidden />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/book"
                className="relative flex items-center gap-2.5 rounded-full bg-brand-600 py-3.5 pl-4 pr-6 font-display text-sm font-bold text-white shadow-glow transition-colors hover:bg-brand-700"
              >
                <IconCar className="h-5 w-5" />
                {t('common.bookNow')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
