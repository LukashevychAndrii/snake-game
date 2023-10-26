import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../Context/board-context";
import { SettingsContext } from "../../../../Context/settings-context";
import useGetAreSettingsDefault from "../../../../hooks/useGetAreSettingsDefault";
import { setDefaultSettings } from "../../../../firebase/functions/settings/setDefaultSettings";

const BtnResetChanges = () => {
  const { resetSettings } = React.useContext(BoardContext);
  const { discardChanges } = React.useContext(SettingsContext);

  const settingsDefault = useGetAreSettingsDefault();

  const btnResetClick = () => {
    setDefaultSettings();
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
      Reset
    </button>
  );
};

export default BtnResetChanges;
