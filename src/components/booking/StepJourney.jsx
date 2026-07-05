import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import Field, { inputCls } from './Field'
import PlacesInput from './PlacesInput'
import { IconSwap, IconPlane } from '../ui/Icons'
import { TERMINALS } from '../../lib/site'
import { todayISO } from '../../lib/bookingSchema'

export default function StepJourney({ form, airportLeg, onPlaceChange }) {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = form

  const roundTrip = watch('roundTrip')
  const b = 'booking.journey'

  const swap = () => {
    const { pickup, destination } = getValues()
    setValue('pickup', destination, { shouldDirty: true })
    setValue('destination', pickup, { shouldDirty: true })
    onPlaceChange?.()
  }

  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 font-display text-2xl font-bold text-ink-950">{t(`${b}.title`)}</legend>

      <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        <Field label={t(`${b}.pickup`)} htmlFor="pickup" error={errors.pickup?.message}>
          <PlacesInput
            id="pickup"
            name="pickup"
            placeholder={t(`${b}.pickupPlaceholder`)}
            register={register}
            setValue={setValue}
            onPlace={onPlaceChange}
            invalid={!!errors.pickup}
          />
        </Field>
        <Field label={t(`${b}.destination`)} htmlFor="destination" error={errors.destination?.message}>
          <PlacesInput
            id="destination"
            name="destination"
            placeholder={t(`${b}.destinationPlaceholder`)}
            register={register}
            setValue={setValue}
            onPlace={onPlaceChange}
            invalid={!!errors.destination}
          />
        </Field>
        <button
          type="button"
          onClick={swap}
          aria-label={t(`${b}.swap`)}
          title={t(`${b}.swap`)}
          className="absolute -right-3 top-[2.4rem] hidden cursor-pointer rounded-full border border-ink-200 bg-white p-2 text-ink-500 shadow-soft transition-all hover:rotate-180 hover:border-brand-600 hover:text-brand-600 md:left-1/2 md:right-auto md:block md:-translate-x-1/2 duration-300"
        >
          <IconSwap className="h-4 w-4 rotate-90" />
        </button>
      </div>

      <AnimatePresence>
        {airportLeg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
              <p className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-800">
                <IconPlane className="h-4.5 w-4.5 shrink-0" />
                {t(`${b}.airportDetected`)}
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label={t(`${b}.flightNumber`)}
                  htmlFor="flightNumber"
                  optional
                  optionalLabel={t('common.optional')}
                >
                  <input
                    id="flightNumber"
                    type="text"
                    placeholder={t(`${b}.flightPlaceholder`)}
                    className={inputCls}
                    {...register('flightNumber')}
                  />
                </Field>
                <Field label={t(`${b}.terminal`)} htmlFor="terminal" optional optionalLabel={t('common.optional')}>
                  <select id="terminal" className={inputCls} {...register('terminal')}>
                    <option value="">{t(`${b}.terminalPlaceholder`)}</option>
                    {TERMINALS.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t(`${b}.date`)} htmlFor="date" error={errors.date?.message}>
          <input
            id="date"
            type="date"
            min={todayISO()}
            aria-invalid={!!errors.date || undefined}
            className={inputCls}
            {...register('date')}
          />
        </Field>
        <Field label={t(`${b}.time`)} htmlFor="time" error={errors.time?.message}>
          <input
            id="time"
            type="time"
            aria-invalid={!!errors.time || undefined}
            className={inputCls}
            {...register('time')}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t(`${b}.passengers`)} htmlFor="passengers">
          <select id="passengers" className={inputCls} {...register('passengers')}>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t(`${b}.luggage`)} htmlFor="luggage">
          <select id="luggage" className={inputCls} {...register('luggage')}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={String(n)}>
                {t(`${b}.luggageItem`, { count: n })}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label
        htmlFor="roundTrip"
        className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-colors ${
          roundTrip ? 'border-brand-600 bg-brand-50/70' : 'border-ink-200 bg-white hover:border-ink-300'
        }`}
      >
        <span>
          <span className="block font-display text-sm font-semibold text-ink-950">{t(`${b}.roundTrip`)}</span>
          <span className="mt-0.5 block text-xs text-ink-400">{t(`${b}.roundTripHint`)}</span>
        </span>
        <span className="relative inline-flex">
          <input id="roundTrip" type="checkbox" className="peer sr-only" {...register('roundTrip')} />
          <span className="h-7 w-12 rounded-full bg-ink-200 transition-colors peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-600/25" />
          <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>

      <AnimatePresence>
        {roundTrip && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t(`${b}.returnDate`)} htmlFor="returnDate" error={errors.returnDate?.message}>
                <input
                  id="returnDate"
                  type="date"
                  min={todayISO()}
                  aria-invalid={!!errors.returnDate || undefined}
                  className={inputCls}
                  {...register('returnDate')}
                />
              </Field>
              <Field label={t(`${b}.returnTime`)} htmlFor="returnTime" error={errors.returnTime?.message}>
                <input
                  id="returnTime"
                  type="time"
                  aria-invalid={!!errors.returnTime || undefined}
                  className={inputCls}
                  {...register('returnTime')}
                />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </fieldset>
  )
}
