import React from "react";
import styles from "../Board.module.scss";

interface props {
  pos: number;
  snakeCell: boolean;
}

const Cell: React.FC<props> = React.memo(({ pos, snakeCell }) => {
  // React.useEffect(() => {
  //   console.log(snakeCell);
  // });
  return (
    <div
      className={`${styles["board__cell"]} ${
        snakeCell ? styles["board__cell__snake"] : ""
      }`}
    ></div>
  );
});

export default Cell;
