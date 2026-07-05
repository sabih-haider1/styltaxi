import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SmartImage from '../ui/SmartImage'
import { fadeUp, stagger } from '../../lib/motion'
import { IconUsers, IconLuggage } from '../ui/Icons'

const IMAGES = ['/images/business.jpg', '/images/interior.jpg', '/images/fleet.jpg']

export default function Fleet() {
  const { t } = useTranslation()
  const cars = t('fleet.cars', { returnObjects: true })

  return (
    <section className="cv-auto relative overflow-hidden bg-ink-950 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(11_143_74/0.16),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading dark eyebrow={t('footer.available')} title={t('fleet.title')} subtitle={t('fleet.subtitle')} />
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-7 md:grid-cols-3"
        >
          {cars.map((car, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:border-brand-600/40"
            >
              <SmartImage src={IMAGES[i]} alt={car.name} zoom className="aspect-[16/10]" />
              <div className="p-7">
                <h3 className="font-display text-xl font-bold text-white">{car.name}</h3>
                <p className="mt-1 text-sm text-gold-400">{car.desc}</p>
                <div className="mt-5 flex gap-6 border-t border-white/10 pt-5 text-sm text-white/65">
                  <span className="flex items-center gap-2">
                    <IconUsers className="h-4.5 w-4.5 text-brand-500" />
                    {car.pax}
                  </span>
                  <span className="flex items-center gap-2">
                    <IconLuggage className="h-4.5 w-4.5 text-brand-500" />
                    {car.bags}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
