const paths = {
  guests: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 14c2.8 0 5 2.2 5 5" />
    </>
  ),
  parking: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M9.8 17V7.5h3.3a2.9 2.9 0 0 1 0 5.8H9.8" />
    </>
  ),
  audio: (
    <>
      <rect x="6" y="2.8" width="12" height="18.4" rx="2.5" />
      <circle cx="12" cy="9" r="2.7" />
      <circle cx="12" cy="16.8" r="1.4" />
    </>
  ),
  garden: (
    <>
      <path d="M12 21v-5.5" />
      <path d="M12 15.5c-3.5 0-6-2.2-6-5.1C6 7.1 8.7 4.8 12 4.8s6 2.3 6 5.6c0 2.9-2.5 5.1-6 5.1Z" />
      <path d="M9.4 18.6 12 16.6l2.6 2" />
    </>
  ),
  arrow: <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
}

function Icon({ name, className = '' }) {
  const path = paths[name]
  if (!path) return null

  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  )
}

export default Icon
