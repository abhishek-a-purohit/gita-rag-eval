import { useState, useEffect } from "react";

/**
 * A drop-in replacement for useState that persists its value to localStorage.
 *
 * - Reads the initial value from localStorage on first render.
 * - Writes on every state update.
 * - Falls back to `initialValue` if the stored value can't be parsed.
 *
 * @template T
 * @param {string} key          — localStorage key
 * @param {T}      initialValue — used when nothing is stored yet
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]}
 *
 * @example
 * const [history, setHistory] = useLocalStorage("chat-history", []);
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // Corrupted or missing — start fresh.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or denied — fail silently.
    }
  }, [key, value]);

  return [value, setValue];
}
