import React from "react";
import { BoardContext } from "../Context/board-context";

const useSetScoreMax = (): void => {
  const { updateScoreMax } = React.useContext(BoardContext);

  React.useEffect(() => {
    const usersMaxScore = localStorage.getItem("snakeGameMaxCounter");
    if (usersMaxScore) {
      updateScoreMax(+usersMaxScore);
    }
  }, []);
};

export default useSetScoreMax;
