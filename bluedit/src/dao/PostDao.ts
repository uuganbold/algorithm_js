import Post from "../business/post/Post";
import db from "./init"

class PostDao{

    public create=(post:Post):Post=>{
        let docRef = db.collection('post').doc();
        let userRef=db.collection('user').doc(post.user.username);
        post.id=docRef.id;
        docRef.set({
            'id':post.id,
            'name':post.name,
            'text':post.text,
            'post_date':post.post_date,
            'user':userRef
        });
        return post;
    }
}

export default new PostDao();