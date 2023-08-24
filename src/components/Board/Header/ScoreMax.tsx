import React from "react";
import styles from "./Header.module.scss";

import { BoardContext } from "../../../Context/boardContext";

const ScoreMax = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const scoreMax = React.useContext(BoardContext).scoreMax;

  React.useEffect(() => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  }, [scoreMax]);

  return (
    <div
      className={`${styles["header__score--max"]} ${
        scoreMax > 0 && isAnimating
          ? styles["header__score--max--animated"]
          : ""
      }`}
    >
      {scoreMax}
    </div>
  );
};

export default ScoreMax;
