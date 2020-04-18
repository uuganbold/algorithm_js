import dao, { CommentDao } from '../../dao/CommentDao';
import Post from '../../business/entities/Post';
import Comment, { CommentTreeNode } from "../../business/entities/Comment"
import ClientError from '../../errors/ClientError';
import  userDao , {UserDao} from '../../dao/UserDao';
import postDao, { PostDao } from '../../dao/PostDao';

export class CommentService {
    
    async createComment(comment: Comment, userId: string): Promise<Comment> {
        const user=await this.userDao.findOne(userId);
        if(user==null) throw new ClientError("User login id is invalid");

        const post=await this.postDao.findOne(comment.postid);
        if(post==null){
            throw new ClientError("Post not found",404);
        } 
        
        if(comment.parentid!=null){
            const parent:Comment=await this.dao.findOne(comment.parentid);
            if(parent==null||parent.postid!=post.uid) throw new ClientError("Parent comment not found",404);
        }

        comment.post_date=new Date()
        comment.user=user;
        comment.upVote=0;
        comment.downVote=0;
        post.comment=post.comment+1;
        this.postDao.save(post);
        return await this.dao.save(comment)
    }

    async getComment(uid:string, postid:string):Promise<CommentTreeNode>{
        const comment=await this.dao.findOne(uid);
        if(comment==null) return null;
        if(comment.postid!=postid) return null;
        return {comment:this.fixUpDownVotesOfComment(comment),children:await this.listCommentByParent(uid)};
    }
    
    async listComments(post:Post): Promise<Comment[]>{
        const comments:Comment[]= this.fixUpDownVotesOfComments(await this.dao.findByPostId(post.uid));
        /*const map=new Map();
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
        return result;*/
        return comments;
    }

    async listCommentByParent(parentid:string):Promise<CommentTreeNode[]>{
        const comments:Comment[]=await this.dao.findByParent(parentid);
        const result:CommentTreeNode[]=[];
        for(let c of comments){
            result.push({comment:this.fixUpDownVotesOfComment(c),children:await this.listCommentByParent(c.uid)})
        }
        return result;
    }

    private fixUpDownVotesOfComment(p:Comment):Comment{
        if(!p.upVote) p.upVote=0;
        if(!p.downVote) p.downVote=0;
        return p;
    }
    private fixUpDownVotesOfComments(posts:Comment[]):Comment[]{
        return posts.map(p=>{
            return this.fixUpDownVotesOfComment(p);
        })
    }

    private dao: CommentDao;
    private userDao: UserDao;
    private postDao: PostDao;

    constructor(dao:CommentDao, userDao:UserDao, postDao:PostDao){
        this.dao=dao;
        this.userDao=userDao;
        this.postDao=postDao;
    }
}

const commentService=new CommentService(dao,userDao,postDao);
export default commentService;