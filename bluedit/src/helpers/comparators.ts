import Voteable from "../business/entities/Voteable";
import HasDate, { DateLike } from "../business/entities/HasDate";

export const better=(v1:Voteable, v2:Voteable)=>{
    return v2.upVote/(v2.upVote+v2.downVote+1)-v1.upVote/(v1.upVote+v1.downVote);
}

export const topper=(v1:Voteable, v2:Voteable)=>{
    return (v2.upVote-v2.downVote)-(v1.upVote-v1.downVote);
}

export const newer=(v1:HasDate,v2:HasDate)=>{
    return (v2.post_date as DateLike)._seconds-(v1.post_date as DateLike)._seconds;
}

export const older=(v1:HasDate,v2:HasDate)=>{
    return (v1.post_date as DateLike)._seconds-(v2.post_date as DateLike)._seconds;
}