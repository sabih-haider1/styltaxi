import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IconGoogle, IconStar } from '../ui/Icons'

/** Floating Google Rating badge on the bottom-left corner */
export default function FloatingRatingBadge({ onClick }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide badge on booking page or if not scrolled
  const show = visible && pathname !== '/book'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -24, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -24, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="fixed bottom-5 left-5 z-40 md:bottom-8 md:left-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex items-center gap-3.5 rounded-full border border-ink-150 bg-white/95 backdrop-blur-md py-2.5 pl-4 pr-5 shadow-lift cursor-pointer hover:border-gold-300 transition-all text-left focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            aria-label="Google Rating: 4.9 out of 5 stars. Click to read or write reviews."
          >
            <IconGoogle className="h-5.5 w-5.5 shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold text-ink-950 leading-none">4.9</span>
                <div className="flex text-gold-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-3 w-3 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-400 leading-none mt-0.5">
                {t('reviews.badgeSubtitle')}
              </span>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
