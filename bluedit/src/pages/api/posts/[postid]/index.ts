import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../../errors/ErrorResolver";
import service from '../../../../business/services/PostService'
import authToken from "../../../../helpers/auth";

/**
 * URI: http://[SERVER]/api/[post-id]
 * METHODS ACCEPTED: GET
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { postid },
      } = req

    try {
        if (req.method === 'GET') {
            const post=await service.getPost(postid as string); //javascrpt object
            if(post==null) throw new ClientError("Post not found",404);
            res.json(post);
        }else if(req.method==='PUT'){
            const post=JSON.parse(req.body);
            const decodedToken=await authToken(req.headers.authorization);
            res.json(await service.updatePost(post,decodedToken.uid)); 
        }else {
            throw new ClientError("We only supports: GET, PUT",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}