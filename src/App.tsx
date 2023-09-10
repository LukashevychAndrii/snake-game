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

  let componentToRender: JSX.Element = <></>;

  switch (currentUrl) {
    case "/snake-game": {
      componentToRender = <Board />;
      break;
    }
    case "/snake-game/auth--sign-in": {
      componentToRender = <SignIn />;
      break;
    }
    case "/snake-game/auth--sign-up": {
      componentToRender = <SignUp />;
      break;
    }
    case "/snake-game/acc-details": {
      componentToRender = <AccDetails />;
      break;
    }
    default:
      componentToRender = <Board />;
  }
  const { setBoardSettings: setBoardSettings_g } =
    React.useContext(BoardContext);
  const { setBoardSettings } = React.useContext(SettingsContext);
  const { connectToAcc, isAuth } = React.useContext(UserContext);

  React.useEffect(() => {
    connectToAcc();
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      const fetch = async () => {
        const response = await fetchBoardSettings();
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
