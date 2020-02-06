import Post from './Post'

/**
 * The entity class, each of which represents an User
 */
export default interface User{
    bio?:string;
    email:string;
    follows?:[];
    password:string;
    posts?:Post[];
    profile_image?:string;
    username:string;
}