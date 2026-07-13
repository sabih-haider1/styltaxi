import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SITE } from '../lib/site'

/**
 * Per-page SEO. React 19 hoists <title>/<meta>/<link> into <head>.
 * JSON-LD structured data is injected via effect (React does not hoist scripts).
 */
export default function Seo({ page, schema }) {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const title = t(`seo.${page}.title`)
  const desc = t(`seo.${page}.desc`)
  const url = `${SITE.url}${pathname}`
  const image = `${SITE.url}/images/og-image.jpg`

  useEffect(() => {
    const scripts = []
    const blocks = [organizationSchema(), localBusinessSchema(), breadcrumbSchema(pathname, title), ...(schema ? [schema] : [])]
    for (const block of blocks) {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.textContent = JSON.stringify(block)
      document.head.appendChild(el)
      scripts.push(el)
    }
    return () => scripts.forEach((el) => el.remove())
  }, [pathname, title, schema])

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={i18n.language === 'en' ? 'en_GB' : i18n.language === 'ca' ? 'ca_ES' : 'es_ES'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
    </>
  )
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish', 'Catalan'],
    },
    sameAs: Object.values(SITE.social),
  }
}

function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/images/og-image.jpg`,
    telephone: SITE.phone,
    priceRange: '€€',
    areaServed: { '@type': 'City', name: 'Barcelona' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barcelona',
      addressRegion: 'Catalonia',
      addressCountry: 'ES',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

function breadcrumbSchema(pathname, title) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url }]
  if (pathname !== '/') {
    items.push({ '@type': 'ListItem', position: 2, name: title, item: `${SITE.url}${pathname}` })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}
