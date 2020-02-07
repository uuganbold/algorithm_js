export default interface CrudDao<T,E>{

    save:(obj:T)=>Promise<T>;
    saveAll:(colelction:Iterable<T>)=>Promise<Iterable<T>>;
    findOne:(id:E)=>Promise<T>;
    exists:(id:E)=>Promise<boolean>;
    findAll:()=>Promise<Iterable<T>>;
    findAllByIDs:(ids:E[])=>Promise<Iterable<T>>;
    count:()=>Promise<number>;
    deleteByID:(id:E)=>Promise<void>;
    delete:(obj:T)=>Promise<void>;
    deleteObjs:(objs:Iterable<T>)=>Promise<void>;
    deleteAll:()=>Promise<void>;

} 