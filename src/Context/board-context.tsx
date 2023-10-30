import React from "react";
import { boardReducer } from "../reducers/board-reducer";
import { boardSize } from "../types/boardSize";
import { color } from "../types/color";
import { boardSnakeSpeed } from "../types/boardSnakeSpeed";
import { setSettings } from "../firebase/functions/settings/setSettings";
import { setMaxScore } from "../firebase/functions/score/setMaxScore";
import { setDefaultSettings } from "../firebase/functions/settings/setDefaultSettings";

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
  updateScoreMax: (newScoreMax: number, force?: boolean) => void;
  scoreCurrent: number;
  updateScoreCurrent: (newScoreCurrent: number) => void;
  boardSettings: BoardSettingsI;
  updateBoardSettings: (
    newBoardSettings: BoardSettingsI,
    isAuth: boolean
  ) => void;
  setBoardSettings: (boardSettings: BoardSettingsI) => void;
  resetSettings: (request: boolean, isAuth: boolean) => void;
  resetScoreMax: () => void;
}

export const BoardContextValues: BoardContextI = {
  scoreMax: 0,
  updateScoreMax: () => {},
  scoreCurrent: 0,
  updateScoreCurrent: () => {},
  boardSettings: DefaultSettings,
  updateBoardSettings: () => {},
  setBoardSettings: () => {},
  resetSettings: () => {},
  resetScoreMax() {},
};

export const BoardContext =
  React.createContext<BoardContextI>(BoardContextValues);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(boardReducer, BoardContextValues);

  const updateScoreMax = (newScoreMax: number, force?: boolean): void => {
    if (newScoreMax && (newScoreMax > state.scoreMax || force)) {
      setMaxScore(newScoreMax);
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

  // set temporary settings
  const updateBoardSettings = async (
    newBoardSettings: BoardSettingsI,
    isAuth: boolean
  ): Promise<void> => {
    if (isAuth) await setSettings({ newBoardSettings });

    dispatch({ type: "SET_BOARD_SETTINGS", payload: newBoardSettings });
  };

  const resetSettings = async (
    request: boolean,
    isAuth: boolean
  ): Promise<void> => {
    if (isAuth && request) await setDefaultSettings();

    dispatch({
      type: "RESET_SETTINGS",
      payload: "default",
    });
  };

  // Set board settings
  const setBoardSettings = (boardSettings: BoardSettingsI): void => {
    dispatch({ type: "SET_BOARD_SETTINGS", payload: boardSettings });
  };

  const resetScoreMax = () => {
    dispatch({ type: "RESET_SCORE_MAX", payload: 0 });
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
        setBoardSettings,
        resetSettings,
        resetScoreMax,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
