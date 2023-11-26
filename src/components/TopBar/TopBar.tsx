import React from "react";
import styles from "./TopBar.module.scss";
import Settings from "../Settings/Settings";
import AuthIcon from "../Auth/AuthIcon";
import { UserContext } from "../../Context/user-context";
import BoardIcon from "../Board/BoardIcon/BoardIcon";
import { useGetWindowWidth } from "../../hooks/useGetWindowWidth";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const TopBar = () => {
  const windowWidth = useGetWindowWidth();
  return (
    <>
      {windowWidth > 750 && (
        <div className={styles["top-bar"]}>
          <div className={styles["top-bar--left"]}>
            {windowWidth > 1100 ? <BoardIcon /> : <Settings />}
          </div>
          {windowWidth > 1100 ? (
            <div className={styles["top-bar--right"]}>
              <Settings />
              <AuthIcon />
            </div>
          ) : (
            <BurgerMenu />
          )}
        </div>
      )}
    </>
  );
};

export default TopBar;
