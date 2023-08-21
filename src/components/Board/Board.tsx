import React from "react";
import styles from "./Board.module.scss";
import Cell from "./Cell/Cell";
import useArrowKeyPress from "../../hooks/useArrowKeyPress";

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
  last: number;
  constructor(value: number) {
    this.head = new LinkedListNode(value);
    this.tail = new LinkedListNode(value);
    this.last = value;
  }
}

class Snake {
  snake: LinkedList;
  constructor(value: number) {
    this.snake = new LinkedList(value);
  }

  moveLeft() {
    this.snake.head = new LinkedListNode(this.snake.head.val - 1);
  }
  moveRight() {
    this.snake.head = new LinkedListNode(this.snake.head.val + 1);
  }
  moveUp() {
    this.snake.head = new LinkedListNode(this.snake.head.val - 20);
  }
  moveDown() {
    this.snake.head = new LinkedListNode(this.snake.head.val + 20);
  }
}

const createBoard = (): number[][] => {
  const cells: number[][] = [];
  for (let i = 0; i < 20; i++) {
    const row: number[] = [];
    for (let j = 0; j < 20; j++) {
      row.push(j);
    }
    cells.push(row);
  }
  return cells;
};

const Board = () => {
  const [board] = React.useState(createBoard());
  const [snakeCells] = React.useState(new Set([44]));
  const [snake] = React.useState(new Snake(44));

  const arrowPress = useArrowKeyPress();

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      switch (arrowPress) {
        case "left":
          snakeCells.delete(snake.snake.head.val);
          snake.moveLeft();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "right":
          snakeCells.delete(snake.snake.head.val);
          snake.moveRight();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "up":
          snakeCells.delete(snake.snake.head.val);
          snake.moveUp();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        case "down":
          snakeCells.delete(snake.snake.head.val);
          snake.moveDown();
          snakeCells.add(snake.snake.head.val);
          setCounter((prev) => ++prev);
          break;
        default:
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [arrowPress, snake, snakeCells, counter]);

  return (
    <div className={styles["board"]}>
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
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
