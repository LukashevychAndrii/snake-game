import React from "react";
import styles from "../../Setting.module.scss";
import { SettingsContext } from "../../../../Context/settings-context";
import useGetSettingsChanged from "../../../../hooks/useGetSettingsChanged";
import { BoardContext } from "../../../../Context/board-context";

const BtnDiscardChanges = () => {
  const { discardChanges } = React.useContext(SettingsContext);
  const { boardSettings } = React.useContext(BoardContext);
  const btnDiscardClick = (): void => {
    discardChanges(boardSettings);
  };
  const changed = useGetSettingsChanged();

  return (
    <button
      disabled={changed}
      onClick={btnDiscardClick}
      className={styles["btn"]}
    >
      Discard Changes
    </button>
  );
};

export default BtnDiscardChanges;
