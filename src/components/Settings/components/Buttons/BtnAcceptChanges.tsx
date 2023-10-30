import React from "react";
import styles from "../../Setting.module.scss";
import { BoardContext } from "../../../../Context/board-context";
import { SettingsContext } from "../../../../Context/settings-context";
import useGetSettingsChanged from "../../../../hooks/useGetSettingsChanged";
import { UserContext } from "../../../../Context/user-context";

const BtnAcceptChanges = () => {
  const { updateBoardSettings } = React.useContext(BoardContext);
  const { boardSettings } = React.useContext(SettingsContext);
  const { isAuth } = React.useContext(UserContext);

  const newSettings = React.useMemo(() => {
    return {
      boardSettings,
    };
  }, [boardSettings]);

  const btnAcceptClick = (): void => {
    updateBoardSettings(newSettings.boardSettings, isAuth);
  };

  const changed = useGetSettingsChanged();

  return (
    <button
      disabled={changed}
      onClick={btnAcceptClick}
      className={styles["btn"]}
    >
      Accept
    </button>
  );
};

export default BtnAcceptChanges;
