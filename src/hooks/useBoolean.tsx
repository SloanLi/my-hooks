import { useState } from "react";

const useBoolean = (
  bool: boolean
): [boolean, { on: () => void; off: () => void }] => {
  const [boolean, setBoolean] = useState(bool);
  return [
    boolean,
    {
      on: () => {
        setBoolean(true);
      },
      off: () => {
        setBoolean(false);
      },
    },
  ];
};
export default useBoolean;
