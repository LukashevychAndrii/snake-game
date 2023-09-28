import { LoadingInitState } from "../Context/loading-context";

type loadingAction =
  | { type: "ADD_TO_SETTINGS_QUEUE" }
  | { type: "REMOVE_FROM_SETTINGS_QUEUE" }
  | { type: "ADD_TO_ACC_QUEUE" }
  | { type: "REMOVE_FROM_ACC_QUEUE" };

export function loadingReducer(state: LoadingInitState, action: loadingAction) {
  switch (action.type) {
    case "ADD_TO_ACC_QUEUE":
      return {
        ...state,
        loadingAccQueue: ++state.loadingAccQueue,
        loadingQueue: ++state.loadingQueue,
      };
    case "REMOVE_FROM_ACC_QUEUE":
      return {
        ...state,
        loadingAccQueue: --state.loadingAccQueue,
        loadingQueue: --state.loadingQueue,
      };
    case "ADD_TO_SETTINGS_QUEUE":
      return {
        ...state,
        loadingSettingsQueue: ++state.loadingSettingsQueue,
        loadingQueue: ++state.loadingQueue,
      };
    case "REMOVE_FROM_SETTINGS_QUEUE":
      return {
        ...state,
        loadingSettingsQueue: --state.loadingSettingsQueue,
        loadingQueue: --state.loadingQueue,
      };
    default: {
      return state;
    }
  }
}
