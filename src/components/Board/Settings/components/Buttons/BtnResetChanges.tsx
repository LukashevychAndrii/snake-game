import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../../Context/board-context";
import { SettingsContext } from "../../../../../Context/settings-context";

const BtnResetChanges = () => {
  const { resetSettings, boardSettings } = React.useContext(BoardContext);
  const { discardChanges } = React.useContext(SettingsContext);

  React.useEffect(() => {
    console.log(boardSettings);
  }, [boardSettings]);

  const btnResetClick = () => {
    resetSettings();
    discardChanges();
  };
  return (
    <button onClick={btnResetClick} className={styles["btn"]}>
      Reset Changes
    </button>
  );
};

export default BtnResetChanges;
