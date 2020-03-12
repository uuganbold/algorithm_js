import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../../../errors/ErrorResolver";
import postService from '../../../../../business/services/PostService'
import authToken from "../../../../../helpers/auth";
import commentService from "../../../../../business/services/CommentService";

/**
 * URI: http://[SERVER]/api/[post-id]/comments
 * METHODS ACCEPTED: GET,POST
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { postid },
      } = req

    try {
        if (req.method === 'GET') {
            const post=await postService.getPost(postid as string); //javascrpt object
            if(post==null) throw new ClientError("Post not found",404);
            res.json(await commentService.listComments(post));
        
        }else if(req.method==='POST'){
            const comment=JSON.parse(req.body);
            const decodedToken=await authToken(req.headers.authorization);
            res.json(await commentService.createComment(comment,decodedToken.uid)); 
        }else {
            throw new ClientError("We only supports: GET, POST",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}