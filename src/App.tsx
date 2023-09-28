import React from "react";
import styles from "./App.module.scss";
import Board from "./components/Board/Board";
import TopBar from "./components/TopBar/TopBar";
import { URL } from "./types/URL";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import AccDetails from "./components/AccDetails/AccDetails";
import { BoardContext } from "./Context/board-context";
import { UserContext } from "./Context/user-context";
import { fetchBoardSettings } from "./firebase/functions/settings/fetchBoardSettings";
import { SettingsContext } from "./Context/settings-context";
import { LoadingContext } from "./Context/loading-context";
import LoadingBar from "./components/Loading/LoadingBar";
import { setPathname } from "./utils/setPathname";

function App() {
  const [currentUrl, setCurrentUrl] = React.useState<URL>(
    window.location.pathname as URL
  );
  React.useEffect(() => {
    const handleUrlChange = () => {
      setCurrentUrl(window.location.pathname as URL);
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  let [componentToRender, setComponentToRender] = React.useState<JSX.Element>(
    <></>
  );

  const { addToSettingsQueue, removeFormSettingsQueue, loadingSettingsQueue } =
    React.useContext(LoadingContext);

  const { connectToAcc, isAuth } = React.useContext(UserContext);

  const [authChecked, setAuthChecked] = React.useState(false);

  React.useEffect(() => {
    addToSettingsQueue();
    connectToAcc();
    setAuthChecked(true);
  }, []);

  React.useEffect(() => {
    if (currentUrl === "/") setPathname("/snake-game");
  }, [currentUrl]);

  React.useEffect(() => {
    if (authChecked) {
      if (loadingSettingsQueue > 0) {
        setComponentToRender(<LoadingBar />);
        return;
      }
      switch (currentUrl) {
        case "/snake-game": {
          setComponentToRender(<Board />);
          break;
        }
        case "/snake-game/auth--sign-in": {
          setComponentToRender(<SignIn />);
          break;
        }
        case "/snake-game/auth--sign-up": {
          setComponentToRender(<SignUp />);
          break;
        }
        case "/snake-game/acc-details": {
          setComponentToRender(<AccDetails />);
          break;
        }
        default:
        // setPathname("/error");
      }
    }
  }, [currentUrl, loadingSettingsQueue, authChecked]);

  const { setBoardSettings: setBoardSettings_g } =
    React.useContext(BoardContext);
  const { setBoardSettings } = React.useContext(SettingsContext);

  React.useEffect(() => {
    if (isAuth) {
      const fetch = async () => {
        addToSettingsQueue();
        const response = await fetchBoardSettings();
        removeFormSettingsQueue();
        removeFormSettingsQueue();
        if (response) {
          setBoardSettings_g(response);
          setBoardSettings(response);
        }
      };
      fetch();
    }
  }, [isAuth]);

  return (
    <main className={styles["main"]}>
      <TopBar />
      {componentToRender}
    </main>
  );
}

export default App;
