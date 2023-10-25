import React from "react";
import styles from "./BoardIcon.module.scss";

import { ReactComponent as Icon } from "../../../imgs/SVG/board.svg";
import { redirect } from "../../../utils/redirect";

const BoardIcon = () => {
  function handleClickBoard(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    e.preventDefault();
    redirect("/snake-game/");
  }
  return (
    <a className={styles["link"]} href="/snake-game" onClick={handleClickBoard}>
      <Icon className={styles["link__icon"]} />
      <span>Board</span>
    </a>
  );
};

export default BoardIcon;
