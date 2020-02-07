import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "./ClientError";

export default function resolve_error(err:Error, req:NextApiRequest, res:NextApiResponse){
    if(err instanceof ClientError){
        //client side error
        res.status(400).json({error:err.message});
    }else{
        //server side error
        res.status(500).json({error:'Sorry, We are under the weather.'})
    }
}