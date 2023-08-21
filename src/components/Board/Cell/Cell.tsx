import React from "react";
import styles from "../Board.module.scss";

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
    return (
      <div
        className={`${styles["board__cell"]} ${
          snakeCell ? styles["board__cell--snake"] : ""
        } ${foodCell ? styles["board__cell--food"] : ""}`}
      ></div>
    );
  }
);

export default Cell;
