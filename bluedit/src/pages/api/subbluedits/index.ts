import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "../../../errors/ClientError";
import _ from "lodash";
import resolve_error from "../../../errors/ErrorResolver";
import service from "../../../business/services/SubblueditService";
import Subbluedit from "../../../business/entities/Subbluedit";
import authToken from "../../../helpers/auth";

/**
 * URI: http://[SERVER]/api/subbluedit/
 * METHODS ACCEPTED: GET
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            //GET request meaning to retrieve information
            const q=req.query.q;
            let subdits;
            if(q!=null){
                subdits=await service.searchSubdits(q as string);
            }else subdits = await service.listSubdits(); //javascrpt object
            res.json(subdits);
          //DELETE request has not implemented yet.
        }else if(req.method==='POST'){
            //POST request meaning create new resource
            const subdit:Subbluedit=req.body;
            const decodedToken=await authToken(req.headers.authorization);
            res.json(await service.createSubdit(subdit,decodedToken.uid)); 
        }else {
            throw new ClientError("We only supports: GET, POST",405);
        }
    } catch (e) {
        //if error occurs, this function will prepare response.
        resolve_error(e, req, res);
    }
}