import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Created once at module level: creating it inside render would produce a new
// component type per render and force React to remount the link every time.
const MotionLink = motion.create(Link)

const VARIANTS = {
  // brand-700 (not 600) keeps white text at a WCAG AA contrast ratio
  primary:
    'bg-brand-700 text-white hover:bg-brand-800 shadow-glow',
  gold:
    'bg-gold-500 text-ink-950 hover:bg-gold-400',
  dark:
    'bg-ink-950 text-white hover:bg-ink-800',
  outline:
    'border-2 border-white/80 text-white hover:bg-white hover:text-ink-950',
  ghost:
    'text-brand-700 hover:bg-brand-50',
  white:
    'bg-white text-ink-950 hover:bg-ink-50 shadow-soft',
}

const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
}

/**
 * Animated button with a material-style ripple. Renders a <Link> when `to`
 * is given, an <a> when `href` is given, otherwise a <button>.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const ripple = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    }
    setRipples((r) => [...r, ripple])
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== ripple.id)), 650)
  }, [])

  const cls = `relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-tight transition-colors duration-300 cursor-pointer select-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  }

  const handleClick = (e) => {
    addRipple(e)
    onClick?.(e)
  }

  if (to) {
    return (
      <MotionLink to={to} className={cls} onClick={handleClick} {...motionProps} {...rest}>
        {inner}
      </MotionLink>
    )
  }
  if (href) {
    return (
      <motion.a href={href} className={cls} onClick={handleClick} {...motionProps} {...rest}>
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button type={type} className={cls} onClick={handleClick} {...motionProps} {...rest}>
      {inner}
    </motion.button>
  )
}
