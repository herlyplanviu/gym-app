import { useState, useEffect } from "react";

/**
 * useDebounce - Hook untuk memberikan nilai yang tertunda (debounced) setelah durasi tertentu.
 *
 * @param value - Nilai yang akan di-debounce.
 * @param delay - Waktu tunggu dalam milidetik sebelum nilai diperbarui.
 * @returns Nilai yang di-debounce.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
