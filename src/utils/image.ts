import { API_BASE_URL } from "../constants/app";

/**
 * Resolve an image URL/path returned by the backend to a fully-qualified URL
 * that the current device can reach.
 *
 * The backend now returns relative paths like `/uploads/image-123.jpg`.
 * Older records (or production data) may still have full URLs like
 * `http://localhost:5000/uploads/image-123.jpg`.
 *
 * In both cases we extract just the path portion and prefix it with the
 * current API_BASE_URL so images always resolve correctly regardless of
 * where the server is running (localhost, LAN IP, production domain, etc.).
 */
export function resolveImageUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;

  try {
    // If it's already a full URL, extract just the pathname
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
      const parsed = new URL(rawUrl);
      // Re-attach path to the current API base — strips stale host/port
      return `${API_BASE_URL}${parsed.pathname}`;
    }

    const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    return `${API_BASE_URL}${cleanPath}`;
  } catch {
    return rawUrl;
  }
}
