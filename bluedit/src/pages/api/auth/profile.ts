import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../errors/ClientError";
import resolve_error from "../../../errors/ErrorResolver";
import firebase from "../../../firebase/admin";
import service from "../../../business/services/UserService"
import authToken from "../../../helpers/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {

            const decodedToken=await authToken(req.headers.authorization);
        
            const profile = await service.getUser(decodedToken.uid as string);
            if(profile==null){
                res.json({status:false})
            }else{
                res.json({status:true,profile})
            }
            //DELETE request has not implemented yet.
        } else {
            throw new ClientError("We only supports: GET",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}