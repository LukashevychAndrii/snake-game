import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useArrowKeyPress from "../../hooks/useArrowKeyPress";
import createBoard from "../../utils/createBoard";
import getRandomCell from "../../utils/getRandomCell";
import Start from "./GameState/Start/Start";
import End from "./GameState/End/End";
import getRandomNumber from "../../utils/getRandomNumber";

class LinkedListNode {
  val: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.val = value;
    this.next = null;
  }
}

class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;
  constructor(value: number) {
    this.head = new LinkedListNode(value);
    this.tail = this.head;
  }

  addNode(val: number): void {
    const tailNew = new LinkedListNode(val);
    tailNew.next = this.tail;
    this.tail = tailNew;
  }
}

class Snake {
  snake: LinkedList;
  constructor(value: number) {
    this.snake = new LinkedList(value);
  }

  moveLeft() {
    this.updateTailValues();
    this.snake.head.val = this.snake.head.val - 1;
  }
  moveRight() {
    this.updateTailValues();
    this.snake.head.val = this.snake.head.val + 1;
  }
  moveUp() {
    this.updateTailValues();
    this.snake.head.val = this.snake.head.val - 20;
  }
  moveDown() {
    this.updateTailValues();
    this.snake.head.val = this.snake.head.val + 20;
  }

  updateTailValues(): void {
    let tail = this.snake.tail;
    while (tail.next) {
      tail.val = tail.next.val;
      tail = tail.next;
    }
  }
}

export type gameState = "start" | "playing" | "end";

const Board = () => {
  const [counter, setCounter] = React.useState(0);
  const [cellsRows] = React.useState(new Map<number, number>(null));
  const [snake, setSnake] = React.useState<Snake>(new Snake(-1));
  const [snakeCells] = React.useState(new Set());
  const [foodCells] = React.useState(new Set());
  const [emptyCells] = React.useState(new Set<number>());
  const board = React.useMemo(
    () => createBoard({ cellsRows, emptyCells }),
    [cellsRows, emptyCells]
  );
  const [gameState, setGameState] = React.useState<gameState>("start");

  // ! FOOD
  React.useEffect(() => {
    if (gameState === "start" || gameState === "end") {
      foodCells.clear();
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
  }, [emptyCells, foodCells, gameState, counter]);

  const arrowPress = useArrowKeyPress(gameState);

  // ! SNAKE

  React.useEffect(() => {
    if (gameState === "end") return;
    if (arrowPress) {
      setGameState("playing");
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
    }, 50);

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
      setSnake(new Snake(-1));
      snakeCells.clear();
    }
  }, [gameState, snakeCells]);

  const getEatenCell = (): void => {
    snake.snake.addNode(snake.snake.tail.val);
    foodCells.delete(snake.snake.head.val);
  };

  const getGameState = (state: gameState): void => {
    setGameState(state);
  };

  return (
    <>
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
    </>
  );
};

export default Board;
