import User from '../business/entities/User'
import CrudDao from './CrudDao';
import BaseDao from './BaseDao';

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
class UserDao extends BaseDao implements CrudDao<User,string>{

    /**
     * Find an user by it's email address.
     * If the user is not found it returns null;
     * @param email 
     */
    public async findByEmail(email: string):Promise<User>{
        let colRef=await this.db.collection(COLLECTION_NAME).where('email','==',email).get();
        return colRef.docs.length>0?colRef.docs[0].data() as User:null;
    }
    
    /**
     * Save existing or new user to the database.
     * @param user User to be saved
     */
    public async save(user:User):Promise<User>{
        const userRef=this.db.collection(COLLECTION_NAME).doc(user.username);
        await userRef.set(user);
        return user;
    }

    /**
     * Saves all users in the collection.
     * @param users Users to be saved.
     */
    public async saveAll(users:Iterable<User>):Promise<Iterable<User>>{
        for(let u of users){
            await this.save(u); 
        }
        return users;
    }

    /**
     * Find an user by it's username
     * If user not found, it returns null
     * @param username username of the user to be found
     */
    public async findOne(username:string):Promise<User>{
        let user:User=null;
        const userRef=this.db.collection(COLLECTION_NAME).doc(username);
        user=(await userRef.get()).data() as User;
        if(typeof user==='undefined') return null;
        return user;
    };

    /**
     * Checks if a user exists in the database by it's username.
     * @param username username to be checked if exists
     */
    public async exists(username:string):Promise<boolean>{
        if(await this.findOne(username)!=null) return true;
        else return false;
    };

    /**
     * Checks if a user exists in the database by it's email.
     * @param email email to be checked if exists
     */
    public async existsEmail(email:string):Promise<boolean>{
        if(await this.findByEmail(email)!=null) return true;
        else return false;
    }

    /**
     * Retrieves all users from the database
     */
    public async findAll():Promise<Array<User>>{
        const result:User[]=[];
        const colRef=this.db.collection(COLLECTION_NAME);
        (await colRef.get()).forEach(doc=>result.push(doc.data() as User));
        return result;
    };

    /**
     * Retrieves users by their usernames.
     * It reads users by 10 a time because of Firebase's limits.
     * @param usernames 
     */
    public async findAllByIDs(usernames:string[]):Promise<Array<User>>{
        const result:User[]=[];
        const colRef=this.db.collection(COLLECTION_NAME);
        let i=0;
        while(i<usernames.length){
            const ids=usernames.slice(i,i+10);
            (await colRef.where('username','in',ids).get()).forEach(doc=>result.push(doc.data() as User));
            i+=10;
        }
        return result;
    };

    /**
     * Counts the number of all users.
     * TODO:Count user by Firebase-Cloud-Functions
     */
    public async count():Promise<number>{
        return new Promise<number>((resolve, reject)=>{
            let count = 0;

            this.db.collection(COLLECTION_NAME).select().stream()
                .on('data', (snap) => {
                     ++count;
                }).on('end',()=>{
                    resolve(count);
                })
        })  
    };

    /**
     * Deletes a user from the database by it's username.
     * @param username 
     */
    public async deleteByID(username:string):Promise<void>{
        await this.db.collection(COLLECTION_NAME).doc(username).delete();
    };

    /**
     * Deletes a user from the database
     * @param user 
     */
    public async delete(user:User):Promise<void>{
        await this.deleteByID(user.username);
    };

    /**
     * Deletes multiple users from the database
     * @param users 
     */
    public async deleteObjs(users:Iterable<User>):Promise<void>{
        for(let u of users){
            await this.delete(u);
        }
    };

    /**
     * Clears (delete all users) user collection from the database.
     * It is @see BaseDao#deleteCollection
     */
    public async deleteAll():Promise<void>{
        await this.deleteCollection(COLLECTION_NAME,10);
    };
}

export default UserDao;