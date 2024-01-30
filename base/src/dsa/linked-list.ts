
export class Node<T> {
  constructor(public value: T, public next?: Node<T>) {}

  static from<T>(value: T, next?: Node<T>) {
    return new Node(value, next);
  }
};

type NodeIteratorCondFn<T> = (node: Node<T> | undefined) => boolean;

export class LinkedList<T> {
  head?: Node<T>

  constructor() {}

  insertFront(value: T): this {
    const newNode = Node.from(value, this.head);
    this.head = newNode;

    return this;
  }

  insertBack(value: T): this {
    const newNode = Node.from(value);
    
    if(!this.head) {
      this.head = newNode;
      return this;
    }

    let iterator = this.head;
    while(iterator?.next) {
      iterator = iterator.next;
    }
    
    const end = iterator;
    end.next = newNode;

    return this;
  }

  removeAt(location: number): T | undefined {
    if(!this.head) {
      return;
    }

    if(location === 0) {
      const value = this.head.value;
      this.head = this.head.next;

      return value;
    }

    let index = 1;

    for(const node of this.node_iterator()) {
      if(index === location) {
        const value = node.next?.value;
        node.next = node.next?.next;

        return value;
      }
      ++index;
    }
  }

  at(location: number): T | undefined {
    let index = 0;

    for(const value of this.iterator()) {
      if(index === location) {
        return value;
      }

      ++index;
    }
  }
  
  private *node_iterator(condition?: NodeIteratorCondFn<T>)
    : Generator<Node<T>, this>
  {
    condition ??= (iterator) => !!iterator;
    let iterator = this.head;

    while(condition(iterator)) {
      yield iterator!;
      iterator = iterator!.next;
    }

    return this;
  }

  *iterator(): Generator<T, this> {
    let iterator = this.head;

    while(iterator) {
      yield iterator.value;
      iterator = iterator.next;
    }

    return this;
  }
}
