import User from './User'
import BaseEntity from './BaseEntity';

/**
 * The entity class, each of which represents a Subbluedit.
 */
export default interface Subbluedit extends BaseEntity{
     name:string;
     creator:User;
}