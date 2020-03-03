import PostDao from '../../dao/PostDao'
import Post from '../entities/Post';
import ClientError from '../../errors/ClientError';


class PostService {

    /**
     * PostDao: Data acccess object which performs persistency regarding Post
     */
    private dao: PostDao;

    /**
     * Post Service which performs business logic regarding Post.
     * It should be composited with DAO to perform business logic
     * @param dao  Data Access Object
     */
    constructor(dao: PostDao) {
        this.dao = dao;
    }

    /**
     * Create new Post with the object passed by argument.
     * It rejects creating Post when the Post's email or Postname belongs to another Post.
     * @param Post Post to create
     */
    async createPost(Post: Post): Promise<Post> {
        if (await this.dao.exists(Post.name)) {
            throw new ClientError('Post name exists. Try another Postname');
        } else if (await this.dao.existsEmail(Post.id)) {
            throw new ClientError('Id exists. Try another Id');
        } else
            return await this.dao.save(Post);
    }

    /**
     * Update Post information.
     * It rejects to update Post when 
     *  1. The Post's email belongs to another Post
     *  2. The Post does not exist in our database.
     * @param Post Post to be updated
     */
    async updatePost(Post: Post): Promise<Post> {
        const PostWithSameId = await this.dao.findById(Post.id);
        if (PostWithSameId != null && PostWithSameId.name != Post.name) {
            throw new ClientError('Email exists. Try another email');
        } else if (!(await this.dao.exists(Post.name))) {
            throw new ClientError('Post not exists');
        } else
            return await this.dao.save(Post);
    }

    /**
     * Retrieves all Posts from the database.
     */
    async listPosts(): Promise<Post[]> {
        return await this.dao.findAll()
    }

    /**
     * Retrieve Post by it's Postname.
     * @param Postname 
     */
    async getPost(name: string): Promise<Post> {
        return await this.dao.findOne(name);
    }

}

export default PostService;