import Post from '../post/Post'
export default interface User{
    bio?:string;
    email:string;
    follows?:[];
    password:string;
    posts?:Post[];
    profile_image?:"";
    username:string;
}