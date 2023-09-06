import React from "react";
import styles from "./AuthIcon.module.scss";
import { ReactComponent as DefaultAvatar } from "../../imgs/SVG/default-avatar.svg";
import { UserContext } from "../../Context/user-context";
import { redirect } from "../../utils/redirect";

const AuthIcon = () => {
  const { name, isAuth } = React.useContext(UserContext);
  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    redirect(isAuth ? "/snake-game/acc-details" : "/snake-game/auth--sign-in");
  }
  return (
    <a
      className={styles["link"]}
      style={{ textDecoration: "none" }}
      href={`${
        isAuth ? "/snake-game/acc-details" : "/snake-game/auth--sign-in"
      }`}
      onClick={handleLinkClick}
    >
      <DefaultAvatar className={styles["link__icon"]} />
      {isAuth && <span>{name}</span>}
    </a>
  );
};

export default AuthIcon;
