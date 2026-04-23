/**
 * Safe storage helpers — gracefully fall back when localStorage / sessionStorage
 * is unavailable (Safari private mode, SSR, etc.).
 */

function getStore(kind) {
  try {
    if (typeof window === "undefined") return null;
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function safeGet(key, fallback, kind = "local") {
  const store = getStore(kind);
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function safeSet(key, value, kind = "local") {
  const store = getStore(kind);
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or unavailable */
  }
}

export function safeRemove(key, kind = "local") {
  const store = getStore(kind);
  if (!store) return;
  try {
    store.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function clearAuthStorage() {
  ["gs_token", "gs_user", "gs_refresh"].forEach((k) => safeRemove(k, "local"));
  // Wipe transient session data on logout
  const session = getStore("session");
  if (session) {
    try {
      session.clear();
    } catch {
      /* ignore */
    }
  }
}

export const STORAGE_KEYS = {
  token: "gs_token",
  user: "gs_user",
  theme: "gs_theme",
  language: "gs_language",
  prefs: "gs_prefs",
  courseDraft: "gs_course_draft",
  catalogFilters: "gs_catalog_filters",
};
