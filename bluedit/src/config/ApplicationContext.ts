/**
 * Singleton (should be only instance throughout the application) object that controlls all objects of the program.
 * 
 */
export default class ApplicationContext{


    private static instance:ApplicationContext;
    private beans:Map<string,any>=new Map();

    public static getInstance(): ApplicationContext{ //returns Application Context

        if(ApplicationContext.instance==null){
            ApplicationContext.instance=new ApplicationContext();
        }
        return ApplicationContext.instance
    }
    private constructor(){

    }

    public getBean(beanName:string){
        return this.beans.get(beanName);
    }
}
