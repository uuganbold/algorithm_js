import { expect } from 'chai';
import LinkedList from '../../src/linkedlist/LinkedList';

describe('LinkedList', () => {
    it('should increase size and last element should be changed after add element',()=>{
        const result = new LinkedList<Number>();
        result.add(10);
        expect(result.getSize()).to.be.equal(1);
        expect(result.get(0)).to.be.equal(10);
        result.add(20)
        expect(result.getSize()).to.be.equal(2);
        expect(result.get(1)).to.be.equal(20);
    });

    it('should size increase and change head after addFirst element', () => {
        const result = new LinkedList<Number>();
        result.addFirst(10);
        expect(result.getSize()).to.be.equal(1);
        expect(result.peek()).to.be.equal(10);
        result.addFirst(20)
        expect(result.getSize()).to.be.equal(2);
        expect(result.peek()).to.be.equal(20);
    });

    it('should size increased and change element after addAt, cannot be overflowed',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addFirst(20);
        result.addFirst(30);
        result.addAt(0,40);
        expect(result.getSize()).to.be.equal(4);
        expect(result.get(0)).to.be.equal(40);
        expect(result.get(1)).to.be.equal(30);
        result.addAt(2,65);
        expect(result.getSize()).to.be.equal(5);
        expect(result.get(2)).to.be.equal(65);
        expect(result.get(1)).to.be.equal(30);
        expect(result.get(3)).to.be.equal(20);
        result.addAt(5,77);
        expect(result.getSize()).to.be.equal(6);
        expect(result.get(5)).to.be.equal(77);
        expect(result.get(4)).to.be.equal(10);
        expect(result.get(6)).to.be.null;

        expect(()=>result.addAt(-1,40)).to.throw(RangeError);
        expect(()=>result.addAt(7,40)).to.throw(RangeError);
    })

    it('should contain if it is added',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addAt(0,20);
        result.addAt(2,40);

        expect(result.contains(10)).to.be.true;
        expect(result.contains(40)).to.be.true;
        expect(result.contains(20)).to.be.true;

    });

    it('should note contain if it is not added',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addAt(0,20);
        result.addAt(2,40);

        expect(result.contains(60)).to.be.false;

    });

    it('should be removed. size and links should be consistent',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addFirst(30);
        result.addFirst(50);
        result.addFirst(70)
        expect(result.remove(30)).to.be.true;
        expect(result.getSize()).to.be.equal(3);
        expect(result.get(2)).to.be.equal(10);

        expect(result.remove(70)).to.be.true;
        expect(result.getSize()).to.be.equal(2);
        expect(result.peek()).to.be.equal(50);

        expect(result.remove(10)).to.be.true;
        expect(result.getSize()).to.be.equal(1);
        expect(result.peek()).to.be.equal(50);
    })

    it('should not be removed if it is not contains the element',()=>{
        const result=new LinkedList<Number>();
        expect(result.remove(30)).to.be.false;
        expect(result.getSize()).to.be.equal(0);
        result.addFirst(10);
        result.addFirst(30);
        result.addFirst(50);
        result.addFirst(70);
        expect(result.remove(40)).to.be.false;
        expect(result.getSize()).to.be.equal(4);
    })
    
    it('shoule be removed by index if is belongs to the list',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addFirst(30);
        result.addFirst(50);
        result.addFirst(70);
        result.addFirst(90);

        expect(result.removeAt(2)).to.be.true;
        expect(result.getSize()).to.be.equal(4);
        expect(result.get(2)).to.be.equal(30);
        expect(result.get(1)).to.be.equal(70);

        expect(result.removeAt(3)).to.be.true;
        expect(result.getSize()).to.be.equal(3);
        expect(result.get(3)).to.be.null;

        expect(result.removeAt(0)).to.be.true;
        expect(result.getSize()).to.be.equal(2);
        expect(result.peek()).to.be.equal(70);
    });

    it('should not be deleted if index is out of the size',()=>{
        const result=new LinkedList<Number>();
        result.addFirst(10);
        result.addFirst(30);
        result.addFirst(50);
        result.addFirst(70);
        result.addFirst(90);

        expect(result.removeAt(-1)).to.be.false;
        expect(result.removeAt(5)).to.be.false;
        expect(result.removeAt(6)).to.be.false;
    })
});

