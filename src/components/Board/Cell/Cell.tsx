import React from "react";
import styles from "../Board.module.scss";
import { BoardContext } from "../../../Context/board-context";
import snakeHead from "../../../imgs/snake-head.png";
import { Direction } from "../../../types/direction";

interface props {
  snakeCell: boolean;
  foodCell: boolean;
  getEatenCell: () => void;
  headCell: boolean;
  direction: Direction | null;
}

function getRotateDeg(direction: Direction): number {
  switch (direction) {
    case "up":
      return 180;
    case "right":
      return -90;
    case "down":
      return 0;
    case "left":
      return 90;
  }
}

const Cell: React.FC<props> = React.memo(
  ({ snakeCell, foodCell, getEatenCell, headCell, direction }) => {
    React.useEffect(() => {
      if (snakeCell && foodCell) {
        getEatenCell();
      }
    }, [snakeCell, foodCell, getEatenCell]);

    const { boardFoodColor, boardSnakeColor, boardColor } =
      React.useContext(BoardContext).boardSettings;

    const [rotate, setRotate] = React.useState(0);
    React.useEffect(() => {
      if (direction) {
        setRotate(getRotateDeg(direction));
      }
    }, [direction]);

    return (
      <div
        style={{
          backgroundColor: headCell
            ? boardColor
            : snakeCell && boardSnakeColor !== "default"
            ? boardSnakeColor
            : foodCell && boardFoodColor !== "default"
            ? boardFoodColor
            : !snakeCell && !foodCell && boardColor !== "default"
            ? boardColor
            : "",
        }}
        className={`${styles["board__cell"]} ${
          snakeCell ? styles["board__cell--snake"] : ""
        } ${foodCell ? styles["board__cell--food"] : ""}`}
      >
        {headCell && (
          <img
            style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
            className={styles["board__cell--snake__head"]}
            src={snakeHead}
            alt="head"
          ></img>
        )}
      </div>
    );
  }
);

export default Cell;
