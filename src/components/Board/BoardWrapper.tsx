import React from "react";
import Board from "./Board";
import useGetBoardSize from "../../hooks/useGetBoardSize";
import useGetRowsAndCols from "../../hooks/useGetRowsAndCols";
import useGetSnakeSpeed from "../../hooks/useGetSnakeSpeed";

const BoardWrapper = () => {
  const boardSize = useGetBoardSize();
  const rowsAndCols = useGetRowsAndCols();
  const boardSnakeSpeed = useGetSnakeSpeed();
  //   const arrowPress = useArrowKeyPress(gameState);

  return (
    <Board
      boardSize={boardSize}
      rowsAndCols={rowsAndCols}
      boardSnakeSpeed={boardSnakeSpeed}
    />
  );
};

export default BoardWrapper;
