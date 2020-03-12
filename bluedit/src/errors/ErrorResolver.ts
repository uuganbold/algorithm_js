import { NextApiRequest, NextApiResponse } from "next";
import ClientError from "./ClientError";

export default function resolve_error(err:Error, req:NextApiRequest, res:NextApiResponse){
    if(err instanceof ClientError){
        //client side error
        const clientError:ClientError=err as ClientError;
        res.status(clientError.status).json({error:err.message});
    }else{
        //server side error
        console.error(err)
        res.status(500).json({error:'Sorry, We are under the weather.'})
    }
}