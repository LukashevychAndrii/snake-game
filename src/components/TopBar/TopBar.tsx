import React from "react";
import styles from "./TopBar.module.scss";
import Settings from "../Settings/Settings";
import AuthIcon from "../Auth/AuthIcon";
import { UserContext } from "../../Context/user-context";
import BoardIcon from "../Board/BoardIcon/BoardIcon";

const TopBar = () => {
  const { connectToAcc } = React.useContext(UserContext);
  // React.useEffect(() => {
  //   connectToAcc();
  // }, []);

  return (
    <div className={styles["top-bar"]}>
      <div className={styles["top-bar--left"]}>
        <BoardIcon />
      </div>
      <div className={styles["top-bar--right"]}>
        <Settings />
        <AuthIcon />
      </div>
    </div>
  );
};

export default TopBar;
