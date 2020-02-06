import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "./ClientError";

export default function resolve_error(err:Error, req:NextApiRequest, res:NextApiResponse){
    if(err instanceof ClientError){
        res.status(400).json({error:err.message});
    }else{
        res.status(500).json({error:'Sorry, We are under the weather.'})
    }
}