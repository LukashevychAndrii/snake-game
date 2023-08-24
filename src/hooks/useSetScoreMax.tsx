import React from "react";
import { BoardContext } from "../Context/boardContext";

const useSetScoreMax = (): void => {
  const updateScoreMax = React.useContext(BoardContext).updateScoreMax;

  React.useEffect(() => {
    const usersMaxScore = localStorage.getItem("snakeGameMaxCounter");
    if (usersMaxScore) {
      console.log(+usersMaxScore);
      updateScoreMax(+usersMaxScore);
    }
  }, [updateScoreMax]);
};

export default useSetScoreMax;
