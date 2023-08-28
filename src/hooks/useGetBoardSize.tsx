import React from "react";
import { BoardContext } from "../Context/board-context";
import getDefaultSettings from "../utils/getDefaultSettings";

const useGetBoardSize = () => {
  const { boardSize } = React.useContext(BoardContext).boardSettings;
  const defaultBoardSize = getDefaultSettings().boardSize__DEFAULT;

  return boardSize !== "default" ? boardSize : defaultBoardSize;
};

export default useGetBoardSize;
