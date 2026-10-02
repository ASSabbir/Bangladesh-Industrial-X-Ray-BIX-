import { useEffect, useMemo, useRef, useState } from "react";

// One dropdown. Open/closed state is owned by the parent so only one
// dropdown is open at a time and the next one can open automatically.
export default function SolutionFinderSelect({
  icon,
  placeholder,
  options,
  value,
  disabled = false,
  open,
  onToggle,
  onSelect,
}) {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = setTimeout(() => searchRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
        className={`w-full text-left px-5 py-4 border-b-2 transition-colors flex flex-col gap-3
          ${
            disabled
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : open
              ? "bg-white border-accent text-primary"
              : "bg-white border-primary/20 text-primary hover:border-accent"
          }`}
      >
        <span className={disabled ? "text-gray-300" : "text-accent "}>{icon}</span>
        <span className="flex items-center justify-between gap-3">
          <span className={`text-sm sm:text-base ${selected ? "font-semibold" : ""}`}>
            {selected ? selected.label : placeholder}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M2 5l5 5 5-5" />
          </svg>
        </span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 top-full z-30 bg-white border border-black/10 shadow-lg">
          <div className="px-4 pt-3 pb-2 border-b border-black/10">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label={`Search ${placeholder.toLowerCase()}`}
              className="w-full text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-textmuted">No matches</li>
            )}
            {filtered.map((o) => (
              <li key={o.id} role="option" aria-selected={o.id === value}>
                <button
                  type="button"
                  onClick={() => onSelect(o.id)}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-black/5 last:border-b-0 hover:bg-background hover:text-accent ${
                    o.id === value ? "text-accent font-semibold" : "text-primary"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}