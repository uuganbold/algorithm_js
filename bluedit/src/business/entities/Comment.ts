import User from "./User";
import Post from "./Post";

/**
 * The entity class that holds information about comments. Each instance represents a comment.
 */
export default interface Comment{
    id:string;
    text:string;
    post_date:Date;
    user:User;
    post:Post;
}