export function swap(a:any[],i:number, j:number){
    const temp=a[i];
    a[i]=a[j];
    a[j]=temp;
}