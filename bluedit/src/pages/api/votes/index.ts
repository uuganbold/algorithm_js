import {NextApiRequest} from 'next'
import {NextApiResponse} from 'next'
import ClientError from '../../../errors/ClientError';
import resolve_error from '../../../errors/ErrorResolver';
import authToken from '../../../helpers/auth';
import {commentVoteService} from "../../../business/services/VoteService"
import {postVoteService} from "../../../business/services/VoteService"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const decodedToken=await authToken(req.headers.authorization);
        if (req.method === 'POST') {
            const objects:{comments:[],posts:[]}=JSON.parse(req.body);
            const commentVotes=(await commentVoteService.getVotes(objects.comments,decodedToken.uid)).map(c=>{
                const {oid,direction}=c;
                return {oid,direction}
            });

            const postVotes=(await postVoteService.getVotes(objects.posts,decodedToken.uid)).map(c=>{
                const {oid,direction}=c;
                return {oid,direction}
            });

            res.json(postVotes.concat(commentVotes));
        }else {
            throw new ClientError("We only supports: POST",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}