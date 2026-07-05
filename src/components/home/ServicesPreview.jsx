import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ServiceCard from '../ServiceCard'
import Reveal from '../ui/Reveal'
import { stagger } from '../../lib/motion'
import { SERVICE_KEYS } from '../../lib/site'

export default function ServicesPreview() {
  const { t } = useTranslation()

  return (
    <section className="bg-ink-50/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t('services.subtitle')} title={t('services.title')} subtitle={t('services.intro')} />
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICE_KEYS.map((service) => (
            <ServiceCard key={service.key} service={service} />
          ))}
        </motion.div>
        <Reveal className="mt-14 text-center">
          <Button to="/services" variant="dark" size="lg">
            {t('common.viewAllServices')}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
