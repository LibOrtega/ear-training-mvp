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
  kitchen: (
    <>
      <path d="M7 3v7a2.5 2.5 0 0 0 5 0V3" />
      <path d="M9.5 12.5V21" />
      <path d="M17 3c-1.4 1.6-2 3.3-2 5.2 0 1.6.7 2.6 2 3.1V21" />
    </>
  ),
  planner: (
    <>
      <rect x="4" y="4.5" width="16" height="16" rx="3" />
      <path d="M4 9.5h16M8.5 3v3M15.5 3v3" />
      <path d="M8.8 14.4l1.9 1.9 3.9-3.9" />
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
