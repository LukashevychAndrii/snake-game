import React from "react";
import { loadingReducer } from "../reducers/loading-reducer";
export interface LoadingInitState {
  loadingQueue: number;
  loadingSettingsQueue: number;
  loadingAccQueue: number;
  addToSettingsQueue: () => void;
  removeFormSettingsQueue: () => void;
  addToAccQueue: () => void;
  removeFormAccQueue: () => void;
}

const initialLoadingState: LoadingInitState = {
  loadingQueue: 0,
  loadingAccQueue: 0,
  loadingSettingsQueue: 0,
  addToAccQueue() {},
  removeFormAccQueue() {},
  addToSettingsQueue() {},
  removeFormSettingsQueue() {},
};

export const LoadingContext = React.createContext(initialLoadingState);

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    loadingReducer,
    initialLoadingState
  );

  const addToAccQueue = () => {
    dispatch({ type: "ADD_TO_ACC_QUEUE" });
  };

  const removeFormAccQueue = () => {
    dispatch({ type: "REMOVE_FROM_ACC_QUEUE" });
  };

  const addToSettingsQueue = () => {
    dispatch({ type: "ADD_TO_SETTINGS_QUEUE" });
  };

  const removeFormSettingsQueue = () => {
    dispatch({ type: "REMOVE_FROM_SETTINGS_QUEUE" });
  };
  return (
    <LoadingContext.Provider
      value={{
        loadingQueue: state.loadingQueue,
        loadingSettingsQueue: state.loadingSettingsQueue,
        loadingAccQueue: state.loadingAccQueue,
        addToAccQueue,
        addToSettingsQueue,
        removeFormAccQueue,
        removeFormSettingsQueue,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
