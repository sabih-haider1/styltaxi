import { useState } from 'react'

/**
 * Lazy image with a branded shimmer while loading and a graceful gradient
 * fallback if the file is missing. `zoom` adds the group-hover zoom effect.
 *
 * By default serves a responsive srcset (700w "-sm" variant + full size) so
 * mobile devices never download desktop-sized JPEGs. Pass responsive={false}
 * for images without a generated -sm variant.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  zoom = false,
  eager = false,
  responsive = true,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const srcSet =
    responsive && src.endsWith('.jpg')
      ? `${src.replace(/\.jpg$/, '-sm.jpg')} 700w, ${src} 1400w`
      : undefined

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 ${className}`}>
      {!errored && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
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
