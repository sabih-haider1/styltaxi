import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SmartImage from './ui/SmartImage'
import { IconArrowRight } from './ui/Icons'
import { fadeUp } from '../lib/motion'

/** Image card used on the homepage services preview and the Services page. */
export default function ServiceCard({ service }) {
  const { t } = useTranslation()
  const title = t(`services.items.${service.key}.title`)
  const desc = t(`services.items.${service.key}.desc`)

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="group relative overflow-hidden rounded-3xl bg-ink-950 shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <Link to={service.to} className="block">
        <SmartImage src={service.img} alt="" zoom className="aspect-[4/3]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90">
            {desc}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold text-gold-400">
            {t('common.learnMore')}
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
