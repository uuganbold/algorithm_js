import { NextApiRequest, NextApiResponse } from "next";
import Context from '../../../config/ApplicationContext'
import User from "../../../business/entities/User";
import UserService from "../../../business/services/UserService";
import validator from 'validator';
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";

const service:UserService=Context.getInstance().getBean("userService");

const validate=(user:User)=>{
    //TODO needs more validation
     _.pick(user,['username','email','password','bio','profile_image']);
     
     if(validator.isEmpty(user.username)){
         throw new ClientError("username is required");
     }
     return user;
}

export default async (req:NextApiRequest, res:NextApiResponse)=>{
    const {
        query: { username },
      } = req
    
      try{
            if(req.method==='GET'){
                const user=service.getUser(username as string);
                res.json(user);
            }else if(req.method==='POST'){
                const user:User=req.body;
                user.username=username as string;
                res.json(await service.createUser(validate(user))); 
            }else if( req.method==='PUT'){
                const user:User=req.body;
                user.username=username as string;
                res.json(await service.updateUser(validate(user)));
            }else {
                throw new ClientError("We only supports: GET, POST, PUT");
            }
      }catch(e){
            resolve_error(e,req,res);
      }    
}