import React from "react";
import { gameState } from "../components/Board/Board";
import { Direction } from "../types/direction";
import { DirectionContext } from "../Context/direction-context";

interface Params {
  gameState: gameState;
  isTouchDevice: boolean;
}

function useGetDirection({
  gameState,
  isTouchDevice,
}: Params): Direction | null {
  const direction = React.useRef<Direction | null>(null);
  const [, setCounter] = React.useState(0);

  if (gameState === "end") direction.current = null;

  const { direction: direction_c } = React.useContext(DirectionContext);

  const handleArrowKeys = (event?: KeyboardEvent) => {
    if (isTouchDevice) {
      setAppropriateDirection(direction_c);
    } else {
      if (event?.key.startsWith("Arrow")) {
        const d: Direction = event.key
          .split("Arrow")[1]
          .toLowerCase() as Direction;
        setAppropriateDirection(d);
      }
    }
  };

  const setAppropriateDirection = (dir: Direction | null) => {
    switch (dir) {
      case "up":
        if (direction.current !== "down") {
          direction.current = "up";
          setCounter((prev) => ++prev);
        }
        break;
      case "right":
        if (direction.current !== "left") {
          direction.current = "right";
          setCounter((prev) => ++prev);
        }
        break;
      case "down":
        if (direction.current !== "up") {
          direction.current = "down";
          setCounter((prev) => ++prev);
        }
        break;
      case "left":
        if (direction.current !== "right") {
          direction.current = "left";
          setCounter((prev) => ++prev);
        }
        break;
      default:
        direction.current = null;
        break;
    }
  };
  React.useEffect(() => {
    if (isTouchDevice) {
      handleArrowKeys();
    } else {
      document.addEventListener("keydown", handleArrowKeys);
      return () => {
        document.removeEventListener("keydown", handleArrowKeys);
      };
    }
  }, [direction_c]);

  return direction.current;
}

export default useGetDirection;
