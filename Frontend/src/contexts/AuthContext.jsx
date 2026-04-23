import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { safeGet, safeSet, clearAuthStorage, STORAGE_KEYS } from "@/lib/storage";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeGet(STORAGE_KEYS.user, null));
  const [token, setToken] = useState(() => safeGet(STORAGE_KEYS.token, null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) safeSet(STORAGE_KEYS.user, user);
  }, [user]);

  const login = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { user, token } = await authService.login(payload);
      safeSet(STORAGE_KEYS.token, token);
      safeSet(STORAGE_KEYS.user, user);
      setUser(user);
      setToken(token);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      return user;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { user, token } = await authService.signup(payload);
      safeSet(STORAGE_KEYS.token, token);
      safeSet(STORAGE_KEYS.user, user);
      setUser(user);
      setToken(token);
      toast.success(`Welcome to GyaanSetu, ${user.name.split(" ")[0]}!`);
      return user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setToken(null);
    toast.success("Signed out");
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user && !!token,
      isAdmin: user?.role === "admin",
    }),
    [user, token, loading, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
