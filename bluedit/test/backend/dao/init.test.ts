import db from '../../../src/dao/init';
import { userInfo } from 'os';
import User from '../../../src/business/user/User';
import Post from '../../../src/business/post/Post';
import PostDao from '../../../src/dao/PostDao';

describe('firestore initialize',()=>{

    it('should document added',()=>{

        const lovelace:User={
            username:'alovelace',
            email:'love',
            password:'asdfs'
        }

        const post:Post={
            id:null,
            name:'post name',
            text:'post text',
            post_date:new Date(),
            user:lovelace
        }
        
        PostDao.create(post);
        
    })
})