import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useArrowKeyPress from "../../hooks/useArrowKeyPress";
import createBoard from "../../utils/createBoard";
import getRandomCell from "../../utils/getRandomCell";
import End from "./GameState/End/End";
import getRandomNumber from "../../utils/getRandomNumber";
import Header from "./Header/Header";
import { BoardContext } from "../../Context/board-context";
import { Snake } from "../../classes/Snake";
import Settings from "./Settings/Settings";
import useGetSnakeSpeed from "../../hooks/useGetSnakeSpeed";
import useGetBoardSize from "../../hooks/useGetBoardSize";
import useGetRowsAndCols from "../../hooks/useGetRowsAndCols";
import { setEmptyCells } from "../../utils/setEmptyCells";
import { getMaxScoreFromLocalStorage } from "../../utils/getMaxScoreFromLocalStorage";

export type gameState = "start" | "playing" | "end";

const Board = () => {
  const boardSize = useGetBoardSize();
  const rowsAndCols = useGetRowsAndCols();
  const [counter, setCounter] = React.useState(0);
  const [cellsRows] = React.useState(new Map<number, number>(null));
  const [snake, setSnake] = React.useState<Snake>(new Snake(2, rowsAndCols));
  const [snakeCells] = React.useState(new Set());
  const [foodCells] = React.useState(new Set());
  const [emptyCells] = React.useState(new Set<number>());
  const board = React.useMemo(
    () => createBoard({ cellsRows, emptyCells, rowsAndCols }),
    [cellsRows, emptyCells, rowsAndCols]
  );
  const [gameState, setGameState] = React.useState<gameState>("start");

  React.useEffect(() => {
    const score__MAX = getMaxScoreFromLocalStorage();
    console.log(score__MAX);
    if (score__MAX) {
      updateScoreMax(score__MAX);
    }
  }, []);

  const { updateScoreMax, updateScoreCurrent, scoreCurrent } =
    React.useContext(BoardContext);
  const boardSnakeSpeed = useGetSnakeSpeed();
  // ! FOOD
  React.useEffect(() => {
    if (gameState === "start" || gameState === "end") {
      updateScoreCurrent(0);
      updateScoreMax(scoreCurrent);
      return;
    }
    // const interval = setInterval(() => {
    //   console.log(emptyCells.size);
    //   const newFoodCell = getRandomCell({ emptyCells });
    //   foodCells.add(newFoodCell);
    // }, 1000);

    if (foodCells.size === 0) {
      const newFoodCell = getRandomCell({ emptyCells });
      foodCells.add(newFoodCell);
    }

    // return () => clearInterval(interval);
  }, [emptyCells, foodCells, gameState, counter]);

  const arrowPress = useArrowKeyPress(gameState);

  // ! SNAKE

  React.useEffect(() => {
    if (gameState === "end") return;
    if (arrowPress) {
      setGameState("playing");
    }
    if (snake.snake.head.val < 0 || snake.snake.head.val > boardSize) {
      setGameState("end");
    }
    const interval = setInterval(() => {
      switch (arrowPress) {
        case "left":
          const prevL = snake.snake.head.val;
          if (cellsRows.get(prevL)! > cellsRows.get(prevL - 1)!) {
            clearInterval(interval);
            setGameState("end");
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          emptyCells.add(snake.snake.tail.val);
          snake.moveLeft();
          if (snakeCells.has(snake.snake.head.val)) {
            setGameState("end");
            break;
          }
          snakeCells.add(snake.snake.head.val);
          emptyCells.delete(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "right":
          const prevR = snake.snake.head.val;
          if (cellsRows.get(prevR)! < cellsRows.get(prevR + 1)!) {
            clearInterval(interval);
            setGameState("end");
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          emptyCells.add(snake.snake.tail.val);
          snake.moveRight();
          if (snakeCells.has(snake.snake.head.val)) {
            setGameState("end");
            break;
          }
          snakeCells.add(snake.snake.head.val);
          emptyCells.delete(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "up":
          const prevU = snake.snake.head.val;
          if (prevU - rowsAndCols < 0) {
            clearInterval(interval);
            setGameState("end");
            break;
          }

          snakeCells.delete(snake.snake.tail.val);
          emptyCells.add(snake.snake.tail.val);
          snake.moveUp();
          if (snakeCells.has(snake.snake.head.val)) {
            setGameState("end");
            break;
          }
          snakeCells.add(snake.snake.head.val);
          emptyCells.delete(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "down":
          const prevD = snake.snake.head.val;
          if (prevD + rowsAndCols > boardSize) {
            clearInterval(interval);
            setGameState("end");
            break;
          }

          snakeCells.delete(snake.snake.tail.val);
          emptyCells.add(snake.snake.tail.val);
          snake.moveDown();
          if (snakeCells.has(snake.snake.head.val)) {
            setGameState("end");
            break;
          }
          snakeCells.add(snake.snake.head.val);
          emptyCells.delete(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        default:
          clearInterval(interval);
          break;
      }
    }, boardSnakeSpeed);

    return () => clearInterval(interval);
  }, [
    arrowPress,
    snake,
    snakeCells,
    counter,
    cellsRows,
    gameState,
    emptyCells,
    boardSnakeSpeed,
    boardSize,
    rowsAndCols,
  ]);

  React.useEffect(() => {
    if (gameState === "start") {
      const randomNumber = getRandomNumber(1, boardSize);
      snakeCells.clear();
      snakeCells.add(randomNumber);
      foodCells.clear();
      setEmptyCells({ emptyCells, rowsAndCols });
      setSnake(new Snake(randomNumber, rowsAndCols));
    } else if (gameState === "end") {
      setSnake(new Snake(1, rowsAndCols));
      snakeCells.clear();
      // updateScoreMax();
    }
  }, [gameState, snakeCells, boardSize, rowsAndCols, emptyCells, foodCells]);

  const getEatenCell = (): void => {
    snake.snake.addNode(snake.snake.tail.val);
    foodCells.delete(snake.snake.head.val);
    updateScoreCurrent(snakeCells.size);
  };

  const getGameState = (state: gameState): void => {
    setGameState(state);
  };

  return (
    <>
      <div className={styles["board__wrapper"]}>
        <Header />
        <div
          style={{ gridTemplateColumns: `repeat(${rowsAndCols},1fr)` }}
          className={styles["board"]}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <Cell
                getEatenCell={getEatenCell}
                foodCell={foodCells.has(rowIndex * rowsAndCols + cellIndex + 1)}
                snakeCell={snakeCells.has(
                  rowIndex * rowsAndCols + cellIndex + 1
                )}
                pos={rowIndex * rowsAndCols + cellIndex + 1}
                key={rowIndex + cellIndex}
              />
            ))
          )}
        </div>
        {gameState === "end" && (
          <End
            end={emptyCells.size === 0 ? "win" : "loss"}
            getGameState={getGameState}
          />
        )}
      </div>
      <Settings />
    </>
  );
};

export default Board;
