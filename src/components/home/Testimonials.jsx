import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, stagger } from '../../lib/motion'
import { IconStar, IconGoogle, IconExternalLink } from '../ui/Icons'
import { SITE } from '../../lib/site'

const getAvatarBg = (name) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-red-400 to-red-500',
    'from-amber-400 to-amber-500',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

export default function Testimonials({ onWriteReview }) {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) || []

  const handleWriteReview = () => {
    if (onWriteReview) {
      onWriteReview()
    } else {
      window.dispatchEvent(new Event('open-review-modal'))
    }
  }

  return (
    <section className="cv-auto bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="★★★★★"
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        {/* Google Reviews Dashboard Card */}
        <div className="mb-12 rounded-[2rem] border border-ink-100 bg-ink-50/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-ink-900 shadow-soft border border-ink-100">
              <IconGoogle className="h-8 w-8" />
            </span>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-2xl font-black text-ink-950">4.9</span>
                <span className="text-ink-400 font-semibold text-lg">/ 5.0</span>
                <div className="flex text-gold-500 ml-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4.5 w-4.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-ink-500 mt-1">
                {t('reviews.dashboardDesc')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
            <button
              onClick={handleWriteReview}
              className="flex-1 sm:flex-none justify-center flex items-center gap-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-display text-sm font-bold py-3.5 px-6 shadow-glow transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 cursor-pointer focus:outline-none"
            >
              <IconGoogle className="h-4.5 w-4.5" />
              {t('reviews.btnWrite')}
            </button>
            <a
              href={SITE.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none justify-center flex items-center gap-2.5 rounded-full border border-ink-150 hover:border-ink-300 bg-white text-ink-950 font-display text-sm font-bold py-3.5 px-6 shadow-soft transition-all duration-300 hover:bg-ink-50 hover:-translate-y-0.5 focus:outline-none"
            >
              {t('reviews.btnView')}
              <IconExternalLink className="h-4 w-4 text-ink-400" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-7 md:grid-cols-3"
        >
          {items.map((item, i) => {
            const avatarBg = getAvatarBg(item.name)
            const initials = item.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')

            return (
              <motion.figure
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="flex flex-col rounded-3xl border border-ink-100 bg-gradient-to-b from-white to-ink-50/50 p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                {/* Header: Avatar, Name, Relative Date */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      aria-hidden
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarBg} font-display text-sm font-bold text-white shadow-soft`}
                    >
                      {initials}
                    </span>
                    <div>
                      <div className="font-display text-sm font-bold text-ink-950">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-ink-400">
                          {item.date || t('reviews.fallbackDate')}
                        </span>
                        <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded-md uppercase tracking-[0.04em] shrink-0">
                          {t('reviews.verifiedBadge')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-ink-300" title="Google Review">
                    <IconGoogle className="h-5 w-5" />
                  </span>
                </div>

                {/* Star Ratings */}
                <div className="flex gap-0.5 text-gold-500 mt-5" role="img" aria-label="5/5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4.5 w-4.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Review Quote */}
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-600 font-normal">
                  “{item.quote}”
                </blockquote>

                {/* Role/Passenger Location info */}
                <figcaption className="mt-5 border-t border-ink-100/60 pt-4 flex items-center justify-between text-xs text-ink-400">
                  <span>{item.role}</span>
                  <span className="font-semibold text-brand-700">Google Local Guide</span>
                </figcaption>
              </motion.figure>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
