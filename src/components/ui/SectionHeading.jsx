import Reveal from './Reveal'

/** Eyebrow + title + subtitle block used to open every section. */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', dark = false }) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignCls} mb-12 md:mb-16`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-block rounded-full px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] ${
            dark ? 'bg-white/10 text-gold-400' : 'bg-brand-50 text-brand-700'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance font-display text-3xl font-bold tracking-tight md:text-5xl ${
          dark ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-balance text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink-500'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
