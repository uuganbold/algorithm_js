import User from "../user/User";

export default interface Post{
    id:string;
    name:string;
    text:string;
    post_date:Date;
    user:User
}