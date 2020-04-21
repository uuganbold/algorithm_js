import BasicCrudDao from "./BasicCrudDao";
import Comment from "../business/entities/Comment"
import firebase from "../firebase/admin"
import admin from "../firebase/admin";
import VoteableDao from "./VoteableDao";

const COLLECTION_NAME="comments";

export class CommentDao extends BasicCrudDao<Comment> implements VoteableDao{
    
    async findByPostId(postId: string): Promise<Comment[]> {
        return this.findAllByWhere("postid","==",postId,["post_date","desc"]);
    }

    async findByParent(parentId:string):Promise<Comment[]>{
        return this.findAllByWhere("parentid","==",parentId,["post_date","desc"]);
    }
    
    constructor(db:admin.firestore.Firestore){
        super(db,COLLECTION_NAME);
    }
}


export default new CommentDao(firebase.firestore());