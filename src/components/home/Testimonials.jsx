import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, stagger } from '../../lib/motion'
import { IconStar } from '../ui/Icons'

export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })

  return (
    <section className="cv-auto bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="★★★★★" title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-7 md:grid-cols-3"
        >
          {items.map((item) => (
            <motion.figure
              key={item.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex flex-col rounded-3xl border border-ink-100 bg-gradient-to-b from-white to-ink-50/50 p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="flex gap-1 text-gold-500" aria-label="5/5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <IconStar key={s} className="h-4.5 w-4.5 fill-gold-500" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 leading-relaxed text-ink-600">“{item.quote}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-ink-100 pt-6">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 font-display text-sm font-bold text-white"
                >
                  {item.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </span>
                <div>
                  <div className="font-display text-sm font-bold text-ink-950">{item.name}</div>
                  <div className="text-xs text-ink-400">{item.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
