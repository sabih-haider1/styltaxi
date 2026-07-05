import { AnimatePresence, motion } from 'framer-motion'

export const inputCls =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-950 placeholder:text-ink-300 transition-all duration-200 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15 focus:outline-none aria-[invalid=true]:border-accent-600 aria-[invalid=true]:ring-accent-600/10'

export const dateTimeInputCls = `${inputCls} appearance-none [-webkit-appearance:none] min-w-0`

/** Label + control + animated error message. */
export default function Field({ label, htmlFor, error, hint, optional, optionalLabel, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between font-display text-sm font-semibold text-ink-800">
        {label}
        {optional && <span className="text-xs font-normal text-ink-400">{optionalLabel}</span>}
      </label>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-1.5 text-sm text-accent-600"
            role="alert"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p className="pt-1.5 text-xs text-ink-400">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
