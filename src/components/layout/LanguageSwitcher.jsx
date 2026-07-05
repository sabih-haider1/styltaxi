import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { LANGUAGES } from '../../i18n'
import { IconGlobe, IconCheck } from '../ui/Icons'

export default function LanguageSwitcher({ dark = false }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) || LANGUAGES[0]

  useEffect(() => {
    const onClickAway = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onClickAway)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onClickAway)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('common.language')}: ${current.short}`}
        onClick={() => setOpen((o) => !o)}
        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 font-display text-sm font-semibold transition-colors ${
          dark ? 'text-white/90 hover:bg-white/10' : 'text-ink-700 hover:bg-ink-50'
        }`}
      >
        <IconGlobe className="h-4.5 w-4.5" />
        {current.short}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('common.language')}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-lift"
          >
            {LANGUAGES.map((lang) => {
              const active = lang.code === current.code
              return (
                <li key={lang.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage(lang.code)
                      setOpen(false)
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-brand-50 ${
                      active ? 'font-semibold text-brand-700' : 'text-ink-600'
                    }`}
                  >
                    {lang.label}
                    {active && <IconCheck className="h-4 w-4 text-brand-600" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
