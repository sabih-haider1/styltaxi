import { useEffect, useState } from 'react'
import { MAPS_API_KEY } from './site'

let loaderPromise = null

function loadScript() {
  if (loaderPromise) return loaderPromise
  loaderPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) return resolve(window.google)
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&loading=async&callback=__styltaxiMapsReady`
    script.async = true
    window.__styltaxiMapsReady = () => resolve(window.google)
    script.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(script)
  })
  return loaderPromise
}

/**
 * Loads the Google Maps JS API once, on demand.
 * Returns { ready, failed } — when no API key is configured, both stay false
 * and callers render their graceful fallbacks.
 */
export function useGoogleMaps() {
  const [state, setState] = useState({ ready: !!window.google?.maps?.places, failed: false })

  useEffect(() => {
    if (!MAPS_API_KEY || state.ready) return
    let mounted = true
    loadScript()
      .then(() => mounted && setState({ ready: true, failed: false }))
      .catch(() => mounted && setState({ ready: false, failed: true }))
    return () => {
      mounted = false
    }
  }, [state.ready])

  return { ready: state.ready, failed: state.failed, hasKey: !!MAPS_API_KEY }
}

const AIRPORT_RE = /\b(airport|aeropuerto|aeroport|el prat|bcn|gro|reu)\b/i

export function looksLikeAirport(text = '', placeTypes = []) {
  return placeTypes.includes('airport') || AIRPORT_RE.test(text)
}
