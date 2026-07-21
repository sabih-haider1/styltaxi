import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/** Dark hero band for interior pages, with optional background image. */
export default function PageHero({ title, subtitle, image, compact = false, children }) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-ink-950 ${
        compact ? 'min-h-[44svh] md:min-h-[48svh]' : 'min-h-[56svh] md:min-h-[62svh]'
      }`}
    >
      {image && (
        <div className="absolute inset-0" aria-hidden>
          <motion.img
            src={image}
            srcSet={image.endsWith('.jpg') ? `${image.replace(/\.jpg$/, '-sm.jpg')} 700w, ${image} 1400w` : undefined}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
        </div>
      )}
      <div
        aria-hidden
        className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(11_143_74/0.22),transparent)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-36 sm:px-6 md:pb-20 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="max-w-3xl text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-white/70 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
