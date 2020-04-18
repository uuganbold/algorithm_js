import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../business/entities/User";
import validator from 'validator';
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";
import service from "../../../business/services/UserService"
import authToken from "../../../helpers/auth";

/**
 * This function validates user input.
 * It deletes unwanted properties from the input
 * If there is some validation error, it will thrown new ClientError.
 * @param user 
 */
const validate=(user:User)=>{
    //TODO needs more validation
    /*
    1. username required.
    2. username length
    3. username allowed characters
    4. email required
    5. email pattern
    6. password required
    7. password length
    */
     _.pick(user,['username','bio']);
     
     //username should be passed
     if(validator.isEmpty(user.username)){
         throw new ClientError("username is required");
     }
     
     return user;
}

/**
 * URI: http://[SERVER]/api/users/[username]
 * METHODS ACCEPTED: GET, POST, PUT 
 */

export default async (req:NextApiRequest, res:NextApiResponse)=>{
    const {
        query: { username },
      } = req
    
      try{
            if(req.method==='GET'){
                 //GET request meaning to retrieve information
                const user=await service.getUserByUsername(username as string); //javascrpt object
                if(user==null) throw new ClientError("User not found",404);
                res.json(user);
            }else if(req.method==='POST'){
                //POST request meaning create new resource
                const decodedToken=await authToken(req.headers.authorization);
                const user:User=req.body;
                user.uid=decodedToken.uid;
                user.username=username as string;
                res.json(await service.createUser(validate(user))); 
            }else if( req.method==='PUT'){
                //PUT request meaning update resource
                const decodedToken=await authToken(req.headers.authorization);
                const user:User=req.body;
                user.uid=decodedToken.uid;
                user.username=username as string;
                res.json(await service.updateUser(validate(user)));
                //DELETE request has not implemented yet.
            }else {
                throw new ClientError("We only supports: GET, POST, PUT",405);
            }
      }catch(e){
            //if error occurs, this function will prepare response.
            resolve_error(e,req,res);
      }    
}