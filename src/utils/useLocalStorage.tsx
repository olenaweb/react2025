'use client';
import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === "undefined") return initialValue;
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : initialValue;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  }, [key, value]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleBeforeUnload = () => {
      localStorage.setItem(key, value);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
