import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../../../errors/ErrorResolver";
import commentService from "../../../../../business/services/CommentService";
import authToken from "../../../../../helpers/auth";
import Comment from "../../../../../business/entities/Comment";

/**
 * URI: http://[SERVER]/api/[post-id]/comments
 * METHODS ACCEPTED: GET,POST
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { postid,commentid },
      } = req

    try {
        if (req.method === 'GET') {
            const comment=await commentService.getComment(commentid as string, postid as string);
            if(comment==null) throw new ClientError("Comment not found",404);
            res.json(comment);        
        }else{
            throw new ClientError("We only supports: GET",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}