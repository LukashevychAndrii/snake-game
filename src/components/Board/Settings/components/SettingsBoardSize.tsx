import React from "react";
import SettingsVariant1 from "./SettingsVariant/SettingsVariant1";
import { boardSize } from "../../../../types/boardSize";
import { SettingsContext } from "../../../../Context/settings-context";
import getDefaultSettings from "../../../../utils/getDefaultSettings";
import { BoardContext } from "../../../../Context/board-context";

const BoardSizeVariants = () => {
  const sizeVariants: boardSize[] = [100, 200, 300, 400];
  const { updateBoardSize } = React.useContext(SettingsContext);

  const changeBoardSize = (size: boardSize): void => {
    updateBoardSize(size);
  };

  return (
    <ul>
      {sizeVariants.map((size, index) => (
        <li
          onClick={() => {
            changeBoardSize(size);
          }}
          key={index}
        >
          {size}
        </li>
      ))}
    </ul>
  );
};

const SettingsBoardSize = () => {
  const { boardSize } = React.useContext(SettingsContext);

  const { boardSize__DEFAULT } = getDefaultSettings();

  const { boardSize: boardSize_g } =
    React.useContext(BoardContext).boardSettings;
  return (
    <SettingsVariant1
      currentValue={
        boardSize !== "default"
          ? boardSize
          : boardSize_g !== "default"
          ? boardSize_g
          : boardSize__DEFAULT
      }
      heading="Board Size"
      options={<BoardSizeVariants />}
      variantType="board-size"
    />
  );
};

export default SettingsBoardSize;
