import prisma from './prisma';

const createPost = async (title: string, content: string) =>
    prisma.post.create({
        data: {
            title: title,
            content: content,
        },
    });

const getPost = async (id: string) =>
    prisma.post.findFirst({
        where: {
            id: {
                equals: id,
            },
        },
    });

export { createPost, getPost };
