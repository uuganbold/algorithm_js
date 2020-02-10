import db from '../dao/firestore';
import UserDao from '../dao/UserDao';
import UserService from '../business/services/UserService';
/**
 * Singleton (should be only instance throughout the application) object that controlls all objects of the program.
 * 
 */
export default class ApplicationContext{


    private static instance:ApplicationContext;
    private beans:Map<string,any>=new Map();

    public static getInstance():ApplicationContext{
        if(ApplicationContext.instance==null){
            ApplicationContext.instance=new ApplicationContext();
        }
        return ApplicationContext.instance
    }
    private constructor(){
        //Here adding object to object container.
        /*
        When we need to use this object, we just request it from the ApplicationContext.
        ApplicationContext.getInstance().getBean("db")
         */
        this.beans.set("db",db);

        //Here adding userdao object to object container.
        /*
        When we need to use this object, we just request it from the ApplicationContext.
        ApplicationContext.getInstance().getBean("userDao")
         */
        const userDao=new UserDao(db);
        this.beans.set("userDao",userDao);

        /**
         * Same as above
         */
        const userService=new UserService(userDao);
        this.beans.set("userService",userService);

        /**
         * Need to add object here.
         */
    }

    public getBean(beanName:string){
        return this.beans.get(beanName);
    }
}
