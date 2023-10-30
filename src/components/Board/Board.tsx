import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useGetDirection from "../../hooks/useGetDirection";
import createBoard from "../../utils/createBoard";
import getRandomCell from "../../utils/getRandomCell";
import End from "./GameState/End/End";
import getRandomNumber from "../../utils/getRandomNumber";
import Header from "./Header/Header";
import { BoardContext } from "../../Context/board-context";
import { Snake } from "../../classes/Snake";
import { setEmptyCells } from "../../utils/setEmptyCells";
import { boardSize } from "../../types/boardSize";
import { RowsAndCols } from "../../types/rowsAndCols";
import { boardSnakeSpeed } from "../../types/boardSnakeSpeed";
import { UserContext } from "../../Context/user-context";

export type gameState = "start" | "playing" | "end";

interface props {
  boardSize: boardSize;
  rowsAndCols: RowsAndCols;
  boardSnakeSpeed: boardSnakeSpeed;
  isTouchDevice: boolean;
}

const Board = ({
  boardSize,
  boardSnakeSpeed,
  rowsAndCols,
  isTouchDevice,
}: props) => {
  const [counter, setCounter] = React.useState(0); // !!!!!!!
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

  const { updateScoreMax, updateScoreCurrent, scoreCurrent } =
    React.useContext(BoardContext);

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

  const arrowPress = useGetDirection({ gameState, isTouchDevice });

  const moove = () => {
    switch (arrowPress) {
      case "left":
        const prevL = snake.snake.head.val;
        if (cellsRows.get(prevL)! > cellsRows.get(prevL - 1)!) {
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
    }
  };

  React.useEffect(() => {
    if (gameState === "playing") {
      moove();
    }
    let interval: any = null;
    if (arrowPress) {
      setGameState("playing");
      interval = setInterval(() => {
        moove();
      }, boardSnakeSpeed);
    }

    return () => clearInterval(interval);
  }, [arrowPress]);

  React.useEffect(() => {
    if (gameState === "end") return;
    if (snake.snake.head.val < 0 || snake.snake.head.val > boardSize) {
      setGameState("end");
    }
  }, [boardSize, gameState, snake.snake.head.val]);

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
    }
  }, [gameState, snakeCells, boardSize, rowsAndCols, emptyCells, foodCells]);

  const getEatenCell = React.useCallback((): void => {
    snake.snake.addNode(snake.snake.tail.val);
    foodCells.delete(snake.snake.head.val);
    updateScoreCurrent(snakeCells.size);
  }, [foodCells.size, snakeCells.size]);

  const getGameState = (state: gameState): void => {
    setGameState(state);
  };

  return (
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
              snakeCell={snakeCells.has(rowIndex * rowsAndCols + cellIndex + 1)}
              headCell={
                snake.snake.head.val === rowIndex * rowsAndCols + cellIndex + 1
              }
              direction={arrowPress}
              // pos={rowIndex * rowsAndCols + cellIndex + 1}
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
  );
};

export default Board;
