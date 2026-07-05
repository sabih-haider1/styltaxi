import { useTranslation } from 'react-i18next'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { IconPhone } from '../ui/Icons'
import { SITE } from '../../lib/site'
import { scaleIn } from '../../lib/motion'

export default function CtaBanner() {
  const { t } = useTranslation()

  return (
    <section className="bg-white px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <Reveal variants={scaleIn} className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-8 py-16 text-center shadow-lift md:px-16 md:py-24">
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(217_165_0/0.28),transparent)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(18_18_18/0.42),transparent)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, transparent 0 26px, white 26px 27px)',
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {t('ctaBanner.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/80">{t('ctaBanner.text')}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button to="/book" variant="gold" size="xl">
                {t('ctaBanner.button')}
              </Button>
              <Button href={SITE.phoneHref} variant="outline" size="xl">
                <IconPhone className="h-5 w-5" />
                {SITE.phone}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
