import User from "./User";
import Subbluedit from "./Subbluedit"
import BaseEntity from "./BaseEntity";

/**
 * The entity class that holds the information about post. Each instance represents a post.
 */
export default interface Post extends BaseEntity{
    name:string;
    text:string;
    post_date:Date;
    user:User;
    vote:number;
    subbluedit:Subbluedit;
}