export const SITE = {
  name: 'StylTaxi',
  url: 'https://styltaxi.com',
  phone: import.meta.env.VITE_PHONE || '93 177 60 00',
  phoneHref: `tel:${(import.meta.env.VITE_PHONE || '+34931776000').replace(/\s/g, '')}`,
  whatsappHref: `https://wa.me/${import.meta.env.VITE_WHATSAPP || '34931776000'}`,
  // Shown publicly on the site; bookings are delivered to VITE_BOOKING_EMAIL.
  email: import.meta.env.VITE_PUBLIC_EMAIL || 'styltaxisabadell@gmail.com',
  city: 'Sabadell',
  country: 'ES',
  social: {
    instagram: 'https://instagram.com/styltaxi',
    facebook: 'https://facebook.com/styltaxi',
    x: 'https://x.com/styltaxi',
  },
  googleReviewUrl: import.meta.env.VITE_GOOGLE_REVIEW_URL || 'https://search.google.com/local/writereview?placeid=ChIJnZzB9J2ipBIRH36iW1mXQ3M', // Example or custom link
  googleProfileUrl: import.meta.env.VITE_GOOGLE_PROFILE_URL || 'https://g.page/r/ChIJnZzB9J2ipBIRH36iW1mXQ3M', // Example or custom profile link
  address: 'Plaça Catalunya 12, Sabadell',
  addressHref: 'https://maps.google.com/?q=Pla%C3%A7a+Catalunya+12,+Sabadell',
}

export const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

export const STATS = [
  { value: 12, suffix: '+', key: 'years' },
  { value: 48000, suffix: '+', key: 'rides' },
  { value: 150, suffix: '+', key: 'clients' },
  { value: 4.9, suffix: '★', key: 'rating', decimals: 1 },
]

export const SERVICE_KEYS = [
  { key: 'airport', img: '/images/services/airport.jpg', to: '/airport-transfers' },
  { key: 'hotel', img: '/images/services/hotel.jpg', to: '/services' },
  { key: 'corporate', img: '/images/services/corporate.jpg', to: '/corporate-travel' },
  { key: 'city', img: '/images/services/city.jpg', to: '/services' },
  { key: 'longdistance', img: '/images/services/longdistance.jpg', to: '/services' },
  { key: 'events', img: '/images/services/events.jpg', to: '/services' },
]

export const TERMINALS = ['T1', 'T2', 'T2B', 'T2C']

export function bookingReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'STX-'
  const rand = crypto.getRandomValues(new Uint32Array(6))
  for (let i = 0; i < 6; i++) ref += chars[rand[i] % chars.length]
  return ref
}
