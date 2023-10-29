import React from "react";
import Board from "./Board";
import useGetBoardSize from "../../hooks/useGetBoardSize";
import useGetRowsAndCols from "../../hooks/useGetRowsAndCols";
import useGetSnakeSpeed from "../../hooks/useGetSnakeSpeed";
import SwipeHandler from "../SwipeHandler/SwipeHandler";
import useGetDeviceType from "../../hooks/useGetDeviceType";

const BoardWrapper = () => {
  const boardSize = useGetBoardSize();
  const rowsAndCols = useGetRowsAndCols();
  const boardSnakeSpeed = useGetSnakeSpeed();
  const isTouchDevice = useGetDeviceType();

  return (
    <>
      {isTouchDevice ? (
        <SwipeHandler>
          <Board
            boardSize={boardSize}
            rowsAndCols={rowsAndCols}
            boardSnakeSpeed={boardSnakeSpeed}
            isTouchDevice={isTouchDevice}
          />
        </SwipeHandler>
      ) : (
        <Board
          boardSize={boardSize}
          rowsAndCols={rowsAndCols}
          boardSnakeSpeed={boardSnakeSpeed}
          isTouchDevice={isTouchDevice}
        />
      )}
    </>
  );
};

export default BoardWrapper;
