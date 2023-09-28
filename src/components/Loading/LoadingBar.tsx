import React from "react";
import styles from "./LoadingBar.module.scss";

const LoadingBar = () => {
  return (
    <div className={styles["loading-bar"]}>
      <span className={styles["loading-bar__text"]}>Loading...</span>
      <div className={styles["spinner-square"]}>
        <div className={`${styles["square-1"]} ${styles["square"]}`}></div>
        <div className={`${styles["square-2"]} ${styles["square"]}`}></div>
        <div className={`${styles["square-3"]} ${styles["square"]}`}></div>
      </div>
    </div>
  );
};

export default LoadingBar;
