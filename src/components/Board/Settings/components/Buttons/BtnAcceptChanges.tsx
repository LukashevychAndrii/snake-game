import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../../Context/board-context";
import { SettingsContext } from "../../../../../Context/settings-context";
import useGetSettingsChanged from "../../../../../hooks/useGetSettingsChanged";

const BtnAcceptChanges = () => {
  const { updateBoardSettings } = React.useContext(BoardContext);
  const { boardSettings } = React.useContext(SettingsContext);

  const newSettings = React.useMemo(() => {
    return {
      boardSettings,
    };
  }, [boardSettings]);

  const btnAcceptClick = (): void => {
    updateBoardSettings(newSettings.boardSettings);
  };

  const changed = useGetSettingsChanged();

  return (
    <button
      disabled={changed}
      onClick={btnAcceptClick}
      className={styles["btn"]}
    >
      Accept Changes
    </button>
  );
};

export default BtnAcceptChanges;
