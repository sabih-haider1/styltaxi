import { motion } from 'framer-motion'
import { pageTransition } from '../../lib/motion'

/** Root element of every page — provides the enter/exit route transition. */
export default function PageWrap({ children, className = '' }) {
  return (
    <motion.main
      id="content"
      className={className}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}
