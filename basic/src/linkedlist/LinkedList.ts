import { isSortable, compare, Sortable } from "../comparable/Comparable";

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

  constructor() {
    this.head = null;
  }

  /**
   * Time complexity will be O(1)
   * @param data Data to be added to the list
   */
  public addFirst(data: T): void{
    const node = new LinkedListNode(data);
    node.next = this.head;
    this.head = node;
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
  }

  /**
   * Time complexity is O(n) where n is size of the list
   * @param index index where new node to be added
   * @param data  data belonging to the new node.
   */
  public addAt(index: number, data: T): void {
    if (index < 0) {
      throw new RangeError('The member cannot be added at out of the size');
    }

    let parent=null;
    let current=this.head;
    let i=index;
    while(current!=null&&i>0){
       parent=current;
       current=current.next;
       i-=1;
    }

    if(i>0) {
       throw new RangeError('The member cannot be added at out of the size');
    }  
    const newNode=new LinkedListNode(data);
    newNode.next=current;
    if(parent==null){
        this.head=newNode;
    }else{
        parent.next=newNode;
    }

  }

  /**
   * Time complexity O(1)
   */
  public clear(): void{
    this.head = null;
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
    return this.head==null;
  }

  /**
   * Time complexity O(n)
   */
  public getSize(): number {
    let size=0;
    let current=this.head;
    while(current!=null){
      current=current.next;
      size+=1;
    }
    return size;
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
    return true;
  }

  /**
   * Time complexity O(n)
   * @param index 
   */
  public removeAt(index: number): boolean {
    if (index < 0) return false;

    let parent=null;
    let current=this.head;
    let i=index;
    while(current!=null&&i>0){
       parent=current;
       current=current.next;
       i-=1;
    }

    if(current==null) return false;

    if (parent != null) parent.next = current.next;
    else this.head = current.next;

    return true;
  }

  /**
   * Time complexity O(n)
   * @param index 
   */
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
    if (this.isEmpty()) return null;
    return this.head.data;
  }

  public toArray():T[]{
    let result:T[]=[];
    let current=this.head;
    while(current!=null){
       result.push(current.data);
       current=current.next;
    }
    return result;
  }

  public sort():void{
      if(this.head===null) return;
      if(!isSortable(this.head.data)) throw new TypeError("Cannot be sortable");
      this.head=this.mergeSort(this.head);
  }

  /**
   * O(nlgn)
   * @param h 
   */
  private mergeSort(h:LinkedListNode<T>):LinkedListNode<T>{
      if(h.next!=null){
            let middle=this.middle(h);
            let right=middle.next;
            let left=h;
            middle.next=null;
            left=this.mergeSort(left);
            right=this.mergeSort(right);
            return this.merge(left,right);
      }else return h;
  }

  /**
   * O(n)
   * @param h 
   */
  private middle(h:LinkedListNode<T>){
      let slow=h;
      let fast=h;
      let middle=null;
      while(fast!=null&&fast.next!=null){
        middle=slow;
        slow=slow.next;
        fast=fast.next.next;
      }
      return middle;
  }

  /**
   * O(n)
   * @param left 
   * @param right 
   */
  private merge(left:LinkedListNode<T>, right:LinkedListNode<T>):LinkedListNode<T>{
      let newHead;
      let current;
      while(left!=null&&right!=null){
           let toBeAdded;
           if(compare(left.data as unknown as Sortable,
                    right.data as unknown as Sortable)>0){
                    toBeAdded=right;
                    right=right.next;
            }else {
                toBeAdded=left;
                left=left.next;
            } 
            if(current==null){
                current=toBeAdded;
                newHead=current;
            }else{
                current.next=toBeAdded;
                current=toBeAdded;    
            }
      }

      if(left!=null) current.next=left;
      if(right!=null) current.next=right;

      return newHead;
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
