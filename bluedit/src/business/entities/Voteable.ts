import BaseEntity from "./BaseEntity";

export default interface Voteable extends BaseEntity{
    upVote:number;
    downVote:number;
}