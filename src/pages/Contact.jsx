import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import PageWrap from '../components/layout/PageWrap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Field, { inputCls } from '../components/booking/Field'
import { deliverForm } from '../lib/submit'
import { SITE } from '../lib/site'
import { fadeUp, stagger } from '../lib/motion'
import { IconPhone, IconWhatsApp, IconMail, IconClock, IconCheck } from '../components/ui/Icons'

export default function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', topic: 'general', message: '' } })

  const cards = [
    { Icon: IconPhone, title: t('contact.phone'), value: SITE.phone, text: t('contact.phoneText'), href: SITE.phoneHref },
    { Icon: IconWhatsApp, title: t('contact.whatsapp'), value: SITE.phone, text: t('contact.whatsappText'), href: SITE.whatsappHref },
    { Icon: IconMail, title: t('contact.email'), value: SITE.email, text: t('contact.emailText'), href: `mailto:${SITE.email}` },
    { Icon: IconClock, title: t('contact.hours'), value: t('contact.hoursValue'), text: t('contact.hoursText') },
  ]

  const onSubmit = handleSubmit(async (data) => {
    const topicLabel = t(`contact.topics.${data.topic}`)
    await deliverForm(`Contact enquiry - ${topicLabel} from ${data.name}`, {
      ...data,
      topic: topicLabel,
    })
    setSent(true)
  })

  return (
    <PageWrap>
      <Seo page="contact" />
      <PageHero title={t('contact.title')} subtitle={t('contact.subtitle')} image="/images/contact.jpg" compact />

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {cards.map(({ Icon, title, value, text, href }, i) => {
              const inner = (
                <>
                  <span className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {title}
                  </h3>
                  <p className="mt-1.5 break-all font-display text-lg font-bold leading-snug text-ink-950">{value}</p>
                  <p className="mt-1 text-sm text-ink-400">{text}</p>
                </>
              )
              const cls =
                'group block rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift'
              return (
                <motion.div key={i} variants={fadeUp}>
                  {href ? (
                    <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            {/* Form */}
            <Reveal className="rounded-[2rem] border border-ink-100 bg-white p-8 shadow-soft md:p-10">
              <h2 className="font-display text-2xl font-bold text-ink-950">{t('contact.formTitle')}</h2>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex items-center gap-4 rounded-2xl bg-brand-50 p-6"
                  role="status"
                >
                  <span className="rounded-full bg-brand-600 p-2 text-white">
                    <IconCheck className="h-5 w-5" />
                  </span>
                  <p className="font-medium text-brand-900">{t('contact.sent')}</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label={t('contact.name')} htmlFor="c-name" error={errors.name && t('booking.validation.nameRequired')}>
                      <input
                        id="c-name"
                        type="text"
                        autoComplete="name"
                        className={inputCls}
                        aria-invalid={!!errors.name || undefined}
                        {...register('name', { required: true, minLength: 2 })}
                      />
                    </Field>
                    <Field
                      label={t('booking.passenger.email')}
                      htmlFor="c-email"
                      error={errors.email && t('booking.validation.emailInvalid')}
                    >
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="email"
                        className={inputCls}
                        aria-invalid={!!errors.email || undefined}
                        {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                      />
                    </Field>
                  </div>
                  <Field label={t('contact.topic')} htmlFor="c-topic">
                    <select id="c-topic" className={inputCls} {...register('topic')}>
                      <option value="general">{t('contact.topics.general')}</option>
                      <option value="booking">{t('contact.topics.booking')}</option>
                      <option value="quote">{t('contact.topics.quote')}</option>
                      <option value="support">{t('contact.topics.support')}</option>
                    </select>
                  </Field>
                  <Field label={t('contact.message')} htmlFor="c-message" error={errors.message?.message}>
                    <textarea
                      id="c-message"
                      rows={5}
                      placeholder={t('contact.messagePlaceholder')}
                      className={`${inputCls} resize-none`}
                      aria-invalid={!!errors.message || undefined}
                      {...register('message', {
                        required: t('contact.validation.messageRequired'),
                        minLength: { value: 5, message: t('contact.validation.messageTooShort') },
                      })}
                    />
                  </Field>
                  <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
                    {isSubmitting ? t('common.sending') : t('contact.send')}
                  </Button>
                </form>
              )}
            </Reveal>

            {/* Map embed */}
            <Reveal className="overflow-hidden rounded-[2rem] shadow-soft">
              <iframe
                title={t('contact.mapTitle')}
                src="https://www.google.com/maps?q=Sabadell,Spain&z=12&output=embed"
                className="h-full min-h-96 w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </PageWrap>
  )
}
