import React from "react";
import styles from "./End.module.scss";

import qwe from "../../../../imgs/pngwing.com.png";
import { gameState } from "../../Board";

interface props {
  getGameState: (gameState: gameState) => void;
}

const End: React.FC<props> = ({ getGameState }) => {
  return (
    <div className={styles["end__wrapper"]}>
      <div className={styles["end"]}>You lost!</div>
      <button
        onClick={() => {
          getGameState("start");
        }}
        className={styles["end__btn-new-game"]}
      >
        start new game
      </button>
      <img className={styles["end__img"]} src={qwe} alt="lost"></img>
    </div>
  );
};

export default End;
