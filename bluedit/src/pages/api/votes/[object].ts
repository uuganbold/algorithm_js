import {NextApiRequest} from 'next'
import {NextApiResponse} from 'next'
import ClientError from '../../../errors/ClientError';
import resolve_error from '../../../errors/ErrorResolver';
import authToken from '../../../helpers/auth';
import { postVoteService, commentVoteService, VoteService } from '../../../business/services/VoteService';
import Vote from '../../../business/entities/Vote';
import VotesPubSubManager from '../../../helpers/VotesPubSubManager';
const services=new Map<string,VoteService>();
services.set("post",postVoteService);
services.set("comment",commentVoteService);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {object},
      } = req
    try {
        const decodedToken=await authToken(req.headers.authorization);
        if (req.method === 'POST') {
            const v:Vote=JSON.parse(req.body);
            const voted=await services.get(object as string).vote(v,decodedToken.uid);
            global.pubSubManager.publish(voted);
            res.json(voted);
        }else {
            throw new ClientError("We only supports: POST",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}