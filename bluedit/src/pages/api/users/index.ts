import { NextApiRequest, NextApiResponse } from "next";
import Context from '../../../config/ApplicationContext'
import User from "../../../business/entities/User";
import UserService from "../../../business/services/UserService";
import validator from 'validator';
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";

const service: UserService = Context.getInstance().getBean("userService"); //using singleton pattern
/**
 * URI: http://[SERVER]/api/users/
 * METHODS ACCEPTED: GET
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
 

    try {
        if (req.method === 'GET') {
            //GET request meaning to retrieve information
            const user = await service.listUsers(); //javascrpt object
            res.json(user);
          //DELETE request has not implemented yet.
        } else {
            throw new ClientError("We only supports: GET");
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}