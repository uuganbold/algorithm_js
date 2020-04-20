import  VoteDao  from '../../dao/VoteDao';
import userDao, { UserDao } from '../../dao/UserDao';
import VoteableDao from '../../dao/VoteableDao';
import postDao from '../../dao/PostDao';
import commentDao from '../../dao/CommentDao';
import firebase from '../../firebase/admin'
import Vote, { VoteDirection } from '../entities/Vote';
import ClientError from '../../errors/ClientError';
import Voteable from '../entities/Voteable';

export class VoteService {
    private dao: VoteDao;
    private userDao: UserDao;
    private voteableDao: VoteableDao;

    constructor(dao: VoteDao, userDao: UserDao, voteableDao: VoteableDao) {
        this.dao = dao;
        this.userDao = userDao;
        this.voteableDao = voteableDao;
    }

    public async getVotes(oids:string[],userId:string):Promise<Vote[]>{
        return this.dao.findAllByObjectIds(oids,userId);
    }

    public async vote(vote:Vote,userId:string):Promise<Voteable>{
        const user=await this.userDao.findOne(userId);
        if(user==null) throw new ClientError("User login id is invalid");
        vote.user=userId;

        const voteable=await this.voteableDao.findOne(vote.oid);
        if(voteable==null) throw new ClientError("There is not object to vote");
        if(!voteable.upVote) voteable.upVote=0;
        if(!voteable.downVote) voteable.downVote=0;

        const oldVote=await this.dao.get(vote.oid,userId);

        if(oldVote==null){
            if(vote.direction==VoteDirection.UP) voteable.upVote=(voteable.upVote)+1;
            else voteable.downVote=(voteable.downVote)+1;
            this.voteableDao.save(voteable);
            this.dao.save(vote);
        }else if(oldVote.direction!==vote.direction){
            if(vote.direction==VoteDirection.UP){
                voteable.upVote=(voteable.upVote)+1;
                voteable.downVote-=1;
            }else{
                voteable.upVote-=1;
                voteable.downVote=(voteable.downVote)+1;
            }
            this.voteableDao.save(voteable);
            this.dao.delete(oldVote);
            this.dao.save(vote);
        }else{
            if(vote.direction==VoteDirection.UP) voteable.upVote-=1;
            else voteable.downVote-=1;
            this.voteableDao.save(voteable);
            this.dao.delete(oldVote);
        }
        
        return voteable;
    }
}
export const postVoteService = new VoteService(new VoteDao("post_vote",firebase.firestore()), userDao, postDao);
export const commentVoteService = new VoteService(new VoteDao("comment_vote",firebase.firestore()),userDao,commentDao);