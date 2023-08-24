export class LinkedListNode {
  val: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.val = value;
    this.next = null;
  }
}

export class LinkedList {
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
