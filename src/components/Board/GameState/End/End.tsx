import React from "react";
import styles from "./End.module.scss";

import qwe from "../../../../imgs/pngwing.com.png";
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
            onClick={() => {
              getGameState("start");
            }}
            className={styles["end__btn-new-game"]}
          >
            start new game
          </button>
          <img className={styles["end__img"]} src={qwe} alt="lost"></img>
        </>
      ) : (
        <>
          <div className={styles["end"]}>You won!</div>
          <button
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
