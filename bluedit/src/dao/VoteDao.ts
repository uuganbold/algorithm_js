import Vote from '../business/entities/Vote'
import BasicCrudDao from './BasicCrudDao';
import admin from 'firebase-admin';
import firebase from '../firebase/admin'


const COLLECTION_NAME = "votes";

export class VoteDao extends BasicCrudDao<Vote>{
    findBySubbluedit(subdit: string): Vote[] | PromiseLike<Vote[]> {
        return this.findAllByWhere("subbluedit.uid", '==', subdit);
    }


    constructor(db: admin.firestore.Firestore) {
        super(db, COLLECTION_NAME);
    }
}

const voteDao = new VoteDao(firebase.firestore());
export default voteDao;
