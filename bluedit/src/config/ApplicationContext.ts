import db from '../dao/firestore';
import UserDao from '../dao/UserDao';
import UserService from '../business/services/UserService';
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
        this.beans.set("db",db);

        const userDao=new UserDao(db);
        this.beans.set("userDao",userDao);

        const userService=new UserService(userDao);
        this.beans.set("userService",userService);
    }

    public getBean(beanName:string){
        return this.beans.get(beanName);
    }
}
