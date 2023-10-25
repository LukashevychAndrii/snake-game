import React from "react";
import styles from "./App.module.scss";
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
import useSetMaxScore from "./hooks/useSetMaxScore";
import BoardWrapper from "./components/Board/BoardWrapper";
import { redirect } from "./utils/redirect";

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

  const getMaxScore = useSetMaxScore();

  React.useEffect(() => {
    connectToAcc();
  }, []);

  React.useEffect(() => {
    if (currentUrl === "/") redirect("/snake-game/");
  }, [currentUrl]);

  React.useEffect(() => {
    if (loadingSettingsQueue > 0) {
      setComponentToRender(<LoadingBar />);
    } else {
      switch (currentUrl) {
        case "/snake-game/": {
          setComponentToRender(<BoardWrapper />);
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
        // default:
        // setPathname("/error");
      }
    }
  }, [currentUrl, loadingSettingsQueue, isAuth]);

  const { setBoardSettings: setBoardSettings_g } =
    React.useContext(BoardContext);
  const { setBoardSettings } = React.useContext(SettingsContext);

  React.useEffect(() => {
    if (isAuth) {
      const fetch = async () => {
        addToSettingsQueue();
        const response = await fetchBoardSettings();
        removeFormSettingsQueue();
        if (response) {
          setBoardSettings_g(response);
          setBoardSettings(response);
        }
      };
      fetch();
      getMaxScore();
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
