import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "./firebase/firebase";
import { BoardProvider } from "./Context/board-context";
import { SettingsProvider } from "./Context/settings-context";
import { UserProvider } from "./Context/user-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BoardProvider>
      <SettingsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SettingsProvider>
    </BoardProvider>
  </React.StrictMode>
);
