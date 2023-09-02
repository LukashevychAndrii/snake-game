import React from "react";
import { BoardContext } from "../Context/board-context";
import { SettingsContext } from "../Context/settings-context";

const useGetSettingsChanged = (): boolean => {
  const [same, setSame] = React.useState(true);

  const { boardSettings: boardSettings_g } = React.useContext(BoardContext);
  const { boardSettings } = React.useContext(SettingsContext);

  React.useEffect(() => {
    const equal =
      JSON.stringify(boardSettings_g) === JSON.stringify(boardSettings);

    setSame(equal);
  }, [boardSettings_g, boardSettings]);
  return same;
};

export default useGetSettingsChanged;
