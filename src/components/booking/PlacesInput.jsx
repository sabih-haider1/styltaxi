import { useEffect, useRef } from 'react'
import { inputCls } from './Field'
import { useGoogleMaps } from '../../lib/useGoogleMaps'

/**
 * Text input upgraded with Google Places Autocomplete when the API is
 * available; otherwise it behaves as a plain address field.
 */
export default function PlacesInput({ id, name, placeholder, register, setValue, onPlace, invalid }) {
  const { ready } = useGoogleMaps()
  const inputRef = useRef(null)
  const acRef = useRef(null)
  const { ref: rhfRef, ...field } = register(name)

  useEffect(() => {
    if (!ready || !inputRef.current || acRef.current) return
    acRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ['formatted_address', 'name', 'types'],
    })
    const listener = acRef.current.addListener('place_changed', () => {
      const place = acRef.current.getPlace()
      if (!place) return
      const label =
        place.types?.includes('airport') && place.name
          ? `${place.name}`
          : place.formatted_address || place.name || inputRef.current.value
      setValue(name, label, { shouldValidate: true, shouldDirty: true })
      onPlace?.(place)
    })
    return () => listener.remove()
  }, [ready, name, setValue, onPlace])

  return (
    <input
      id={id}
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      aria-invalid={invalid || undefined}
      className={inputCls}
      {...field}
      ref={(el) => {
        rhfRef(el)
        inputRef.current = el
      }}
    />
  )
}
