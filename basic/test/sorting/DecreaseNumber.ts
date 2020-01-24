import {Comparable} from '../../src/comparable/Comparable';
export default class DecreaseNumber implements Comparable{
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