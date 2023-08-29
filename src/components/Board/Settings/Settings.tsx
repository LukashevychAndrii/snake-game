import React from "react";
import styles from "./Setting.module.scss";

import { ReactComponent as SettingsIcon } from "../../../imgs/SVG/settings.svg";
import SettingsBoardSize from "./components/SettingsBoardSize";
import SettingsSnakeSpeed from "./components/SettingsSnakeSpeed";
import SettingsFoodColor from "./components/SettingsFoodColor";
import SettingsSnakeColor from "./components/SettingsSnakeColor";
import BtnAcceptChanges from "./components/Buttons/BtnAcceptChanges";
import SettingsBoardColor from "./components/SettingsBoardColor";
import BtnDiscardChanges from "./components/Buttons/BtnDiscardChanges";
import BtnResetChanges from "./components/Buttons/BtnResetChanges";
import useClickOutside from "../../../hooks/useClickOutside";

type animation = "hidden" | "shown";

const Settings = () => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [animation, setAnimation] = React.useState<animation>("shown");

  const hide = async () => {
    setAnimation("hidden");
    setTimeout(() => {
      setShowSettings(false);
    }, 400);
  };
  const show = async () => {
    setAnimation("shown");
    setShowSettings(true);
  };

  const ref = React.useRef(null);
  const outside = useClickOutside(ref);

  React.useEffect(() => {
    if (outside) {
      hide();
    }
  }, [outside]);

  return (
    <>
      <SettingsIcon
        onClick={() => {
          if (showSettings) hide();
          else show();
        }}
        className={styles["settings__icon"]}
      ></SettingsIcon>
      {showSettings && (
        <div
          ref={ref}
          className={`${styles["settings"]} ${
            styles[`settings--${animation}`]
          }`}
        >
          <div className={styles["settings__heading"]}>Settings</div>
          <SettingsBoardSize />
          <SettingsFoodColor />
          <SettingsSnakeSpeed />
          <SettingsSnakeColor />
          <SettingsBoardColor />
          <div className={styles["settings__buttons"]}>
            <BtnAcceptChanges />
            <BtnDiscardChanges />
            <BtnResetChanges />
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
