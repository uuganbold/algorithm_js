import BasicCrudDao from './BasicCrudDao';
import Subbluedit from '../business/entities/Subbluedit';
import admin from 'firebase-admin';
import firebase from "../firebase/admin"

/**
 * The collection's name in which the users saved.
 */
const COLLECTION_NAME="subbluedit";
/**
 * Data access object.
 * It performs all operations regarding with database.
 * It extends from @see BaseDao which defines basic data access operations.
 * It implements @see CrudDao which defines basic CRUD (Create Read Update Delete) operations.
 */
export class SubblueditDao extends BasicCrudDao<Subbluedit>{
    findByNamePrefix(query: string):  Promise<Subbluedit[]> {
        if(query.length==0) return new Promise((res,rej)=>res([]));
        const end=query.substring(0,query.length-1)+String.fromCharCode(query.charCodeAt(query.length-1)+1);
        return this.findAllByWheres([
            {fieldpath:'name',opStr:'>=',value:query},
            {fieldpath:'name',opStr:'<',value:end}]);
    }
    public async findByName(name: string):Promise<Subbluedit>{
        let colRef=await this.db.collection(this.COLLECTION_NAME).where('name','==',name).get();
        return colRef.docs.length>0?colRef.docs[0].data() as Subbluedit:null;
    }

    public async existsName(name:string):Promise<boolean>{
        if(await this.findByName(name)!=null) return true;
        else return false;
    }

    constructor(db:admin.firestore.Firestore){
        super(db,COLLECTION_NAME);
    }

}

export default new SubblueditDao(firebase.firestore());