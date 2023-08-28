import { BoardContextI, BoardSettingsI } from "../Context/board-context";

type Action =
  | { type: "SET_CURRENT_SCORE"; payload: number }
  | { type: "SET_MAX_SCORE"; payload: number }
  | { type: "SET_BOARD_SETTINGS"; payload: BoardSettingsI }
  | { type: "RESET_SETTINGS"; payload: "default" };

export const boardReducer = (state: BoardContextI, action: Action) => {
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
          boardColor: action.payload,
          boardFoodColor: action.payload,
          boardSize: action.payload,
          boardSnakeColor: action.payload,
          boardSnakeSpeed: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
