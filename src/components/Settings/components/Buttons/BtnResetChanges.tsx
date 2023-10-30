import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../Context/board-context";
import { SettingsContext } from "../../../../Context/settings-context";
import useGetAreSettingsDefault from "../../../../hooks/useGetAreSettingsDefault";
import { setDefaultSettings } from "../../../../firebase/functions/settings/setDefaultSettings";
import { defaultSettings } from "../../../../utils/defaultSettings";
import { UserContext } from "../../../../Context/user-context";

const BtnResetChanges = () => {
  const { resetSettings } = React.useContext(BoardContext);
  const { discardChanges } = React.useContext(SettingsContext);
  const { isAuth } = React.useContext(UserContext);

  const settingsDefault = useGetAreSettingsDefault();

  const btnResetClick = () => {
    setDefaultSettings();
    resetSettings(true, isAuth);
    discardChanges(defaultSettings);
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
