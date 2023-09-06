import React from "react";
import SettingsVariant2 from "./SettingsVariant/SettingsVariant2";
import { color } from "../../../types/color";
import { SettingsContext } from "../../../Context/settings-context";
import { BoardContext } from "../../../Context/board-context";
import getDefaultSettings from "../../../utils/getDefaultSettings";

const SettingsFoodColor = () => {
  const { updateFoodColor, boardSettings } = React.useContext(SettingsContext);
  const { boardFoodColor: boardFoodColor_g } =
    React.useContext(BoardContext).boardSettings;
  const { boardFoodColor__DEFAULT } = getDefaultSettings();

  const getNewFoodColor = (foodColor: color): void => {
    updateFoodColor(foodColor);
  };

  return (
    <SettingsVariant2
      currentColor={
        boardSettings.boardFoodColor !== "default"
          ? boardSettings.boardFoodColor
          : boardFoodColor_g !== "default"
          ? boardFoodColor_g
          : boardFoodColor__DEFAULT
      }
      getNewColor={getNewFoodColor}
      heading="Food Color"
      variantType="food-color"
    />
  );
};

export default SettingsFoodColor;
