import React from "react";
import { SettingsContext } from "../../../../Context/settings-context";
import { BoardContext } from "../../../../Context/board-context";
import getDefaultSettings from "../../../../utils/getDefaultSettings";
import SettingsVariant2 from "./SettingsVariant/SettingsVariant2";
import { color } from "../../../../types/color";

const SettingsBoardColor = () => {
  const { updateBoardColor, boardColor } = React.useContext(SettingsContext);

  const { boardColor: boardColor_g } =
    React.useContext(BoardContext).boardSettings;
  const { boardColor__DEFAULT } = getDefaultSettings();

  const getNewBoardColor = (boardColor: color) => {
    updateBoardColor(boardColor);
  };

  return (
    <SettingsVariant2
      currentColor={
        boardColor !== "default"
          ? boardColor
          : boardColor_g !== "default"
          ? boardColor_g
          : boardColor__DEFAULT
      }
      getNewColor={getNewBoardColor}
      heading="Board Color"
      variantType="board-color"
    />
  );
};

export default SettingsBoardColor;
