import React from "react";
import { BoardContext } from "../Context/board-context";
import getDefaultSettings from "../utils/getDefaultSettings";

const useGetSnakeSpeed = () => {
  const { boardSnakeSpeed } = React.useContext(BoardContext).boardSettings;
  const defaultSnakeSpeed = getDefaultSettings().boardSnakeSpeed__DEFAULT;

  return boardSnakeSpeed !== "default" ? boardSnakeSpeed : defaultSnakeSpeed;
};

export default useGetSnakeSpeed;
