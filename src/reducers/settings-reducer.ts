import { BoardSettingsI } from "../Context/board-context";
import { boardSize } from "../types/boardSize";
import { boardSnakeSpeed } from "../types/boardSnakeSpeed";
import { color } from "../types/color";

type Action =
  | { type: "SET_BOARD_COLOR"; payload: color | "default" }
  | { type: "SET_BOARD_FOOD_COLOR"; payload: color | "default" }
  | { type: "SET_BOARD_SNAKE_COLOR"; payload: color | "default" }
  | { type: "SET_BOARD_SIZE"; payload: boardSize | "default" }
  | { type: "SET_BOARD_SNAKE_SPEED"; payload: boardSnakeSpeed | "default" }
  | { type: "DISCARD_CHANGES"; payload: BoardSettingsI };

export function settingsReducer(state: BoardSettingsI, action: Action) {
  switch (action.type) {
    case "SET_BOARD_COLOR": {
      return {
        ...state,
        boardColor: action.payload,
      };
    }
    case "SET_BOARD_SIZE": {
      return {
        ...state,
        boardSize: action.payload,
      };
    }
    case "SET_BOARD_SNAKE_SPEED": {
      return {
        ...state,
        boardSnakeSpeed: action.payload,
      };
    }
    case "SET_BOARD_FOOD_COLOR": {
      return {
        ...state,
        boardFoodColor: action.payload,
      };
    }
    case "SET_BOARD_SNAKE_COLOR": {
      return {
        ...state,
        boardSnakeColor: action.payload,
      };
    }
    case "DISCARD_CHANGES": {
      return {
        boardSize: action.payload.boardSize,
        boardFoodColor: action.payload.boardFoodColor,
        boardColor: action.payload.boardColor,
        boardSnakeColor: action.payload.boardSnakeColor,
        boardSnakeSpeed: action.payload.boardSnakeSpeed,
      };
    }
    default: {
      return state;
    }
  }
}
