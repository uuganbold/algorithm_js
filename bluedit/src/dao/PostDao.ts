import Post from '../business/entities/Post'
import CrudDao from './CrudDao';
import BaseDao from './BaseDao';

/**
 * The collection's name in which the Posts saved.
 */
const COLLECTION_NAME = "post";
/**
 * Data access object.
 * It performs all operations regarding with database.
 * It extends from @see BaseDao which defines basic data access operations.
 * It implements @see CrudDao which defines basic CRUD (Create Read Update Delete) operations.
 */
class PostDao extends BaseDao implements CrudDao<Post, string>{

    /**
     * Find an Post by it's email address.
     * If the Post is not found it returns null;
     */
    public async findById(id: string): Promise<Post> {
        let colRef = await this.db.collection(COLLECTION_NAME).where('id', '==', id).get();
        return colRef.docs.length > 0 ? colRef.docs[0].data() as Post : null;
    }

    /**
     * Save existing or new Post to the database.
     * @param Post Post to be saved
     */
    public async save(Post: Post): Promise<Post> {
        const PostRef = this.db.collection(COLLECTION_NAME).doc(Post.name);
        await PostRef.set(Post);
        return Post;
    }

    /**
     * Saves all Posts in the collection.
     * @param Posts Posts to be saved.
     */
    public async saveAll(Posts: Iterable<Post>): Promise<Iterable<Post>> {
        for (let u of Posts) {
            await this.save(u);
        }
        return Posts;
    }

    /**
     * Find an Post by it's Postname
     * If Post not found, it returns null
     * @param Postname Postname of the Post to be found
     */
    public async findOne(Postname: string): Promise<Post> {
        let Post: Post = null;
        const PostRef = this.db.collection(COLLECTION_NAME).doc(Postname);
        Post = (await PostRef.get()).data() as Post;
        if (typeof Post === 'undefined') return null;
        return Post;
    };

    /**
     * Checks if a Post exists in the database by it's Postname.
     * @param Postname Postname to be checked if exists
     */
    public async exists(Postname: string): Promise<boolean> {
        if (await this.findOne(Postname) != null) return true;
        else return false;
    };

    /**
     * Checks if a Post exists in the database by it's email.
     * @param email email to be checked if exists
     */
    public async existsEmail(id: string): Promise<boolean> {
        if (await this.findById(id) != null) return true;
        else return false;
    }

    /**
     * Retrieves all Posts from the database
     */
    public async findAll(): Promise<Array<Post>> {
        const result: Post[] = [];
        const colRef = this.db.collection(COLLECTION_NAME);
        (await colRef.get()).forEach(doc => result.push(doc.data() as Post));
        return result;
    };

    /**
     * Retrieves Posts by their Postnames.
     * It reads Posts by 10 a time because of Firebase's limits.
     * @param Postnames 
     */
    public async findAllByIDs(Postnames: string[]): Promise<Array<Post>> {
        const result: Post[] = [];
        const colRef = this.db.collection(COLLECTION_NAME);
        let i = 0;
        while (i < Postnames.length) {
            const ids = Postnames.slice(i, i + 10);
            (await colRef.where('Postname', 'in', ids).get()).forEach(doc => result.push(doc.data() as Post));
            i += 10;
        }
        return result;
    };

    /**
     * Counts the number of all Posts.
     * TODO:Count Post by Firebase-Cloud-Functions
     */
    public async count(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let count = 0;

            this.db.collection(COLLECTION_NAME).select().stream()
                .on('data', (snap) => {
                    ++count;
                }).on('end', () => {
                    resolve(count);
                })
        })
    };

    /**
     * Deletes a Post from the database by it's Postname.
     * @param Postname 
     */
    public async deleteByID(Postname: string): Promise<void> {
        await this.db.collection(COLLECTION_NAME).doc(Postname).delete();
    };

    /**
     * Deletes a Post from the database
     * @param Post 
     */
    public async delete(Post: Post): Promise<void> {
        await this.deleteByID(Post.name);
    };

    /**
     * Deletes multiple Posts from the database
     * @param Posts 
     */
    public async deleteObjs(Posts: Iterable<Post>): Promise<void> {
        for (let u of Posts) {
            await this.delete(u);
        }
    };

    /**
     * Clears (delete all Posts) Post collection from the database.
     * It is @see BaseDao#deleteCollection
     */
    public async deleteAll(): Promise<void> {
        await this.deleteCollection(COLLECTION_NAME, 10);
    };
}

export default PostDao;