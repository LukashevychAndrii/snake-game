import React from "react";
import { boardReducer } from "../reducers/board-reducer";
import { boardSize } from "../types/boardSize";
import { color } from "../types/color";
import { boardSnakeSpeed } from "../types/boardSnakeSpeed";
import { setSettings } from "../firebase/functions/settings/setSettings";
import { setMaxScore } from "../firebase/functions/score/setMaxScore";
import { UserContext } from "./user-context";
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
  updateScoreMax: (newScoreMax: number) => void;
  scoreCurrent: number;
  updateScoreCurrent: (newScoreCurrent: number) => void;
  boardSettings: BoardSettingsI;
  updateBoardSettings: (newBoardSettings: BoardSettingsI) => void;
  setBoardSettings: (boardSettings: BoardSettingsI) => void;
  resetSettings: () => void;
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
};

export const BoardContext =
  React.createContext<BoardContextI>(BoardContextValues);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(boardReducer, BoardContextValues);

  const { isAuth } = React.useContext(UserContext);

  const updateScoreMax = (newScoreMax: number): void => {
    if (newScoreMax && newScoreMax > state.scoreMax) {
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
    newBoardSettings: BoardSettingsI
  ): Promise<void> => {
    if (isAuth) await setSettings({ newBoardSettings });

    dispatch({ type: "SET_BOARD_SETTINGS", payload: newBoardSettings });
  };

  const resetSettings = async (): Promise<void> => {
    if (isAuth) await setDefaultSettings();

    dispatch({
      type: "RESET_SETTINGS",
      payload: "default",
    });
  };

  // Set board settings
  const setBoardSettings = (boardSettings: BoardSettingsI): void => {
    dispatch({ type: "SET_BOARD_SETTINGS", payload: boardSettings });
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
