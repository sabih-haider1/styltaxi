import { useTranslation } from 'react-i18next'
import Field, { inputCls } from './Field'

export default function StepPassenger({ form }) {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = form
  const b = 'booking.passenger'

  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 font-display text-2xl font-bold text-ink-950">{t(`${b}.title`)}</legend>

      <Field label={t(`${b}.fullName`)} htmlFor="fullName" error={errors.fullName?.message}>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder={t(`${b}.namePlaceholder`)}
          aria-invalid={!!errors.fullName || undefined}
          className={inputCls}
          {...register('fullName')}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t(`${b}.email`)} htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t(`${b}.emailPlaceholder`)}
            aria-invalid={!!errors.email || undefined}
            className={inputCls}
            {...register('email')}
          />
        </Field>
        <Field
          label={t(`${b}.phone`)}
          htmlFor="phone"
          error={errors.phone?.message}
          hint={t(`${b}.phoneHint`)}
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t(`${b}.phonePlaceholder`)}
            aria-invalid={!!errors.phone || undefined}
            className={inputCls}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field
        label={t(`${b}.emergency`)}
        htmlFor="emergencyContact"
        error={errors.emergencyContact?.message}
        optional
        optionalLabel={t('common.optional')}
      >
        <input
          id="emergencyContact"
          type="tel"
          placeholder={t(`${b}.emergencyPlaceholder`)}
          aria-invalid={!!errors.emergencyContact || undefined}
          className={inputCls}
          {...register('emergencyContact')}
        />
      </Field>

      <Field
        label={t(`${b}.requests`)}
        htmlFor="specialRequests"
        error={errors.specialRequests?.message}
        optional
        optionalLabel={t('common.optional')}
      >
        <textarea
          id="specialRequests"
          rows={4}
          placeholder={t(`${b}.requestsPlaceholder`)}
          aria-invalid={!!errors.specialRequests || undefined}
          className={`${inputCls} resize-none`}
          {...register('specialRequests')}
        />
      </Field>
    </fieldset>
  )
}
