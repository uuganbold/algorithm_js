import Post from './Post'
import BaseEntity from './BaseEntity';

/**
 * The entity class, each of which represents an User
 */
export default interface User extends BaseEntity{
    username:string;
    bio?:string;
    photoURL?:string
    follows?:[];
    posts?:Post[];

}