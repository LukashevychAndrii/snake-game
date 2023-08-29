import React from "react";
import SettingsVariant1 from "./SettingsVariant/SettingsVariant1";
import { SettingsContext } from "../../../../Context/settings-context";
import getDefaultSettings from "../../../../utils/getDefaultSettings";
import { BoardContext } from "../../../../Context/board-context";
import { boardSnakeSpeed } from "../../../../types/boardSnakeSpeed";

const SnakeSpeedVariants = () => {
  const speedVariants: boardSnakeSpeed[] = [25, 50, 75, 100];
  const { updateBoardSnakeSpeed } = React.useContext(SettingsContext);

  const changeBoardSnakeSpeed = (speed: boardSnakeSpeed): void => {
    updateBoardSnakeSpeed(speed);
  };
  return (
    <ul>
      {speedVariants.map((speed, index) => (
        <li
          onClick={() => {
            changeBoardSnakeSpeed(speed);
          }}
          key={index}
        >
          {speed}
        </li>
      ))}
    </ul>
  );
};

const SettingsSnakeSpeed = () => {
  const { boardSnakeSpeed } = React.useContext(SettingsContext).boardSettings;
  const { boardSnakeSpeed: boardSnakeSpeed_g } =
    React.useContext(BoardContext).boardSettings;
  const { boardSnakeSpeed__DEFAULT } = getDefaultSettings();

  return (
    <SettingsVariant1
      currentValue={
        boardSnakeSpeed !== "default"
          ? boardSnakeSpeed
          : boardSnakeSpeed_g !== "default"
          ? boardSnakeSpeed_g
          : boardSnakeSpeed__DEFAULT
      }
      heading="Snake Speed"
      options={<SnakeSpeedVariants />}
      variantType="snake-speed"
    />
  );
};

export default SettingsSnakeSpeed;
