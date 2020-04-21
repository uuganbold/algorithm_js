import User from "./User";
import Subbluedit from "./Subbluedit"
import BaseEntity from "./BaseEntity";
import Voteable from './Voteable'
import HasDate from "./HasDate";

/**
 * The entity class that holds the information about post. Each instance represents a post.
 */
export default interface Post extends Voteable,HasDate{
    name:string;
    text:string;
    user:User;
    comment:number;
    subbluedit:Subbluedit;
}