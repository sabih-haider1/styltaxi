import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import CtaBanner from '../components/home/CtaBanner'
import { stagger } from '../lib/motion'
import { SERVICE_KEYS } from '../lib/site'

export default function Services() {
  const { t } = useTranslation()

  return (
    <PageWrap>
      <Seo page="services" />
      <PageHero title={t('services.title')} subtitle={t('services.intro')} image="/images/taxi-night.jpg" compact />

      <section className="bg-ink-50/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICE_KEYS.map((service) => (
              <ServiceCard key={service.key} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      <CtaBanner />
    </PageWrap>
  )
}
