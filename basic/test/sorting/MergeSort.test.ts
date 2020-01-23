import { expect } from 'chai';
import mergeSort from '../../src/sorting/MergeSort';
import {Comparable} from '../../src/comparable/Comparable';

class DecreaseNumber implements Comparable{
    private value:number;
    constructor(val:number){
        this.value=val;
    }

    public compare(other:DecreaseNumber):number{
        if(other==null) return -1;
        if(other.value==this.value) return 0;
        if(other.value>this.value) return 1;
        else return -1;
    }
} 

describe('MergeSort',()=>{

    it('should sort a number array',()=>{
        const a=[4,20,50,10,33,10];
        mergeSort(a);

        const b=[4,10,10,20,33,50];

        expect(a).to.deep.equal(b);
        
    });

    it('should sort a string array',()=>{
        const a=['committee','update','free','bilingual','programs'];
        mergeSort(a);

        expect(a).to.deep.equal(['bilingual','committee','free','programs','update']);
    })

    it('should sort a Comparable array',()=>{
        const four=new DecreaseNumber(4);
        const twenty=new DecreaseNumber(20);
        const fifty=new DecreaseNumber(50);
        const ten=new DecreaseNumber(10);
        const thirty=new DecreaseNumber(33);

        const a=[four,twenty,fifty,ten,thirty];

        mergeSort(a);

        expect(a).to.deep.equal([fifty,thirty,twenty,ten,four]);
    })

    it('should return null if it receives null array',()=>{
        expect(()=>mergeSort(null)).to.not.throw();
    })

    it('should be return empty array if it is empty',()=>{
        const a:number[]=[];
        mergeSort(a);
        expect(a).to.be.empty
    });
})
