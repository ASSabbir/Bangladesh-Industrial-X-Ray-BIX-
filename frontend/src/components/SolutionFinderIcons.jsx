const base = {
  width: 40,
  height: 40,
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IndustryIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 33V16l9 6v-6l9 6V9h6v24z" fill="currentColor" fillOpacity="0.12" />
      <path d="M6 33h24" />
    </svg>
  );
}

export function SpecialtyIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="20" cy="20" r="14" />
      <path d="M26 14l-4 12-4-6-6-2z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function MethodIcon({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="10" r="4" />
      <circle cx="10" cy="30" r="4" />
      <circle cx="28" cy="20" r="6" fill="currentColor" fillOpacity="0.15" />
      <path d="M13 12l11 6M13 28l11-6" />
    </svg>
  );
}