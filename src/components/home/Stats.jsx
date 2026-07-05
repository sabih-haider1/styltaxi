import { useTranslation } from 'react-i18next'
import Reveal from '../ui/Reveal'
import AnimatedCounter from '../ui/AnimatedCounter'
import { STATS } from '../../lib/site'

export default function Stats() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-24" aria-label={t('stats.title')}>
      <div
        aria-hidden
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/15 blur-[100px]"
      />
      <div aria-hidden className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-gold-500/10 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.key} className="text-center" delay={i * 0.08}>
              <dd className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </dd>
              <dt className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-white/50">
                {t(`stats.${stat.key}`)}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
