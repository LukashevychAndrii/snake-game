import React from "react";
import styles from "./App.module.scss";
import Board from "./components/Board/Board";
import { BoardProvider } from "./Context/boardContext";

function App() {
  return (
    <main className={styles["main"]}>
      <BoardProvider>
        <Board />
      </BoardProvider>
    </main>
  );
}

export default App;
