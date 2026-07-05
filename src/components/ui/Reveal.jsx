import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motion'

/** Fades content in when it scrolls into view. */
export default function Reveal({ children, variants = fadeUp, className = '', delay = 0, as = 'div', ...rest }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
