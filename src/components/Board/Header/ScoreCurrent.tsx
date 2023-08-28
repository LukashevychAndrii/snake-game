import React from "react";
import styles from "./Header.module.scss";
import { BoardContext } from "../../../Context/board-context";

const ScoreCurrent = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const { scoreCurrent } = React.useContext(BoardContext);

  React.useEffect(() => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  }, [scoreCurrent]);

  React.useEffect(() => {}, [scoreCurrent]);

  return (
    <div
      className={`${styles["header__score--current"]} ${
        scoreCurrent > 0 && isAnimating
          ? styles["header__score--current--animated"]
          : ""
      }`}
    >
      {scoreCurrent}
    </div>
  );
};

export default ScoreCurrent;
