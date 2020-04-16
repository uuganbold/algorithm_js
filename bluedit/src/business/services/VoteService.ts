import dao, { VoteDao } from '../../dao/VoteDao';
import postService, { PostService } from './PostService';
import userService, { UserService } from './UserService';
import Vote from "../entities/Vote"
import User from "../entities/User"
import Post from "../entities/Post"
import ClientError from '../../errors/ClientError';

export class VoteService {

    async updateVoteWithUser(vote: Vote, userId: string): Promise<Vote> {
        
        const user = await this.userService.getUser(userId);
        if (user == null) throw new ClientError("User login id is invalid");

        const post = await this.postService.getPost(vote.post.uid);
        if (post == null) {
            throw new ClientError("Post not found", 404);
        } 
        const persisted = await dao.findOne(vote.uid);
        if (persisted == null) throw new ClientError("Vote not found", 404);

        vote.post = post;
        vote.user = user;
        post.vote += 1;
        return await this.dao.save(vote);
    }

    async updateVoteWithPost(vote: Vote, postId: string): Promise<Vote> {

        const user = await this.userService.getUser(vote.user.uid);
        if (user == null) throw new ClientError("User login id is invalid");

        const post = await this.postService.getPost(postId);
        if (post == null) {
            throw new ClientError("Post not found", 404);
        }
        const persisted = await dao.findOne(vote.uid);
        if (persisted == null) throw new ClientError("Vote not found", 404);

        vote.post = post;
        vote.user = user;
        return await this.dao.save(vote);
    }

    async listVotes(): Promise<Vote[]> {
        return await this.dao.findAll();
    }

    private dao: VoteDao;
    private userService: UserService;
    private postService: PostService;

    constructor(dao: VoteDao, userService: UserService, postService: PostService) {
        this.dao = dao;
        this.userService = userService;
        this.postService = postService;
    }
}

const voteService = new VoteService(dao, userService, postService);
export default voteService;