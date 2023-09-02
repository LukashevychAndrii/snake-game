import React from "react";
import { BoardContext } from "../Context/board-context";
import getDefaultSettings from "../utils/getDefaultSettings";

const useGetAreSettingsDefault = () => {
  const [same, setSame] = React.useState(true);
  const { boardSettings } = React.useContext(BoardContext);
  const defaultSettings = getDefaultSettings();

  React.useEffect(() => {
    if (
      boardSettings.boardColor !== "default" &&
      boardSettings.boardColor !== defaultSettings.boardColor__DEFAULT
    ) {
      setSame(false);
    } else if (
      boardSettings.boardFoodColor !== "default" &&
      boardSettings.boardFoodColor !== defaultSettings.boardFoodColor__DEFAULT
    ) {
      setSame(false);
    } else if (
      boardSettings.boardSize !== "default" &&
      boardSettings.boardSize !== defaultSettings.boardSize__DEFAULT
    ) {
      setSame(false);
    } else if (
      boardSettings.boardSnakeColor !== "default" &&
      boardSettings.boardSnakeColor !== defaultSettings.boardSnakeColor__DEFAULT
    ) {
      setSame(false);
    } else if (
      boardSettings.boardSnakeSpeed !== "default" &&
      boardSettings.boardSnakeSpeed !== defaultSettings.boardSnakeSpeed__DEFAULT
    ) {
      setSame(false);
    } else {
      setSame(true);
    }
  }, [boardSettings, defaultSettings]);

  return same;
};

export default useGetAreSettingsDefault;
