import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import { IconPhone, IconCheck } from '../ui/Icons'
import { SITE } from '../../lib/site'
import { EASE } from '../../lib/motion'
import { useMediaQuery } from '../../lib/useMediaQuery'

export default function Hero() {
  const { t } = useTranslation()
  const ref = useRef(null)
  // Scroll-linked transforms run on the main thread — desktop only, so
  // low-powered phones get a perfectly smooth static hero instead.
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useReducedMotion()
  const parallax = isDesktop && !reducedMotion
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const points = [t('hero.point1'), t('hero.point2'), t('hero.point3')]

  return (
    <section ref={ref} className="relative flex min-h-svh items-center overflow-hidden bg-ink-950">
      {/* Background (parallax on desktop) */}
      <motion.div
        style={parallax ? { y: bgY } : undefined}
        className={`absolute inset-0 ${parallax ? 'scale-110' : ''}`}
        aria-hidden
      >
        <img
          src="/images/hero-1400.jpg"
          srcSet="/images/hero-800.jpg 800w, /images/hero-1400.jpg 1400w, /images/hero.jpg 2400w"
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/65 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/40" />
      </motion.div>

      {/* Soft brand glow — pre-computed radial gradient, no GPU filter cost */}
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(11_143_74/0.28),transparent)]"
      />

      <motion.div
        style={parallax ? { opacity: fade } : undefined}
        className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-gold-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
            {t('hero.badge')}
          </motion.span>

          <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t('hero.title')
              .split(' ')
              .map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.06 }}
                >
                  {/* nbsp: a plain trailing space is trimmed inside inline-block */}
                  {word}
                  {' '}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button to="/book" size="xl">
              {t('common.bookNow')}
            </Button>
            <Button href={SITE.phoneHref} variant="outline" size="xl">
              <IconPhone className="h-5 w-5" />
              {t('common.callNow')}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          >
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-white/70">
                <span className="rounded-full bg-brand-600/25 p-1">
                  <IconCheck className="h-3.5 w-3.5 text-brand-400" />
                </span>
                {point}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#why"
        aria-label={t('hero.scroll')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <span className="font-display text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
          {t('hero.scroll')}
        </span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 rounded-full bg-gold-400 animate-scroll-dot" />
        </span>
      </motion.a>
    </section>
  )
}
