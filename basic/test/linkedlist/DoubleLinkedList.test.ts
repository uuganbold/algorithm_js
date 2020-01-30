import {expect} from 'chai'
import DoubleLinkedList from '../../src/linkedlist/DoubleLinkedList'
import { listenerCount } from 'cluster';
import DecreaseNumber from '../sorting/DecreaseNumber';

describe('Double Linked List',()=>{
    let emptyList=new DoubleLinkedList<Number>();

    it('should be initialized empty',()=>{
         expect(emptyList.isEmpty()).to.be.true;
         expect(emptyList.getSize()).to.be.equal(0);
    })

    it('should be empty array if list is empty',()=>{
         expect(emptyList.toArray()).to.be.deep.equal([]);
    })

    it('should be empty square brackets if list is empty',()=>{
        expect(emptyList.toString()).to.be.equal('[]');
    })

    it('should be null when retrieve an element from empty list',()=>{
        expect(emptyList.getLast()).to.be.null
        expect(emptyList.getFirst()).to.be.null
        expect(emptyList.get(1)).to.be.null
    })

    it('should be false when try to remove element from empty list',()=>{
        expect(emptyList.removeFirst()).to.be.false;
        expect(emptyList.removeLast()).to.be.false;
        expect(emptyList.remove(10)).to.be.false;
        expect(emptyList.removeAt(10)).to.be.false;
    })

    it('should not throw error access to empty list',()=>{
        expect(emptyList.clear.bind(emptyList)).to.be.not.throw;
        expect(emptyList.contains.bind(emptyList,10)).to.be.not.throw;
        expect(emptyList.indexOf.bind(emptyList,10)).to.be.not.throw;
        expect(emptyList.sort.bind(emptyList)).to.be.not.throw;
    })

    it('should added to head and tail when an element is added to empty list',()=>{
        let emptyList=new DoubleLinkedList();
        emptyList.add(5);
        expect(emptyList.getFirst()).to.be.equal(5);
        expect(emptyList.getLast()).to.be.equal(5);

        emptyList=new DoubleLinkedList();
        emptyList.addFirst(6);
        expect(emptyList.getFirst()).to.be.equal(6);
        expect(emptyList.getLast()).to.be.equal(6);

        emptyList=new DoubleLinkedList();
        emptyList.addLast(8);
        expect(emptyList.getFirst()).to.be.equal(8);
        expect(emptyList.getLast()).to.be.equal(8);

        emptyList=new DoubleLinkedList();
        emptyList.addAt(0,10);
        expect(emptyList.getFirst()).to.be.equal(10);
        expect(emptyList.getLast()).to.be.equal(10);
    })

    it('should not allow to add element to empty list except index 0',()=>{
        let emptyList=new DoubleLinkedList<Number>();
        expect(emptyList.addAt.bind(emptyList,1,10)).to.throw(RangeError);
    })

    it('should not allow to add element to negative index',()=>{
        let list=new DoubleLinkedList<Number>();
        expect(list.addAt.bind(list,-1,20)).to.throw(RangeError);
    })

    it('should be added proper index',()=>{
         let list=new DoubleLinkedList<Number>();
         
         list.add(1);
         expect(list.toArray()).to.be.deep.equal([1]);
         expect(list.getSize()).to.be.equal(1);
         expect(list.isEmpty()).to.be.false;
         expect(list.get(0)).to.be.equal(1);
         expect(list.getFirst()).to.be.equal(1);
         expect(list.getLast()).to.be.equal(1);
         

         list.addFirst(5);
         expect(list.toArray()).to.be.deep.equal([5,1]);
         expect(list.getSize()).to.be.equal(2);
         expect(list.indexOf(1)).to.be.equal(1);
         expect(list.contains(1)).to.be.true;
         expect(list.get(1)).to.be.equal(1);
         expect(list.getFirst()).to.be.equal(5);
         expect(list.getLast()).to.be.equal(1);

         list.addLast(3);
         expect(list.toArray()).to.be.deep.equal([5,1,3]);
         expect(list.getSize()).to.be.equal(3);
         expect(list.get(1)).to.be.equal(1);
         expect(list.getFirst()).to.be.equal(5);
         expect(list.getLast()).to.be.equal(3);

         list.addAt(0,4);
         expect(list.getSize()).to.be.equal(4);
         expect(list.getFirst()).to.be.equal(4);

         list.addAt(4,10);
         expect(list.getSize()).to.be.equal(5);
         expect(list.get(4)).to.be.equal(10);

         list.addAt(3,20);
         expect(list.getSize()).to.be.equal(6);
         expect(list.get(3)).to.be.equal(20);
    });

    it('should not be added if index is out of size',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(5);
        list.add(3);
        expect(list.addAt.bind(list,3,10)).to.throw(RangeError);
        expect(list.addAt.bind(list,5,10)).to.throw(RangeError);
    })

    it('should be empty after cleared',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(4);
        list.add(5);
        expect(list.isEmpty()).to.be.false;
        list.clear();
        expect(list.isEmpty()).to.be.true;
    })

    it('should work properly when retrieve element',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(3);
        expect(list.get(0)).to.be.equal(3);
        expect(list.getFirst()).to.be.equal(3);
        expect(list.getLast()).to.be.equal(3);

        list.add(5);
        expect(list.get(0)).to.be.equal(3);
        expect(list.get(1)).to.be.equal(5);
        expect(list.getFirst()).to.be.equal(3);
        expect(list.getLast()).to.be.equal(5);

        list.add(7);
        expect(list.get(0)).to.be.equal(3);
        expect(list.get(1)).to.be.equal(5);
        expect(list.get(2)).to.be.equal(7);
        expect(list.getFirst()).to.be.equal(3);
        expect(list.getLast()).to.be.equal(7);

        list.addFirst(9);
        expect(list.get(0)).to.be.equal(9);
        expect(list.get(1)).to.be.equal(3);
        expect(list.get(2)).to.be.equal(5);
        expect(list.get(3)).to.be.equal(7);
        expect(list.getFirst()).to.be.equal(9);
        expect(list.getLast()).to.be.equal(7);
    })

    it('should be null if index is out of size',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(4);
        expect(list.get(-1)).to.be.null;
        expect(list.get(-10)).to.be.null;
        expect(list.get(1)).to.be.null;
        expect(list.get(10)).to.be.null;

        list.addFirst(5);
        expect(list.get(-2)).to.be.null;
        expect(list.get(-20)).to.be.null;
        expect(list.get(2)).to.be.null;
        expect(list.get(20)).to.be.null;
    })

    it('should not contain an element not added',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(4);
        list.addFirst(6);
        list.addLast(8);
        expect(list.contains(10)).to.be.false;
        expect(list.contains(null)).to.be.false;
    })

    it('should find proper index of the element',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(5);
        list.addAt(0,6);
        list.addFirst(7);
        list.addLast(10);
        //7-6-5-10
        expect(list.indexOf(5)).to.be.equal(2);
        expect(list.indexOf(7)).to.be.equal(0);
        expect(list.indexOf(10)).to.be.equal(3);
    })

    it('index should be -1 if an element is not found',()=>{
        let list=new DoubleLinkedList<Number>();
        list.addFirst(0);
        list.addLast(9);
        list.add(6);

        //0-9-6
        expect(list.indexOf(5)).to.be.equal(-1);
        expect(list.indexOf(null)).to.be.equal(-1);
    })

    it('should be converted to string',()=>{
        let list=new DoubleLinkedList<Number>();
        list.addFirst(0);
        list.addLast(9);
        list.add(6);

        //0-9-6
        expect(list.toString()).to.be.equal('[0->9->6]');

        list.add(null);
        expect(list.toString()).to.be.equal('[0->9->6->]');
        list.add(5);
        expect(list.toString()).to.be.equal('[0->9->6->->5]');
    })

    it('should be empty when last element removed',()=>{
        let list=new DoubleLinkedList<Number>();
        list.addLast(5);
        list.remove(5);
        expect(list.isEmpty()).to.be.true;

        list.addLast(7);
        expect(list.removeAt(0)).to.be.true;
        expect(list.isEmpty()).to.be.true;

        list.add(9);
        expect(list.removeFirst()).to.be.true;
        expect(list.isEmpty()).to.be.true;

        list.add(8);
        expect(list.removeLast()).to.be.true;
        expect(list.isEmpty()).to.be.true;
    });

    it('should remove proper element',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(5);
        list.add(6);
        list.add(7);
        list.add(10);
        list.add(15);

        //5-6-7-10-15
        expect(list.remove(5)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,7,10,15]);
        expect(list.getSize()).to.be.equal(4);
        expect(list.remove(15)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,7,10]);
        expect(list.getSize()).to.be.equal(3);
        expect(list.remove(7)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,10]);
        expect(list.getSize()).to.be.equal(2);

        //6-7
        list.add(2);
        list.addFirst(8);
        list.add(1);
        list.add(12);
        list.add(15);
        //8-6-7-2-1-12-15
        expect(list.removeAt(0)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,10,2,1,12,15]);
        expect(list.getSize()).to.be.equal(6);
        expect(list.removeAt(5)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,10,2,1,12]);
        expect(list.getSize()).to.be.equal(5);
        expect(list.removeAt(3)).to.be.true;
        expect(list.toArray()).to.be.deep.equal([6,10,2,12]);
        expect(list.getSize()).to.be.equal(4);

        expect(list.removeFirst()).to.be.true;
        expect(list.toArray()).to.be.deep.equal([10,2,12]);
        expect(list.getSize()).to.be.equal(3);

        expect(list.removeLast()).to.be.true;
        expect(list.toArray()).to.be.deep.equal([10,2]);
        expect(list.getSize()).to.be.equal(2);
        
    })

    it('should not removed if element is not found',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(5);
        list.addAt(0,40);
        list.add(32);
        list.add(60);

        expect(list.getSize()).to.be.equal(4);
        expect(list.remove(10)).to.be.false;
        expect(list.getSize()).to.be.equal(4);

        expect(list.removeAt(10)).to.be.false;
        expect(list.getSize()).to.be.equal(4);
        expect(list.removeAt(4)).to.be.false;
        expect(list.getSize()).to.be.equal(4);
        expect(list.removeAt(-1)).to.be.false;
        expect(list.getSize()).to.be.equal(4);
        expect(list.removeAt(-10)).to.be.false;
        expect(list.getSize()).to.be.equal(4);
    })

    it('should sort one element',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(10);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([10]);
    })

    it('should sort multiple elements',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(10);
        list.add(4);
        list.add(8);
        list.add(-10);
        list.add(25);
        list.add(0);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([-10,0,4,8,10,25]);
    })

    it('should sort already sorted list',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(-11);
        list.add(-3);
        list.add(2);
        list.add(4);
        list.add(6);
        list.add(8);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([-11,-3,2,4,6,8]);
    })

    it('should sort list which already sorted descendently',()=>{
        let list=new DoubleLinkedList<Number>();
        list.add(-2);
        list.add(-3);
        list.add(-8);
        list.add(-9);
        list.add(-12);
        list.add(-30);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([-30,-12,-9,-8,-3,-2]);
    })

    it('should handle sortable',()=>{
        let list=new DoubleLinkedList<DecreaseNumber>();

        const five=new DecreaseNumber(5);
        const eight=new DecreaseNumber(8);
        const three=new DecreaseNumber(3);
        const ten=new DecreaseNumber(10);
        list.add(five);
        list.add(eight);
        list.add(three);
        list.add(ten);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([ten,eight,five,three]);
    })

})