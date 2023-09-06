import { User } from "../Context/user-context";
import { Auth_E, Auth_N, Auth_NE } from "../types/auth";

export type userAction =
  | { type: "UPDATE_NAME"; payload: Auth_N }
  | { type: "UPDATE_EMAIL"; payload: Auth_E }
  | { type: "CONNECT_TO_ACC"; payload: Auth_NE }
  | { type: "DISCONNECT_FROM_ACC"; payload: null };

export function userReducer(state: User, action: userAction) {
  switch (action.type) {
    case "UPDATE_NAME": {
      return {
        ...state,
        name: action.payload.name,
      };
    }
    case "UPDATE_EMAIL": {
      return {
        ...state,
        email: action.payload.email,
      };
    }

    case "CONNECT_TO_ACC": {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        isAuth: true,
      };
    }
    case "DISCONNECT_FROM_ACC": {
      return {
        ...state,
        name: "",
        email: "",
        isAuth: false,
      };
    }
    default:
      return state;
  }
}
