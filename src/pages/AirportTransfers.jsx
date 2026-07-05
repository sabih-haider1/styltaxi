import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { fadeUp, stagger } from '../lib/motion'
import { IconPlane, IconUsers, IconClock, IconEuro } from '../components/ui/Icons'

const BENEFIT_ICONS = [IconPlane, IconUsers, IconClock, IconEuro]

export default function AirportTransfers() {
  const { t } = useTranslation()
  const benefits = t('airportPage.benefits', { returnObjects: true })
  const terminals = t('airportPage.terminals', { returnObjects: true })

  return (
    <PageWrap>
      <Seo page="airport" />
      <PageHero title={t('airportPage.title')} subtitle={t('airportPage.subtitle')} image="/images/airport.jpg" />

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('airportPage.benefitsTitle')} />
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i]
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <span className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-950">{benefit.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{benefit.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-ink-950 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading dark title={t('airportPage.terminalsTitle')} />
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-7 md:grid-cols-3"
          >
            {terminals.map((terminal, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-gold-500/40"
              >
                <IconPlane className="h-7 w-7 text-gold-500" />
                <h3 className="mt-5 font-display text-lg font-bold text-white">{terminal.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{terminal.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-24 text-center md:py-28">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="text-balance font-display text-3xl font-extrabold text-ink-950 md:text-4xl">
            {t('airportPage.ctaTitle')}
          </h2>
          <p className="mt-4 text-lg text-ink-500">{t('airportPage.ctaText')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/book" size="xl">
              {t('common.bookNow')}
            </Button>
            <Button to="/pricing" variant="dark" size="xl">
              {t('nav.pricing')}
            </Button>
          </div>
        </Reveal>
      </section>
    </PageWrap>
  )
}
