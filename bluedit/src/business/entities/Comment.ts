import User from "./User";
import Post from "./Post";
import BaseEntity from "./BaseEntity";

/**
 * The entity class that holds information about comments. Each instance represents a comment.
 */
export default interface Comment extends BaseEntity{
    text:string;
    post_date:Date;
    user:User;
    postid:string;
    parentid:string;
    vote:number;
    children:Comment[];
}