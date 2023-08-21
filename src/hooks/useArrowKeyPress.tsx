import React from "react";

export type direction = "left" | "up" | "right" | "down";

function useArrowKeyPress(): direction | null {
  const direction = React.useRef<direction | null>(null);
  const [, setCounter] = React.useState(0);

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.key.startsWith("Arrow")) {
      switch (event.key) {
        case "ArrowLeft":
          if (direction.current !== "right") {
            direction.current = "left";
            setCounter((prev) => ++prev);
          }
          break;
        case "ArrowUp":
          if (direction.current !== "down") {
            direction.current = "up";
            setCounter((prev) => ++prev);
          }
          break;
        case "ArrowRight":
          if (direction.current !== "left") {
            direction.current = "right";
            setCounter((prev) => ++prev);
          }
          break;
        case "ArrowDown":
          if (direction.current !== "up") {
            direction.current = "down";
            setCounter((prev) => ++prev);
          }
          break;
        default:
          direction.current = null;
          break;
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, []);

  return direction.current;
}

export default useArrowKeyPress;
