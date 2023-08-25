import { useEffect, useRef } from "react";

export const useUpdate = (
  func: () => void | VoidFunction,
  depend: unknown[]
) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      func();
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...depend, func]);
};
