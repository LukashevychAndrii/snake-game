import React from "react";
import styles from "./End.module.scss";

import { gameState } from "../../Board";

export type end = "loss" | "win";
interface props {
  getGameState: (gameState: gameState) => void;
  end: end;
}

const End: React.FC<props> = ({ getGameState, end }) => {
  return (
    <div className={styles["end__wrapper"]}>
      {end === "loss" ? (
        <>
          <div className={styles["end"]}>You lost!</div>
          <button
            autoFocus
            onClick={() => {
              getGameState("start");
            }}
            className={styles["end__btn-new-game"]}
          >
            start new game
          </button>
        </>
      ) : (
        <>
          <div className={styles["end"]}>You won!</div>
          <button
            autoFocus
            onClick={() => {
              getGameState("start");
            }}
            className={styles["end__btn-new-game"]}
          >
            start new game
          </button>
        </>
      )}
    </div>
  );
};

export default End;
