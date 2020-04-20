import User from "./User";
import Post from "./Post";
import BaseEntity from "./BaseEntity";
import Voteable from "./Voteable";
import HasDate from "./HasDate";

/**
 * The entity class that holds information about comments. Each instance represents a comment.
 */
export default interface Comment extends  Voteable,HasDate{
    text:string;
    user:User;
    postid:string;
    parentid:string;
}

export interface CommentTreeNode{
    comment:Comment;
    children:CommentTreeNode[];
}