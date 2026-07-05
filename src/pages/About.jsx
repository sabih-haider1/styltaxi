import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Button from '../components/ui/Button'
import Stats from '../components/home/Stats'
import { fadeUp, stagger, scaleIn } from '../lib/motion'
import { IconClock, IconEuro, IconShield } from '../components/ui/Icons'

const VALUE_ICONS = [IconClock, IconEuro, IconShield]

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values', { returnObjects: true })

  return (
    <PageWrap>
      <Seo page="about" />
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} image="/images/barcelona.jpg" compact />

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              {t('about.storyTitle')}
            </span>
            <div className="space-y-5 text-lg leading-relaxed text-ink-600">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
              <p>{t('about.story3')}</p>
            </div>
          </Reveal>
          <Reveal variants={scaleIn} className="relative">
            <SmartImage src="/images/driver.jpg" alt="" className="aspect-[4/5] rounded-[2rem] shadow-lift" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-brand-600 p-6 text-white shadow-lift md:block">
              <div className="font-display text-4xl font-extrabold">24/7</div>
              <div className="mt-1 text-sm text-white/80">{t('footer.available')}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink-50/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('about.valuesTitle')} />
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-7 md:grid-cols-3"
          >
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl bg-white p-9 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <span className="inline-flex rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-3.5 text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold text-ink-950">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{value.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <Stats />

      <section className="bg-white py-24 text-center md:py-28">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="font-display text-3xl font-extrabold text-ink-950 md:text-4xl">{t('about.ctaTitle')}</h2>
          <p className="mt-4 text-lg text-ink-500">{t('about.ctaText')}</p>
          <div className="mt-8">
            <Button to="/book" size="xl">
              {t('common.bookNow')}
            </Button>
          </div>
        </Reveal>
      </section>
    </PageWrap>
  )
}
