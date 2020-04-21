import Voteable from "../business/entities/Voteable";

export default interface VoteableDao {
     findOne(uid:string):Promise<Voteable>

     save(voteable:Voteable):Promise<Voteable>
}