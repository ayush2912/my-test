import { createPost, getPost } from '../posts';
import prisma from '../prisma';

describe('createPost()', () => {
    it('should create a new post', async () => {
        const title = 'Test Post';
        const content = 'This is a test post.';
        const post = await createPost(title, content);

        expect(post).toHaveProperty('id');
        expect(typeof post.id).toBe('string');
        expect(post.title).toEqual('Test Post');
        expect(post.content).toEqual('This is a test post.');

        // Clean up the test data
        await prisma.post.delete({
            where: {
                id: post.id,
            },
        });
    });
});

describe('getPost()', () => {
    it('should return a post by ID', async () => {
        // Create a test post
        const testPost = await prisma.post.create({
            data: {
                title: 'Test Post',
                content: 'This is a test post.',
            },
        });

        const post = await getPost(testPost.id);

        expect(post).toEqual(testPost);

        // Clean up the test data
        await prisma.post.delete({
            where: {
                id: testPost.id,
            },
        });
    });

    it('should return null if the post does not exist', async () => {
        const id = '6440cef8e4e575a78deb4a1f';
        const post = await getPost(id);
        expect(post).toBeNull();
    });
});
