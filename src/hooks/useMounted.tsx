import { useEffect, useRef } from "react";

export const useMounted = (func: () => void | VoidFunction): void => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) return;
    func();
    isMounted.current = true;
  }, [func]);
};
