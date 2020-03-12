import ClientError from "../errors/ClientError";
import firebase from "../firebase/admin"
import { auth } from "firebase-admin";

export default async function authToken(authorization:string|null):Promise<auth.DecodedIdToken>{
    if(authorization==null){
        throw new ClientError("Authorization token missing");
    }
    const token=JSON.parse(authorization);
    return await firebase.auth().verifyIdToken(token);
}