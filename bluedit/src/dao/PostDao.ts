import Post from '../business/entities/Post'
import BasicCrudDao from './BasicCrudDao';
import admin from 'firebase-admin';
import firebase from '../firebase/admin'
import VoteableDao from './VoteableDao';

/**
 * The collection's name in which the Posts saved.
 */
const COLLECTION_NAME = "post";
/**
 * Data access object.
 * It performs all operations regarding with database.
 * It extends from @see BasicCrudDao which defines basic data access operations.
 */
export class PostDao extends BasicCrudDao<Post> implements VoteableDao{
    findBySubbluedit(subdit: string): Post[] | PromiseLike<Post[]> {
        return this.findAllByWhere("subbluedit.uid",'==',subdit);
    }
    findByUser(userId: string): Post[] | PromiseLike<Post[]> {
        return this.findAllByWhere("user.uid",'==',userId);
    }
    constructor(db:admin.firestore.Firestore){
        super(db,COLLECTION_NAME);
    }
}

const postDao=new PostDao(firebase.firestore());
export default postDao;