import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../../Context/board-context";
import { SettingsContext } from "../../../../../Context/settings-context";
import useGetAreSettingsDefault from "../../../../../hooks/useGetAreSettingsDefault";

const BtnResetChanges = () => {
  const { resetSettings } = React.useContext(BoardContext);
  const { discardChanges } = React.useContext(SettingsContext);

  const settingsDefault = useGetAreSettingsDefault();

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
    <button
      disabled={settingsDefault}
      onClick={btnResetClick}
      className={styles["btn"]}
    >
      Reset Changes
    </button>
  );
};

export default BtnResetChanges;
