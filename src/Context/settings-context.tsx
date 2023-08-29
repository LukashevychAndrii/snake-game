import React from "react";
import { BoardSettingsI } from "./board-context";
import { settingsReducer } from "../reducers/settings-reducer";
import { color } from "../types/color";
import { boardSize } from "../types/boardSize";
import { boardSnakeSpeed } from "../types/boardSnakeSpeed";

interface settings {
  boardSettings: BoardSettingsI;
  updateBoardColor: (newBoardColor: color | "default") => void;
  updateFoodColor: (newFoodColor: color | "default") => void;
  updateSnakeColor: (newSnakeColor: color | "default") => void;
  updateBoardSize: (newBoardSize: boardSize | "default") => void;
  updateBoardSnakeSpeed: (
    newBoardSnakeSpeed: boardSnakeSpeed | "default"
  ) => void;
  discardChanges: () => void;
}

export const initialBoardSettingsState: settings = {
  boardSettings: {
    boardSize: "default",
    boardColor: "default",
    boardFoodColor: "default",
    boardSnakeColor: "default",
    boardSnakeSpeed: "default",
  },
  updateBoardColor: () => {},
  updateBoardSize: () => {},
  updateBoardSnakeSpeed: () => {},
  updateFoodColor: () => {},
  updateSnakeColor: () => {},
  discardChanges: () => {},
};

export const SettingsContext = React.createContext<settings>(
  initialBoardSettingsState
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    settingsReducer,
    initialBoardSettingsState.boardSettings
  );
  const updateBoardColor = (newBoardColor: color | "default") => {
    dispatch({ type: "SET_BOARD_COLOR", payload: newBoardColor });
  };
  const updateBoardSize = (newBoardSize: boardSize | "default") => {
    dispatch({ type: "SET_BOARD_SIZE", payload: newBoardSize });
  };
  const updateBoardSnakeSpeed = (
    newBoardSnakeSpeed: boardSnakeSpeed | "default"
  ) => {
    dispatch({ type: "SET_BOARD_SNAKE_SPEED", payload: newBoardSnakeSpeed });
  };
  const updateFoodColor = (newFoodColor: color | "default") => {
    dispatch({ type: "SET_BOARD_FOOD_COLOR", payload: newFoodColor });
  };
  const updateSnakeColor = (newSnakeColor: color | "default") => {
    dispatch({ type: "SET_BOARD_SNAKE_COLOR", payload: newSnakeColor });
  };
  const discardChanges = () => {
    dispatch({ type: "DISCARD_CHANGES", payload: "default" });
  };
  return (
    <SettingsContext.Provider
      value={{
        boardSettings: {
          boardSize: state.boardSize,
          boardColor: state.boardColor,
          boardFoodColor: state.boardFoodColor,
          boardSnakeColor: state.boardSnakeColor,
          boardSnakeSpeed: state.boardSnakeSpeed,
        },
        updateBoardColor,
        updateBoardSize,
        updateBoardSnakeSpeed,
        updateFoodColor,
        updateSnakeColor,
        discardChanges,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
