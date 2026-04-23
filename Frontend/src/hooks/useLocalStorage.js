import { useCallback, useState } from "react";
import { safeGet, safeSet } from "@/lib/storage";

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => safeGet(key, initial));
  const update = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        safeSet(key, resolved);
        return resolved;
      });
    },
    [key],
  );
  return [value, update];
}
