import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconChevronDown } from './Icons'
import { EASE } from '../../lib/motion'

/** Accessible animated accordion (FAQ). One item open at a time. */
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <div className="divide-y divide-ink-100 rounded-3xl border border-ink-100 bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-button-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-ink-950 transition-colors hover:text-brand-700 md:px-8 md:text-lg"
              >
                {item.q}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`shrink-0 rounded-full p-1.5 ${isOpen ? 'bg-brand-600 text-white' : 'bg-ink-50 text-ink-500'}`}
                >
                  <IconChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-ink-500 md:px-8">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
