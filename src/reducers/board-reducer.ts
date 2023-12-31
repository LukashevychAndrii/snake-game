import { BoardContextI, BoardSettingsI } from "../Context/board-context";

export type boardAction =
  | { type: "SET_CURRENT_SCORE"; payload: number }
  | { type: "SET_MAX_SCORE"; payload: number }
  | { type: "SET_BOARD_SETTINGS"; payload: BoardSettingsI }
  | { type: "RESET_SETTINGS"; payload: "default" }
  | { type: "RESET_SCORE_MAX"; payload: 0 };

export const boardReducer = (state: BoardContextI, action: boardAction) => {
  switch (action.type) {
    case "SET_MAX_SCORE":
      return { ...state, scoreMax: action.payload };
    case "SET_CURRENT_SCORE":
      return { ...state, scoreCurrent: action.payload };
    case "SET_BOARD_SETTINGS":
      return { ...state, boardSettings: action.payload };
    case "RESET_SETTINGS": {
      return {
        ...state,
        boardSettings: {
          boardSize: action.payload,
          boardColor: action.payload,
          boardFoodColor: action.payload,
          boardSnakeColor: action.payload,
          boardSnakeSpeed: action.payload,
        },
      };
    }
    case "RESET_SCORE_MAX": {
      return {
        ...state,
        scoreMax: action.payload,
      };
    }
    default:
      return state;
  }
};
