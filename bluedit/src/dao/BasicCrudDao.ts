import BaseDao from "./BaseDao";
import CrudDao from "./CrudDao";
import BaseEntity from "../business/entities/BaseEntity"
import admin from "firebase-admin";

type Where={
    fieldpath:string | FirebaseFirestore.FieldPath,
    opStr:FirebaseFirestore.WhereFilterOp,
    value:any
}

abstract class BasicCrudDao<T extends BaseEntity> extends BaseDao implements CrudDao<T,string>{
    
    protected COLLECTION_NAME:string;

    protected constructor(db:admin.firestore.Firestore, collection:string){
         super(db);
         this.COLLECTION_NAME=collection;
    }
    
    /**
     * Save existing or new user to the database.
     * @param entity Entity to be saved
     */
    public async save(entity:T):Promise<T>{
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let entityRef;
        if(entity.uid==null){
            entityRef=colRef.doc();
            entity.uid=entityRef.id;
        }else entityRef=colRef.doc(entity.uid);
        await entityRef.set(entity);
        return (await entityRef.get()).data() as T;
    }

    /**
     * Saves all entities in the collection.
     * @param entities Entities to be saved.
     */
    public async saveAll(entities:Iterable<T>):Promise<Iterable<T>>{
        for(let e of entities){
            await this.save(e); 
        }
        return entities;
    }

    /**
     * Find an entity by it's uid
     * If user not found, it returns null
     * @param uid uid of the user to be found
     */
    public async findOne(uid:string):Promise<T>{
        
        let entity:T=null;
        const userRef=this.db.collection(this.COLLECTION_NAME).doc(uid);
        entity=(await userRef.get()).data() as T;
        if(typeof entity==='undefined') return null;
        return entity;
    };

    /**
     * Checks if a entity exists in the database by it's uid.
     * @param uid uid to be checked if exists
     */
    public async exists(uid:string):Promise<boolean>{
        if(await this.findOne(uid)!=null) return true;
        else return false;
    };

    /**
     * Retrieves all entities from the database
     */
    public async findAll():Promise<Array<T>>{
        const result:T[]=[];
        const colRef=this.db.collection(this.COLLECTION_NAME);
        (await colRef.get()).forEach(doc=>result.push(doc.data() as T));
        return result;
    };

    /**
     * 
     * @param uids 
     */
    public async findAllByWhere(fieldpath:string | FirebaseFirestore.FieldPath,
                                opStr:FirebaseFirestore.WhereFilterOp,
                                value:any, orderBy?:[string,string]):Promise<Array<T>>{
        return await this.findAllByWheres([{fieldpath,opStr,value}],orderBy);
    }

    public async findAllByWheres(wheres:Where[], orderBy?:[string,string]):Promise<Array<T>>{
        const result:T[]=[];
        let query:FirebaseFirestore.Query=this.db.collection(this.COLLECTION_NAME);
        for(let w of wheres){
            query=query.where(w.fieldpath,w.opStr,w.value);
        }
        if(orderBy!=null){
            query.orderBy(orderBy[0],orderBy[1] as FirebaseFirestore.OrderByDirection);
        }
        (await (query.get())).forEach(doc=>result.push(doc.data() as T))
        return result;
    }   


    /**
     * Retrieves entities by their uids.
     * It reads entities by 10 a time because of Firebase's limits.
     * @param uids 
     */
    public async findAllByIDs(uids:string[]):Promise<Array<T>>{
        const result:T[]=[];
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let i=0;
        while(i<uids.length){
            const ids=uids.slice(i,i+10);
            (await colRef.where('uid','in',ids).get()).forEach(doc=>result.push(doc.data() as T));
            i+=10;
        }
        return result;
    };

    /**
     * Counts the number of all entities.
     * TODO:Count entity by Firebase-Cloud-Functions
     */
    public async count():Promise<number>{
        return new Promise<number>((resolve, reject)=>{
            let count = 0;

            this.db.collection(this.COLLECTION_NAME).select().stream()
                .on('data', (snap) => {
                     ++count;
                }).on('end',()=>{
                    resolve(count);
                })
        })  
    };

    /**
     * Deletes a entity from the database by it's uid.
     * @param uid 
     */
    public async deleteByID(uid:string):Promise<void>{
        await this.db.collection(this.COLLECTION_NAME).doc(uid).delete();
    };

    /**
     * Deletes a entity from the database
     * @param entity 
     */
    public async delete(entity:T):Promise<void>{
        await this.deleteByID(entity.uid);
    };

    /**
     * Deletes multiple entities from the database
     * @param entities 
     */
    public async deleteObjs(users:Iterable<T>):Promise<void>{
        for(let u of users){
            await this.delete(u);
        }
    };

    /**
     * Clears (delete all users) user collection from the database.
     * It is @see BaseDao#deleteCollection
     */
    public async deleteAll():Promise<void>{
        await this.deleteCollection(this.COLLECTION_NAME,10);
    };
}

export default BasicCrudDao;