import { z } from 'zod'

const PHONE_RE = /^\+?[0-9 ()./-]{7,20}$/

/**
 * Builds the wizard schema with translated messages.
 * `t` is the i18next translate function scoped to the app.
 */
export function buildBookingSchema(t) {
  const v = (key) => t(`booking.validation.${key}`)

  return z
    .object({
      pickup: z.string().trim().min(3, v('pickupRequired')),
      destination: z.string().trim().min(3, v('destinationRequired')),
      date: z
        .string()
        .min(1, v('dateRequired'))
        .refine((d) => d >= todayISO(), v('datePast')),
      time: z.string().min(1, v('timeRequired')),
      passengers: z.string(),
      luggage: z.string(),
      roundTrip: z.boolean(),
      returnDate: z.string(),
      returnTime: z.string(),
      flightNumber: z.string().trim(),
      terminal: z.string(),
      fullName: z.string().trim().min(2, v('nameRequired')),
      email: z.string().trim().email(v('emailInvalid')),
      phone: z.string().trim().regex(PHONE_RE, v('phoneInvalid')),
      emergencyContact: z
        .string()
        .trim()
        .refine((s) => s === '' || PHONE_RE.test(s), v('phoneInvalid')),
      specialRequests: z.string().trim().max(500, v('requestsMax')),
    })
    .superRefine((data, ctx) => {
      if (!data.roundTrip) return
      if (!data.returnDate) {
        ctx.addIssue({ code: 'custom', path: ['returnDate'], message: v('returnDateRequired') })
      }
      if (!data.returnTime) {
        ctx.addIssue({ code: 'custom', path: ['returnTime'], message: v('returnTimeRequired') })
      }
      if (data.returnDate && data.returnTime && data.date && data.time) {
        const out = new Date(`${data.date}T${data.time}`)
        const back = new Date(`${data.returnDate}T${data.returnTime}`)
        if (back <= out) {
          ctx.addIssue({ code: 'custom', path: ['returnDate'], message: v('returnAfter') })
        }
      }
    })
}

export function todayISO() {
  const d = new Date()
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

export const BOOKING_DEFAULTS = {
  pickup: '',
  destination: '',
  date: '',
  time: '',
  passengers: '2',
  luggage: '2',
  roundTrip: false,
  returnDate: '',
  returnTime: '',
  flightNumber: '',
  terminal: '',
  fullName: '',
  email: '',
  phone: '',
  emergencyContact: '',
  specialRequests: '',
}

export const STEP_FIELDS = {
  1: ['pickup', 'destination', 'date', 'time', 'passengers', 'luggage', 'roundTrip', 'returnDate', 'returnTime', 'flightNumber', 'terminal'],
  2: ['fullName', 'email', 'phone', 'emergencyContact', 'specialRequests'],
}
