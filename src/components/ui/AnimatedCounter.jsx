import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

/**
 * Counts up from 0 when scrolled into view. The displayed value lives in
 * React state (not imperative DOM writes) so re-renders — e.g. a language
 * switch — never reset an already-finished counter back to zero.
 */
export default function AnimatedCounter({ value, decimals = 0, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1.8, bounce: 0 })

  const format = useCallback(
    (n) =>
      n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix,
    [decimals, suffix]
  )

  const [text, setText] = useState(() => format(0))

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    setText(format(spring.get()))
    return spring.on('change', (latest) => setText(format(latest)))
  }, [spring, format])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
