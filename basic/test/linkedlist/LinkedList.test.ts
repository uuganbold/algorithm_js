import { expect } from 'chai';
import LinkedList from '../../src/linkedlist/LinkedList';
import DecreaseNumber from '../sorting/DecreaseNumber';

describe('LinkedList', () => {
    it('should increase size and last element should be changed after add element',()=>{
        const result = new LinkedList<Number>();
        result.add(10);
        expect(result.getSize()).to.be.equal(1);
        expect(result.get(0)).to.be.equal(10);
        result.add(20)
        expect(result.getSize()).to.be.equal(2);
        expect(result.get(1)).to.be.equal(20);
        result.add(50)
        expect(result.getSize()).to.be.equal(3);
        expect(result.get(2)).to.be.equal(50);
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
        expect(()=>result.addAt(1,40)).to.throw(RangeError);

        result.addAt(0,10);
        expect(result.getSize()).to.be.equal(1);
        expect(result.get(0)).to.be.equal(10);

        result.addAt(0,20);
        result.addAt(0,30);
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

    it('should be cleared',()=>{
        const list=new LinkedList<Number>();
        list.addFirst(10);
        list.addFirst(20);
        list.addFirst(30);

        list.clear();
        expect(list.peek()).to.be.null;
        expect(list.getSize()).to.be.equal(0);
        expect(list.isEmpty()).to.be.true;
    })

    it('should be converted to string',()=>{
        const list=new LinkedList<Number>();
        expect(list.toString()).to.be.equal('[]');
        list.add(1);
        expect(list.toString()).to.be.equal('[1->]');
        list.add(3);
        expect(list.toString()).to.be.equal('[1->3->]');
        list.add(0);
        expect(list.toString()).to.be.equal('[1->3->0->]');
    })

    it('toArray',()=>{
        const list=new LinkedList<Number>();
        expect(list.toArray()).to.be.deep.equal([]);
        list.add(1);
        expect(list.toArray()).to.be.deep.equal([1]);
        list.add(3);
        expect(list.toArray()).to.be.deep.equal([1,3]);
        list.add(0);
        expect(list.toArray()).to.be.deep.equal([1,3,0]);
    })

    it('numbers should be sorted properly',()=>{
        const list=new LinkedList<Number>();
        list.sort();
        expect(list.peek()).to.be.null;

        list.addFirst(4);
        list.addFirst(25);
        list.addFirst(1);
        list.addFirst(5);
        list.addFirst(7);
        list.addFirst(2);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([1,2,4,5,7,25]);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([1,2,4,5,7,25]);
        
        list.clear();
        list.add(34);
        list.add(34);
        list.add(34);
        list.add(25);
        list.add(14);
        list.add(10);
        list.add(3);
        list.add(2);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([2,3,10,14,25,34,34,34]);
    })

    it('comparable should be sorted properly',()=>{
        const list=new LinkedList<DecreaseNumber>();
        list.sort();
        expect(list.peek()).to.be.null;

        const four=new DecreaseNumber(4);
        const twentyfive=new DecreaseNumber(25);
        const one=new DecreaseNumber(1);
        const five=new DecreaseNumber(5);
        const seven=new DecreaseNumber(7);
        const two=new DecreaseNumber(2);
        const thirtyfour=new DecreaseNumber(34);
        const thirtyfour_2=new DecreaseNumber(34);
        

        list.addFirst(four);
        list.addFirst(twentyfive);
        list.addFirst(one);
        list.addFirst(five);
        list.addFirst(seven);
        list.addFirst(two);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([twentyfive,seven,five,four,two,one]);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([twentyfive,seven,five,four,two,one]);
        
        list.clear();
        list.add(one);
        list.add(two);
        list.add(four);
        list.add(five);
        list.add(seven);
        list.add(twentyfive);
        list.add(thirtyfour);
        list.add(thirtyfour_2);
        list.sort();
        expect(list.toArray()).to.be.deep.equal([thirtyfour_2,thirtyfour,twentyfive,seven,five,four,two,one]);
    })
});

