/**
 * Inline icon set (Lucide-style strokes) so no icon library is needed.
 * All icons are decorative by default (aria-hidden); pass aria-label to override.
 */
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const make = (paths) =>
  function Icon({ className = 'h-6 w-6', ...rest }) {
    return (
      <svg {...base} className={className} {...rest}>
        {paths}
      </svg>
    )
  }

export const IconPlane = make(
  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
)
export const IconClock = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>
)
export const IconShield = make(
  <>
    <path d="M12 3c3 1.5 5.5 2 8 2 0 10-3.5 14-8 16-4.5-2-8-6-8-16 2.5 0 5-.5 8-2z" />
    <path d="m9 12 2 2 4-4" />
  </>
)
export const IconStar = make(
  <path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8z" />
)
export const IconPhone = make(
  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
)
export const IconWhatsApp = ({ className = 'h-6 w-6', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...rest}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8zm-3.1 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.2-.5s0-.3-.1-.4l-.7-1.7c-.2-.5-.4-.5-.6-.5h-.4z" />
  </svg>
)
export const IconMail = make(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
)
export const IconMapPin = make(
  <>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
)
export const IconUsers = make(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 14a6.5 6.5 0 0 1 4 6" />
  </>
)
export const IconBriefcase = make(
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
  </>
)
export const IconCar = make(
  <>
    <path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
    <path d="M4 11h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1M3 12v4a1 1 0 0 0 1 1h1" />
    <circle cx="7.5" cy="16.5" r="1.8" />
    <circle cx="16.5" cy="16.5" r="1.8" />
    <path d="M9.3 17h5.4" />
  </>
)
export const IconCalendar = make(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </>
)
export const IconLuggage = make(
  <>
    <rect x="6" y="7" width="12" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11v5M15 11v5" />
  </>
)
export const IconCheck = make(<path d="m4.5 12.5 5 5 10-11" />)
export const IconArrowRight = make(<path d="M4 12h16m-6-6 6 6-6 6" />)
export const IconChevronDown = make(<path d="m6 9 6 6 6-6" />)
export const IconMenu = make(<path d="M4 7h16M4 12h16M4 17h16" />)
export const IconX = make(<path d="m5 5 14 14M19 5 5 19" />)
export const IconSwap = make(<path d="M7 4v13m0 0-3-3m3 3 3-3m7 6V7m0 0 3 3m-3-3-3 3" />)
export const IconGlobe = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </>
)
export const IconRoute = make(
  <>
    <circle cx="6" cy="19" r="2.5" />
    <circle cx="18" cy="5" r="2.5" />
    <path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" strokeDasharray="0" />
  </>
)
export const IconSparkles = make(
  <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8zM5 3l.7 1.8L7.5 5.5l-1.8.7L5 8l-.7-1.8L2.5 5.5l1.8-.7z" />
)
export const IconBuilding = make(
  <>
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M10 21v-3h4v3" />
  </>
)
export const IconRoad = make(
  <>
    <path d="M4 21 9 3M20 21 15 3" />
    <path d="M12 5v2.5M12 11v2.5M12 17v2.5" />
  </>
)
export const IconHotel = make(
  <>
    <path d="M3 21V8l9-5 9 5v13" />
    <path d="M3 21h18M9 21v-4h6v4M9 11h.01M15 11h.01M12 14h.01" />
  </>
)
export const IconHeadset = make(
  <>
    <path d="M4 13a8 8 0 0 1 16 0" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19a3 3 0 0 1-3 3h-3" />
  </>
)
export const IconEuro = make(
  <path d="M17.5 5.5A7.5 7.5 0 0 0 6.8 8.5M17.5 18.5a7.5 7.5 0 0 1-10.7-3M4 10.5h9M4 13.5h8" />
)
export const IconInstagram = make(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" />
  </>
)
export const IconFacebook = make(
  <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8.5v3.5H11V21h3.5v-6.5H17L17.5 11h-3v-2a.5.5 0 0 1 .5-.5z" />
)
export const IconTwitterX = make(<path d="m4 4 16 16M20 4 4 20" />)
