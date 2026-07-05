import { useMemo, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import StepJourney from './StepJourney'
import StepPassenger from './StepPassenger'
import StepConfirm from './StepConfirm'
import SuccessScreen from './SuccessScreen'
import Button from '../ui/Button'
import { IconCheck, IconArrowRight } from '../ui/Icons'
import { buildBookingSchema, BOOKING_DEFAULTS, STEP_FIELDS } from '../../lib/bookingSchema'
import { deliverForm } from '../../lib/submit'
import { bookingReference } from '../../lib/site'
import { looksLikeAirport } from '../../lib/useGoogleMaps'
import { EASE } from '../../lib/motion'

const TOTAL_STEPS = 3

export default function BookingWizard() {
  const { t } = useTranslation()
  const schema = useMemo(() => buildBookingSchema(t), [t])
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: BOOKING_DEFAULTS,
    mode: 'onTouched',
  })

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [route, setRoute] = useState(null)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [reference, setReference] = useState('')

  const pickup = form.watch('pickup')
  const destination = form.watch('destination')
  const airportLeg = looksLikeAirport(pickup) || looksLikeAirport(destination)

  const onRoute = useCallback((r) => setRoute(r), [])
  const clearRoute = useCallback(() => setRoute(null), [])

  const stepLabels = [t('booking.steps.journey'), t('booking.steps.passenger'), t('booking.steps.confirm')]

  const goNext = async () => {
    const valid = await form.trigger(STEP_FIELDS[step])
    if (!valid) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
    setStatus('idle')
  }

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus('submitting')
    const ref = bookingReference()
    try {
      await deliverForm(`Passenger booking ${ref} — ${data.pickup} → ${data.destination}`, {
        reference: ref,
        topic: 'Passenger booking',
        ...data,
        roundTrip: data.roundTrip ? 'yes' : 'no',
        distance: route?.distance || 'n/a',
        duration: route?.duration || 'n/a',
      })
      setReference(ref)
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  })

  const restart = () => {
    form.reset(BOOKING_DEFAULTS)
    setRoute(null)
    setReference('')
    setStatus('idle')
    setDirection(-1)
    setStep(1)
  }

  if (status === 'success') {
    return <SuccessScreen reference={reference} name={form.getValues('fullName')} onRestart={restart} />
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-lift">
      {/* Progress header */}
      <div className="border-b border-ink-100 bg-ink-50/50 px-6 py-6 md:px-10">
        <p className="sr-only" aria-live="polite">
          {t('booking.stepOf', { current: step, total: TOTAL_STEPS })}
        </p>
        <ol className="flex items-center gap-2 md:gap-4">
          {stepLabels.map((label, i) => {
            const n = i + 1
            const active = n === step
            const done = n < step
            return (
              <li key={label} className="flex flex-1 items-center gap-2 md:gap-4 last:flex-none">
                <span className="flex items-center gap-2.5 md:gap-3">
                  <motion.span
                    animate={{
                      backgroundColor: done || active ? '#056438' : '#FFFFFF',
                      color: done || active ? '#FFFFFF' : '#7e8582',
                      borderColor: done || active ? '#056438' : '#c7cbc9',
                      scale: active ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-bold"
                  >
                    {done ? <IconCheck className="h-4.5 w-4.5" /> : n}
                  </motion.span>
                  <span
                    className={`hidden font-display text-sm font-semibold sm:block ${
                      active ? 'text-ink-950' : done ? 'text-brand-700' : 'text-ink-400'
                    }`}
                  >
                    {label}
                  </span>
                </span>
                {n < TOTAL_STEPS && (
                  <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-brand-600"
                      initial={false}
                      animate={{ width: done ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Step body */}
      <form onSubmit={onSubmit} noValidate>
        <div className="px-6 py-8 md:px-10 md:py-10">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -44 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step === 1 && <StepJourney form={form} airportLeg={airportLeg} onPlaceChange={clearRoute} />}
              {step === 2 && <StepPassenger form={form} />}
              {step === 3 && <StepConfirm form={form} route={route} onRoute={onRoute} airportLeg={airportLeg} />}
            </motion.div>
          </AnimatePresence>

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-accent-600/30 bg-accent-600/5 p-5"
              role="alert"
            >
              <p className="font-display font-bold text-accent-700">{t('booking.error.title')}</p>
              <p className="mt-1 text-sm text-ink-600">{t('booking.error.text')}</p>
            </motion.div>
          )}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between gap-4 border-t border-ink-100 bg-ink-50/50 px-6 py-5 md:px-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-semibold text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-950"
            >
              ← {t('common.back')}
            </button>
          ) : (
            <span />
          )}
          {step < TOTAL_STEPS ? (
            <Button type="button" onClick={goNext} size="lg">
              {t('common.next')}
              <IconArrowRight className="h-4.5 w-4.5" />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <span
                    className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                  {t('common.sending')}
                </>
              ) : (
                <>
                  {t('common.submit')}
                  <IconCheck className="h-4.5 w-4.5" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
