import { NextApiRequest, NextApiResponse } from "next";
import Context from '../../../config/ApplicationContext'
import Post from "../../../business/entities/Post";
import PostService from "../../../business/services/PostService";
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";

const service: PostService = Context.getInstance().getBean("PostService"); //using singleton pattern

 
export default async (req: NextApiRequest, res: NextApiResponse) => {


    try {
        if (req.method === 'GET') {
            //GET request meaning to retrieve information
            const post = await service.listPosts(); //javascript object
            res.json(post);
            //DELETE request has not implemented yet.
        } else {
            throw new ClientError("We only supports: GET");
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}