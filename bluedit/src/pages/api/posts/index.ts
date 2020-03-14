import { NextApiRequest, NextApiResponse } from "next";
import Context from '../../../config/ApplicationContext'
import Post from "../../../business/entities/Post";
import PostService from "../../../business/services/PostService";
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";
import service from '../../../business/services/PostService'
import authToken from "../../../helpers/auth";

/**
 * URI: http://[SERVER]/api/Posts/
 * METHODS ACCEPTED: GET
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        if (req.method === 'GET') {
            let post;
            const subdit=req.query.subbluedit as string;
            const user=req.query.user as string;
            if(subdit!=null){
                post=await service.listPostsBySubdit(subdit);
            }else if(user!=null){
                post=await service.listPostsByUser(user);
            }else post=await service.listPosts(); 
            res.json(post);
        }else if(req.method==='POST'){
           //POST request meaning create new resource
           const reqBody=JSON.parse(req.body);
           const post:Post=reqBody.post;
           const subditUID:string=reqBody.subbluedit;
           const decodedToken=await authToken(req.headers.authorization);
           res.json(await service.createPost(post,subditUID,decodedToken.uid)); 
        }else {
            throw new ClientError("We only supports: GET, POST",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}