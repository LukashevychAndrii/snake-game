import { DirectionInitState } from "../Context/direction-context";
import { Direction } from "../types/direction";

interface loadingAction {
  type: "SET_DIRECTION";
  payload: Direction;
}

export function directionReducer(
  state: DirectionInitState,
  action: loadingAction
) {
  switch (action.type) {
    case "SET_DIRECTION":
      return {
        ...state,
        direction: action.payload,
      };
    default:
      return state;
  }
}
