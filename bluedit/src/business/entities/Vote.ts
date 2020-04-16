import User from "./User";
import Post from "./Post"
import BaseEntity from "./BaseEntity";

/**
 * The entity class that holds the information about post. Each instance represents a post.
 */
export default interface Vote extends BaseEntity {
    post: Post;
    user: User;
}