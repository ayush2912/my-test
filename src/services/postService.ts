import Errors from '../errors';
import { createPost, getPost } from '../actions/posts';

/**
 * This method get posts by id.
 * @param {id} Id of the post
 * @returns {Object}  data of the posts
 */
async function getPostData(id: string) {
    try {
        console.info('-----In getPostData method of PostService ------');

        const getData = await getPost(id);

        if (!getData) {
            throw new Errors.BadRequest();
        }

        return getData;
    } catch (error) {
        console.error(
            '***** Error in postService of getPostData method *****',
            error
        );
        throw error;
    }
}

/**
 * Create post data
 * @param {string} title title of the post
 * @param {string} content content of the post
 * @returns {object} data of the post created
 */
async function createPostData(title: string, content: string): Promise<object> {
    try {
        console.info('----- In createPostData method of checkPost ------');
        const newPost = await createPost(title, content);

        return newPost;
    } catch (error) {
        console.error(
            '***** Error in postService of createPostData method *****',
            error
        );
        throw error;
    }
}

export { getPostData, createPostData };
