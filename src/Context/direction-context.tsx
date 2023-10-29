import React from "react";
import { Direction } from "../types/direction";
import { directionReducer } from "../reducers/direction-reducer";

export interface DirectionInitState {
  direction: Direction | null;
  setDirection: (direction: Direction) => void;
}

const directionInitState: DirectionInitState = {
  direction: null,
  setDirection() {},
};

export const DirectionContext = React.createContext(directionInitState);

export const DirectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    directionReducer,
    directionInitState
  );

  const setDirection = (direction: Direction): void => {
    dispatch({ type: "SET_DIRECTION", payload: direction });
  };

  return (
    <DirectionContext.Provider
      value={{ direction: state.direction, setDirection }}
    >
      {children}
    </DirectionContext.Provider>
  );
};
