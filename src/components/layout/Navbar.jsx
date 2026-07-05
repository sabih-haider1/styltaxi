import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher'
import Button from '../ui/Button'
import { IconMenu, IconX, IconPhone } from '../ui/Icons'
import { SITE } from '../../lib/site'
import { EASE } from '../../lib/motion'

const LINKS = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/airport-transfers', key: 'airport' },
  { to: '/pricing', key: 'pricing' },
  { to: '/contact', key: 'contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // The home hero is dark, so the navbar starts transparent there.
  const transparentTop = pathname === '/' || pathname === '/airport-transfers' || pathname === '/corporate-travel'
  const solid = scrolled || !transparentTop || menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? 'bg-white border-b border-ink-950/5 py-2 shadow-soft' : 'py-4'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.name} — ${t('nav.home')}`}>
          <img src="/logo-160.png" alt="" className="h-10 w-10 object-contain md:h-11 md:w-11" />
          <span className={`font-display text-xl font-bold tracking-tight ${solid ? 'text-ink-950' : 'text-white'}`}>
            Styl<span className="text-brand-600">Taxi</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(({ to, key }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 font-display text-sm font-medium transition-colors xl:px-4 ${
                    solid
                      ? isActive
                        ? 'text-brand-700'
                        : 'text-ink-600 hover:text-ink-950'
                      : isActive
                        ? 'text-gold-400'
                        : 'text-white/85 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`nav.${key}`)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${solid ? 'bg-brand-600' : 'bg-gold-400'}`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className={`hidden items-center gap-2 rounded-full px-3 py-2 font-display text-sm font-semibold transition-colors md:flex ${
              solid ? 'text-ink-700 hover:bg-ink-50' : 'text-white hover:bg-white/10'
            }`}
          >
            <IconPhone className="h-4 w-4 text-brand-600" />
            <span className="hidden xl:inline">{SITE.phone}</span>
          </a>
          <LanguageSwitcher dark={!solid} />
          <div className="hidden sm:block">
            <Button to="/book" size="md">
              {t('common.bookNow')}
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className={`cursor-pointer rounded-full p-2.5 transition-colors lg:hidden ${
              solid ? 'text-ink-950 hover:bg-ink-50' : 'text-white hover:bg-white/10'
            }`}
          >
            {menuOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-ink-950/5 lg:hidden"
          >
            <ul className="space-y-1 px-4 py-5 sm:px-6">
              {[...LINKS, { to: '/corporate-travel', key: 'corporate' }, { to: '/faq', key: 'faq' }].map(({ to, key }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-display text-base font-semibold ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-ink-50'
                      }`
                    }
                  >
                    {t(`nav.${key}`)}
                  </NavLink>
                </motion.li>
              ))}
              <li className="pt-3">
                <Button to="/book" size="lg" className="w-full">
                  {t('nav.book')}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
