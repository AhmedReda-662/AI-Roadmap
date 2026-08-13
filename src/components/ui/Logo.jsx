// The Roadmap Mark — a node on a route. Represents "a station on the
// learning line": where you are, and where the track goes next.
export default function Logo({ className = 'w-8 h-8' }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-lg ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        {/* Route rail receding to a horizon point */}
        <path
          d="M4 26 H28 M8 20 H24 M12 14 H20 M15.5 8 H16.5"
          stroke="var(--color-primary-500)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Station node — the "you are here" point */}
        <circle
          cx="22"
          cy="14"
          r="3.4"
          fill="var(--color-slate-950)"
          stroke="var(--color-primary-400)"
          strokeWidth="1.6"
        />
        <circle cx="22" cy="14" r="1.3" fill="var(--color-primary-400)" />
      </svg>
    </span>
  )
}