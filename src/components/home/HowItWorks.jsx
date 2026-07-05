import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { fadeUp, stagger } from '../../lib/motion'
import { IconMapPin, IconMail, IconCar } from '../ui/Icons'

const ICONS = [IconMapPin, IconMail, IconCar]

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('how.steps', { returnObjects: true })

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="01 — 02 — 03" title={t('how.title')} subtitle={t('how.subtitle')} />
        <motion.ol
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-brand-200 md:block"
          />
          {steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <motion.li key={step.title} variants={fadeUp} className="relative text-center">
                <div className="relative mx-auto mb-7 inline-flex">
                  <span className="absolute -inset-2 rounded-full bg-brand-100/70 blur-md" aria-hidden />
                  <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-glow">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 font-display text-xs font-bold text-ink-950">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-ink-950">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-500">{step.text}</p>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
