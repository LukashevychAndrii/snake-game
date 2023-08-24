import React from "react";

export interface BoardContextI {
  scoreMax: number;
  updateScoreMax: (newScoreMax?: number) => void;
  scoreCurrent: number;
  updateScoreCurrent: (newScoreCurrent: number) => void;
}

export const BoardContextValues: BoardContextI = {
  scoreMax: 0,
  updateScoreMax: () => {},
  scoreCurrent: 0,
  updateScoreCurrent: () => {},
};

export const BoardContext =
  React.createContext<BoardContextI>(BoardContextValues);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [scoreMax, setScoreMax] = React.useState(BoardContextValues.scoreMax);

  const [scoreCurrent, setScoreCurrent] = React.useState(
    BoardContextValues.scoreCurrent
  );

  const updateScoreMax = (newScoreMax?: number) => {
    if (newScoreMax) {
      setScoreMax(newScoreMax);
    } else {
      const max = Math.max(scoreCurrent, scoreMax);
      if (max > 0) {
        setScoreMax(max);
        localStorage.setItem("snakeGameMaxCounter", `${max}`);
      }
    }
  };

  const updateScoreCurrent = (newScoreCurrent: number) => {
    setScoreCurrent(newScoreCurrent);
  };

  return (
    <BoardContext.Provider
      value={{ scoreMax, updateScoreMax, scoreCurrent, updateScoreCurrent }}
    >
      {children}
    </BoardContext.Provider>
  );
};
