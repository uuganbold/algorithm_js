import Vote from '../business/entities/Vote'
import admin from 'firebase-admin';
import firebase from '../firebase/admin'
import BaseDao from './BaseDao';

export default class VoteDao extends BaseDao{

    private COLLECTION_NAME:string;

    constructor(collection:string, db: admin.firestore.Firestore) {
        super(db);
        this.COLLECTION_NAME=collection;
    }

    public async get(objectid:string,user:string):Promise<Vote>{
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let query:FirebaseFirestore.Query=colRef.where('oid','==',objectid).where('user','==',user);
        let snapshot=(await query.get());
        if(snapshot.empty) return null;
        else return snapshot.docs[0].data() as Vote;
    }

    public async save(vote:Vote):Promise<Vote>{
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let entityRef=colRef.doc();
        await entityRef.set(vote);
        return vote;
    }

    public async delete(v: Vote) {
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let query:FirebaseFirestore.Query=colRef.where('oid','==',v.oid).where('user','==',v.user);
        let snapshot=(await query.get());
        if(snapshot.empty) return;
        else snapshot.docs.forEach(d=>d.ref.delete());
    }

    public async findAllByObjectIds(objectIds:string[],userId:string):Promise<Vote[]>{
        const result:Vote[]=[];
        const colRef=this.db.collection(this.COLLECTION_NAME);
        let i=0;
        while(i<objectIds.length){
            const ids=objectIds.slice(i,i+10);
            (await colRef.where('oid','in',ids).where('user','==',userId).get()).forEach(doc=>result.push(doc.data() as Vote));
            i+=10;
        }
        return result;
    };
}