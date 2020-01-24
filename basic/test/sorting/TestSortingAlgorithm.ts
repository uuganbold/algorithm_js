import {expect} from 'chai';
import { Sortable } from '../../src/comparable/Comparable';
import DecreaseNumber from './DecreaseNumber';

export default function testSortingAlgorithm(sortFunction:(b:Sortable[])=>void):void{
    it('should sort already sorted array',()=>{
        const a=[1,2,3,4,5,6];
        sortFunction(a);

        expect(a).to.deep.equal([1,2,3,4,5,6]);
    });
    
    it('should sort descendent sorted array',()=>{
        const a=[6,5,4,3,2,1];
        sortFunction(a);

        expect(a).to.deep.equal([1,2,3,4,5,6]);
    });

    it('should sort a number array',()=>{
        const a=[4,20,50,10,33,10];
        sortFunction(a);

        const b=[4,10,10,20,33,50];

        expect(a).to.deep.equal(b);
        
    });

    it('should sort a string array',()=>{
        const a=['committee','update','free','bilingual','programs'];
        sortFunction(a);

        expect(a).to.deep.equal(['bilingual','committee','free','programs','update']);
    })

    it('should sort a Comparable array',()=>{
        const four=new DecreaseNumber(4);
        const twenty=new DecreaseNumber(20);
        const fifty=new DecreaseNumber(50);
        const ten=new DecreaseNumber(10);
        const thirty=new DecreaseNumber(33);

        const a=[twenty,four,fifty,ten,thirty];

        sortFunction(a);

        expect(a).to.deep.equal([fifty,thirty,twenty,ten,four]);
    })

    it('should return null if it receives null array',()=>{
        expect(()=>sortFunction(null)).to.not.throw();
    })

    it('should be return empty array if it is empty',()=>{
        const a:number[]=[];
        sortFunction(a);
        expect(a).to.be.empty
    });
}