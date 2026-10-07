/**
 * Inline-Icons statt Icon-Bibliothek — ein paar Pfade rechtfertigen keine
 * Dependency, und so erben sie Farbe und Größe direkt vom Text.
 */
const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowLeft() {
  return (
    <svg {...base}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function ArrowDown() {
  return (
    <svg {...base} width={16} height={16}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

export function Refresh() {
  return (
    <svg {...base}>
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function Send() {
  return (
    <svg {...base} width={17} height={17}>
      <path d="M4.5 12 20 4l-8 15.5-2.2-6.3L4.5 12Z" />
    </svg>
  );
}

export function ExternalLink() {
  return (
    <svg {...base} width={13} height={13} strokeWidth={2}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function Close() {
  return (
    <svg {...base} width={20} height={20}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
