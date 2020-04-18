import {SubblueditDao} from "../../dao/SubblueditDao";
import dao from "../../dao/SubblueditDao"
import Subbluedit from "../entities/Subbluedit";
import User from "../entities/User";
import ClientError from "../../errors/ClientError";
import userService, { UserService }  from "./UserService";

export class SubblueditService {

    async updateSubdit(subdit: Subbluedit, userUID:string): Promise<Subbluedit> {
        const user=await this.userService.getUser(userUID);
        if(user==null) throw new ClientError("User id is invalid");
        const persisted=await this.getSubditByName(subdit.name);
        if(persisted==null) throw new ClientError("Subbluedit not found",405);
        if(persisted.creator.uid!=user.uid){
            throw new ClientError("Only creator can update subbluedit",403);
        }
        persisted.name=subdit.name;
        return await dao.save(persisted);
    }
    async getSubditByName(name: string) : Promise<Subbluedit>{
        return await dao.findByName(name);
    }

    async getSubdit(uid:string):Promise<Subbluedit>{
        return await dao.findOne(uid);
    }
    
    async createSubdit(subdit:Subbluedit, userUID:string): Promise<Subbluedit> {
        const user=await this.userService.getUser(userUID);
        if(user==null) throw new ClientError("User id is invalid");
        const sameNamed=await this.getSubditByName(subdit.name);
        if(sameNamed!=null){
            throw new ClientError("This name belongs to another subbluedit");
        }
        subdit.creator=user;
        return await this.dao.save(subdit);
    }

    async listSubdits() {
        return await dao.findAll();
    }

    private dao:SubblueditDao;
    private userService:UserService

    constructor(dao:SubblueditDao,userService:UserService){
        this.dao=dao;
        this.userService=userService;
    }

    

}
const subblueditService=new SubblueditService(dao,userService);
export default subblueditService;