import React from "react";
import SettingsVariant2 from "./SettingsVariant/SettingsVariant2";
import { SettingsContext } from "../../../Context/settings-context";
import { color } from "../../../types/color";
import getDefaultSettings from "../../../utils/getDefaultSettings";
import { BoardContext } from "../../../Context/board-context";

const SettingsSnakeColor = () => {
  const { updateSnakeColor, boardSettings } = React.useContext(SettingsContext);

  const getNewSnakeColor = (snakeColor: color): void => {
    updateSnakeColor(snakeColor);
  };

  const { boardSnakeColor: boardSnakeColor_g } =
    React.useContext(BoardContext).boardSettings;
  const { boardSnakeColor__DEFAULT } = getDefaultSettings();
  return (
    <SettingsVariant2
      currentColor={
        boardSettings.boardSnakeColor !== "default"
          ? boardSettings.boardSnakeColor
          : boardSnakeColor_g !== "default"
          ? boardSnakeColor_g
          : boardSnakeColor__DEFAULT
      }
      getNewColor={getNewSnakeColor}
      heading="Snake Color"
      variantType="snake-color"
    />
  );
};

export default SettingsSnakeColor;
