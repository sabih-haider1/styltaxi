import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

/** Fades content in when it scrolls into view. */
export default function Reveal({ children, variants = fadeUp, className = '', delay = 0, as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div
  // A variant-level transition always wins over the `transition` prop, so an
  // optional delay has to be merged into the variant itself.
  const delayed = useMemo(() => {
    if (!delay) return variants
    const visible = variants.visible || {}
    return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } }
  }, [variants, delay])

  return (
    <Tag
      className={className}
      variants={delayed}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
