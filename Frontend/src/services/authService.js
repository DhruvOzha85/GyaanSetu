import { api } from "@/services/apiClient";
import { mockUser, mockAdmin } from "@/data/mock";

/**
 * Auth service. Currently backed by mock data so the UI works without a server.
 * When VITE_USE_REAL_API is "true", calls go to your real backend via apiClient.
 */
const useReal = import.meta.env.VITE_USE_REAL_API === "true";

const fakeDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  async login(payload) {
    if (useReal) return (await api.post("/auth/login", payload)).data;
    await fakeDelay();
    const isAdmin = payload.email.toLowerCase().includes("admin");
    return { token: "mock-jwt-token", user: isAdmin ? mockAdmin : { ...mockUser, email: payload.email } };
  },

  async signup(payload) {
    if (useReal) return (await api.post("/auth/signup", payload)).data;
    await fakeDelay();
    return { token: "mock-jwt-token", user: { ...mockUser, name: payload.name, email: payload.email } };
  },

  async forgotPassword(email) {
    if (useReal) return (await api.post("/auth/forgot-password", { email })).data;
    await fakeDelay();
    return { ok: true };
  },

  async resetPassword(token, password) {
    if (useReal) return (await api.post("/auth/reset-password", { token, password })).data;
    await fakeDelay();
    return { ok: true };
  },

  async me() {
    if (useReal) return (await api.get("/auth/me")).data;
    await fakeDelay(200);
    return mockUser;
  },
};
