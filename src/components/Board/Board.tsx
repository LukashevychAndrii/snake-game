import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";

const Board = () => {
  const renderCells = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        cells.push(<Cell key={i * 20 + j} />);
      }
    }
    return cells;
  };
  return <div className={styles["board"]}>{renderCells()}</div>;
};

export default Board;
