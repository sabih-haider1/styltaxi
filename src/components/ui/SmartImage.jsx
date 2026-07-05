import { useState } from 'react'

/**
 * Lazy image with a branded shimmer while loading and a graceful gradient
 * fallback if the file is missing. `zoom` adds the group-hover zoom effect.
 */
export default function SmartImage({ src, alt = '', className = '', zoom = false, eager = false }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 ${className}`}>
      {!errored && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${zoom ? 'group-hover:scale-105' : ''}`}
        />
      )}
    </div>
  )
}
