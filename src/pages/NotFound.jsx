import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Button from '../components/ui/Button'
import { EASE } from '../lib/motion'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <PageWrap>
      <title>404 — StylTaxi</title>
      <section className="flex min-h-svh items-center justify-center bg-ink-950 px-4 text-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[7rem] font-extrabold leading-none text-brand-600 md:text-[10rem]"
            aria-hidden
          >
            404
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">{t('notFound.title')}</h1>
            <p className="mx-auto mt-4 max-w-sm text-balance text-white/60">{t('notFound.text')}</p>
            <div className="mt-9">
              <Button to="/" size="lg">
                {t('notFound.button')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrap>
  )
}
