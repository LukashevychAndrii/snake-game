import React from "react";
import styles from "../Board.module.scss";
import { BoardContext } from "../../../Context/board-context";

interface props {
  pos: number;
  snakeCell: boolean;
  foodCell: boolean;
  getEatenCell: () => void;
}

const Cell: React.FC<props> = React.memo(
  ({ pos, snakeCell, foodCell, getEatenCell }) => {
    React.useEffect(() => {
      if (snakeCell && foodCell) {
        getEatenCell();
      }
    }, [snakeCell, foodCell, getEatenCell]);

    const { boardFoodColor, boardSnakeColor, boardColor } =
      React.useContext(BoardContext).boardSettings;

    return (
      <div
        style={{
          backgroundColor:
            snakeCell && boardSnakeColor !== "default"
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
      ></div>
    );
  }
);

export default Cell;
