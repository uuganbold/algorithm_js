import { NextApiRequest, NextApiResponse } from "next";
import validator from 'validator';
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";
import service from "../../../business/services/SubblueditService"
import userService from "../../../business/services/UserService"
import authToken from "../../../helpers/auth";
import Subbluedit from "../../../business/entities/Subbluedit";

/**
 * URI: http://[SERVER]/api/users/[username]
 * METHODS ACCEPTED: GET, POST, PUT 
 */

export default async (req:NextApiRequest, res:NextApiResponse)=>{
    const {
        query: { name },
      } = req
    
      try{
            if(req.method==='GET'){
                 //GET request meaning to retrieve information
                const subdits=await service.getSubditByName(name as string); //javascrpt object
                if(subdits==null) throw new ClientError("Subbluedit not found",404);
                res.json(subdits);
            }else if( req.method==='PUT'){
                //PUT request meaning update resource
                const decodedToken=await authToken(req.headers.authorization);
                const subdit:Subbluedit=req.body;
                subdit.name=name as string;
                res.json(await service.updateSubdit(subdit,decodedToken.uid));
                //DELETE request has not implemented yet.
            }else {
                throw new ClientError("We only supports: GET, PUT",405);
            }
      }catch(e){
            //if error occurs, this function will prepare response.
            resolve_error(e,req,res);
      }    
}