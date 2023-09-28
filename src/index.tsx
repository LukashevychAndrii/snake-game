import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "./firebase/firebase";
import { BoardProvider } from "./Context/board-context";
import { SettingsProvider } from "./Context/settings-context";
import { UserProvider } from "./Context/user-context";
import { LoadingProvider } from "./Context/loading-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BoardProvider>
    <SettingsProvider>
      <UserProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </UserProvider>
    </SettingsProvider>
  </BoardProvider>
);
