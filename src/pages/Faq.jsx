import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/ui/Reveal'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import { SITE } from '../lib/site'
import { IconWhatsApp, IconPhone } from '../components/ui/Icons'

export default function Faq() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })

  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }),
    [items]
  )

  return (
    <PageWrap>
      <Seo page="faq" schema={faqSchema} />
      <PageHero title={t('faq.title')} subtitle={t('faq.subtitle')} compact />

      <section className="bg-ink-50/60 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Accordion items={items} />
          </Reveal>
          <Reveal className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-ink-950 p-10 text-center">
            <p className="max-w-md text-balance font-display text-xl font-bold text-white">
              {t('contact.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={SITE.phoneHref} size="lg">
                <IconPhone className="h-4.5 w-4.5" />
                {t('common.callNow')}
              </Button>
              <Button href={SITE.whatsappHref} variant="outline" size="lg" target="_blank" rel="noopener noreferrer">
                <IconWhatsApp className="h-4.5 w-4.5" />
                {t('common.whatsapp')}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrap>
  )
}
