import { useEffect, useRef, useState } from "react";

export const useThrottle = (
  fn: () => void | VoidFunction,
  ms = 30,
  deps: unknown[] = []
) => {
  const previous = useRef<number>(0);
  const [time, setTime] = useState<number>(ms);
  useEffect(() => {
    const now = Date.now();
    if (now - previous.current > time) {
      fn();
      previous.current = now;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const cancel = () => {
    setTime(0);
  };

  return [cancel];
};
