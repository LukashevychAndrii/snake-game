import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useArrowKeyPress from "../../hooks/useArrowKeyPress";
import createBoard from "../../utils/createBoard";
import getRandomCell from "../../utils/getRandomCell";
import End from "./GameState/End/End";
import getRandomNumber from "../../utils/getRandomNumber";
import Header from "./Header/Header";
import { BoardContext } from "../../Context/boardContext";
import useSetScoreMax from "../../hooks/useSetScoreMax";
import { Snake } from "../../classes/Snake";

export type gameState = "start" | "playing" | "end";

const Board = () => {
  useSetScoreMax();
  const [counter, setCounter] = React.useState(0);
  const [cellsRows] = React.useState(new Map<number, number>(null));
  const [snake, setSnake] = React.useState<Snake>(new Snake(2));
  const [snakeCells] = React.useState(new Set());
  const [foodCells] = React.useState(new Set());
  const [emptyCells] = React.useState(new Set<number>());
  const board = React.useMemo(
    () => createBoard({ cellsRows, emptyCells }),
    [cellsRows, emptyCells]
  );
  const [gameState, setGameState] = React.useState<gameState>("start");

  const updateScoreCurrent = React.useContext(BoardContext).updateScoreCurrent;
  const updateScoreMax = React.useContext(BoardContext).updateScoreMax;
  // ! FOOD
  React.useEffect(() => {
    if (gameState === "start" || gameState === "end") {
      foodCells.clear();
      updateScoreMax();
      updateScoreCurrent(0);
      return;
    }
    const interval = setInterval(() => {
      const newFoodCell = getRandomCell({ emptyCells });
      foodCells.add(newFoodCell);
    }, 1000);

    if (foodCells.size === 0) {
      const newFoodCell = getRandomCell({ emptyCells });
      foodCells.add(newFoodCell);
    }

    return () => clearInterval(interval);
  }, [
    emptyCells,
    foodCells,
    gameState,
    counter,
    updateScoreCurrent,
    updateScoreMax,
  ]);

  const arrowPress = useArrowKeyPress(gameState);

  // ! SNAKE

  React.useEffect(() => {
    if (gameState === "end") return;
    if (arrowPress) {
      setGameState("playing");
    }
    if (snake.snake.head.val < 0 || snake.snake.head.val > 400) {
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
          if (prevU - 20 < 0) {
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
          if (prevD + 20 > 400) {
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
    }, 100);

    return () => clearInterval(interval);
  }, [
    arrowPress,
    snake,
    snakeCells,
    counter,
    cellsRows,
    gameState,
    emptyCells,
  ]);

  React.useEffect(() => {
    if (gameState === "start") {
      console.log("start");
      const randomNumber = getRandomNumber(1, 400);
      snakeCells.add(randomNumber);
      setSnake(new Snake(randomNumber));
    } else if (gameState === "end") {
      console.log("end");
      setSnake(new Snake(1));
      snakeCells.clear();
    }
  }, [gameState, snakeCells]);

  const getEatenCell = (): void => {
    snake.snake.addNode(snake.snake.tail.val);
    foodCells.delete(snake.snake.head.val);
    updateScoreCurrent(snakeCells.size);
  };

  const getGameState = (state: gameState): void => {
    setGameState(state);
  };

  return (
    <div className={styles["board__wrapper"]}>
      <Header />
      <div className={styles["board"]}>
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell
              getEatenCell={getEatenCell}
              foodCell={foodCells.has(rowIndex * 20 + cellIndex + 1)}
              snakeCell={snakeCells.has(rowIndex * 20 + cellIndex + 1)}
              pos={rowIndex * 20 + cellIndex + 1}
              key={rowIndex + cellIndex}
            />
          ))
        )}
      </div>
      {/* {gameState === "start" && <Start getGameState={getGameState} />} */}
      {gameState === "end" && <End getGameState={getGameState} />}
    </div>
  );
};

export default Board;
