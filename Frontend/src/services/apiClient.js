import axios from "axios";
import { toast } from "sonner";
import { safeGet, clearAuthStorage, STORAGE_KEYS } from "@/lib/storage";

/**
 * Centralized API client. Point at your own Node backend by setting
 * VITE_API_BASE_URL in .env. Defaults to "/api" so you can also proxy in dev.
 */
const baseURL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach bearer token
api.interceptors.request.use((config) => {
  const token = safeGet(STORAGE_KEYS.token, null);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — global error handling + simple 5xx retry
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response?.status;
    const config = error.config;

    if (status === 401) {
      clearAuthStorage();
      toast.error("Your session expired. Please sign in again.");
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.assign("/login");
      }
      return Promise.reject(error);
    }

    // Retry once on 5xx with backoff
    if (status && status >= 500 && config) {
      config._retryCount = (config._retryCount ?? 0) + 1;
      if (config._retryCount <= 1) {
        await new Promise((r) => setTimeout(r, 600));
        return api.request(config);
      }
    }

    const msg = error.response?.data?.message ?? error.message ?? "Something went wrong";
    if (status !== 401) toast.error(msg);
    return Promise.reject(error);
  },
);
