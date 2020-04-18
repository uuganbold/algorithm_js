import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";
import service from "../../../business/services/UserService"
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
            throw new ClientError("We only supports: GET",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}