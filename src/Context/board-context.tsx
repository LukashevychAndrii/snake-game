import React from "react";
import { boardReducer } from "../reducers/board-reducer";
import { boardSize } from "../types/boardSize";
import { color } from "../types/color";
import { boardSnakeSpeed } from "../types/boardSnakeSpeed";
import { setMaxScoreToLocalStorage } from "../utils/setMaxScoreToLocalStorage";

export interface BoardSettingsI {
  boardSize: boardSize | "default";
  boardColor: color | "default";
  boardFoodColor: color | "default";
  boardSnakeColor: color | "default";
  boardSnakeSpeed: boardSnakeSpeed | "default";
}

const DefaultSettings: BoardSettingsI = {
  boardSize: "default",
  boardColor: "default",
  boardFoodColor: "default",
  boardSnakeColor: "default",
  boardSnakeSpeed: "default",
};
export interface BoardContextI {
  scoreMax: number;
  updateScoreMax: (newScoreMax: number) => void;
  scoreCurrent: number;
  updateScoreCurrent: (newScoreCurrent: number) => void;
  boardSettings: BoardSettingsI;
  updateBoardSettings: (newBoardSettings: BoardSettingsI) => void;
  resetSettings: () => void;
}

export const BoardContextValues: BoardContextI = {
  scoreMax: 0,
  updateScoreMax: () => {},
  scoreCurrent: 0,
  updateScoreCurrent: () => {},
  boardSettings: DefaultSettings,
  updateBoardSettings: () => {},
  resetSettings: () => {},
};

export const BoardContext =
  React.createContext<BoardContextI>(BoardContextValues);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(boardReducer, BoardContextValues);

  const updateScoreMax = (newScoreMax?: number): void => {
    console.log(newScoreMax);
    if (newScoreMax && newScoreMax > state.scoreMax) {
      setMaxScoreToLocalStorage({ newScoreMax });
      dispatch({
        type: "SET_MAX_SCORE",
        payload: newScoreMax,
      });
    }
  };
  const updateScoreCurrent = (newScoreCurrent: number): void => {
    dispatch({
      type: "SET_CURRENT_SCORE",
      payload: newScoreCurrent,
    });
  };

  const updateBoardSettings = (newBoardSettings: BoardSettingsI): void => {
    dispatch({
      type: "SET_BOARD_SETTINGS",
      payload: newBoardSettings,
    });
  };

  const resetSettings = (): void => {
    dispatch({
      type: "RESET_SETTINGS",
      payload: "default",
    });
  };
  return (
    <BoardContext.Provider
      value={{
        scoreMax: state.scoreMax,
        updateScoreMax,
        scoreCurrent: state.scoreCurrent,
        updateScoreCurrent,
        boardSettings: state.boardSettings,
        updateBoardSettings,
        resetSettings,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
