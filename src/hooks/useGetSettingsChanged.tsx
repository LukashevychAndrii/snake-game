import React from "react";
import { BoardContext } from "../Context/board-context";
import { SettingsContext } from "../Context/settings-context";

const useGetSettingsChanged = (): boolean => {
  const [same, setSame] = React.useState(true);

  const { boardSettings: boardSettings_g } = React.useContext(BoardContext);
  const { boardSettings } = React.useContext(SettingsContext);

  React.useEffect(() => {
    console.log(JSON.stringify(boardSettings));
    console.log(JSON.stringify(boardSettings_g));
    const equal =
      JSON.stringify(boardSettings_g) === JSON.stringify(boardSettings);
    console.log(equal);
    setSame(equal);
  }, [boardSettings_g, boardSettings]);
  return same;
};

export default useGetSettingsChanged;
