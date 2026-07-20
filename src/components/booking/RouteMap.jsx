import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGoogleMaps } from '../../lib/useGoogleMaps'
import { IconMapPin, IconRoute } from '../ui/Icons'

/**
 * Live Google Directions preview between pickup and destination.
 * Reports { distance, duration } up via onRoute. Falls back to an elegant
 * static card when the Maps API is unavailable or the route fails.
 */
export default function RouteMap({ pickup, destination, onRoute }) {
  const { t } = useTranslation()
  const { ready, hasKey } = useGoogleMaps()
  const mapEl = useRef(null)
  const mapRef = useRef(null)
  const rendererRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ok | error

  useEffect(() => {
    if (!ready || !mapEl.current) return
    if (!mapRef.current) {
      mapRef.current = new window.google.maps.Map(mapEl.current, {
        center: { lat: 41.5463, lng: 2.1086 }, // Sabadell
        zoom: 11,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        ],
      })
      rendererRef.current = new window.google.maps.DirectionsRenderer({
        map: mapRef.current,
        suppressMarkers: false,
        polylineOptions: { strokeColor: '#0B8F4A', strokeWeight: 5, strokeOpacity: 0.9 },
      })
    }
    const service = new window.google.maps.DirectionsService()
    setStatus('loading')
    service.route(
      { origin: pickup, destination, travelMode: window.google.maps.TravelMode.DRIVING },
      (result, routeStatus) => {
        if (routeStatus === 'OK' && result.routes[0]?.legs[0]) {
          rendererRef.current.setDirections(result)
          const leg = result.routes[0].legs[0]
          onRoute?.({ distance: leg.distance?.text || '', duration: leg.duration?.text || '' })
          setStatus('ok')
        } else {
          setStatus('error')
          onRoute?.(null)
        }
      }
    )
  }, [ready, pickup, destination, onRoute])

  if (!hasKey || status === 'error') {
    return (
      <div className="flex flex-col justify-center gap-5 rounded-2xl bg-gradient-to-br from-ink-950 via-brand-950 to-brand-800 p-8 text-white">
        <div className="flex items-start gap-3">
          <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.14em] text-white/50">{t('booking.journey.pickup')}</div>
            <div className="truncate font-display font-semibold">{pickup}</div>
          </div>
        </div>
        <div className="ml-2.5 h-8 border-l-2 border-dashed border-white/25" aria-hidden />
        <div className="flex items-start gap-3">
          <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.14em] text-white/50">{t('booking.journey.destination')}</div>
            <div className="truncate font-display font-semibold">{destination}</div>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/50">
          <IconRoute className="h-4 w-4 shrink-0" />
          {t('booking.confirm.mapUnavailable')}
        </p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div ref={mapEl} className="h-72 w-full md:h-full md:min-h-80" aria-label={t('booking.confirm.route')} />
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-50">
          <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" aria-hidden />
        </div>
      )}
    </div>
  )
}
