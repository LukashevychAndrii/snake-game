import { LinkedList } from "./LinkedList";

export class Snake {
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
