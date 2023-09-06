import React from "react";
import styles from "./App.module.scss";
import Board from "./components/Board/Board";
import { BoardProvider } from "./Context/board-context";
import { SettingsProvider } from "./Context/settings-context";
import TopBar from "./components/TopBar/TopBar";
import { URL } from "./types/URL";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { UserProvider } from "./Context/user-context";
import AccDetails from "./components/AccDetails/AccDetails";

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

  React.useEffect(() => {
    console.log(currentUrl);
  }, [currentUrl]);

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

  return (
    <main className={styles["main"]}>
      <BoardProvider>
        <SettingsProvider>
          <UserProvider>
            <TopBar />
            {componentToRender}
          </UserProvider>
        </SettingsProvider>
      </BoardProvider>
    </main>
  );
}

export default App;
