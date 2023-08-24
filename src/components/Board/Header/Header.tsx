import React from "react";
import styles from "./Header.module.scss";

import ScoreCurrent from "./ScoreCurrent";
import ScoreMax from "./ScoreMax";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <ScoreCurrent />
      <ScoreMax />
    </div>
  );
};

export default Header;
