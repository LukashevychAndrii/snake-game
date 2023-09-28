import React from "react";
import styles from "./LoadingBar.module.scss";

import { LoadingContext } from "../../Context/loading-context";

const LoadingBar = () => {
  const { loadingQueue } = React.useContext(LoadingContext);
  return loadingQueue > 0 ? (
    <div className={styles["spinner-square"]}>
      <div className={`${styles["square-1"]} ${styles["square"]}`}></div>
      <div className={`${styles["square-2"]} ${styles["square"]}`}></div>
      <div className={`${styles["square-3"]} ${styles["square"]}`}></div>
    </div>
  ) : (
    <></>
  );
};

export default LoadingBar;
