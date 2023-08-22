import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useArrowKeyPress from "../../hooks/useArrowKeyPress";
import createBoard from "../../utils/createBoard";
import getRandomCell from "../../utils/getRandomCell";

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

const Board = () => {
  const [counter, setCounter] = React.useState(0);
  const [cellsRows] = React.useState(new Map<number, number>(null));
  const [emptyCells] = React.useState(new Set<number>());
  const [board] = React.useState(createBoard({ cellsRows, emptyCells }));
  const [snakeCells] = React.useState(new Set([44]));
  const [snake] = React.useState(new Snake(44));
  const [foodCells] = React.useState(new Set([55]));
  const [over, setOver] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("asd");
      const newFoodCell = getRandomCell({ emptyCells });
      foodCells.add(newFoodCell);
    }, 1000);

    if (over) {
      clearInterval(interval);
    }
    if (foodCells.size === 0) {
      const newFoodCell = getRandomCell({ emptyCells });
      foodCells.add(newFoodCell);
    }

    return () => clearInterval(interval);
  }, [emptyCells, foodCells, over, counter]);

  React.useEffect(() => {
    if (over) {
    }
  }, [over]);

  const arrowPress = useArrowKeyPress();

  React.useEffect(() => {
    const interval = setInterval(() => {
      switch (arrowPress) {
        case "left":
          const prevL = snake.snake.head.val;
          if (cellsRows.get(prevL)! > cellsRows.get(prevL - 1)!) {
            clearInterval(interval);
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          snake.moveLeft();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "right":
          const prevR = snake.snake.head.val;
          if (cellsRows.get(prevR)! < cellsRows.get(prevR + 1)!) {
            clearInterval(interval);
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          snake.moveRight();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "up":
          const prevU = snake.snake.head.val;
          if (prevU - 20 < 0) {
            clearInterval(interval);
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          snake.moveUp();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "down":
          const prevD = snake.snake.head.val;
          if (prevD + 20 > 400) {
            clearInterval(interval);
            break;
          }
          snakeCells.delete(snake.snake.tail.val);
          snake.moveDown();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        default:
          clearInterval(interval);
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [arrowPress, snake, snakeCells, counter, cellsRows]);

  const getEatenCell = (): void => {
    snake.snake.addNode(snake.snake.tail.val);
    foodCells.delete(snake.snake.head.val);
    emptyCells.add(snake.snake.head.val);
  };

  return (
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
  );
};

export default Board;
