import React from "react";
import styles from "./BurgerMenu.module.scss";
import { redirect } from "../../../utils/redirect";
import { UserContext } from "../../../Context/user-context";
import { URL } from "../../../types/URL";

const BurgerMenu = () => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [first, setFirst] = React.useState<boolean>(true);
  const [showMenuAnim, setShowMenuAnim] = React.useState<
    "show" | "hide" | null
  >(null);

  const [showLinks, setShowLinks] = React.useState<boolean>(false);

  function burgerMenuClick() {
    setFirst(false);
    setShowMenu(!showMenu);
  }

  React.useEffect(() => {
    let timeout: any;
    if (!first) {
      if (showMenu) {
        setShowMenuAnim("show");
        setShowLinks(true);
      } else {
        setShowMenuAnim("hide");
        timeout = setTimeout(() => {
          setShowLinks(false);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showMenu]);

  const { isAuth } = React.useContext(UserContext);

  function linkClickHandler(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: URL
  ) {
    e.preventDefault();
    redirect(path);
    setShowMenu(false);
  }

  return (
    <>
      {showLinks && (
        <ul
          className={`${styles["burger-menu__links"]} ${
            showMenuAnim && styles[`burger-menu__links--${showMenuAnim}`]
          }`}
        >
          <li>
            <a
              className={styles["burger-menu__links__link"]}
              href="/snake-board/"
              onClick={(e) => {
                linkClickHandler(e, "/snake-game/");
              }}
            >
              Board
            </a>
          </li>
          <li>
            <a
              className={styles["burger-menu__links__link"]}
              href={
                isAuth ? "/snake-game/acc-details" : "/snake-game/auth--sign-in"
              }
              onClick={(e) => {
                linkClickHandler(
                  e,
                  isAuth
                    ? "/snake-game/acc-details"
                    : "/snake-game/auth--sign-in"
                );
              }}
            >
              {isAuth ? "Acc Details" : "Auth Form"}
            </a>
          </li>
        </ul>
      )}
      <div className={styles["burger-menu__wrapper"]}>
        <div
          className={`${styles["burger-menu"]} ${
            showMenuAnim && styles[`burger-menu--${showMenuAnim}`]
          }`}
        ></div>
        <form>
          <input
            className={styles["burger-menu__checkbox"]}
            type="checkbox"
            name="burger-menu"
            id="burger-menu"
            checked={showMenu}
            onChange={() => {}}
          />
          <label htmlFor="burger-menu">
            <div
              onClick={burgerMenuClick}
              className={styles["burger-menu__btn__wrapper"]}
            >
              <span
                className={`${styles["burger-menu__btn"]} ${
                  styles["burger-menu__btn--1"]
                } ${!first && styles["burger-menu__btn--1--animated"]}`}
              ></span>
              <span
                className={`${styles["burger-menu__btn"]} ${
                  styles["burger-menu__btn--2"]
                } ${!first && styles["burger-menu__btn--2--animated"]}`}
              ></span>
              <span
                className={`${styles["burger-menu__btn"]} ${
                  styles["burger-menu__btn--3"]
                } ${!first && styles["burger-menu__btn--3--animated"]}`}
              ></span>
            </div>
          </label>
        </form>
      </div>
    </>
  );
};

export default BurgerMenu;
