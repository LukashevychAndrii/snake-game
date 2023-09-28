import React from "react";
import getDefaultSettings from "../utils/getDefaultSettings";
import { BoardContext } from "../Context/board-context";
import { RowsAndCols } from "../types/rowsAndCols";

const useGetRowsAndCols = () => {
  const { boardSize__DEFAULT } = getDefaultSettings();
  const { boardSize } = React.useContext(BoardContext).boardSettings;
  const [rowsAndCols, setRowsAndCols] = React.useState<RowsAndCols>(
    Math.sqrt(
      boardSize !== "default" ? boardSize : boardSize__DEFAULT
    ) as RowsAndCols
  );

  React.useEffect(() => {
    const boardSizeNum =
      boardSize === "default" ? boardSize__DEFAULT : boardSize;
    setRowsAndCols(Math.sqrt(boardSizeNum) as RowsAndCols);
  }, [boardSize, boardSize__DEFAULT]);
  return rowsAndCols;
};

export default useGetRowsAndCols;
