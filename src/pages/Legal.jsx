import { useTranslation } from 'react-i18next'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/ui/Reveal'

/** Shared renderer for the Privacy Policy and Terms of Service pages. */
function LegalPage({ kind }) {
  const { t } = useTranslation()
  const sections = t(`legal.${kind}.sections`, { returnObjects: true })

  return (
    <PageWrap>
      <Seo page={kind} />
      <PageHero title={t(`legal.${kind}.title`)} subtitle={t(`legal.${kind}.updated`)} compact />
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <Reveal key={section.h} as="section">
              <h2 className="font-display text-xl font-bold text-ink-950">{section.h}</h2>
              <p className="mt-3 leading-relaxed text-ink-500">{section.p}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </PageWrap>
  )
}

export function Privacy() {
  return <LegalPage kind="privacy" />
}

export function Terms() {
  return <LegalPage kind="terms" />
}
