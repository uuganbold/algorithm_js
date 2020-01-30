import { isSortable, Sortable, compare } from "../comparable/Comparable";

class DoubleLinkedListNode<T> {
  public data: T;

  public next: DoubleLinkedListNode<T>;

  public prev: DoubleLinkedListNode<T>;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }

  public toArray():T[]{
      let result=[];
      let current:DoubleLinkedListNode<T>=this;
      while(current!=null){
          result.push(current.data);
          current=current.next;
      }
      return result;
  }
}

export default class DoubleLinkedList<T> {
    private dummyHead:DoubleLinkedListNode<T>;
    private dummyTail:DoubleLinkedListNode<T>;

  constructor() {
      this.dummyHead=new DoubleLinkedListNode<T>(null);
      this.dummyTail=new DoubleLinkedListNode<T>(null);
      this.link(this.dummyHead,this.dummyTail);
  }

  private link(parent:DoubleLinkedListNode<T>, child:DoubleLinkedListNode<T>){
      parent.next=child;
      child.prev=parent;
  }

  public add(data: T): void{
     this.addLast(data);
  }

  //O(1)
  public addFirst(data: T): void{
     let node=new DoubleLinkedListNode(data);
     this.link(node,this.dummyHead.next);
     this.link(this.dummyHead,node);
  }

  //O(1)
  public addLast(data: T): void{
     let node=new DoubleLinkedListNode(data);
     this.link(this.dummyTail.prev,node);
     this.link(node,this.dummyTail);
  }

  //O(n)
  public addAt(index: number, data: T): void{
        if(index<0) throw new RangeError('index should be greater or equal to 0');
        let current=this.dummyHead;
        let i=index;
        while(current.next!=this.dummyTail&&i>0){
            current=current.next;
            i-=1;
        }
        if(i>0) throw new RangeError('index should not be greater than the size of the list');
        const node=new DoubleLinkedListNode(data);
        this.link(node,current.next);
        this.link(current,node);
  }

  //O(1)
  public clear(): void{
      this.link(this.dummyHead,this.dummyTail);
  }

  //O(1)
  public isEmpty(): boolean {
    return this.dummyHead.next==this.dummyTail;
  }

  //O(n)
  public contains(data: T): boolean {
      let i=this.indexOf(data);
      if(i>=0) return true;
      else return false;
  }

  //O(n)
  public getSize(): number {
    let current=this.dummyHead;
    let size=0;
    while(current.next!=this.dummyTail){
        current=current.next;
        size+=1;
    }
    return size;
  }

  //O(n)
  public remove(data: T): boolean {
     let current=this.dummyHead;
     while(current.next!=this.dummyTail&&current.next.data!=data){
         current=current.next;
     }
     if(current.next==this.dummyTail) return false;
     this.link(current,current.next.next);
     return true;
  }

  //O(i)
  public removeAt(index: number): boolean {
      if(index<0) return false;
      let current=this.dummyHead;
      let i=index;
      while(current.next!=this.dummyTail&&i>0){
          current=current.next;
          i-=1;
      }
      if(current.next==this.dummyTail) return false;
      else {
          this.link(current,current.next.next);
          return true;
    }

  }

  //O(1)
  public removeFirst(): boolean {
    if(this.isEmpty()) return false;
    this.link(this.dummyHead,this.dummyHead.next.next);
    return true;
  }

  //O(1)
  public removeLast(): boolean {
     if(this.isEmpty()) return false;
     this.link(this.dummyTail.prev.prev,this.dummyTail);
     return true;
  }

  //O(n)
  public get(index: number): T {
      if(index<0) return null;
     let current=this.dummyHead;
     let i=index;
     while(current.next!=this.dummyTail&&i>0){
         current=current.next;
         i-=1;
     }
     if(current.next==this.dummyTail) return null;
     else return current.next.data;
  }

  //O(1)
  public getFirst(): T {
     if(this.isEmpty()) return null;
     return this.dummyHead.next.data;
  }

  //O(1)
  public getLast(): T {
     if(this.isEmpty()) return null;
     return this.dummyTail.prev.data;
  }

  //O(n)
  public indexOf(object: T): number {
      let index=0;
      let current=this.dummyHead;
      while(current.next!=this.dummyTail&&current.next.data!=object){
          current=current.next;
          index+=1;
      }
      if(current.next==this.dummyTail) return -1;
      else return index;
  }

  public toArray(): T[] {
      let result:T[]=[];
      let current=this.dummyHead;
      while(current.next!=this.dummyTail){
            current=current.next;
            result.push(current.data);
      }
    return result;
  }

  public toString(): string {
     let resultArray=this.toArray();
     let result=resultArray.join("->");
     return '['+result+']';    
  }

  public sort(): void{
        if(this.isEmpty()) return;
        if(isSortable(this.getFirst)) throw new TypeError('Cannot be sortable');
        [this.dummyHead,this.dummyTail]=this.mergeSort(this.dummyHead, this.dummyTail);
  }

  private mergeSort(head:DoubleLinkedListNode<T>, tail:DoubleLinkedListNode<T>):[DoubleLinkedListNode<T>,DoubleLinkedListNode<T>]{
        if(head.next.next!=tail){
             let middleElem=this.middle(head,tail);
             let rightDummpyHead=new DoubleLinkedListNode(null);
             this.link(rightDummpyHead,middleElem.next);
                          
             let leftDummyTail=new DoubleLinkedListNode(null);
             this.link(middleElem,leftDummyTail);

             let [leftHead,leftTail]=this.mergeSort(head,leftDummyTail);
             let [rightHead,rightTail]=this.mergeSort(rightDummpyHead,tail);
            
             return this.merge(leftHead,leftTail,rightHead,rightTail);
        }else{
            return [head,tail];
        }
  }

  private middle(head:DoubleLinkedListNode<T>, tail:DoubleLinkedListNode<T>):DoubleLinkedListNode<T>{
       let left=head;
       let right=tail;
       while(left!=right&&left.next!=right){
          left=left.next;
          right=right.prev;
       }
       return left;
  }

  private merge(leftHead:DoubleLinkedListNode<T>,
            leftTail:DoubleLinkedListNode<T>,
            rightHead:DoubleLinkedListNode<T>,
            rightTail:DoubleLinkedListNode<T>):[DoubleLinkedListNode<T>,DoubleLinkedListNode<T>]{

            let head=new DoubleLinkedListNode(null);
            let tail=null;
            let current=head;

            while(leftHead.next!=leftTail&&rightHead.next!=rightTail){
                if(compare(leftHead.next.data as unknown as Sortable,
                    rightHead.next.data as unknown as Sortable)>0){
                        this.link(current,rightHead.next);
                        this.link(rightHead,current.next.next);
                    }else{
                        this.link(current,leftHead.next);
                        this.link(leftHead,current.next.next);
                    }
                current=current.next;
            }

            if(leftHead.next!=leftTail){
                  this.link(current,leftHead.next);
                  tail=leftTail;
            }

            if(rightHead.next!=rightTail){
                this.link(current,rightHead.next);
                tail=rightTail;
            }

            return [head,tail];
  }
}
