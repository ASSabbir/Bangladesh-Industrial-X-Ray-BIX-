// Shared helper for turning a stored image path into a URL an <img> tag can
// actually load. Uploaded images are stored as backend-relative paths
// ("/uploads/xyz.jpg"). In dev, Vite proxies /uploads to the backend so a
// relative path works fine as-is. In production the frontend and backend
// are usually on different domains/ports, so we resolve /uploads/* against
// the backend's own origin (derived from VITE_API_URL) instead of the
// frontend's origin. Local /images/... assets (served by the frontend
// itself) and already-absolute URLs pass through unchanged.
const API_URL = import.meta.env.VITE_API_URL || "/api";
const BACKEND_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export function resolveImageUrl(src) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/uploads/") && BACKEND_ORIGIN) return `${BACKEND_ORIGIN}${src}`;
  return src;
}