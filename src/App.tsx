import React from "react";
import styles from "./App.module.scss";
import Board from "./components/Board/Board";

function App() {
  return (
    <main className={styles["main"]}>
      <Board />
    </main>
  );
}

export default App;
