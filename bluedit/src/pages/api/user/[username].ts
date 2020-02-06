import { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../../business/services/UserService";
import UserDao from "../../../dao/UserDao";

const service=new UserService(new UserDao());

export default (req:NextApiRequest, res:NextApiResponse)=>{
    const {
        query: { username },
      } = req
    
    if(req.method==='GET'){
         const user=service.getUser(username as string);
         res.json(user);
    }
}