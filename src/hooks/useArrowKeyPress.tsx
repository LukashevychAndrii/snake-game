import { useEffect, useState } from "react";

function useArrowKeyPress(): "left" | "up" | "right" | "down" | null {
  const [direction, setDirection] = useState<
    "left" | "up" | "right" | "down" | null
  >(null);

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.key.startsWith("Arrow")) {
      switch (event.key) {
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        default:
          setDirection(null);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, []);

  return direction;
}

export default useArrowKeyPress;
