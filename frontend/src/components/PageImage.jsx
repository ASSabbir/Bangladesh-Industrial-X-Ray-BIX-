// Renders an <img> if the src loads, otherwise falls back to a clean
// gradient placeholder with a label. This keeps every page usable even
// before real photography/assets are dropped into /public/images.
import { useState } from "react";

// Uploaded images are stored as backend-relative paths ("/uploads/xyz.jpg").
// In dev, Vite proxies /uploads to the backend so a relative path works fine.
// In production the frontend and backend are usually on different domains/
// ports, so we resolve /uploads/* against the backend's own origin (derived
// from VITE_API_URL) instead of the frontend's origin.
const API_URL = import.meta.env.VITE_API_URL || "/api";
const BACKEND_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function resolveSrc(src) {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src; // already absolute
  if (src.startsWith("/uploads/") && BACKEND_ORIGIN) return `${BACKEND_ORIGIN}${src}`;
  return src; // local /images/... assets served by the frontend itself
}

export default function PageImage({ src, alt, className = "", label }) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveSrc(src);

  if (!resolved || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white/50 text-xs font-semibold uppercase tracking-wider text-center px-2 ${className}`}
      >
        {label || alt || "BIX"}
      </div>
    );
  }

  return <img src={resolved} alt={alt} className={className} onError={() => setFailed(true)} loading="lazy" />;
}
