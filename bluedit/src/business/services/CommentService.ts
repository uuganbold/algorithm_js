import dao, { CommentDao } from '../../dao/CommentDao';
import Post from '../../business/entities/Post';
import Comment from "../../business/entities/Comment"
import userService, { UserService } from './UserService';
import ClientError from '../../errors/ClientError';
import postService, { PostService } from './PostService';

export class CommentService {
    
    async createComment(comment: Comment, userId: string): Promise<Comment> {
        const user=await this.userService.getUser(userId);
        if(user==null) throw new ClientError("User login id is invalid");

        const post=await this.postService.getPost(comment.postid);
        if(post==null){
            throw new ClientError("Post not found",404);
        } 
        
        if(comment.parentid!=null){
            const parent:Comment=await this.dao.findOne(comment.parentid);
            if(parent==null||parent.postid!=post.uid) throw new ClientError("Parent comment not found",404);
        }

        comment.post_date=new Date()
        comment.user=user;
        comment.vote=0;
        return await this.dao.save(comment)
    }

    async getComment(uid:string, postid:string):Promise<Comment>{
        const comment=await this.dao.findOne(uid);
        if(comment==null) return null;
        if(comment.postid!=postid) return null;
        comment.children=await this.listCommentByParent(uid);
        return comment;
    }
    
    async listComments(post:Post): Promise<Comment[]>{
        const comments:Comment[]= await this.dao.findByPostId(post.uid);
        const map=new Map();
        const result:Comment[]=[];
        for(let c of comments){
            map.set(c.uid,c);
        }
        for(let c of comments){
            if(c.parentid==null) result.push(c);
            else{
                const parent:Comment=map.get(c.parentid);
                if(parent==null) {result.push(c); continue;}
                let siblings:Comment[]=parent.children;
                if(siblings==null) {siblings=[]; parent.children=siblings }
                siblings.push(c);
            }
        }
        return result;
    }

    async listCommentByParent(parentid:string):Promise<Comment[]>{
        const comments:Comment[]=await this.dao.findByParent(parentid);
        for(let c of comments){
            c.children=await this.listCommentByParent(c.uid);
        }
        return comments;
    }

    private dao: CommentDao;
    private userService: UserService;
    private postService: PostService;

    constructor(dao:CommentDao, userService:UserService, postService:PostService){
        this.dao=dao;
        this.userService=userService;
        this.postService=postService;
    }
}

const commentService=new CommentService(dao,userService,postService);
export default commentService;