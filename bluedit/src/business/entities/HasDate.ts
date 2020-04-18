export type DateLike ={
    _nanoseconds:number,
    _seconds:number
}
export default interface HasDate{
    post_date:Date|DateLike;
}