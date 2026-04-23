import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { safeGet, safeSet, STORAGE_KEYS } from "@/lib/storage";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => safeGet(STORAGE_KEYS.theme, "light"));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    safeSet(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")) }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
