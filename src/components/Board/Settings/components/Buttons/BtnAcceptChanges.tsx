import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../../Context/board-context";
import { SettingsContext } from "../../../../../Context/settings-context";

const BtnAcceptChanges = () => {
  const { updateBoardSettings } = React.useContext(BoardContext);
  const {
    boardColor,
    boardFoodColor,
    boardSize,
    boardSnakeColor,
    boardSnakeSpeed,
  } = React.useContext(SettingsContext);

  const newSettings = React.useMemo(() => {
    return {
      boardColor,
      boardFoodColor,
      boardSize,
      boardSnakeColor,
      boardSnakeSpeed,
    };
  }, [boardColor, boardFoodColor, boardSize, boardSnakeColor, boardSnakeSpeed]);

  const btnAcceptClick = (): void => {
    updateBoardSettings(newSettings);
  };

  return (
    <button onClick={btnAcceptClick} className={styles["btn"]}>
      Accept Changes
    </button>
  );
};

export default BtnAcceptChanges;
