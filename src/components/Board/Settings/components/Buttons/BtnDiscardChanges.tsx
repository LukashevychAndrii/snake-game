import React from "react";
import styles from "../../Setting.module.scss";
import { SettingsContext } from "../../../../../Context/settings-context";

const BtnDiscardChanges = () => {
  const { discardChanges } = React.useContext(SettingsContext);
  const btnDiscardClick = (): void => {
    discardChanges();
  };
  return (
    <button onClick={btnDiscardClick} className={styles["btn"]}>
      Discard Changes
    </button>
  );
};

export default BtnDiscardChanges;
