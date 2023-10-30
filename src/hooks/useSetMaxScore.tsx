import React from "react";
import { BoardContext } from "../Context/board-context";
import { getScoreMax } from "../firebase/functions/score/getMaxScore";

const useSetMaxScore = () => {
  const { updateScoreMax } = React.useContext(BoardContext);

  async function getScore(force?: boolean) {
    const maxScore = await getScoreMax();
    if (maxScore) {
      updateScoreMax(maxScore, force);
    }
  }

  return getScore;
};

export default useSetMaxScore;
