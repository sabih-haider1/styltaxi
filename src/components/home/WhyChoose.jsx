import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, stagger } from '../../lib/motion'
import {
  IconUsers,
  IconClock,
  IconPlane,
  IconHeadset,
  IconEuro,
  IconShield,
} from '../ui/Icons'

const ICONS = [IconUsers, IconClock, IconPlane, IconHeadset, IconEuro, IconShield]

export default function WhyChoose() {
  const { t } = useTranslation()
  const items = t('why.items', { returnObjects: true })

  return (
    <section id="why" className="cv-auto bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="StylTaxi" title={t('why.title')} subtitle={t('why.subtitle')} />
        <motion.ul
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <motion.li
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group rounded-3xl border border-ink-100 bg-white p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-brand-50 p-3.5 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink-950">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{item.text}</p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
