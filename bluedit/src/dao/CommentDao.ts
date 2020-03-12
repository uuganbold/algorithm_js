import BasicCrudDao from "./BasicCrudDao";
import Comment from "../business/entities/Comment"
import firebase from "../firebase/admin"
import admin from "../firebase/admin";

const COLLECTION_NAME="comments";

export class CommentDao extends BasicCrudDao<Comment>{
    
    async findByPostId(postId: string): Promise<Comment[]> {
        return this.findAllByWhere("postid","==",postId);
    }

    async findByParent(parentId:string):Promise<Comment[]>{
        return this.findAllByWhere("parentid","==",parentId);
    }
    
    constructor(db:admin.firestore.Firestore){
        super(db,COLLECTION_NAME);
    }
}


export default new CommentDao(firebase.firestore());