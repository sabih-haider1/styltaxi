import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import SmartImage from '../components/ui/SmartImage'
import { fadeUp, stagger, scaleIn } from '../lib/motion'
import { IconHeadset, IconBriefcase, IconUsers, IconBuilding } from '../components/ui/Icons'

const BENEFIT_ICONS = [IconHeadset, IconBriefcase, IconUsers, IconBuilding]

export default function CorporateTravel() {
  const { t } = useTranslation()
  const benefits = t('corporatePage.benefits', { returnObjects: true })

  return (
    <PageWrap>
      <Seo page="corporate" />
      <PageHero title={t('corporatePage.title')} subtitle={t('corporatePage.subtitle')} image="/images/business.jpg" />

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('corporatePage.benefitsTitle')} />
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
                  key={benefit.title}
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

      <section className="bg-ink-50/60 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal variants={scaleIn}>
            <SmartImage
              src="/images/services/corporate.jpg"
              alt=""
              className="aspect-[4/3] rounded-[2rem] shadow-lift"
            />
          </Reveal>
          <Reveal>
            <h2 className="text-balance font-display text-3xl font-extrabold text-ink-950 md:text-4xl">
              {t('corporatePage.trustTitle')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">{t('corporatePage.trustText')}</p>
            <div className="mt-8 rounded-3xl border border-brand-200 bg-brand-50/70 p-7">
              <h3 className="font-display text-lg font-bold text-brand-900">{t('corporatePage.ctaTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{t('corporatePage.ctaText')}</p>
              <div className="mt-5">
                <Button to="/contact" size="lg">
                  {t('nav.contact')}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  )
}
