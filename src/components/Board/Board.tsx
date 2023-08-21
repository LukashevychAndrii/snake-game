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

const createBoard = ({ map }: { map: Map<number, number> }): number[][] => {
  const cells: number[][] = [];
  for (let i = 0; i < 20; i++) {
    const row: number[] = [];
    for (let j = 0; j < 20; j++) {
      map.set(i * 20 + j + 1, i + 1);
      row.push(j);
    }
    cells.push(row);
  }
  return cells;
};

const Board = () => {
  const [map] = React.useState(new Map<number, number>(null));
  const [board] = React.useState(createBoard({ map }));
  const [snakeCells] = React.useState(new Set([44]));
  const [snake] = React.useState(new Snake(44));
  const [foodCells] = React.useState(new Set([55]));
  const [over, setOver] = React.useState(false);

  React.useEffect(() => {
    if (over) {
    }
  }, [over]);

  const arrowPress = useArrowKeyPress();

  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      switch (arrowPress) {
        case "left":
          const prevL = snake.snake.head.val;
          if (map.get(prevL)! > map.get(prevL - 1)!) {
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
          if (map.get(prevR)! < map.get(prevR + 1)!) {
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
  }, [arrowPress, snake, snakeCells, counter, map]);

  const getEatenCell = (): void => {
    snake.snake.addNode(snake.snake.tail.val);
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
