import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

/** Counts up from 0 when scrolled into view. */
export default function AnimatedCounter({ value, decimals = 0, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1.8, bounce: 0 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          latest.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix
      }
    })
  }, [spring, decimals, suffix])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
