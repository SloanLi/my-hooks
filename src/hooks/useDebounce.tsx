import { useRef } from "react";

export const useDebounce = (fn: () => void | VoidFunction, ms = 30) => {
  const timeout = useRef<number | null>();
  return () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  };
};
