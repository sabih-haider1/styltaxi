import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { fadeUp, stagger } from '../lib/motion'
import { IconCheck, IconArrowRight } from '../components/ui/Icons'

export default function Pricing() {
  const { t } = useTranslation()
  const tiers = t('pricing.tiers', { returnObjects: true })
  const routes = t('pricing.routes', { returnObjects: true })

  return (
    <PageWrap>
      <Seo page="pricing" />
      <PageHero title={t('pricing.title')} subtitle={t('pricing.subtitle')} compact />

      {/* Tier cards */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-7 md:grid-cols-3"
          >
            {tiers.map((tier, i) => {
              const featured = i === 1
              return (
                <motion.div
                  key={tier.name}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className={`relative rounded-[2rem] p-9 ${
                    featured
                      ? 'bg-gradient-to-b from-ink-950 to-brand-950 text-white shadow-lift md:-mt-4 md:mb--4'
                      : 'border border-ink-100 bg-white shadow-soft'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink-950">
                      {t('pricing.popular')}
                    </span>
                  )}
                  <h3 className={`font-display text-xl font-bold ${featured ? 'text-white' : 'text-ink-950'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-1 text-sm ${featured ? 'text-white/60' : 'text-ink-400'}`}>{tier.desc}</p>
                  <div className="mt-7 flex items-baseline gap-2">
                    <span className={`font-display text-5xl font-extrabold ${featured ? 'text-gold-400' : 'text-brand-700'}`}>
                      {tier.price}€
                    </span>
                    <span className={`text-sm ${featured ? 'text-white/50' : 'text-ink-400'}`}>{t('pricing.perKm')}</span>
                  </div>
                  <ul className="mt-8 space-y-3.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 rounded-full p-0.5 ${
                            featured ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'
                          }`}
                        >
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        <span className={featured ? 'text-white/80' : 'text-ink-600'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Button to="/book" variant={featured ? 'gold' : 'primary'} className="w-full">
                      {t('common.bookNow')}
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Fixed routes */}
      <section className="bg-ink-50/60 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('pricing.fixedTitle')} subtitle={t('pricing.fixedSubtitle')} />
          <Reveal className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-50/70 font-display text-xs uppercase tracking-[0.14em] text-ink-400">
                  <th scope="col" className="px-6 py-4 md:px-8">{t('pricing.routeFrom')}</th>
                  <th scope="col" className="hidden px-6 py-4 sm:table-cell md:px-8">{t('pricing.routeTo')}</th>
                  <th scope="col" className="px-6 py-4 text-right md:px-8">{t('pricing.routePrice')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {routes.map((route) => (
                  <tr key={`${route.from}-${route.to}`} className="group transition-colors hover:bg-brand-50/50">
                    <td className="px-6 py-4.5 font-medium text-ink-900 md:px-8">
                      {route.from}
                      <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-400 sm:hidden">
                        <IconArrowRight className="h-3 w-3" />
                        {route.to}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4.5 text-ink-600 sm:table-cell md:px-8">{route.to}</td>
                    <td className="px-6 py-4.5 text-right md:px-8">
                      <span className="font-display text-lg font-bold text-brand-700">{route.price}€</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="mt-10 text-center">
            <p className="mx-auto max-w-xl text-balance text-sm leading-relaxed text-ink-400">{t('pricing.note')}</p>
            <div className="mt-7">
              <Button to="/contact" variant="dark" size="lg">
                {t('pricing.cta')}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  )
}
