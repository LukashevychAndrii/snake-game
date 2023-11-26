import React from "react";
import styles from "./Header.module.scss";

import ScoreCurrent from "./ScoreCurrent";
import ScoreMax from "./ScoreMax";
import Settings from "../../Settings/Settings";
import BurgerMenu from "../../TopBar/BurgerMenu/BurgerMenu";
import { useGetWindowWidth } from "../../../hooks/useGetWindowWidth";

const Header = () => {
  const windowWidth = useGetWindowWidth();
  return (
    <div className={styles["header"]}>
      {windowWidth <= 750 && <Settings />}
      <ScoreCurrent />
      <ScoreMax />
      {windowWidth <= 750 && <BurgerMenu />}
    </div>
  );
};

export default Header;
