import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SITE } from '../../lib/site'
import { LANGUAGES } from '../../i18n'
import {
  IconPhone,
  IconWhatsApp,
  IconMail,
  IconClock,
  IconInstagram,
  IconFacebook,
  IconTwitterX,
} from '../ui/Icons'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const year = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/book', label: t('nav.book') },
  ]

  const serviceLinks = [
    { to: '/airport-transfers', label: t('services.items.airport.title') },
    { to: '/services', label: t('services.items.hotel.title') },
    { to: '/corporate-travel', label: t('services.items.corporate.title') },
    { to: '/services', label: t('services.items.city.title') },
    { to: '/services', label: t('services.items.longdistance.title') },
  ]

  const socials = [
    { href: SITE.social.instagram, label: 'Instagram', Icon: IconInstagram },
    { href: SITE.social.facebook, label: 'Facebook', Icon: IconFacebook },
    { href: SITE.social.x, label: 'X', Icon: IconTwitterX },
  ]

  return (
    <footer className="bg-ink-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo-160.png" alt="" className="h-11 w-11 object-contain" loading="lazy" />
              <span className="font-display text-xl font-bold">
                Styl<span className="text-brand-500">Taxi</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{t('footer.tagline')}</p>
            <div className="mt-6 flex items-center gap-2" role="group" aria-label={t('common.language')}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => i18n.changeLanguage(lang.code)}
                  aria-pressed={i18n.language?.startsWith(lang.code)}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 font-display text-xs font-semibold transition-colors ${
                    i18n.language?.startsWith(lang.code)
                      ? 'bg-brand-700 text-white'
                      : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {lang.short}
                </button>
              ))}
            </div>
          </div>

          <nav aria-label={t('footer.quickLinks')}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/65 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.services')}>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
              {t('footer.services')}
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-white/65 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-gold-500">
              {t('footer.contact')}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/65 transition-colors hover:text-white">
                  <IconPhone className="h-4.5 w-4.5 shrink-0 text-brand-500" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <IconWhatsApp className="h-4.5 w-4.5 shrink-0 text-brand-500" />
                  {t('common.whatsapp')}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white/65 transition-colors hover:text-white">
                  <IconMail className="h-4.5 w-4.5 shrink-0 text-brand-500" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/65">
                <IconClock className="h-4.5 w-4.5 shrink-0 text-brand-500" />
                {t('footer.available')}
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="sr-only">{t('footer.followUs')}</h4>
              <div className="flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-full bg-white/8 p-2.5 text-white/70 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {SITE.name}. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
