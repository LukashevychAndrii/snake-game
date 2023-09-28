import React from "react";
import { BoardContext } from "../Context/board-context";
import { getScoreMax } from "../firebase/functions/score/getMaxScore";

const useSetMaxScore = () => {
  const { updateScoreMax } = React.useContext(BoardContext);

  async function getScore() {
    const maxScore = await getScoreMax();
    console.log(maxScore);
    if (maxScore) {
      updateScoreMax(maxScore);
    }
  }

  return getScore;
};

export default useSetMaxScore;
