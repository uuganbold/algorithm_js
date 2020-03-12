import User from '../business/entities/User'
import BasicCrudDao from "./BasicCrudDao"
import admin from 'firebase-admin';
import firebase from '../firebase/admin';

/**
 * The collection's name in which the users saved.
 */
const COLLECTION_NAME="users";
/**
 * Data access object.
 * It performs all operations regarding with database.
 * It extends from @see BaseDao which defines basic data access operations.
 * It implements @see CrudDao which defines basic CRUD (Create Read Update Delete) operations.
 */
export class UserDao extends BasicCrudDao<User>{

    constructor(db:admin.firestore.Firestore){
        super(db,COLLECTION_NAME);
    }

    /**
     * Find an user by it's uid address.
     * If the user is not found it returns null;
     * @param username
     */
    public async findByUserName(username: string):Promise<User>{
        let colRef=await this.db.collection(this.COLLECTION_NAME).where('username','==',username).get();
        return colRef.docs.length>0?colRef.docs[0].data() as User:null;
    }
    
    /**
     * Checks if a user exists in the database by it's username.
     * @param username login username to be checked if exists
     */
    public async existsUsername(username:string):Promise<boolean>{
        if(await this.findByUserName(username)!=null) return true;
        else return false;
    }
}

const dao=new UserDao(firebase.firestore());
export default dao;