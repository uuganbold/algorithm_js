import UserDao from '../../dao/UserDao'
import User from '../entities/User';
import ClientError from '../../errors/ClientError';


class UserService{

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
     * It rejects creating user when the user's email or username belongs to another user.
     * @param user User to create
     */
    async createUser(user:User):Promise<User>{
         if(await this.dao.exists(user.username)){
             throw new ClientError('Username exists. Try another username');
         }else if(await this.dao.existsEmail(user.email)){
            throw new ClientError('Email exists. Try another email');
         }else
            return await this.dao.save(user);
    }

    /**
     * Update user information.
     * It rejects to update user when 
     *  1. The user's email belongs to another user
     *  2. The user does not exist in our database.
     * @param user User to be updated
     */
    async updateUser(user:User):Promise<User>{
        const userWithSameEmail=await this.dao.findByEmail(user.email);
        if(userWithSameEmail!=null&&userWithSameEmail.username!=user.username){
            throw new ClientError('Email exists. Try another email');
        }else if(!(await this.dao.exists(user.username))){
            throw new ClientError('User not exists');
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
     * Retrieve user by it's username.
     * @param username 
     */
    async getUser(username:string):Promise<User>{
        return await this.dao.findOne(username);
    }

}

export default UserService;