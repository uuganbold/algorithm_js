import Voteable from "../business/entities/Voteable";
import HasDate, { DateLike } from "../business/entities/HasDate";
import Post from "../business/entities/Post";

export const better=(v1:Voteable, v2:Voteable)=>{
    console.log(v1);
    console.log(v2);
    return v2.upVote/(v2.upVote+v2.downVote+1)-v1.upVote/(v1.upVote+v1.downVote);
}

export const topper=(v1:Voteable, v2:Voteable)=>{
    console.log(v1);
    console.log(v2);
    return (v2.upVote-v2.downVote)-(v1.upVote-v1.downVote);
}

export const newer=(v1:HasDate,v2:HasDate)=>{
    console.log(v1);
    console.log(v2);
    return (v2.post_date as DateLike)._seconds-(v1.post_date as DateLike)._seconds;
}

export const older=(v1:HasDate,v2:HasDate)=>{
    console.log(v1);
    console.log(v2);
    return (v1.post_date as DateLike)._seconds-(v2.post_date as DateLike)._seconds;
}

export const comment=(v1: Post, v2: Post) => {
    let num1 = (v1.comment == null || v1.comment == undefined) ? 0 : v1.comment;
    let num2 = (v2.comment == null || v2.comment == undefined) ? 0 : v2.comment;
    return num2 - num1;
}