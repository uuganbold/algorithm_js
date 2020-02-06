import User from "./User";
import Subbluedit from "./Subbluedit"

/**
 * The entity class that holds the information about post. Each instance represents a post.
 */
export default interface Post{
    id:string;
    name:string;
    text:string;
    post_date:Date;
    user:User;
    subbluedit:Subbluedit;
}