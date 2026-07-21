import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { IconX, IconStar, IconGoogle, IconCheck, IconExternalLink } from './Icons'
import { SITE } from '../../lib/site'
import { deliverForm } from '../../lib/submit'
import Field, { inputCls } from '../booking/Field'

export default function ReviewModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('google') // 'google' or 'private'
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [nameError, setNameError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Disable page scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Reset state
      setIsSuccess(false)
      setName('')
      setMessage('')
      setRating(5)
      setNameError('')
      setMessageError('')
      setActiveTab('google')
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handlePrivateSubmit = async (e) => {
    e.preventDefault()
    let valid = true
    if (!name.trim()) {
      setNameError(t('reviews.nameRequired'))
      valid = false
    } else {
      setNameError('')
    }

    if (!message.trim()) {
      setMessageError(t('reviews.msgRequired'))
      valid = false
    } else {
      setMessageError('')
    }

    if (!valid) return

    setIsSubmitting(true)
    try {
      await deliverForm('Website Review Feedback', {
        Name: name,
        Rating: '★'.repeat(rating) + '☆'.repeat(5 - rating) + ` (${rating}/5)`,
        Message: message,
      })
      setIsSuccess(true)
    } catch (err) {
      console.error('Failed to submit private feedback', err)
      alert(t('booking.error.text'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-glow"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-950"
            aria-label={t('reviews.close')}
          >
            <IconX className="h-5 w-5" />
          </button>

          <div className="p-7 md:p-8">
            <h2 className="font-display text-2xl font-bold text-ink-950 pr-8">
              {t('reviews.modalTitle')}
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              {t('reviews.modalSubtitle')}
            </p>

            {isSuccess ? (
              /* Success view */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-6"
              >
                <div className="flex items-center gap-4 rounded-2xl bg-brand-50 p-6 text-brand-900">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft">
                    <IconCheck className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-brand-950">{t('reviews.successTitle')}</h3>
                    <p className="mt-1 text-sm text-brand-800">{t('reviews.successDesc')}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gold-200 bg-gold-50/30 p-6">
                  <p className="text-sm font-medium leading-relaxed text-ink-700">
                    {t('reviews.successGoogleCTA')}
                  </p>
                  <a
                    href={SITE.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 font-display text-sm font-bold text-ink-900 border border-ink-200 shadow-soft transition-all duration-300 hover:border-gold-300 hover:bg-gold-50/20"
                  >
                    <IconGoogle className="h-5 w-5" />
                    {t('reviews.googleBtn')}
                    <IconExternalLink className="h-4 w-4 text-ink-400" />
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Regular View with Tabs */
              <div className="mt-6">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-ink-50 p-1">
                  <button
                    onClick={() => setActiveTab('google')}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2.5 font-display text-sm font-bold transition-all duration-200 ${
                      activeTab === 'google'
                        ? 'bg-white text-ink-950 shadow-soft'
                        : 'text-ink-400 hover:text-ink-800'
                    }`}
                  >
                    <IconGoogle className="h-4.5 w-4.5" />
                    Google
                  </button>
                  <button
                    onClick={() => setActiveTab('private')}
                    className={`rounded-lg py-2.5 font-display text-sm font-bold transition-all duration-200 ${
                      activeTab === 'private'
                        ? 'bg-white text-ink-950 shadow-soft'
                        : 'text-ink-400 hover:text-ink-800'
                    }`}
                  >
                    {t('reviews.privateTitle')}
                  </button>
                </div>

                <div className="mt-6 min-h-[260px]">
                  {activeTab === 'google' ? (
                    <motion.div
                      key="google"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-col items-center text-center py-4"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-50 text-ink-900 shadow-soft">
                        <IconGoogle className="h-10 w-10" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-bold text-ink-950">
                        {t('reviews.googleTitle')}
                      </h3>
                      <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink-500">
                        {t('reviews.googleDesc')}
                      </p>
                      <a
                        href={SITE.googleReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-700 py-4 font-display text-sm font-bold text-white shadow-glow transition-all duration-300 hover:bg-brand-800 hover:shadow-lift"
                      >
                        <IconGoogle className="h-5 w-5" />
                        {t('reviews.googleBtn')}
                        <IconExternalLink className="h-4.5 w-4.5 text-white/80" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="private"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <p className="text-sm text-ink-500 mb-5">
                        {t('reviews.privateDesc')}
                      </p>
                      <form onSubmit={handlePrivateSubmit} className="space-y-4">
                        <Field
                          label={t('reviews.labelName')}
                          htmlFor="r-name"
                          error={nameError}
                        >
                          <input
                            id="r-name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                              if (e.target.value.trim()) setNameError('')
                            }}
                            className={inputCls}
                          />
                        </Field>

                        <div>
                          <label className="mb-2 block font-display text-sm font-semibold text-ink-800">
                            {t('reviews.labelRating')}
                          </label>
                          <div className="flex gap-1.5 text-ink-200">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const active = hoverRating ? star <= hoverRating : star <= rating
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  className="transition-transform duration-100 hover:scale-115 focus:outline-none"
                                >
                                  <IconStar
                                    className={`h-8 w-8 ${
                                      active
                                        ? 'fill-gold-500 text-gold-500'
                                        : 'fill-ink-100 text-ink-200'
                                    }`}
                                  />
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <Field
                          label={t('reviews.labelMessage')}
                          htmlFor="r-message"
                          error={messageError}
                        >
                          <textarea
                            id="r-message"
                            rows={3}
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value)
                              if (e.target.value.trim()) setMessageError('')
                            }}
                            className={`${inputCls} resize-none`}
                          />
                        </Field>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mt-2 flex w-full items-center justify-center rounded-2xl bg-brand-700 py-3.5 font-display text-sm font-bold text-white shadow-glow transition-all duration-300 hover:bg-brand-800 hover:shadow-lift disabled:opacity-70"
                        >
                          {isSubmitting ? t('reviews.submitting') : t('reviews.privateBtn')}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
