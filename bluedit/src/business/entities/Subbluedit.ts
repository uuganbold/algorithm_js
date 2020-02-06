import User from './User'

/**
 * The entity class, each of which represents a Subbluedit.
 */
export default interface Subbluedit{
     id:string;
     name:string;
     creator:User;
}