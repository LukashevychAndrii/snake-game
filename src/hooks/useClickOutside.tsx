import React from "react";

type ref = React.RefObject<HTMLElement | null>;
export default function useClickOutside(
  ref: ref
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [outside, setOutside] = React.useState(false);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOutside(true);
      } else {
        setOutside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return [outside, setOutside];
}
