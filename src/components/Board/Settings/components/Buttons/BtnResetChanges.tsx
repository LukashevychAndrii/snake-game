import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../../Context/board-context";
import { SettingsContext } from "../../../../../Context/settings-context";

const BtnResetChanges = () => {
  const { resetSettings } = React.useContext(BoardContext);
  const { discardChanges } = React.useContext(SettingsContext);

  const btnResetClick = () => {
    resetSettings();
    discardChanges({
      boardColor: "default",
      boardFoodColor: "default",
      boardSize: "default",
      boardSnakeColor: "default",
      boardSnakeSpeed: "default",
    });
  };
  return (
    <button onClick={btnResetClick} className={styles["btn"]}>
      Reset Changes
    </button>
  );
};

export default BtnResetChanges;
