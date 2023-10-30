import React from "react";
import { useSwipeable } from "react-swipeable";
import { Direction } from "../../types/direction";
import { DirectionContext } from "../../Context/direction-context";

interface Props {
  children: React.ReactNode;
}

const SwipeHandler = ({ children }: Props) => {
  const [direction, setDirection] = React.useState<Direction | null>(null);
  const handlers = useSwipeable({
    onSwipedUp: () => {
      setDirection("up");
    },
    onSwipedRight: () => {
      setDirection("right");
    },
    onSwipedDown: () => {
      setDirection("down");
    },
    onSwipedLeft: () => {
      setDirection("left");
    },
  });
  const { setDirection: changeDirection } = React.useContext(DirectionContext);
  React.useEffect(() => {
    if (direction) changeDirection(direction);
  }, [direction]);

  return <div {...handlers}>{children}</div>;
};

export default SwipeHandler;
