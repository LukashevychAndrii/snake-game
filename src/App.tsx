import React from "react";
import styles from "./App.module.scss";
import Board from "./components/Board/Board";
import { BoardProvider } from "./Context/board-context";
import { SettingsProvider } from "./Context/settings-context";

function App() {
  return (
    <main className={styles["main"]}>
      <BoardProvider>
        <SettingsProvider>
          <Board />
        </SettingsProvider>
      </BoardProvider>
    </main>
  );
}

export default App;
