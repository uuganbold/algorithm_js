import {UserDao} from '../../dao/UserDao'
import dao from '../../dao/UserDao'
import User from '../entities/User';
import ClientError from '../../errors/ClientError';

export class UserService{

    /**
     * UserDao: Data acccess object which performs persistency regarding user
     */
    private dao:UserDao;

    /**
     * User Service which performs business logic regarding User.
     * It should be composited with DAO to perform business logic
     * @param dao  Data Access Object
     */
    constructor(dao:UserDao){
        this.dao=dao;
    }
    
    /**
     * Create new user with the object passed by argument.
     * It rejects creating user when the user's login uid or username belongs to another user.
     * @param user User to create
     */
    async createUser(user:User):Promise<User>{
         if(await this.dao.existsUsername(user.username)){
             throw new ClientError('Username exists. Try another username');
         }else if(await this.dao.exists(user.uid)){
            throw new ClientError('Login UID exists. You cannot create another profile.');
         }else
            return await this.dao.save(user);
    }

    /**
     * Update user information.
     * It rejects to update user when 
     *  1. The user's login uid belongs to another user
     *  2. The user does not exist in our database.
     * @param user User to be updated
     */
    async updateUser(user:User):Promise<User>{
        const userWithSameUsername=await this.dao.findByUserName(user.username);
        if(userWithSameUsername!=null&&userWithSameUsername.uid!=user.uid){
            throw new ClientError('This username belongs to another user. Please choose another one.');
        }else if(!(await this.dao.exists(user.uid))){
            throw new ClientError('User not exists',404);
        }else 
            return await this.dao.save(user);
    }

    /**
     * Retrieves all users from the database.
     */
    async listUsers ():Promise<User[]>{
        return await this.dao.findAll()
    }

    /**
     * Retrieve user by it's uid.
     * @param username 
     */
    async getUser(uid:string):Promise<User>{
        return await this.dao.findOne(uid);
    }

    async existsUser(uid:string):Promise<boolean>{
        return await this.dao.exists(uid);
    }

    async getUserByUsername(username:string):Promise<User>{
        return await this.dao.findByUserName(username);
    }

}
const userService=new UserService(dao);
export default userService;