import React from "react";
import styles from "./Start.module.scss";
import { gameState } from "../../Board";

interface props {
  getGameState: (state: gameState) => void;
}

const Start: React.FC<props> = ({ getGameState }) => {
  const btnStartClick = (): void => {
    getGameState("playing");
  };
  return (
    <div className={styles["start__wrapper"]}>
      <button onClick={btnStartClick} className={styles["start__button"]}>
        Start
      </button>
    </div>
  );
};

export default Start;
