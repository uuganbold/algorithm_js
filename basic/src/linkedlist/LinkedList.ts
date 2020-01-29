/**
 *
 */
class LinkedListNode<T> {
  public data: T;

  public next: LinkedListNode<T>;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList<T> {
  private head: LinkedListNode<T>;

  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Time complexity will be O(1)
   * @param data Data to be added to the list
   */
  public addFirst(data: T): void{
    const node = new LinkedListNode(data);
    node.next = this.head;
    this.head = node;
    this.size += 1;
  }

  /**
   * Add element to linked list at the end of the list
   * Time compexity is O(n)
   * @param data 
   */
  public add(data:T):void{
    const node=new LinkedListNode(data);
    if(this.head===null){
      this.head=node;
    }else{
      let current=this.head;
      while(current.next!=null){
        current=current.next;
      }
      current.next=node;
    }
    this.size+=1;
  }

  /**
   * Time complexity is O(n) where n is size of the list
   * @param index index where new node to be added
   * @param data  data belonging to the new node.
   */
  public addAt(index: number, data: T): void {
    if (index < 0 || index > this.size) {
      throw new RangeError('The member cannot be added at out of the size');
    }

    const newNode = new LinkedListNode(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let i = index;
      let node = this.head;
      while (i > 1) {
        node = node.next;
        i -= 1;
      }
      newNode.next = node.next;
      node.next = newNode;
    }
    this.size += 1;
  }

  /**
   * Time complexity O(1)
   */
  public clear(): void{
    this.head = null;
    this.size=0;
  }

  /**
   * Time complexity O(n)
   * @param data
   */
  public contains(data: T): boolean {
    let node = this.head;
    while (node != null && node.data !== data) {
      node = node.next;
    }
    return node != null;
  }

  /**
   * Time complexity O(1)
   */
  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  /**
   * Time complexity O(n)
   * @param data
   */
  public remove(data: T): boolean {
    let node = this.head;
    let parent = null;
    while (node != null && node.data !== data) {
      parent = node;
      node = node.next;
    }
    if (node == null) return false;
    if (parent != null) parent.next = node.next;
    else this.head = node.next;
    this.size -= 1;
    return true;
  }

  public removeAt(index: number): boolean {
    if (index < 0 || index >= this.size) return false;
    let node = this.head;
    let parent = null;
    let i = index;
    while (i > 0) {
      parent = node;
      node = node.next;
      i -= 1;
    }
    if (parent != null) parent.next = node.next;
    else this.head = node.next;
    this.size -= 1;
    return true;
  }

  public get(index: number): T {
    let node = this.head;
    let i = index;
    while (node != null && i > 0) {
      node = node.next;
      i -= 1;
    }
    if (node == null) return null;
    return node.data;
  }

  public peek(): T {
    if (this.head == null) return null;
    return this.head.data;
  }

  public toString(): string {
    let result = '[';
    let node = this.head;
    while (node != null) {
      result += `${node.data}->`;
      node = node.next;
    }
    result += ']';
    return result;
  }
}
