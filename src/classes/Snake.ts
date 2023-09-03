import { LinkedList } from "./LinkedList";

export class Snake {
  snake: LinkedList;
  step: number;
  constructor(value: number, step: number) {
    this.snake = new LinkedList(value);
    this.step = step;
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
    this.snake.head.val = this.snake.head.val - this.step;
  }
  moveDown() {
    this.updateTailValues();
    this.snake.head.val = this.snake.head.val + this.step;
  }

  updateTailValues(): void {
    let tail = this.snake.tail;
    while (tail.next) {
      tail.val = tail.next.val;
      tail = tail.next;
    }
  }
}
