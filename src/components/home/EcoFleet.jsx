import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { fadeUp, stagger, scaleIn } from '../../lib/motion'
import { IconLeaf, IconBolt, IconEuro, IconSparkles } from '../ui/Icons'

const POINT_ICONS = [IconBolt, IconSparkles, IconEuro, IconLeaf]

/** "Cero Emisiones" — the zero-emission eco fleet section. */
export default function EcoFleet() {
  const { t } = useTranslation()
  const points = t('eco.points', { returnObjects: true })

  return (
    <section className="cv-auto overflow-hidden bg-gradient-to-b from-white to-brand-50/70 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Copy + points */}
        <div>
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              <IconLeaf className="h-4 w-4" />
              {t('eco.eyebrow')}
            </span>
            <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-ink-950 md:text-5xl">
              {t('eco.title')}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">{t('eco.text')}</p>
          </Reveal>

          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {points.map((point, i) => {
              const Icon = POINT_ICONS[i]
              return (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-4">
                  <span className="shrink-0 rounded-2xl bg-brand-600/10 p-3 text-brand-700">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-ink-950">{point.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-500">{point.text}</span>
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>

          <Reveal className="mt-10">
            <Button to="/book" size="lg">
              <IconLeaf className="h-4.5 w-4.5" />
              {t('eco.cta')}
            </Button>
          </Reveal>
        </div>

        {/* Visual panel */}
        <Reveal variants={scaleIn}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 p-10 text-center shadow-lift md:p-14">
            <IconLeaf
              className="absolute -right-10 -top-10 h-56 w-56 rotate-12 text-white/10"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(217_165_0/0.25),transparent)]"
            />
            <div className="relative">
              <div className="mx-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-5">
                <IconLeaf className="h-9 w-9 text-gold-400" />
              </div>
              <div className="mt-6 font-display text-7xl font-extrabold tracking-tight text-white md:text-8xl">
                {t('eco.statValue')}
              </div>
              <div className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                {t('eco.statLabel')}
              </div>
              <div className="mx-auto mt-9 grid max-w-sm grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                  <div className="font-display text-2xl font-extrabold text-gold-400">{t('eco.stat2')}</div>
                  <div className="mt-1 text-xs text-white/70">{t('eco.stat2Label')}</div>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                  <IconBolt className="h-6 w-6 text-gold-400" />
                  <IconLeaf className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
