import React from "react";
import styles from "./TopBar.module.scss";
import Settings from "../Settings/Settings";
import AuthIcon from "../Auth/AuthIcon";
import { UserContext } from "../../Context/user-context";

const TopBar = () => {
  const { connectToAcc } = React.useContext(UserContext);
  React.useEffect(() => {
    connectToAcc();
  }, []);

  return (
    <div className={styles["top-bar"]}>
      <Settings />
      <AuthIcon />
    </div>
  );
};

export default TopBar;
