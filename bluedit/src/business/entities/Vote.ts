import User from "./User";
import BaseEntity from "./BaseEntity";

/**
 * The entity class that holds the information about post. Each instance represents a post.
 */

export enum VoteDirection {
    UP=1,
    DOWN=-1
}

export default interface Vote {
    oid: string;
    user: string;
    direction:VoteDirection
}