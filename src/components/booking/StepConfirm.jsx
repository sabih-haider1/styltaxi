import { useTranslation } from 'react-i18next'
import RouteMap from './RouteMap'
import { IconRoute, IconClock, IconCheck } from '../ui/Icons'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between gap-6 py-2.5">
      <dt className="shrink-0 text-sm text-ink-400">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink-900">{value}</dd>
    </div>
  )
}

export default function StepConfirm({ form, route, onRoute, airportLeg }) {
  const { t, i18n } = useTranslation()
  const v = form.getValues()
  const b = 'booking.confirm'

  const fmtDate = (iso) =>
    iso
      ? new Date(`${iso}T00:00`).toLocaleDateString(i18n.language, {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : ''

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl font-bold text-ink-950">{t(`${b}.title`)}</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Route preview */}
        <div className="flex flex-col gap-4">
          <RouteMap pickup={v.pickup} destination={v.destination} onRoute={onRoute} />
          {route && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
                <span className="rounded-xl bg-brand-50 p-2.5 text-brand-700">
                  <IconRoute className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-ink-400">{t(`${b}.distance`)}</div>
                  <div className="font-display text-lg font-bold text-ink-950">{route.distance}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-soft">
                <span className="rounded-xl bg-gold-500/15 p-2.5 text-gold-600">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs text-ink-400">{t(`${b}.duration`)}</div>
                  <div className="font-display text-lg font-bold text-ink-950">{route.duration}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-ink-100 bg-ink-50/50 p-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-700">
            {t(`${b}.summary`)}
          </h3>
          <dl className="mt-3 divide-y divide-ink-100">
            <Row label={t('booking.journey.pickup')} value={v.pickup} />
            <Row label={t('booking.journey.destination')} value={v.destination} />
            <Row label={t(`${b}.outbound`)} value={`${fmtDate(v.date)} · ${v.time}`} />
            {v.roundTrip && v.returnDate && (
              <Row label={t(`${b}.return`)} value={`${fmtDate(v.returnDate)} · ${v.returnTime}`} />
            )}
            <Row label={t('booking.journey.passengers')} value={v.passengers} />
            <Row
              label={t('booking.journey.luggage')}
              value={t('booking.journey.luggageItem', { count: Number(v.luggage) })}
            />
            {airportLeg && v.flightNumber && <Row label={t('booking.journey.flightNumber')} value={v.flightNumber} />}
            {airportLeg && v.terminal && <Row label={t('booking.journey.terminal')} value={v.terminal} />}
            <Row label={t(`${b}.passengerDetails`)} value={v.fullName} />
            <Row label={t(`${b}.contactDetails`)} value={`${v.email} · ${v.phone}`} />
            {v.specialRequests && <Row label={t(`${b}.notes`)} value={v.specialRequests} />}
          </dl>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
        <span className="mt-0.5 rounded-full bg-brand-600 p-1 text-white">
          <IconCheck className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-sm font-medium text-brand-900">{t(`${b}.noPayment`)}</p>
          <p className="mt-1 text-xs text-ink-400">{t(`${b}.terms`)}</p>
        </div>
      </div>
    </div>
  )
}
