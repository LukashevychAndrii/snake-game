import React from "react";

type ref = React.RefObject<HTMLElement | null>;
export function useClickOutsideVariants(ref: ref, labelRef: ref): boolean {
  const [outside, setOutside] = React.useState(true);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        (ref.current && !ref.current.contains(event.target as Node)) ||
        (!outside &&
          labelRef.current &&
          labelRef.current?.contains(event.target as Node))
      ) {
        setOutside(true);
      } else {
        setOutside(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, labelRef, outside]);
  return outside;
}
