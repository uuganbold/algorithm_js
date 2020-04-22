import dao, { PostDao } from '../../dao/PostDao';
import subblueditService, { SubblueditService } from './SubblueditService';
import userService, { UserService } from './UserService';
import Post from "../entities/Post"
import ClientError from '../../errors/ClientError';


export class PostService {


    async updatePost(post: Post, userId: string): Promise<Post> {
        const user=await this.userService.getUser(userId);
        if(user==null) throw new ClientError("User login id is invalid");
        const persisted=await dao.findOne(post.uid);
        if(persisted==null) throw new ClientError("Post not found",404);
        if(user.uid!=persisted.user.uid){
            throw new ClientError("Only creator can update a post",403);
        }
        persisted.name=post.name;
        persisted.text=post.text;
        return await this.dao.save(post);
    }
    
    async createPost(post: Post, subditUID: string, userId: string): Promise<Post>{
        const user=await this.userService.getUser(userId);
        if(user==null) throw new ClientError("User login id is invalid");
        const subdit=await this.subditService.getSubdit(subditUID);
        if(subdit==null) throw new ClientError("Invalid subbluedit");
        post.subbluedit=subdit;
        post.user=user;
        post.post_date=new Date();
        post.comment=0;
        post.upVote=0;
        post.downVote=0;
        return await this.dao.save(post);
    }

    async getPost(uid:string):Promise<Post>{
        return this.fixUpDownVotesOfPost(await this.dao.findOne(uid));
    }

    async listPosts():Promise<Post[]>{
        return this.fixUpDownVotesOfPosts(await this.dao.findAll());
    }

    async listPostsByUser(userId:string):Promise<Post[]>{
        return this.fixUpDownVotesOfPosts(await this.dao.findByUser(userId));
    }

    async listPostsBySubdit(subdit:string):Promise<Post[]>{
        return this.fixUpDownVotesOfPosts(await this.dao.findBySubbluedit(subdit));
    }

    async searchPosts(query: string): Promise<Post[]> {
        return this.fixUpDownVotesOfPosts(await this.dao.findByName(query));
    }

    private fixUpDownVotesOfPost(p:Post):Post{
        if(!p.upVote) p.upVote=0;
        if(!p.downVote) p.downVote=0;
        return p;
    }
    private fixUpDownVotesOfPosts(posts:Post[]):Post[]{
        return posts.map(p=>{
            return this.fixUpDownVotesOfPost(p);
        })
    }

    private dao: PostDao;
    private userService:UserService;
    private subditService:SubblueditService;

    constructor(dao:PostDao, userService:UserService, subblueditService:SubblueditService){
        this.dao=dao;
        this.userService=userService;
        this.subditService=subblueditService;
    }
}

const postService=new PostService(dao,userService,subblueditService);
export default postService;